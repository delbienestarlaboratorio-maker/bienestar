# Variables de Entorno - Integración con Backend Local

## LABORATORIO_BACKEND_URL
URL del backend local del Laboratorio Manager.
- **Desarrollo local**: http://localhost:10120
- **Producción (con ngrok)**: https://TU-NGROK-URL.ngrok-free.app
- **Producción (puerto forwarding)**: http://TU-IP-PUBLICA:10120

Ejemplo:
```
LABORATORIO_BACKEND_URL=https://abc123.ngrok-free.app
```

## LABORATORIO_WEBHOOK_KEY
Clave secreta para autenticar webhooks hacia el backend local.
Debe coincidir con la variable `LABORATORIO_WEBHOOK_KEY` del backend.

Ejemplo:
```
LABORATORIO_WEBHOOK_KEY=laboratorio_webhook_secret_2024
```

## LABORATORIO_API_KEY (Opcional)
API Key para consultar endpoints públicos del backend local (estudios, disponibilidad).

Ejemplo:
```
LABORATORIO_API_KEY=laboratorio_secret_key_123
```

---

## Configuración en Vercel

1. Ir a tu proyecto en Vercel: https://vercel.com/dashboard
2. Ir a Settings → Environment Variables
3. Añadir las siguientes variables:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `LABORATORIO_BACKEND_URL` | URL de tu backend | Production + Preview |
| `LABORATORIO_WEBHOOK_KEY` | Webhook secret key | Production + Preview |
| `LABORATORIO_API_KEY` | API key (opcional) | Production + Preview |

4. Guardar y hacer redeploy del proyecto

---

## Exponer Backend Local para Vercel

### Opción 1: ngrok (Recomendada para desarrollo/pruebas)

1. Instalar ngrok: https://ngrok.com/download
2. Ejecutar:
   ```bash
   ngrok http 10120
   ```
3. Copiar la URL HTTPS que te da (ej: `https://abc123.ngrok-free.app`)
4. Usarla como `LABORATORIO_BACKEND_URL` en Vercel

### Opción 2: Puerto Forwarding (Producción)

1. Configurar router para reenviar puerto 10120 a tu PC local
2. Obtener IP pública
3. Usar `http://TU-IP-PUBLICA:10120` como `LABORATORIO_BACKEND_URL`

⚠️ **Importante**: Asegúrate de que el firewall permita conexiones en el puerto 10120
