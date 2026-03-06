import fs from 'fs';
import path from 'path';

const d = JSON.parse(fs.readFileSync('./src/data/biomarkers.json'));
let missing = [];

for (let b of d) {
    const p = `./src/data/biomarkers-fragments/${b.slug}.json`;
    if (fs.existsSync(p)) {
        const c = JSON.parse(fs.readFileSync(p));
        if (typeof c.intro !== 'string' || c.intro.includes("Pendiente de generación") || c.intro.includes("Contenido pendiente")) {
            missing.push({ slug: b.slug, panel: b.panel, name: b.name });
            if (missing.length === 15) break; // Only take 15
        }
    }
}

fs.writeFileSync('missing-batch-4.json', JSON.stringify(missing, null, 2));
console.log('Written to missing-batch-4.json');
