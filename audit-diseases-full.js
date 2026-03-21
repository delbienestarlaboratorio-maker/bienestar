const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'data', 'diseases-fragments');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

let total = files.length;
let ok = 0;
let bad = 0;
let errors = {};
let badDetails = [];

for (const file of files) {
    try {
        const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
        let p = [];

        // Check fields expected from the prompt
        if (!data.slug) p.push('missing_slug');
        if (!data.name) p.push('missing_name');
        if (!data.cie10) p.push('missing_cie10');
        if (!data.category || data.category.length < 5) p.push('short_category');
        if (!data.shortDescription || data.shortDescription.length < 30) p.push('short_shortDescription');
        if (!data.intro || data.intro.length < 100) p.push('short_intro');

        // Arrays
        if (!data.symptoms || !Array.isArray(data.symptoms) || data.symptoms.length < 2) p.push('few_symptoms');
        if (!data.causes || !Array.isArray(data.causes) || data.causes.length < 2) p.push('few_causes');
        if (!data.redFlags || !Array.isArray(data.redFlags) || data.redFlags.length < 1) p.push('few_redFlags');
        if (!data.tests || !Array.isArray(data.tests) || data.tests.length < 1) p.push('few_tests');
        if (!data.prevention || !Array.isArray(data.prevention) || data.prevention.length < 1) p.push('few_prevention');

        // Specific check for placeholder content
        const strData = JSON.stringify(data).toLowerCase();
        if (strData.includes("lorem ipsum") || strData.includes("contenido de ejemplo") || strData.includes("ejemplo de")) {
            p.push('placeholder_content');
        }

        if (p.length > 0) {
            bad++;
            p.forEach(err => errors[err] = (errors[err] || 0) + 1);
            badDetails.push({ slug: file.replace('.json', ''), issues: p });
        } else {
            ok++;
        }
    } catch (e) {
        bad++;
        errors['parse_error'] = (errors['parse_error'] || 0) + 1;
        badDetails.push({ slug: file.replace('.json', ''), issues: ['parse_error'] });
    }
}

console.log('=== AUDITORIA PROFUNDA DE ENFERMEDADES ===');
console.log(`Total de archivos analizados: ${total}`);
console.log(`✅ Archivos PERFECTOS (cumplen todo el prompt): ${ok}`);
console.log(`❌ Archivos con DETALLES o FALTANTES: ${bad}`);
console.log('\n--- Desglose de Problemas ---');
Object.entries(errors).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(` - ${k}: ${v} archivos`));

fs.writeFileSync('diseases-audit-results.json', JSON.stringify({
    total,
    ok,
    bad,
    errors,
    badDetails
}, null, 2));

console.log('\nSe ha guardado el reporte detallado en: diseases-audit-results.json');
