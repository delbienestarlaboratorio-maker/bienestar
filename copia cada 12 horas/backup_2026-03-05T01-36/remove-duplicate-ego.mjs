// Script para eliminar el estudio EGO duplicado con precio incorrecto
import pkg from 'pg';
const { Pool } = pkg;

// Base de datos PostgreSQL LOCAL
const LOCAL_POOL = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'SecurePass2026!',
    database: 'laboratorio_bienestar',
    port: 5432,
});

// Base de datos PostgreSQL PRODUCTION (Neon)
const PRODUCTION_POOL = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require',
});

async function removeDuplicateEGO(environment = 'local') {
    const db = environment === 'local' ? LOCAL_POOL : PRODUCTION_POOL;

    console.log(`\n🗑️  Eliminando EGO duplicado en ${environment.toUpperCase()}...\n`);

    try {
        // Verificar estudios antes de eliminar
        const before = await db.query(`
      SELECT id, name, slug, price_regular, is_active
      FROM studies
      WHERE name ILIKE '%examen general de orina%'
         OR slug LIKE '%ego%'
      ORDER BY name
    `);

        console.log('📋 ANTES DE ELIMINAR:\n');
        before.rows.forEach(s => {
            console.log(`   ${s.is_active ? '✅' : '❌'} ID ${s.id}: ${s.name} ($${s.price_regular})`);
        });

        // Desactivar el estudio duplicado (ID 1839)
        await db.query('BEGIN');

        const result = await db.query(`
      UPDATE studies
      SET is_active = false,
          updated_at = NOW()
      WHERE id = $1
      RETURNING id, name, slug, price_regular
    `, [1839]);

        await db.query('COMMIT');

        if (result.rows.length > 0) {
            console.log('\n✅ ESTUDIO DESACTIVADO:\n');
            const deleted = result.rows[0];
            console.log(`   ID: ${deleted.id}`);
            console.log(`   Nombre: ${deleted.name}`);
            console.log(`   Slug: ${deleted.slug}`);
            console.log(`   Precio: $${deleted.price_regular}`);
        }

        // Verificar después de eliminar
        const after = await db.query(`
      SELECT id, name, slug, price_regular, is_active
      FROM studies
      WHERE (name ILIKE '%examen general de orina%' OR slug LIKE '%ego%')
      ORDER BY name
    `);

        console.log('\n📋 DESPUÉS DE ELIMINAR:\n');
        after.rows.forEach(s => {
            console.log(`   ${s.is_active ? '✅' : '❌'} ID ${s.id}: ${s.name} ($${s.price_regular})`);
        });

        console.log(`\n✅ Duplicado eliminado en ${environment.toUpperCase()}`);

    } catch (error) {
        await db.query('ROLLBACK');
        console.error('❌ Error:', error.message);
    } finally {
        await db.end();
    }
}

// Ejecutar
const environment = process.argv[2] || 'local';
if (!['local', 'production'].includes(environment)) {
    console.error('❌ Uso: node remove-duplicate-ego.mjs [local|production]');
    process.exit(1);
}

removeDuplicateEGO(environment);
