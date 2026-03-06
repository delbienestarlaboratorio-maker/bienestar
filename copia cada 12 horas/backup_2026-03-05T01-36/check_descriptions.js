const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
const { studies } = require('./src/db/schema');
const { eq, isNull, or, and, not } = require('drizzle-orm');

async function checkDescriptions() {
    const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:SecurePass2026!@localhost:5432/laboratorio_bienestar';

    const client = postgres(connectionString);
    const db = drizzle(client);

    try {
        // Total de estudios
        const allStudies = await db.select().from(studies);
        console.log(`\n📊 ESTADÍSTICAS DE DESCRIPCIONES:\n`);
        console.log(`Total de estudios: ${allStudies.length}`);

        // Estudios con descripción
        const withDescription = allStudies.filter(s => s.description && s.description.trim() !== '');
        console.log(`Con descripción: ${withDescription.length}`);

        // Estudios sin descripción
        const withoutDescription = allStudies.filter(s => !s.description || s.description.trim() === '');
        console.log(`Sin descripción: ${withoutDescription.length}`);

        // Mostrar algunos ejemplos con descripción
        if (withDescription.length > 0) {
            console.log(`\n✅ EJEMPLOS CON DESCRIPCIÓN (primeros 5):\n`);
            withDescription.slice(0, 5).forEach((study, idx) => {
                console.log(`${idx + 1}. ${study.name}`);
                console.log(`   Descripción: ${study.description.substring(0, 100)}...`);
                console.log(`   Actualizado: ${study.updatedAt}\n`);
            });
        }

        // Mostrar últimos actualizados
        const recentlyUpdated = allStudies
            .filter(s => s.description && s.description.trim() !== '')
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .slice(0, 10);

        if (recentlyUpdated.length > 0) {
            console.log(`\n🕒 ÚLTIMOS 10 ACTUALIZADOS:\n`);
            recentlyUpdated.forEach((study, idx) => {
                console.log(`${idx + 1}. ${study.name} - ${new Date(study.updatedAt).toLocaleString()}`);
            });
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await client.end();
    }
}

checkDescriptions();
