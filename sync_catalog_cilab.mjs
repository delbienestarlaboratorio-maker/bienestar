import fs from 'fs';
import { neon } from '@neondatabase/serverless';

const DB_URL = process.argv[2] || 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require';
const DRY_RUN = process.argv.includes('--dry-run');
const sql = neon(DB_URL);

async function retry(fn, attempts = 3, delay = 2000) {
    for (let i = 0; i < attempts; i++) {
        try { return await fn(); }
        catch (e) {
            if (i === attempts - 1) throw e;
            console.warn(`⚠️ Reintento ${i + 1}/${attempts}... (${e.message.substring(0, 60)})`);
            await new Promise(r => setTimeout(r, delay * (i + 1)));
        }
    }
}

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
console.log(`📋 CSV cargado: ${csvStudies.length} estudios`);

// 2. Get all DB studies
const dbStudies = await retry(() => sql`SELECT id, name, is_active, price_regular FROM studies`);
console.log(`🗄️  DB tiene: ${dbStudies.length} estudios`);

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
console.log(`✅ Coincidencias CSV ↔ DB: ${matchedPairs.length}`);
console.log(`   - Ya activos: ${alreadyActive.length}`);
console.log(`   - Necesitan activarse: ${toActivate.length}`);
console.log(`⏸️  Estudios a PAUSAR (en DB, no en CSV): ${toPause.length}`);
console.log(`❌ En CSV pero NO en DB: ${notFoundInDb.length}`);

if (DRY_RUN) {
    console.log(`\n🔍 MODO DRY-RUN — No se modificará nada.\n`);

    if (toActivate.length > 0) {
        console.log(`--- NECESITAN ACTIVARSE (${toActivate.length}) ---`);
        toActivate.forEach(p => console.log(`  ID ${p.dbId}: ${p.dbName}`));
    }

    if (toPause.length > 0) {
        console.log(`\n--- SE PAUSARÁN (${toPause.length}) --- (primeros 20)`);
        toPause.slice(0, 20).forEach(db => console.log(`  ID ${db.id}: ${db.name}`));
        if (toPause.length > 20) console.log(`  ... y ${toPause.length - 20} más`);
    }

    if (notFoundInDb.length > 0) {
        console.log(`\n--- NO ENCONTRADOS EN DB (${notFoundInDb.length}) ---`);
        notFoundInDb.forEach(csv => console.log(`  [${csv.clave}] ${csv.name.substring(0, 80)} $${csv.price}`));
    }

    const priceChanges = matchedPairs.filter(p => Math.abs(p.csvPrice - p.dbPrice) > 0.5);
    console.log(`\n--- CAMBIOS DE PRECIO (${priceChanges.length}) --- (primeros 20)`);
    priceChanges.slice(0, 20).forEach(p => {
        const diff = (p.csvPrice - p.dbPrice).toFixed(2);
        console.log(`  ${p.dbName.substring(0, 50)}: $${p.dbPrice} → $${p.csvPrice} (${diff > 0 ? '+' : ''}${diff})`);
    });

} else {
    console.log(`\n🚀 EJECUTANDO CAMBIOS...\n`);

    // Step 1: PAUSE all non-CSV studies
    if (toPause.length > 0) {
        const pauseIds = toPause.map(db => db.id);
        for (let i = 0; i < pauseIds.length; i += 50) {
            const batch = pauseIds.slice(i, i + 50);
            await retry(() => sql`UPDATE studies SET is_active = false, updated_at = NOW() WHERE id = ANY(${batch}) AND is_active = true`);
            console.log(`⏸️  Pausados batch ${Math.floor(i / 50) + 1}: ${batch.length} estudios`);
        }
    }

    // Step 2: ACTIVATE + UPDATE PRICE for CSV studies
    let activated = 0, priceUpdated = 0, processed = 0;
    for (const pair of matchedPairs) {
        const result = await retry(() => sql`UPDATE studies SET is_active = true, price_regular = ${pair.csvPrice}, updated_at = NOW() WHERE id = ${pair.dbId} RETURNING id`);
        if (result.length > 0) {
            if (!pair.dbActive) activated++;
            if (Math.abs(pair.csvPrice - pair.dbPrice) > 0.5) priceUpdated++;
        }
        processed++;
        if (processed % 50 === 0) console.log(`  Procesados ${processed}/${matchedPairs.length}...`);
    }

    console.log(`✅ Activados: ${activated}`);
    console.log(`💰 Precios actualizados: ${priceUpdated}`);
    console.log(`⏸️  Pausados: ${toPause.length}`);

    // Final count
    const finalCount = await retry(() => sql`SELECT is_active, COUNT(*)::int as count FROM studies GROUP BY is_active ORDER BY is_active DESC`);
    console.log(`\n=== ESTADO FINAL ===`);
    finalCount.forEach(r => console.log(`  ${r.is_active ? '✅ ACTIVOS' : '⏸️  PAUSADOS'}: ${r.count}`));

    if (notFoundInDb.length > 0) {
        console.log(`\n⚠️  ESTUDIOS DEL CSV SIN MATCH EN DB (${notFoundInDb.length}):`);
        notFoundInDb.forEach(csv => console.log(`  [${csv.clave}] ${csv.name.substring(0, 80)} $${csv.price}`));
    }
}
