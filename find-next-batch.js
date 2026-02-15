const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = process.argv[2] || "postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

async function main() {
    console.log('🔍 Buscando lote de Perfiles y Químicas...');

    // Fetch studies with PERFIL or QUIMICA or EXAMEN
    // Limit to 20
    const results = await sql`
        SELECT name, length(description) as len FROM studies 
        WHERE 
            (name ILIKE '%PERFIL%' OR name ILIKE '%QUIMICA%' OR name ILIKE '%EXAMEN%')
        ORDER BY name DESC
        LIMIT 20
    `;

    console.log(`Encontrados ${results.length} candidatos.`);
    results.forEach(r => console.log(`"${r.name}" (Desc len: ${r.len})`));
}

main().catch(console.error);
