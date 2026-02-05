#!/usr/bin/env python3
"""
Generador masivo de contenido con Ollama qwen2.5:7b
Procesa todos los estudios sin descripción
"""

import json
import time
import requests
import re
from pathlib import Path
from typing import Dict, Optional
from datetime import datetime

class OllamaContentGenerator:
    """Generador de contenido usando Ollama qwen2.5:7b"""
    
    def __init__(self, model: str = "qwen2.5:7b"):
        self.ollama_host = "http://localhost:11434"
        self.model = model
        self.knowledge_base = self._load_knowledge_base()
        
    def _load_knowledge_base(self) -> Dict:
        """Carga la base de conocimiento médica"""
        kb_path = Path(__file__).parent / "scraper" / "knowledge_base" / "medical_contexts.json"
        if kb_path.exists():
            with open(kb_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {}
    
    def _classify_study_type(self, study_name: str) -> str:
        """Clasifica el tipo de estudio"""
        name_upper = study_name.upper()
        
        if any(word in name_upper for word in ['ORINA', 'EGO', 'URINÁLISIS']):
            return 'orina'
        elif any(word in name_upper for word in ['HORMONA', 'PROGESTERONA', 'TESTOSTERONA', 'ESTRADIOL', 'TIROIDES']):
            return 'hormonal'
        elif any(word in name_upper for word in ['RAYOS X', 'RADIOGRAFÍA', 'RX']):
            return 'radiologia'
        elif any(word in name_upper for word in ['TOMOGRAFÍA', 'TAC', 'CT']):
            return 'tomografia'
        elif any(word in name_upper for word in ['RESONANCIA', 'RM', 'MRI']):
            return 'resonancia'
        elif any(word in name_upper for word in ['CULTIVO', 'BACTERIA', 'ANTIBIOGRAMA']):
            return 'microbiologia'
        elif any(word in name_upper for word in ['ANTICUERPO', 'IGG', 'IGM', 'INMUNO']):
            return 'inmunologia'
        elif any(word in name_upper for word in ['ADN', 'GENÉTICO', 'CROMOSOMA']):
            return 'genetica'
        elif any(word in name_upper for word in ['ECG', 'ELECTROCARDIOGRAMA', 'CARDIACO']):
            return 'cardiologia'
        else:
            return 'sangre'
    
    def _build_prompt(self, study_name: str, category: str, study_type: str) -> str:
        """Construye el prompt SEO optimizado"""
        
        context = self.knowledge_base.get(study_type, self.knowledge_base.get('sangre', {}))
        sample_type = context.get('sample_type', 'Muestra de laboratorio')
        preparation = context.get('preparation_default', 'Consulte con su médico')
        keywords = ', '.join(context.get('seo_terms', []))
        
        prompt = f"""Eres un experto médico que escribe contenido para pacientes que buscan información en Google.

CONTEXTO DEL ESTUDIO:
- Nombre técnico: {study_name}
- Tipo de muestra: {sample_type}
- Categoría: {category}

OBJETIVO: Crear contenido que:
1. Responda las preguntas que la gente hace en Google
2. Sea fácil de entender para cualquier persona
3. Inspire confianza para agendar el estudio
4. Aparezca en los primeros resultados de Google

ESTRUCTURA OBLIGATORIA:

**¿Qué es?**
[1-2 oraciones MUY claras explicando qué es el estudio. Usar lenguaje simple, no técnico.]

**¿Cuándo necesito este estudio?**
[Lista de 4-6 síntomas o situaciones que el usuario RECONOCE]
- Síntoma común 1
- Síntoma común 2
- Indicación médica típica
- Situación de vida real

**¿Qué detecta este examen?**
[Lista de 3-5 condiciones. Usar nombre común + nombre técnico entre paréntesis]
- Condición común (nombre técnico)
- Otra condición

**Preparación para el estudio:**
[Pasos ESPECÍFICOS y ACCIONABLES]
✓ {preparation.split('.')[0] if preparation else 'Consulte indicaciones específicas'}
✓ Informar medicamentos que toma actualmente
✓ Llegar puntual a su cita

**Información práctica:**
- 🕐 Resultados: [tiempo específico en días]
- 💉 Tipo de muestra: {sample_type}
- 🍽️ Ayuno: [Sí/No] - [horas si aplica]

REGLAS CRÍTICAS:
1. NUNCA usar jerga médica sin explicarla
2. SIEMPRE responder "¿Qué es?" en la primera línea
3. SIEMPRE incluir síntomas que la persona común reconoce
4. SIEMPRE dar pasos específicos de preparación
5. Usar LENGUAJE CONVERSACIONAL
6. Incluir KEYWORDS NATURALES: {keywords}
7. Longitud: 200-250 palabras MÁXIMO
8. NO mencionar precios ni nombres de laboratorios

TONO: Profesional pero cálido. Como un médico amable explicando a un paciente.

GENERA EL CONTENIDO AHORA (solo el contenido, sin introducciones):"""
        
        return prompt
    
    def generate_content(self, study_name: str, category: str) -> Optional[str]:
        """Genera contenido para un estudio"""
        
        try:
            study_type = self._classify_study_type(study_name)
            prompt = self._build_prompt(study_name, category, study_type)
            
            response = requests.post(
                f"{self.ollama_host}/api/generate",
                json={
                    "model": self.model,
                    "prompt": prompt,
                    "stream": False,
                    "options": {
                        "temperature": 0.7,
                        "top_p": 0.9
                    }
                },
                timeout=120
            )
            
            if response.status_code == 200:
                result = response.json()
                description = result.get('response', '').strip()
                return description
            else:
                return None
                
        except Exception as e:
            print(f"❌ Error: {e}")
            return None


def process_all_studies():
    """Procesa todos los estudios sin descripción"""
    
    print("\n" + "="*70)
    print(" 🚀 GENERACIÓN MASIVA DE CONTENIDO")
    print("="*70 + "\n")
    
    # Cargar studies.ts
    studies_file = Path('src/data/studies.ts')
    print(f"📖 Leyendo {studies_file}...")
    
    with open(studies_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extraer estudios
    study_pattern = r"\{\s*id:\s*'(\d+)',\s*slug:\s*'([^']+)',\s*name:\s*'([^']+)',.*?category:\s*'([^']+)',.*?description:\s*'([^']*)',"
    studies = list(re.finditer(study_pattern, content, re.DOTALL))
    
    # Filtrar solo estudios sin descripción
    empty_studies = [(m.group(1), m.group(2), m.group(3), m.group(4)) 
                     for m in studies if m.group(5) == '']
    
    total = len(empty_studies)
    print(f"   Estudios sin descripción: {total}\n")
    
    if total == 0:
        print("✅ Todos los estudios ya tienen descripción")
        return
    
    # Crear backup
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = studies_file.parent / f'studies.ts.backup.{timestamp}'
    with open(backup_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"📦 Backup: {backup_file.name}\n")
    
    # Inicializar generador
    print("🔌 Conectando con Ollama...")
    generator = OllamaContentGenerator()
    print(f"✅ Modelo: {generator.model}\n")
    
    print("="*70)
    print(" 🎯 INICIANDO PROCESAMIENTO")
    print("="*70 + "\n")
    
    # Procesar estudios
    start_time = time.time()
    processed = 0
    
    for idx, (study_id, slug, name, category) in enumerate(empty_studies, 1):
        print(f"\n🚀 [{idx}/{total}] {name}")
        print(f"   Categoría: {category}")
        
        # Generar contenido
        study_start = time.time()
        description = generator.generate_content(name, category)
        duration = time.time() - study_start
        
        if description:
            # Escapar saltos de línea y comillas simples para JavaScript
            # IMPORTANTE: Reemplazar \n con \\n (dos caracteres: backslash + n)
            description_escaped = description.replace('\\', '\\\\')  # Primero backslashes
            description_escaped = description_escaped.replace('\n', '\\n')  # Newlines → literal \n
            description_escaped = description_escaped.replace('\r', '')  # Eliminar CR
            description_escaped = description_escaped.replace("'", "\\'")  # Comillas simples
            
            # Reemplazar en el contenido
            old_pattern = f"id: '{study_id}',\\s*slug: '{slug}',\\s*name: '{name}',.*?description: '',"
            new_text = f"id: '{study_id}',\n    slug: '{slug}',\n    name: '{name}',\n    category: '{category}',\n    description: '{description_escaped}',"
            
            content = re.sub(old_pattern, new_text, content, count=1, flags=re.DOTALL)
            
            processed += 1
            words = len(description.split())
            
            print(f"   ✅ Generado en {duration:.1f}s")
            print(f"   📝 {words} palabras")
            
            # Guardar cada 10 estudios
            if processed % 10 == 0:
                with open(studies_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"\n💾 Guardado automático ({processed} estudios)")
                
                elapsed = time.time() - start_time
                avg_time = elapsed / processed
                remaining = (total - processed) * avg_time
                print(f"📊 Progreso: {processed}/{total} ({processed/total*100:.1f}%)")
                print(f"⏱️  Tiempo transcurrido: {elapsed/3600:.1f}h")
                print(f"⏱️  ETA: {remaining/3600:.1f}h")
        else:
            print(f"   ❌ Error al generar")
    
    # Guardar final
    with open(studies_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    total_time = time.time() - start_time
    
    print("\n" + "="*70)
    print(" ✅ GENERACIÓN COMPLETADA")
    print("="*70)
    print(f"\n📊 Estadísticas:")
    print(f"   Total procesado: {processed}/{total}")
    print(f"   Tiempo total: {total_time/3600:.1f} horas")
    print(f"   Promedio: {total_time/processed:.1f}s por estudio")
    print(f"\n💾 Archivo actualizado: {studies_file}")
    print(f"📦 Backup disponible: {backup_file.name}\n")


if __name__ == '__main__':
    import sys
    
    if '--start' in sys.argv:
        print("\n⚠️  ADVERTENCIA: Este proceso tomará aproximadamente 61 horas")
        print("   Se recomienda ejecutar durante fin de semana\n")
        
        response = input("¿Continuar? (sí/no): ")
        if response.lower() in ['si', 'sí', 'yes', 'y', 's']:
            process_all_studies()
        else:
            print("\n❌ Cancelado\n")
    else:
        print("\nUso: python start_generation.py --start\n")
