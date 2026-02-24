/**
 * Apply V2 batch content to studies.json
 * Usage: node apply-v2-batch.js v2_batch_01.json
 */
const fs = require('fs');
const path = require('path');

const batchFile = process.argv[2];
if (!batchFile) { console.error('Usage: node apply-v2-batch.js <batch_file.json>'); process.exit(1); }

const studiesPath = path.join(__dirname, 'src', 'data', 'studies.json');
const studies = JSON.parse(fs.readFileSync(studiesPath, 'utf-8'));
const batch = JSON.parse(fs.readFileSync(batchFile, 'utf-8'));

let updated = 0;
for (const item of batch) {
    const study = studies.find(s => s.name === item.name);
    if (!study) {
        console.log('❌ NOT FOUND:', item.name);
        continue;
    }
    // Apply all fields from batch
    if (item.description) study.description = item.description;
    if (item.whatIsIt) study.whatIsIt = item.whatIsIt;
    if (item.whatDoesItDetect) study.whatDoesItDetect = item.whatDoesItDetect;
    if (item.detailedPreparation) study.detailedPreparation = item.detailedPreparation;
    if (item.benefits) study.benefits = item.benefits;
    if (item.faqs) study.faqs = item.faqs;
    updated++;
    console.log('✅ Updated:', item.name, '(desc:', study.description.length, 'chars)');
}

fs.writeFileSync(studiesPath, JSON.stringify(studies, null, 2), 'utf-8');
console.log('\nTotal updated:', updated, '/', batch.length);
