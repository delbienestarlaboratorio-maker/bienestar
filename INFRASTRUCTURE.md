# Laboratorio Bienestar — Notas de Infraestructura

## ⚠️ PUERTOS

| Servicio | Puerto | Notas |
|---|---|---|
| **Bienestar (producción)** | **30200** | PM2 `next start -p 30200` |
| **Bienestar (desarrollo)** | **30200** | `npm run dev` usa `-p 30200` |
| Puerto 3000 | ❌ PROHIBIDO | Pertenece a OTRO sistema local. **NO tocar.** |

## Comandos de Operación

```bash
# Compilar la app (NO usa puerto, solo genera .next/)
npm run build

# Iniciar en producción con PM2, puerto 30200
pm2 start ecosystem.config.js --only bienestar

# Reiniciar tras un nuevo build
pm2 restart bienestar

# Ver logs
pm2 logs bienestar --lines 30 --nostream

# Desarrollo local, puerto 30200
npm run dev
```

## Build con Next.js 16 (Turbopack)

Next.js 16.1.2 usa Turbopack por defecto que tiene un **bug conocido** en Windows:
`RangeError: Invalid count value: -2` en `String.repeat`.

**Workaround**: usar `patch-repeat.js` que parchea `String.prototype.repeat`:
```powershell
$env:NODE_OPTIONS="--require=d:/Paginas_web/pagina/laboratorio-bienestar/patch-repeat.js"
npm run build
```

## Cloudflare Tunnel

El túnel de Cloudflare se gestiona también vía PM2:
```bash
pm2 start ecosystem.config.js --only cloudflare-tunnel
```
