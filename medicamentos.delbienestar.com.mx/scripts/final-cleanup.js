/**
 * Final aggressive cleanup:
 * 1. Remove all "Sin Clasificar" entries that have no brands (not real marketed drugs)
 * 2. Remove categories that are clearly FDA allergen noise
 * 3. Deduplicate inflated categories (e.g., 644 "laxantes" seems wrong)
 * 4. Remove low-quality categories with fewer than needed context
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'medication-master-list.json');

// Categories to remove entirely (FDA noise, not real medications for our portal)
const REMOVE_CATEGORIES = [
    'Osmotic Laxative',  // FDA mapped way too many non-laxative substances here
    'Calculi Dissolution Agent',
    'Phosphate Binder',
    'Potassium Salt',
    'Copper-containing Intrauterine Device',
    'Catecholamine',
    'alpha-Adrenergic Agonist',
    'beta-Adrenergic Agonist',
    'Copper Absorption Inhibitor',
    'Adrenocorticotropic Hormone',
    'Nitrogen Binding Agent',
    'Central Nervous System Stimulant',
    'Acetylcholine Release Inhibitor',
    'Phospholipase A2 Inhibitor',
    'Vitamin D2 Analog',
    'Plasma Volume Expander',
    'Non-Standardized Food Allergenic Extract',
    'Non-Standardized Plant Allergenic Extract',
    'Non-Standardized Fungal Allergenic Extract',
    'Non-Standardized Chemical Allergen',
    'Standardized Chemical Allergen',
    'Standardized Insect Venom Allergenic Extract',
];

function main() {
    console.log('🧹 Final aggressive cleanup…');

    let data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
    console.log(`  Starting: ${data.length} medications`);

    // 1. Remove junk categories
    const before1 = data.length;
    data = data.filter(m => !REMOVE_CATEGORIES.includes(m.category));
    console.log(`  After removing junk categories: ${data.length} (removed ${before1 - data.length})`);

    // 2. Aggressively clean "Sin Clasificar"
    //    Keep ONLY if it has brands OR if it was from the original dataset (no 'source' field)
    const before2 = data.length;
    data = data.filter(m => {
        if (m.category !== 'Sin Clasificar') return true;
        // Original pre-FDA entries don't have 'source'
        if (!m.source) return true;
        // FDA entries: keep only if they have brands (actual marketed drugs)
        if (m.brands && m.brands.length > 0) return true;
        return false;
    });
    console.log(`  After cleaning Sin Clasificar: ${data.length} (removed ${before2 - data.length})`);

    // 3. Fix "Gastrointestinales — Laxantes" inflation
    //    The FDA's "Osmotic Laxative" EPC was already removed above.
    //    Check remaining laxante count
    const laxCount = data.filter(m => m.category === 'Gastrointestinales — Laxantes').length;
    console.log(`  Remaining Laxantes: ${laxCount}`);

    // 4. Clean up English-only FDA categories that shouldn't appear
    //    Map remaining unmapped English categories to Spanish
    const englishToSpanish = {
        'Central Nervous System Stimulant': 'Estimulantes del Sistema Nervioso Central',
        'Peripheral Vasodilator': 'Vasodilatadores Periféricos',
        'Smooth Muscle Relaxant': 'Relajantes de Músculo Liso',
        'Expectorant': 'Expectorantes',
        'Mucolytic': 'Mucolíticos',
        'Antispasmodic': 'Antiespasmódicos',
        'Antitussive': 'Antitusivos',
        'Keratolytic': 'Queratolíticos',
        'Analgesic': 'Analgésicos y Antipiréticos',
        'Antimicrobial': 'Antimicrobianos',
        'Antiseptic': 'Antisépticos',
        'Astringent': 'Astringentes',
        'Demulcent': 'Demulcentes',
        'Emollient': 'Emolientes',
        'Antacid': 'Antiácidos',
        'Chelating Agent': 'Agentes Quelantes',
        'Diagnostic Agent': 'Agentes Diagnósticos',
        'Electrolyte': 'Electrolitos',
        'Muscle Relaxant': 'Relajantes Musculares',
        'Cardiotonic Agent': 'Cardiotónicos',
        'Antifibrinolytic': 'Antifibrinolíticos',
        'Hemostatic': 'Hemostáticos',
    };

    let translated = 0;
    data = data.map(m => {
        if (englishToSpanish[m.category]) {
            m.category = englishToSpanish[m.category];
            m.categoryId = m.category.toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            translated++;
        }
        return m;
    });
    console.log(`  Translated ${translated} English categories to Spanish`);

    // 5. Remove tiny single-entry FDA categories that are noise
    const catCounts = {};
    data.forEach(m => { catCounts[m.category] = (catCounts[m.category] || 0) + 1; });

    // Keep categories with >= 2 entries or those from the original dataset
    const before5 = data.length;
    data = data.filter(m => {
        if (!m.source) return true;  // Original dataset - always keep
        if (catCounts[m.category] >= 2) return true;
        return false;
    });
    console.log(`  After removing single-entry FDA cats: ${data.length} (removed ${before5 - data.length})`);

    // 6. Final sort + dedup
    data.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
    const seen = new Set();
    data = data.filter(m => {
        const key = m.name.toLowerCase().trim();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    // Save
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf8');

    console.log(`\n  ✅ Final total: ${data.length} medications`);

    // Final category stats
    const finalCats = {};
    data.forEach(m => { finalCats[m.category] = (finalCats[m.category] || 0) + 1; });
    const sorted = Object.entries(finalCats).sort((a, b) => b[1] - a[1]);
    console.log(`  📂 Total categories: ${sorted.length}`);
    console.log('\nTop 30 categories:');
    sorted.slice(0, 30).forEach(([k, v], i) => console.log(`  ${i + 1}. ${k}: ${v}`));
}

main();
