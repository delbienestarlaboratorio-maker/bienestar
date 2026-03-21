const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src/data/symptoms-fragments');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

const allData = files.map(file => {
    return JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
});

// Sort them by alphabetically or just save them
fs.writeFileSync(path.join(__dirname, 'src/data/symptoms-massive.json'), JSON.stringify(allData, null, 2));

console.log(`✅ Compilados exitosamente ${allData.length} síntomas en symptoms-massive.json`);
