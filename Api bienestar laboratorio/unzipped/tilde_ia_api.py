"""
Tilde IA API - Laboratorio
Generado por Tilde Manager v6
Fecha: 2026-01-22T11:51:46.837999
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import os
import json
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Cargar configuración
CONFIG_PATH = os.path.join(os.path.dirname(__file__), 'config.json')
with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
    CONFIG = json.load(f)

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({"status": "healthy"})

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({
        "status": "online",
        "project": CONFIG['project_name'],
        "port": CONFIG['port'],
        "firewall": CONFIG['firewall']
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')
    model = data.get('model', 'llama2')
    
    # Aquí se conectaría con Ollama o OpenAI
    # Por ahora simulamos una respuesta
    return jsonify({
        "text": f"Respuesta simulada para: {message}",
        "sender": "bot",
        "model": model
    })

if __name__ == '__main__':
    port = int(os.getenv('PORT', CONFIG['port']))
    debug = os.getenv('DEBUG', 'True').lower() == 'true'
    
    print(f"🚀 Tilde IA API - {CONFIG['project_name']}")
    print(f"📡 Corriendo en puerto: {port}")
    print(f"🔥 Firewall Inteligente Activo")
    
    app.run(host='0.0.0.0', port=port, debug=debug)
