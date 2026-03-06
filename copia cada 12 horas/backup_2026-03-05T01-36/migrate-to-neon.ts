import { Pool } from 'pg';

async function migrateStudies() {
    const localPool = new Pool({
        host: 'localhost',
        port: 5432,
        database: 'laboratorio_bienestar',
        user: 'postgres',
        password: 'SecurePass2026!'
    });

    const neonPool = new Pool({
        connectionString: 'postgresql://neondb_owner:npg_aCMctbgU40WE@ep-broad-glade-aiil8nr9-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require'
    });

    try {
        console.log('📚 Migrating studies (only essential fields)...');
        const studies = await localPool.query(`
            SELECT id, slug, name, category_id,
                   description, preparation, turnaround_time,
                   price_regular, price_promotional,
                   is_active
            FROM studies ORDER BY id
        `);

        console.log(`Found ${studies.rows.length} studies in localhost`);
        let migrated = 0;
        let errors = 0;

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
                errors++;
                if (errors <= 5) {
                    console.error(`   ✗ Study ${study.id} (${study.slug}): ${e.message}`);
                }
            }
        }

        console.log(`\n✅ Migrated ${migrated} studies`);
        if (errors > 0) {
            console.log(`⚠️  ${errors} studies had errors`);
        }
        console.log('\n🎉 DONE!');

    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        await localPool.end();
        await neonPool.end();
    }
}

migrateStudies();
