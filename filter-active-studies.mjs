/**
 * Filter studies.json to only include the 544 studies from cilab_precios.csv
 * and update prices to CSV price × 1.20 (rounded to integer)
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// 1. Read CSV
const csvRaw = readFileSync(join(__dirname, 'cilab_precios.csv'), 'utf-8');
const csvLines = csvRaw.split('\n').filter(l => l.trim());
const headers = csvLines[0].split(',').map(h => h.trim());

console.log('CSV Headers:', headers);

const csvStudies = [];
for (let i = 1; i < csvLines.length; i++) {
    // Parse CSV carefully (handle commas in quoted fields)
    const line = csvLines[i];
    const parts = [];
    let current = '';
    let inQuotes = false;
    for (const char of line) {
        if (char === '"') { inQuotes = !inQuotes; continue; }
        if (char === ',' && !inQuotes) { parts.push(current.trim()); current = ''; continue; }
        current += char;
    }
    parts.push(current.trim());

    if (parts.length >= 3) {
        const name = (parts[1] || '').trim();
        const priceStr = (parts[2] || '').replace(/[$ ,]/g, '').trim();
        const price = parseFloat(priceStr);

        if (name && !isNaN(price)) {
            csvStudies.push({
                clave: parts[0].trim(),
                name,
                priceCSV: price
            });
        }
    }
}

console.log(`\nCSV studies parsed: ${csvStudies.length}`);
console.log('Sample CSV entries:');
csvStudies.slice(0, 5).forEach(s => console.log(`  ${s.clave} | ${s.name} | $${s.priceCSV}`));

// 2. Read studies.json
const studiesPath = join(__dirname, 'src', 'data', 'studies.json');
const studies = JSON.parse(readFileSync(studiesPath, 'utf-8'));
console.log(`\nstudies.json total: ${studies.length}`);

// 3. Normalize names for matching
function normalize(name) {
    return name
        .toUpperCase()
        .replace(/[^A-Z0-9ÁÉÍÓÚÑÜ\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// 4. Match CSV studies to studies.json
const matched = [];
const unmatched = [];

for (const csv of csvStudies) {
    const csvNorm = normalize(csv.name);

    // Try exact match first
    let match = studies.find(s => normalize(s.name) === csvNorm);

    // Try partial match if no exact
    if (!match) {
        match = studies.find(s => {
            const sNorm = normalize(s.name);
            return sNorm.includes(csvNorm) || csvNorm.includes(sNorm);
        });
    }

    // Try fuzzy match (first 20 chars)
    if (!match && csvNorm.length > 15) {
        const prefix = csvNorm.substring(0, 20);
        match = studies.find(s => normalize(s.name).startsWith(prefix));
    }

    if (match) {
        // Update prices: CSV × 1.20 rounded
        const priceRegular = Math.round(csv.priceCSV * 1.20);
        const pricePromotional = Math.round(priceRegular * 0.95); // 5% discount

        matched.push({
            ...match,
            priceRegular,
            pricePromotional
        });
    } else {
        unmatched.push(csv);
    }
}

console.log(`\n=== RESULTS ===`);
console.log(`Matched: ${matched.length} / ${csvStudies.length}`);
console.log(`Unmatched: ${unmatched.length}`);

if (unmatched.length > 0) {
    console.log(`\nUnmatched CSV studies:`);
    unmatched.forEach(u => console.log(`  ❌ ${u.clave} | ${u.name} | $${u.priceCSV}`));
}

// Show price samples
console.log(`\nPrice samples (CSV → Regular → Promotional):`);
matched.slice(0, 10).forEach(s => {
    const csv = csvStudies.find(c => normalize(c.name) === normalize(s.name) ||
        normalize(s.name).includes(normalize(c.name)) ||
        normalize(c.name).includes(normalize(s.name)));
    const csvPrice = csv ? csv.priceCSV : '?';
    console.log(`  ${s.name.substring(0, 50).padEnd(50)} | CSV: $${csvPrice} → Regular: $${s.priceRegular} → Promo: $${s.pricePromotional}`);
});

// Check for duplicates
const slugs = new Set();
const deduplicated = [];
for (const study of matched) {
    if (!slugs.has(study.slug)) {
        slugs.add(study.slug);
        deduplicated.push(study);
    } else {
        console.log(`  ⚠️ Duplicate slug removed: ${study.slug} (${study.name})`);
    }
}

console.log(`\nAfter dedup: ${deduplicated.length} unique studies`);

// 5. Backup and write
const backupPath = studiesPath + `.backup_active_filter_${new Date().toISOString().replace(/[:.]/g, '-')}`;
writeFileSync(backupPath, readFileSync(studiesPath, 'utf-8'));
console.log(`\nBackup saved: ${backupPath}`);

// Sort by name
deduplicated.sort((a, b) => a.name.localeCompare(b.name));

writeFileSync(studiesPath, JSON.stringify(deduplicated, null, 2), 'utf-8');
console.log(`✅ studies.json updated: ${deduplicated.length} studies (was ${studies.length})`);
console.log(`   Removed: ${studies.length - deduplicated.length} studies`);

// Stats
const withV2 = deduplicated.filter(s => s.description && s.description.length > 200);
const withBasic = deduplicated.filter(s => !s.description || s.description.length <= 200);
console.log(`\n=== Content Status ===`);
console.log(`With V2 description (>200 chars): ${withV2.length}`);
console.log(`With basic description (≤200 chars): ${withBasic.length}`);

// Price stats
const prices = deduplicated.map(s => s.priceRegular);
const hasDecimals = prices.filter(p => p % 1 !== 0);
console.log(`\n=== Price Status ===`);
console.log(`All prices are integers: ${hasDecimals.length === 0 ? 'YES ✅' : `NO ❌ (${hasDecimals.length} with decimals)`}`);
console.log(`Min price: $${Math.min(...prices)}`);
console.log(`Max price: $${Math.max(...prices)}`);
console.log(`Avg price: $${Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)}`);
