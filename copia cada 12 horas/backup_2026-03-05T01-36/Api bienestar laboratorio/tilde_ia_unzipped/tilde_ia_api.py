"""
Tilde IA API - Tilde IA (Functional Version)
Generado por Antigravity para Laboratorio Bienestar
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import os
import json
from dotenv import load_dotenv
from loguru import logger

load_dotenv()

app = Flask(__name__)
CORS(app)

# Cargar configuración
CONFIG_PATH = os.path.join(os.path.dirname(__file__), 'config.json')
with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
    CONFIG = json.load(f)

OLLAMA_URL = os.getenv('OLLAMA_URL', CONFIG.get('ollama_url', 'http://localhost:11434'))

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "ollama_url": OLLAMA_URL})

@app.route('/api/status', methods=['GET'])
@app.route('/api/ia/status', methods=['GET'])
def status():
    return jsonify({
        "status": "online",
        "project": CONFIG['project_name'],
        "port": CONFIG['port'],
        "firewall": CONFIG['firewall']
    })

@app.route('/api/ia/ollama/models', methods=['GET'])
def get_models():
    try:
        response = requests.get(f"{OLLAMA_URL}/api/tags", timeout=5)
        response.raise_for_status()
        return jsonify(response.json())
    except Exception as e:
        logger.error(f"Error fetching models from Ollama: {e}")
        # Fallback if Ollama is not responding correctly
        return jsonify({"models": [{"name": "llama2"}, {"name": "mistral"}]})

@app.route('/api/ia/generator/presets', methods=['GET'])
def get_presets():
    return jsonify({
        "presets": [
            {"id": "pro", "name": "Médico Profesional", "description": "Tono formal y técnico"},
            {"id": "easy", "name": "Informativo Simple", "description": "Para pacientes, lenguaje claro"},
            {"id": "sales", "name": "Persuasivo/Ventas", "description": "Enfocado en beneficios y conversión"}
        ]
    })

@app.route('/api/projects', methods=['GET'])
def get_projects():
    return jsonify({
        "projects": [
            {"id": "lab-bienestar", "name": "Laboratorio Bienestar", "status": "active"}
        ]
    })

@app.route('/api/ia/knowledge/folders', methods=['GET'])
def get_knowledge_folders():
    return jsonify({
        "folders": [
            {"id": "estudios", "name": "Base de Datos de Estudios", "count": 150},
            {"name": "Protocolos de Atención", "id": "protocolos", "count": 12},
            {"name": "Preguntas Frecuentes", "id": "faqs", "count": 45}
        ]
    })

@app.route('/api/chat', methods=['POST'])
@app.route('/api/ia/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')
    model = data.get('model', 'llama2')
    
    try:
        response = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={
                "model": model,
                "prompt": message,
                "stream": False
            },
            timeout=60
        )
        response.raise_for_status()
        result = response.json()
        
        return jsonify({
            "text": result.get('response', ''),
            "sender": "bot",
            "model": model
        })
    except Exception as e:
        logger.error(f"Error communicating with Ollama: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/generate-study-content', methods=['POST'])
@app.route('/api/ia/generate-study-content', methods=['POST'])
def generate_study_content():
    data = request.json
    study_name = data.get('study_name', '')
    if not study_name:
        return jsonify({"error": "study_name is required"}), 400
    
    prompt = f"""
    Eres un experto médico de Laboratorio Bienestar. 
    Genera contenido profesional y persuasivo para el estudio: "{study_name}".
    
    Responde ÚNICAMENTE en formato JSON con la siguiente estructura:
    {{
        "detailedDescription": "Una descripción médica clara y profesional de al menos 3 párrafos.",
        "whatIsIt": "Una explicación sencilla de qué es el estudio.",
        "benefits": ["Beneficio 1", "Beneficio 2", "Beneficio 3", "Beneficio 4"],
        "faqs": [
            {{ "question": "¿Para qué sirve?", "answer": "..." }},
            {{ "question": "¿Requiere ayuno?", "answer": "..." }},
            {{ "question": "¿Cuándo se entregan los resultados?", "answer": "..." }}
        ],
        "searchTerms": ["término1", "término2", "sinónimo"]
    }}
    
    Asegúrate de que el contenido sea en español de México y tenga un tono profesional pero accesible.
    """
    
    try:
        response = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={
                "model": "llama2",
                "prompt": prompt,
                "stream": False,
                "format": "json"
            },
            timeout=120
        )
        response.raise_for_status()
        result = response.json()
        content = json.loads(result.get('response', '{}'))
        
        return jsonify(content)
    except Exception as e:
        logger.error(f"Error generating study content: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', CONFIG['port']))
    debug = os.getenv('DEBUG', 'True').lower() == 'true'
    
    logger.info(f"🚀 Tilde IA API - {CONFIG['project_name']} starting on port {port}")
    app.run(host='0.0.0.0', port=port, debug=debug)
