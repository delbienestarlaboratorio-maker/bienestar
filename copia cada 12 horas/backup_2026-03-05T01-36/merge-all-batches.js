const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const massivePath = path.join(dataDir, 'symptoms-massive.json');
const manifestPath = path.join(dataDir, 'symptoms.json');

let massiveDB = fs.existsSync(massivePath) ? JSON.parse(fs.readFileSync(massivePath, 'utf8')) : [];
let manifestDB = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : [];

// Find all batch files from 39 to 60
const files = fs.readdirSync(dataDir).filter(f => f.startsWith('symptoms-batch-') && f.endsWith('.json'));

let added = 0;

for (const file of files) {
    const batchData = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));

    for (const symptom of batchData) {
        // Prevent duplicates
        if (!massiveDB.find(s => s.slug === symptom.slug || s.name === symptom.name)) {
            massiveDB.push(symptom);
            added++;

            // Add to manifest
            manifestDB.push({
                id: manifestDB.length + 1,
                slug: symptom.slug,
                name: symptom.name,
                description: symptom.intro ? symptom.intro.substring(0, 120) + '...' : ''
            });
        }
    }
}

fs.writeFileSync(massivePath, JSON.stringify(massiveDB, null, 2));
fs.writeFileSync(manifestPath, JSON.stringify(manifestDB, null, 2));

console.log(`✅ Fusión completa. Se agregaron ${added} síntomas nuevos.`);
console.log(`Total en symptoms-massive.json: ${massiveDB.length}`);
console.log(`Total en symptoms.json: ${manifestDB.length}`);
