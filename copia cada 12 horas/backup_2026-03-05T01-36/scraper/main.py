"""
Script Principal del Sistema de Scraping
Ejecuta scraping de todos los laboratorios configurados
"""
import sys
import argparse
from datetime import datetime
from loguru import logger
from scraper.config.settings import settings
from scraper.scrapers.chopo_scraper import ChopoScraper
from scraper.scrapers.polanco_scraper import PolancoScraper
from scraper.scrapers.olab_scraper import OlabScraper
# from scraper.scrapers.salud_digna_scraper import SaludDignaScraper
from scraper.monitors.price_monitor import PriceMonitor
from scraper.utils.comparator import LaboratoryComparator

# Configurar logging
logger.remove()
logger.add(
    sys.stderr,
    level=settings.LOG_LEVEL,
    format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan> - <level>{message}</level>"
)
logger.add(
    settings.LOG_FILE,
    rotation="10 MB",
    retention="30 days",
    level="INFO"
)

class ScraperOrchestrator:
    """Orquestador del sistema de scraping"""
    
    def __init__(self):
        self.scrapers = {
            'chopo': ChopoScraper(),
            'polanco': PolancoScraper(),
            'olab': OlabScraper(),
            # 'salud_digna': SaludDignaScraper(),
        }
        self.price_monitor = PriceMonitor()
        self.comparator = LaboratoryComparator()
        
    def run_full_scraping(self, labs: list = None):
        """Ejecuta scraping completo de laboratorios seleccionados"""
        logger.info("=== Iniciando Scraping Automatizado ===")
        start_time = datetime.now()
        
        labs_to_scrape = labs or list(self.scrapers.keys())
        results = {}
        
        for lab_name in labs_to_scrape:
            if lab_name not in self.scrapers:
                logger.warning(f"Laboratorio '{lab_name}' no configurado")
                continue
                
            try:
                logger.info(f"\n--- Scraping {lab_name.upper()} ---")
                scraper = self.scrapers[lab_name]
                result = scraper.run_full_scrape()
                results[lab_name] = result
                
                # Guardar en histórico
                self._save_to_historical(lab_name, result)
                
            except Exception as e:
                logger.error(f"Error scraping {lab_name}: {e}", exc_info=True)
                results[lab_name] = {'error': str(e)}
                
        elapsed = (datetime.now() - start_time).total_seconds()
        logger.success(f"\n=== Scraping completado en {elapsed:.1f}s ===")
        
        return results
        
    def _save_to_historical(self, lab_name: str, data: dict):
        """Guarda datos en directorio histórico"""
        import json
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{lab_name}_{timestamp}.json"
        filepath = settings.HISTORICAL_DATA_DIR / filename
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            
        logger.info(f"Guardado histórico: {filepath}")
        
    def monitor_prices(self):
        """Ejecuta monitoreo de precios"""
        logger.info("\n=== Monitoreando Cambios de Precios ===")
        changes = self.price_monitor.monitor_all_labs()
        
        if changes:
            logger.warning(f"Detectados cambios en {len(changes)} laboratorios")
        else:
            logger.info("No se detectaron cambios significativos")
            
        return changes
        
    def generate_analysis(self):
        """Genera análisis comparativo"""
        logger.info("\n=== Generando Análisis Comparativo ===")
        
        try:
            # Matriz comparativa
            matrix = self.comparator.generate_comparison_matrix()
            logger.info(f"Matriz comparativa: {len(matrix)} estudios")
            
            # Mejores precios
            best_prices = self.comparator.find_best_prices()
            logger.info(f"Análisis de precios: Top {len(best_prices)} oportunidades")
            
            return {'matrix': matrix, 'best_prices': best_prices}
            
        except Exception as e:
            logger.error(f"Error generando análisis: {e}", exc_info=True)
            return None

def main():
    parser = argparse.ArgumentParser(description='Sistema de Scraping de Laboratorios Clínicos')
    parser.add_argument(
        'command',
        choices=['scrape', 'monitor', 'analyze', 'full'],
        help='Comando a ejecutar'
    )
    parser.add_argument(
        '--labs',
        nargs='+',
        choices=['chopo', 'polanco', 'olab'],
        help='Laboratorios específicos a scrapear'
    )
    
    args = parser.parse_args()
    
    orchestrator = ScraperOrchestrator()
    
    try:
        if args.command == 'scrape':
            orchestrator.run_full_scraping(args.labs)
            
        elif args.command == 'monitor':
            orchestrator.monitor_prices()
            
        elif args.command == 'analyze':
            orchestrator.generate_analysis()
            
        elif args.command == 'full':
            # Ejecutar todo el pipeline
            orchestrator.run_full_scraping(args.labs)
            orchestrator.monitor_prices()
            orchestrator.generate_analysis()
            
        logger.success("✅ Proceso completado exitosamente")
        
    except KeyboardInterrupt:
        logger.warning("\n⚠️  Proceso interrumpido por el usuario")
        sys.exit(1)
    except Exception as e:
        logger.error(f"❌ Error fatal: {e}", exc_info=True)
        sys.exit(1)

if __name__ == "__main__":
    main()
