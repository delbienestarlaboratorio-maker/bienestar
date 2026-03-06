import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRAGMENTS_DIR = path.join(__dirname, 'src', 'data', 'biomarkers-fragments');

const PROMPT_TEMPLATE = (name, panel) => `Eres un experto patólogo clínico de "Laboratorio del Bienestar".
Tu objetivo es analizar el biomarcador: "${name}" (Panel: ${panel}).

DEBES responder ESTRICTAMENTE con este formato de objeto JSON (con 3 propiedades de tipo string), y nada más:

{
  "intro": "El ${name} es una prueba que mide... (2 párrafos explicativos con formato markdown básico).",
  "highMeaning": "- Causa 1\\n- Causa 2\\n(Explicación si sale alto en markdown)",
  "lowMeaning": "- Causa 1\\n- Causa 2\\n(Explicación si sale bajo en markdown)"
}

REGLAS ESTRICTAS:
- NO digas "Claro, aquí tienes".
- TODAS las propiedades DEBEN ser strings válidos dentro de las comillas dobles.
- Si usas comillas dobles internamente, debes escaparlas.
- Solo devuelve JSON válido.
`;

function extractJSON(text) {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
        return text.substring(start, end + 1);
    }
    return text;
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateContentWithOllama(name, panel) {
    console.log(`\n🧠 Consultando a Ollama 3.2 para: ${name}...`);
    try {
        const response = await fetch('http://127.0.0.1:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama3.2', // Standard local model used in this infrastructure
                prompt: PROMPT_TEMPLATE(name, panel),
                stream: false,
                format: 'json',
                options: {
                    temperature: 0.2, // Low temperature for clinical accuracy
                    num_ctx: 4096
                }
            }),
            signal: AbortSignal.timeout(60000) // 60s timeout
        });

        if (!response.ok) {
            console.error(`HTTP Error: ${response.status}`);
            return null;
        }

        const data = await response.json();
        const rawText = data.response.trim();
        const jsonText = extractJSON(rawText);

        try {
            return JSON.parse(jsonText);
        } catch (e) {
            console.error("❌ Falló el parseo JSON de Ollama:", jsonText.substring(0, 100));
            return null;
        }

    } catch (e) {
        console.error("❌ Error conectando a Ollama:", e.message);
        return null;
    }
}

async function run() {
    console.log("🚀 Iniciando Motor de IA 'Laboratorio del Bienestar' - Biomarcadores");

    if (!fs.existsSync(FRAGMENTS_DIR)) {
        console.error("Directorio de fragmentos no encontrado:", FRAGMENTS_DIR);
        return;
    }

    const files = fs.readdirSync(FRAGMENTS_DIR).filter(f => f.endsWith('.json'));
    console.log(`Encontrados ${files.length} biomarcadores en total.`);

    let successCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = path.join(FRAGMENTS_DIR, file);

        let bm;
        try {
            bm = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (e) { continue; }

        // Skip if already has content > 50 chars in intro to avoid overwriting manually polished content
        if (bm.intro && bm.intro.length > 50 && bm.highMeaning && bm.highMeaning.length > 50) {
            skippedCount++;
            continue;
        }

        console.log(`\n[${i + 1}/${files.length}] Procesando: ${bm.name}`);

        const aiData = await generateContentWithOllama(bm.name, bm.panel);

        if (aiData && aiData.intro && aiData.highMeaning) {
            bm.intro = aiData.intro;
            bm.highMeaning = aiData.highMeaning;
            bm.lowMeaning = aiData.lowMeaning || 'Sin relevancia patológica reportada por hiperdisminución en rangos estandarizados.';

            fs.writeFileSync(filePath, JSON.stringify(bm, null, 4), 'utf8');
            console.log(`✅ ¡Guardado con éxito!`);
            successCount++;

            // Pausa obligatoria para no derretir la GPU local
            await delay(1500);
        } else {
            console.log(`⚠️ Salto preventivo por error en generación.`);
            await delay(3000); // Penalty delay on failure
        }
    }

    console.log(`\n🎉 PROCESO MASIVO COMPLETADO`);
    console.log(`- Generados exitosamente: ${successCount}`);
    console.log(`- Saltados (ya existían): ${skippedCount}`);
    console.log(`- Total de la base de datos: ${files.length}\n`);
}

run();
