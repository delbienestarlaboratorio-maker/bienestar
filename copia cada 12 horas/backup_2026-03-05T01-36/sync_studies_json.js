/**
 * sync_studies_json.js v2
 * Exports all V2 content from the Neon DB into src/data/studies.json
 * Properly maps camelCase DB columns to JSON fields.
 */
const { neonConfig, Pool } = require('@neondatabase/serverless');
const ws = require('ws');
const fs = require('fs');
const path = require('path');

neonConfig.webSocketConstructor = ws;

const connStr = process.argv[2] || 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require';
const p = new Pool({ connectionString: connStr });

async function main() {
    console.log('📖 Reading current studies.json for structure reference...');
    const currentPath = path.join(__dirname, 'src', 'data', 'studies.json');
    const currentData = JSON.parse(fs.readFileSync(currentPath, 'utf-8'));
    console.log(`   Current JSON has ${currentData.length} studies`);

    // Get DB columns
    const colRes = await p.query("SELECT column_name FROM information_schema.columns WHERE table_name='studies' ORDER BY ordinal_position");
    const dbCols = colRes.rows.map(r => r.column_name);
    console.log(`\n📊 DB columns: ${dbCols.join(', ')}`);

    // Fetch ALL studies from DB with proper column quoting
    console.log('\n🔄 Fetching all studies from database...');
    const quotedCols = dbCols.map(c => `"${c}"`).join(', ');
    const allRes = await p.query(`SELECT ${quotedCols} FROM studies ORDER BY id`);
    console.log(`   Found ${allRes.rows.length} studies in DB`);

    // Show one row to verify column mapping
    if (allRes.rows.length > 0) {
        const sample = allRes.rows.find(r => r.slug && r.slug.includes('calcitriol')) || allRes.rows[0];
        console.log('\n📋 Sample row (Calcitriol or first):');
        for (const [k, v] of Object.entries(sample)) {
            if (v !== null && v !== undefined) {
                const str = typeof v === 'string' ? v : JSON.stringify(v);
                console.log(`   ${k}: ${str.length > 80 ? str.substring(0, 80) + '...' : str}`);
            }
        }
    }

    // Build map by id
    const dbMap = {};
    for (const row of allRes.rows) {
        dbMap[row.id] = row;
    }

    // Content fields to overlay from DB (these are the V2 fields)
    // DB columns -> JSON keys (camelCase in both)
    const contentFields = [
        'description',
        'whatIsIt',
        'preparation',
        'whatDoesItDetect',
        'benefits',
        'detailedPreparation',
        'faqs'
    ];

    let updatedCount = 0;

    // Merge: take the static JSON as base, overlay DB content fields
    const merged = currentData.map(jsonStudy => {
        const dbStudy = dbMap[jsonStudy.id];
        if (!dbStudy) return jsonStudy;

        const result = { ...jsonStudy };
        let changed = false;

        for (const field of contentFields) {
            const val = dbStudy[field];
            if (val !== null && val !== undefined && val !== '') {
                // For arrays, only overlay if non-empty
                if (Array.isArray(val) && val.length === 0) continue;
                // For strings, only overlay if longer than existing (V2 should be richer)
                if (typeof val === 'string' && val.length > 0) {
                    result[field] = val;
                    changed = true;
                } else if (Array.isArray(val) && val.length > 0) {
                    result[field] = val;
                    changed = true;
                }
            }
        }

        if (changed) updatedCount++;
        return result;
    });

    // Backup current file
    const backupPath = currentPath.replace('.json', '.backup.json');
    if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(currentPath, backupPath);
        console.log(`\n📋 Backup saved to: ${path.basename(backupPath)}`);
    } else {
        console.log(`\n📋 Backup already exists`);
    }

    // Write merged data
    fs.writeFileSync(currentPath, JSON.stringify(merged, null, 2), 'utf-8');
    console.log(`✅ Updated studies.json: ${updatedCount} studies enriched with DB content`);

    // Verify Calcitriol
    const verifyData = JSON.parse(fs.readFileSync(currentPath, 'utf-8'));
    const calcitriol = verifyData.find(s => s.slug && s.slug.includes('calcitriol'));
    if (calcitriol) {
        console.log('\n📋 Verification - Calcitriol study:');
        console.log('  name:', calcitriol.name);
        console.log('  priceRegular:', calcitriol.priceRegular);
        console.log('  pricePromotional:', calcitriol.pricePromotional);
        console.log('  description length:', calcitriol.description?.length || 0);
        console.log('  whatIsIt length:', calcitriol.whatIsIt?.length || 0);
        console.log('  preparation:', calcitriol.preparation);
        console.log('  faqs:', calcitriol.faqs ? JSON.stringify(calcitriol.faqs).substring(0, 200) : 'none');
        console.log('  benefits count:', calcitriol.benefits?.length || 0);
        console.log('  whatDoesItDetect count:', calcitriol.whatDoesItDetect?.length || 0);
        console.log('  detailedPreparation count:', calcitriol.detailedPreparation?.length || 0);
    }

    // Stats
    let v2Count = 0;
    for (const s of verifyData) {
        if (s.faqs && Array.isArray(s.faqs) && s.faqs.length > 0 && s.faqs[0].question) v2Count++;
    }
    console.log(`\n📊 Final stats: ${v2Count}/${verifyData.length} have V2 quality in JSON`);

    await p.end();
}

main().catch(e => { console.error(e); p.end(); });
