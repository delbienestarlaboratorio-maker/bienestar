#!/usr/bin/env python3
"""
Sistema de Generación con Descripción Dual
- Descripción corta: 200-250 palabras (siempre visible)
- Descripción detallada: 400-600 palabras (desplegable)
"""

import json
import time
import requests
import re
from pathlib import Path
from typing import Dict, Optional
from datetime import datetime

class DualContentGenerator:
    """Generador de contenido con descripción corta y detallada"""
    
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
    
    def _build_short_prompt(self, study_name: str, category: str, study_type: str) -> str:
        """Prompt para descripción corta (200-250 palabras)"""
        
        context = self.knowledge_base.get(study_type, self.knowledge_base.get('sangre', {}))
        sample_type = context.get('sample_type', 'Muestra de laboratorio')
        preparation = context.get('preparation_default', 'Consulte con su médico')
        
        return f"""Eres un experto médico escribiendo contenido CONCISO para pacientes.

ESTUDIO: {study_name}
CATEGORÍA: {category}

OBJETIVO: Descripción CORTA que responda rápidamente las preguntas principales.

ESTRUCTURA (200-250 palabras MÁXIMO):

**¿Qué es?**
[1-2 oraciones claras y directas]

**¿Cuándo necesito este estudio?**
- Síntoma 1
- Síntoma 2
- Síntoma 3
- Síntoma 4

**¿Qué detecta?**
- Condición 1
- Condición 2
- Condición 3

**Preparación:**
✓ {preparation.split('.')[0] if preparation else 'Paso 1'}
✓ Paso 2
✓ Paso 3

**Info práctica:**
- 🕐 Resultados: [tiempo]
- 💉 Muestra: {sample_type}
- 🍽️ Ayuno: [Sí/No]

REGLAS CRÍTICAS:
- Máximo 250 palabras
- Lenguaje simple
- Información esencial solamente
- Sin jerga médica compleja

GENERA SOLO EL CONTENIDO:"""
    
    def _build_detailed_prompt(self, study_name: str, category: str, study_type: str, short_content: str) -> str:
        """Prompt para descripción detallada (400-600 palabras)"""
        
        context = self.knowledge_base.get(study_type, self.knowledge_base.get('sangre', {}))
        
        return f"""Eres un experto médico escribiendo contenido DETALLADO para pacientes que quieren profundizar.

ESTUDIO: {study_name}
CATEGORÍA: {category}

Ya existe esta descripción CORTA:
{short_content[:200]}...

OBJETIVO: Crear contenido DETALLADO complementario (400-600 palabras).

ESTRUCTURA DETALLADA:

**Información Médica Completa**

¿Por qué es importante este estudio?
[2-3 párrafos explicando la importancia médica, cuándo se ordena, qué médicos lo solicitan]

**Detalles del Procedimiento**

¿Cómo se realiza el estudio?
[Paso a paso del procedimiento, qué esperar durante la toma de muestra, duración]

**Interpretación de Resultados**

¿Qué significan los resultados?
- Valores normales vs anormales
- Qué indican resultados altos
- Qué indican resultados bajos
- Cuándo preocuparse

**Preparación Detallada**

Instrucciones completas:
- Días previos al estudio
- Día del estudio
- Medicamentos a evitar
- Alimentos a evitar
- Qué llevar el día del estudio

**Condiciones Relacionadas**

Este estudio ayuda a diagnosticar o monitorear:
[Lista detallada de 6-10 condiciones con breve explicación de cada una]

**Preguntas Frecuentes Adicionales**

¿Es doloroso?
¿Tiene riesgos?
¿Puedo hacer ejercicio antes?
¿Afectan los medicamentos?
¿Cuándo debo repetirlo?

REGLAS:
- 400-600 palabras
- Información profunda y útil
- Mantener lenguaje accesible
- Complementar (no repetir) descripción corta
- Incluir detalles técnicos explicados simplemente

GENERA SOLO EL CONTENIDO DETALLADO:"""
    
    def generate_dual_content(self, study_name: str, category: str) -> Optional[Dict]:
        """Genera descripción corta y detallada"""
        
        try:
            study_type = self._classify_study_type(study_name)
            
            # 1. Generar descripción corta
            print(f"   📝 Generando descripción corta...")
            short_prompt = self._build_short_prompt(study_name, category, study_type)
            
            response_short = requests.post(
                f"{self.ollama_host}/api/generate",
                json={
                    "model": self.model,
                    "prompt": short_prompt,
                    "stream": False,
                    "options": {"temperature": 0.7, "top_p": 0.9}
                },
                timeout=120
            )
            
            if response_short.status_code != 200:
                return None
            
            short_description = response_short.json().get('response', '').strip()
            
            # 2. Generar descripción detallada
            print(f"   📚 Generando descripción detallada...")
            detailed_prompt = self._build_detailed_prompt(study_name, category, study_type, short_description)
            
            response_detailed = requests.post(
                f"{self.ollama_host}/api/generate",
                json={
                    "model": self.model,
                    "prompt": detailed_prompt,
                    "stream": False,
                    "options": {"temperature": 0.7, "top_p": 0.9}
                },
                timeout=180  # Más tiempo para contenido detallado
            )
            
            if response_detailed.status_code != 200:
                detailed_description = ""  # Opcional si falla
            else:
                detailed_description = response_detailed.json().get('response', '').strip()
            
            return {
                'description': short_description,
                'detailedDescription': detailed_description,
                'hasAIContent': True,
                'aiGeneratedAt': datetime.now().isoformat(),
                'studyType': study_type,
                'model': self.model
            }
                
        except Exception as e:
            print(f"❌ Error: {e}")
            return None


if __name__ == '__main__':
    # Prueba
    generator = DualContentGenerator()
    
    result = generator.generate_dual_content(
        "EXAMEN GENERAL DE ORINA",
        "Análisis Clínicos"
    )
    
    if result:
        print("\n" + "="*70)
        print("DESCRIPCIÓN CORTA (siempre visible)")
        print("="*70)
        print(result['description'])
        print(f"\nPalabras: {len(result['description'].split())}")
        
        print("\n" + "="*70)
        print("DESCRIPCIÓN DETALLADA (desplegable)")
        print("="*70)
        print(result['detailedDescription'])
        print(f"\nPalabras: {len(result['detailedDescription'].split())}")
