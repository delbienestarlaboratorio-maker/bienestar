const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
    console.log('Attempting to update ID 1948...');
    try {
        const result = await sql`
      UPDATE studies 
      SET search_terms = search_terms 
      WHERE id = ${'1948'} 
      RETURNING id, name
    `;
        console.log('Update result:', result);
    } catch (e) {
        console.error('Update failed:', e);
    }
}
main().catch(console.error);
