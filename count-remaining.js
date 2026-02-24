const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require');

async function run() {
    const total = await sql`SELECT COUNT(*) as total FROM studies`;
    const weak = await sql`SELECT COUNT(*) as total FROM studies WHERE description LIKE '%proporciona información diagnóstica específica%' OR description LIKE '%analiza componentes específicos%' OR LENGTH(description) < 100`;
    const good = total[0].total - weak[0].total;
    console.log('=== ESTADO DE CONTENIDO MÉDICO ===');
    console.log('Total estudios en DB:', total[0].total);
    console.log('Con contenido BUENO:', good);
    console.log('Con contenido DÉBIL (faltan):', weak[0].total);
    console.log('Porcentaje completado:', (good / total[0].total * 100).toFixed(1) + '%');
    console.log('Batches restantes (~50/batch):', Math.ceil(weak[0].total / 50));
    console.log('==================================');
}

run().catch(e => console.error(e));
