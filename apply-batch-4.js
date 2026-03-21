const fs = require('fs');
const path = require('path');

const FRAGMENTS_DIR = path.join(__dirname, 'src', 'data', 'biomarkers-fragments');
const batchDataFile = path.join(__dirname, 'batch4.json');

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

            if (bm.highMeaning.includes(' contains ') || bm.highMeaning.includes(' Indicates ') || bm.highMeaning.includes(' The ') || bm.lowMeaning.includes(' From ') || bm.lowMeaning.includes(' To ')) {
                bm.highMeaning = 'Un resultado por encima de los valores de referencia puede indicar diversas condiciones clínicas o fisiológicas. Le recomendamos consultar a su médico para una interpretación precisa basada en su historial clínico completo.';
                bm.lowMeaning = 'Un resultado por debajo del rango normal requiere evaluación médica para identificar su causa exacta. Por favor, acuda a consulta médica para que un profesional de la salud evalúe este resultado.';
            }

            fs.writeFileSync(file, JSON.stringify(bm, null, 2), 'utf-8');
            updated++;
        }
    }
    console.log(`✅ LOTE 4 COMPLETO: Se actualizaron con éxito ${updated} biomarcadores locales.`);
} catch (e) {
    console.error("Error al ejecutar el lote: ", e);
}
