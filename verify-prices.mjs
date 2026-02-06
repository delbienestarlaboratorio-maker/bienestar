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

        // Obtener estadísticas básicas
        const stats = await db.execute(
            sql`SELECT 
        COUNT(*) as total_estudios,
        MIN(price_regular) as precio_minimo,
        MAX(price_regular) as precio_maximo,
        AVG(price_regular)::numeric(10,2) as precio_promedio
      FROM studies
      WHERE is_active = true`
        );

        console.log('📊 ESTADÍSTICAS GENERALES:');
        console.log(`   Total de estudios activos: ${stats.rows[0].total_estudios}`);
        console.log(`   Precio mínimo: $${parseFloat(stats.rows[0].precio_minimo).toFixed(2)} MXN`);
        console.log(`   Precio máximo: $${parseFloat(stats.rows[0].precio_maximo).toFixed(2)} MXN`);
        console.log(`   Precio promedio: $${parseFloat(stats.rows[0].precio_promedio).toFixed(2)} MXN`);

        // Estudios más baratos (TOP 30)
        console.log('\n💵 TOP 30 ESTUDIOS MÁS ECONÓMICOS:');
        const cheapest = await db.execute(
            sql`SELECT name, price_regular, price_promotional
      FROM studies
      WHERE is_active = true
      ORDER BY price_regular ASC
      LIMIT 30`
        );

        cheapest.rows.forEach((row, index) => {
            const promo = row.price_promotional ? ` → Promo: $${parseFloat(row.price_promotional).toFixed(2)}` : '';
            console.log(`   ${(index + 1).toString().padStart(2, '0')}. $${parseFloat(row.price_regular).toFixed(2).padEnd(10)} ${row.name}${promo}`);
        });

        // Estudios con precios sospechosos (muy bajos)
        console.log('\n⚠️  ESTUDIOS CON PRECIOS POTENCIALMENTE INCORRECTOS (<$80):');
        const suspicious = await db.execute(
            sql`SELECT id, name, price_regular, price_promotional
      FROM studies
      WHERE is_active = true AND price_regular < 80
      ORDER BY price_regular ASC`
        );

        if (suspicious.rows.length > 0) {
            suspicious.rows.forEach(row => {
                const promo = row.price_promotional ? ` → Promo: $${parseFloat(row.price_promotional).toFixed(2)}` : '';
                console.log(`   🚨 ID ${row.id}: $${parseFloat(row.price_regular).toFixed(2)} - ${row.name}${promo}`);
            });
        } else {
            console.log('   ✅ No hay estudios con precios menores a $80');
        }

        // Verificar el estudio específico mencionado
        console.log('\n🔍 VERIFICANDO ESTUDIO ESPECÍFICO:');
        const ego = await db.execute(
            sql`SELECT id, name, price_regular, price_promotional, slug
      FROM studies
      WHERE slug LIKE '%examen-general-de-orina%'
      LIMIT 5`
        );

        if (ego.rows.length > 0) {
            ego.rows.forEach(study => {
                console.log(`   📋 ${study.name}`);
                console.log(`      💰 Precio regular: $${parseFloat(study.price_regular).toFixed(2)} MXN`);
                if (study.price_promotional) {
                    console.log(`      🎁 Precio promocional: $${parseFloat(study.price_promotional).toFixed(2)} MXN`);
                    const descuento = ((1 - study.price_promotional / study.price_regular) * 100).toFixed(0);
                    console.log(`      📉 Descuento: ${descuento}%`);
                }
                console.log(`      🔗 URL: /estudios/analisis-clinicos/${study.slug}`);
                console.log('');
            });
        }

        // Contar estudios por rango de precio
        console.log('📈 DISTRIBUCIÓN POR RANGOS:');

        const ranges = [
            { min: 0, max: 100, label: 'Menos de $100' },
            { min: 100, max: 300, label: '$100 - $300' },
            { min: 300, max: 500, label: '$300 - $500' },
            { min: 500, max: 1000, label: '$500 - $1,000' },
            { min: 1000, max: 2000, label: '$1,000 - $2,000' },
            { min: 2000, max: 5000, label: '$2,000 - $5,000' },
            { min: 5000, max: 10000, label: '$5,000 - $10,000' },
            { min: 10000, max: 999999, label: 'Más de $10,000' }
        ];

        for (const range of ranges) {
            const result = await db.execute(
                sql`SELECT COUNT(*) as count
        FROM studies
        WHERE is_active = true 
        AND price_regular >= ${range.min} 
        AND price_regular < ${range.max}`
            );
            const count = result.rows[0].count;
            if (count > 0) {
                console.log(`   ${range.label}: ${count} estudios`);
            }
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
    } finally {
        await pool.end();
    }
}

checkPrices();
