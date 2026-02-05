#!/usr/bin/env python3
"""
Script final simplificado: identifica IDs duplicados a eliminar
Genera un reporte con los IDs exactos y luego los elimina usando búsqueda/reemplazo
"""

import re
from collections import defaultdict
from datetime import datetime

def find_duplicate_ids():
    """Encuentra los IDs de estudios duplicados que deben eliminarse"""
    
    with open('src/data/studies.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extraer todos los estudios con regex simple
    # Patrón: capturar id, name, y precio regular
    pattern = r"\{\s*id:\s*'(\d+)',\s*slug:\s*'([^']+)',\s*name:\s*'([^']+)'[^}]*?regular:\s*([\d.]+)"
    
    matches = list(re.finditer(pattern, content, re.DOTALL))
    print(f"Total de estudios encontrados: {len(matches)}\n")
    
    # Agrupar por nombre
    groups = defaultdict(list)
    for match in matches:
        study_id = match.group(1)
        study_slug = match.group(2)
        study_name = match.group(3)
        study_price = float(match.group(4))
        
        groups[study_name].append({
            'id': study_id,
            'slug': study_slug,
            'name': study_name,
            'price': study_price
        })
    
    # Encontrar duplicados
    duplicates = {name: items for name, items in groups.items() if len(items) > 1}
    print(f"Estudios con duplicados: {len(duplicates)}")
    print(f"Total de entradas duplicadas a eliminar: {sum(len(items)-1 for items in duplicates.values())}\n")
    
    # Seleccionar qué IDs eliminar
    ids_to_remove = []
    
    for name, items in sorted(duplicates.items()):
        # Ordenar: primero por precio > 0, luego por ID más bajo
        items_sorted = sorted(items, key=lambda x: (x['price'] > 0, -int(x['id'])), reverse=True)
        best = items_sorted[0]
        
        print(f"{name}:")
        for item in items_sorted:
            status = "✓ MANTENER" if item == best else "✗ ELIMINAR"
            print(f"  {status} - ID {item['id']} (${item['price']})")
            if item != best:
                ids_to_remove.append(item['id'])
        print()
    
    return ids_to_remove, content

def remove_studies_by_ids(ids_to_remove, content):
    """Elimina estudios por sus IDs"""
    
    # Crear backup
    backup_file = f"src/data/studies.ts.backup.{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    with open(backup_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Backup creado: {backup_file}\n")
    
    # Para cada ID, encontrar y eliminar el objeto completo
    new_content = content
    removed_count = 0
    
    for study_id in ids_to_remove:
        # Patrón para encontrar el objeto completo con este ID
        # Buscar desde { id: 'XXXX' hasta el siguiente },
        pattern = r",?\s*\{\s*id:\s*'" + study_id + r"'[^}]*?\},?"
        
        matches = list(re.finditer(pattern, new_content, re.DOTALL))
        if matches:
            # Eliminar el primer match
            match = matches[0]
            new_content = new_content[:match.start()] + new_content[match.end():]
            removed_count += 1
            print(f"✓ Eliminado ID {study_id}")
    
    # Limpiar comas dobles que puedan haber quedado
    new_content = re.sub(r',\s*,', ',', new_content)
    
    # Guardar
    with open('src/data/studies.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"\n✓ Archivo actualizado")
    print(f"✓ Total eliminados: {removed_count} estudios")
    
    return removed_count

if __name__ == "__main__":
    print("="*80)
    print("ELIMINACIÓN DE DUPLICADOS - VERSIÓN FINAL")
    print("="*80)
    print()
    
    ids_to_remove, content = find_duplicate_ids()
    
    if ids_to_remove:
        print(f"\nSe eliminarán {len(ids_to_remove)} estudios duplicados")
        print("Procediendo...\n")
        removed = remove_studies_by_ids(ids_to_remove, content)
        print(f"\n✅ Proceso completado. Eliminados {removed} duplicados.")
    else:
        print("✅ No se encontraron duplicados")
