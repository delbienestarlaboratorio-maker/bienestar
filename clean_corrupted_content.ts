import { db } from './src/db';
import { studies } from './src/db/schema';
import { or, like, isNotNull, eq } from 'drizzle-orm';

async function cleanCorruptedContent() {
    console.log('🔍 Buscando estudios con contenido corrupto...\n');

    // Find studies with prompt instructions in the content
    const corrupted = await db
        .select()
        .from(studies)
        .where(or(
            like(studies.description, '%SECCIÓN%'),
            like(studies.description, '%BLOQUE%'),
            like(studies.whatIsIt, '%SECCIÓN%'),
            like(studies.whatIsIt, '%BLOQUE%'),
            like(studies.whatIsIt, '%═══%'),
            like(studies.preparation, '%SECCIÓN%')
        ));

    console.log(`❌ Encontrados ${corrupted.length} estudios con contenido corrupto\n`);

    if (corrupted.length === 0) {
        console.log('✅ No hay estudios corruptos para limpiar');
        process.exit(0);
    }

    console.log('Ejemplos de estudios corruptos:');
    corrupted.slice(0, 5).forEach(s => {
        console.log(`  - ${s.name} (${s.slug})`);
    });

    console.log('\n🧹 Limpiando contenido corrupto...\n');

    // Reset corrupted studies
    for (const study of corrupted) {
        await db
            .update(studies)
            .set({
                description: null,
                whatIsIt: null,
                preparation: null,
                updatedAt: new Date()
            })
            .where(eq(studies.id, study.id));
    }

    console.log(`✅ ${corrupted.length} estudios limpiados y listos para regenerar\n`);

    // Show final stats
    const allStudies = await db.select().from(studies);
    const needsContent = allStudies.filter(s =>
        !s.description || !s.whatIsIt || !s.preparation ||
        s.preparation === 'Consulte indicaciones.'
    );

    console.log('📊 ESTADÍSTICAS FINALES:');
    console.log(`Total de estudios: ${allStudies.length}`);
    console.log(`Necesitan contenido: ${needsContent.length}`);
    console.log(`Con contenido válido: ${allStudies.length - needsContent.length}`);

    process.exit(0);
}

cleanCorruptedContent();
