const fs = require('fs');
const path = require('path');

const fragmentsDir = path.join(__dirname, 'src', 'data', 'symptoms-fragments');
const qualityPath = path.join(__dirname, 'src', 'data', 'symptoms-quality.json');
const manifestPath = path.join(__dirname, 'src', 'data', 'symptoms.json');

// Load clean quality DB
const quality = JSON.parse(fs.readFileSync(qualityPath, 'utf8'));
const goodSlugs = new Set(quality.map(s => s.slug));

console.log(`✅ Síntomas de calidad (Gemini): ${quality.length}`);

// Delete ALL fragment files
const allFiles = fs.readdirSync(fragmentsDir);
let deleted = 0;
for (const f of allFiles) {
    fs.unlinkSync(path.join(fragmentsDir, f));
    deleted++;
}
console.log(`🗑️  Borrados ${deleted} fragmentos antiguos (incluyendo corruptos)`);

// Re-write ONLY the 134 clean ones
let written = 0;
for (const s of quality) {
    fs.writeFileSync(path.join(fragmentsDir, s.slug + '.json'), JSON.stringify(s, null, 2));
    written++;
}
console.log(`💾 Escritos ${written} fragmentos limpios de Gemini`);

// Update manifest (symptoms.json)
const manifest = quality.map(s => ({
    slug: s.slug,
    name: s.name,
    medicalName: s.medicalName,
    cie10: s.cie10,
    intro: s.intro ? s.intro.substring(0, 110) : '',
}));
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`📋 Manifiesto symptoms.json actualizado con ${manifest.length} entradas`);

console.log('\n🎉 LIMPIEZA COMPLETA. Solo descripciones Gemini en producción.');
