const fs = require('fs');
const OLLAMA_URL = 'http://192.168.20.70:11434/api/generate';

function buildPrompt(bm) {
    return `Eres un redactor médico experto en análisis clínicos de laboratorio. Tu tarea es escribir UNA descripción clínica en español para el siguiente biomarcador.

BIOMARCADOR: ${bm.name}
PANEL CLÍNICO: ${bm.panel}
UNIDAD DE MEDIDA: ${bm.unit || 'variable'}

La descripción debe cubrir en UN SOLO PÁRRAFO FLUIDO (sin listas, sin puntos, sin markdown):
1. Qué es este biomarcador y dónde se origina o se mide en el cuerpo
2. Para qué sirve clínicamente: diagnóstico, monitoreo o cribado
3. En qué enfermedades, condiciones o situaciones clínicas es más relevante su medición
4. Por qué el médico puede solicitarlo

REGLAS ESTRICTAS:
- Exactamente entre 150 y 200 palabras
- Un solo párrafo fluido, sin listas ni guiones
- Sin saludos, sin títulos, sin despedidas
- Español neutro, claro y profesional
- Comienza directamente con el texto del párrafo

DESCRIPCIÓN:`;
}

async function testPrompt() {
    const bms = [
        { name: "Ácido Úrico", panel: "Química Sanguínea - Función Renal", unit: "mg/dL", slug: "acido-urico" },
        { name: "Hemoglobina", panel: "Biometría Hemática - Serie Roja", unit: "g/dL", slug: "hemoglobina" }
    ];

    for (const bm of bms) {
        console.log(`\n--- PROBANDO: ${bm.name} ---`);
        const response = await fetch(OLLAMA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'qwen2.5:14b',
                prompt: buildPrompt(bm),
                stream: false,
                options: { temperature: 0.4, num_predict: 350 }
            })
        });

        const data = await response.json();
        const nueva = (data.response || '').trim();

        const path = `./src/data/biomarkers-fragments/${bm.slug}.json`;
        const actual = JSON.parse(fs.readFileSync(path, 'utf8')).description;

        console.log("ACTUAL (En archivo):\\n" + actual);
        console.log("\\nNUEVA (Ollama test):\\n" + nueva);
        console.log("\\n¿Es la actual alucinada o similar?\\n");
    }
}

testPrompt().catch(console.error);
