const fs = require('fs');
const path = require('path');

const CATALOG_PATH = path.join(__dirname, 'calculators-catalog.json');
const LOTE_PATH = process.argv.length > 2 ? path.join(__dirname, process.argv[2]) : null;

if (!LOTE_PATH || !fs.existsSync(LOTE_PATH)) {
    console.error('Uso: node merge-calculators.js src/data/calc/lote-x.json');
    process.exit(1);
}

// Read master catalog
let catalog = [];
if (fs.existsSync(CATALOG_PATH)) {
    catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
}

// Read incoming batch
const batchSpecs = JSON.parse(fs.readFileSync(LOTE_PATH, 'utf8'));

console.log(`Fusionando lote desde ${LOTE_PATH} (${batchSpecs.length} especialidades en el lote)`);

let addedCount = 0;

for (const spec of batchSpecs) {
    let masterSpec = catalog.find(s => s.name === spec.name);

    if (!masterSpec) {
        masterSpec = { name: spec.name, icon: spec.icon, calculators: [] };
        catalog.push(masterSpec);
    }

    for (const calc of spec.calculators) {
        // Prevent duplicates
        const exists = masterSpec.calculators.find(c => c.slug === calc.slug);
        if (!exists) {
            masterSpec.calculators.push(calc);
            addedCount++;
            console.log(` + Añadida: ${calc.slug}`);
        } else {
            console.log(` - Saltada (ya existe): ${calc.slug}`);
        }
    }
}

fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2), 'utf8');
console.log(`\n✅ Catálogo maestro actualizado. Se añadieron ${addedCount} calculadoras nuevas.`);
