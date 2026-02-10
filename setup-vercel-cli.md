# Configuración de Vercel CLI para Debugging Automático

## Paso 1: Instalar Vercel CLI

```powershell
npm install -g vercel
```

## Paso 2: Login (Solo Una Vez)

```powershell
vercel login
```

Esto abrirá tu navegador para autenticar. Una vez autenticado, queda guardado.

## Paso 3: Link al Proyecto

```powershell
cd d:\Paginas_web\pagina\laboratorio-bienestar
vercel link
```

Selecciona:
- Scope: Tu cuenta
- Project: laboratorio-bienestar
- Branch: main

## Comandos Útiles que Yo Puedo Ejecutar

### Ver Logs del Último Deployment
```powershell
vercel logs
```

### Ver Estado de Deployments
```powershell
vercel ls
```

### Ver Build Logs Completos
```powershell
vercel logs --follow
```

### Ver Variables de Entorno
```powershell
vercel env ls
```

### Información del Proyecto
```powershell
vercel inspect
```

## Beneficios

✅ **Yo puedo ejecutar estos comandos directamente**
✅ **No necesitas copiar/pegar errores manualmente**
✅ **Logs en tiempo real**
✅ **Debugging más rápido**
✅ **No requiere compartir credenciales**

## Configuración Adicional (Opcional)

### Auto-monitoring Script
Crea: `vercel-watch.ps1`

```powershell
# Monitorea deployments cada 30 segundos
while ($true) {
    Write-Host "[$(Get-Date)] Checking deployments..." -ForegroundColor Cyan
    vercel ls --limit 1
    Start-Sleep -Seconds 30
}
```

Ejecuta:
```powershell
.\vercel-watch.ps1
```

## Solución de Problemas

### Error: "Command not found"
```powershell
npm list -g vercel
# Si no aparece:
npm install -g vercel --force
```

### Error: "Not authenticated"
```powershell
vercel logout
vercel login
```
