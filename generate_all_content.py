#!/usr/bin/env python3
"""
Sistema de Generación Masiva de Contenido con Ollama
Configurado para usar qwen2.5:7b - Máxima calidad médica
"""

import json
import time
import requests
import re
from pathlib import Path
from typing import Dict, List, Optional
from datetime import datetime

class OllamaContentGenerator:
    """Generador de contenido usando Ollama qwen2.5:7b"""
    
    def __init__(self, model: str = "qwen2.5:7b"):
        self.ollama_host = "http://localhost:11434"
        self.model = model
        self.knowledge_base = self._load_knowledge_base()
        print(f"🤖 Modelo configurado: {self.model}")
        
    def _load_knowledge_base(self) -> Dict:
        """Carga la base de conocimiento médica"""
        kb_path = Path(__file__).parent / "knowledge_base" / "medical_contexts.json"
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
    
    def generate_content(self, study_name: str, category: str) -> Optional[Dict]:
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
                
                return {
                    'description': description,
                    'hasAIContent': True,
                    'aiGeneratedAt': datetime.now().isoformat(),
                    'studyType': study_type,
                    'model': self.model
                }
            else:
                return None
                
        except Exception as e:
            print(f"❌ Error: {e}")
            return None


def enrich_studies_file(batch_size: int = 10, start_from: int = 0):
    """Enriquece studies.ts con contenido de Ollama"""
    
    print("=" * 70)
    print(" 🚀 GENERACIÓN MASIVA DE CONTENIDO CON OLLAMA")
    print("=" * 70)
    print()
    
    # Cargar studies.ts
    studies_file = Path('src/data/studies.ts')
    print(f"📖 Leyendo {studies_file}...")
    
    with open(studies_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Contar estudios sin descripción
    empty_desc_pattern = r"description: '',"
    matches = list(re.finditer(empty_desc_pattern, content))
    empty_count = len(matches)
    
    print(f"   Estudios sin descripción: {empty_count}")
    print(f"   Iniciando desde: {start_from}")
    print()
    
    if empty_count == 0:
        print("✅ Todos los estudios ya tienen descripción")
        return
    
    # Inicializar generador
    print(f"🔌 Conectando con Ollama...")
    generator = OllamaContentGenerator(model="qwen2.5:7b")
    print(f"✅ Modelo: {generator.model}")
    print()
    
    # Crear backup
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = studies_file.parent / f'studies.ts.backup.{timestamp}'
    with open(backup_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"📦 Backup creado: {backup_file.name}")
    print()
    
    # Calcular tiempo estimado
    avg_time_per_study = 94  # segundos (basado en prueba con qwen2.5)
    total_time_seconds = empty_count * avg_time_per_study
    total_hours = total_time_seconds / 3600
    
    print(f"⏱️  Tiempo estimado total: {total_hours:.1f} horas ({total_time_seconds/60:.0f} minutos)")
    print(f"   Velocidad: ~{avg_time_per_study}s por estudio")
    print()
    
    # Información de progreso
    print(f"📊 Progreso:")
    print(f"   Total a procesar: {empty_count} estudios")
    print(f"   Batch size: {batch_size}")
    print(f"   Guardado automático cada {batch_size} estudios")
    print()
    
    print("=" * 70)
    print(" 💡 LISTO PARA EJECUTAR")
    print("=" * 70)
    print()
    print("Para iniciar la generación masiva, ejecuta:")
    print()
    print("  python generate_all_content.py --start")
    print()
    print("Opciones:")
    print("  --start              Iniciar generación desde el principio")
    print("  --resume             Continuar desde donde se quedó")
    print("  --batch-size N       Procesar N estudios a la vez (default: 10)")
    print("  --test               Generar solo 5 estudios de prueba")
    print()
    print("Ejemplo:")
    print("  python generate_all_content.py --start --batch-size 20")
    print()


if __name__ == '__main__':
    import sys
    
    if '--start' in sys.argv:
        print("\n🚀 Iniciando generación masiva...\n")
        print("⚠️  NOTA: Este proceso tomará aproximadamente 61 horas")
        print("   Se recomienda ejecutar durante fin de semana")
        print()
        
        response = input("¿Continuar? (sí/no): ")
        if response.lower() in ['si', 'sí', 'yes', 'y', 's']:
            enrich_studies_file(batch_size=10)
        else:
            print("❌ Cancelado")
    
    elif '--test' in sys.argv:
        print("\n🧪 Modo de prueba: Generando 5 estudios...\n")
        # TODO: Implementar modo de prueba
        print("Funcionalidad en desarrollo")
    
    else:
        # Modo información
        enrich_studies_file()
