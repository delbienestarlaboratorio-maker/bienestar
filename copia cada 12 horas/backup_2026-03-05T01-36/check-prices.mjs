import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from 'drizzle-orm';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'SecurePass2026!',
    database: 'laboratorio_bienestar',
    port: 5432,
});

const db = drizzle(pool);

async function checkPrices() {
    try {
        console.log('💰 Revisando precios de estudios activos...\n');

        // Obtener estadísticas de precios
        const stats = await db.execute(
            sql`SELECT 
        COUNT(*) as total_estudios,
        MIN(price_regular) as precio_minimo,
        MAX(price_regular) as precio_maximo,
        AVG(price_regular) as precio_promedio,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY price_regular) as precio_mediana
      FROM studies
      WHERE is_active = true`
        );

        console.log('📊 ESTADÍSTICAS GENERALES:');
        console.log(`   Total de estudios activos: ${stats.rows[0].total_estudios}`);
        console.log(`   Precio mínimo: $${parseFloat(stats.rows[0].precio_minimo).toFixed(2)} MXN`);
        console.log(`   Precio máximo: $${parseFloat(stats.rows[0].precio_maximo).toFixed(2)} MXN`);
        console.log(`   Precio promedio: $${parseFloat(stats.rows[0].precio_promedio).toFixed(2)} MXN`);
        console.log(`   Precio mediana: $${parseFloat(stats.rows[0].precio_mediana).toFixed(2)} MXN`);

        // Estudios más baratos
        console.log('\n💵 TOP 20 ESTUDIOS MÁS ECONÓMICOS:');
        const cheapest = await db.execute(
            sql`SELECT name, price_regular, price_promotional
      FROM studies
      WHERE is_active = true
      ORDER BY price_regular ASC
      LIMIT 20`
        );

        cheapest.rows.forEach((row, index) => {
            const promo = row.price_promotional ? ` (Promo: $${parseFloat(row.price_promotional).toFixed(2)})` : '';
            console.log(`   ${index + 1}. $${parseFloat(row.price_regular).toFixed(2)} - ${row.name}${promo}`);
        });

        // Estudios más caros
        console.log('\n💎 TOP 20 ESTUDIOS MÁS COSTOSOS:');
        const expensive = await db.execute(
            sql`SELECT name, price_regular, price_promotional
      FROM studies
      WHERE is_active = true
      ORDER BY price_regular DESC
      LIMIT 20`
        );

        expensive.rows.forEach((row, index) => {
            const promo = row.price_promotional ? ` (Promo: $${parseFloat(row.price_promotional).toFixed(2)})` : '';
            console.log(`   ${index + 1}. $${parseFloat(row.price_regular).toFixed(2)} - ${row.name}${promo}`);
        });

        // Distribución por rangos de precio
        console.log('\n📈 DISTRIBUCIÓN POR RANGOS DE PRECIO:');
        const distribution = await db.execute(
            sql`SELECT 
        CASE 
          WHEN price_regular < 100 THEN 'Menos de $100'
          WHEN price_regular < 300 THEN '$100 - $300'
          WHEN price_regular < 500 THEN '$300 - $500'
          WHEN price_regular < 1000 THEN '$500 - $1,000'
          WHEN price_regular < 2000 THEN '$1,000 - $2,000'
          WHEN price_regular < 5000 THEN '$2,000 - $5,000'
          WHEN price_regular < 10000 THEN '$5,000 - $10,000'
          ELSE 'Más de $10,000'
        END as rango,
        COUNT(*) as cantidad,
        ROUND(AVG(price_regular), 2) as promedio_rango
      FROM studies
      WHERE is_active = true
      GROUP BY rango
      ORDER BY MIN(price_regular)`
        );

        distribution.rows.forEach(row => {
            console.log(`   ${row.rango}: ${row.cantidad} estudios (promedio: $${row.promedio_rango})`);
        });

        // Estudios con precios sospechosos (muy bajos)
        console.log('\n⚠️  ESTUDIOS CON PRECIOS MUY BAJOS (<$50):');
        const suspicious = await db.execute(
            sql`SELECT id, name, price_regular, price_promotional
      FROM studies
      WHERE is_active = true AND price_regular < 50
      ORDER BY price_regular ASC`
        );

        if (suspicious.rows.length > 0) {
            suspicious.rows.forEach(row => {
                console.log(`   🚨 ID ${row.id}: $${parseFloat(row.price_regular).toFixed(2)} - ${row.name}`);
            });
        } else {
            console.log('   ✅ No hay estudios con precios menores a $50');
        }

        // Verificar el estudio específico mencionado por el usuario
        console.log('\n🔍 VERIFICANDO: Examen General de Orina (EGO)');
        const ego = await db.execute(
            sql`SELECT id, name, price_regular, price_promotional, slug
      FROM studies
      WHERE slug = 'examen-general-de-orina'`
        );

        if (ego.rows.length > 0) {
            const study = ego.rows[0];
            console.log(`   📋 Nombre: ${study.name}`);
            console.log(`   💰 Precio regular: $${parseFloat(study.price_regular).toFixed(2)} MXN`);
            if (study.price_promotional) {
                console.log(`   🎁 Precio promocional: $${parseFloat(study.price_promotional).toFixed(2)} MXN`);
            }
            console.log(`   🔗 Slug: ${study.slug}`);
            console.log(`   🆔 ID: ${study.id}`);
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await pool.end();
    }
}

checkPrices();
