import { db } from './src/db';
import { studies } from './src/db/schema';
import { eq } from 'drizzle-orm';

async function listStudies() {
    console.log('📚 Obteniendo lista de estudios de la base de datos...\n');

    try {
        const allStudies = await db
            .select({
                id: studies.id,
                name: studies.name,
                categoryId: studies.categoryId
            })
            .from(studies)
            .where(eq(studies.isActive, true))
            .limit(100);

        console.log(`Total estudios encontrados: ${allStudies.length}\n`);

        // Agrupar por categoría para mejor visualización
        const byCategory: Record<string, any[]> = {};

        for (const study of allStudies) {
            if (!byCategory[study.categoryId]) {
                byCategory[study.categoryId] = [];
            }
            byCategory[study.categoryId].push(study.name);
        }

        // Mostrar por categoría
        for (const [category, studyNames] of Object.entries(byCategory)) {
            console.log(`\n=== ${category} ===`);
            studyNames.sort().forEach(name => {
                console.log(`  - ${name}`);
            });
        }

        // Guardar a un archivo JSON para referencia
        const fs = require('fs');
        fs.writeFileSync(
            'existing-studies.json',
            JSON.stringify(allStudies, null, 2)
        );

        console.log(`\n✅ Lista guardada en: existing-studies.json`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        process.exit(0);
    }
}

listStudies();
