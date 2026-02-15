/**
 * Script to export DB content to JSON for static pages.
 * Features:
 * - Robust connection retries (essential for Neon serverless)
 * - Safe JSON parsing/handling for jsonb columns
 * - Exclusion of raw html/markdown if too large (managed by component)
 */

import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

const DATABASE_URL = process.argv[2] || process.env.DATABASE_URL;
if (!DATABASE_URL) {
    console.error('❌ Falta DATABASE_URL');
    process.exit(1);
}

// Retry helper
async function retry(fn, retries = 5, delay = 1000) {
    try {
        return await fn();
    } catch (err) {
        if (retries > 0) {
            console.warn(`⚠️ Error: ${err.message}. Reintentando en ${delay}ms...`);
            await new Promise(r => setTimeout(r, delay));
            return retry(fn, retries - 1, delay * 2); // Exponential backoff
        }
        throw err;
    }
}

async function main() {
    console.log('📊 Consultando estudios de la base de datos...');

    const sql = neon(DATABASE_URL);

    // Use retry logic for the main fetch
    const studies = await retry(async () => {
        return await sql`
            SELECT 
                id,
                name,
                description,
                price_regular,
                price_promotional,
                category_id,
                slug,
                what_is_it,
                what_does_it_detect,
                detailed_preparation,
                preparation,
                turnaround_time,
                benefits,
                faqs,
                search_terms
            FROM studies
            WHERE is_active = true
            ORDER BY name ASC
        `;
    });

    console.log(`✅ ${studies.length} estudios activos encontrados`);

    // Transform: map snake_case DB columns to camelCase keys expected by page components
    const exportedStudies = studies.map(s => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
        description: s.description,
        categoryId: s.category_id,
        priceRegular: Number(s.price_regular),
        pricePromotional: Number(s.price_promotional),
        whatIsIt: s.what_is_it,
        whatDoesItDetect: s.what_does_it_detect,
        detailedPreparation: s.detailed_preparation,
        preparation: s.preparation,
        turnaroundTime: s.turnaround_time,
        benefits: s.benefits,
        faqs: s.faqs,
        searchTerms: s.search_terms,
    }));

    const outputPath = path.resolve('./src/data/studies.json');
    fs.writeFileSync(outputPath, JSON.stringify(exportedStudies, null, 2));

    console.log(`📁 Exportado a ${outputPath} (${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB)`);

    // Stats for verification
    const countWithDescription = exportedStudies.filter(s => s.description && s.description.length > 50).length;
    console.log(`\n📊 Estadísticas:\n  Total: ${exportedStudies.length}\n  Con descripción detallada (>50 chars): ${countWithDescription}`);
}

main().catch(err => {
    console.error('💥 Error:', err);
    process.exit(1);
});
