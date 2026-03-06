const { neonConfig, Pool } = require('@neondatabase/serverless');
const ws = require('ws');
neonConfig.webSocketConstructor = ws;

const connStr = 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require';
const p = new Pool({ connectionString: connStr });

async function main() {
    // Get columns first
    const cols = await p.query("SELECT column_name FROM information_schema.columns WHERE table_name='studies' ORDER BY ordinal_position");
    console.log('=== COLUMNS ===');
    console.log(cols.rows.map(x => x.column_name).join(', '));

    // Find Calcitriol study
    const r = await p.query("SELECT * FROM studies WHERE LOWER(name) LIKE '%calcitriol%' OR LOWER(name) LIKE '%dihidroxi%' OR slug LIKE '%calcitriol%' OR slug LIKE '%dihidroxi%'");
    if (r.rows.length === 0) {
        console.log('\nNo Calcitriol study found!');
    } else {
        for (const s of r.rows) {
            console.log('\n=== STUDY ===');
            for (const [k, v] of Object.entries(s)) {
                if (typeof v === 'string' && v.length > 300) {
                    console.log(k + ':', v.substring(0, 300) + '...');
                } else if (typeof v === 'object' && v !== null) {
                    console.log(k + ':', JSON.stringify(v).substring(0, 300));
                } else {
                    console.log(k + ':', v);
                }
            }
        }
    }

    await p.end();
}
main().catch(e => { console.error(e); p.end(); });
