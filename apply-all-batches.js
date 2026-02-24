/**
 * APPLY ALL MEDICAL CONTENT BATCHES TO studies.json
 * 
 * This script reads ALL medical_content_batch_*.json, content_v2_auto_batch_*.json,
 * content_v2_batch_*_part*.json, and v2_batch_*.json files and applies them
 * to the main studies.json file.
 * 
 * Matching is done by BOTH name and id to maximize matches.
 * A backup is always created before any changes.
 * 
 * Usage: node apply-all-batches.js
 */
const fs = require('fs');
const path = require('path');

const studiesPath = path.join(__dirname, 'src', 'data', 'studies.json');

// 1. Create backup FIRST
const backupPath = studiesPath + '.backup_before_bulk_apply_' + Date.now();
fs.copyFileSync(studiesPath, backupPath);
console.log('📋 Backup creado:', path.basename(backupPath));

// 2. Load studies.json
const studies = JSON.parse(fs.readFileSync(studiesPath, 'utf-8'));
console.log(`📊 studies.json tiene ${studies.length} estudios\n`);

// 3. Find ALL batch files
const batchPatterns = [
    /^medical_content_batch_\d+[a-z]?\.json$/,
    /^content_v2_auto_batch_\d+.*\.json$/,
    /^content_v2_batch_\d+.*\.json$/,
    /^v2_batch_\d+\.json$/,
    /^content_v2_bhc_fix\.json$/,
    /^weak_content_batch.*\.json$/,
];

const allFiles = fs.readdirSync(__dirname);
const batchFiles = allFiles.filter(f => batchPatterns.some(p => p.test(f))).sort();

console.log(`📁 Encontrados ${batchFiles.length} archivos batch:\n`);
batchFiles.forEach(f => console.log(`   - ${f}`));
console.log('');

// 4. Build a master content map from ALL batch files
// Key: normalized study name -> content object
// We also keep id-based map for fallback matching
const contentByName = new Map();
const contentById = new Map();
let totalBatchStudies = 0;

for (const file of batchFiles) {
    try {
        const content = JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf-8'));
        if (!Array.isArray(content)) continue;

        for (const item of content) {
            if (!item) continue;
            totalBatchStudies++;

            // Store by name (normalized)
            if (item.name) {
                const normName = item.name.trim().toUpperCase();
                // Keep the LATEST/BEST version (longer description wins)
                const existing = contentByName.get(normName);
                if (!existing || (item.description && (!existing.description || item.description.length > existing.description.length))) {
                    contentByName.set(normName, item);
                }
            }

            // Store by id
            if (item.id) {
                const id = String(item.id);
                const existing = contentById.get(id);
                if (!existing || (item.description && (!existing.description || item.description.length > existing.description.length))) {
                    contentById.set(id, item);
                }
            }
        }
    } catch (e) {
        console.error(`⚠️ Error leyendo ${file}: ${e.message}`);
    }
}

console.log(`\n📊 Total de entradas en batches: ${totalBatchStudies}`);
console.log(`📊 Estudios únicos por nombre: ${contentByName.size}`);
console.log(`📊 Estudios únicos por ID: ${contentById.size}\n`);

// 5. Apply content to each study in studies.json
let updated = 0;
let alreadyGood = 0;
let noMatch = 0;

for (const study of studies) {
    // Try to find matching content: first by name, then by id
    const normName = study.name.trim().toUpperCase();
    let content = contentByName.get(normName);

    if (!content && study.id) {
        content = contentById.get(String(study.id));
    }

    if (!content) {
        noMatch++;
        continue;
    }

    // Apply fields - only upgrade, never downgrade
    let changed = false;

    // Description: only replace if new one is longer/better
    if (content.description && content.description.length > 100) {
        if (!study.description || study.description.length < content.description.length) {
            study.description = content.description;
            changed = true;
        }
    }

    // whatIsIt
    if (content.whatIsIt && content.whatIsIt.length > 30) {
        if (!study.whatIsIt || study.whatIsIt.length < content.whatIsIt.length) {
            study.whatIsIt = content.whatIsIt;
            changed = true;
        }
    }

    // preparation
    if (content.preparation && content.preparation.length > 10) {
        if (!study.preparation || study.preparation === 'Consulte indicaciones.' || study.preparation.length < content.preparation.length) {
            study.preparation = content.preparation;
            changed = true;
        }
    }

    // whatDoesItDetect (array)
    if (Array.isArray(content.whatDoesItDetect) && content.whatDoesItDetect.length >= 3) {
        if (!Array.isArray(study.whatDoesItDetect) || study.whatDoesItDetect.length < content.whatDoesItDetect.length) {
            study.whatDoesItDetect = content.whatDoesItDetect;
            changed = true;
        }
    }

    // detailedPreparation (array of objects)
    if (Array.isArray(content.detailedPreparation) && content.detailedPreparation.length >= 3) {
        if (!Array.isArray(study.detailedPreparation) || study.detailedPreparation.length < content.detailedPreparation.length) {
            study.detailedPreparation = content.detailedPreparation;
            changed = true;
        }
    }

    // faqs (array of objects)
    if (Array.isArray(content.faqs) && content.faqs.length >= 3) {
        if (!Array.isArray(study.faqs) || study.faqs.length < content.faqs.length) {
            study.faqs = content.faqs;
            changed = true;
        }
    }

    // benefits (array)
    if (Array.isArray(content.benefits) && content.benefits.length >= 3) {
        if (!Array.isArray(study.benefits) || study.benefits.length < content.benefits.length) {
            study.benefits = content.benefits;
            changed = true;
        }
    }

    if (changed) {
        updated++;
    } else {
        alreadyGood++;
    }
}

// 6. Save
fs.writeFileSync(studiesPath, JSON.stringify(studies, null, 2), 'utf-8');

// 7. Final audit
let v2Complete = 0, v2Partial = 0, basic = 0;
for (const st of studies) {
    const has = [
        st.description && st.description.length > 200,
        st.whatIsIt && st.whatIsIt.length > 50,
        Array.isArray(st.whatDoesItDetect) && st.whatDoesItDetect.length >= 3,
        Array.isArray(st.detailedPreparation) && st.detailedPreparation.length >= 3,
        Array.isArray(st.benefits) && st.benefits.length >= 3,
        Array.isArray(st.faqs) && st.faqs.length >= 3
    ].filter(Boolean).length;

    if (has >= 5) v2Complete++;
    else if (has >= 3) v2Partial++;
    else basic++;
}

console.log('═══════════════════════════════════════');
console.log('  RESULTADO DE APLICACIÓN MASIVA');
console.log('═══════════════════════════════════════');
console.log(`✅ Estudios actualizados:    ${updated}`);
console.log(`👍 Ya tenían buen contenido: ${alreadyGood}`);
console.log(`❌ Sin match en batches:     ${noMatch}`);
console.log('');
console.log('═══════════════════════════════════════');
console.log('  AUDITORÍA FINAL de studies.json');
console.log('═══════════════════════════════════════');
console.log(`📊 Total estudios:           ${studies.length}`);
console.log(`🟢 V2 COMPLETO (5-6/6):      ${v2Complete}`);
console.log(`🟡 V2 PARCIAL (3-4/6):       ${v2Partial}`);
console.log(`🔴 BÁSICO (0-2/6):           ${basic}`);
console.log(`📈 Porcentaje V2 completo:   ${(v2Complete / studies.length * 100).toFixed(1)}%`);
console.log('═══════════════════════════════════════');
console.log(`\n💾 Backup guardado en: ${path.basename(backupPath)}`);
