const fs = require('fs');
const path = require('path');

const FRAGMENTS_DIR = path.join(__dirname, 'src', 'data', 'biomarkers-fragments');
const batchDataFile = path.join(__dirname, 'batch1.json');

try {
    const batchData = JSON.parse(fs.readFileSync(batchDataFile, 'utf-8'));
    let updated = 0;

    for (const [slug, meanings] of Object.entries(batchData)) {
        const file = path.join(FRAGMENTS_DIR, `${slug}.json`);
        if (fs.existsSync(file)) {
            const bm = JSON.parse(fs.readFileSync(file, 'utf-8'));
            if (bm.description && bm.description.length > 50) {
                bm.intro = bm.description;
            }
            bm.highMeaning = meanings.high;
            bm.lowMeaning = meanings.low;

            fs.writeFileSync(file, JSON.stringify(bm, null, 2), 'utf-8');
            updated++;
        }
    }
    console.log(`✅ LOTE 1 COMPLETO: Se actualizaron con éxito ${updated} biomarcadores locales.`);
} catch (e) {
    console.error("Error al ejecutar el lote: ", e);
}
