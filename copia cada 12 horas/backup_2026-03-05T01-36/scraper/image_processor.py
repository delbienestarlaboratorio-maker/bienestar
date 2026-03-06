import json
import time
import requests
from pathlib import Path
from typing import List, Dict
from loguru import logger
from scraper.config.settings import settings

class ImageProcessor:
    """
    Gestiona la obtención, generación y optimización de imágenes para los estudios.
    """
    
    def __init__(self, input_file: Path, output_dir: Path):
        self.input_file = input_file
        self.output_dir = output_dir
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.data = self._load_data()
        
    def _load_data(self) -> List[Dict]:
        if self.input_file.exists():
            with open(self.input_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        return []

    def download_image(self, url: str, filename: str) -> str:
        """Descarga una imagen y la guarda localmente"""
        try:
            response = requests.get(url, stream=True, timeout=10)
            if response.status_code == 200:
                file_path = self.output_dir / filename
                with open(file_path, 'wb') as f:
                    for chunk in response.iter_content(1024):
                        f.write(chunk)
                return str(file_path)
        except Exception as e:
            logger.error(f"Error descargando imagen {url}: {e}")
        return ""

    def _save_progress(self):
        """Guarda el estado actual de los datos"""
        output_json = self.input_file.parent / "studies_with_images.json"
        with open(output_json, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
        logger.info(f"Progreso de imágenes guardado en {output_json}")

    def process_images(self):
        """Procesa las imágenes de todos los estudios"""
        total = len(self.data)
        logger.info(f"Procesando imágenes para {total} estudios...")
        
        updated_count = 0
        
        for idx, study in enumerate(self.data):
            image_url = study.get('image_url')
            slug = study.get('slug', f"study-{idx}") # Fallback si no hay slug
            
            if image_url and image_url.startswith('http'):
                ext = image_url.split('.')[-1].split('?')[0]
                if len(ext) > 4: ext = 'jpg' # Fallback extension
                
                filename = f"{slug}.{ext}"
                local_path = self.output_dir / filename
                
                # Si ya existe, saltar (o verificar tamaño)
                if not local_path.exists():
                    logger.info(f"[{idx+1}/{total}] Descargando imagen para: {study.get('name')}")
                    saved_path = self.download_image(image_url, filename)
                    if saved_path:
                        study['local_image_path'] = f"/images/studies/{filename}"
                        updated_count += 1
                    else:
                        logger.warning(f"Fallo descarga para {slug}, usando default")
                        study['local_image_path'] = "/images/placeholders/default_study.jpg"
                else:
                    study['local_image_path'] = f"/images/studies/{filename}"
            else:
                # TODO: Generar imagen con AI o asignar placeholder
                study['local_image_path'] = "/images/placeholders/default_study.jpg"
            
            # Guardado incremental cada 50 estudios
            if (idx + 1) % 50 == 0:
                self._save_progress()
                
        # Guardar datos finales
        self._save_progress()
        logger.success(f"Procesamiento de imágenes completado. {updated_count} nuevas imágenes descargadas.")

if __name__ == "__main__":
    input_path = settings.PROCESSED_DATA_DIR / "studies_enriched.json"
    output_dir = settings.BASE_DIR.parent / "public" / "images" / "studies"
    
    if not input_path.exists():
        logger.error(f"No se encontró archivo de entrada: {input_path}")
        exit(1)
        
    processor = ImageProcessor(input_path, output_dir)
    processor.process_images()
