/**
 * Find unmatched CSV studies and studies with basic descriptions
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// 1. Parse CSV
const csvRaw = readFileSync(join(__dirname, 'cilab_precios.csv'), 'utf-8');
const csvLines = csvRaw.split('\n').filter(l => l.trim());

const csvStudies = [];
for (let i = 1; i < csvLines.length; i++) {
    const line = csvLines[i];
    const parts = [];
    let current = '', inQuotes = false;
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
            csvStudies.push({ clave: parts[0].trim(), name, priceCSV: price });
        }
    }
}

// 2. Load current studies.json
const studies = JSON.parse(readFileSync(join(__dirname, 'src', 'data', 'studies.json'), 'utf-8'));

function normalize(n) {
    return n.toUpperCase().replace(/[^A-Z0-9ÁÉÍÓÚÑÜ\s]/g, '').replace(/\s+/g, ' ').trim();
}

// 3. Find unmatched CSV entries
console.log('=== UNMATCHED CSV STUDIES (not in studies.json) ===\n');
const studyNorms = studies.map(s => normalize(s.name));
const unmatched = [];

for (const csv of csvStudies) {
    const csvNorm = normalize(csv.name);
    const found = studyNorms.some(sn =>
        sn === csvNorm ||
        sn.includes(csvNorm) ||
        csvNorm.includes(sn) ||
        (csvNorm.length > 15 && sn.startsWith(csvNorm.substring(0, 20)))
    );
    if (!found) {
        unmatched.push(csv);
    }
}

console.log(`Total unmatched: ${unmatched.length}\n`);
unmatched.forEach((u, i) => {
    console.log(`${i + 1}. [${u.clave}] ${u.name} — CSV Price: $${u.priceCSV} → Your price: $${Math.round(u.priceCSV * 1.20)}`);
});

// 4. Find studies with basic descriptions
console.log('\n\n=== STUDIES WITH BASIC DESCRIPTIONS (≤200 chars) ===\n');
const basic = studies.filter(s => !s.description || s.description.length <= 200);
console.log(`Total with basic description: ${basic.length}\n`);
basic.forEach((s, i) => {
    const descLen = s.description ? s.description.length : 0;
    console.log(`${i + 1}. ${s.name} (${descLen} chars) — $${s.priceRegular}`);
    if (s.description) console.log(`   "${s.description.substring(0, 100)}..."\n`);
});
