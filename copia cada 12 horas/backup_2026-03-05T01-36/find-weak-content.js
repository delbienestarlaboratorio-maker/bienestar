const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  // Find studies with weak descriptions (either generic template or very short)
  const rows = await sql`
    SELECT id, name, description 
    FROM studies 
    WHERE 
      (description IS NULL) OR 
      (length(description) < 200) OR
      (description ILIKE '%analiza componentes específicos%') OR
      (description ILIKE '%prueba de laboratorio clínico especializada%')
    ORDER BY name ASC 
    LIMIT 50
  `;
  const fs = require('fs');
  fs.writeFileSync('weak_content_batch.json', JSON.stringify(rows, null, 2));
  console.log(`Saved ${rows.length} studies to weak_content_batch.json`);
}
main().catch(console.error);
