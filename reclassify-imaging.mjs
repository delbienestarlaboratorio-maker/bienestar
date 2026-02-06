import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from 'drizzle-orm';
import pkg from 'pg';
const { Pool } = pkg;

// Usar la misma configuración que usa la aplicación
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres@localhost:5432/laboratorio_bienestar';

const pool = new Pool({
    connectionString,
    ssl: false
});

const db = drizzle(pool);

async function reclassifyAndPauseImagingStudies() {
    try {
        console.log('🔄 Conectando a base de datos local...\n');

        // Palabras clave para identificar estudios de imagenología
        const keywords = [
            'RX ',
            'RAYOS',
            'RADIOLOG',
            'TAC ',
            'TOMOGRAF',
            'ULTRASON',
            'MASTOGRAF',
            'DENSITOMETR',
            'RESONANCIA',
            'ANGIOTOMOGRAF',
            'DOPPLER',
            'ELECTROCARDIOGRAMA',
            'PRUEBA DE ALIENTO'
        ];

        console.log('🔄 Reclasificando y pausando estudios de imagenología...\n');

        let totalUpdated = 0;
        const updatedStudies = [];

        for (const keyword of keywords) {
            const result = await db.execute(
                sql`UPDATE studies 
         SET category = 'imagenologia', 
             status = 'paused'
         WHERE UPPER(name) LIKE ${`%${keyword}%`}
         AND (category != 'imagenologia' OR status != 'paused')
         RETURNING id, name, category, status`
            );

            if (result.rows && result.rows.length > 0) {
                console.log(`\n📋 Estudios actualizados con "${keyword}":`);
                result.rows.forEach(row => {
                    console.log(`   ✅ ${row.id}. ${row.name}`);
                    updatedStudies.push(row);
                    totalUpdated++;
                });
            }
        }

        console.log(`\n\n✅ COMPLETADO!`);
        console.log(`📊 Total de estudios actualizados: ${totalUpdated}`);
        console.log(`📂 Nueva categoría: imagenologia`);
        console.log(`⏸️  Nuevo status: paused`);

        // Mostrar resumen
        const summary = await db.execute(
            sql`SELECT category, status, COUNT(*) as count
      FROM studies
      WHERE category = 'imagenologia' OR status = 'paused'
      GROUP BY category, status
      ORDER BY category, status`
        );

        console.log('\n📈 Resumen por categoría y status:');
        if (summary.rows) {
            summary.rows.forEach(row => {
                console.log(`   ${row.category} - ${row.status}: ${row.count} estudios`);
            });
        }

        console.log('\n✅ Cambios aplicados a la base de datos LOCAL');
        console.log('⚠️  IMPORTANTE: Necesitas actualizar también la base de datos de PRODUCCIÓN (Neon)');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
        throw error;
    } finally {
        await pool.end();
    }
}

reclassifyAndPauseImagingStudies();
