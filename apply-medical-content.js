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

    console.log('📥 Obteniendo todos los estudios de la DB para matching ...');
    let dbStudies = [];
    try {
        dbStudies = await retry(() => sql`SELECT id, name FROM studies`);
    } catch (err) {
        console.error('❌ No se pudo conectar a la DB:', err.message);
        process.exit(1);
    }

    console.log(`📊 DB tiene ${dbStudies.length} estudios.`);

    const dbMap = new Map();
    dbStudies.forEach(s => {
        dbMap.set(normalize(s.name), s);
    });

    let success = 0;
    let errors = 0;

    for (const study of studies) {
        try {
            let match = dbStudies.find(s => s.name === study.name);

            if (!match) {
                const normalizedInput = normalize(study.name);
                match = dbMap.get(normalizedInput);
                if (!match) {
                    match = dbStudies.find(s => normalize(s.name).includes(normalizedInput) || normalizedInput.includes(normalize(s.name)));
                }
            }

            if (!match) {
                console.log(`⚠️ NO ENCONTRADO: "${study.name}"`);
                errors++;
                continue;
            }

            console.log(`🔄 Actualizando: "${match.name}"...`);

            await retry(() => sql`
                UPDATE studies SET
                    description = ${study.description},
                    what_is_it = ${study.whatIsIt},
                    what_does_it_detect = ${JSON.stringify(study.whatDoesItDetect)}::jsonb,
                    detailed_preparation = ${JSON.stringify(study.detailedPreparation)}::jsonb,
                    benefits = ${JSON.stringify(study.benefits)}::jsonb,
                    faqs = ${JSON.stringify(study.faqs)}::jsonb
                WHERE id = ${match.id}
            `);

            success++;
        } catch (err) {
            console.error(`❌ Error en ${study.name}: ${err.message}`);
            errors++;
        }
    }

    console.log(`\n🏁 Resumen: ${success} actualizados, ${errors} errores.`);
}

main().catch(console.error);
