const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = process.argv[2] || "postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

async function main() {
    console.log('🔍 Buscando Nombres Batch 4...');

    const terms = [
        '%REUMA%',
        '%OVARICO%', '%HORMONAL%',
        '%TORCH%',
        '%HIERRO%',
        '%CARDIACO%',
        '%125%', '%19-9%', '%CARCINO%', '%FETOPROTEINA%', // Markers
        '%DOPING%'
    ];

    for (const term of terms) {
        const results = await sql`SELECT name FROM studies WHERE name ILIKE ${term} ORDER BY name LIMIT 5`;
        if (results.length > 0) {
            console.log(`\n--- Resultados para "${term}" ---`);
            results.forEach(r => console.log(`  "${r.name}"`));
        }
    }
}

main().catch(console.error);
