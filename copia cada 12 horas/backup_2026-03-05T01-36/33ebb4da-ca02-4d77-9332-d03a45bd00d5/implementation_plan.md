C:\Users\Santi\.gemini\antigravity\brain\33ebb4da-ca02-4d77-9332-d03a45bd00d5\implementation_plan.md

#### [NEW] [olab_scraper.py](file:///W:/pagina/2026/scraper/scrapers/olab_scraper.py)
- **Objetivo**: Extraer descripciones detalladas y precios de membresía.
- **Estrategia**:
  - Navegación directa por catálogo.
  - Extracción de "Preparación" (muy detallada en Olab).
  - Captura de doble precio (Público vs Socio).

#### [NEW] [salud_digna_scraper.py](file:///W:/pagina/2026/scraper/scrapers/salud_digna_scraper.py)
- **Objetivo**: Obtener el "precio piso" del mercado.
- **Estrategia**:
  - Manejo de selectores de ubicación (default: CDMX).
  - Extracción de descuentos por pago online.
  - Catálogo masivo de estudios.

## Fase 3: Desarrollo del Core y SEO Técnico
- [ ] **Sistema de Datos Estructurados (Schema.org)**
  - Implementar `DiagnosticProcedure` para estudios individuales.
  - Implementar `MedicalWebPage` para páginas informativas.
  - Implementar `DiagnosticLab` y `LocalBusiness` para la organización.
- [ ] **Modelo de Base de Datos**
  - Diseño de esquema Prisma/PostgreSQL optimizado para lectura rápida.
  - Tablas para: Estudios, Categorías, Sucursales, Precios Históricos.
- [ ] **Arquitectura de Rendimiento**
  - Configuración de ISR (Incremental Static Regeneration) para páginas de estudios.
  - Optimización de imágenes con `next/image`.
  - API Routes cacheadas para tiempos de respuesta <100ms.
- [ ] **Sistema de Rutas Dinámicas SEO-Friendly**
  - Slugs limpios: `/estudios/[categoria]/[slug]`
