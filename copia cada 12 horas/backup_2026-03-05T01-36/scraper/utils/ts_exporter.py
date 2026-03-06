"""
Exportador de datos a TypeScript
Lee los archivos JSON crudos y genera src/data/studies.ts
"""
import json
import re
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional
import unicodedata

# Configuración
BASE_DIR = Path(__file__).parent.parent.parent
RAW_DATA_DIR = BASE_DIR / "scraper" / "data" / "raw"
OUTPUT_FILE = BASE_DIR / "src" / "data" / "studies.ts"

# Mapeo de categorías
CATEGORY_KEYWORDS = {
    'check-ups': ['check', 'perfil', 'paquete', 'integral', 'basico', 'ejecutivo'],
    'imagenologia': ['rayos', 'rx', 'placa', 'resonancia', 'tomografia', 'ultrasonido', 'mastografia', 'densitometria'],
    'para-ella': ['mujer', 'femenino', 'ginecologico', 'papanicolau', 'mama', 'embarazo'],
    'para-el': ['hombre', 'masculino', 'prostatico', 'psa'],
    'analisis-clinicos': [] # Default
}

# Imágenes por defecto (placeholders)
DEFAULT_IMAGES = {
    'check-ups': '/images/estudios/check-up-ejecutivo.webp',
    'imagenologia': '/images/estudios/rx-torax.webp',
    'para-ella': '/images/estudios/mastografia.webp',
    'para-el': '/images/estudios/psa.webp',
    'analisis-clinicos': '/images/estudios/biometria-hematica.webp'
}

def slugify(text: str) -> str:
    """Genera un slug URL-friendly"""
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    text = re.sub(r'[^\w\s-]', '', text).lower()
    return re.sub(r'[-\s]+', '-', text).strip('-')

def determine_category(name: str, category_hint: str = "") -> str:
    """Determina la categoría basada en el nombre y hint"""
    name_lower = name.lower()
    hint_lower = category_hint.lower() if category_hint else ""
    
    # Prioridad 1: Hint explícito si coincide con nuestras categorías
    if hint_lower in CATEGORY_KEYWORDS:
        return hint_lower
        
    # Prioridad 2: Palabras clave en nombre
    for cat, keywords in CATEGORY_KEYWORDS.items():
        if cat == 'analisis-clinicos': continue
        if any(kw in name_lower for kw in keywords):
            return cat
            
    return 'analisis-clinicos'

