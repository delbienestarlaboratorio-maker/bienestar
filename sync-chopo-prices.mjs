/**
 * Script para sincronizar precios con datos del scraping de Chopo
 * 
 * Estrategia:
 * - Precio de Chopo online (price_promo) → nuestro price_regular (el "precio de lista")
 * - Nuestro precio → 5% menos que el precio en línea de Chopo (price_promotional)
 * - Así SIEMPRE somos más baratos que Chopo
 * 
 * Ejecutar: node sync-chopo-prices.mjs
 */

import { readFileSync } from 'fs';

const DATABASE_URL = process.argv[2] || process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.error('❌ Usage: node sync-chopo-prices.mjs <DATABASE_URL>');
    console.error('   Example: node sync-chopo-prices.mjs "postgresql://user:pass@host/db?sslmode=require"');
    process.exit(1);
}


// Load Chopo data
const chopoRaw = readFileSync('./scraper/data/raw/chopo_detailed_final_20260121_213908.json', 'utf-8');
const chopoStudies = JSON.parse(chopoRaw);

console.log(`📦 Loaded ${chopoStudies.length} Chopo studies`);

// Normalize name for matching
function normalize(name) {
    return name
        .toUpperCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^A-Z0-9\s]/g, '') // Remove special chars
        .replace(/\s+/g, ' ')
        .trim();
}

async function main() {
    // Dynamic import for neon
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(DATABASE_URL);

    // Get all active studies from DB
    const dbStudies = await sql`SELECT id, name, slug, price_regular, price_promotional FROM studies WHERE is_active = true`;
    console.log(`📊 DB has ${dbStudies.length} active studies`);

    // Create normalized lookup from DB
    const dbByName = {};
    for (const study of dbStudies) {
        const key = normalize(study.name);
        if (!dbByName[key]) dbByName[key] = [];
        dbByName[key].push(study);
    }

    let matched = 0;
    let notMatched = 0;
    let updated = 0;
    let errors = 0;
    const unmatchedChopo = [];
    const priceChanges = [];

    for (const chopo of chopoStudies) {
        const chopoName = normalize(chopo.name);
        const dbMatches = dbByName[chopoName];

        if (!dbMatches || dbMatches.length === 0) {
            notMatched++;
            unmatchedChopo.push(chopo.name);
            continue;
        }

        matched++;

        for (const dbStudy of dbMatches) {
            // Chopo's online price (price_promo) becomes our "reference" price (price_regular)
            // Our promotional price is 5% less than Chopo's online price
            const chopoOnlinePrice = chopo.price_promo || chopo.price_regular;
            const chopoRegularPrice = chopo.price_regular;

            // Our price = Chopo online price * 0.95 (5% cheaper), rounded to nearest integer
            const ourPrice = Math.round(chopoOnlinePrice * 0.95);

            // We show Chopo's online price as our "regular" and our discounted as promotional
            const newPriceRegular = Math.round(chopoOnlinePrice);
            const newPricePromotional = ourPrice;

            // Only update if price actually changed
            if (Math.abs(dbStudy.price_regular - newPriceRegular) > 0.5 ||
                !dbStudy.price_promotional ||
                Math.abs((dbStudy.price_promotional || 0) - newPricePromotional) > 0.5) {

                priceChanges.push({
                    name: dbStudy.name,
                    id: dbStudy.id,
                    oldRegular: dbStudy.price_regular,
                    oldPromo: dbStudy.price_promotional,
                    newRegular: newPriceRegular,
                    newPromo: newPricePromotional,
                    chopoRegular: chopoRegularPrice,
                    chopoOnline: chopoOnlinePrice,
                });

                try {
                    await sql`
                        UPDATE studies 
                        SET price_regular = ${newPriceRegular}, 
                            price_promotional = ${newPricePromotional}
                        WHERE id = ${dbStudy.id}
                    `;
                    updated++;
                } catch (err) {
                    console.error(`❌ Error updating ${dbStudy.name}:`, err.message);
                    errors++;
                }
            }
        }
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMEN DE SINCRONIZACIÓN DE PRECIOS');
    console.log('='.repeat(60));
    console.log(`✅ Estudios matcheados: ${matched} / ${chopoStudies.length}`);
    console.log(`❌ Sin match: ${notMatched}`);
    console.log(`📝 Precios actualizados: ${updated}`);
    if (errors > 0) console.log(`⚠️  Errores: ${errors}`);

    // Show first 10 price changes
    if (priceChanges.length > 0) {
        console.log('\n📋 Primeros 10 cambios de precio:');
        console.log('-'.repeat(100));
        console.log('Estudio'.padEnd(45), 'Antes'.padEnd(12), 'Ahora'.padEnd(12), 'Chopo Online'.padEnd(15), 'Ahorro');
        console.log('-'.repeat(100));
        priceChanges.slice(0, 10).forEach(c => {
            const saving = c.chopoOnline - c.newPromo;
            console.log(
                c.name.substring(0, 44).padEnd(45),
                `$${c.oldRegular}`.padEnd(12),
                `$${c.newPromo}`.padEnd(12),
                `$${c.chopoOnline}`.padEnd(15),
                `$${saving} (${((saving / c.chopoOnline) * 100).toFixed(0)}%)`
            );
        });
    }

    // Show first 20 unmatched
    if (unmatchedChopo.length > 0) {
        console.log(`\n⚠️  Primeros 20 estudios de Chopo sin match en DB:`);
        unmatchedChopo.slice(0, 20).forEach(name => console.log(`  - ${name}`));
        if (unmatchedChopo.length > 20) {
            console.log(`  ... y ${unmatchedChopo.length - 20} más`);
        }
    }

    console.log('\n✅ Sincronización completada');
}

main().catch(err => {
    console.error('💥 Fatal error:', err);
    process.exit(1);
});
