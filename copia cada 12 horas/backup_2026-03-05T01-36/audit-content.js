const fs = require('fs');
const s = JSON.parse(fs.readFileSync('src/data/studies.json', 'utf-8'));
let full = 0, partial = 0, basic = 0;
const issues = [];

for (const st of s) {
    const has = {
        desc: !!(st.description && st.description.length > 200),
        what: !!(st.whatIsIt && st.whatIsIt.length > 50),
        detect: !!(Array.isArray(st.whatDoesItDetect) && st.whatDoesItDetect.length >= 3),
        prep: !!(Array.isArray(st.detailedPreparation) && st.detailedPreparation.length >= 3),
        benefits: !!(Array.isArray(st.benefits) && st.benefits.length >= 3),
        faqs: !!(Array.isArray(st.faqs) && st.faqs.length >= 3)
    };
    const score = Object.values(has).filter(Boolean).length;
    if (score === 6) { full++; }
    else {
        if (score >= 3) partial++; else basic++;
        issues.push({ name: st.name, score, missing: Object.entries(has).filter(([k, v]) => !v).map(([k]) => k).join(', ') });
    }
}

console.log('Total: ' + s.length);
console.log('V2 COMPLETO (6/6): ' + full);
console.log('V2 PARCIAL (3-5): ' + partial);
console.log('BASICO (0-2): ' + basic);
console.log('');
issues.forEach((i, idx) => console.log((idx + 1) + '. [' + i.score + '/6] ' + i.name + ' -- Falta: ' + i.missing));
