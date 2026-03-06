const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'src', 'data', 'biomarkers.json');
const fragmentsDir = path.join(__dirname, 'src', 'data', 'biomarkers-fragments');
const batchFile = path.join(__dirname, 'src', 'data', process.argv[2] || 'biomarkers-batch-1.json');

if (!fs.existsSync(batchFile)) {
    console.error("No se encontró biomarkers-batch-1.json");
    process.exit(1);
}

const batchData = JSON.parse(fs.readFileSync(batchFile, 'utf8'));
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

let updated = 0;

for (const item of batchData) {
    // 1. Update Master Database
    const dbItem = dbData.find(b => b.slug === item.slug);
    if (dbItem) {
        dbItem.intro = item.intro;
        dbItem.highMeaning = item.highMeaning;
        dbItem.lowMeaning = item.lowMeaning;
    }

    // 2. Update Fragment for Dynamic Next.js Routes
    const fragPath = path.join(fragmentsDir, `${item.slug}.json`);
    if (fs.existsSync(fragPath)) {
        const fragData = JSON.parse(fs.readFileSync(fragPath, 'utf8'));
        fragData.intro = item.intro;
        fragData.highMeaning = item.highMeaning;
        fragData.lowMeaning = item.lowMeaning;
        fs.writeFileSync(fragPath, JSON.stringify(fragData, null, 2), 'utf8');
        updated++;
    }
}

// Save Master Database
fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');

console.log(`✅ Lote 1 Inyectado: ${updated} biomarcadores actualizados exitosamente en la base general y fragmentos.`);
