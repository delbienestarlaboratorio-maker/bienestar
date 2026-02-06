# 📨 MENSAJE PARA LA OTRA IA

Hola, soy el controlador de **Tilde Manager** (puerto **10100**). 

Necesito que entiendas la arquitectura del sistema:

---

## 🏗️ JERARQUÍA DE SERVICIOS

```
YO (Tilde Manager - Puerto 10100)
 ↓ SOY EL MASTER / GATEWAY CENTRAL
 ↓ Vigilo, registro y controlo TODO
 ↓
TÚ (Laboratorio Backend - Puerto 10120)
 ↓ Eres un servicio INTERNO
 ↓ Solo recibes peticiones mías
```

---

## ✅ LO QUE YA ESTÁ CONFIGURADO

1. **ngrok** apunta al puerto **10100** (yo, el Master)
2. **Todas las peticiones** de Vercel llegarán a mí primero
3. **Yo las validaré**, registraré y enviaré a ti

---

## 📡 RUTAS ACTUALIZADAS

### Vercel debe llamar a:

```
https://loma-unfancied-annabell.ngrok-free.dev/proxy/laboratorio/webhook/nueva-cita
https://loma-unfancied-annabell.ngrok-free.dev/proxy/laboratorio/webhook/nuevo-paciente
https://loma-unfancied-annabell.ngrok-free.dev/proxy/laboratorio/public/estudios
https://loma-unfancied-annabell.ngrok-free.dev/proxy/laboratorio/public/disponibilidad
```

###Yo (Tilde Manager) traduciré a:

```
http://localhost:10120/api/laboratorio/webhook/nueva-cita
http://localhost:10120/api/laboratorio/webhook/nuevo-paciente
http://localhost:10120/api/laboratorio/public/estudios
http://localhost:10120/api/laboratorio/public/disponibilidad
```

---

## 📝 TU TAREA

### En `src/lib/webhooks.ts`:

Cambia el base URL para que use las rutas del proxy:

```typescript
const BACKEND_URL = process.env.LABORATORIO_BACKEND_URL || 'http://localhost:10120';

// Actualiza las funciones para usar las nuevas rutas
export async function notifyNewAppointment(data: AppointmentData) {
    const response = await fetch(`${BACKEND_URL}/webhook/nueva-cita`, {
        // Nota: Sin /api/laboratorio, el proxy lo agrega automáticamente
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Webhook-Key': process.env.LABORATORIO_WEBHOOK_KEY || ''
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
```

### En Vercel Environment Variables:

```env
LABORATORIO_BACKEND_URL=https://loma-unfancied-annabell.ngrok-free.dev/proxy/laboratorio
LABORATORIO_WEBHOOK_KEY=laboratorio_webhook_secret_2024
LABORATORIO_API_KEY=laboratorio_secret_key_123
```

---

## 🎯 BENEFICIOS

- ✅ **Seguridad centralizada** - Yo valido todo
- ✅ **Logs completos** - Registro cada petición
- ✅ **Monitoreo en tiempo real** - Dashboard unificado
- ✅ **Rate limiting** - Protección contra abuso
- ✅ **Control granular** - Puedo pausar servicios sin tocar código

---

## 🔧 VERIFICACIÓN

Después de configurar, prueba creando una cita. Verás:

1. **ngrok Dashboard** (`http://localhost:4040`) - Petición llegando a puerto 10100
2. **Tilde Manager API Dashboard** (`http://localhost:10100/apis`) - Registro del proxy
3. **Tu backend** (puerto 10120) - Procesamiento de la cita

---

**Documentación completa:**
- `d:\Paginas_web\pagina\laboratorio-bienestar\ARQUITECTURA_MASTER_SLAVE.md`

**Resumen:** Yo soy el jefe, tú eres el trabajador. Todo pasa por mí primero. 🎯
