/**
 * upload-kv-bulk.js — Bulk upload symptom/disease fragments to Cloudflare KV
 * 
 * Uses wrangler kv bulk put which accepts up to 10,000 entries per call.
 * We split into chunks of 5,000 to stay safe.
 * 
 * Run: node upload-kv-bulk.js symptoms
 * Run: node upload-kv-bulk.js diseases
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG = {
    symptoms: {
        dir: path.join(__dirname, 'src', 'data', 'symptoms-fragments'),
        namespaceId: 'cfe822214b194fc99021e294f460babc',
        name: 'SYMPTOMS_KV',
    },
    diseases: {
        dir: path.join(__dirname, 'src', 'data', 'diseases-fragments'),
        namespaceId: '08617170986e40c097e149eb8825ed0f',
        name: 'DISEASES_KV',
    },
};

const CHUNK_SIZE = 5000; // max entries per wrangler bulk put

const type = process.argv[2];
if (!type || !CONFIG[type]) {
    console.log('Usage: node upload-kv-bulk.js <symptoms|diseases>');
    process.exit(1);
}

const config = CONFIG[type];
const files = fs.readdirSync(config.dir).filter(f => f.endsWith('.json'));

console.log(`\n╔══════════════════════════════════════════════════╗`);
console.log(`║  📤 Cloudflare KV Bulk Upload                    ║`);
console.log(`╠══════════════════════════════════════════════════╣`);
console.log(`║  Target: ${config.name.padEnd(38)}║`);
console.log(`║  Files:  ${String(files.length).padEnd(38)}║`);
console.log(`║  Chunks: ${String(Math.ceil(files.length / CHUNK_SIZE)).padEnd(38)}║`);
console.log(`╚══════════════════════════════════════════════════╝\n`);

const startTime = Date.now();
let uploaded = 0;

for (let i = 0; i < files.length; i += CHUNK_SIZE) {
    const chunk = files.slice(i, i + CHUNK_SIZE);
    const chunkNum = Math.floor(i / CHUNK_SIZE) + 1;
    const totalChunks = Math.ceil(files.length / CHUNK_SIZE);

    console.log(`  Chunk ${chunkNum}/${totalChunks} — ${chunk.length} entries...`);

    // Build the KV pairs array
    const pairs = [];
    for (const file of chunk) {
        const slug = file.replace('.json', '');
        try {
            const content = fs.readFileSync(path.join(config.dir, file), 'utf8');
            // Validate it's valid JSON
            JSON.parse(content);
            pairs.push({ key: slug, value: content });
        } catch (e) {
            console.log(`    ⚠️  Skipping ${slug}: ${e.message.substring(0, 40)}`);
        }
    }

    // Write temp file for bulk put
    const tmpFile = path.join(__dirname, `_kv_bulk_tmp_${chunkNum}.json`);
    fs.writeFileSync(tmpFile, JSON.stringify(pairs), 'utf8');

    try {
        execSync(
            `wrangler kv bulk put "${tmpFile}" --namespace-id ${config.namespaceId}`,
            { cwd: __dirname, stdio: 'pipe', timeout: 300000 }
        );
        uploaded += pairs.length;
        console.log(`    ✅ ${pairs.length} uploaded (total: ${uploaded})`);
    } catch (e) {
        console.log(`    ❌ Error: ${e.message.substring(0, 80)}`);
    }

    // Cleanup temp file
    try { fs.unlinkSync(tmpFile); } catch { }
}

const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
console.log(`\n✅ Done! ${uploaded}/${files.length} uploaded in ${elapsed} min\n`);
