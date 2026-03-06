import fs from 'fs';
import path from 'path';

const BATCH_SIZE = 50;
const OUTPUT_FILE = 'prompt_batch_38.txt';

// 1. Read all studies from the text file
const allStudiesContent = fs.readFileSync('all-studies-list.txt', 'utf-8');
const allStudies = [];

// Parse the text file (format: ID | Name | ...)
const lines = allStudiesContent.split('\n');
lines.forEach(line => {
    // Looking for lines starting with a number followed by |
    const match = line.trim().match(/^(\d+)\s*\|\s*([^|]+)/);
    if (match) {
        allStudies.push({
            id: match[1].trim(),
            name: match[2].trim()
        });
    }
});

console.log(`Total studies found in list: ${allStudies.length}`);

// 2. Read all processed studies from JSON files
const processedIds = new Set();
const files = fs.readdirSync('.').filter(f => f.startsWith('medical_content_batch_') && f.endsWith('.json'));

files.forEach(file => {
    try {
        const content = JSON.parse(fs.readFileSync(file, 'utf-8'));
        if (Array.isArray(content)) {
            content.forEach(s => {
                if (s.id) processedIds.add(String(s.id));
            });
        }
    } catch (e) {
        console.error(`Error reading ${file}: ${e.message}`);
    }
});

console.log(`Total batch files found: ${files.length}`);
console.log(`Total processed studies found (including Batch 37): ${processedIds.size}`);

// 3. Find pending studies
const pendingStudies = allStudies.filter(s => !processedIds.has(s.id));
console.log(`Pending studies: ${pendingStudies.length}`);

// 4. Select next batch
const batch = pendingStudies.slice(0, BATCH_SIZE);
console.log(`Selected ${batch.length} studies for Batch 38.`);

if (batch.length === 0) {
    console.log('No more studies to process!');
    process.exit(0);
}

// 5. Generate prompt
const studiesList = batch.map(s => `- ID: ${s.id}, Name: ${s.name}`).join('\n');

const promptContent = `
Actúa como un Patólogo Clínico experto y redactor médico de alto nivel.
Tu tarea es generar contenido médico detallado, preciso y útil para pacientes para los siguientes ${batch.length} estudios de laboratorio.

FORMATO DE SALIDA (JSON ARRAY):
[
    {
        "id": "ID_DEL_ESTUDIO",
        "name": "NOMBRE_DEL_ESTUDIO (solo para referencia, opcional en output)",
        "description": "Descripción amigable pero profesional...",
        "what_is_it": "Resumen corto de 1 línea.",
        "what_does_it_detect": ["Lista", "de", "3-5", "puntos"],
        "detailed_preparation": ["Ayuno de X horas", "Muestra de sangre", etc],
        "benefits": ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        "faqs": [
            {"question": "Pregunta frecuente 1", "answer": "Respuesta clara"}
        ]
    }
]

REGLAS CRÍTICAS:
1. El JSON debe ser válido.
2. "id" debe coincidir exactamente con el ID proporcionado.
3. El tono debe ser empático, claro y educativo.
4. "detailed_preparation" debe ser realista (ej. Perfil de lípidos = 12h ayuno).
5. NO inventes estudios. Solo procesa la lista dada.

LISTA DE ESTUDIOS:
${studiesList}
`;

fs.writeFileSync(OUTPUT_FILE, promptContent);
console.log(`\n✅ Generated '${OUTPUT_FILE}' with ${batch.length} studies.`);
