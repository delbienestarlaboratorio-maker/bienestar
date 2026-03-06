@echo off
echo ===================================================
echo      RESTAURACION AUTOMATICA DEL SISTEMA
echo ===================================================
echo.
echo 1. Instalando dependencias (esto puede tardar)...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Fallo al instalar dependencias.
    pause
    exit /b %errorlevel%
)

echo.
echo 2. Construyendo la aplicacion...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Fallo al construir la aplicacion.
    pause
    exit /b %errorlevel%
)

echo.
echo 3. Iniciando servicios...
call pm2 start ecosystem.config.js
if %errorlevel% neq 0 (
    echo [ERROR] Fallo al iniciar PM2. Intentando instalar PM2 globalmente...
    call npm install -g pm2
    call pm2 start ecosystem.config.js
)

echo.
echo ===================================================
echo      SISTEMA RESTAURADO EXITOSAMENTE
echo ===================================================
echo.
pause
