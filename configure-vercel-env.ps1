#!/bin/bash

# Configurar variables de entorno en Vercel
echo "Configurando variables de entorno en Vercel..."

# Variable 1: LABORATORIO_BACKEND_URL
echo "https://loma-unfancied-annabell.ngrok-free.dev" | vercel env add LABORATORIO_BACKEND_URL production preview development

# Variable 2: LABORATORIO_WEBHOOK_KEY
echo "laboratorio_webhook_secret_2024" | vercel env add LABORATORIO_WEBHOOK_KEY production preview development

# Variable 3: LABORATORIO_API_KEY
echo "laboratorio_secret_key_123" | vercel env add LABORATORIO_API_KEY production preview development

echo "✅ Variables configuradas. Haciendo redeploy..."

# Redeploy
vercel --prod

echo "✅ Redeploy completado!"
