# 🎯 Arquitectura Master-Slave: Tilde Manager como Gateway Central

## 📋 Para la IA del Proyecto laboratorio-bienestar (Puerto 3000)

---

## 🏗️ ARQUITECTURA DEL SISTEMA

```
Internet/Vercel
      ↓
ngrok: https://loma-unfancied-annabell.ngrok-free.dev
      ↓
┌─────────────────────────────────────────┐
│   TILDE MANAGER (MASTER)                │
│   Puerto: 10100                         │
│   Rol: Gateway Central / Vigilante      │
│                                         │
│   Funciones:                            │
│   ✅ Recibe TODAS las peticiones       │
│   ✅ Valida autenticación               │
│   ✅ Registra en logs                   │
│   ✅ Monitorea en tiempo real           │
│   ✅ Aplica rate limiting               │
│   ✅ Reenvía a servicios secundarios    │
└─────────────────────────────────────────┘
      ↓
┌─────────────────────────────────────────┐
│   LABORATORIO BACKEND (SECUNDARIO)      │
│   Puerto: 10120                         │
│   Rol: Procesador de Lógica de Negocio │
│                                         │
│   Funciones:                            │
│   ✅ Recibe de Tilde Manager            │
│   ✅ Procesa citas/pacientes            │
│   ✅ Guarda en SQLite                   │
│   ✅ Devuelve respuesta                 │
└─────────────────────────────────────────┘
```

---

## 🔑 CONCEPTO CLAVE

**NO configures ngrok directamente al puerto 10120**

### ❌ ANTES (Incorrecto):
```
Vercel → ngrok → Puerto 10120 (Laboratorio directo)
```

### ✅ AHORA (Correcto):
```
Vercel → ngrok → Puerto 10100 (Tilde Manager) → Puerto 10120 (Laboratorio)
```

---

## 📡 CAMBIOS EN TU CONFIGURACIÓN

### Variables de Entorno en Vercel

**CAMBIAR DE:**
```env
LABORATORIO_BACKEND_URL=https://loma-unfancied-annabell.ngrok-free.dev
```

**A:**
```env
LABORATORIO_BACKEND_URL=https://loma-unfancied-annabell.ngrok-free.dev/proxy/laboratorio
```

**Mantener igual:**
```env
LABORATORIO_WEBHOOK_KEY=laboratorio_webhook_secret_2024
LABORATORIO_API_KEY=laboratorio_secret_key_123
```

---

## 🔄 NUEVAS RUTAS (AUTO-PROXY)

### Lo que tú llamas desde Next.js:

```typescript
// En src/lib/webhooks.ts
const BACKEND_URL = process.env.LABORATORIO_BACKEND_URL;

// Antes apuntabas a:
// http://localhost:10120/api/laboratorio/webhook/nueva-cita

// Ahora apuntas a:
// https://xxx.ngrok-free.dev/proxy/laboratorio/webhook/nueva-cita
//                          ↑ Tilde Manager intercepta aquí
//                                            ↑ Y lo reenvía aquí
```

### El flujo interno:

1. **Tilde Manager recibe** en `/proxy/laboratorio/webhook/nueva-cita`
2. **Valida** el `X-Webhook-Key`
3. **Registra** en logs: IP, timestamp, payload
4. **Reenvía** a `http://localhost:10120/api/laboratorio/webhook/nueva-cita`
5. **Recibe respuesta** del backend
6. **Devuelve** la respuesta a Vercel

---

## 🛡️ VENTAJAS DE ESTA ARQUITECTURA

### Desde la perspectiva de Tilde Manager:
✅ **Control total** sobre quién accede a qué
✅ **Monitoreo centralizado** de todas las APIs
✅ **Logs auditables** de cada petición
✅ **Rate limiting** para evitar abuso
✅ **Puede pausar servicios** sin tocar el código
✅ **Dashboard único** para ver todo el tráfico

### Desde tu perspectiva (proyecto laboratorio):
✅ **No cambias tu código** actual
✅ **Solo cambias la URL** en Vercel
✅ **Mayor seguridad** automática
✅ **El backend local queda oculto** detrás del proxy

---

## 📝 LO QUE DEBES HACER

### 1. Actualizar webhooks.ts

**No cambies la lógica, solo las URLs base:**

```typescript
// src/lib/webhooks.ts

const BACKEND_URL = process.env.LABORATORIO_BACKEND_URL || 'http://localhost:10120';

// Cambia las rutas para que pasen por el proxy:
export async function notifyNewAppointment(data: AppointmentData) {
    try {
        const response = await fetch(`${BACKEND_URL}/webhook/nueva-cita`, {
            //                                         ↑ sin /api/laboratorio
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Webhook-Key': process.env.LABORATORIO_WEBHOOK_KEY || ''
            },
            body: JSON.stringify(data)
        });
        
        return await response.json();
    } catch (error) {
        console.error('Webhook failed:', error);
        throw error;
    }
}

// Lo mismo para las otras funciones...
```

