const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require' });

async function check() {
    const { rows: status } = await pool.query(`
        SELECT 
            CASE WHEN is_active THEN 'ACTIVOS' ELSE 'PAUSADOS' END as estado,
            COUNT(*)::int as count 
        FROM studies GROUP BY is_active ORDER BY is_active DESC
    `);
    console.log('=== ESTADO DE LA BASE DE DATOS ===');
    status.forEach(r => console.log(`  ${r.estado}: ${r.count}`));

    const { rows: [total] } = await pool.query('SELECT COUNT(*)::int as c FROM studies');
    console.log(`  TOTAL: ${total.c}`);

    await pool.end();
}
check().catch(console.error);
