// Consultar precio del EGO en producción
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require',
});

async function checkEGOPrice() {
    try {
        const result = await pool.query(`
      SELECT 
        id,
        name,
        slug,
        price_regular,
        price_promotional,
        category_id
      FROM studies
      WHERE name ILIKE '%examen general de orina%'
         OR name ILIKE '%ego%'
         OR slug LIKE '%ego%'
      ORDER BY name
    `);

        console.log('\n🔍 PRECIOS DE EXAMEN GENERAL DE ORINA (EGO):\n');

        if (result.rows.length === 0) {
            console.log('❌ No se encontró el estudio EGO');
        } else {
            result.rows.forEach(study => {
                console.log(`📋 ${study.name}`);
                console.log(`   ID: ${study.id}`);
                console.log(`   Slug: ${study.slug}`);
                console.log(`   💰 Precio regular: $${study.price_regular} MXN`);
                console.log(`   🎁 Precio promocional: $${study.price_promotional} MXN`);
                console.log(`   📉 Descuento: ${((1 - study.price_promotional / study.price_regular) * 100).toFixed(1)}%`);
                console.log(`   🔗 URL: /estudios/${study.category_id}/${study.slug}`);
                console.log('');
            });

            console.log(`\n✅ Total encontrados: ${result.rows.length} estudios`);
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await pool.end();
    }
}

checkEGOPrice();