def load_latest_data() -> List[Dict]:
    """Carga los datos más recientes de todos los laboratorios"""
    all_studies = []
    
    # Encontrar archivos _detailed_ más recientes
    lab_files = {}
    for file in RAW_DATA_DIR.glob("*_detailed_*.json"):
        lab_name = file.name.split('_')[0]
        if lab_name not in lab_files or file.stat().st_mtime > lab_files[lab_name].stat().st_mtime:
            lab_files[lab_name] = file
            
    print(f"Archivos encontrados: {[f.name for f in lab_files.values()]}")
    
    for file in lab_files.values():
        try:
            with open(file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                all_studies.extend(data)
        except Exception as e:
            print(f"Error leyendo {file}: {e}")
            
    return all_studies

def process_studies(raw_studies: List[Dict]) -> List[Dict]:
    """Procesa y deduplica estudios"""
    processed = {}
    
    for raw in raw_studies:
        name = raw.get('name', '').strip()
        if not name: continue
        
        # Normalizar nombre para deduplicación
        norm_name = name.upper()
        
        # Determinar precio (priorizar promo)
        price_reg = raw.get('price_regular')
        price_promo = raw.get('price_promo')
        
        if not price_reg and not price_promo:
            continue # Saltar si no hay precio
            
        final_price_reg = price_reg or price_promo
        final_price_promo = price_promo if price_promo and price_promo < final_price_reg else None
        
        category = determine_category(name, raw.get('category', ''))
        slug = slugify(name)
        
        study_data = {
            'id': slug, # Usar slug como ID por ahora
            'slug': slug,
            'name': name,
            'category': category,
            'description': raw.get('description') or f"Estudio de {category} para evaluación clínica.",
            'preparation': raw.get('preparation') or "Ayuno de 8 horas. Consulte a su médico.",
            'turnaroundTime': raw.get('delivery_time') or "24 a 48 horas",
            'price': {
                'regular': final_price_reg,
                'promotional': final_price_promo
            },
            'image': DEFAULT_IMAGES.get(category, DEFAULT_IMAGES['analisis-clinicos']),
            'faqs': [] # TODO: Generar FAQs genéricas
        }
        
        # Estrategia de merge:
        # Si ya existe, nos quedamos con el que tenga descripción más larga o mejor precio
        if norm_name in processed:
            existing = processed[norm_name]
            # Si el nuevo tiene descripción y el viejo no (o es default), actualizar
            if len(study_data['description']) > len(existing['description']):
                processed[norm_name] = study_data
            # O si el precio es mejor (opcional, por ahora priorizamos calidad de info)
        else:
            processed[norm_name] = study_data
            
    return list(processed.values())

def generate_ts_content(studies: List[Dict]) -> str:
    """Genera el contenido del archivo TypeScript"""
    ts_content = """export interface Study {
    id: string;
    slug: string;
    name: string;
    category: 'analisis-clinicos' | 'check-ups' | 'imagenologia' | 'para-ella' | 'para-el';
    description: string;
    preparation: string;
    turnaroundTime: string;
    price: {
        regular: number;
        promotional?: number;
    };
    image: string;
    faqs?: Array<{
        question: string;
        answer: string;
    }>;
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
        description: 'Rayos X, ultrasonidos y estudios de imagen de alta resolución.',
        image: '/images/estudios/rx-torax.webp'
    },
    {
        id: 'para-ella',
        name: 'Para Ella',
        description: 'Estudios especializados en salud femenina y control prenatal.',
        image: '/images/estudios/mastografia.webp'
    },
    {
        id: 'para-el',
        name: 'Para Él',
        description: 'Perfiles diseñados para el cuidado de la salud masculina.',
        image: '/images/estudios/psa.webp'
    }
];

export const studies: Study[] = [
"""
    
    for study in studies:
        # Formatear precio
        price_str = f"        regular: {study['price']['regular']}"
        if study['price']['promotional']:
            price_str += f",\n        promotional: {study['price']['promotional']}"
            
        # Formatear FAQs
        faqs_str = ""
        if study.get('faqs'):
            faqs_str = "    faqs: [\n"
            for faq in study['faqs']:
                faqs_str += f"        {{ question: '{faq['question']}', answer: '{faq['answer']}' }},\n"
            faqs_str += "    ],"

        entry = f"""    {{
        id: '{study['id']}',
        slug: '{study['slug']}',
        name: '{study['name'].replace("'", "\\'")}',
        category: '{study['category']}',
        description: '{study['description'].replace("'", "\\'").replace(chr(10), " ")}',
        preparation: '{study['preparation'].replace("'", "\\'").replace(chr(10), " ")}',
        turnaroundTime: '{study['turnaroundTime'].replace("'", "\\'")}',
        price: {{
    {price_str}
        }},
        image: '{study['image']}',
    {faqs_str}
    }},
"""
        ts_content += entry
        
    ts_content += "];\n"
    return ts_content

def main():
    print("Iniciando exportación a TypeScript...")
    raw_data = load_latest_data()
    print(f"Cargados {len(raw_data)} registros crudos.")
    
    processed_studies = process_studies(raw_data)
    print(f"Procesados {len(processed_studies)} estudios únicos.")
    
    ts_content = generate_ts_content(processed_studies)
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(ts_content)
        
    print(f"Archivo generado exitosamente: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
