"""
Monitor de Cambios de Precios
Detecta y alerta sobre cambios significativos en los precios de estudios
"""
import json
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional
from loguru import logger
from scraper.config.settings import settings

class PriceMonitor:
    """Sistema de monitoreo de cambios de precios"""
    
    def __init__(self):
        self.historical_dir = settings.HISTORICAL_DATA_DIR
        self.alerts: List[Dict] = []
        
    def load_latest_data(self, lab_name: str) -> Optional[Dict]:
        """Carga los datos más recientes de un laboratorio"""
        lab_files = sorted(
            self.historical_dir.glob(f"{lab_name}_*.json"),
            key=lambda x: x.stat().st_mtime,
            reverse=True
        )
        
        if not lab_files:
            return None
            
        with open(lab_files[0], 'r', encoding='utf-8') as f:
            return json.load(f)
            
    def load_previous_data(self, lab_name: str, skip: int = 1) -> Optional[Dict]:
        """Carga datos anteriores para comparación"""
        lab_files = sorted(
            self.historical_dir.glob(f"{lab_name}_*.json"),
            key=lambda x: x.stat().st_mtime,
            reverse=True
        )
        
        if len(lab_files) <= skip:
            return None
            
        with open(lab_files[skip], 'r', encoding='utf-8') as f:
            return json.load(f)
            
    def compare_prices(self, lab_name: str) -> List[Dict]:
        """Compara precios actuales vs anteriores"""
        current = self.load_latest_data(lab_name)
        previous = self.load_previous_data(lab_name)
        
        if not current or not previous:
            logger.warning(f"No hay suficientes datos para comparar precios de {lab_name}")
            return []
            
        changes = []
        
        # Crear índice de estudios previos
        prev_index = {
            self._normalize(s['name']): s 
            for s in previous.get('data', [])
        }
        
        # Comparar con actuales
        for study in current.get('data', []):
            name = self._normalize(study['name'])
            
            if name not in prev_index:
                continue
                
            prev_study = prev_index[name]
            
            # Comparar precios
            change = self._calculate_price_change(prev_study, study)
            
            if change and abs(change['percent_change']) >= settings.PRICE_CHANGE_THRESHOLD:
                changes.append(change)
                
        return changes
        
    def _normalize(self, name: str) -> str:
        """Normaliza nombre de estudio"""
        return name.upper().strip()
        
    def _calculate_price_change(self, prev: Dict, curr: Dict) -> Optional[Dict]:
        """Calcula el cambio de precio entre dos versiones"""
        # Priorizar precio promocional si existe
        prev_price = prev.get('price_promo') or prev.get('price_regular')
        curr_price = curr.get('price_promo') or curr.get('price_regular')
        
        if not prev_price or not curr_price:
            return None
            
        difference = curr_price - prev_price
        percent_change = (difference / prev_price) * 100
        
        if abs(percent_change) < 0.01:  # Cambio insignificante
            return None
            
        return {
            'study': curr['name'],
            'laboratory': curr.get('source'),
            'previous_price': prev_price,
            'current_price': curr_price,
            'difference': difference,
            'percent_change': percent_change,
            'url': curr.get('url'),
            'timestamp': datetime.now().isoformat()
        }
        
    def generate_alert_report(self, changes: List[Dict]) -> str:
        """Genera reporte de alertas de cambios"""
        if not changes:
            return "No se detectaron cambios significativos de precios."
            
        report = f"# Alerta de Cambios de Precios\n\n"
        report += f"**Fecha**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
        report += f"**Total de cambios detectados**: {len(changes)}\n\n"
        
        # Agrupar por tipo de cambio
        increases = [c for c in changes if c['percent_change'] > 0]
        decreases = [c for c in changes if c['percent_change'] < 0]
        
        if increases:
            report += f"## ⬆️ Incrementos de Precio ({len(increases)})\n\n"
            for change in sorted(increases, key=lambda x: x['percent_change'], reverse=True)[:10]:
                report += self._format_change(change)
                
        if decreases:
            report += f"\n## ⬇️ Descuentos ({len(decreases)})\n\n"
            for change in sorted(decreases, key=lambda x: x['percent_change'])[:10]:
                report += self._format_change(change)
                
        return report
        
    def _format_change(self, change: Dict) -> str:
        """Formatea un cambio individual"""
        direction = "📈" if change['percent_change'] > 0 else "📉"
        
        return (
            f"{direction} **{change['study']}** ({change['laboratory']})\n"
            f"- Anterior: ${change['previous_price']:.2f}\n"
            f"- Actual: ${change['current_price']:.2f}\n"
            f"- Cambio: {change['percent_change']:+.1f}%\n\n"
        )
        
    def monitor_all_labs(self) -> Dict:
        """Monitorea todos los laboratorios configurados"""
        all_changes = {}
        
        for lab_name in settings.LABORATORIES.keys():
            logger.info(f"Monitoreando {lab_name}...")
            changes = self.compare_prices(lab_name)
            
            if changes:
                all_changes[lab_name] = changes
                logger.warning(f"{lab_name}: {len(changes)} cambios detectados")
            else:
                logger.info(f"{lab_name}: Sin cambios significativos")
                
        # Guardar reporte total
        if all_changes:
            total_report = self._generate_combined_report(all_changes)
            report_path = settings.DATA_DIR / f"price_alert_{datetime.now().strftime('%Y%m%d')}.md"
            
            with open(report_path, 'w', encoding='utf-8') as f:
                f.write(total_report)
                
            logger.success(f"Reporte guardado en: {report_path}")
            
        return all_changes
        
    def _generate_combined_report(self, all_changes: Dict) -> str:
        """Genera reporte combinado de todos los laboratorios"""
        report = "# Monitoreo de Precios - Laboratorios Clínicos\n\n"
        report += f"**Fecha**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
        
        total_changes = sum(len(changes) for changes in all_changes.values())
        report += f"**Total de cambios detectados**: {total_changes}\n\n"
        
        for lab_name, changes in all_changes.items():
            report += f"---\n\n## {lab_name.upper()}\n\n"
            report += self.generate_alert_report(changes)
            
        return report

if __name__ == "__main__":
    logger.add("price_monitor.log")
    
    monitor = PriceMonitor()
    results = monitor.monitor_all_labs()
    
    print(f"Monitoreo completado. {len(results)} laboratorios con cambios.")
