#!/usr/bin/env python3
"""
Analizador de patrones en datos scrapeados de Chopo
Identifica estructura común de descripciones, preparaciones y procedimientos
"""

import json
from collections import Counter
from pathlib import Path

def analyze_scraping_patterns():
    """Analiza los patrones en los datos scrapeados"""
    
    # Cargar datos
    data_file = Path('scraper/data/raw/chopo_detailed_final_20260121_213908.json')
    with open(data_file, encoding='utf-8') as f:
        studies = json.load(f)
    
    print(f"📊 Análisis de {len(studies)} estudios scrapeados\n")
    
    # 1. Analizar descripciones
    print("=" * 70)
    print("1. DESCRIPCIONES")
    print("=" * 70)
    
    descriptions = []
    for study in studies:
        desc = study.get('schema_product', {}).get('description', '')
        if desc:
            descriptions.append(desc)
    
    unique_descriptions = set(descriptions)
    print(f"Total descripciones: {len(descriptions)}")
    print(f"Descripciones únicas: {len(unique_descriptions)}")
    print(f"% Genéricas: {(1 - len(unique_descriptions)/len(descriptions)) * 100:.1f}%\n")
    
    print("Descripciones más comunes:")
    desc_counts = Counter(descriptions)
    for i, (desc, count) in enumerate(desc_counts.most_common(5), 1):
        print(f"\n{i}. [{count} estudios]")
        print(f"   {desc[:150]}...")
    
    # 2. Analizar preparaciones (delivery_time)
    print("\n" + "=" * 70)
    print("2. PREPARACIONES (delivery_time)")
    print("=" * 70)
    
    preparations = []
    valid_preps = []
    
    for study in studies:
        prep = study.get('delivery_time', '')
        if prep:
            preparations.append(prep)
            # Filtrar genéricos
            if 'Laboratorio' not in prep and len(prep) > 30:
                valid_preps.append({
                    'name': study.get('name', ''),
                    'prep': prep
                })
    
    print(f"Total con delivery_time: {len(preparations)}")
    print(f"Con preparación válida: {len(valid_preps)}")
    print(f"Vacíos: {len(studies) - len(preparations)}")
    
    # Tipos de preparación
    print("\n📋 Tipos de preparación identificados:")
    
    prep_types = {
        'orina': [],
        'ayuno': [],
        'radiología': [],
        'excremento': [],
        'sangre': [],
        'otro': []
    }
    
    for item in valid_preps[:100]:  # Analizar primeros 100
        prep_lower = item['prep'].lower()
        if 'orina' in prep_lower:
            prep_types['orina'].append(item)
        elif 'ayun' in prep_lower:
            prep_types['ayuno'].append(item)
        elif 'radiografía' in prep_lower or 'radiólogo' in prep_lower:
            prep_types['radiología'].append(item)
        elif'excremento' in prep_lower or 'heces' in prep_lower:
            prep_types['excremento'].append(item)
        elif 'sangre' in prep_lower or 'venosa' in prep_lower:
            prep_types['sangre'].append(item)
        else:
            prep_types['otro'].append(item)
    
    for tipo, items in prep_types.items():
        if items:
            print(f"\n  {tipo.upper()}: {len(items)} estudios")
            if items:
                print(f"  Ejemplo: {items[0]['name']}")
                print(f"  {items[0]['prep'][:120]}...")
    
    # 3. Patrones comunes de palabras clave
    print("\n" + "=" * 70)
    print("3. PALABRAS CLAVE MÉDICAS COMUNES")
    print("=" * 70)
    
    all_text = ' '.join([s.get('name', '') for s in studies]).lower()
    
    medical_terms = {
        'sangre': all_text.count('sangre'),
        'anticuerpos': all_text.count('anticuerpo'),
        'hormona': all_text.count('hormona'),
        'vitamina': all_text.count('vitamina'),
        'proteína': all_text.count('proteína') + all_text.count('proteina'),
        'glucosa': all_text.count('glucosa'),
        'colesterol': all_text.count('colesterol'),
        'triglicéridos': all_text.count('triglicérido'),
        'hepatitis': all_text.count('hepatitis'),
        'tiroides': all_text.count('tiroides'),
    }
    
    print("\nFrecuencia de términos médicos:")
    for term, count in sorted(medical_terms.items(), key=lambda x: x[1], reverse=True):
        print(f"  {term}: {count}")
    
    # 4. Estructuras de estudio por categoría
    print("\n" + "=" * 70)
    print("4. EXPORTAR EJEMPLOS PARA CONTEXTO")
    print("=" * 70)
    
    # Guardar ejemplos bien estructurados
    examples = {
        'orina': prep_types['orina'][:3],
        'ayuno': prep_types['ayuno'][:3],
        'radiología': prep_types['radiología'][:3],
    }
    
    with open('scraper_patterns_examples.json', 'w', encoding='utf-8') as f:
        json.dump(examples, f, ensure_ascii=False, indent=2)
    
    print("✅ Ejemplos exportados a: scraper_patterns_examples.json")
    
    return {
        'total_studies': len(studies),
        'unique_descriptions': len(unique_descriptions),
        'valid_preparations': len(valid_preps),
        'prep_types': {k: len(v) for k, v in prep_types.items()},
        'medical_terms': medical_terms
    }

if __name__ == '__main__':
    results = analyze_scraping_patterns()
    print(f"\n{'='*70}")
    print("✅ Análisis completado")
    print(f"{'='*70}")
