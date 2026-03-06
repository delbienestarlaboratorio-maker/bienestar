# 🧠 Wikipediatilde Médico (Ollama Autónomo)

Bienvenido al motor **Wikipediatilde Médico**, tu sistema personal de generación masiva inteligente para el **Laboratorio Clínico Del Bienestar**.

## 💡 ¿Qué es?
Es una infraestructura enciclopédica viva y 100% autónoma capaz de generar miles de artículos médicos (landing pages estructuradas para SEO) de **más de 1,000 palabras** cada una, directamente desde tu propia computadora.

No depende de OpenAI, ni de Gemini, ni de internet (fuera de la web). Utiliza un **cerebro local de Inteligencia Artificial (Tilde IA / Ollama)** para su pensamiento clínico, redacción empática e histórica, y creación de JSON enriquecidos, y a **Next.js 15+** para servir estas páginas al mundo.

## ✨ Superpoderes y Arquitectura

1. **Cerebro 100% Local y Privado (`qwen2.5:7b`):** 
   Corriendo enteramente en tu máquina (`http://localhost:11434`), el sistema tiene todo el conocimiento médico de la humanidad integrado, sin pagar ni un centavo en APIs.
2. **Generación Infinita (Autopoiesis de 20 Especialidades):** 
   El script recorre de manera autónoma 20 especialidades médicas (Cardiología, Neurología, Dermatología, etc.). Se pregunta a sí mismo por "50 enfermedades comunes" en cada especialidad, y luego inicia la redacción.
3. **Mega-SEO Estructural:** 
   Escribe ensayos de 1,000 palabras que incluyen historias clínicas de la antigüedad, estadísticas mundiales, datos curiosos impresionantes, y una profunda pero entendible **fisiopatología celular**. 
   Divide textualmente los párrafos usando etiquetas `<br><br>` y entrega un JSON validado.
4. **Sistema de Resiliencia / Anti-Apagones (Recover State):** 
   Guarda de forma continua su estado global (`symptoms-ollama-batch.json`) y sus fragmentos individuales (`symptoms-fragments/[enfermedad].json`). Si apagas la PC, o si detienes el script, al volverlo a correr continuará exactamente desde donde se quedó, saltándose las páginas que ya indexó inteligentemente.

---

## 🚀 Cómo ponerlo a trabajar

Para iniciar la fábrica enciclopédica y dejar que tu computadora fabrique Landing Pages solas (por ejemplo, toda la noche):

1. **Asegúrate que Ollama esté corriendo** con el modelo `qwen2.5:7b` instalado y listo.
2. Abre una terminal (PowerShell o Git Bash) en esta carpeta `/laboratorio-bienestar/`.
3. Ejecuta el archivo maestro:
   ```bash
   node generate-massive-ollama.mjs
   ```
4. El sistema comenzará a imprimir sus fases (Ej: *INICIANDO FASE: Medicina General y Urgencias*), buscará 50 enfermedades, validará cuáles le faltan, y empezará a "pensar" y redactar los mega-artículos de 1 en 1.

## 📁 Archivos Relacionados Activos

- `generate-massive-ollama.mjs`: Tu fábrica local de AI (Scripts de Auto Generación y Recuperación).
- `src/data/symptoms-ollama-batch.json`: La base de datos maestra que la IA está llenando.
- `src/data/symptoms-fragments/`: Directorio donde cada enfermedad guardada genera su propio archivo `.json` de peso ligero para que Next.js pueda procesar miles sin sobrecargar la memoria RAM durante el build (Multipath approach).
- `src/app/sintomas/[slug]/page.tsx`: La mega plantilla que toma estos JSONs (ahora habilitada para tolerar las asincronizaciones Promesas de Rutas dinámicas de Next.js 15+) y dibuja iconografía, colores, banderas rojas y botones de compra.

¡Felicidades, construiste tu propio portal médico enciclopédico de nivel mundial!
