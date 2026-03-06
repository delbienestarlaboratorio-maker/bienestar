#!/usr/bin/env python3
"""
Script para corregir problemas de encoding UTF-8 en studies.ts
"""

import re
from datetime import datetime

# Leer el archivo
print("Leyendo el archivo...")

with open('src/data/studies.ts', 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()
print("✓ Archivo leído")

# Crear backup
backup_file = f"src/data/studies.ts.backup.{datetime.now().strftime('%Y%m%d_%H%M%S')}"
with open(backup_file, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"✓ Backup creado: {backup_file}")

# Mapa de correcciones comunes de caracteres mal codificados
# UTF-8 mal interpretado como Latin-1
corrections = {
    'Ã': 'Í',
    'Ã¡': 'á',
    'Ã©': 'é',
    'Ã­': 'í',
    'Ã³': 'ó',
    'Ãº': 'ú',
    'Ã±': 'ñ',
    'Ã': 'Á',
    'Ã‰': 'É',
    'Ã"': 'Ó',
    'Ãš': 'Ú',
    'Ã'': 'Ñ',
    'Ã¼': 'ü',
    'Ãœ': 'Ü',
    # Casos específicos detectados
    'BIOMETRÃA': 'BIOMETRÍA',
    'HEMÃTICA': 'HEMÁTICA',
}

# Aplicar correcciones
new_content = content
fixed_count = 0
fixed_examples = []

for wrong, correct in corrections.items():
    if wrong in new_content:
        count = new_content.count(wrong)
        new_content = new_content.replace(wrong, correct)
        fixed_count += count
        fixed_examples.append(f"'{wrong}' → '{correct}' ({count} veces)")
        print(f"✓ Corregido '{wrong}' → '{correct}' ({count} veces)")

if fixed_count == 0:
    print("\n⚠️ No se encontraron caracteres mal codificados conocidos")
    print("Buscando caracteres problemáticos...")
    
    # Buscar caracteres sospechosos
    suspicious = re.findall(r'[^\x00-\x7F\u00C0-\u024F\u1E00-\u1EFF]', content)
    if suspicious:
        print(f"Caracteres sospechosos encontrados: {set(suspicious)}")

# Guardar el archivo corregido
with open('src/data/studies.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"\n✓ Archivo guardado con encoding UTF-8")
print(f"✓ Total de correcciones: {fixed_count}")

if fixed_examples:
    print("\nCorrecciones aplicadas:")
    for example in fixed_examples[:10]:
        print(f"  - {example}")

print(f"\n✅ Proceso completado")
