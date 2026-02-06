// Script para importar los 144 estudios faltantes con descripciones SEO generadas por IA
import Database from 'better-sqlite3';
import pkg from 'pg';
const { Pool } = pkg;

const SQLITE_DB_PATH = 'D:\\Paginas_web\\pagina\\2026\\del_bienestar_backup_1768629790832.db';

// Base de datos PostgreSQL LOCAL
const LOCAL_POOL = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'SecurePass2026!',
    database: 'laboratorio_bienestar',
    port: 5432,
});

// Ollama para generar descripciones SEO
const OLLAMA_URL = 'http://localhost:11434/api/generate';

// Categorías disponibles (IDs de la base de datos)
const CATEGORIES = {
    'analisis-clinicos': 1,
    'hormonas': 2,
    'inmunologia': 3,
    'toxicologia': 4,
    'microbiologia': 5,
    'genetica': 6,
};

// Función para generar slug
function generateSlug(name) {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// Función para determinar categoría basada en nombre del estudio
function getCategoryId(studyName) {
    const name = studyName.toLowerCase();

    if (name.includes('hormona') || name.includes('testosterona') || name.includes('estrogen') ||
        name.includes('progesterona') || name.includes('prolactina') || name.includes('cortisol') ||
        name.includes('tsh') || name.includes(' t3') || name.includes(' t4')) {
        return CATEGORIES['hormonas'];
    }

    if (name.includes('anticuerpo') || name.includes(' ac.') || name.includes('inmuno') ||
        name.includes(' igg') || name.includes(' igm') || name.includes(' iga')) {
        return CATEGORIES['inmunologia'];
    }

    if (name.includes('drogas') || name.includes('alcohol') || name.includes('tóxico') ||
        name.includes('cocaína') || name.includes('marihuana') || name.includes('opiáceo')) {
        return CATEGORIES['toxicologia'];
    }

    if (name.includes('cultivo') || name.includes('bacteria') || name.includes('virus') ||
        name.includes('pcr') || name.includes('covid') || name.includes('hepatitis')) {
        return CATEGORIES['microbiologia'];
    }

    if (name.includes('genético') || name.includes('adn') || name.includes('cromosoma') ||
        name.includes('mutación') || name.includes('genotipo')) {
        return CATEGORIES['genetica'];
    }

    // Por defecto: análisis clínicos
    return CATEGORIES['analisis-clinicos'];
}

// Generar descripción SEO con IA
async function generateSEODescription(studyName) {
    const prompt = `Genera una descripción SEO profesional de 120-150 palabras para el estudio clinico "${studyName}". Explica que es, para que sirve y cuando se recomienda. Usa lenguaje claro y profesional. Solo la descripcion, sin titulos.`;

    try {
        const response = await fetch(OLLAMA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'qwen2.5:3b',
                prompt: prompt,
                stream: false,
                options: {
                    temperature: 0.7,
                    num_predict: 200,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Verificar que la respuesta tenga contenido
        if (!data || !data.response) {
            throw new Error('Respuesta vacia de Ollama');
        }

        const description = data.response
            .trim()
            .replace(/[^\x00-\x7F]/g, (char) => {
                // Reemplazar caracteres especiales comunes
                const replacements = {
                    'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
                    'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
                    'ñ': 'n', 'Ñ': 'N',
                };
                return replacements[char] || '';
            });

        return description || generateFallbackDescription(studyName);

    } catch (error) {
        console.error(`   ⚠️  Error IA: ${error.message}`);
        return generateFallbackDescription(studyName);
    }
}

// Generar descripción fallback sin IA
function generateFallbackDescription(studyName) {
    const name = studyName.toLowerCase();

    if (name.includes('perfil')) {
        return `${studyName} es un conjunto especializado de pruebas de laboratorio que evaluan multiples parametros clinicos en una sola muestra. Este panel diagnostico proporciona informacion completa para el medico, permitiendo una evaluacion integral del estado de salud del paciente y facilitando el diagnostico preciso de diversas condiciones medicas.`;
    }

    if (name.includes('anticuerpo') || name.includes('ac.')) {
        return `${studyName} es una prueba de inmunologia que detecta anticuerpos especificos en la sangre. Este analisis ayuda al diagnostico de enfermedades autoinmunes, infecciones y otros trastornos del sistema inmunologico, proporcionando informacion valiosa sobre la respuesta inmune del organismo.`;
    }

    return `${studyName} es un estudio de laboratorio clinico que proporciona informacion diagnostica importante para evaluar el estado de salud del paciente. Este analisis es solicitado por el medico para detectar, diagnosticar o monitorear diversas condiciones medicas, ayudando en la toma de decisiones clinicas apropiadas para cada caso.`;
}

// Generar preparación
function generatePreparation(studyName) {
    const name = studyName.toLowerCase();

    if (name.includes('glucosa') || name.includes('curva') || name.includes('azúcar')) {
        return 'Ayuno de 8-12 horas. Solo agua simple permitida.';
    }

    if (name.includes('perfil') || name.includes('lípidos') || name.includes('colesterol') || name.includes('triglicéridos')) {
        return 'Ayuno de 12-14 horas. Evitar consumo de alcohol 24 horas antes.';
    }

    if (name.includes('orina') && name.includes('24')) {
        return 'Recolección de orina de 24 horas. Se proporcionan instrucciones detalladas.';
    }

    if (name.includes('hormona') || name.includes('testosterona') || name.includes('progesterona')) {
        return 'No requiere ayuno. Se recomienda realizar en horario matutino (7-10 AM).';
    }

    return 'No requiere preparación especial. Acudir en cualquier horario.';
}

// Importar estudios faltantes
async function importMissingStudies() {
    try {
        console.log('\n🔄 IMPORTANDO ESTUDIOS FALTANTES...\n');

        // Conectar a SQLite
        const sqlite = new Database(SQLITE_DB_PATH, { readonly: true });
        console.log('✅ Conectado a SQLite\n');

        // Obtener estudios de SQLite
        const sqliteStudies = sqlite.prepare(`
      SELECT 
        nombre_prueba,
        clave,
        precio_con_iva,
        precio_sin_iva,
        estado
      FROM lista_precios
      WHERE estado = 'Activo'
      ORDER BY precio_con_iva DESC
    `).all();

        // Obtener estudios existentes en PostgreSQL
        const pgResult = await LOCAL_POOL.query(`
      SELECT name FROM studies WHERE is_active = true
    `);

        const existingNames = new Set();
        pgResult.rows.forEach(row => {
            existingNames.add(row.name.toUpperCase().trim());
        });

        // Filtrar estudios faltantes
        const missingStudies = sqliteStudies.filter(study => {
            const normalized = study.nombre_prueba.toUpperCase().trim();
            return !existingNames.has(normalized);
        });

        console.log(`📊 Estudios faltantes: ${missingStudies.length}\n`);
        console.log('🤖 Generando descripciones con IA...\n');

        let imported = 0;
        let errors = 0;

        for (const [index, study] of missingStudies.entries()) {
            try {
                const name = study.nombre_prueba;
                const slug = generateSlug(name);
                const categoryId = getCategoryId(name);
                const priceRegular = study.precio_con_iva;
                const pricePromotional = priceRegular * 0.9; // 10% descuento

                // Generar descripción con IA
                console.log(`${index + 1}/${missingStudies.length} Generando: ${name}...`);
                const description = await generateSEODescription(name);
                const preparation = generatePreparation(name);

                // Insertar en PostgreSQL
                await LOCAL_POOL.query(`
          INSERT INTO studies (
            name,
            slug,
            category_id,
            description,
            price_regular,
            price_promotional,
            preparation_instructions,
            turnaround_time,
            is_active,
            created_at,
            updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
          ON CONFLICT (slug) DO NOTHING
        `, [
                    name,
                    slug,
                    categoryId,
                    description,
                    priceRegular,
                    pricePromotional,
                    preparation,
                    '24-48 horas',
                    true,
                ]);

                imported++;
                console.log(`   ✅ Importado: $${priceRegular}`);

                // Pausa para no saturar Ollama
                await new Promise(resolve => setTimeout(resolve, 1000));

            } catch (error) {
                console.error(`   ❌ Error: ${error.message}`);
                errors++;
            }
        }

        console.log(`\n✅ IMPORTACIÓN COMPLETADA!`);
        console.log(`📊 Estudios importados: ${imported}`);
        console.log(`❌ Errores: ${errors}`);

        sqlite.close();
        await LOCAL_POOL.end();

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// Verificar Ollama disponible
async function checkOllama() {
    try {
        const response = await fetch('http://localhost:11434/api/tags');
        return response.ok;
    } catch {
        return false;
    }
}

// Ejecutar
(async () => {
    const ollamaAvailable = await checkOllama();

    if (!ollamaAvailable) {
        console.error('❌ Ollama no está disponible en localhost:11434');
        console.error('Por favor, inicia Ollama primero.');
        process.exit(1);
    }

    console.log('✅ Ollama disponible\n');
    await importMissingStudies();
})();
