const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
const fs = require('fs');
neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require' });

async function main() {
    const { rows } = await pool.query(`
        SELECT id, name FROM studies 
        WHERE is_active = true 
        ORDER BY name
    `);

    console.log(`Total estudios activos: ${rows.length}`);
    console.log(`Batches de 50: ${Math.ceil(rows.length / 50)}`);

    // Write full list
    const lines = rows.map(r => `ID: ${r.id} — ${r.name}`);
    fs.writeFileSync('active_studies_list.txt', lines.join('\n'), 'utf-8');
    console.log('Lista guardada en active_studies_list.txt');

    // Write batches
    const BATCH_SIZE = 50;
    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
        const batchNum = Math.floor(i / BATCH_SIZE) + 1;
        const batch = rows.slice(i, i + BATCH_SIZE);
        const batchLines = batch.map(r => `ID: ${r.id} — ${r.name}`);
        fs.writeFileSync(`batch_v2_${String(batchNum).padStart(2, '0')}_studies.txt`, batchLines.join('\n'), 'utf-8');
        console.log(`Batch ${batchNum}: ${batch.length} estudios (${batch[0].name.substring(0, 30)}... → ${batch[batch.length - 1].name.substring(0, 30)}...)`);
    }

    await pool.end();
}
main().catch(console.error);
