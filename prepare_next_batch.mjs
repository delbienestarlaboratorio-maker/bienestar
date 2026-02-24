import fs from 'fs';

const BATCH_SIZE = 50;
const BATCH_NUM = process.argv[2] || 'next';

// 1. Read all studies from the text file
const allStudiesContent = fs.readFileSync('all-studies-list.txt', 'utf-8');
const allStudies = [];
const lines = allStudiesContent.split('\n');
lines.forEach(line => {
    const match = line.trim().match(/^(\d+)\s*\|\s*([^|]+)/);
    if (match) {
        allStudies.push({ id: match[1].trim(), name: match[2].trim() });
    }
});

// 2. Read all processed studies from JSON files
const processedIds = new Set();
const files = fs.readdirSync('.').filter(f => f.startsWith('medical_content_batch_') && f.endsWith('.json'));
files.forEach(file => {
    try {
        const content = JSON.parse(fs.readFileSync(file, 'utf-8'));
        if (Array.isArray(content)) {
            content.forEach(s => { if (s.id) processedIds.add(String(s.id)); });
        }
    } catch (e) { console.error(`Error reading ${file}: ${e.message}`); }
});

// 3. Find pending studies
const pendingStudies = allStudies.filter(s => !processedIds.has(s.id));
console.log(`Total: ${allStudies.length} | Processed: ${processedIds.size} | Pending: ${pendingStudies.length}`);

// 4. Select next batch
const batch = pendingStudies.slice(0, BATCH_SIZE);
if (batch.length === 0) { console.log('✅ ALL STUDIES PROCESSED!'); process.exit(0); }

console.log(`\nBatch ${BATCH_NUM}: ${batch.length} studies`);
console.log('---');
batch.forEach(s => console.log(`- ID: ${s.id}, Name: ${s.name}`));
