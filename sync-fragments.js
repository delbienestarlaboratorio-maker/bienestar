const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'src', 'data', 'symptoms-quality.json');
const fragmentsDir = path.join(__dirname, 'src', 'data', 'symptoms-fragments');

let db = [];
try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
} catch (e) {
    console.error(e);
    process.exit(1);
}

if (!fs.existsSync(fragmentsDir)) fs.mkdirSync(fragmentsDir, { recursive: true });

let count = 0;
for (const s of db) {
    const fragPath = path.join(fragmentsDir, s.slug + '.json');
    fs.writeFileSync(fragPath, JSON.stringify(s, null, 2));
    count++;
}
console.log(`Se sobreescribieron ${count} fragmentos individuales sincronizados con la DB limpia.`);
