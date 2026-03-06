/**
 * LIMPIEZA COMPLETA DE ENCODING UTF-8
 * Limpia TODOS los campos de texto de TODOS los estudios
 */

import { db } from './src/db/index.js';
import { studies } from './src/db/schema.js';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';

const LOG_FILE = 'utf8-cleanup.log';

function log(message: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    fs.appendFileSync(LOG_FILE, logMessage + '\n');
}

function cleanText(text: string | null): string | null {
    if (!text) return null;

    return text
        // Fix common UTF-8 corruption
        .replace(/├¡/g, 'a')
        .replace(/├®/g, 'e')
        .replace(/├¡/g, 'i')
        .replace(/├│/g, 'o')
        .replace(/├║/g, 'u')
        .replace(/├▒/g, 'n')
        .replace(/┬┐/g, '')
        .replace(/┬í/g, '')
        .replace(/ÔÇô/g, '-')
        .replace(/ÔÇö/g, '-')
        .replace(/ÔÇ£/g, '"')
        .replace(/ÔÇ¥/g, '"')
        .replace(/ÔÇÖ/g, "'")
        .replace(/ÔÇÖ/g, "'")
        // Remove any remaining non-ASCII
        .replace(/[^\x00-\x7F]/g, '');
}

async function main() {
    log('========================================');
    log('Iniciando Limpieza UTF-8 Completa');
    log('========================================');

    try {
        const allStudies = await db.select().from(studies);
        log(`Encontrados ${allStudies.length} estudios`);

        let updated = 0;
        let failed = 0;

        for (const study of allStudies) {
            try {
                const cleanedData: any = {
                    description: cleanText(study.description),
                    preparation: cleanText(study.preparation),
                    turnaroundTime: cleanText(study.turnaroundTime),
                    faqs: null,  // Remove FAQs completely
                    reviews: null  // Remove reviews completely
                };

                await db.update(studies)
                    .set(cleanedData)
                    .where(eq(studies.id, study.id));

                updated++;

                if (updated % 100 === 0) {
                    log(`Progreso: ${updated}/${allStudies.length} (${(updated / allStudies.length * 100).toFixed(1)}%)`);
                }
            } catch (error) {
                log(`Error actualizando ${study.name}: ${error}`);
                failed++;
            }
        }

        log('\n========================================');
        log('Limpieza Completada!');
        log(`Total actualizados: ${updated}`);
        log(`Total fallidos: ${failed}`);
        log('========================================');

    } catch (error) {
        log(`Error fatal: ${error}`);
        process.exit(1);
    }
}

main();
