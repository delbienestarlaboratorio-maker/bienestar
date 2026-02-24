const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
    const rows = await sql`
    SELECT id, name 
    FROM studies 
    ORDER BY name ASC 
    OFFSET 1440 
    LIMIT 20
  `;
    console.log(JSON.stringify(rows));
}
main().catch(console.error);
