# 📝 Auto-Documentation Service

Servicio automático de documentación y backup que captura toda la actividad de Laboratorio Bienestar.

## 🎯 Funcionalidad

- ✅ **Backup automático cada 10 minutos**
- ✅ **Captura de sesiones de usuario**
- ✅ **Registro de llamadas a API**
- ✅ **Logging de errores**
- ✅ **Eventos de analytics**
- ✅ **Interacciones de usuario**
- ✅ **Reinicio automático con PM2**
- ✅ **Limpieza automática (mantiene últimos 50 snapshots)**

## 📁 Ubicación de Documentos

```
D:\Paginas_web\pagina\laboratorio-bienestar\33ebb4da-ca02-4d77-9332-d03a45bd00d5\
├── snapshot_YYYY-MM-DDTHH-mm-ss_SSSZ.json  (Snapshots cada 10 min)
├── latest.json                              (Último snapshot)
└── activity.log                             (Log continuo de actividad)
```

## 🌐 API Endpoints

### Health Check
```bash
GET http://localhost:30210/health
```

### Registrar Eventos

#### Iniciar Sesión
```bash
POST http://localhost:30210/api/session/start
Content-Type: application/json

{
  "sessionId": "unique-session-id",
  "userId": "user-123",
  "page": "/estudios"
}
```

#### Registrar Llamada a API
```bash
POST http://localhost:30210/api/log/api-call
Content-Type: application/json

{
  "endpoint": "/api/admin/studies",
  "method": "GET",
  "status": 200,
  "duration": 245
}
```

#### Registrar Error
```bash
POST http://localhost:30210/api/log/error
Content-Type: application/json

{
  "message": "Error message",
  "stack": "Error stack trace",
  "page": "/estudios",
  "severity": "error"
}
```

#### Registrar Analytics
```bash
POST http://localhost:30210/api/log/analytics
Content-Type: application/json

{
  "event": "page_view",
  "page": "/estudios/sangre",
  "metadata": { "category": "sangre" }
}
```

#### Registrar Interacción
```bash
POST http://localhost:30210/api/log/interaction
Content-Type: application/json

{
  "action": "button_click",
  "element": "search-button",
  "page": "/estudios"
}
```

### Backup Manual
```bash
POST http://localhost:30210/api/backup/now
```

### Obtener Estadísticas
```bash
GET http://localhost:30210/api/stats
```

### Ver Eventos Recientes
```bash
# Ver últimos 50 eventos de todo
GET http://localhost:30210/api/recent

# Ver últimos eventos por tipo
GET http://localhost:30210/api/recent/sessions?limit=20
GET http://localhost:30210/api/recent/api-calls?limit=50
GET http://localhost:30210/api/recent/errors?limit=10
GET http://localhost:30210/api/recent/analytics?limit=100
GET http://localhost:30210/api/recent/interactions?limit=30
```

## 🚀 Integración en tu Aplicación

### 1. Cliente JavaScript (Browser)

Agrega este código en tu layout principal o componente raíz:

```javascript
// utils/autoDoc.js
const AUTO_DOC_URL = 'http://localhost:30210';

export const autoDoc = {
  // Iniciar sesión
  startSession: async (userId, page) => {
    try {
      await fetch(`${AUTO_DOC_URL}/api/session/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: `${userId}-${Date.now()}`,
          userId,
          page,
          userAgent: navigator.userAgent
        })
      });
    } catch (e) { console.error('AutoDoc error:', e); }
  },

  // Registrar llamada a API
  logApiCall: async (endpoint, method, status, duration) => {
    try {
      await fetch(`${AUTO_DOC_URL}/api/log/api-call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint, method, status, duration })
      });
    } catch (e) { console.error('AutoDoc error:', e); }
  },

  // Registrar error
  logError: async (error, page) => {
    try {
      await fetch(`${AUTO_DOC_URL}/api/log/error`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          page,
          severity: 'error'
        })
      });
    } catch (e) { console.error('AutoDoc error:', e); }
  },

  // Registrar analytics
  logAnalytics: async (event, page, metadata = {}) => {
    try {
      await fetch(`${AUTO_DOC_URL}/api/log/analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, page, metadata })
      });
    } catch (e) { console.error('AutoDoc error:', e); }
  },

  // Registrar interacción
  logInteraction: async (action, element, page) => {
    try {
      await fetch(`${AUTO_DOC_URL}/api/log/interaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, element, page })
      });
    } catch (e) { console.error('AutoDoc error:', e); }
  }
};
```

### 2. Uso en React/Next.js

```tsx
// app/layout.tsx
import { useEffect } from 'react';
import { autoDoc } from '@/utils/autoDoc';

export default function RootLayout({ children }) {
  useEffect(() => {
    // Iniciar sesión al cargar la app
    autoDoc.startSession('anonymous', window.location.pathname);

    // Capturar errores globales
    window.addEventListener('error', (e) => {
      autoDoc.logError(e.error, window.location.pathname);
    });
  }, []);

  return <html>{children}</html>;
}
```

## 📊 Formato de Snapshot

```json
{
  "timestamp": "2026-01-22T22:15:00.000Z",
  "serverUptime": 3600,
  "memoryUsage": {
    "rss": 50000000,
    "heapTotal": 30000000,
    "heapUsed": 20000000
  },
  "data": {
    "sessions": [...],
    "apiCalls": [...],
    "errors": [...],
    "analytics": [...],
    "userInteractions": [...]
  },
  "stats": {
    "totalSessions": 42,
    "totalApiCalls": 1250,
    "totalErrors": 3,
    "totalAnalytics": 890,
    "totalInteractions": 567
  }
}
```

## ⚙️ Configuración PM2

El servicio está configurado para reiniciarse automáticamente con PM2. Ver `ecosystem.config.js` en la raíz del proyecto.

## 🔧 Comandos Útiles

```bash
# Ver logs del servicio
pm2 logs auto-documentation

# Ver estado
pm2 status auto-documentation

# Reiniciar
pm2 restart auto-documentation

# Ver estadísticas en tiempo real
pm2 monit
```
