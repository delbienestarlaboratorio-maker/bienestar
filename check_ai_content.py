#!/usr/bin/env python3
"""
Script para verificar el estado de contenido AI en los estudios
"""

import re
import json

# Leer el archivo
with open('src/data/studies.ts', 'r', encoding='utf-8') as f:
    content = f.read()

print("="*80)
print("VERIFICACIÓN DE CONTENIDO AI EN ESTUDIOS")
print("="*80)
print()

# Contar estudios totales
total_studies = len(re.findall(r"id:\s*'(\d+)'", content))
print(f"Total de estudios: {total_studies}")

# Contar estudios con hasAIContent: true
ai_content_true = len(re.findall(r"hasAIContent:\s*true", content))
print(f"Estudios con AI content: {ai_content_true}")

# Contar estudios con hasAIContent: false
ai_content_false = len(re.findall(r"hasAIContent:\s*false", content))
print(f"Estudios sin AI content: {ai_content_false}")

# Calcular porcentaje
if total_studies > 0:
    percentage = (ai_content_true / total_studies) * 100
    print(f"\nProgreso: {percentage:.1f}% completado")
    print(f"Restantes: {ai_content_false} estudios")

print()

# Verificar estudios con descripción vacía
empty_description = len(re.findall(r"description:\s*''", content))
print(f"Estudios con descripción vacía: {empty_description}")

# Verificar estudios con preparación vacía
empty_preparation = len(re.findall(r"preparation:\s*''", content))
print(f"Estudios con preparación vacía: {empty_preparation}")

# Verificar estudios con turnaroundTime vacío
empty_turnaround = len(re.findall(r"turnaroundTime:\s*''", content))
print(f"Estudios con turnaroundTime vacío: {empty_turnaround}")

print()
print("="*80)

# Encontrar algunos ejemplos de estudios sin AI content
print("\nEjemplos de estudios SIN contenido AI:")
print("-"*80)

# Patrón para capturar estudios completos
pattern = r"\{\s*id:\s*'(\d+)',\s*slug:\s*'([^']+)',\s*name:\s*'([^']+)'[^}]*?description:\s*'([^']*)'[^}]*?hasAIContent:\s*false"

matches = list(re.finditer(pattern, content, re.DOTALL))
for i, match in enumerate(matches[:10]):
    study_id = match.group(1)
    study_name = match.group(3)
    description = match.group(4)
    desc_status = "✓ Con descripción" if description else "✗ Sin descripción"
    print(f"{i+1}. ID {study_id}: {study_name} - {desc_status}")

if len(matches) > 10:
    print(f"... y {len(matches) - 10} más")

print()
print("="*80)
print("\nEjemplos de estudios CON contenido AI:")
print("-"*80)

# Patrón para estudios con AI content
pattern_ai = r"\{\s*id:\s*'(\d+)',\s*slug:\s*'([^']+)',\s*name:\s*'([^']+)'[^}]*?description:\s*'([^']*)'[^}]*?hasAIContent:\s*true"

matches_ai = list(re.finditer(pattern_ai, content, re.DOTALL))
for i, match in enumerate(matches_ai[:10]):
    study_id = match.group(1)
    study_name = match.group(3)
    description = match.group(4)
    desc_preview = description[:60] + "..." if len(description) > 60 else description
    print(f"{i+1}. ID {study_id}: {study_name}")
    print(f"   Descripción: {desc_preview}")

if len(matches_ai) > 10:
    print(f"... y {len(matches_ai) - 10} más")

print()
print("="*80)
print("✅ Análisis completado")
