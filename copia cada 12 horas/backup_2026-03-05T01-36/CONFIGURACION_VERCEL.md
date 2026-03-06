# 🚀 Configuración Urgente para Vercel

## ✅ ESTADO ACTUAL

- ✅ Backend Local corriendo en `http://localhost:10120`
- ✅ ngrok activo y exponiendo el backend a internet
- ✅ Código ya modificado (webhooks.ts, main.py, route.ts)

## 🌐 URL PÚBLICA DEL BACKEND

```
https://loma-unfancied-annabell.ngrok-free.dev
```

⚠️ **IMPORTANTE**: Esta URL es temporal. Cada vez que se reinicie ngrok cambiará.

---

## 🔧 CONFIGURACIÓN EN VERCEL

### Paso 1: Ir a Environment Variables

1. Entra a: https://vercel.com
2. Selecciona el proyecto: `laboratorio-bienestar`
3. Ve a: **Settings** → **Environment Variables**

### Paso 2: Agregar estas 3 variables

**Variable 1:**
```
Name: LABORATORIO_BACKEND_URL
Value: https://loma-unfancied-annabell.ngrok-free.dev
Environment: Production, Preview, Development
```

**Variable 2:**
```
Name: LABORATORIO_WEBHOOK_KEY
Value: laboratorio_webhook_secret_2024
Environment: Production, Preview, Development
```

**Variable 3:**
```
Name: LABORATORIO_API_KEY
Value: laboratorio_secret_key_123
Environment: Production, Preview, Development
```

### Paso 3: Redeploy

1. Ve a: **Deployments**
2. Click en los 3 puntos del último deployment
3. Click en **Redeploy**
4. Espera 1-2 minutos

---

## 🧪 PRUEBA EL SISTEMA

Una vez redeployado:

1. Ve a: https://laboratorio.delbienestar.com.mx
2. Reserva una cita de prueba
3. Verifica que llegue al backend local

### Ver logs en tiempo real

**Dashboard de ngrok:**
```
http://localhost:4040
```

Aquí verás todas las peticiones que llegan desde Vercel.

---

## 📡 ENDPOINTS ACTIVOS

Todos estos están funcionando en el backend local:

### Webhooks (desde Vercel → Backend)
- `POST /api/laboratorio/webhook/nueva-cita`
- `POST /api/laboratorio/webhook/nuevo-paciente`

### APIs Públicas (desde Vercel → Backend)
- `GET /api/laboratorio/public/estudios`
- `GET /api/laboratorio/public/disponibilidad?fecha=YYYY-MM-DD`

---

## 🔑 AUTENTICACIÓN

- **Webhooks** usan header: `X-Webhook-Key: laboratorio_webhook_secret_2024`
- **APIs Públicas** usan header: `X-API-Key: laboratorio_secret_key_123`

Todo está configurado automáticamente en `src/lib/webhooks.ts`.

---

## ⚠️ IMPORTANTE: ngrok DEBE QUEDARSE CORRIENDO

El backend está expuesto mientras ngrok esté activo. 

**NO cierres la terminal donde corre ngrok.**

Para ver el dashboard de ngrok:
```
http://localhost:4040
```

---

## 📋 RESUMEN DE COMANDOS

```powershell
# Ver si ngrok está corriendo
Get-Process ngrok

# Ver el puerto del backend
netstat -ano | findstr :10120

# Dashboard ngrok
start http://localhost:4040
```

---

## 🆘 TROUBLESHOOTING

### Si las citas no llegan:
1. Verifica que ngrok esté corriendo: `http://localhost:4040`
2. Checa los logs del backend Flask
3. Revisa las variables de entorno en Vercel
4. Verifica que hiciste redeploy después de agregar las variables

### Si cambió la URL de ngrok:
1. Actualiza `LABORATORIO_BACKEND_URL` en Vercel
2. Haz redeploy

---

## ✅ CHECKLIST FINAL

- [ ] Variables agregadas en Vercel
- [ ] Redeploy completado
- [ ] Cita de prueba creada
- [ ] Cita recibida en backend local
- [ ] Dashboard ngrok muestra actividad

---

**Fecha de configuración**: 2026-02-05 10:54
**Configurado por**: Tilde Manager AI
