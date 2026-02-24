import fs from 'fs';

// Read CSV
const csvLines = fs.readFileSync('cilab_precios.csv', 'latin1').split('\n').filter(l => l.trim());
const csvStudies = [];

for (const line of csvLines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('CLAVE')) continue;
    // Match: KEY, NAME, PRICE (price is last number after last comma)
    const lastComma = trimmed.lastIndexOf(',');
    if (lastComma === -1) continue;
    const priceStr = trimmed.substring(lastComma + 1).trim();
    const price = parseFloat(priceStr);
    if (isNaN(price)) continue;
    const rest = trimmed.substring(0, lastComma);
    const firstComma = rest.indexOf(',');
    if (firstComma === -1) continue;
    const clave = rest.substring(0, firstComma).trim();
    const name = rest.substring(firstComma + 1).trim().replace(/^"|"$/g, '');
    csvStudies.push({ clave, name, price });
}

// Read our studies
const allContent = fs.readFileSync('all-studies-list.txt', 'utf-8');
const ourStudies = [];
for (const line of allContent.split('\n')) {
    const match = line.match(/^\s*(\d+)\s*\|\s*([^|]+)/);
    if (match) {
        // Try to find price - it's the last number in the line
        const allNums = line.match(/[\d.]+/g);
        const possiblePrice = allNums && allNums.length > 1 ? parseFloat(allNums[allNums.length - 1]) : null;
        ourStudies.push({
            id: match[1].trim(),
            name: match[2].trim(),
            price: possiblePrice && possiblePrice > 1 ? possiblePrice : null
        });
    }
}

// Normalize
function norm(s) {
    return s.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\(.*?\)/g, '').replace(/"/g, '')
        .replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
}

// Match
let matched = 0, notFound = 0, priceHigher = 0, priceLower = 0, priceEqual = 0;
const notFoundList = [], matchedList = [];

for (const csv of csvStudies) {
    const cn = norm(csv.name);
    let best = null, bestScore = 0;
    for (const our of ourStudies) {
        const on = norm(our.name);
        if (cn === on) { best = our; bestScore = 1; break; }
        if (cn.length > 5 && on.length > 5 && (cn.includes(on) || on.includes(cn))) {
            const score = Math.min(cn.length, on.length) / Math.max(cn.length, on.length);
            if (score > bestScore && score > 0.5) { best = our; bestScore = score; }
        }
    }
    if (best) {
        matched++;
        const ourP = best.price || 0;
        const diff = ourP - csv.price;
        if (ourP > csv.price) priceHigher++;
        else if (ourP < csv.price) priceLower++;
        else priceEqual++;
        matchedList.push({ cilab: csv.name, nuestro: best.name, cilabP: csv.price, nuestroP: ourP, diff });
    } else {
        notFound++;
        notFoundList.push(csv);
    }
}

// Write report
const lines = [];
lines.push('COMPARATIVA CILAB vs NUESTRA BASE DE DATOS');
lines.push('='.repeat(60));
lines.push('');
lines.push('RESUMEN GENERAL:');
lines.push('  Estudios en CSV CILAB:          ' + csvStudies.length);
lines.push('  Estudios en nuestra DB:         ' + ourStudies.length);
lines.push('  Coincidencias encontradas:      ' + matched);
lines.push('  NO encontrados en nuestra DB:   ' + notFound);
lines.push('');
lines.push('COMPARACION DE PRECIOS (de los ' + matched + ' coincidentes):');
lines.push('  Nuestro precio MAYOR que CILAB: ' + priceHigher);
lines.push('  Nuestro precio MENOR que CILAB: ' + priceLower);
lines.push('  Precios iguales o sin precio:   ' + priceEqual);
lines.push('');

if (notFoundList.length > 0) {
    lines.push('='.repeat(60));
    lines.push('ESTUDIOS DEL CSV QUE NO TENEMOS (' + notFoundList.length + '):');
    lines.push('-'.repeat(60));
    notFoundList.forEach((s, i) => {
        lines.push(`  ${i + 1}. [${s.clave}] ${s.name} - $${s.price}`);
    });
    lines.push('');
}

lines.push('='.repeat(60));
lines.push('ESTUDIOS DONDE NUESTRO PRECIO ES MAS ALTO QUE CILAB (' + priceHigher + '):');
lines.push('-'.repeat(60));
matchedList.filter(m => m.diff > 0).sort((a, b) => b.diff - a.diff).forEach(m => {
    const pct = ((m.diff / m.cilabP) * 100).toFixed(1);
    lines.push(`  CILAB: $${m.cilabP} | NUESTRO: $${m.nuestroP} | +$${m.diff.toFixed(2)} (+${pct}%)`);
    lines.push(`    CILAB: ${m.cilab}`);
    lines.push(`    NUESTRO: ${m.nuestro}`);
    lines.push('');
});

lines.push('='.repeat(60));
lines.push('ESTUDIOS DONDE NUESTRO PRECIO ES MENOR QUE CILAB (' + priceLower + '):');
lines.push('(Mostrando primeros 30 con mayor diferencia)');
lines.push('-'.repeat(60));
matchedList.filter(m => m.diff < 0).sort((a, b) => a.diff - b.diff).slice(0, 30).forEach(m => {
    const pct = ((m.diff / m.cilabP) * 100).toFixed(1);
    lines.push(`  CILAB: $${m.cilabP} | NUESTRO: $${m.nuestroP} | $${m.diff.toFixed(2)} (${pct}%)`);
    lines.push(`    CILAB: ${m.cilab}`);
    lines.push(`    NUESTRO: ${m.nuestro}`);
    lines.push('');
});

fs.writeFileSync('reporte_comparativa_cilab.txt', lines.join('\n'), 'utf-8');
console.log('Reporte generado: reporte_comparativa_cilab.txt');
console.log(`Resumen: ${csvStudies.length} CILAB | ${ourStudies.length} nuestros | ${matched} match | ${notFound} no encontrados`);
console.log(`Precios: ${priceHigher} mas altos | ${priceLower} mas bajos | ${priceEqual} iguales/sin precio`);
