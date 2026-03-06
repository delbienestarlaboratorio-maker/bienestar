const fs = require('fs');

function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\(.*?\)/g, '').replace(/"/g, '')
        .replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
}

// CSV (precios nuevos del CILAB)
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

// all-studies-list.txt (precios ANTERIORES que tenia la pagina)
const oldStudies = [];
for (const line of fs.readFileSync('all-studies-list.txt', 'utf-8').split('\n')) {
    const m = line.match(/^\s*(\d+)\s*\|\s*([^|]+)/);
    if (m) {
        const nums = line.match(/[\d.]+/g);
        const p = nums && nums.length > 1 ? parseFloat(nums[nums.length - 1]) : null;
        oldStudies.push({ id: m[1].trim(), name: m[2].trim(), price: p && p > 1 ? p : null });
    }
}

// Match and show price changes
let shown = 0;
const changes = [];
for (const csv of csvStudies) {
    const cn = norm(csv.name);
    for (const old of oldStudies) {
        const on = norm(old.name);
        if (cn === on || (cn.length > 5 && on.length > 5 && (cn.includes(on) || on.includes(cn)) && Math.min(cn.length, on.length) / Math.max(cn.length, on.length) > 0.5)) {
            if (old.price && Math.abs(csv.price - old.price) > 0.5) {
                changes.push({ name: old.name, oldPrice: old.price, newPrice: csv.price, diff: csv.price - old.price });
            }
            break;
        }
    }
}

changes.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));

console.log('ESTUDIO | PRECIO ANTERIOR (pagina) | PRECIO NUEVO (CSV) | DIFERENCIA');
console.log('='.repeat(95));
changes.slice(0, 30).forEach(c => {
    const arrow = c.diff > 0 ? 'SUBIO' : 'BAJO';
    console.log(`${c.name.substring(0, 45).padEnd(47)} | $${String(c.oldPrice).padStart(8)} | $${String(c.newPrice).padStart(8)} | ${c.diff > 0 ? '+' : ''}${c.diff.toFixed(2)} ${arrow}`);
});
console.log(`\nTotal con cambio de precio: ${changes.length}`);
console.log(`Sin cambio: ${csvStudies.length - changes.length}`);
