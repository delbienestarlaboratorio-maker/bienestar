const { Pool, neonConfig } = require('@neondatabase/serverless'); const ws = require('ws'); neonConfig.webSocketConstructor = ws;
const p = new Pool({ connectionString: 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require' });
async function main() {
    const r = await p.query("SELECT id, name FROM studies WHERE (LOWER(name) LIKE '%barbit%' OR LOWER(name) LIKE '%benzo%' OR LOWER(name) LIKE '%doping%') AND is_active=true");
    console.log(r.rows);
    await p.end();
}
main();
