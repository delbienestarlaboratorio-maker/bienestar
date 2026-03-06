# Variables de Entorno - Laboratorio Bienestar

## Configuración Requerida

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# ============================================
# CONFIGURACIÓN DE LABORATORIO BIENESTAR
# ============================================

# --------------------------------------------
# Tilde IA (Sistema de Inteligencia Artificial)
# --------------------------------------------
TILDE_IA_URL=http://localhost:10008

# --------------------------------------------
# Clip Pagos (Procesador de Pagos)
# --------------------------------------------
# Credenciales de Sandbox (Pruebas)
CLIP_API_KEY=8d12c56e-34db-4496-8cf2-6e54c8381716
CLIP_API_SECRET=test_e25092a9-d1df-472b-a6d4-67e6e10615a9
CLIP_ENV=sandbox

# Para producción, cambiar a:
# CLIP_ENV=production
# Y usar credenciales reales de Clip

# --------------------------------------------
# Base URL (Para redirecciones de pago)
# --------------------------------------------
# Desarrollo
NEXT_PUBLIC_BASE_URL=http://localhost:30200

# Producción (descomentar cuando se despliegue)
# NEXT_PUBLIC_BASE_URL=https://laboratorio.delbienestar.com.mx

# --------------------------------------------
# Base de Datos (Futuro)
# --------------------------------------------
# DATABASE_URL=postgresql://user:password@localhost:5432/laboratorio_bienestar
```

## Descripción de Variables

### TILDE_IA_URL
URL del servicio de Tilde IA. Por defecto corre en puerto 10008.

### CLIP_API_KEY / CLIP_API_SECRET
Credenciales de Clip para procesar pagos. Las mostradas son de sandbox (pruebas).

### CLIP_ENV
Entorno de Clip: `sandbox` para pruebas, `production` para producción.

### NEXT_PUBLIC_BASE_URL
URL base del sitio. Se usa para redirecciones de pago.

## Verificación

Para verificar que las variables están configuradas correctamente:

```bash
# Ver contenido de .env.local
type .env.local

# Iniciar servidor (cargará automáticamente las variables)
npm run dev
```
