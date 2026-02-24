/**
 * Genera descripciones V2 con Ollama SOLO para los estudios que ya están en studies.json
 * (los ~459 que están en línea en el sitio web)
 */
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

async function fetchOllama(studyName) {
    const prompt = PROMPT_TEMPLATE.replace('[NOMBRE_ESTUDIO]', studyName);
    const res = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: MODEL, prompt, format: 'json', stream: false })
    });
    if (!res.ok) throw new Error('Ollama Error: ' + res.status);
    const data = await res.json();
    return data.response;
}

function needsV2(study) {
    // Needs V2 if description is missing, generic, or too short
    const desc = study.description || '';
    if (desc.length < 100) return true;
    if (desc.includes('Estudio de laboratorio:') && desc.length < 200) return true;
    // Check if missing key V2 fields
    if (!study.whatIsIt || study.whatIsIt.length < 50) return true;
    if (!study.whatDoesItDetect || !Array.isArray(study.whatDoesItDetect) || study.whatDoesItDetect.length < 3) return true;
    return false;
}

// Load studies.json (the ones actually on the website)
const studiesPath = './src/data/studies.json';
const studies = JSON.parse(fs.readFileSync(studiesPath, 'utf-8'));
const activeStudies = studies.filter(s => s.slug && s.name);

// Filter to only those needing V2
const needsWork = activeStudies.filter(needsV2);

console.log(`📊 Estudios en línea: ${activeStudies.length}`);
console.log(`✅ Ya tienen buena descripción: ${activeStudies.length - needsWork.length}`);
console.log(`🔧 Necesitan descripción V2: ${needsWork.length}`);

if (needsWork.length === 0) {
    console.log('🎉 ¡Todos los estudios ya tienen descripción V2!');
    process.exit(0);
}

async function run() {
    const outputFile = `v2_online_studies_${Date.now()}.json`;
    const results = [];
    let count = 0;

    for (const study of needsWork) {
        count++;
        console.log(`[${count}/${needsWork.length}] Generando: ${study.name}`);

        try {
            const jsonStr = await fetchOllama(study.name);
            const data = JSON.parse(jsonStr);
            data.id = study.id;
            data.name = study.name;
            data.slug = study.slug;
            results.push(data);

            // Save every 25 studies
            if (results.length % 25 === 0) {
                fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
                console.log(`💾 Guardado parcial: ${results.length} estudios en ${outputFile}`);
            }
        } catch (err) {
            console.error(`❌ Error en ${study.name}: ${err.message}`);
        }
    }

    // Final save
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
    console.log(`\n🎉 ¡Terminado! ${results.length} descripciones generadas en ${outputFile}`);
    console.log(`Aplícalas con: node apply_v2_to_studies.js ${outputFile}`);
}

run().catch(console.error);
