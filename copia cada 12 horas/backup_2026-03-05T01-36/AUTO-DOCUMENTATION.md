# 📝 Sistema de Auto-Documentación

## ✅ Estado de Implementación

### Servicios Activos

1. **Servidor Principal** - `laboratorio-bienestar`
   - Puerto: 30200
   - Estado: 🟢 Online
   - Reinicio automático: ✅ Habilitado

2. **Auto-Documentación** - `auto-documentation`
   - Puerto: 30210
   - Estado: 🟢 Online
   - Reinicio automático: ✅ Habilitado
   - Backup cada: 10 minutos

## 📂 Ubicación de Documentos

Todos los snapshots y logs se guardan en:
```
D:\Paginas_web\pagina\laboratorio-bienestar\33ebb4da-ca02-4d77-9332-d03a45bd00d5\
```

### Archivos Generados

- **`snapshot_YYYY-MM-DDTHH-mm-ss_SSSZ.json`**: Snapshots automáticos cada 10 minutos
- **`latest.json`**: Último snapshot para acceso rápido
- **`activity.log`**: Log continuo de toda la actividad
- Se mantienen los últimos 50 snapshots automáticamente

## 🔄 Backup Automático

- ⏰ **Frecuencia**: Cada 10 minutos
- 🔄 **Auto-reinicio**: Si el servicio falla, PM2 lo reinicia automáticamente
- 💾 **Capacidad**: Mantiene últimos 50 snapshots
- 📊 **Contenido**: Sesiones, API calls, errores, analytics e interacciones

## 🚀 Integración en tu Aplicación

### 1. Importar el cliente

```typescript
import { autoDoc } from '@/lib/autoDoc';
```

### 2. Iniciar sesión al cargar la app

```typescript
// En tu layout principal (app/layout.tsx)
useEffect(() => {
  autoDoc.startSession('user-id-opcional', {
    customMetadata: 'any data you want'
  });
}, []);
```

### 3. Registrar eventos importantes

```typescript
// Registrar llamada a API
autoDoc.logApiCall('/api/studies', 'GET', 200, 150);

// Registrar error
autoDoc.logError(new Error('Something went wrong'), 'error');

// Registrar analytics
autoDoc.logAnalytics('page_view', { category: 'estudios' });

// Registrar interacción
autoDoc.logInteraction('click', 'search-button');

// Forzar backup manual
await autoDoc.forceBackup();

// Obtener estadísticas
const stats = await autoDoc.getStats();
```

## 📊 API Endpoints del Servicio

### Health Check
```bash
curl http://localhost:30210/health
```

### Ver Estadísticas
```bash
curl http://localhost:30210/api/stats
```

### Forzar Backup Inmediato
```bash
curl -X POST http://localhost:30210/api/backup/now
```

### Ver Eventos Recientes
```bash
# Todos los eventos
curl http://localhost:30210/api/recent

# Solo sesiones
curl http://localhost:30210/api/recent/sessions?limit=20

# Solo errores
curl http://localhost:30210/api/recent/errors?limit=10
```

## 🔧 Comandos de Gestión PM2

### Ver estado de ambos servicios
```bash
pm2 status
```

### Ver logs del servicio de documentación
```bash
pm2 logs auto-documentation
```

### Reiniciar el servicio
```bash
pm2 restart auto-documentation
```

### Ver logs en tiempo real
```bash
pm2 logs auto-documentation --lines 100
```

### Detener el servicio
```bash
pm2 stop auto-documentation
```

### Iniciar el servicio
```bash
pm2 start auto-documentation
```

## 📈 Contenido de los Snapshots

Cada snapshot incluye:

```json
{
  "timestamp": "2026-01-22T22:30:00.000Z",
  "serverUptime": 600,
  "memoryUsage": { "rss": 50000000, "heapTotal": 30000000 },
  "data": {
    "sessions": [],
    "apiCalls": [],
    "errors": [],
    "analytics": [],
    "userInteractions": []
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

## 🛡️ Características de Seguridad

- ✅ El servicio se reinicia automáticamente si falla
- ✅ Guarda snapshot antes de cerrarse (SIGINT/SIGTERM)
- ✅ Limpieza automática de snapshots antiguos
- ✅ Logs rotativos en PM2
- ✅ Límite de memoria configurado (500MB)

## 🎯 Próximos Pasos

1. **Integrar en la aplicación**: Agregar `autoDoc` en los componentes principales
2. **Monitorear**: Revisar logs periódicamente con `pm2 logs`
3. **Analizar**: Revisar los snapshots para entender patrones de uso
4. **Optimizar**: Ajustar según necesidades de documentación

## ⚙️ Archivos de Configuración

- **`ecosystem.config.js`**: Configuración PM2 con ambos servicios
- **`services/auto-documentation/server.js`**: Servidor de documentación
- **`src/lib/autoDoc.ts`**: Cliente TypeScript para integración

¿Todo claro? El sistema está completamente funcional y documentando automáticamente cada 10 minutos. 🚀
