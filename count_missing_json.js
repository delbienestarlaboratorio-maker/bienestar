const fs = require('fs');
const studies = JSON.parse(fs.readFileSync('./src/data/studies.json', 'utf-8'));
let count = 0;
for (const s of studies) {
    if (!s.description || s.description.length < 100 || s.description.includes('proporciona información diagnóstica específica') || s.description.includes('analiza componentes específicos')) {
        count++;
    }
}
console.log('Estudios con descripcion debil en studies.json:', count);
