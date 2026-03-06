const { Pool, neonConfig } = require('@neondatabase/serverless'); const ws = require('ws'); neonConfig.webSocketConstructor = ws;
const p = new Pool({ connectionString: 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require' });
async function main() {
    const r = await p.query("SELECT id, name FROM studies WHERE is_active=true AND (LOWER(name) LIKE '%tsh%' OR LOWER(name) LIKE 't3%' OR LOWER(name) LIKE 't4%' OR LOWER(name) LIKE '%coprocultivo%' OR LOWER(name) LIKE '%coproparasito%' OR LOWER(name) LIKE '%hemocultivo%' OR LOWER(name) LIKE '%curva de toler%') ORDER BY name LIMIT 30");
    r.rows.forEach(x => console.log(x.id + ' | ' + x.name));
    await p.end();
}
main();
