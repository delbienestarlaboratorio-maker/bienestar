import { Pool } from 'pg';

async function setupNeon() {
    const neonPool = new Pool({
        connectionString: 'postgresql://neondb_owner:npg_aCMctbgU40WE@ep-broad-glade-aiil8nr9-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require'
    });

    try {
        // Insert categories
        console.log('📁 Creating categories in Neon...');
        await neonPool.query(`
            INSERT INTO categories (id, name, description) VALUES
            ('analisis-clinicos', 'Analisis Clinicos', 'Estudios de laboratorio clinico'),
            ('imagenologia', 'Imagenologia', 'Estudios de imagen'),
            ('estudios-especiales', 'Estudios Especiales', 'Estudios especializados')
            ON CONFLICT (id) DO NOTHING
        `);
        console.log('✅ Categories created');

        // Now migrate studies
        const localPool = new Pool({
            host: 'localhost',
            port: 5432,
            database: 'laboratorio_bienestar',
            user: 'postgres',
            password: 'SecurePass2026!'
        });

        console.log('📚 Migrating studies...');
        const studies = await localPool.query(`
            SELECT id, slug, name, category_id,
                   description, preparation, turnaround_time,
                   price_regular, price_promotional,
                   is_active
            FROM studies
            WHERE category_id IN ('analisis-clinicos', 'imagenologia', 'estudios-especiales')
            ORDER BY id
        `);

        console.log(`Found ${studies.rows.length} studies`);
        let migrated = 0;

        for (const study of studies.rows) {
            try {
                await neonPool.query(`
                    INSERT INTO studies (
                        id, slug, name, category_id,
                        description, preparation, turnaround_time,
                        price_regular, price_promotional,
                        is_active
                    ) VALUES (
                        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
                    )
                    ON CONFLICT (id) DO UPDATE SET
                        name = EXCLUDED.name,
                        description = EXCLUDED.description
                `, [
                    study.id, study.slug, study.name, study.category_id,
                    study.description, study.preparation, study.turnaround_time,
                    study.price_regular, study.price_promotional,
                    study.is_active ?? true
                ]);

                migrated++;
                if (migrated % 200 === 0) {
                    console.log(`   ✓ ${migrated}/${studies.rows.length}...`);
                }
            } catch (e: any) {
                // Silent fail
            }
        }

        console.log(`\n✅ Migrated ${migrated}/${studies.rows.length} studies!`);
        console.log('🎉 COMPLETE!');

        await localPool.end();
        await neonPool.end();

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

setupNeon();
