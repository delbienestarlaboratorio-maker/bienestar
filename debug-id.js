const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
    const fs = require('fs');
    console.log('Fetching all studies...');
    const all = await sql`SELECT id, name FROM studies`;
    fs.writeFileSync('all_studies_dump.json', JSON.stringify(all, null, 2));
    console.log(`Dumped ${all.length} studies to all_studies_dump.json`);
}
main().catch(console.error);