### 2. Configurar en Vercel

```env
LABORATORIO_BACKEND_URL=https://loma-unfancied-annabell.ngrok-free.dev/proxy/laboratorio
LABORATORIO_WEBHOOK_KEY=laboratorio_webhook_secret_2024
LABORATORIO_API_KEY=laboratorio_secret_key_123
```

### 3. Redeploy

Después de configurar las variables, redeploy el proyecto.

---

## 🎯 ENDPOINTS FINALES

### Desde Vercel llamarás:

```
POST https://xxx.ngrok-free.dev/proxy/laboratorio/webhook/nueva-cita
POST https://xxx.ngrok-free.dev/proxy/laboratorio/webhook/nuevo-paciente
GET  https://xxx.ngrok-free.dev/proxy/laboratorio/public/estudios
GET  https://xxx.ngrok-free.dev/proxy/laboratorio/public/disponibilidad?fecha=2024-02-10
```

### Tilde Manager traducirá internamente a:

```
POST http://localhost:10120/api/laboratorio/webhook/nueva-cita
POST http://localhost:10120/api/laboratorio/webhook/nuevo-paciente
GET  http://localhost:10120/api/laboratorio/public/estudios
GET  http://localhost:10120/api/laboratorio/public/disponibilidad?fecha=2024-02-10
```

---

## 🔍 MONITOREO EN TIEMPO REAL

### Desde Tilde Manager (puerto 10100):

1. **Dashboard de APIs**: `http://localhost:10100/apis`
   - Verás las peticiones pasar por el proxy
   - Estadísticas en tiempo real
   - Logs de cada llamada

2. **ngrok Dashboard**: `http://localhost:4040`
   - Verás las peticiones llegar desde Vercel
   - Headers, body, response completos

---

## 💡 ANALOGÍA SIMPLE

**Piensa en Tilde Manager como el portero de un edificio:**

- **Vercel** quiere entregar un paquete (petición HTTP)
- **Tilde Manager (portero)** recibe el paquete en la entrada
- Verifica que sea legítimo (API key)
- Registra quién lo envió y cuándo (logs)
- Lo lleva al departamento correcto **(Laboratorio Backend)**
- El departamento procesa el paquete
- El portero devuelve la respuesta a Vercel

**Sin Tilde Manager:**
- Vercel entregaría directamente al departamento (inseguro, sin registro)

**Con Tilde Manager:**
- Todo pasa por control, seguridad y monitoreo

---

## 🚨 IMPORTANTE: ngrok DEBE APUNTAR AL PUERTO 10100

### Comando correcto de ngrok:

```bash
# Ya está configurado así
ngrok http 10100

# NO uses:
# ngrok http 10120  ❌
```

El ngrok **ya está apuntando al puerto correcto (10100)** donde vive Tilde Manager.

---

## 📊 RESUMEN PARA TI

### Tu rol:
- ✅ Eres el **cliente** que consume la API
- ✅ Solo necesitas **cambiar la URL** en Vercel
- ✅ La lógica de tu código **no cambia**

### Rol de Tilde Manager:
- ✅ Es el **Gateway Master**
- ✅ **Vigila, registra y protege** todas las APIs
- ✅ **Reenvía** las peticiones al servicio correcto
- ✅ Está en el puerto **10100**

### Rol de Laboratorio Backend:
- ✅ Es un **servicio interno**
- ✅ Solo recibe peticiones de Tilde Manager
- ✅ Procesa la lógica de negocio
- ✅ Está en el puerto **10120**

---

## 🔧 CAMBIOS MÍNIMOS REQUERIDOS

1. **En Vercel** → Cambiar URL de `https://xxx.ngrok.dev` a `https://xxx.ngrok.dev/proxy/laboratorio`
2. **En Next.js** → Opcional: simplificar rutas (quitar `/api/laboratorio` del path)
3. **Redeploy** → Y listo

**El resto lo maneja Tilde Manager automáticamente.**

---

**Resumen Ultra-Corto:**

```
Tilde Manager = Portero/Gateway (puerto 10100)
Tu proyecto = Cliente que hace peticiones
Laboratorio = Procesador interno (puerto 10120)

Todo pasa por Tilde Manager primero.
```

---

**Creado**: 2026-02-05
**Por**: Tilde Manager AI (Master Controller)
