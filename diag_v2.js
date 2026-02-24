const { Pool, neonConfig } = require('@neondatabase/serverless'); const ws = require('ws'); neonConfig.webSocketConstructor = ws;
const p = new Pool({ connectionString: 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require' });
async function main() {
    const rTotal = await p.query("SELECT COUNT(*) FROM studies WHERE is_active=true");
    const rV2 = await p.query("SELECT COUNT(*) as count FROM studies WHERE is_active=true AND faqs IS NOT NULL AND faqs::text != '[]'");
    const rV1 = await p.query("SELECT id, name FROM studies WHERE is_active=true AND (faqs IS NULL OR faqs::text = '[]') ORDER BY id");

    console.log(`TOTAL ACTIVE: ${rTotal.rows[0].count}`);
    console.log(`V2 QUALITY (has faqs): ${rV2.rows[0].count}`);
    console.log(`REMAINING (no faqs): ${rV1.rowCount}`);

    const fs = require('fs');
    const output = rV1.rows.map(x => `ID: ${x.id} — ${x.name}`).join('\n');
    fs.writeFileSync('remaining_v2_work.txt', output);
    console.log('Saved to remaining_v2_work.txt');
    await p.end();
}
main();
