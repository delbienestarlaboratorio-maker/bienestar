const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const masterFile = path.join(dataDir, 'symptoms-massive.json');

// The new batches to integrate
const batchFiles = [
    'symptoms-batch-25.json',
    'symptoms-batch-26.json'
];

function mergeBatches() {
    console.log("=== INICIANDO INTEGRACIÓN DE LOTES 25 Y 26 ===");
    let masterData = [];

    // 1. Cargar la base maestra actual
    if (fs.existsSync(masterFile)) {
        try {
            const rawData = fs.readFileSync(masterFile, 'utf8');
            masterData = JSON.parse(rawData);
            console.log(`[OK] Archivo maestro cargado. Entradas actuales: ${masterData.length}`);
        } catch (error) {
            console.error(`[ERROR] No se pudo leer el archivo maestro: ${error}`);
            return;
        }
    } else {
        console.warn("[WARN] Archivo maestro no encontrado. Se creará uno nuevo.");
    }

    // Un set para detectar duplicados por el slug único
    const existingSlugs = new Set(masterData.map(s => s.slug));
    let addedCount = 0;

    // 2. Procesar e integrar cada lote nuevo
    for (const batchFile of batchFiles) {
        const fullPath = path.join(dataDir, batchFile);
        if (!fs.existsSync(fullPath)) {
            console.warn(`[WARN] Lote no encontrado: ${batchFile}. Saltando...`);
            continue;
        }

        try {
            const batchRaw = fs.readFileSync(fullPath, 'utf8');
            const batchData = JSON.parse(batchRaw);

            if (!Array.isArray(batchData)) {
                console.warn(`[WARN] El lote ${batchFile} no es un Array válido. Saltando...`);
                continue;
            }

            console.log(`[>>] Procesando ${batchFile} (${batchData.length} síntomas)...`);

            for (const symptom of batchData) {
                if (symptom.slug && !existingSlugs.has(symptom.slug)) {
                    // Validar integridad mínima requerida
                    if (!symptom.name || !symptom.intro) {
                        console.warn(`[!] Saltando síntoma corrupto en ${batchFile}: Falta intro o name.`);
                        continue;
                    }

                    masterData.push(symptom);
                    existingSlugs.add(symptom.slug);
                    addedCount++;
                    console.log(`   + Carga Exitosa: [${symptom.slug}] ${symptom.name}`);
                } else {
                    console.log(`   - Ignorado (Duplicado o sin slug): ${symptom.slug || 'DESCONOCIDO'}`);
                }
            }
        } catch (err) {
            console.error(`[ERROR] Fallo al procesar el lote ${batchFile}:`, err);
        }
    }

    // 3. Escribir el nuevo archivo maestro
    if (addedCount > 0) {
        try {
            fs.writeFileSync(masterFile, JSON.stringify(masterData, null, 2), 'utf8');
            console.log(`\n[ÉXITO] Integración completada. Se añadieron ${addedCount} enfermedades.`);
            console.log(`[STATUS] Total histórico en \`symptoms-massive.json\`: ${masterData.length} padecimientos listos para SSG (Google).`);
        } catch (err) {
            console.error(`[ERROR FATAL] No se pudo guardar el archivo maestro:`, err);
        }
    } else {
        console.log("\n[INFO] No se encontraron nuevas enfermedades válidas para agregar.");
    }
}

mergeBatches();
