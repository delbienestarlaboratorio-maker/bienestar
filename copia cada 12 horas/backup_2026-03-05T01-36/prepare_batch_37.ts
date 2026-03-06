import { db } from './src/db';
import { studies } from './src/db/schema';
import { isNull, or, and, not, eq } from 'drizzle-orm';
import fs from 'fs';

// Configuration
const BATCH_SIZE = 50;
const OUTPUT_FILE = 'medical_content_batch_37.json';

async function generateBatch37() {
    console.log('🚀 Iniciando generación del Batch 37...');

    // 1. Get studies without description OR without preparation
    // We prioritize studies that have absolutely no content
    const pendingStudies = await db
        .select()
        .from(studies)
        .where(
            or(
                isNull(studies.description),
                eq(studies.description, ''),
                isNull(studies.preparation),
                eq(studies.preparation, 'Consulte indicaciones.')
            )
        )
        .limit(BATCH_SIZE);

    console.log(`📋 Se encontraron ${pendingStudies.length} estudios pendientes.`);

    if (pendingStudies.length === 0) {
        console.log('✅ No hay estudios pendientes por procesar.');
        process.exit(0);
    }

    // 2. Prepare the prompt for the LLM
    const studiesList = pendingStudies.map(s => `- ID: ${s.id}, Name: ${s.name}`).join('\n');

    console.log('📝 Lista de estudios a procesar:');
    console.log(studiesList);

    // Create a template file for the prompt
    const promptContent = `
Actúa como un Patólogo Clínico experto y redactor médico de alto nivel.
Tu tarea es generar contenido médico detallado, preciso y útil para pacientes para los siguientes ${pendingStudies.length} estudios de laboratorio.

FORMATO DE SALIDA (JSON ARRAY):
[
    {
        "id": "ID_DEL_ESTUDIO",
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

    fs.writeFileSync('prompt_batch_37.txt', promptContent);
    console.log(`\n✅ Archivo 'prompt_batch_37.txt' generado. Úsalo con tu modelo de IA para generar '${OUTPUT_FILE}'.`);

    process.exit(0);
}

generateBatch37();
