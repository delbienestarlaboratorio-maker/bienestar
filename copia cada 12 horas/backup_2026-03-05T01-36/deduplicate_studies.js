// Script Node.js para eliminar duplicados de studies.ts
const fs = require('fs');
const path = require('path');

// Leer el archivo original
const filePath = path.join(__dirname, 'src', 'data', 'studies.ts');
const content = fs.readFileSync(filePath, 'utf-8');

// Crear backup
const backupPath = `${filePath}.backup.${new Date().toISOString().replace(/[:.]/g, '-')}`;
fs.writeFileSync(backupPath, content, 'utf-8');
console.log(`✓ Backup creado: ${backupPath}`);

// Extraer el array de estudios usando regex
const arrayMatch = content.match(/export const studies: Study\[\] = \[([\s\S]*?)\];/);
if (!arrayMatch) {
    console.error('❌ No se pudo encontrar el array de estudios');
    process.exit(1);
}

// Evaluar el array (convertir de TypeScript a JavaScript)
const arrayText = '[' + arrayMatch[1] + ']';
let studies;
try {
    // Reemplazar comillas simples por dobles para eval
    const jsText = arrayText.replace(/'/g, '"');
    studies = JSON.parse(jsText);
} catch (e) {
    console.error('❌ Error al parsear el array:', e.message);
    process.exit(1);
}

console.log(`Total de estudios originales: ${studies.length}`);

// Agrupar por nombre
const groups = {};
studies.forEach(study => {
    if (!groups[study.name]) {
        groups[study.name] = [];
    }
    groups[study.name].push(study);
});

// Encontrar duplicados
const duplicates = Object.entries(groups).filter(([name, items]) => items.length > 1);
console.log(`Estudios con duplicados: ${duplicates.length}`);
console.log(`Total de entradas duplicadas: ${duplicates.reduce((sum, [_, items]) => sum + items.length - 1, 0)}`);

// Seleccionar mejores versiones
const toRemoveIds = new Set();
duplicates.forEach(([name, items]) => {
    // Calcular score para cada estudio
    const scored = items.map(study => {
        let score = 0;
        if (study.price && study.price.regular > 0) score += 100;
        if (study.description) score += 20;
        if (study.preparation) score += 20;
        if (study.turnaroundTime) score += 10;
        score += (10000 - parseInt(study.id)) / 100;
        return { study, score };
    });

    // Ordenar por score
    scored.sort((a, b) => b.score - a.score);
    const best = scored[0].study;

    console.log(`\n${name} (${items.length} veces):`);
    scored.forEach(({ study, score }) => {
        const status = study.id === best.id ? 'MANTENER' : 'ELIMINAR';
        const price = study.price ? study.price.regular : 0;
        console.log(`  ${status}: ID ${study.id} ($${price}, score: ${score.toFixed(1)})`);
        if (study.id !== best.id) {
            toRemoveIds.add(study.id);
        }
    });
});

// Filtrar estudios
const uniqueStudies = studies.filter(s => !toRemoveIds.has(s.id));
console.log(`\nTotal después de deduplicación: ${uniqueStudies.length}`);
console.log(`Eliminados: ${toRemoveIds.size} duplicados`);

// Reconstruir el archivo
// Convertir el array a string TypeScript
const newArrayText = JSON.stringify(uniqueStudies, null, 2)
    .replace(/"/g, "'")  // Usar comillas simples
    .replace(/\n/g, '\r\n');  // Usar CRLF para Windows

// Reemplazar en el contenido original
const beforeArray = content.substring(0, arrayMatch.index + 'export const studies: Study[] = ['.length);
const afterArray = content.substring(arrayMatch.index + arrayMatch[0].length - 2);  // -2 para no incluir ];
const newContent = beforeArray + '\r\n' + newArrayText.substring(1, newArrayText.length - 1) + '\r\n' + afterArray;

// Guardar
fs.writeFileSync(filePath, newContent, 'utf-8');
console.log(`\n✓ Archivo actualizado: ${filePath}`);
console.log(`✅ Proceso completado`);
