/**
 * Script to apply a JSON batch of medical content to Neon DB
 * Usage: node apply-medical-content.js <json_file_path> <database_url>
 * IMPROVED: Uses in-memory fuzzy matching AND Retries for connection errors
 */
const fs = require('fs');

const DATABASE_URL = process.argv[3] || process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('❌ Falta DATABASE_URL'); process.exit(1); }

const FILE_PATH = process.argv[2];
if (!FILE_PATH) { console.error('❌ Falta archivo JSON'); process.exit(1); }

function normalize(str) {
    return str.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\(.*?\)/g, "")
        .replace(/[^a-z0-9]/g, "")
        .trim();
}

async function retry(fn, retries = 3, delay = 1000) {
    try {
        return await fn();
    } catch (err) {
        if (retries > 0 && err.message.includes('fetch failed')) {
            console.warn(`⚠️ Error de conexión. Reintentando en ${delay}ms... (${retries} restantes)`);
            await new Promise(r => setTimeout(r, delay));
            return retry(fn, retries - 1, delay * 2);
        }
        throw err;
    }
}

async function main() {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(DATABASE_URL);

    console.log(`📖 Leyendo archivo ${FILE_PATH}...`);
    const studies = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));

    // SKIP global fetch. It seems unreliable or truncated.
    // dbStudies = await retry(() => sql`SELECT id, name FROM studies`);
    // console.log(`📊 DB tiene ${dbStudies.length} estudios.`);

    let success = 0;
    let errors = 0;

    for (const study of studies) {
        try {
            console.log(`🔄 Procesando estudio ID: "${study.id}" (${study.description.substring(0, 30)}...)...`);

            // Direct UPDATE by ID
            // We use study.id directly.
            if (!study.id) {
                console.log(`⚠️ SALTADO: No tiene ID en el archivo JSON`);
                errors++;
                continue;
            }

            const result = await retry(() => sql`
                UPDATE studies SET
                    description = ${study.description},
                    what_is_it = ${study.whatIsIt || study.what_is_it},
                    what_does_it_detect = ${JSON.stringify(study.whatDoesItDetect || study.what_does_it_detect)}::jsonb,
                    detailed_preparation = ${JSON.stringify(study.detailedPreparation || study.detailed_preparation)}::jsonb,
                    benefits = ${JSON.stringify(study.benefits)}::jsonb,
                    faqs = ${JSON.stringify(study.faqs)}::jsonb
                WHERE id = ${study.id}
                RETURNING id
            `);

            // Checking result.count (postgres.js / neon driver usually returns count: number inside result or as result.count)
            // neon serverless driver returns array of rows, but also has .count or .rowCount property on the result object?
            // Actually, neon driver returns rows array. To get count, we need to check documentation or result.
            // But wait, the result IS the array of rows for SELECT. for UPDATE it might be different.
            // Let's assume standard postgres.js behavior: result is array-like but has `count`.

            // Actually, neon http driver returns { rowCount: number, command: string, rows: [] } or just rows?
            // documentation says: result is array of rows. 
            // BUT for INSERT/UPDATE, it returns array of rows if RETURNING is used, otherwise... ?
            // Let's use RETURNING id to be sure we updated something.

            // Re-writing query to RETURN id
            if (result && result.length > 0) {
                success++;
            } else {
                console.log(`⚠️ NO ENCONTRADO en DB o no actualizado: ID ${study.id}`);
                errors++;
            }
        } catch (err) {
            console.error(`❌ Error en ${study.id}: ${err.message}`);
            errors++;
        }
    }

    console.log(`\n🏁 Resumen: ${success} actualizados, ${errors} errores.`);
}

main().catch(console.error);
