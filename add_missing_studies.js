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

function slugify(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 100);
}

async function main() {
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

    // 2. Get existing DB studies
    const { rows: dbStudies } = await pool.query('SELECT id, name FROM studies');
    const { rows: categories } = await pool.query('SELECT id, name FROM categories');

    console.log('Categorias disponibles:');
    categories.forEach(c => console.log(`  ${c.id}: ${c.name}`));

    // 3. Find not-matched
    const notFound = [];
    for (const csv of csvStudies) {
        const cn = norm(csv.name);
        let found = false;
        for (const db of dbStudies) {
            const dn = norm(db.name);
            if (cn === dn) { found = true; break; }
            if (cn.length > 5 && dn.length > 5 && (cn.includes(dn) || dn.includes(cn))) {
                const s = Math.min(cn.length, dn.length) / Math.max(cn.length, dn.length);
                if (s > 0.5) { found = true; break; }
            }
        }
        if (!found) notFound.push(csv);
    }

    console.log(`\n${notFound.length} estudios a insertar:\n`);

    // 4. Determine category for each
    // Perfiles -> analisis-clinicos, Hormonas -> analisis-clinicos
    const defaultCategory = 'analisis-clinicos';

    // Get max ID to generate new ones
    const { rows: [{ max_id }] } = await pool.query("SELECT COALESCE(MAX(id::int), 2300) as max_id FROM studies WHERE id ~ '^[0-9]+$'");
    let nextId = max_id + 1;

    let inserted = 0;
    for (const study of notFound) {
        const id = String(nextId++);
        const slug = slugify(study.name);

        // Check slug doesn't exist
        const { rows: existing } = await pool.query('SELECT id FROM studies WHERE slug = $1', [slug]);
        const finalSlug = existing.length > 0 ? slug + '-' + id : slug;

        try {
            await pool.query(`
                INSERT INTO studies (id, slug, name, category_id, price_regular, is_active, views, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, true, 0, NOW(), NOW())
            `, [id, finalSlug, study.name.trim(), defaultCategory, study.price]);

            console.log(`  + [${id}] ${study.name.substring(0, 70)} -> $${study.price}`);
            inserted++;
        } catch (e) {
            console.error(`  X ERROR en "${study.name.substring(0, 50)}": ${e.message.substring(0, 100)}`);
        }
    }

    console.log(`\nInsertados: ${inserted}/${notFound.length}`);

    // Final count
    const { rows: status } = await pool.query(`
        SELECT CASE WHEN is_active THEN 'ACTIVOS' ELSE 'PAUSADOS' END as estado,
        COUNT(*)::int as count FROM studies GROUP BY is_active ORDER BY is_active DESC
    `);
    console.log('\n=== ESTADO FINAL ===');
    status.forEach(r => console.log(`  ${r.estado}: ${r.count}`));

    await pool.end();
}

main().catch(e => { console.error('ERROR:', e.message); pool.end(); });
