const fs = require('fs');
const f = __dirname + '/medication-master-list.json';
let d = JSON.parse(fs.readFileSync(f, 'utf8'));
console.log('Before:', d.length);

// Remove ALL "Gastrointestinales — Laxantes" FDA entries, keep only original
d = d.filter(m => {
    if (m.category === 'Gastrointestinales — Laxantes' && m.source === 'FDA-NDC') return false;
    return true;
});

// Remove ALL "Sin Clasificar" FDA entries
d = d.filter(m => {
    if (m.category === 'Sin Clasificar' && m.source === 'FDA-NDC') return false;
    return true;
});

// Remove ALL "Hemoderivados" FDA entries without brands (real hemoderivados are kept)
d = d.filter(m => {
    if (m.category === 'Hemoderivados y Factores de Coagulación' && m.source === 'FDA-NDC' && (!m.brands || m.brands.length === 0)) return false;
    return true;
});

console.log('After cleanup:', d.length);

// Final category stats
const cats = {};
d.forEach(m => { cats[m.category] = (cats[m.category] || 0) + 1; });
const sorted = Object.entries(cats).sort((a, b) => b[1] - a[1]);
console.log('Categories:', sorted.length);
sorted.slice(0, 35).forEach(([k, v], i) => console.log(`  ${i + 1}. ${k}: ${v}`));

// Show some cool rare categories
console.log('\n🔬 Rare/specialty categories:');
const rare = ['Enzimas', 'Terapia', 'Huérfanos', 'Inmunoterapia', 'Quinasa', 'Anticuerpos', 'Gadolinio', 'Vacunas', 'GLP-1', 'Hemoderivados'];
rare.forEach(r => {
    const f = sorted.filter(([k]) => k.includes(r));
    f.forEach(([k, v]) => console.log(`  💎 ${k}: ${v}`));
});

fs.writeFileSync(f, JSON.stringify(d, null, 2), 'utf8');
console.log('\nSaved!');
