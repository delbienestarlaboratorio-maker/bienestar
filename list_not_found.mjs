import fs from 'fs';

function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\(.*?\)/g, '').replace(/"/g, '')
        .replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
}

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

const ourStudies = [];
for (const line of fs.readFileSync('all-studies-list.txt', 'utf-8').split('\n')) {
    const m = line.match(/^\s*(\d+)\s*\|\s*([^|]+)/);
    if (m) {
        const nums = line.match(/[\d.]+/g);
        const p = nums && nums.length > 1 ? parseFloat(nums[nums.length - 1]) : null;
        ourStudies.push({ id: m[1].trim(), name: m[2].trim(), price: p && p > 1 ? p : null });
    }
}

const notFoundList = [];
for (const csv of csvStudies) {
    const cn = norm(csv.name);
    let found = false;
    for (const our of ourStudies) {
        const on = norm(our.name);
        if (cn === on) { found = true; break; }
        if (cn.length > 5 && on.length > 5 && (cn.includes(on) || on.includes(cn))) {
            const s = Math.min(cn.length, on.length) / Math.max(cn.length, on.length);
            if (s > 0.5) { found = true; break; }
        }
    }
    if (!found) notFoundList.push(csv);
}

// Only show not found - short names
console.log('ESTUDIOS DEL CSV QUE NO TENEMOS: ' + notFoundList.length);
notFoundList.forEach((s, i) => {
    const shortName = s.name.substring(0, 80);
    console.log((i + 1) + '. [' + s.clave + '] ' + shortName + ' $' + s.price);
});
