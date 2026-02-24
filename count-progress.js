const { neon } = require("@neondatabase/serverless");
const sql = neon("postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require");

(async () => {
    const total = await sql`SELECT count(*) as c FROM studies`;
    const weak = await sql`SELECT count(*) as c FROM studies WHERE description IS NULL OR length(description) < 100 OR description LIKE '%proporciona información diagnóstica específica%' OR description LIKE '%analiza componentes específicos%'`;
    const t = Number(total[0].c);
    const w = Number(weak[0].c);
    console.log("Total estudios:", t);
    console.log("Con contenido bueno:", t - w);
    console.log("Faltan (contenido débil):", w);
    console.log("Progreso:", Math.round((t - w) / t * 100) + "%");
    console.log("Batches restantes (~20 por batch):", Math.ceil(w / 20));
})();
