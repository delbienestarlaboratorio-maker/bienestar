import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require');

const total = await sql`SELECT COUNT(*)::int as count FROM studies`;
const complete = await sql`SELECT COUNT(*)::int as count FROM studies WHERE description IS NOT NULL AND description != '' AND what_is_it IS NOT NULL AND what_is_it != ''`;
const noDesc = await sql`SELECT COUNT(*)::int as count FROM studies WHERE description IS NULL OR description = ''`;
const genericDesc = await sql`SELECT COUNT(*)::int as count FROM studies WHERE (description IS NOT NULL AND description != '') AND (what_is_it IS NULL OR what_is_it = '')`;
const noPrep = await sql`SELECT COUNT(*)::int as count FROM studies WHERE preparation IS NULL OR preparation = '' OR preparation = 'Consulte indicaciones.'`;

console.log('╔══════════════════════════════════════════╗');
console.log('║   RESUMEN DE CONTENIDO MÉDICO            ║');
console.log('╠══════════════════════════════════════════╣');
console.log(`║ Total estudios:              ${String(total[0].count).padStart(6)}    ║`);
console.log(`║ Con contenido COMPLETO:      ${String(complete[0].count).padStart(6)}    ║`);
console.log(`║ Sin descripción:             ${String(noDesc[0].count).padStart(6)}    ║`);
console.log(`║ Con desc pero sin what_is_it:${String(genericDesc[0].count).padStart(6)}    ║`);
console.log(`║ Sin preparación real:        ${String(noPrep[0].count).padStart(6)}    ║`);
console.log('╠══════════════════════════════════════════╣');
console.log(`║ Progreso:                    ${String(((complete[0].count / total[0].count) * 100).toFixed(1) + '%').padStart(6)}    ║`);
console.log(`║ FALTAN:                      ${String(total[0].count - complete[0].count).padStart(6)}    ║`);
console.log('╚══════════════════════════════════════════╝');
