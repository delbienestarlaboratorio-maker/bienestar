# Gestión de PM2 - Laboratorio Bienestar

## 🚀 Servidor con Reinicio Automático

El servidor de **Laboratorio Bienestar** está configurado con PM2 para reiniciarse automáticamente si se apaga por cualquier motivo.

## Configuración Actual

- **Nombre del proceso**: `laboratorio-bienestar`
- **Puerto**: 30200
- **Modo**: Desarrollo con Next.js
- **Reinicio automático**: ✅ Habilitado
- **Máximo de reinicios**: 10 intentos
- **Delay entre reinicios**: 4 segundos
- **Logs**: `./logs/pm2-error.log` y `./logs/pm2-out.log`

## Comandos Útiles

### Ver estado de todos los procesos
```bash
pm2 status
```

### Ver logs en tiempo real
```bash
pm2 logs laboratorio-bienestar
```

### Ver solo errores
```bash
pm2 logs laboratorio-bienestar --err
```

### Reiniciar el servidor manualmente
```bash
pm2 restart laboratorio-bienestar
```

### Detener el servidor
```bash
pm2 stop laboratorio-bienestar
```

### Eliminar el proceso de PM2
```bash
pm2 delete laboratorio-bienestar
```

### Ver información detallada
```bash
pm2 info laboratorio-bienestar
```

### Ver monitoreo en tiempo real
```bash
pm2 monit
```

### Guardar configuración actual
```bash
pm2 save
```

### Restaurar procesos guardados
```bash
pm2 resurrect
```

## Características de Reinicio Automático

El servidor se reiniciará automáticamente en los siguientes casos:

1. ✅ **Crash de la aplicación**: Si Node.js se cierra inesperadamente
2. ✅ **Errores fatales**: Si hay un error no capturado que detiene el servidor
3. ✅ **Límite de memoria**: Si excede 1GB de uso de memoria
4. ✅ **Tiempo mínimo de uptime**: Solo reinicia si ha estado corriendo al menos 10 segundos

## Configuración en `ecosystem.config.js`

El archivo de configuración incluye:

- **autorestart**: `true` - Reinicia automáticamente en caso de falla
- **max_memory_restart**: `1G` - Reinicia si excede 1GB de RAM
- **min_uptime**: `10s` - Tiempo mínimo antes de considerar un reinicio válido
- **max_restarts**: `10` - Máximo 10 reinicios consecutivos
- **restart_delay**: `4000ms` - Espera 4 segundos entre reinicios
- **kill_timeout**: `5000ms` - Tiempo de espera antes de forzar cierre
- **listen_timeout**: `3000ms` - Tiempo de espera para que el servidor inicie

## Acceso al Servidor

- **Local**: http://localhost:30200
- **Red**: http://26.200.31.242:30200

## Nota para Windows

⚠️ En Windows, PM2 no puede configurarse para iniciar automáticamente al arrancar el sistema usando `pm2 startup`. Para lograr esto, necesitarías:

1. Usar **pm2-windows-startup** (paquete adicional)
2. Crear una tarea programada de Windows
3. Usar **NSSM** (Non-Sucking Service Manager) para ejecutar PM2 como servicio

Si necesitas que el servidor arranque automáticamente al iniciar Windows, avísame y configuro una de estas opciones.
