# 🚀 Guía de Inicio Rápido - Scraper de Laboratorios

## 📋 Requisitos Previos

- Python 3.8+
- pip

## ⚡ Instalación Rápida

### 1. Crear entorno virtual (recomendado)

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 2. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 3. Configurar variables de entorno

```bash
# Copiar archivo de ejemplo
copy .env.example .env

# Editar .env con tu configuración (opcional)
```

## 🎯 Uso

### Comando Básico - Scraping Completo

```bash
# Scrapear todos los laboratorios configurados
python main.py scrape

# Scrapear laboratorios específicos
python main.py scrape --labs chopo polanco
```

### Monitoreo de Precios

```bash
# Monitorear cambios de precios
python main.py monitor
```

### Análisis Comparativo

```bash
# Generar matriz comparativa
python main.py analyze
```

### Pipeline Completo

```bash
# Ejecutar todo: scraping + monitoreo + análisis
python main.py full
```

## 📊 Resultados

Los datos se guardan automáticamente en:

- **`data/raw/`** - Datos crudos de cada scraping
- **`data/processed/`** - Matrices comparativas y análisis
- **`data/historical/`** - Histórico para monitoreo de precios

### Archivos Generados

- `lab_comparison_matrix.csv` - Comparación de precios entre laboratorios
- `best_prices_comparison.csv` - Mejores oportunidades de ahorro
- `price_alert_YYYYMMDD.md` - Alertas de cambios de precio

## 🔄 Automatización

### Windows - Tarea Programada

Crear archivo `run_daily.bat`:

```batch
@echo off
cd W:\pagina\2026\scraper
call venv\Scripts\activate
python main.py full
```

Programar con Tareas Programadas de Windows (diario a las 8 AM).

### Linux/Mac - Cron Job

```bash
# Editar crontab
crontab -e

# Agregar línea (ejecutar diario a las 8 AM)
0 8 * * * cd /path/to/scraper && venv/bin/python main.py full
```

## 📝 Notas

- El primer scraping puede tardar 10-30 minutos dependiendo de la cantidad de estudios
- Los scrapers están configurados con delays para evitar sobrecargar los servidores
- Los precios se monitorean automáticamente comparando con el scraping anterior

## 🆘 Troubleshooting

### Error: "No module named 'xyz'"
```bash
pip install -r requirements.txt --upgrade
```

### Error: Timeout o conexión
- Verificar conexión a internet
- Los sitios pueden estar temporalmente no disponibles
- Aumentar `REQUEST_TIMEOUT` en `config/settings.py`

## 📧 Soporte

Para más información, consultar `README.md` o revisar los logs en `scraper.log`.
