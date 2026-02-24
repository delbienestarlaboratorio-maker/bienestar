const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require' });

async function main() {
    const { rows } = await pool.query(`
        SELECT id, name, description, what_is_it, preparation 
        FROM studies WHERE is_active = true 
        ORDER BY name LIMIT 5
    `);
    rows.forEach(r => {
        console.log(`ID: ${r.id} | ${r.name}`);
        console.log(`  Desc: ${(r.description || 'VACIO').substring(0, 80)}`);
        console.log(`  WhatIsIt: ${(r.what_is_it || 'VACIO').substring(0, 80)}`);
        console.log(`  Prep: ${r.preparation || 'VACIO'}`);
        console.log('');
    });
    await pool.end();
}
main().catch(console.error);
