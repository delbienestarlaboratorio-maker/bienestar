import os
from pathlib import Path
from typing import Dict, List
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

class Settings:
    """Configuración general del sistema"""
    
    def __init__(self):
        # Directorios
        self.BASE_DIR: Path = Path(__file__).parent.parent
        self.DATA_DIR: Path = self.BASE_DIR / "data"
        self.RAW_DATA_DIR: Path = self.DATA_DIR / "raw"
        self.PROCESSED_DATA_DIR: Path = self.DATA_DIR / "processed"
        self.HISTORICAL_DATA_DIR: Path = self.DATA_DIR / "historical"
        
        # Scraping
        self.USER_AGENT: str = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        self.REQUEST_TIMEOUT: int = 30
        self.MAX_RETRIES: int = 3
        self.DELAY_BETWEEN_REQUESTS: float = 1.5  # segundos
        
        # Laboratorios
        self.LABORATORIES: Dict[str, str] = {
            "chopo": "https://www.chopo.com.mx",
            "polanco": "https://lmpolanco.com",
            "salud_digna": "https://www.salud-digna.org",
            "olab": "https://olab.com.mx"
        }
        
        # Estudios de interés (para monitoreo prioritario)
        self.PRIORITY_STUDIES: List[str] = [
            "QUÍMICA INTEGRAL DE 45 ELEMENTOS",
            "BIOMETRÍA HEMÁTICA",
            "EXAMEN GENERAL DE ORINA",
            "PERFIL TIROIDEO",
            "ANTÍGENO PROSTÁTICO",
            "GLUCOSA",
            "COLESTEROL TOTAL",
            "TRIGLICÉRIDOS",
            "HEMOGLOBINA GLUCOSILADA",
            "PERFIL HEPÁTICO",
            "PERFIL RENAL",
            "CHECK UP BÁSICO",
            "RESONANCIA MAGNÉTICA",
            "TOMOGRAFÍA",
            "ULTRASONIDO"
        ]
        
        # Monitoreo de precios
        self.PRICE_CHANGE_THRESHOLD: float = 5.0  # % de cambio para alertar
        self.MONITOR_SCHEDULE: str = "0 8 * * *"  # Cron: diario a las 8 AM
        
        # Base de datos
        self.DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./data/scraper.db")
        
        # Logging
        self.LOG_LEVEL: str = "INFO"
        self.LOG_FILE: Path = self.BASE_DIR / "scraper.log"
        
        # Crear directorios si no existen
        for dir_path in [self.DATA_DIR, self.RAW_DATA_DIR, 
                         self.PROCESSED_DATA_DIR, self.HISTORICAL_DATA_DIR]:
            dir_path.mkdir(parents=True, exist_ok=True)

# Instancia global
settings = Settings()
