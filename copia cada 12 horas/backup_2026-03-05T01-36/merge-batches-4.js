const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'src', 'data', 'symptoms-massive.json');
let db = [];
if (fs.existsSync(dbPath)) {
    try { db = JSON.parse(fs.readFileSync(dbPath, 'utf8')); } catch (e) { }
}

const batchFiles = ['symptoms-batch-10.json', 'symptoms-batch-11.json', 'symptoms-batch-12.json'];
let added = 0;

for (const bf of batchFiles) {
    const fullPath = path.join(__dirname, 'src', 'data', bf);
    if (fs.existsSync(fullPath)) {
        try {
            const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
            for (const item of data) {
                if (!db.find(x => x.slug === item.slug)) {
                    db.push(item);
                    added++;
                }
            }
        } catch (e) {
            console.error('Error parsing', bf, e);
        }
    }
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`✅ Base de datos actualizada: ${db.length} padecimientos enciclopédicos totales (Se agregaron ${added} nuevos de los bloques 10, 11 y 12).`);
