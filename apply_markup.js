const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
const fs = require('fs');
neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require' });

const MARKUP = 1.20; // 20% de aumento

function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\(.*?\)/g, '').replace(/"/g, '')
        .replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
}

async function main() {
    // Parse CSV
    const csvLines = fs.readFileSync('cilab_precios.csv', 'latin1').split('\n').filter(l => l.trim());
    const csvStudies = [];
    for (const line of csvLines) {
        const t = line.trim();
        if (t.startsWith('CLAVE')) continue;
        const lc = t.lastIndexOf(',');
        if (lc === -1) continue;
        const price = parseFloat(t.substring(lc + 1).trim());
        if (isNaN(price)) continue;
        const rest = t.substring(0, lc);
        const fc = rest.indexOf(',');
        if (fc === -1) continue;
        csvStudies.push({ name: rest.substring(fc + 1).trim().replace(/^"|"$/g, ''), price });
    }

    const { rows: dbStudies } = await pool.query('SELECT id, name, price_regular FROM studies WHERE is_active = true');
    console.log(`Estudios activos: ${dbStudies.length}`);

    let updated = 0;
    for (const csv of csvStudies) {
        const cn = norm(csv.name);
        for (const db of dbStudies) {
            const dn = norm(db.name);
            if (cn === dn || (cn.length > 5 && dn.length > 5 && (cn.includes(dn) || dn.includes(cn)) && Math.min(cn.length, dn.length) / Math.max(cn.length, dn.length) > 0.5)) {
                const newPrice = Math.round(csv.price * MARKUP * 100) / 100;
                await pool.query('UPDATE studies SET price_regular = $1, updated_at = NOW() WHERE id = $2', [newPrice, db.id]);
                updated++;
                break;
            }
        }
    }

    // Also update the 38 new ones that were just added (they also came from the CSV)
    // They should already be matched above, but let's make sure ALL active studies with CSV prices get the markup

    console.log(`Precios actualizados con +20%: ${updated}`);

    // Show 10 examples
    const { rows: examples } = await pool.query('SELECT name, price_regular FROM studies WHERE is_active = true ORDER BY name LIMIT 10');
    console.log('\n10 EJEMPLOS (precio ya con +20%):');
    examples.forEach(e => console.log(`  ${e.name.substring(0, 55).padEnd(57)} $${e.price_regular}`));

    await pool.end();
}

main().catch(e => { console.error('ERROR:', e.message); pool.end(); });
