const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
    const rows = await sql`SELECT name, description, what_is_it FROM studies WHERE name ILIKE '%DEOXYCORTISOL%' LIMIT 3`;
    rows.forEach(s => {
        console.log('NAME:', s.name);
        console.log('DESC:', s.description);
        console.log('WHAT:', s.what_is_it);
        console.log('---');
    });
}
main().catch(console.error);
