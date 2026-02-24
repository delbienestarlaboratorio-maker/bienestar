const { Pool, neonConfig } = require('@neondatabase/serverless'); const ws = require('ws'); neonConfig.webSocketConstructor = ws;
const p = new Pool({ connectionString: 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require' });
async function main() {
    const rTotal = await p.query("SELECT COUNT(*) FROM studies WHERE is_active=true");
    const total = rTotal.rows[0].count;
    const rPending = await p.query("SELECT id, name FROM studies WHERE is_active=true AND (what_is_it IS NULL OR what_is_it = '') ORDER BY id");
    const pending = rPending.rowCount;

    console.log(`TOTAL ACTIVE: ${total}`);
    console.log(`TOTAL PENDING (empty what_is_it): ${pending}`);

    const fs = require('fs');
    const output = rPending.rows.map(x => `ID: ${x.id} — ${x.name}`).join('\n');
    fs.writeFileSync('pending_studies.txt', output);
    console.log('Saved to pending_studies.txt');
    await p.end();
}
main();
