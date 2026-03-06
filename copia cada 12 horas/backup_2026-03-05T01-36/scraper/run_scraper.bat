@echo off
REM Script de inicio rápido para el sistema de scraping

echo ========================================
echo Sistema de Scraping - Laboratorios
echo ========================================
echo.

REM Verificar si existe el entorno virtual
if not exist "venv\Scripts\activate.bat" (
    echo [ERROR] No se encontro el entorno virtual.
    echo Por favor ejecuta primero: python -m venv venv
    pause
    exit /b 1
)

REM Activar entorno virtual
echo [INFO] Activando entorno virtual...
call venv\Scripts\activate.bat

REM Verificar instalación
echo [INFO] Verificando dependencias...
python -c "import requests; import bs4; import pandas" 2>nul
if errorlevel 1 (
    echo [WARN] Faltan dependencias. Instalando...
    pip install -r requirements.txt
)

echo.
echo Selecciona una opcion:
echo.
echo 1. Scraping completo (todos los labs)
echo 2. Solo Chopo
echo 3. Solo Polanco
echo 4. Monitoreo de precios
echo 5. Analisis comparativo
echo 6. Pipeline completo (scraping + monitor + analisis)
echo.

set /p choice="Ingresa tu opcion (1-6): "

if "%choice%"=="1" (
    echo [INFO] Ejecutando scraping completo...
    python main.py scrape
) else if "%choice%"=="2" (
    echo [INFO] Scraping Chopo...
    python main.py scrape --labs chopo
) else if "%choice%"=="3" (
    echo [INFO] Scraping Polanco...
    python main.py scrape --labs polanco
) else if "%choice%"=="4" (
    echo [INFO] Monitoreando precios...
    python main.py monitor
) else if "%choice%"=="5" (
    echo [INFO] Generando analisis...
    python main.py analyze
) else if "%choice%"=="6" (
    echo [INFO] Ejecutando pipeline completo...
    python main.py full
) else (
    echo [ERROR] Opcion invalida
    pause
    exit /b 1
)

echo.
echo ========================================
echo Proceso completado!
echo ========================================
echo.
echo Revisa los resultados en la carpeta data/
echo.
pause
