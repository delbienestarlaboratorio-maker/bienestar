const fs = require('fs');

const txt = fs.readFileSync('cie10.csv', 'utf-8');
const lines = txt.split('\n');

let megaPadecimientos = [];
let count = 0;

for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    // D430,C00-D49,D37-D48,D43,,,"Tumor de comportamiento incierto o desconocido del encéfalo, supratentorial",3,icdcode.info
    // Split correctly by preserving content within quotes
    let inQuotes = false;
    let parts = [];
    let currentPart = "";

    for (let char of line) {
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            parts.push(currentPart);
            currentPart = "";
        } else {
            currentPart += char;
        }
    }
    parts.push(currentPart);

    const code = parts[0];
    const level = Number(parts[7]); // The 8th column is usually the level
    const description = parts[6] ? parts[6].replace(/^"|"$/g, '').trim() : '';

    // If the level is 3 or 4, it means it's a specific disease (e.g. A000 or A00.0)
    if (level >= 3 && description && code.length >= 3) {
        megaPadecimientos.push({
            code: code.trim(),
            description: description,
            category: parts[3] || parts[2] || parts[1] // The parent codes
        });
        count++;
    } else if (level === 2 && description && megaPadecimientos.length < 10000) {
        // Also grab level 2 if needed (these are 3-letter roots like A00)
        megaPadecimientos.push({
            code: code.trim(),
            description: description,
            category: parts[1]
        });
        count++;
    }
}

// Remove duplicates based on code
const uniqueMap = new Map();
for (const item of megaPadecimientos) {
    if (!uniqueMap.has(item.code)) {
        uniqueMap.set(item.code, item);
    }
}
const finalArray = Array.from(uniqueMap.values());

console.log(`Successfully parsed ${finalArray.length} ultra-specific diseases.`);
fs.writeFileSync('src/data/todas-enfermedades-cie10.json', JSON.stringify(finalArray, null, 2));

