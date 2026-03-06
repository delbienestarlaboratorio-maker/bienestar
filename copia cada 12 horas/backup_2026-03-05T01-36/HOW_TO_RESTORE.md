# Guía de Restauración

Esta carpeta contiene una copia completa del sistema "Laboratorio Bienestar".

## Cómo Restaurar

### Opción A (Automática - Recomendada)
1. Haz doble clic en el archivo **`restore.bat`**.
2. Espera a que termine el proceso (instalará dependencias y arrancará el servidor).

### Opción B (Manual)
Si prefieres hacerlo manualmente, abre una terminal en esta carpeta y ejecuta:

1. `npm install`
2. `npm run build`
3. `pm2 start ecosystem.config.js`

## Contenido del Backup
- Código fuente completo
- Archivos de configuración (.env, ecosystem.config.js)
- Documentación del sistema
- **NO INCLUYE**: `node_modules` (se regenera automáticamente)
