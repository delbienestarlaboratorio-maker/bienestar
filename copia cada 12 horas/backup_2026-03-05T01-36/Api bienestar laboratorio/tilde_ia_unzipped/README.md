# Tilde IA API - Tilde IA

API personalizada generada por **Tilde Manager v6**.

**Fecha de generación**: 2026-01-22T12:55:22.573892

**Propósito**: Laboratorio.delbienestar.com.mx

---

## 🚀 Instalación

### 1. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 2. Configurar variables de entorno (opcional)

```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

### 3. Ejecutar la API

```bash
python tilde_ia_api.py
```

La API estará disponible en: `http://localhost:10008`

---

## 📡 Endpoints

### POST /api/chat

Envía un mensaje a la IA.

**Request**:
```json
{
  "message": "Tu pregunta aquí",
  "model": "llama2"
}
```

**Response**:
```json
{
  "text": "Respuesta de la IA",
  "sender": "bot",
  "model": "llama2"
}
```

### GET /api/status

Verifica el estado de la API y muestra la configuración del firewall.

**Response**:
```json
{
  "status": "online",
  "project": "Tilde IA",
  "port": 10008,
  "firewall": {
    "allowed_keywords": [...],
    "forbidden_keywords": [...]
  }
}
```

### GET /api/config

Retorna la configuración completa de la API.

### GET /health

Health check endpoint.

---

## 🔥 Firewall de Conocimiento

Esta API tiene configuradas las siguientes reglas:

**Keywords Permitidas**: chat, ia, imagen, ayuda, descripsion, precios, citas

**Keywords Prohibidas**: Ninguna

Cualquier consulta o respuesta que contenga keywords prohibidas será bloqueada automáticamente.

---

## 💻 Integración

### JavaScript/React

```javascript
const response = await fetch('http://localhost:10008/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    message: '¿Cómo puedo ayudarte?',
    model: 'llama2'
  })
});

const data = await response.json();
console.log(data.text);
```

### Python

```python
import requests

response = requests.post('http://localhost:10008/api/chat', 
    json={
        'message': '¿Cómo puedo ayudarte?',
        'model': 'llama2'
    })

print(response.json()['text'])
```

### cURL

```bash
curl -X POST http://localhost:10008/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hola", "model": "llama2"}'
```

---

## ⚙️ Configuración

### Variables de Entorno

Puedes configurar las siguientes variables en el archivo `.env`:

- `OLLAMA_URL`: URL del servidor Ollama (default: http://localhost:11434)
- `PORT`: Puerto en el que correrá la API (default: 10008)
- `DEBUG`: Modo debug (default: True)

---

## 🛠️ Troubleshooting

### Error: "Error al comunicarse con Ollama"

Verifica que Ollama esté corriendo:
```bash
curl http://localhost:11434/api/tags
```

### Error: "Puerto ya en uso"

Cambia el puerto en `.env` o al ejecutar:
```bash
PORT=5001 python tilde_ia_api.py
```
