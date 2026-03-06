import fs from 'fs';

const PROMPT_TEMPLATE = `Eres el Dr. Alejandro Méndez Castillo, Médico Cirujano egresado de la UNAM, con Especialidad en Patología Clínica. 
Genera contenido médico experto para el siguiente estudio clínico: "[NOMBRE_ESTUDIO]".

Debes responder ÚNICAMENTE con un objeto JSON válido que contenga EXACTAMENTE las siguientes propiedades (en español mexicano):
1. "description": Un párrafo corto y profesional (SEO-friendly) de 150-200 palabras explicando qué es el estudio, qué mide, e indicaciones clínicas reales.
2. "whatIsIt": Explicación de 100-150 palabras a nivel paciente sobre qué sustancia se mide, función y cómo se toma la muestra.
3. "preparation": Texto directo de máximo 3 líneas indicando ayuno u otras preparaciones. Si no se necesita preparación específica pon "Sin preparación especial requerida".
4. "whatDoesItDetect": Array de Strings. Mínimo 3 enfermedades o condiciones médicas que detecta.
5. "faqs": Array estricto de objetos, cada uno con { "question": "", "answer": "" }. Mínimo 3 preguntas.
6. "benefits": Array de Strings. 3 beneficios de realizarse el estudio (detección temprana, prevención, etc).
7. "detailedPreparation": Array de objetos, cada uno con { "title": "", "description": "" }. Mínimo 3 elementos (ej. Ayuno, Horario, Medicamentos).

NO GENERES TEXTO ADICIONAL ANTES NI DESPUÉS DEL JSON.`;

const OLLAMA_URL = 'http://localhost:11434/api/generate';
const MODEL = 'llama3.2:latest';

async function fetchOllama(study) {
    let prompt = PROMPT_TEMPLATE.replace('[NOMBRE_ESTUDIO]', study.name).replace('[NOMBRE_ESTUDIO]', study.name);

    // Simplest fetch to avoid timing out on DB
    const res = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: MODEL,
            prompt: prompt,
            format: 'json',
            stream: false
        })
    });
    if (!res.ok) throw new Error('Ollama Error: ' + res.status);
    const data = await res.json();
    return data.response;
}

// Read all studies
const allStudiesContent = fs.readFileSync('all-studies-list.txt', 'utf-8');
const allStudies = [];
allStudiesContent.split('\n').forEach(line => {
    const match = line.trim().match(/^(\d+)\s*\|\s*([^|]+)/);
    if (match) {
        allStudies.push({ id: match[1].trim(), name: match[2].trim() });
    }
});

// Read processed studies
const processedIds = new Set();
const files = fs.readdirSync('.').filter(f => f.startsWith('medical_content_batch_') && f.endsWith('.json'));
files.forEach(file => {
    try {
        const content = JSON.parse(fs.readFileSync(file, 'utf-8'));
        if (Array.isArray(content)) {
            content.forEach(s => { if (s.id) processedIds.add(String(s.id)); });
        }
    } catch (e) { console.error(`Error reading file ${file}: ${e.message}`); }
});

const pendingStudies = allStudies.filter(s => !processedIds.has(s.id));
console.log(`Total: ${allStudies.length} | Procesados: ${processedIds.size} | Pendientes: ${pendingStudies.length}`);

async function run() {
    let currentBatchNum = 10;
    while (fs.existsSync(`medical_content_batch_${currentBatchNum}.json`)) {
        currentBatchNum++;
    }

    // We will generate the target 210 studies to ensure completing the missing DB ones (approx 4 batches)
    const MAX_TO_GENERATE = Math.min(250, pendingStudies.length);
    console.log(`Iniciando generación de ${MAX_TO_GENERATE} estudios con el modelo ${MODEL}...`);

    let currentBatch = [];
    let processedThisRun = 0;

    for (const study of pendingStudies) {
        if (processedThisRun >= MAX_TO_GENERATE) break;

        console.log(`[Batch ${currentBatchNum}] Generando ${processedThisRun + 1}/${MAX_TO_GENERATE}: ${study.name}`);

        try {
            const resultJsonString = await fetchOllama(study);
            const data = JSON.parse(resultJsonString);

            // Re-apply IDs and Names just to be safe
            data.id = study.id;
            data.name = study.name;

            currentBatch.push(data);
            processedThisRun++;

            if (currentBatch.length >= 50) {
                fs.writeFileSync(`medical_content_batch_${currentBatchNum}.json`, JSON.stringify(currentBatch, null, 2));
                console.log(`✅ Guardado: medical_content_batch_${currentBatchNum}.json`);
                currentBatch = [];
                currentBatchNum++;
            }
        } catch (err) {
            console.error(`❌ Falló la generación para ${study.name}: ${err.message}`);
        }
    }

    if (currentBatch.length > 0) {
        fs.writeFileSync(`medical_content_batch_${currentBatchNum}.json`, JSON.stringify(currentBatch, null, 2));
        console.log(`✅ Guardado final: medical_content_batch_${currentBatchNum}.json`);
    }

    console.log('🎉 Terminado. Archivos JSON listos para aplicar.');
}

run().catch(console.error);
