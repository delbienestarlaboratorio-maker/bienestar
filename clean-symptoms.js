const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'src', 'data', 'symptoms-quality.json');
let db = [];
try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
} catch (e) {
    console.error("Error leyendo DB:", e);
    process.exit(1);
}

const strangeWords = ['enorme', 'letárgico', 'incesante', 'fiero', 'purísimo', 'asfíctico', 'letargo', 'gigante', 'colosal', 'asombrosamente'];

const isBad = (s) => {
    if (!s.intro) return true;
    let score = 0;
    const introLower = s.intro.toLowerCase();

    for (const w of strangeWords) {
        if (introLower.includes(w)) score++;
    }

    // Check for random single letters: " D H p O X V "
    if (s.intro.match(/(?:\b[a-zA-Z]\b\s+){2,}/)) score += 2;

    return score >= 2;
};

const initialLength = db.length;
const goodDb = db.filter(s => !isBad(s));
const badCount = initialLength - goodDb.length;

console.log(`Borrando ${badCount} síntomas con alucinaciones de la base de datos...`);

fs.writeFileSync(dbPath, JSON.stringify(goodDb, null, 2));
console.log(`Base de datos limpiada guardada. Total: ${goodDb.length} síntomas válidos.`);

// Also sync symptoms.json so UI reflects it immediately
const masterPath = path.join(__dirname, 'src', 'data', 'symptoms.json');
const slimData = goodDb.map(s => ({
    slug: s.slug,
    name: s.name,
    medicalName: s.medicalName,
    cie10: s.cie10,
    intro: s.intro
}));
fs.writeFileSync(masterPath, JSON.stringify(slimData, null, 2));
console.log(`Sincronizado symptoms.json con ${slimData.length} registros limpios.`);
