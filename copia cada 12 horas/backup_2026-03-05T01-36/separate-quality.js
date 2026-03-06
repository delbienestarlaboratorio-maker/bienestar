/**
 * QUALITY CONTENT SEPARATOR
 * ==========================
 * Separates quality hand-written symptom pages from template/generic ones.
 * - Quality pages → symptoms-quality.json (used for individual SSG pages)
 * - Full catalog → todas-enfermedades-cie10.json (used for A-Z directory)
 */
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const massivePath = path.join(dataDir, 'symptoms-massive.json');
const qualityPath = path.join(dataDir, 'symptoms-quality.json');
const manifestPath = path.join(dataDir, 'symptoms.json');
const fragmentDir = path.join(dataDir, 'symptoms-fragments');

const massive = JSON.parse(fs.readFileSync(massivePath, 'utf8'));

// Identify template/generic content by their intro patterns
const templatePatterns = [
    'es una condición médica clasificada internacionalmente',
    'es una manifestación frecuente y crítica',
    'es una patología o condición documentada',
    'Clínicamente, el síntoma de',
];

const qualityPages = [];
const templatePages = [];

for (const symptom of massive) {
    const isTemplate = templatePatterns.some(pattern =>
        symptom.intro && symptom.intro.includes(pattern)
    );

    if (isTemplate) {
        templatePages.push(symptom);
    } else {
        qualityPages.push(symptom);
    }
}

console.log(`📊 Quality pages (unique content): ${qualityPages.length}`);
console.log(`📄 Template pages (generic): ${templatePages.length}`);

// Save quality-only database
fs.writeFileSync(qualityPath, JSON.stringify(qualityPages, null, 2));
console.log(`✅ Saved ${qualityPages.length} quality pages to symptoms-quality.json`);

// Rebuild manifest with ONLY quality pages (for generateStaticParams)
const manifest = qualityPages.map((symp, idx) => ({
    id: idx + 1,
    slug: symp.slug,
    name: symp.name,
    description: (symp.intro || '').substring(0, 120) + '...'
}));
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`✅ Updated symptoms.json manifest with ${manifest.length} quality-only entries`);

// Rebuild fragment files for quality pages only
// Clean old fragments first
if (fs.existsSync(fragmentDir)) {
    const oldFiles = fs.readdirSync(fragmentDir);
    for (const f of oldFiles) {
        fs.unlinkSync(path.join(fragmentDir, f));
    }
} else {
    fs.mkdirSync(fragmentDir, { recursive: true });
}

for (const symp of qualityPages) {
    fs.writeFileSync(
        path.join(fragmentDir, `${symp.slug}.json`),
        JSON.stringify(symp)
    );
}
console.log(`✅ Created ${qualityPages.length} fragment files (quality only)`);

console.log(`\n🎯 Result: Only ${qualityPages.length} individual pages will be built.`);
console.log(`📚 The 14,000+ diseases will appear in the A-Z directory page instead.`);
