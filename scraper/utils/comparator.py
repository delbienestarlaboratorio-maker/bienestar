"""
Utilidad para comparar estudios entre laboratorios
"""
import json
from pathlib import Path
from typing import Dict, List
import pandas as pd
from loguru import logger
from scraper.config.settings import settings

class LaboratoryComparator:
    """Compara estudios y precios entre diferentes laboratorios"""
    
    def __init__(self):
        self.data_dir = settings.RAW_DATA_DIR
        
    def load_all_laboratories(self) -> Dict[str, List[Dict]]:
        """Carga datos de todos los laboratorios"""
        labs_data = {}
        
        for lab_name in settings.LABORATORIES.keys():
            # Buscar archivo más reciente "_detailed"
            lab_files = sorted(
                self.data_dir.glob(f"{lab_name}_detailed_*.json"),
                key=lambda x: x.stat().st_mtime,
                reverse=True
            )
            
            if lab_files:
                with open(lab_files[0], 'r', encoding='utf-8') as f:
                    labs_data[lab_name] = json.load(f)
                logger.info(f"Cargado {lab_name}: {len(labs_data[lab_name])} estudios")
            else:
                logger.warning(f"No se encontraron datos para {lab_name}")
                
        return labs_data
        
    def find_common_studies(self, labs_data: Dict) -> pd.DataFrame:
        """Encuentra estudios comunes entre laboratorios"""
        # Crear índice normalizado
        all_studies = {}
        
        for lab_name, studies in labs_data.items():
            for study in studies:
                normalized = self._normalize_name(study['name'])
                
                if normalized not in all_studies:
                    all_studies[normalized] = {
                        'normalized_name': normalized,
                        'original_names': {},
                        'prices': {},
                        'urls': {},
                        'labs_found': []
                    }
                    
                all_studies[normalized]['original_names'][lab_name] = study['name']
                all_studies[normalized]['prices'][lab_name] = study.get('price_promo') or study.get('price_regular')
                all_studies[normalized]['urls'][lab_name] = study.get('url')
                all_studies[normalized]['labs_found'].append(lab_name)
                
        # Filtrar solo estudios comunes (en 2+ labs)
        common = {k: v for k, v in all_studies.items() if len(v['labs_found']) >= 2}
        
        logger.info(f"Encontrados {len(common)} estudios comunes entre laboratorios")
        
        return pd.DataFrame.from_dict(common, orient='index')
        
    def _normalize_name(self, name: str) -> str:
        """Normaliza nombre para comparación"""
        # Remover palabras comunes
        stop_words = ['en', 'de', 'la', 'el', 'con', 'y', 'o', 'para']
        
        normalized = name.upper()
        for word in stop_words:
            normalized = normalized.replace(f" {word.upper()} ", " ")
            
        # Remover caracteres especiales
        normalized = ''.join(c for c in normalized if c.isalnum() or c.isspace())
        
        return ' '.join(normalized.split())  # Normalizar espacios
        
    def generate_comparison_matrix(self) -> pd.DataFrame:
        """Genera matriz comparativa de precios"""
        labs_data = self.load_all_laboratories()
        common_studies = self.find_common_studies(labs_data)
        
        # Crear DataFrame con precios por laboratorio
        comparison_rows = []
        
        for _, study in common_studies.iterrows():
            row = {'study': list(study['original_names'].values())[0]}
            
            for lab_name in settings.LABORATORIES.keys():
                price = study['prices'].get(lab_name)
                row[f'{lab_name}_price'] = price
                row[f'{lab_name}_url'] = study['urls'].get(lab_name)
                
            # Calcular estadísticas
            prices = [p for p in study['prices'].values() if p]
            if prices:
                row['min_price'] = min(prices)
                row['max_price'] = max(prices)
                row['avg_price'] = sum(prices) / len(prices)
                row['price_variance'] = (max(prices) - min(prices)) / min(prices) * 100
                
            comparison_rows.append(row)
            
        df = pd.DataFrame(comparison_rows)
        
        # Guardar
        output_path = settings.PROCESSED_DATA_DIR / "lab_comparison_matrix.csv"
        df.to_csv(output_path, index=False, encoding='utf-8-sig')
        logger.success(f"Matriz comparativa guardada en: {output_path}")
        
        return df
        
    def find_best_prices(self, top_n: int = 50) -> pd.DataFrame:
        """Encuentra los mejores precios por estudio"""
        matrix = self.generate_comparison_matrix()
        
        # Ordenar por varianza de precio (mayor oportunidad de ahorro)
        matrix_sorted = matrix.sort_values('price_variance', ascending=False)
        
        best_prices = []
        
        for _, row in matrix_sorted.head(top_n).iterrows():
            study_name = row['study']
            
            # Encontrar laboratorio con mejor precio
            price_cols = [col for col in row.index if col.endswith('_price')]
            prices = {col.replace('_price', ''): row[col] for col in price_cols if pd.notna(row[col])}
            
            if prices:
                best_lab = min(prices.keys(), key=lambda k: prices[k])
                worst_lab = max(prices.keys(), key=lambda k: prices[k])
                
                best_prices.append({
                    'study': study_name,
                    'best_lab': best_lab,
                    'best_price': prices[best_lab],
                    'worst_lab': worst_lab,
                    'worst_price': prices[worst_lab],
                    'savings': prices[worst_lab] - prices[best_lab],
                    'savings_pct': ((prices[worst_lab] - prices[best_lab]) / prices[worst_lab]) * 100
                })
                
        df = pd.DataFrame(best_prices)
        
        output_path = settings.PROCESSED_DATA_DIR / "best_prices_comparison.csv"
        df.to_csv(output_path, index=False, encoding='utf-8-sig')
        logger.success(f"Análisis de mejores precios guardado en: {output_path}")
        
        return df

if __name__ == "__main__":
    logger.add("comparator.log")
    
    comparator = LaboratoryComparator()
    matrix = comparator.generate_comparison_matrix()
    best_prices = comparator.find_best_prices()
    
    print(f"Comparación completada. {len(matrix)} estudios analizados.")
    print(f"Top oportunidades de ahorro:")
    print(best_prices.head(10)[['study', 'best_lab', 'savings', 'savings_pct']])
