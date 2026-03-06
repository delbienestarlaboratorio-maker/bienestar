# System Control Center (Port 30205)

**"God Mode"** - Panel de Control Centralizado para la administración técnica del ecosistema Laboratorio Bienestar.

## 🎯 Objetivo
Proporcionar una interfaz unificada para orquestar, monitorear y controlar todos los aspectos técnicos del sistema sin necesidad de tocar código o consolas.

## 🛠️ Funcionalidades Core

### 1. Gestión de Módulos (Service Orchestration)
- **Control PM2**: Interfaz visual para ver el estado de todos los microservicios.
- **Acciones**: Iniciar, Detener, Reiniciar y Ver Logs de cada módulo (Frontend, Scraper, Pagos, Agentes).
- **Health Check**: Semáforo de estado en tiempo real para cada puerto (30200-30205).

### 2. API Intelligence (Auto-Discovery)
- **Mapa de APIs**: Visualización gráfica de cómo se conectan los servicios.
- **Swagger Unificado**: Explorador de endpoints centralizado.
- **Enrutamiento Inteligente**: Sugerencias de conexión ("Este endpoint de precios debería conectarse con el Agente Strategist").

### 3. Control de Scraping
- **Dashboard de Competencia**: Ver últimas ejecuciones de scrapers (Chopo, Salud Digna, etc.).
- **Configuración**:
    - Frecuencia de escaneo (ej. "Cada 6 horas").
    - Objetivos (URLs a monitorear).
    - Botón de "Scrape Now" (Ejecución manual de emergencia).

### 4. Estrategia de Precios (Strategist Agent)
- **Panel de Configuración**:
    - **Slider de Agresividad**: "Conservador" (Igualar precios) vs "Agresivo" (Bajar 5%).
    - **Reglas de Negocio**: "Nunca bajar del costo + 20%".
- **Simulación**: "Qué pasaría si bajamos precios un 2%?".

### 5. Métricas Globales
- **Ventas en Tiempo Real**: Total vendido hoy (integración Caja).
- **Alertas del Sistema**: Errores críticos, caídas de servicio, alertas de precios de competencia.

## 🔌 Detalles Técnicos
- **Puerto**: 30205
- **Stack**: Next.js (Dashboard) + Express/Node (API Backend)
- **Base de Datos**: Acceso de lectura a todas las tablas de configuración.
