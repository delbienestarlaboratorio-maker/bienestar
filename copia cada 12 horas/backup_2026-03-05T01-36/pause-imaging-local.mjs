import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from 'drizzle-orm';
import pkg from 'pg';
const { Pool } = pkg;

// Base de datos LOCAL
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'SecurePass2026!',
    database: 'laboratorio_bienestar',
    port: 5432,
});

const db = drizzle(pool);

async function pauseImagingStudiesLocally() {
    try {
        console.log('💻 Conectando a base de datos LOCAL...\n');

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

        console.log('🔄 Pausando estudios de imagenología en BASE DE DATOS LOCAL...\n');

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
                    console.log(`   📋 ${keyword.name}: ${result.rows.length} estudios`);
                    result.rows.forEach(row => {
                        updatedStudies.push(row);
                        totalUpdated++;
                    });
                }
            }

            // Confirmar transacción
            await db.execute(sql`COMMIT`);

            console.log(`\n✅ TRANSACCIÓN COMPLETADA EXITOSAMENTE!`);
            console.log(`📊 Total de estudios pausados en LOCAL: ${totalUpdated}`);
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

            console.log('\n📈 Resumen de estudios de IMAGENOLOGÍA:');
            if (summary.rows) {
                summary.rows.forEach(row => {
                    console.log(`   ${row.estado}: ${row.count} estudios`);
                });
            }

            console.log('\n💻 ✅ BASE DE DATOS LOCAL ACTUALIZADA');
            console.log('⚠️  IMPORTANTE: Aún necesitas actualizar PRODUCCIÓN (Neon)');

            // Listar algunos ejemplos de estudios pausados
            if (updatedStudies.length > 0) {
                console.log('\n📝 Ejemplos de estudios pausados:');
                updatedStudies.slice(0, 10).forEach(study => {
                    console.log(`   - ${study.name}`);
                });
                if (updatedStudies.length > 10) {
                    console.log(`   ... y ${updatedStudies.length - 10} más`);
                }
            }

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

pauseImagingStudiesLocally();
