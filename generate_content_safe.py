"""
Script de Generación de Contenido con Checkpoint - VERSIÓN SEGURA
Genera descripciones para estudios médicos usando Ollama
con guardado automático después de cada estudio
"""

import os
import re
import json
import time
import signal
import sys
from datetime import datetime
from pathlib import Path
import requests

# ==================== CONFIGURACIÓN ====================
STUDIES_FILE = 'src/data/studies.ts'
CHECKPOINT_FILE = 'generation_checkpoint.json'
OLLAMA_URL = 'http://localhost:11434/api/generate'
OLLAMA_MODEL = 'qwen2.5:7b'
OLLAMA_TIMEOUT = 180  # 3 minutos por estudio
STATS_INTERVAL = 10    # Mostrar estadísticas cada 10 estudios

# Variable global para manejar pausas
should_pause = False

def signal_handler(sig, frame):
    """Maneja Ctrl+C para pausar limpiamente"""
    global should_pause
    print('\n\n⏸️  PAUSANDO...')
    print('💾 Guardando progreso antes de salir...')
    should_pause = True
    
signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

# ==================== CLASE PRINCIPAL ====================
class SafeContentGenerator:
    def __init__(self):
        self.checkpoint = self.load_checkpoint()
        self.start_time = time.time()
        self.studies_this_session = 0
        
    def load_checkpoint(self):
        """Carga el checkpoint si existe"""
        if os.path.exists(CHECKPOINT_FILE):
            with open(CHECKPOINT_FILE, 'r', encoding='utf-8') as f:
                checkpoint = json.load(f)
                print(f'\n📊 Checkpoint cargado:')
                print(f'   Último procesado: {checkpoint.get("last_processed_index", 0)}')
                print(f'   Total completados: {checkpoint.get("total_processed", 0)}')
                return checkpoint
        else:
            print('\n📝 Iniciando generación desde cero...')
            return {
                'last_processed_index': -1,
                'processed_ids': [],
                'total_processed': 0,
                'started_at': datetime.now().isoformat(),
                'last_save': None
            }
    
    def save_checkpoint(self):
        """Guarda el checkpoint actual"""
        self.checkpoint['last_save'] = datetime.now().isoformat()
        with open(CHECKPOINT_FILE, 'w', encoding='utf-8') as f:
            json.dump(self.checkpoint, f, indent=2, ensure_ascii=False)
    
    def create_backup(self):
        """Crea backup del archivo de estudios"""
        if not os.path.exists(STUDIES_FILE):
            raise FileNotFoundError(f'❌ No se encuentra {STUDIES_FILE}')
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_file = f'{STUDIES_FILE}.backup.{timestamp}'
        
        with open(STUDIES_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
        
        with open(backup_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f'💾 Backup creado: {backup_file}')
        return backup_file
    
    def extract_studies(self, content: str):
        """Extrae todos los estudios del archivo"""
        pattern = r"{\s*id:\s*'(\d+)',\s*slug:\s*'([^']+)',\s*name:\s*'([^']+)',\s*category:\s*'([^']+)',\s*description:\s*'([^']*)',?\s*}"
        matches = re.findall(pattern, content, re.DOTALL)
        
        studies = []
        for match in matches:
            study_id, slug, name, category, description = match
            studies.append((study_id, slug, name, category, description))
        
        return studies
    
    def escape_for_javascript(self, text: str) -> str:
        """
        Escapa texto para JavaScript string literal
        CRÍTICO: El orden de las operaciones es importante
        """
        # 1. Backslashes primero (evita doble escape)
        escaped = text.replace('\\', '\\\\')
        # 2. Newlines a literal \n (backslash + n)
        escaped = escaped.replace('\n', '\\n')
        # 3. Carriage returns eliminar
        escaped = escaped.replace('\r', '')
        # 4. Comillas simples al final
        escaped = escaped.replace("'", "\\'")
        # 5. Tabs
        escaped = escaped.replace('\t', '\\t')
        
        return escaped
    
    def validate_escaped_text(self, escaped_text: str) -> bool:
        """
        Valida que el texto escapado no tenga newlines reales
        """
        # No debe tener saltos de línea reales
        if '\n' in escaped_text or '\r' in escaped_text:
            return False
        
        # Debe tener \n escapados
        if '\\n' not in escaped_text:
            # Está bien si no hay saltos de línea
            pass
        
        return True
    
    def update_study(self, content: str, study_id: str, slug: str, name: str,
                    category: str, description: str) -> str:
        """Actualiza un estudio en el archivo"""
        
        # Escapar la descripción
        desc_escaped = self.escape_for_javascript(description)
        
        # Validar el escape
        if not self.validate_escaped_text(desc_escaped):
            raise ValueError(f'❌ Error en escape para estudio {study_id}: contiene newlines reales')
        
        # Patrón para encontrar el estudio
        old_pattern = f"id: '{study_id}',\\s*slug: '{slug}',\\s*name: '{name}',.*?description: '[^']*',"
        new_text = f"id: '{study_id}',\n    slug: '{slug}',\n    name: '{name}',\n    category: '{category}',\n    description: '{desc_escaped}',"
        
        # Reemplazar
        new_content = re.sub(old_pattern, new_text, content, count=1, flags=re.DOTALL)
        
        # Verificar que se hizo el reemplazo
        if new_content == content:
            raise ValueError(f'❌ No se pudo reemplazar estudio {study_id}')
        
        return new_content
    
    def generate_description(self, study_name: str, category: str) -> str:
        """Genera descripción usando Ollama"""
        
        prompt = f"""Como experto médico, genera una descripción BREVE en español para este estudio clínico.

Estudio: {study_name}
Categoría: {category}

Formato EXACTO (máximo 150 palabras, usa markdown):

**¿Qué es?**
[Explicación simple en 1-2 oraciones]

**¿Cuándo necesito este estudio?**
- [Síntoma o situación 1]
- [Síntoma o situación 2]
- [Síntoma o situación 3]

**Preparación:**
[Instrucciones breves si aplica, o "No requiere preparación especial"]

Responde SOLO con el texto formateado, sin introducción."""

        payload = {
            'model': OLLAMA_MODEL,
            'prompt': prompt,
            'stream': False,
            'options': {
                'temperature': 0.7,
                'top_p': 0.9,
            }
        }
        
        try:
            response = requests.post(
                OLLAMA_URL,
                json=payload,
                timeout=OLLAMA_TIMEOUT
            )
            response.raise_for_status()
            
            result = response.json()
            description = result.get('response', '').strip()
            
            if not description:
                raise ValueError('Respuesta vacía de Ollama')
            
            # Contar palabras
            word_count = len(description.split())
            
            return description, word_count
            
        except requests.Timeout:
            raise Exception(f'⏱️  Timeout después de {OLLAMA_TIMEOUT}s')
        except requests.RequestException as e:
            raise Exception(f'❌ Error de conexión: {str(e)}')
    
    def run(self):
        """Ejecuta el proceso de generación"""
        global should_pause
        
        print('\n🚀 GENERADOR DE CONTENIDO CON CHECKPOINT')
        print('=' * 60)
        
        # Crear backup
        backup_file = self.create_backup()
        
        # Leer archivo
        print(f'\n📖 Leyendo {STUDIES_FILE}...')
        with open(STUDIES_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extraer estudios
        all_studies = self.extract_studies(content)
        
        # Filtrar estudios pendientes
        empty_studies = [(i, s) for i, s in enumerate(all_studies)
                        if s[4] == '' and s[0] not in self.checkpoint['processed_ids']]
        
        total = len(empty_studies)
        print(f'   Estudios pendientes: {total}')
        print(f'   Ya completados: {self.checkpoint["total_processed"]}')
        
        if total == 0:
            print('\n✅ ¡Todos los estudios ya tienen descripción!')
            return
        
        print(f'\n🎯 Iniciando generación...')
        print(f'   Modelo: {OLLAMA_MODEL}')
        print(f'   Timeout: {OLLAMA_TIMEOUT}s por estudio')
        print(f'   Presiona Ctrl+C para pausar y guardar\n')
        
        # Procesar estudios
        for idx, (original_idx, study) in enumerate(empty_studies, 1):
            if should_pause:
                print('\n💾 Guardando checkpoint final...')
                self.save_checkpoint()
                print('✅ Progreso guardado. Ejecuta de nuevo para continuar.')
                return
            
            study_id, slug, name, category, _ = study
            
            print(f'\n🚀 [{idx}/{total}] {name}')
            print(f'   Categoría: {category}')
            
            try:
                # Generar descripción
                start = time.time()
                description, word_count = self.generate_description(name, category)
                elapsed = time.time() - start
                
                print(f'   ✅ Generado en {elapsed:.1f}s ({word_count} palabras)')
                
                # Actualizar contenido
                content = self.update_study(
                    content, study_id, slug, name, category, description
                )
                
                # Guardar archivo
                with open(STUDIES_FILE, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                # Actualizar checkpoint
                self.checkpoint['last_processed_index'] = original_idx
                self.checkpoint['processed_ids'].append(study_id)
                self.checkpoint['total_processed'] = len(self.checkpoint['processed_ids'])
                self.save_checkpoint()
                
                print(f'   💾 Guardado automático')
                
                self.studies_this_session += 1
                
                # Estadísticas cada 10 estudios
                if idx % STATS_INTERVAL == 0:
                    elapsed_total = time.time() - self.start_time
                    avg_time = elapsed_total / self.studies_this_session
                    remaining = total - idx
                    eta_seconds = remaining * avg_time
                    eta_hours = eta_seconds / 3600
                    
                    print(f'\n📊 Estadísticas:')
                    print(f'   Completados: {idx}/{total} ({idx*100/total:.1f}%)')
                    print(f'   Velocidad promedio: {avg_time:.1f}s/estudio')
                    print(f'   Tiempo restante estimado: {eta_hours:.1f} horas')
                    
            except Exception as e:
                print(f'   ❌ Error: {str(e)}')
                print(f'   ⏭️  Continuando con siguiente estudio...')
                continue
        
        # Completado
        total_time = time.time() - self.start_time
        print(f'\n✅ ¡GENERACIÓN COMPLETADA!')
        print(f'📊 Total procesados: {self.studies_this_session}')
        print(f'⏱️  Tiempo total: {total_time/3600:.2f} horas')
        print(f'💾 Backup disponible: {backup_file}')

# ==================== MAIN ====================
if __name__ == '__main__':
    try:
        generator = SafeContentGenerator()
        generator.run()
    except KeyboardInterrupt:
        print('\n\n⏸️  Interrumpido por el usuario')
        sys.exit(0)
    except Exception as e:
        print(f'\n❌ Error fatal: {str(e)}')
        sys.exit(1)
