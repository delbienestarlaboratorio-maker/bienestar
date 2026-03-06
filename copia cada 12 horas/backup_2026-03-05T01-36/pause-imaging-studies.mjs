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

        console.log('🔄 Reclasificando y PAUSANDO estudios de imagenología...\n');

        let totalUpdated = 0;
        const updatedStudies = [];

        for (const keyword of keywords) {
            const result = await db.execute(
                sql`UPDATE studies 
         SET category_id = 'imagenologia', 
             is_active = false
         WHERE UPPER(name) LIKE ${`%${keyword}%`}
         AND (category_id != 'imagenologia' OR is_active != false)
         RETURNING id, name, category_id, is_active`
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
        console.log(`⏸️  Nuevo status: PAUSADO (is_active = false)`);

        // Mostrar resumen
        const summary = await db.execute(
            sql`SELECT category_id, is_active, COUNT(*) as count
      FROM studies
      WHERE category_id = 'imagenologia'
      GROUP BY category_id, is_active
      ORDER BY category_id, is_active`
        );

        console.log('\n📈 Resumen de estudios de IMAGENOLOGÍA:');
        if (summary.rows) {
            summary.rows.forEach(row => {
                const status = row.is_active ? 'ACTIVO' : 'PAUSADO';
                console.log(`   ${row.category_id} - ${status}: ${row.count} estudios`);
            });
        }

        console.log('\n⚠️  IMPORTANTE:');
        console.log('   ✅ Cambios aplicados a la base de datos LOCAL');
        console.log('   ⏳ PENDIENTE: Actualizar también la base de datos de PRODUCCIÓN (Neon)');
        console.log('   📝 Estos estudios YA NO aparecerán en el sitio web local');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
        throw error;
    } finally {
        await pool.end();
    }
}

reclassifyAndPauseImagingStudies();
