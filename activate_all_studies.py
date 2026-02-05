#!/usr/bin/env python3
"""
Script para activar todos los estudios pausados
"""

from pathlib import Path
import re

def activate_all_studies():
    """Activa todos los estudios con status 'paused'"""
    
    studies_file = Path('src/data/studies.ts')
    
    print("📖 Leyendo archivo de estudios...")
    content = studies_file.read_text(encoding='utf-8')
    
    # Contar pausados
    paused_count = content.count("status: 'paused'")
    print(f"   Estudios pausados encontrados: {paused_count}")
    
    if paused_count == 0:
        print("✅ No hay estudios pausados")
        return
    
    # Crear backup
    backup_file = studies_file.parent / f'studies.ts.backup.before_activation'
    backup_file.write_text(content, encoding='utf-8')
    print(f"📦 Backup creado: {backup_file.name}")
    
    # Activar todos
    new_content = content.replace("status: 'paused'", "status: 'active'")
    
    # Guardar
    studies_file.write_text(new_content, encoding='utf-8')
    
    print(f"\n✅ {paused_count} estudios activados")
    print(f"   Archivo actualizado: {studies_file}")
    print(f"\n💡 Ahora todos los estudios estarán visibles en la página")
    print(f"   Verifica en: http://localhost:30200/estudios")

if __name__ == '__main__':
    print("=" * 60)
    print(" 🚀 Activación Masiva de Estudios")
    print("=" * 60)
    print()
    
    activate_all_studies()
