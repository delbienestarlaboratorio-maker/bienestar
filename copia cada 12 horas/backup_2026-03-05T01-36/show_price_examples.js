const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
const fs = require('fs');
neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require' });

function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\(.*?\)/g, '').replace(/"/g, '')
        .replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
}

async function main() {
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

    // Show 10 matched examples
    let count = 0;
    const examples = [];
    for (const csv of csvStudies) {
        if (count >= 10) break;
        const cn = norm(csv.name);
        for (const db of dbStudies) {
            const dn = norm(db.name);
            if (cn === dn || (cn.length > 5 && dn.length > 5 && (cn.includes(dn) || dn.includes(cn)) && Math.min(cn.length, dn.length) / Math.max(cn.length, dn.length) > 0.5)) {
                // price_regular NOW equals csvPrice because we already updated it
                // Let's show what it IS now (from CSV)
                examples.push({ csvName: csv.name, csvPrice: csv.price, dbName: db.name, dbPrice: db.price_regular });
                count++;
                break;
            }
        }
    }

    console.log('ESTUDIO CSV | PRECIO CSV | PRECIO ACTUAL EN PAGINA');
    console.log('-'.repeat(80));
    examples.forEach(e => {
        const same = Math.abs(e.csvPrice - e.dbPrice) < 0.5;
        console.log(`${e.csvName.substring(0, 55).padEnd(57)} | $${String(e.csvPrice).padStart(8)} | $${String(e.dbPrice).padStart(8)} ${same ? '=' : 'DIFF'}`);
    });

    await pool.end();
}
main().catch(console.error);
