import { readFileSync, readdirSync } from 'fs';

// Count all studies in batch files
const batchFiles = readdirSync('.').filter(f => f.startsWith('medical_content_batch_') && f.endsWith('.json'));

let totalStudies = 0;
const studiesSet = new Set();

batchFiles.forEach(file => {
    try {
        const content = JSON.parse(readFileSync(file, 'utf-8'));
        if (Array.isArray(content)) {
            content.forEach(study => {
                if (study.id) {
                    studiesSet.add(study.id);
                }
            });
            totalStudies += content.length;
        }
    } catch (e) {
        console.error(`Error reading ${file}:`, e.message);
    }
});

console.log('📊 RESUMEN DE CONTENIDO MÉDICO:');
console.log('='.repeat(50));
console.log(`Total de archivos batch: ${batchFiles.length}`);
console.log(`Total de estudios procesados: ${totalStudies}`);
console.log(`Estudios únicos: ${studiesSet.size}`);
console.log('');
console.log('Archivos batch encontrados:');
batchFiles.sort().forEach(f => console.log(`  - ${f}`));
