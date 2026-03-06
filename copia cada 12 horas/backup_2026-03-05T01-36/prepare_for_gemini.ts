import { db } from './src/db';
import { studies } from './src/db/schema';
import { eq } from 'drizzle-orm';

// Este script será ejecutado por Gemini para generar contenido
// Gemini generará el contenido y lo guardará directamente

async function prepareForGeneration() {
    console.log('📊 Preparando estudios para generación con Gemini...\n');

    // Obtener todos los estudios que necesitan contenido
    const allStudies = await db.select().from(studies);

    const needsContent = allStudies.filter(s =>
        !s.description || !s.whatIsIt || !s.preparation ||
        s.preparation === 'Consulte indicaciones.'
    );

    console.log(`Total de estudios: ${allStudies.length}`);
    console.log(`Necesitan contenido: ${needsContent.length}\n`);

    // Exportar lista de estudios para que Gemini los procese
    const studyList = needsContent.slice(0, 50).map(s => ({
        id: s.id,
        name: s.name,
        category: s.categoryId,
        slug: s.slug
    }));

    console.log('📝 Primeros 50 estudios a procesar:\n');
    studyList.forEach((s, idx) => {
        console.log(`${idx + 1}. ${s.name} (${s.category})`);
    });

    console.log('\n✅ Lista preparada. Gemini puede procesar estos estudios.');

    // Guardar la lista en un archivo JSON para referencia
    const fs = await import('fs');
    fs.writeFileSync(
        'studies_to_generate.json',
        JSON.stringify(studyList, null, 2)
    );

    console.log('\n📄 Lista guardada en: studies_to_generate.json');

    process.exit(0);
}

prepareForGeneration();
