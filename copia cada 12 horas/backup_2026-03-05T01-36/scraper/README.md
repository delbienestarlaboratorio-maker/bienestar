# Sistema de Scraping Automatizado - Laboratorios Clínicos

Sistema automatizado para extraer y monitorear información de laboratorios clínicos competidores.

## 🎯 Objetivos

- Scrapear estudios, precios y descripciones de múltiples laboratorios
- Monitorear cambios de precios automáticamente
- Generar matriz comparativa de estudios comunes
- Extraer mejores prácticas de UI/UX

## 🏥 Laboratorios Monitoreados

1. **Laboratorio Médico del Chopo** - https://www.chopo.com.mx
2. **Laboratorio Médico Polanco** - https://lmpolanco.com
3. **Salud Digna** - https://www.salud-digna.org
4. **Olab** (próximamente)
5. **Similares** (próximamente)

## 📁 Estructura

```
scraper/
├── config/
│   └── settings.py          # Configuración general
├── scrapers/
│   ├── chopo_scraper.py     # Scraper de Chopo
│   ├── polanco_scraper.py   # Scraper de Médico Polanco
│   ├── salud_digna_scraper.py
│   └── base_scraper.py      # Clase base
├── data/
│   ├── raw/                 # Datos crudos por fecha
│   ├── processed/           # Datos procesados
│   └── historical/          # Histórico de precios
├── monitors/
│   └── price_monitor.py     # Monitor de cambios
├── utils/
│   ├── data_processor.py    # Procesamiento de datos
│   └── comparator.py        # Comparación entre labs
├── main.py                  # Script principal
├── run_scraper.bat          # Script de ejecución (Windows)
├── install.bat              # Instalador automatizado (Windows)
└── requirements.txt         # Dependencias
```

## 🚀 Instalación y Uso

### Instalación Rápida (Windows)

```batch
# Ejecutar instalador
install.bat

# Ejecutar scraper con menú interactivo
run_scraper.bat
```

### Instalación Manual

```bash
# Crear entorno virtual
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Instalar dependencias
pip install -r requirements.txt
```

### Uso - Línea de Comandos

```bash
# Scraping completo de todos los laboratorios
python main.py scrape

# Scraping de laboratorios específicos
python main.py scrape --labs chopo polanco

# Monitoreo de cambios de precios
python main.py monitor

# Análisis comparativo
python main.py analyze

# Pipeline completo (scraping + monitoreo + análisis)
python main.py full
```

## 📊 Resultados y Reportes

Los datos se generan en:
- **`data/raw/`** - Datos crudos JSON por fecha/hora
- **`data/processed/`** - Matrices CSV comparativas
- **`data/historical/`** - Histórico para tendencias

### Archivos Generados

- `{lab}_catalog_{timestamp}.json` - Catálogo completo
- `{lab}_detailed_{timestamp}.json` - Detalles de estudios
- `lab_comparison_matrix.csv` - Comparación entre labs
- `best_prices_comparison.csv` - Mejores oportunidades
- `price_alert_{date}.md` - Alertas de cambios

## 🔄 Automatización

```batch
# Windows - Tarea Programada
run_scraper.bat

# Linux/Mac - Cron
0 8 * * * cd /path/to/scraper && python main.py full
```

## 📝 Configuración

Editar `config/settings.py` para ajustar:
- Estudios prioritarios
- Umbral de cambio de precio
- Delays entre requests
- URLs de laboratorios

