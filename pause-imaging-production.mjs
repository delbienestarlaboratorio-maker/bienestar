import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from 'drizzle-orm';
import pkg from 'pg';
const { Pool } = pkg;

// IMPORTANTE: Este script actualiza la base de datos de PRODUCCIÓN (Neon)
const PRODUCTION_DB = 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
    connectionString: PRODUCTION_DB,
});

const db = drizzle(pool);

async function pauseImagingStudiesInProduction() {
    try {
        console.log('🌐 Conectando a base de datos de PRODUCCIÓN (Neon)...\n');

        // Palabras clave para identificar estudios de imagenología
        const keywords = [
            { name: 'RX (Rayos X)', pattern: '%RX %' },
            { name: 'RADIOLOGÍA', pattern: '%RADIOLOG%' },
            { name: 'TAC', pattern: '%TAC %' },
            { name: 'TOMOGRAFÍA', pattern: '%TOMOGRAF%' },
            { name: 'ULTRASONIDO', pattern: '%ULTRASON%' },
            { name: 'MASTOGRAFÍA', pattern: '%MASTOGRAF%' },
            { name: 'DENSITOMETRÍA', pattern: '%DENSITOMETR%' },
            { name: 'RESONANCIA', pattern: '%RESONANCIA%' },
            { name: 'ANGIOTOMOGRAFÍA', pattern: '%ANGIOTOMOGRAF%' },
            { name: 'DOPPLER', pattern: '%DOPPLER%' },
            { name: 'ELECTROCARDIOGRAMA', pattern: '%ELECTROCARDIOGRAMA%' },
            { name: 'PRUEBA DE ALIENTO', pattern: '%PRUEBA DE ALIENTO%' }
        ];

        console.log('🔄 Pausando estudios de imagenología en PRODUCCIÓN...\n');

        let totalUpdated = 0;
        const updatedStudies = [];

        // Usar transacción para seguridad
        await db.execute(sql`BEGIN`);

        try {
            for (const keyword of keywords) {
                const result = await db.execute(
                    sql`UPDATE studies 
           SET category_id = 'imagenologia', 
               is_active = false
           WHERE UPPER(name) LIKE ${keyword.pattern}
           AND (category_id != 'imagenologia' OR is_active != false)
           RETURNING id, name`
                );

                if (result.rows && result.rows.length > 0) {
                    console.log(`📋 ${keyword.name}: ${result.rows.length} estudios`);
                    result.rows.forEach(row => {
                        updatedStudies.push(row);
                        totalUpdated++;
                    });
                }
            }

            // Confirmar transacción
            await db.execute(sql`COMMIT`);

            console.log(`\n✅ TRANSACCIÓN COMPLETADA EXITOSAMENTE!`);
            console.log(`📊 Total de estudios pausados: ${totalUpdated}`);
            console.log(`📂 Nueva categoría: imagenologia`);
            console.log(`⏸️  Nuevo status: PAUSADO (is_active = false)`);

            // Mostrar resumen
            const summary = await db.execute(
                sql`SELECT 
          CASE WHEN is_active THEN 'ACTIVOS' ELSE 'PAUSADOS' END as estado,
          COUNT(*) as count
        FROM studies
        WHERE category_id = 'imagenologia'
        GROUP BY is_active
        ORDER BY is_active DESC`
            );

            console.log('\n📈 Resumen de estudios de IMAGENOLOGÍA en PRODUCCIÓN:');
            if (summary.rows) {
                summary.rows.forEach(row => {
                    console.log(`   ${row.estado}: ${row.count} estudios`);
                });
            }

            console.log('\n🌐 ✅ BASE DE DATOS DE PRODUCCIÓN (Neon) ACTUALIZADA');
            console.log('📱 Los cambios ya están VISIBLES en: https://laboratorio.delbienestar.com.mx');
            console.log('⏰ Propagación: INMEDIATA (próxima recarga de página)');

        } catch (error) {
            // Rollback si hay error
            await db.execute(sql`ROLLBACK`);
            throw error;
        }

    } catch (error) {
        console.error('\n❌ ERROR:', error.message);
        console.error('⚠️  Los cambios NO se aplicaron (rollback automático)');
        throw error;
    } finally {
        await pool.end();
    }
}

pauseImagingStudiesInProduction();
