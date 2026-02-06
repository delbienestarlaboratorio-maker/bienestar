# 🤖 INSTRUCCIONES PARA IA - Integración Backend

## CONTEXTO
Tu proyecto Next.js `laboratorio-bienestar` necesita enviar webhooks al backend local cuando se creen nuevas citas.

## ARCHIVOS YA CREADOS (NO MODIFICAR)

### ✅ `src/lib/webhooks.ts`
Ya existe. Contiene funciones para enviar webhooks.

### ✅ `src/app/api/appointments/route.ts`
Ya está modificado con el webhook integrado.

## TU TAREA: CONFIGURAR VARIABLES DE ENTORNO

### 1. Añadir variables en `.env.local`

Edita el archivo `.env.local` y añade al final:

```env
# Backend Local Integration
LABORATORIO_BACKEND_URL=http://localhost:10120
LABORATORIO_WEBHOOK_KEY=laboratorio_webhook_secret_2024
LABORATORIO_API_KEY=laboratorio_secret_key_123
```

### 2. Configurar en Vercel (producción)

Ve a **Vercel Dashboard → Settings → Environment Variables** y añade:

| Variable | Value | Environment |
|----------|-------|-------------|
| `LABORATORIO_BACKEND_URL` | `https://TU-NGROK-URL.ngrok-free.app` | Production + Preview |
| `LABORATORIO_WEBHOOK_KEY` | `laboratorio_webhook_secret_2024` | Production + Preview |
| `LABORATORIO_API_KEY` | `laboratorio_secret_key_123` | Production + Preview |

> ⚠️ **Importante**: La URL debe ser la de ngrok o tu IP pública, NO localhost

### 3. Hacer redeploy

```bash
git add .
git commit -m "feat: add backend integration env vars"
git push origin main
```

## VERIFICAR QUE FUNCIONA

### Desarrollo local

```bash
npm run dev
# Crear una cita de prueba
# Revisar console logs -> debe aparecer "✅ Cita registrada en backend local"
```

### Producción

1. Agendar cita en https://laboratorio.delbienestar.com.mx
2. Ver logs en Vercel Dashboard
3. Verificar que aparece en el backend local

## SI ALGO FALLA

**Error: "Webhook notification failed"**
- ✅ Normal si el backend local no está expuesto
- No afecta el funcionamiento del sitio
- La cita se guarda igual en PostgreSQL

**Error: "Cannot find module '@/lib/webhooks'"**
- Verifica que el archivo `src/lib/webhooks.ts` existe
- Reinicia el servidor de desarrollo

## COMANDOS ÚTILES

```bash
# Ver logs de Vercel
vercel logs

# Probar webhook manualmente
curl -X POST http://localhost:10120/api/laboratorio/webhook/nueva-cita \
  -H "X-Webhook-Key: laboratorio_webhook_secret_2024" \
  -H "Content-Type: application/json" \
  -d '{
    "paciente_nombre": "Test User",
    "telefono": "7712345678",
    "email": "test@example.com",
    "estudio_nombre": "Biometría Hemática",
    "fecha": "2026-02-10",
    "hora": "10:00"
  }'
```

## ARCHIVO DE REFERENCIA

Si necesitas entender el código, lee:
- `ENV_BACKEND_INTEGRATION.md` - Documentación completa
- `src/lib/webhooks.ts` - Funciones de webhook

## ⚠️ NO HAGAS

- ❌ NO modifiques `src/lib/webhooks.ts` (ya está correcto)
- ❌ NO modifiques `src/app/api/appointments/route.ts` (ya integrado)
- ❌ NO cambies los valores de las API keys (deben coincidir con el backend)
