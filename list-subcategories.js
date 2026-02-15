const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = process.argv[2] || "postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

async function main() {
    console.log('🔍 Listando subcategorías...');
    const results = await sql`SELECT id, name FROM subcategories ORDER BY name`;

    for (const sub of results) {
        const count = await sql`SELECT count(*) as c FROM studies WHERE subcategory_id = ${sub.id}`;
        if (count[0].c > 0) {
            console.log(`📂 ${sub.name} (${count[0].c} estudios)`);
        }
    }
}

main().catch(console.error);
