import json
from pathlib import Path
from typing import List, Dict
from loguru import logger
from scraper.config.settings import settings

class DataIntegrator:
    """
    Integra los datos procesados en el archivo TypeScript de la aplicación.
    """
    
    def __init__(self, input_file: Path, output_ts_file: Path):
        self.input_file = input_file
        self.output_ts_file = output_ts_file
        self.data = self._load_data()
        
    def _load_data(self) -> List[Dict]:
        if self.input_file.exists():
            with open(self.input_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        logger.error(f"No se encontró archivo de entrada: {self.input_file}")
        return []

    def _escape_string(self, s: str) -> str:
        """Escapa comillas simples y caracteres especiales para TS usando json.dumps"""
        if not s:
            return ""
        # json.dumps escapa todo correctamente (incluyendo backslashes y unicode)
        # Luego quitamos las comillas exteriores que agrega json.dumps
        # Y reemplazamos comillas dobles escapadas por comillas simples escapadas si es necesario,
        # pero como estamos usando comillas simples en el template de TS, es mejor
        # simplemente usar json.dumps y asegurarnos de que el template use comillas dobles
        # o escapar las comillas simples manualmente después de json.dumps.
        escaped = json.dumps(str(s), ensure_ascii=False)[1:-1]
        return escaped.replace("'", "\\'")

    def generate_ts_content(self) -> str:
        """Genera el contenido del archivo studies.ts"""
        
        ts_header = """export interface Study {
    id: string;
    slug: string;
    name: string;
    category: 'analisis-clinicos' | 'check-ups' | 'imagenologia' | 'para-ella' | 'para-el';
    subcategory?: string; // ID from subcategories.ts
    description: string;
    preparation: string;
    turnaroundTime: string;
    price: {
        regular: number;
        promotional?: number;
    };
    image: string;
    searchTerms?: string[]; // Common abbreviations and synonyms for better search
    faqs?: Array<{
        question: string;
        answer: string;
    }>;
    // SEO & Content fields
    detailedDescription?: string;
    whatIsIt?: string;
    whatDoesItDetect?: string[];
    benefits?: string[];
    sampleType?: string;
    procedure?: string[];
    detailedPreparation?: {
        title: string;
        instructions: string[];
        restrictions?: string[];
        recommendations?: string[];
    };
    included?: string[];
    relatedStudies?: string[];
}

export const categories = [
    {
        id: 'analisis-clinicos',
        name: 'Análisis Clínicos',
        description: 'Estudios de sangre, orina y otros fluidos corporales para diagnóstico preciso.',
        image: '/images/estudios/biometria-hematica.webp'
    },
    {
        id: 'check-ups',
        name: 'Check-ups y Perfiles',
        description: 'Paquetes integrales diseñados para evaluar tu estado general de salud.',
        image: '/images/estudios/check-up-ejecutivo.webp'
    },
    {
        id: 'imagenologia',
        name: 'Imagenología',
        description: 'Estudios de diagnóstico por imagen como Rayos X, Ultrasonido y Tomografía.',
        image: '/images/estudios/ultrasonido.webp'
    },
    {
        id: 'para-ella',
        name: 'Para Ella',
        description: 'Estudios especializados en salud femenina y prevención.',
        image: '/images/estudios/papanicolaou.webp'
    },
    {
        id: 'para-el',
        name: 'Para Él',
        description: 'Estudios enfocados en la salud masculina y detección oportuna.',
        image: '/images/estudios/antigeno-prostatico.webp'
    }
];

export const studies: Study[] = [
"""
        
        studies_ts = []
        for idx, study in enumerate(self.data, 1):
            # Mapeo de campos
            name = self._escape_string(study.get('name', ''))
            slug = study.get('slug', f"study-{idx}")
            desc = self._escape_string(study.get('description', ''))
            
            price_regular = study.get('price_regular', 0)
            price_promo = study.get('price_promo', 0)
            
            # Categoría (Heurística mejorada)
            category = 'analisis-clinicos' # Default
            url_lower = study.get('url', '').lower()
            name_upper = study.get('name', '').upper()
            
            if 'check-up' in url_lower or 'perfil' in url_lower or 'check up' in name_upper:
                category = 'check-ups'
            elif any(x in url_lower or x in name_upper for x in ['ULTRASONIDO', 'RAYOS X', 'TOMOGRAFÍA', 'RESONANCIA', 'MASTOGRAFIA', 'RX', 'TAC', 'RMN']):
                category = 'imagenologia'
            elif any(x in url_lower or x in name_upper for x in ['GINECOLOGIA', 'PAPANICOLAOU', 'COLPOSCOPIA', 'MASTOGRAFIA']):
                category = 'para-ella'
            elif 'PROSTATICO' in name_upper:
                category = 'para-el'
            
            image = study.get('local_image_path', '/images/placeholders/default_study.jpg')
            preparation = self._escape_string(study.get('preparation', 'Consulte las indicaciones específicas.'))
            delivery = self._escape_string(study.get('delivery_time', '24-48 horas'))
            
            # Arrays
            benefits = study.get('benefits', [])
            benefits_str = ", ".join([f"'{self._escape_string(b)}'" for b in benefits])
            
            includes = study.get('includes', [])
            if isinstance(includes, str): includes = [includes]
            includes_str = ", ".join([f"'{self._escape_string(i)}'" for i in includes])
            
            questions = study.get('common_questions', [])
            faqs_str = ", ".join([f"{{ question: '{self._escape_string(q['question'])}', answer: '{self._escape_string(q['answer'])}' }}" for q in questions])
            
            search_terms = study.get('searchTerms', [])
            search_terms_str = ", ".join([f"'{self._escape_string(t)}'" for t in search_terms])

            study_block = f"""  {{
    id: '{idx}',
    slug: '{slug}',
    name: '{name}',
    category: '{category}',
    description: '{desc}',
    preparation: '{preparation}',
    turnaroundTime: '{delivery}',
    price: {{
      regular: {price_regular},
      promotional: {price_promo if price_promo > 0 else 'undefined'}
    }},
    image: '{image}',
    searchTerms: [{search_terms_str}],
    faqs: [{faqs_str}],
    detailedDescription: '{self._escape_string(study.get('long_description', ''))}',
    benefits: [{benefits_str}],
    included: [{includes_str}]
  }}"""
            studies_ts.append(study_block)
            
        return ts_header + ",\n".join(studies_ts) + "\n];\n"

    def run(self):
        """Ejecuta la integración"""
        logger.info(f"Integrando {len(self.data)} estudios a {self.output_ts_file}...")
        content = self.generate_ts_content()
        
        with open(self.output_ts_file, 'w', encoding='utf-8') as f:
            f.write(content)
            
        logger.success("Integración completada exitosamente.")

if __name__ == "__main__":
    # El input del integrador es el output del procesador de imágenes (que actualiza las rutas)
    # Pero el procesador de imágenes guarda en "studies_with_images.json" en el mismo dir que el input
    
    input_path = settings.PROCESSED_DATA_DIR / "studies_with_images.json"
    
    # Si no existe (ej. no se corrió image processor), usar el enriched
    if not input_path.exists():
        input_path = settings.PROCESSED_DATA_DIR / "studies_enriched.json"
        
    output_ts = settings.BASE_DIR.parent / "src" / "data" / "studies.ts"
    
    if not input_path.exists():
        logger.error(f"No se encontró archivo de entrada: {input_path}")
        exit(1)
        
    integrator = DataIntegrator(input_path, output_ts)
    integrator.run()
