const fs = require('fs');
const f = __dirname + '/medication-master-list.json';
let d = JSON.parse(fs.readFileSync(f, 'utf8'));
console.log('Before:', d.length);

// Remove FDA entries without brands in inflated categories
const noisy = [
    'Gastrointestinales — Laxantes',
    'Sin Clasificar',
    'Otros Medicamentos',
    'Hemoderivados y Factores de Coagulación',
];
d = d.filter(m => {
    if (m.source === 'FDA-NDC' && noisy.includes(m.category) && (!m.brands || m.brands.length === 0)) {
        return false;
    }
    return true;
});

// Also remove ALL remaining English-only FDA categories (ones we didn't map)
const spanishChars = /[áéíóúñü¿¡]/i;
const knownEnglish = d.filter(m => m.source === 'FDA-NDC' && !spanishChars.test(m.category) && /^[A-Z]/.test(m.category));
const englishCats = [...new Set(knownEnglish.map(m => m.category))];
// Keep categories that look like valid drug classes, remove obscure ones
const keepEnglishCats = new Set([
    // These are fine as-is (well-known internationally)
]);
d = d.filter(m => {
    if (m.source === 'FDA-NDC' && englishCats.includes(m.category) && !keepEnglishCats.has(m.category)) {
        // Keep if it has brands (actual marketed drug), otherwise remove
        if (m.brands && m.brands.length >= 2) return true;
        return false;
    }
    return true;
});

console.log('After:', d.length);
const cats = {};
d.forEach(m => { cats[m.category] = (cats[m.category] || 0) + 1; });
const sorted = Object.entries(cats).sort((a, b) => b[1] - a[1]);
console.log('Categories:', sorted.length);
sorted.slice(0, 30).forEach(([k, v], i) => console.log(`  ${i + 1}. ${k}: ${v}`));

fs.writeFileSync(f, JSON.stringify(d, null, 2), 'utf8');
console.log('Saved!');
