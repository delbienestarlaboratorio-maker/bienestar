/**
 * FRAGMENT MASSIVE JSON INTO INDIVIDUAL FILES
 * =============================================
 * Splits the 36MB symptoms-massive.json into individual JSON files per slug
 * so that Next.js can load only the one it needs per page, avoiding OOM.
 */
const fs = require('fs');
const path = require('path');

const massivePath = path.join(__dirname, 'src', 'data', 'symptoms-massive.json');
const fragmentDir = path.join(__dirname, 'src', 'data', 'symptoms-fragments');

// Create fragments directory
if (!fs.existsSync(fragmentDir)) {
    fs.mkdirSync(fragmentDir, { recursive: true });
}

const massive = JSON.parse(fs.readFileSync(massivePath, 'utf8'));
console.log(`📊 Fragmenting ${massive.length} entries...`);

let count = 0;
for (const symptom of massive) {
    if (!symptom.slug) continue;
    const filePath = path.join(fragmentDir, `${symptom.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(symptom));
    count++;
}

console.log(`✅ Created ${count} individual fragment files in src/data/symptoms-fragments/`);
console.log(`📁 Each file is ~1-3 KB, loadable independently by Next.js`);
