import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'laboratorio_bienestar',
    port: 5432,
});

async function reclassifyAndPauseImagingStudies() {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

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

        for (const keyword of keywords) {
            const result = await client.query(
                `UPDATE studies 
         SET category = 'imagenologia', 
             status = 'paused'
         WHERE UPPER(name) LIKE $1 
         AND (category != 'imagenologia' OR status != 'paused')
         RETURNING id, name, category, status`,
                [`%${keyword}%`]
            );

            if (result.rows.length > 0) {
                console.log(`\n📋 Estudios actualizados con "${keyword}":`);
                result.rows.forEach(row => {
                    console.log(`   ✅ ${row.id}. ${row.name}`);
                    totalUpdated++;
                });
            }
        }

        await client.query('COMMIT');

        console.log(`\n\n✅ COMPLETADO!`);
        console.log(`📊 Total de estudios actualizados: ${totalUpdated}`);
        console.log(`📂 Categoría: imagenologia`);
        console.log(`⏸️  Status: paused`);

        // Mostrar resumen
        const summary = await client.query(`
      SELECT category, status, COUNT(*) as count
      FROM studies
      WHERE category = 'imagenologia' OR status = 'paused'
      GROUP BY category, status
      ORDER BY category, status
    `);

        console.log('\n📈 Resumen por categoría y status:');
        summary.rows.forEach(row => {
            console.log(`   ${row.category} - ${row.status}: ${row.count} estudios`);
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Error:', error.message);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

reclassifyAndPauseImagingStudies();
