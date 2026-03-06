import json
import time
import os
from pathlib import Path
from typing import List, Dict, Optional
from loguru import logger
from scraper.config.settings import settings

class ContentEnricher:
    """
    Enriquece los datos de los estudios con contenido SEO y descripciones detalladas.
    """
    
    def __init__(self, input_file: Path, output_file: Path):
        self.input_file = input_file
        self.output_file = output_file
        self.data = self._load_data()
        
    def _load_data(self) -> List[Dict]:
        """Carga los datos iniciales"""
        if self.output_file.exists():
            logger.info(f"Cargando datos previos de {self.output_file}")
            with open(self.output_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        
        if self.input_file.exists():
            logger.info(f"Cargando datos crudos de {self.input_file}")
            with open(self.input_file, 'r', encoding='utf-8') as f:
                return json.load(f)
                
        logger.error(f"No se encontró archivo de entrada: {self.input_file}")
        return []

    def _save_data(self):
        """Guarda los datos enriquecidos"""
        with open(self.output_file, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
        logger.info(f"Progreso guardado en {self.output_file}")

    def generate_seo_content(self, study: Dict) -> Dict:
        """
        Genera contenido SEO para un estudio.
        Aquí es donde conectaríamos con OpenAI/LLM.
        Por ahora, usamos plantillas inteligentes basadas en la data existente.
        """
        name = study.get('name', '')
        desc = study.get('description', '')
        
        # Generar slug
        slug = name.lower().replace(' ', '-').replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u').replace('ñ', 'n')
        
        # Generar meta descripción
        meta_description = f"Realiza tu estudio de {name} en Laboratorio Bienestar. Resultados confiables, precios accesibles y la mejor atención. ¡Agenda tu cita hoy!"
        if desc:
            # Usar primeros 150 caracteres de la descripción si existe
            clean_desc = desc.replace('\n', ' ').strip()
            if len(clean_desc) > 150:
                meta_description = clean_desc[:147] + "..."
            else:
                meta_description = clean_desc

        # Generar searchTerms (Sinónimos y términos de búsqueda)
        search_terms = [name.lower()]
        # Agregar palabras individuales
        search_terms.extend([w.lower() for w in name.split() if len(w) > 3])
        
        # Sinónimos comunes (Heurística simple)
        synonyms_map = {
            "QUÍMICA": ["estudio de sangre", "analisis de sangre", "qs"],
            "BIOMETRÍA": ["bh", "biometria hematica", "conteo sanguineo"],
            "ORINA": ["ego", "examen de orina", "analisis de orina"],
            "GLUCOSA": ["azucar", "diabetes"],
            "PERFIL": ["checkup", "paquete"],
            "ULTRASONIDO": ["eco", "ecografia"],
            "TOMOGRAFÍA": ["tac", "ct scan"],
            "RESONANCIA": ["rmn", "mri"]
        }
        
        for key, syns in synonyms_map.items():
            if key in name.upper():
                search_terms.extend(syns)

        # Generar contenido estructurado (Simulación de AI)
        enriched_content = {
            "slug": slug,
            "searchTerms": list(set(search_terms)), # Eliminar duplicados
            "meta_title": f"{name} | Laboratorio Bienestar",
            "meta_description": meta_description,
            "long_description": desc or f"El estudio de {name} es una prueba fundamental para evaluar su salud. En Laboratorio Bienestar ofrecemos tecnología de punta para garantizar resultados precisos.",
            "benefits": [
                "Resultados precisos y confiables",
                "Tecnología de vanguardia",
                "Atención personalizada",
                "Entrega de resultados en línea"
            ],
            "common_questions": [
                {
                    "question": f"¿Para qué sirve el {name}?",
                    "answer": f"El {name} ayuda a detectar diversas condiciones médicas y monitorear su estado de salud general."
                },
                {
                    "question": "¿Necesito ayuno?",
                    "answer": study.get('preparation', 'Consulte las indicaciones específicas de preparación.')
                }
            ]
        }
        
        return enriched_content

    def run(self):
        """Ejecuta el proceso de enriquecimiento"""
        total = len(self.data)
        logger.info(f"Iniciando enriquecimiento de {total} estudios...")
        
        for idx, study in enumerate(self.data):
            # Si ya tiene slug, asumimos que ya fue procesado (o parcialmente)
            if 'slug' in study:
                continue
                
            logger.info(f"[{idx+1}/{total}] Enriqueciendo: {study.get('name')}")
            
            try:
                seo_content = self.generate_seo_content(study)
                study.update(seo_content)
                
                # Guardar cada 50 estudios
                if (idx + 1) % 50 == 0:
                    self._save_data()
                    
            except Exception as e:
                logger.error(f"Error procesando {study.get('name')}: {e}")
                
        self._save_data()
        logger.success("Enriquecimiento completado.")

if __name__ == "__main__":
    # Buscar el archivo más reciente de chopo_detailed_final o el parcial más grande
    raw_dir = settings.RAW_DATA_DIR
    
    # Intentar encontrar el final primero
    input_files = list(raw_dir.glob("chopo_detailed_final*.json"))
    if not input_files:
        # Si no, buscar el parcial más reciente
        input_files = list(raw_dir.glob("chopo_detailed_partial_*.json"))
        
    if not input_files:
        logger.error("No se encontraron archivos de entrada.")
        exit(1)
        
    # Ordenar por fecha de modificación (más reciente al final)
    latest_input = sorted(input_files, key=lambda p: p.stat().st_mtime)[-1]
    
    output_path = settings.PROCESSED_DATA_DIR / "studies_enriched.json"
    
    enricher = ContentEnricher(latest_input, output_path)
    enricher.run()
