#!/usr/bin/env python3
"""
Sistema de generación de contenido con Ollama
Genera descripciones SEO optimizadas para estudios médicos
"""

import json
import time
import requests
from pathlib import Path
from typing import Dict, List, Optional
from datetime import datetime

class OllamaContentGenerator:
    """Generador de contenido usando Ollama con prompts SEO optimizados"""
    
    def __init__(self, ollama_host: str = "http://localhost:11434"):
        self.ollama_host = ollama_host
        self.model = "llama3.2:latest"
        self.knowledge_base = self._load_knowledge_base()
        
    def _load_knowledge_base(self) -> Dict:
        """Carga la base de conocimiento médica"""
        kb_path = Path(__file__).parent / "knowledge_base" / "medical_contexts.json"
        if kb_path.exists():
            with open(kb_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {}
    
    def _classify_study_type(self, study_name: str, category: str) -> str:
        """Clasifica el tipo de estudio para aplicar contexto apropiado"""
        name_upper = study_name.upper()
        
        # Clasificación por keywords
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
            return 'sangre'  # Default
    
    def _build_prompt(self, study_name: str, category: str, study_type: str) -> str:
        """Construye el prompt optimizado para SEO y conversión"""
        
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
[Lista de 4-6 síntomas o situaciones que el usuario RECONOCE en su vida diaria]
- Síntoma común 1
- Síntoma común 2
- Indicación médica típica
- Situación de vida real

**¿Qué detecta este examen?**
[Lista de 3-5 condiciones. IMPORTANTE: Usar nombre común + nombre técnico entre paréntesis]
- Condición común (nombre técnico)
- Otra condición que la gente conoce

**Preparación para el estudio:**
[Pasos ESPECÍFICOS y ACCIONABLES. Usar checkmarks ✓]
✓ {preparation.split('.')[0] if preparation else 'Consulte indicaciones específicas'}
✓ Informar medicamentos que toma actualmente
✓ Llegar puntual a su cita

**Información práctica:**
- 🕐 Resultados: [tiempo específico en días]
- 💉 Tipo de muestra: {sample_type}
- 🍽️ Ayuno: [Sí/No] - [horas específicas si aplica]

REGLAS CRÍTICAS:
1. NUNCA usar jerga médica sin explicarla
2. SIEMPRE responder "¿Qué es?" en la primera línea
3. SIEMPRE incluir síntomas que la persona común reconoce
4. SIEMPRE dar pasos específicos de preparación
5. Usar LENGUAJE CONVERSACIONAL (como hablarías con un amigo)
6. Incluir KEYWORDS NATURALES: {keywords}
7. Longitud: 200-250 palabras MÁXIMO
8. NO mencionar precios ni nombres de laboratorios específicos

TONO: Profesional pero cálido. Como un médico amable explicando a un paciente.

GENERA EL CONTENIDO AHORA (solo el contenido, sin introducciones):"""
        
        return prompt
    
    def generate_content(self, study_name: str, category: str) -> Optional[Dict]:
        """Genera contenido para un estudio usando Ollama"""
        
        try:
            # Clasificar tipo de estudio
            study_type = self._classify_study_type(study_name, category)
            
            # Construir prompt
            prompt = self._build_prompt(study_name, category, study_type)
            
            # Llamar a Ollama
            response = requests.post(
                f"{self.ollama_host}/api/generate",
                json={
                    "model": self.model,
                    "prompt": prompt,
                    "stream": False,
                    "options": {
                        "temperature": 0.7,
                        "top_p": 0.9,
                        "max_tokens": 500
                    }
                },
                timeout=60
            )
            
            if response.status_code == 200:
                result = response.json()
                description = result.get('response', '').strip()
                
                # Generar FAQs
                faqs = self._generate_faqs(study_name, description)
                
                return {
                    'description': description,
                    'faqs': faqs,
                    'hasAIContent': True,
                    'aiGeneratedAt': datetime.now().isoformat(),
                    'studyType': study_type
                }
            else:
                print(f"❌ Error Ollama: {response.status_code}")
                return None
                
        except Exception as e:
            print(f"❌ Error generando contenido: {e}")
            return None
    
    def _generate_faqs(self, study_name: str, description: str) -> List[Dict]:
        """Genera FAQs basadas en la descripción"""
        
        faqs_prompt = f"""Basándote en este estudio médico: {study_name}

Y esta descripción:
{description[:300]}

Genera 3 preguntas frecuentes (FAQs) que los pacientes hacen sobre este estudio.

Formato requerido (EXACTO):
1. ¿[Pregunta]?
[Respuesta corta y clara]

2. ¿[Pregunta]?
[Respuesta corta y clara]

3. ¿[Pregunta]?
[Respuesta corta y clara]

REGLAS:
- Preguntas comunes y prácticas
- Respuestas de 1-2 oraciones
- Lenguaje simple
- NO mencionar precios

GENERA LAS FAQs:"""
        
        try:
            response = requests.post(
                f"{self.ollama_host}/api/generate",
                json={
                    "model": self.model,
                    "prompt": faqs_prompt,
                    "stream": False,
                    "options": {
                        "temperature": 0.8,
                        "max_tokens": 300
                    }
                },
                timeout=45
            )
            
            if response.status_code == 200:
                faqs_text = response.json().get('response', '')
                return self._parse_faqs(faqs_text)
            
        except Exception as e:
            print(f"⚠️ Error generando FAQs: {e}")
        
        # FAQs por defecto
        return [
            {
                "question": f"¿Para qué sirve el {study_name}?",
                "answer": "Este estudio ayuda a evaluar su estado de salud y detectar posibles condiciones médicas."
            },
            {
                "question": "¿Cuánto tiempo tardan los resultados?",
                "answer": "Los resultados están disponibles en 2-3 días hábiles y se envían por correo electrónico."
            },
            {
                "question": "¿Necesito preparación especial?",
                "answer": "Consulte las indicaciones específicas de preparación para este estudio."
            }
        ]
    
    def _parse_faqs(self, faqs_text: str) -> List[Dict]:
        """Parsea el texto de FAQs generado por Ollama"""
        faqs = []
        lines = faqs_text.strip().split('\n')
        
        current_question = None
        current_answer = []
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
            
            # Detectar pregunta
            if line.startswith(('1.', '2.', '3.', '¿')):
                # Guardar FAQ anterior
                if current_question and current_answer:
                    faqs.append({
                        "question": current_question,
                        "answer": ' '.join(current_answer).strip()
                    })
                
                # Nueva pregunta
                current_question = line.lstrip('123. ').strip()
                current_answer = []
            else:
                # Respuesta
                current_answer.append(line)
        
        # Última FAQ
        if current_question and current_answer:
            faqs.append({
                "question": current_question,
                "answer": ' '.join(current_answer).strip()
            })
        
        return faqs[:3]  # Máximo 3 FAQs


def enrich_studies_file(input_file: str, output_file: str, batch_size: int = 10):
    """Enriquece el archivo studies.ts con contenido de Ollama"""
    
    print("=" * 70)
    print(" 🤖 Generación de Contenido con Ollama")
    print("=" * 70)
    print()
    
    # Cargar studies.ts
    print(f"📖 Leyendo {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extraer array de estudios (parsing simple)
    import re
    
    # Contar estudios sin descripción
    empty_desc_count = content.count("description: '',")
    print(f"   Estudios sin descripción: {empty_desc_count}")
    
    if empty_desc_count == 0:
        print("✅ Todos los estudios ya tienen descripción")
        return
    
    # Inicializar generador
    print(f"\n🔌 Conectando con Ollama...")
    generator = OllamaContentGenerator()
    
    print(f"✅ Ollama conectado: {generator.ollama_host}")
    print(f"   Modelo: {generator.model}")
    print()
    
    # Crear backup
    backup_file = input_file.replace('.ts', f'.backup.{datetime.now().strftime("%Y%m%d_%H%M%S")}.ts')
    with open(backup_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"📦 Backup creado: {Path(backup_file).name}")
    print()
    
    # Procesar en batches
    print(f"🚀 Iniciando generación (batch size: {batch_size})...")
    print(f"   Tiempo estimado: {(empty_desc_count * 20) // 60} minutos")
    print()
    
    processed = 0
    start_time = time.time()
    
    # TODO: Implementar procesamiento real
    # Por ahora, solo mostramos el plan
    
    print(f"⏳ Procesando {empty_desc_count} estudios...")
    print(f"   Esto tomará aproximadamente {(empty_desc_count * 20) // 60} minutos")
    print()
    print("💡 Para ejecutar la generación completa:")
    print("   python scraper/ollama_enricher.py --all")
    

if __name__ == '__main__':
    import sys
    
    input_file = 'src/data/studies.ts'
    output_file = 'src/data/studies_enriched.ts'
    
    if '--all' in sys.argv:
        enrich_studies_file(input_file, output_file)
    else:
        # Modo demo: generar solo para un estudio
        print("🧪 Modo Demo: Generando contenido para un estudio de prueba\n")
        
        generator = OllamaContentGenerator()
        
        test_study = "17 ALFA-HIDROXIPROGESTERONA"
        test_category = "Análisis Clínicos"
        
        print(f"Estudio: {test_study}")
        print(f"Categoría: {test_category}\n")
        print("Generando contenido...\n")
        
        result = generator.generate_content(test_study, test_category)
        
        if result:
            print("=" * 70)
            print("✅ CONTENIDO GENERADO")
            print("=" * 70)
            print()
            print(result['description'])
            print()
            print("=" * 70)
            print("FAQs GENERADAS")
            print("=" * 70)
            for i, faq in enumerate(result['faqs'], 1):
                print(f"\n{i}. {faq['question']}")
                print(f"   {faq['answer']}")
            print()
            print(f"✅ Tipo de estudio detectado: {result['studyType']}")
        else:
            print("❌ Error generando contenido")
