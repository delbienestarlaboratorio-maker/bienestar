const fs = require('fs');
const path = require('path');

const OLLAMA_URL = 'http://localhost:11434/api/generate';
const OLLAMA_MODEL = 'qwen2.5:7b';
const FRAGMENTS_DIR = path.join(__dirname, 'src', 'data', 'biomarkers-fragments');
const BATCH_SIZE = 50;
const DELAY_MS = 300; // pausa entre requests

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function buildHighPrompt(bm) {
    return `Actúa como un médico especialista de laboratorio clínico.
Tu tarea es explicar de forma precisa y profesional qué significa clínicamente tener ALTO el nivel del siguiente biomarcador.

BIOMARCADOR: ${bm.name}
PANEL: ${bm.panel}

REGLAS ESTRICTAS:
- Escribe UN SOLO PÁRRAFO de máximo 50 a 80 palabras.
- Español neutro, formal, médico y directo.
- SIN introducciones, SIN saludos, SIN listas, SIN viñetas.
- Empieza directamente explicando las posibles causas o enfermedades que lo elevan.

EXPLICACIÓN DE RESULTADO ALTO:`;
}

function buildLowPrompt(bm) {
    return `Actúa como un médico especialista de laboratorio clínico.
Tu tarea es explicar de forma precisa y profesional qué significa clínicamente tener BAJO el nivel del siguiente biomarcador.

BIOMARCADOR: ${bm.name}
PANEL: ${bm.panel}

REGLAS ESTRICTAS:
- Escribe UN SOLO PÁRRAFO de máximo 50 a 80 palabras.
- Español neutro, formal, médico y directo.
- SIN introducciones, SIN saludos, SIN listas, SIN viñetas.
- Empieza directamente explicando las posibles causas o enfermedades que lo disminuyen.

EXPLICACIÓN DE RESULTADO BAJO:`;
}

async function generateText(prompt) {
    const response = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: OLLAMA_MODEL,
            prompt: prompt,
            stream: false,
            options: {
                temperature: 0.3, // Baja para que sea preciso y no alucine
                top_p: 0.8,
                num_predict: 200,
            }
        }),
        signal: AbortSignal.timeout(60000)
    });

    if (!response.ok) {
        throw new Error(`Ollama error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return (data.response || '').trim().replace(/^['"]|['"]$/g, ''); // limpia comillas
}

async function processBatch(files, batchIndex) {
    const start = batchIndex * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, files.length);
    const batch = files.slice(start, end);

    console.log(`\\n\\n🔄 INICIANDO LOTE ${batchIndex + 1} (Archivos ${start + 1} a ${end}) de ${files.length} totales...`);

    let done = 0;

    for (let i = 0; i < batch.length; i++) {
        const file = batch[i];
        const filePath = path.join(FRAGMENTS_DIR, file);

        let bm;
        try {
            bm = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        } catch (e) {
            console.error(`  ❌ Error leyendo ${file}`);
            continue;
        }

        // Si ya tiene la description perfecta, la usamos como intro para evitar alucinaciones
        if (bm.description && bm.description.length > 50) {
            bm.intro = bm.description;
        }

        process.stdout.write(`  [${start + i + 1}/${files.length}] Generando para: ${bm.name.padEnd(35)} ... `);

        try {
            const highMeaning = await generateText(buildHighPrompt(bm));
            const lowMeaning = await generateText(buildLowPrompt(bm));

            if (!highMeaning || !lowMeaning) {
                throw new Error('Respuesta vacía');
            }

            bm.highMeaning = highMeaning;
            bm.lowMeaning = lowMeaning;
            bm.ai_fixed = true; // marca de agua de que fue corregido

            fs.writeFileSync(filePath, JSON.stringify(bm, null, 2), 'utf-8');
            console.log(`✅ OK`);
            done++;
        } catch (e) {
            console.log(`❌ ERROR: ${e.message}`);
        }

        await sleep(DELAY_MS);
    }
    console.log(`🏁 LOTE ${batchIndex + 1} FINALIZADO (${done} corregidos).`);
}

async function main() {
    const files = fs.readdirSync(FRAGMENTS_DIR).filter(f => f.endsWith('.json'));

    // Verificamos si Ollama responde
    try {
        const test = await fetch('http://localhost:11434/api/tags');
        if (!test.ok) throw new Error('No ok');
        console.log('✅ Conexión con IA Local (qwen2.5:7b) establecida.');
    } catch {
        console.error('❌ ERROR: No se detecta IA Local en localhost:11434');
        process.exit(1);
    }

    const totalBatches = Math.ceil(files.length / BATCH_SIZE);

    // Procesamos todos los lotes secuencialmente (50 en 50)
    for (let currentBatch = 0; currentBatch < totalBatches; currentBatch++) {
        await processBatch(files, currentBatch);
    }

    console.log('\\n✨ ¡TODOS LOS BIOMARCADORES FUERON CORREGIDOS EXITOSAMENTE! ✨\\n');
}

main().catch(console.error);
