/**
 * Clean up the medication master list:
 * 1. Remove allergenic extracts (pollen, dander, mold, etc.)
 * 2. Remove chemical reagents and non-drug substances
 * 3. Remove cosmetic-only products
 * 4. Remove entries with invalid/chemical-formula names
 * 5. Reclassify "Sin Clasificar" entries where possible based on name keywords
 * 
 * Run: node scripts/cleanup-master-list.js
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'medication-master-list.json');

// ──────────────────────────────────────────────────
// 1. Patterns to REMOVE entirely (not real drugs)
// ──────────────────────────────────────────────────
const REMOVE_PATTERNS = [
    // Allergenic extracts
    /allergenic/i, /pollen/i, /dander/i, /\bmite\b/i, /cockroach/i,
    /feather/i, /horse hair/i, /animal hair/i, /grass mix/i, /tree mix/i,
    /ragweed/i, /bermuda grass/i, /timothy grass/i, /kapok/i, /insect venom/i,
    /\bmold\b/i, /\bfungal\b.*extract/i, /\bdog\b.*extract/i, /\bcat\b.*extract/i,

    // Chemical reagents & lab compounds
    /mercaptoethanol/i, /methylcholanthrene/i, /methylguanine/i,
    /hydroxymethyl.*urea/i, /\.eta\.\-/i, /\d+-\d+\s*mw\)/i,

    // Cosmetic/skincare only
    /whitening.*cream/i, /sunscreen/i, /skin care su/i,
    /moisturiz/i, /anti-aging cream/i, /beauty/i,
    /shampoo/i, /conditioner/i, /body wash/i, /face wash/i,
    /lip balm/i, /nail polish/i, /mascara/i, /foundation/i,

    // Non-drug substances
    /^air$/i, /^water$/i, /^nitrogen$/i, /^oxygen$/i, /^carbon dioxide$/i,
    /^helium$/i, /^argon$/i, /^neon$/i,

    // Homeopathic very low potency nonsense names
    /\b\d+[cx]\b/i,  // like "30C", "6X" potency markers alone
];

// Names that are obviously not drugs (too short, numeric, or chemical formulas)
function isJunkName(name) {
    if (name.length < 3) return true;
    if (/^\d+$/.test(name)) return true;
    if (/^[A-Z0-9\-\(\)\[\]\.,\s]+$/.test(name) && name.length < 6) return true;
    // Chemical formula patterns like "C12H22O11"
    if (/^C\d+H\d+/i.test(name)) return true;
    return false;
}

// ──────────────────────────────────────────────────
// 2. Keyword → Category mapping for reclassification
// ──────────────────────────────────────────────────
const KEYWORD_TO_CATEGORY = [
    // Antibiotics
    [/cillin|penicillin/i, 'Antibióticos — Penicilinas y Derivados'],
    [/cephalos|cefal|ceftri|cefuro|cefix/i, 'Antibióticos — Cefalosporinas'],
    [/mycin|azithro|clarithro|erythro/i, 'Antibióticos — Macrólidos y otros'],
    [/floxacin|cipro|levo/i, 'Antibióticos — Quinolonas'],
    [/sulfa|sulfameth|trimethoprim/i, 'Antibióticos — Sulfonamidas'],
    [/tetracycl|doxycycl|minocycl/i, 'Antibióticos — Tetraciclinas'],

    // Antifungals
    [/conazol|nystatin|terbinaf|fungin/i, 'Antifúngicos'],

    // Antivirals
    [/ciclovir|acyclov|valacycl|oseltam|remdesiv/i, 'Antivirales'],

    // Cardiovascular
    [/pril$|enalapril|lisinopril|captopril/i, 'Antihipertensivos — IECA'],
    [/sartan|losartan|valsartan|telmis/i, 'Antihipertensivos — ARA II'],
    [/dipine|amlodip|nifedip|diltiaz|verapam/i, 'Antihipertensivos — Calcio Antagonistas'],
    [/olol$|metoprol|atenolol|proprano|bisopro/i, 'Antihipertensivos — Betabloqueadores'],
    [/statin|atorva|rosuva|simva|prava/i, 'Estatinas e Hipolipemiantes'],
    [/warfarin|heparin|enoxapar|rivarox|apixab|dabigatr/i, 'Anticoagulantes y Antiplaquetarios'],
    [/furosemid|hidroclorot|espironol|indapam|torasem/i, 'Diuréticos'],

    // Diabetes
    [/metformin|gliben|glimep|sitaglipt|empaglif|dapaglifl/i, 'Antidiabéticos Orales'],
    [/insulin/i, 'Insulinas y Análogos'],
    [/semaglutid|liraglutid|dulaglutid|exenatid/i, 'Agonistas del Receptor GLP-1'],

    // Psychiatry/CNS
    [/sertral|fluoxet|escitalo|paroxet|citalop/i, 'Antidepresivos — ISRS'],
    [/venlafax|duloxet|desvenlaf/i, 'Antidepresivos — IRSN'],
    [/amitript|imipramin|nortript|clomipr/i, 'Antidepresivos — Tricíclicos'],
    [/alprazol|clonazep|diazep|lorazep|midazol/i, 'Ansiolíticos y Sedantes'],
    [/haloperid|risperid|olanzap|quetiap|aripipr|clozap/i, 'Antipsicóticos'],
    [/levetirac|topiramat|gabapent|pregabal|fenito|fenobarbital/i, 'Anticonvulsivantes / Antiepilépticos'],
    [/levodop|pramipex|ropinirol|selegilin/i, 'Antiparkinsonianos'],
    [/donepezil|rivastigm|galantam|memant/i, 'Alzheimer y Demencias'],

    // Respiratory
    [/salbutam|budesonid|fluticas|salmeter|formot|monteluk|tiotropi/i, 'Respiratorios — Asma y EPOC'],
    [/ambroxol|bromhexin|dextrometorf|acetilcist|guaifenes/i, 'Respiratorios — Tos'],

    // GI
    [/omepraz|pantopraz|esomepraz|lansopraz|rabepraz/i, 'Gastrointestinales — Antiácidos e IBP'],
    [/metoclopram|domperi|ondanset/i, 'Gastrointestinales — Procinéticos'],

    // Allergy
    [/loratadin|cetirizi|desloratad|fexofenad|clorfenir|difenhidram/i, 'Antialérgicos y Antihistamínicos'],

    // Corticosteroids
    [/predniso|dexametas|betametas|metilpredni|hidrocortis|deflazacort/i, 'Corticosteroides Sistémicos'],

    // Thyroid
    [/levotirox|metimazol|propiltiourac/i, 'Tiroideos y Antitiroideos'],

    // Hormones
    [/estradiol|progesteron|estriol|tibolona/i, 'Hormonas Femeninas'],
    [/testosteron/i, 'Hormonas Masculinas'],
    [/sildenafil|tadalafil|vardenafil/i, 'Disfunción Eréctil'],
    [/levonorgest|etinilestrad|desogestrel|dienogest|drospirenon/i, 'Anticonceptivos'],

    // Oncology
    [/\b(i|su|so).*nib$/i, 'Antineoplásicos — Inhibidores de Quinasa'],
    [/\b.*mab$/i, 'Antineoplásicos — Anticuerpos Monoclonales'],
    [/cisplatin|carbopl|paclitax|docetax|ciclofosfam|doxorrubic/i, 'Antineoplásicos — Quimioterapia Clásica'],

    // Vaccines
    [/vaccine|vacuna/i, 'Vacunas'],

    // Vitamins
    [/vitamin|ácido fólico|folic acid|biotin|coenzima|omega/i, 'Vitaminas y Suplementos'],
    [/iron|hierro|ferroso|ferric/i, 'Antianémicos y Hematológicos'],

    // Contrast Agents
    [/gadolin|gadopen|gadoter|gadobut/i, 'Medios de Contraste — Paramagnéticos (Gadolinio)'],
    [/iohexol|iopamid|iodixanol|ioversol|diatrizoat/i, 'Medios de Contraste — Yodados'],
    [/barium/i, 'Medios de Contraste — Bario'],

    // Anesthetics
    [/lidocain|bupivacain|ropivacain|procain/i, 'Anestésicos Locales'],
    [/propofol|ketamin|sevofluran|desfluran|isofluran/i, 'Anestésicos Generales'],

    // Antiparasitic
    [/albendaz|mebendaz|ivermect|praziquant/i, 'Antiparasitarios y Antihelmínticos'],

    // Muscle relaxants
    [/ciclobenzap|metocarbam|tizanidin|baclofen/i, 'Relajantes Musculares'],

    // Dermatology
    [/retinoic|adapalene|isotretino|tretinoin/i, 'Dermatológicos — Retinoides'],
    [/clobetasol|betameth.*topic|hydrocort.*topic|mometason/i, 'Dermatológicos — Corticosteroides Tópicos'],

    // Ophthalmology
    [/latanoprost|timolol.*opht|brimonid|dorzolamid|travoprost/i, 'Oftalmológicos'],

    // Urology
    [/tamsulosin|alfuzosin|solifenac|mirabegr|oxibutin/i, 'Urológicos'],
];

function reclassify(name) {
    for (const [pattern, category] of KEYWORD_TO_CATEGORY) {
        if (pattern.test(name)) return category;
    }
    return null;
}

function main() {
    console.log('🧹 Cleaning medication master list…');

    const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
    console.log(`  📊 Starting with: ${data.length} medications`);

    let removed = 0;
    let reclassified = 0;
    const cleaned = [];

    for (const med of data) {
        const name = med.name || '';

        // Check removal patterns
        if (REMOVE_PATTERNS.some(p => p.test(name))) {
            removed++;
            continue;
        }

        // Check junk names
        if (isJunkName(name)) {
            removed++;
            continue;
        }

        // Reclassify "Sin Clasificar"
        if (med.category === 'Sin Clasificar') {
            const newCat = reclassify(name);
            if (newCat) {
                med.category = newCat;
                med.categoryId = newCat.toLowerCase()
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                reclassified++;
            }
        }

        cleaned.push(med);
    }

    // Remove remaining "Sin Clasificar" that are clearly not drugs
    const finalList = [];
    let removedSinClasificar = 0;

    for (const med of cleaned) {
        if (med.category === 'Sin Clasificar') {
            // Keep if it has brands (likely a real drug), remove if no brands and suspicious name
            if (med.brands && med.brands.length > 0) {
                finalList.push(med);
            } else {
                // Check if it looks like a real drug name (capitalized, reasonable length)
                const name = med.name;
                if (name.length >= 5 && name.length <= 50 && /^[A-Z][a-z]/.test(name) && !/\d{3,}/.test(name)) {
                    // Keep it as "Otros Medicamentos"
                    med.category = 'Otros Medicamentos';
                    med.categoryId = 'otros-medicamentos';
                    finalList.push(med);
                } else {
                    removedSinClasificar++;
                }
            }
        } else {
            finalList.push(med);
        }
    }

    // Sort by category, then name
    finalList.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

    // Remove duplicates (same name, different case)
    const seen = new Set();
    const deduped = finalList.filter(med => {
        const key = med.name.toLowerCase().trim();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    const dupsRemoved = finalList.length - deduped.length;

    console.log(`  🗑️  Removed (junk/allergens): ${removed}`);
    console.log(`  🗑️  Removed (unclassifiable): ${removedSinClasificar}`);
    console.log(`  🔄 Reclassified: ${reclassified}`);
    console.log(`  🔄 Duplicates removed: ${dupsRemoved}`);
    console.log(`  ✅ Final total: ${deduped.length} medications`);

    // Save
    fs.writeFileSync(FILE, JSON.stringify(deduped, null, 2), 'utf8');
    console.log(`  💾 Saved to ${FILE}`);

    // Category stats
    const cats = {};
    deduped.forEach(m => { cats[m.category] = (cats[m.category] || 0) + 1; });
    const sorted = Object.entries(cats).sort((a, b) => b[1] - a[1]);
    console.log(`\n📂 Categories (${sorted.length} total):`);
    sorted.slice(0, 30).forEach(([k, v], i) => console.log(`  ${i + 1}. ${k}: ${v}`));

    // Show remaining "Otros"
    const otros = deduped.filter(m => m.category === 'Otros Medicamentos');
    if (otros.length > 0) {
        console.log(`\n📋 "Otros Medicamentos" (${otros.length}):`);
        otros.slice(0, 20).forEach(m => console.log(`  - ${m.name}`));
    }
}

main();
