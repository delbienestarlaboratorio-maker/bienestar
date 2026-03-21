const fs = require('fs');
const path = require('path');

const massivePath = path.join(__dirname, 'src/data/symptoms-massive.json');
const manifestPath = path.join(__dirname, 'src/data/symptoms.json');

const massive = JSON.parse(fs.readFileSync(massivePath, 'utf8'));

// The manifest only needs the slug and the name for fallback
const manifest = massive.map(s => ({
    slug: s.slug,
    name: s.name
}));

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`\u2705 Manifest \`symptoms.json\` actualizado con ${manifest.length} entradas SSG.`);
