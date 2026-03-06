#!/usr/bin/env python3
"""
Script para corregir todos los objetos incompletos en studies.ts
Agrega las propiedades faltantes: image, status, hasAIContent y cierre de objeto
"""

import re
from datetime import datetime

# Leer el archivo
with open('src/data/studies.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Crear backup
backup_file = f"src/data/studies.ts.backup.{datetime.now().strftime('%Y%m%d_%H%M%S')}"
with open(backup_file, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"✓ Backup creado: {backup_file}")

# Patrón para encontrar objetos incompletos:
# Buscar price: { ... }, seguido directamente por { (sin cierre del objeto anterior)
pattern = r"(\s+price:\s*\{\s*regular:\s*[\d.]+,\s*promotional:\s*[\d.]+\s*\},)\s*(\{)"

# Reemplazo: agregar las propiedades faltantes y el cierre del objeto
replacement = r"\1\n    image: '/images/placeholders/default_study.jpg',\n    status: 'active',\n    hasAIContent: false\n  },\n  \2"

# Aplicar el reemplazo
new_content, count = re.subn(pattern, replacement, content)

print(f"✓ Objetos incompletos corregidos: {count}")

# Guardar
with open('src/data/studies.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"✓ Archivo guardado")
print(f"✅ Proceso completado")
