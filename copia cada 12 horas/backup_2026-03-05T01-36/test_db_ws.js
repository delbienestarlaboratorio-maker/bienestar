const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
neonConfig.webSocketConstructor = ws;

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require',
    connectionTimeoutMillis: 30000
});

console.log('Connecting via WebSocket...');
pool.query('SELECT COUNT(*)::int as c FROM studies')
    .then(r => {
        console.log('OK - Total studies:', r.rows[0].c);
        pool.end();
    })
    .catch(e => {
        console.log('FAIL:', e.message.substring(0, 200));
        pool.end();
    });
