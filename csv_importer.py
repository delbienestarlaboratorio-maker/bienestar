import csv
import json
from pathlib import Path
import unicodedata
import re
from loguru import logger

def normalize_name(name: str) -> str:
    if not name: return ""
    # Remove accents
    name = ''.join(c for c in unicodedata.normalize('NFD', name)
                  if unicodedata.category(c) != 'Mn')
    # Lowercase and remove special chars
    name = re.sub(r'[^a-z0-9\s]', '', name.lower())
    # Remove extra spaces
    return ' '.join(name.split())

def clean_price(price_str: str) -> float:
    if not price_str: return 0.0
    # Remove $, commas, and spaces
    clean = re.sub(r'[^\d.]', '', price_str)
    try:
        return float(clean)
    except:
        return 0.0

def run_import():
    csv_path = Path(r"D:\Paginas_web\pagina\laboratorio-bienestar\csv_bienestar\LISTA DE PRECIOS HP33 CILAB.csv")
    enriched_json_path = Path(r"d:\Paginas_web\pagina\laboratorio-bienestar\scraper\data\processed\studies_enriched.json")
    output_ts_path = Path(r"d:\Paginas_web\pagina\laboratorio-bienestar\src\data\studies.ts")
    
    if not csv_path.exists():
        logger.error(f"CSV not found: {csv_path}")
        return

    if not enriched_json_path.exists():
        logger.error(f"Enriched JSON not found: {enriched_json_path}")
        return

    # Load enriched studies
    with open(enriched_json_path, 'r', encoding='utf-8') as f:
        enriched_studies = json.load(f)
    
    # Map enriched studies by normalized name
    enriched_map = {normalize_name(s['name']): s for s in enriched_studies}
    
    # Load CSV studies
    csv_studies = []
    with open(csv_path, 'r', encoding='latin-1') as f:
        reader = csv.DictReader(f)
        # Fix headers (strip spaces)
        reader.fieldnames = [name.strip() for name in reader.fieldnames]
        for row in reader:
            name = row.get('NOMBRE DE LA PRUEBA', '').strip()
            if not name: continue
            
            price = clean_price(row.get('preciolista', '0'))
            csv_studies.append({
                'name': name,
                'price': price,
                'normalized': normalize_name(name),
                'clave': row.get('CLAVE', '').strip(),
                'entrega': row.get('ENTREGA', '').strip()
            })

    logger.info(f"Loaded {len(enriched_studies)} scraped studies and {len(csv_studies)} CSV studies")

    final_studies = []
    matched_count = 0
    
    # Process scraped studies
    for study in enriched_studies:
        norm_name = normalize_name(study['name'])
        
        # Check if it's in CSV
        csv_match = next((s for s in csv_studies if s['normalized'] == norm_name), None)
        
        if csv_match:
            study['status'] = 'active'
            # Update price if CSV has it
            if csv_match['price'] > 0:
                study['price_regular'] = csv_match['price']
                study['price_promo'] = round(csv_match['price'] * 0.9, 2) # Default 10% discount
            matched_count += 1
        else:
            study['status'] = 'paused'
        
        final_studies.append(study)

    # Check for CSV studies not in scraped data
    scraped_normalized_names = {normalize_name(s['name']) for s in enriched_studies}
    new_count = 0
    for csv_s in csv_studies:
        if csv_s['normalized'] not in scraped_normalized_names:
            # Create a basic study entry
            new_study = {
                'name': csv_s['name'],
                'slug': csv_s['name'].lower().replace(' ', '-').replace('/', '-'),
                'price_regular': csv_s['price'],
                'price_promo': round(csv_s['price'] * 0.9, 2),
                'category': 'analisis-clinicos', # Default
                'description': '',
                'preparation': 'Consulte indicaciones.',
                'delivery_time': csv_s['entrega'] or '24-48 horas',
                'status': 'active',
                'hasAIContent': False,
                'image_url': '',
                'local_image_path': '/images/placeholders/default_study.jpg'
            }
            final_studies.append(new_study)
            new_count += 1

    logger.info(f"Matched: {matched_count}, Paused: {len(enriched_studies) - matched_count}, New from CSV: {new_count}")

    # Generate TS content
    # I'll use a simplified version of the integrator logic
    def escape(s):
        if not s: return ""
        return json.dumps(str(s), ensure_ascii=False)[1:-1].replace("'", "\\'")

    ts_content = """export interface Study {
    id: string;
    slug: string;
    name: string;
    category: 'analisis-clinicos' | 'check-ups' | 'imagenologia' | 'para-ella' | 'para-el';
    subcategory?: string;
    description: string;
    preparation: string;
    turnaroundTime: string;
    price: {
        regular: number;
        promotional?: number;
    };
    image: string;
    searchTerms?: string[];
    faqs?: Array<{
        question: string;
        answer: string;
    }>;
    detailedDescription?: string;
    status: 'active' | 'paused';
    hasAIContent?: boolean;
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
    
    study_blocks = []
    for idx, s in enumerate(final_studies, 1):
        # Heuristic for category
        cat = s.get('category', 'analisis-clinicos')
        if cat not in ['analisis-clinicos', 'check-ups', 'imagenologia', 'para-ella', 'para-el']:
            cat = 'analisis-clinicos'

        block = f"""  {{
    id: '{idx}',
    slug: '{escape(s.get('slug', ''))}',
    name: '{escape(s.get('name', ''))}',
    category: '{cat}',
    description: '{escape(s.get('description', ''))}',
    preparation: '{escape(s.get('preparation', ''))}',
    turnaroundTime: '{escape(s.get('delivery_time', ''))}',
    price: {{
      regular: {s.get('price_regular', 0)},
      promotional: {s.get('price_promo', 0)}
    }},
    image: '{escape(s.get('local_image_path', '/images/placeholders/default_study.jpg'))}',
    status: '{s.get('status', 'active')}',
    hasAIContent: {str(s.get('hasAIContent', False)).lower()}
  }}"""
        study_blocks.append(block)

    ts_content += ",\n".join(study_blocks)
    ts_content += "\n];\n"

    with open(output_ts_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    logger.success(f"Successfully updated {output_ts_path} with {len(final_studies)} studies")

if __name__ == "__main__":
    run_import()
