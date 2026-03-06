# Sistema de IA Multi-Agente (Fase 3)

## 🧠 Configuración Ollama
- [ ] Verificar instalación de Ollama.
- [ ] Descargar modelos:
  - `ollama pull llama3.2` (Sentinel - Rápido)
  - `ollama pull qwen2.5:14b` (Strategist - Razonamiento)
  - `ollama pull deepseek-r1:14b` (Forecaster - Analítico)

## 🤖 Implementación de Agentes
- [ ] **Strategist Agent** (Pricing)
  - [ ] Definir Prompt de Sistema (Yield Management).
  - [ ] Crear función de cálculo de precio.
- [ ] **Sentinel Agent** (Monitor)
  - [ ] Integrar con resultados del scraper.
  - [ ] Lógica de detección de anomalías.
- [ ] **Closer Agent** (Ventas)
  - [ ] Prompt de negociación para WhatsApp.

## 🔌 Integración API
- [ ] Endpoint `/api/agents/strategist`
- [ ] Endpoint `/api/agents/chat` (WhatsApp webhook)
