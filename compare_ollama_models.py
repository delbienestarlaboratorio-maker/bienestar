#!/usr/bin/env python3
"""
Script de comparación de modelos Ollama
Genera contenido con diferentes modelos para el mismo estudio
"""

import json
import time
import requests
from datetime import datetime
from pathlib import Path

def generate_with_model(model: str, study_name: str, category: str) -> dict:
    """Genera contenido usando un modelo específico"""
    
    prompt = f"""Eres un experto médico que escribe contenido para pacientes que buscan información en Google.

CONTEXTO DEL ESTUDIO:
- Nombre técnico: {study_name}
- Categoría: {category}

OBJETIVO: Crear contenido que:
1. Responda las preguntas que la gente hace en Google
2. Sea fácil de entender para cualquier persona
3. Inspire confianza para agendar el estudio

ESTRUCTURA OBLIGATORIA:

**¿Qué es?**
[1-2 oraciones MUY claras explicando qué es el estudio]

**¿Cuándo necesito este estudio?**
- Síntoma común 1
- Síntoma común 2
- Indicación médica típica
- Situación de vida real

**¿Qué detecta este examen?**
- Condición 1 (nombre técnico)
- Condición 2
- Condición 3

**Preparación para el estudio:**
✓ Paso específico 1
✓ Paso específico 2
✓ Paso específico 3

**Información práctica:**
- 🕐 Resultados: [tiempo]
- 💉 Tipo de muestra: [tipo]
- 🍽️ Ayuno: [Sí/No]

REGLAS:
- Lenguaje simple y conversacional
- 200-250 palabras máximo
- NO mencionar precios ni laboratorios

GENERA EL CONTENIDO:"""
    
    print(f"\n{'='*70}")
    print(f"🤖 Generando con: {model}")
    print(f"{'='*70}")
    
    start_time = time.time()
    
    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": model,
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": 0.7,
                    "top_p": 0.9
                }
            },
            timeout=120  # 2 minutos
        )
        
        elapsed = time.time() - start_time
        
        if response.status_code == 200:
            result = response.json()
            content = result.get('response', '').strip()
            
            # Estadísticas
            word_count = len(content.split())
            char_count = len(content)
            
            print(f"✅ Generación exitosa")
            print(f"   Tiempo: {elapsed:.1f} segundos")
            print(f"   Palabras: {word_count}")
            print(f"   Caracteres: {char_count}")
            
            return {
                'model': model,
                'content': content,
                'time_seconds': round(elapsed, 1),
                'word_count': word_count,
                'char_count': char_count,
                'success': True
            }
        else:
            print(f"❌ Error: {response.status_code}")
            return {
                'model': model,
                'success': False,
                'error': f"HTTP {response.status_code}"
            }
            
    except Exception as e:
        elapsed = time.time() - start_time
        print(f"❌ Error: {e}")
        return {
            'model': model,
            'success': False,
            'error': str(e),
            'time_seconds': round(elapsed, 1)
        }

def compare_models(study_name: str, category: str, models: list):
    """Compara múltiples modelos para el mismo estudio"""
    
    print("\n" + "="*70)
    print(" 🔬 COMPARACIÓN DE MODELOS OLLAMA")
    print("="*70)
    print(f"\nEstudio: {study_name}")
    print(f"Categoría: {category}")
    print(f"Modelos a comparar: {', '.join(models)}")
    print()
    
    results = []
    
    for model in models:
        result = generate_with_model(model, study_name, category)
        results.append(result)
        time.sleep(2)  # Pausa entre generaciones
    
    # Guardar resultados
    output_file = f"model_comparison_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump({
            'study': study_name,
            'category': category,
            'timestamp': datetime.now().isoformat(),
            'results': results
        }, f, ensure_ascii=False, indent=2)
    
    print(f"\n📊 Resultados guardados en: {output_file}")
    
    # Mostrar comparación
    print("\n" + "="*70)
    print(" 📊 RESUMEN COMPARATIVO")
    print("="*70)
    
    for result in results:
        if result['success']:
            print(f"\n🤖 {result['model']}")
            print(f"   ⏱️  Tiempo: {result['time_seconds']}s")
            print(f"   📝 Palabras: {result['word_count']}")
            print(f"   ✅ Estado: Exitoso")
        else:
            print(f"\n🤖 {result['model']}")
            print(f"   ❌ Error: {result.get('error', 'Desconocido')}")
    
    # Mostrar contenido completo
    print("\n" + "="*70)
    print(" 📄 CONTENIDO GENERADO")
    print("="*70)
    
    for result in results:
        if result['success']:
            print(f"\n{'='*70}")
            print(f"MODELO: {result['model']}")
            print(f"TIEMPO: {result['time_seconds']}s | PALABRAS: {result['word_count']}")
            print(f"{'='*70}")
            print()
            print(result['content'])
            print()
    
    return results

if __name__ == '__main__':
    # Estudio de prueba
    study_name = "EXAMEN GENERAL DE ORINA"
    category = "Análisis Clínicos"
    
    # Modelos a comparar
    models = [
        "llama3.2:latest",
        "qwen2.5:7b"
    ]
    
    # Ejecutar comparación
    results = compare_models(study_name, category, models)
    
    print("\n✅ Comparación completada")
    print("\nRevisa los resultados arriba para decidir qué modelo usar.")
