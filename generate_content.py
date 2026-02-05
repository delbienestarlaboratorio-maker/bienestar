#!/usr/bin/env python3
"""
Generador de Contenido con Sistema de Checkpoint
- Guarda progreso CADA estudio
- Pausa/reanuda automáticamente
- Resistente a cierres inesperados
- Independiente de Antigravity
"""

import json
import time
import requests
import re
import signal
import sys
from pathlib import Path
from typing import Dict, Optional, List, Tuple
from datetime import datetime

class CheckpointGenerator:
    """Generador con sistema de checkpoint"""
    
    def __init__(self, model: str = "qwen2.5:7b"):
        self.ollama_host = "http://localhost:11434"
        self.model = model
        self.checkpoint_file = Path("generation_checkpoint.json")
        self.studies_file = Path('src/data/studies.ts')
        self.paused = False
        self.should_stop = False
        
        # Configurar manejo de señales
        signal.signal(signal.SIGINT, self._handle_interrupt)
        signal.signal(signal.SIGTERM, self._handle_interrupt)
        
        # Cargar base de conocimiento
        self.knowledge_base = self._load_knowledge_base()
    
    def _handle_interrupt(self, signum, frame):
        """Maneja Ctrl+C y otras interrupciones"""
        print("\n\n⏸️  PAUSANDO...")
        print("✅ Progreso guardado automáticamente")
        print("📝 Ejecuta de nuevo el script para continuar\n")
        self.should_stop = True
        sys.exit(0)
    
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
                timeout=180  # Aumentado a 3 minutos
            )
            
            if response.status_code == 200:
                result = response.json()
                description = result.get('response', '').strip()
                return description
            else:
                return None
                
        except Exception as e:
            print(f"   ❌ Error: {e}")
            return None
    
    def load_checkpoint(self) -> Dict:
        """Carga el checkpoint si existe"""
        if self.checkpoint_file.exists():
            with open(self.checkpoint_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {
            'last_processed_index': -1,
            'processed_ids': [],
            'total_processed': 0,
            'started_at': datetime.now().isoformat(),
            'last_save': None
        }
    
    def save_checkpoint(self, checkpoint: Dict):
        """Guarda el checkpoint"""
        checkpoint['last_save'] = datetime.now().isoformat()
        with open(self.checkpoint_file, 'w', encoding='utf-8') as f:
            json.dump(checkpoint, f, indent=2)
    
    def extract_studies(self, content: str) -> List[Tuple[str, str, str, str, str]]:
        """Extrae todos los estudios del archivo"""
        pattern = r"\{\s*id: '(\d+)',\s*slug: '([^']+)',\s*name: '([^']+)',.*?category: '([^']+)',.*?description: '([^']*)',"
        studies = []
        for match in re.finditer(pattern, content, re.DOTALL):
            studies.append((
                match.group(1),  # id
                match.group(2),  # slug
                match.group(3),  # name
                match.group(4),  # category
                match.group(5)   # description
            ))
        return studies
    
    def update_study(self, content: str, study_id: str, slug: str, name: str, 
                    category: str, description: str) -> str:
        """Actualiza un estudio en el contenido"""
        # Escapar para JavaScript - ORDEN IMPORTANTE
        # 1. Backslashes primero (evita doble escape)
        desc_escaped = description.replace('\\', '\\\\')
        # 2. Newlines a literal \n (backslash + n, NO newline)
        desc_escaped = desc_escaped.replace('\n', r'\n')
        # 3. Carriage returns eliminar
        desc_escaped = desc_escaped.replace('\r', '')
        # 4. Comillas simples al final
        desc_escaped = desc_escaped.replace("'", r"\'")
        
        # Patrón para encontrar el estudio
        old_pattern = f"id: '{study_id}',\\s*slug: '{slug}',\\s*name: '{name}',.*?description: '[^']*',"
        new_text = f"id: '{study_id}',\n    slug: '{slug}',\n    name: '{name}',\n    category: '{category}',\n    description: '{desc_escaped}',"
        
        # Reemplazar
        new_content = re.sub(old_pattern, new_text, content, count=1, flags=re.DOTALL)
        return new_content
    
    def run(self):
        """Ejecuta el proceso de generación"""
        print("\n" + "="*70)
        print(" 🚀 GENERADOR DE CONTENIDO CON CHECKPOINT")
        print("="*70 + "\n")
        
        # Cargar checkpoint
        checkpoint = self.load_checkpoint()
        print(f"📊 Checkpoint cargado:")
        print(f"   Último procesado: {checkpoint['last_processed_index'] + 1}")
        print(f"   Total completados: {checkpoint['total_processed']}\n")
        
        # Cargar contenido
        print(f"📖 Leyendo {self.studies_file}...")
        with open(self.studies_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extraer estudios
        all_studies = self.extract_studies(content)
        empty_studies = [(i, s) for i, s in enumerate(all_studies) 
                        if s[4] == '' and s[0] not in checkpoint['processed_ids']]
        
        total = len(empty_studies)
        print(f"   Estudios pendientes: {total}")
        print(f"   Ya completados: {checkpoint['total_processed']}\n")
        
        if total == 0:
            print("✅ ¡Todos los estudios tienen descripción!\n")
            return
        
        # Crear backup inicial
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_file = self.studies_file.parent / f'studies.ts.backup.{timestamp}'
        with open(backup_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"📦 Backup: {backup_file.name}\n")
        
        print("="*70)
        print(" 🎯 PROCESANDO")
        print("="*70)
        print("💡 Presiona Ctrl+C para pausar en cualquier momento\n")
        
        # Procesar estudios
        start_time = time.time()
        
        for idx, (arr_idx, (study_id, slug, name, category, _)) in enumerate(empty_studies, 1):
            if self.should_stop:
                break
            
            print(f"\n🚀 [{idx}/{total}] {name}")
            print(f"   Categoría: {category}")
            
            study_start = time.time()
            description = self.generate_content(name, category)
            duration = time.time() - study_start
            
            if description:
                # Actualizar contenido
                content = self.update_study(content, study_id, slug, name, category, description)
                
                # Guardar inmediatamente
                with open(self.studies_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                # Actualizar checkpoint
                checkpoint['last_processed_index'] = arr_idx
                checkpoint['processed_ids'].append(study_id)
                checkpoint['total_processed'] += 1
                self.save_checkpoint(checkpoint)
                
                words = len(description.split())
                print(f"   ✅ Generado en {duration:.1f}s ({words} palabras)")
                print(f"   💾 Guardado automático")
                
                # Estadísticas cada 10
                if idx % 10 == 0:
                    elapsed = time.time() - start_time
                    avg_time = elapsed / idx
                    remaining = (total - idx) * avg_time
                    print(f"\n📊 Progreso: {idx}/{total} ({idx/total*100:.1f}%)")
                    print(f"⏱️  Tiempo transcurrido: {elapsed/3600:.1f}h")
                    print(f"⏱️  ETA: {remaining/3600:.1f}h")
            else:
                print(f"   ❌ Error al generar (se reintentará)")
        
        # Resumen final
        total_time = time.time() - start_time
        print("\n" + "="*70)
        if self.should_stop:
            print(" ⏸️  GENERACIÓN PAUSADA")
        else:
            print(" ✅ GENERACIÓN COMPLETADA")
        print("="*70)
        print(f"\n📊 Estadísticas:")
        print(f"   Total procesado esta sesión: {idx}")
        print(f"   Total acumulado: {checkpoint['total_processed']}")
        print(f"   Tiempo de sesión: {total_time/3600:.1f} horas")
        print(f"\n💾 Progreso guardado en: {self.checkpoint_file}")
        print(f"📦 Backup disponible: {backup_file.name}\n")

if __name__ == '__main__':
    generator = CheckpointGenerator()
    generator.run()
