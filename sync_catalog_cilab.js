const fs = require('fs');
const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
neonConfig.webSocketConstructor = ws;

const DB_URL = 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require';
const DRY_RUN = process.argv.includes('--dry-run');
const pool = new Pool({ connectionString: DB_URL, connectionTimeoutMillis: 30000 });

function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\(.*?\)/g, '').replace(/"/g, '')
        .replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
}

// 1. Parse CSV
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
    csvStudies.push({ clave: rest.substring(0, fc).trim(), name: rest.substring(fc + 1).trim().replace(/^"|"$/g, ''), price });
}
console.log(`CSV cargado: ${csvStudies.length} estudios`);

async function main() {
    // 2. Get all DB studies
    const { rows: dbStudies } = await pool.query('SELECT id, name, is_active, price_regular FROM studies');
    console.log(`DB tiene: ${dbStudies.length} estudios`);

    // 3. Match CSV to DB
    const matchedDbIds = new Set();
    const matchedPairs = [];
    const notFoundInDb = [];

    for (const csv of csvStudies) {
        const cn = norm(csv.name);
        let best = null, bestScore = 0;
        for (const db of dbStudies) {
            const dn = norm(db.name);
            if (cn === dn) { best = db; bestScore = 1; break; }
            if (cn.length > 5 && dn.length > 5 && (cn.includes(dn) || dn.includes(cn))) {
                const s = Math.min(cn.length, dn.length) / Math.max(cn.length, dn.length);
                if (s > bestScore && s > 0.5) { best = db; bestScore = s; }
            }
        }
        if (best) {
            matchedDbIds.add(best.id);
            matchedPairs.push({ csvName: csv.name, csvPrice: csv.price, dbId: best.id, dbName: best.name, dbPrice: best.price_regular, dbActive: best.is_active });
        } else {
            notFoundInDb.push(csv);
        }
    }

    const toActivate = matchedPairs.filter(p => !p.dbActive);
    const toPause = dbStudies.filter(db => !matchedDbIds.has(db.id) && db.is_active);
    const alreadyActive = matchedPairs.filter(p => p.dbActive);

    console.log(`\n=== RESUMEN ===`);
    console.log(`Coincidencias CSV - DB: ${matchedPairs.length}`);
    console.log(`  Ya activos: ${alreadyActive.length}`);
    console.log(`  Necesitan activarse: ${toActivate.length}`);
    console.log(`A PAUSAR (en DB, no en CSV): ${toPause.length}`);
    console.log(`En CSV pero NO en DB: ${notFoundInDb.length}`);

    if (DRY_RUN) {
        console.log(`\nMODO DRY-RUN - no se modifica nada.\n`);
        if (toActivate.length > 0) {
            console.log(`--- NECESITAN ACTIVARSE (${toActivate.length}) ---`);
            toActivate.forEach(p => console.log(`  ID ${p.dbId}: ${p.dbName}`));
        }
        if (notFoundInDb.length > 0) {
            console.log(`\n--- NO ENCONTRADOS EN DB (${notFoundInDb.length}) ---`);
            notFoundInDb.forEach(csv => console.log(`  [${csv.clave}] ${csv.name.substring(0, 70)} $${csv.price}`));
        }
    } else {
        console.log(`\nEJECUTANDO CAMBIOS...\n`);

        // Step 1: PAUSE all non-CSV studies
        if (toPause.length > 0) {
            const pauseIds = toPause.map(db => db.id);
            const res = await pool.query('UPDATE studies SET is_active = false, updated_at = NOW() WHERE id = ANY($1) AND is_active = true', [pauseIds]);
            console.log(`PAUSADOS: ${res.rowCount} estudios`);
        }

        // Step 2: ACTIVATE + UPDATE PRICE for CSV studies
        let activated = 0, priceUpdated = 0;
        for (const pair of matchedPairs) {
            const res = await pool.query(
                'UPDATE studies SET is_active = true, price_regular = $1, updated_at = NOW() WHERE id = $2 RETURNING id',
                [pair.csvPrice, pair.dbId]
            );
            if (res.rowCount > 0) {
                if (!pair.dbActive) activated++;
                if (Math.abs(pair.csvPrice - pair.dbPrice) > 0.5) priceUpdated++;
            }
        }

        console.log(`ACTIVADOS: ${activated}`);
        console.log(`PRECIOS ACTUALIZADOS: ${priceUpdated}`);

        // Final count
        const { rows: finalCount } = await pool.query('SELECT is_active, COUNT(*)::int as count FROM studies GROUP BY is_active ORDER BY is_active DESC');
        console.log(`\n=== ESTADO FINAL ===`);
        finalCount.forEach(r => console.log(`  ${r.is_active ? 'ACTIVOS' : 'PAUSADOS'}: ${r.count}`));

        if (notFoundInDb.length > 0) {
            console.log(`\nESTUDIOS DEL CSV SIN MATCH EN DB (${notFoundInDb.length}):`);
            notFoundInDb.forEach(csv => console.log(`  [${csv.clave}] ${csv.name.substring(0, 70)} $${csv.price}`));
        }
    }

    await pool.end();
}

main().catch(e => { console.error('ERROR:', e.message); pool.end(); });
