/**
 * Merge FDA NDC data with existing medication-master-list.json
 * Creates a unified, deduplicated database of medications from official sources.
 * 
 * Strategy:
 * 1. Keep existing medications (they have curated Spanish names + brands)
 * 2. Add new FDA medications that don't exist yet
 * 3. Map FDA Pharmacologic Classes → Spanish category names
 * 
 * Run: node scripts/merge-fda-into-master.js
 */
const fs = require('fs');
const path = require('path');

const EXISTING = path.join(__dirname, 'medication-master-list.json');
const FDA_RAW = path.join(__dirname, 'fda-medications-raw.json');
const OUTPUT = path.join(__dirname, 'medication-master-list.json');
const BACKUP = path.join(__dirname, 'medication-master-list.backup.json');

// Map FDA EPC classes → Spanish category names
const EPC_TO_CATEGORY = {
    // ---- Analgesics & NSAIDs ----
    'Nonsteroidal Anti-inflammatory Drug': 'Antiinflamatorios No Esteroideos (AINEs)',
    'Cyclooxygenase Inhibitor': 'Antiinflamatorios No Esteroideos (AINEs)',
    'Opioid Agonist': 'Analgésicos Opioides',
    'Analgesic': 'Analgésicos y Antipiréticos',

    // ---- Antibiotics ----
    'Penicillin-class Antibacterial': 'Antibióticos — Penicilinas y Derivados',
    'Cephalosporin-class Antibacterial': 'Antibióticos — Cefalosporinas',
    'Macrolide Antimicrobial': 'Antibióticos — Macrólidos y otros',
    'Fluoroquinolone Antibacterial': 'Antibióticos — Quinolonas',
    'Aminoglycoside Antibacterial': 'Antibióticos — Aminoglucósidos',
    'Carbapenem Antibacterial': 'Antibióticos — Carbapenémicos',
    'Tetracycline-class Antibacterial': 'Antibióticos — Tetraciclinas',
    'Lincosamide Antibacterial': 'Antibióticos — Lincosamidas',
    'Sulfonamide Antibacterial': 'Antibióticos — Sulfonamidas',
    'Glycopeptide Antibacterial': 'Antibióticos — Glucopéptidos',
    'Oxazolidinone Antibacterial': 'Antibióticos — Oxazolidinonas',
    'Nitroimidazole Antimicrobial': 'Antibióticos — Nitroimidazoles',

    // ---- Antifungals & Antivirals ----
    'Azole Antifungal': 'Antifúngicos',
    'Polyene Antifungal': 'Antifúngicos',
    'Echinocandin Antifungal': 'Antifúngicos',
    'Nucleoside Analog Antiviral': 'Antivirales',
    'Protease Inhibitor': 'Antivirales — Inhibidores de Proteasa',
    'Non-nucleoside Reverse Transcriptase Inhibitor': 'Antirretrovirales (VIH)',
    'Nucleoside Reverse Transcriptase Inhibitor': 'Antirretrovirales (VIH)',
    'Integrase Strand Transfer Inhibitor': 'Antirretrovirales (VIH)',
    'HIV Protease Inhibitor': 'Antirretrovirales (VIH)',

    // ---- Cardiovascular ----
    'Angiotensin Converting Enzyme Inhibitor': 'Antihipertensivos — IECA',
    'Angiotensin 2 Receptor Blocker': 'Antihipertensivos — ARA II',
    'Dihydropyridine Calcium Channel Blocker': 'Antihipertensivos — Calcio Antagonistas',
    'Non-Dihydropyridine Calcium Channel Blocker': 'Antihipertensivos — Calcio Antagonistas',
    'Beta-adrenergic Blocker': 'Antihipertensivos — Betabloqueadores',
    'HMG-CoA Reductase Inhibitor': 'Estatinas e Hipolipemiantes',
    'Fibrate': 'Estatinas e Hipolipemiantes',
    'Anti-coagulant': 'Anticoagulantes y Antiplaquetarios',
    'Platelet Aggregation Inhibitor': 'Anticoagulantes y Antiplaquetarios',
    'Direct Thrombin Inhibitor': 'Anticoagulantes y Antiplaquetarios',
    'Factor Xa Inhibitor': 'Anticoagulantes y Antiplaquetarios',
    'Loop Diuretic': 'Diuréticos',
    'Thiazide Diuretic': 'Diuréticos',
    'Potassium-sparing Diuretic': 'Diuréticos',
    'Aldosterone Antagonist': 'Diuréticos',
    'Cardiac Glycoside': 'Cardiovasculares — Otros',
    'Antiarrhythmic': 'Cardiovasculares — Antiarrítmicos',
    'Nitrate Vasodilator': 'Cardiovasculares — Vasodilatadores',

    // ---- Diabetes ----
    'Biguanide': 'Antidiabéticos Orales',
    'Sulfonylurea': 'Antidiabéticos Orales',
    'Dipeptidyl Peptidase 4 Inhibitor': 'Antidiabéticos Orales',
    'Sodium-Glucose Cotransporter 2 Inhibitor': 'Antidiabéticos Orales — Inhibidores SGLT2',
    'Thiazolidinedione': 'Antidiabéticos Orales',
    'GLP-1 Receptor Agonist': 'Agonistas del Receptor GLP-1',
    'Insulin': 'Insulinas y Análogos',
    'Rapid-Acting Insulin': 'Insulinas y Análogos',
    'Long-Acting Insulin': 'Insulinas y Análogos',

    // ---- CNS / Psychiatry ----
    'Selective Serotonin Reuptake Inhibitor': 'Antidepresivos — ISRS',
    'Serotonin and Norepinephrine Reuptake Inhibitor': 'Antidepresivos — IRSN',
    'Tricyclic Antidepressant': 'Antidepresivos — Tricíclicos',
    'Atypical Antidepressant': 'Antidepresivos — Atípicos',
    'Benzodiazepine': 'Ansiolíticos y Sedantes',
    'Atypical Antipsychotic': 'Antipsicóticos Atípicos',
    'Typical Antipsychotic': 'Antipsicóticos Típicos',
    'Anticonvulsant': 'Anticonvulsivantes / Antiepilépticos',
    'Gamma-aminobutyric Acid Analog': 'Anticonvulsivantes / Antiepilépticos',
    'Dopamine Agonist': 'Antiparkinsonianos',
    'Cholinesterase Inhibitor': 'Alzheimer y Demencias',
    'NMDA Receptor Antagonist': 'Alzheimer y Demencias',

    // ---- Respiratory ----
    'Short-Acting Beta2-Adrenergic Agonist': 'Respiratorios — Asma y EPOC',
    'Long-Acting Beta2-Adrenergic Agonist': 'Respiratorios — Asma y EPOC',
    'Inhaled Corticosteroid': 'Respiratorios — Asma y EPOC',
    'Muscarinic Antagonist': 'Respiratorios — Asma y EPOC',
    'Leukotriene Receptor Antagonist': 'Respiratorios — Asma y EPOC',

    // ---- GI ----
    'Proton Pump Inhibitor': 'Gastrointestinales — Antiácidos e IBP',
    'Histamine-2 Receptor Antagonist': 'Gastrointestinales — Antiácidos e IBP',
    'Antidiarrheal': 'Antidiarreicos y Soluciones de Rehidratación',
    'Osmotic Laxative': 'Gastrointestinales — Laxantes',
    'Stimulant Laxative': 'Gastrointestinales — Laxantes',
    'Serotonin-3 Receptor Antagonist': 'Antieméticos',
    'Dopamine Antagonist': 'Gastrointestinales — Procinéticos',

    // ---- Allergy & Immunology ----
    'Histamine H1 Receptor Antagonist': 'Antialérgicos y Antihistamínicos',
    'Corticosteroid': 'Corticosteroides Sistémicos',
    'Calcineurin Inhibitor Immunosuppressant': 'Inmunosupresores y Biológicos',
    'Purine Antimetabolite': 'Inmunosupresores y Biológicos',
    'Tumor Necrosis Factor Blocker': 'Biológicos — Anti-TNF',
    'Interleukin Inhibitor': 'Biológicos — Anti-Interleucinas',

    // ---- Oncology ----
    'Kinase Inhibitor': 'Antineoplásicos — Inhibidores de Quinasa',
    'Tyrosine Kinase Inhibitor': 'Antineoplásicos — Inhibidores de Tirosina Quinasa',
    'Platinum-based Antineoplastic': 'Antineoplásicos — Quimioterapia Clásica',
    'Antimitotic': 'Antineoplásicos — Quimioterapia Clásica',
    'Alkylating Drug': 'Antineoplásicos — Quimioterapia Clásica',
    'Anthracycline Topoisomerase Inhibitor': 'Antineoplásicos — Quimioterapia Clásica',
    'Antimetabolite': 'Antineoplásicos — Antimetabolitos',
    'Programmed Death Receptor-1 Blocking Antibody': 'Antineoplásicos — Inmunoterapia (Anti-PD1/PDL1)',
    'PD-L1 Blocking Antibody': 'Antineoplásicos — Inmunoterapia (Anti-PD1/PDL1)',
    'CD20-Directed Cytolytic Antibody': 'Antineoplásicos — Terapias Dirigidas',
    'HER2/ErbB2 Receptor Inhibitor': 'Antineoplásicos — Terapias Dirigidas',
    'VEGF/VEGFR Inhibitor': 'Antineoplásicos — Terapias Dirigidas',
    'Proteasome Inhibitor': 'Antineoplásicos — Terapias Dirigidas',
    'BCR-ABL Tyrosine Kinase Inhibitor': 'Antineoplásicos — Terapias Dirigidas',
    'Hormones and antihormones': 'Antineoplásicos — Hormonoterapia',
    'Aromatase Inhibitor': 'Antineoplásicos — Hormonoterapia',
    'Antiandrogen': 'Antineoplásicos — Hormonoterapia',
    'Selective Estrogen Receptor Modulator': 'Moduladores Selectivos de Receptores de Estrógeno',

    // ---- Endocrine ----
    'Thyroid Hormone': 'Tiroideos y Antitiroideos',
    'Antithyroid Agent': 'Tiroideos y Antitiroideos',
    'Bisphosphonate': 'Osteoporosis y Metabolismo Óseo',
    'Parathyroid Hormone Analog': 'Osteoporosis y Metabolismo Óseo',

    // ---- Specialty / Rare ----
    'Enzyme Replacement Therapy': 'Enzimas de Reemplazo (Enfermedades Raras)',
    'Complement Inhibitor': 'Medicamentos Huérfanos — Inhibidores del Complemento',
    'Gene Therapy': 'Terapia Génica',
    'Antisense Oligonucleotide': 'Terapia Génica — Oligonucleótidos Antisentido',
    'Blood Coagulation Factor': 'Hemoderivados y Factores de Coagulación',
    'Immunoglobulin': 'Inmunoglobulinas',

    // ---- Dermatology ----
    'Retinoid': 'Dermatológicos — Retinoides',
    'Topical Corticosteroid': 'Dermatológicos — Corticosteroides Tópicos',

    // ---- Urology ----
    'Alpha-1 Adrenergic Blocker': 'Urológicos — Alfa-bloqueadores',
    '5-alpha Reductase Inhibitor': 'Urológicos — Inhibidores de 5-alfa Reductasa',

    // ---- Anesthesia ----
    'Amide Local Anesthetic': 'Anestésicos Locales',
    'Ester Local Anesthetic': 'Anestésicos Locales',
    'General Anesthetic': 'Anestésicos Generales',
    'Neuromuscular Blocker': 'Relajantes Neuromusculares',

    // ---- Ophthalmology ----
    'Prostaglandin Analog': 'Oftalmológicos — Análogos de Prostaglandina',
    'Carbonic Anhydrase Inhibitor': 'Oftalmológicos — Inhibidores de Anhidrasa',

    // ---- Contrast Agents ----
    'Paramagnetic Contrast Agent': 'Medios de Contraste — Paramagnéticos (Gadolinio)',
    'Iodinated Contrast Agent': 'Medios de Contraste — Yodados',

    // ---- Vaccines ----
    'Vaccine': 'Vacunas',

    // ---- Supplements ----
    'Vitamin C': 'Vitaminas y Suplementos',
    'Vitamin D Analog': 'Vitaminas y Suplementos',
    'Iron Supplement': 'Antianémicos y Hematológicos',

    // ---- Hormones ----
    'Progestin': 'Anticonceptivos y Hormonas',
    'Estrogen': 'Hormonas Femeninas',
    'Androgen': 'Hormonas Masculinas',
    'Phosphodiesterase 5 Inhibitor': 'Disfunción Eréctil',

    // ---- Antiparasitic ----
    'Anthelmintic': 'Antiparasitarios y Antihelmínticos',
    'Antimalarial': 'Antimaláricos',

    // ---- Skeletal Muscle Relaxants ----
    'Skeletal Muscle Relaxant': 'Relajantes Musculares',

    // ---- Antidotes ----
    'Opioid Antagonist': 'Antídotos y Emergencias',
    'Antidote': 'Antídotos y Emergencias',
};

// Fallback: generic EPC → category
function mapCategory(epcClasses) {
    for (const epc of epcClasses) {
        if (EPC_TO_CATEGORY[epc]) return EPC_TO_CATEGORY[epc];
    }
    // Try partial match
    for (const epc of epcClasses) {
        for (const [key, val] of Object.entries(EPC_TO_CATEGORY)) {
            if (epc.toLowerCase().includes(key.toLowerCase())) return val;
        }
    }
    // Use the first EPC as-is (in English) if no mapping
    if (epcClasses.length > 0) return epcClasses[0];
    return 'Sin Clasificar';
}

function slugify(text) {
    return text.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function main() {
    console.log('🔀 Merging FDA data into medication master list…');

    // 1. Load existing
    const existing = JSON.parse(fs.readFileSync(EXISTING, 'utf8'));
    console.log(`  📊 Existing: ${existing.length} medications`);

    // 2. Backup
    fs.writeFileSync(BACKUP, JSON.stringify(existing, null, 2), 'utf8');
    console.log(`  💾 Backup saved to ${BACKUP}`);

    // 3. Load FDA
    const fda = JSON.parse(fs.readFileSync(FDA_RAW, 'utf8'));
    console.log(`  🏛️  FDA: ${fda.totalMedications} medications`);

    // 4. Build existing index (by slug)
    const existingIndex = new Set();
    for (const med of existing) {
        existingIndex.add(slugify(med.name));
    }

    // 5. Add new FDA medications
    let added = 0;
    let skipped = 0;
    const categoryStats = {};

    for (const fdaMed of fda.medications) {
        const slug = slugify(fdaMed.name);

        // Skip if already exists
        if (existingIndex.has(slug)) {
            skipped++;
            continue;
        }

        // Skip allergenic extracts and non-drug substances
        const skipTerms = ['allergenic extract', 'pollen', 'animal hair', 'insect venom',
            'dust mite', 'mold', 'dog dander', 'cat dander', 'cockroach',
            'horse dander', 'feather', 'kapok', 'ragweed', 'grass mix',
            'timothy grass', 'tree mix', 'bermuda grass'];
        const nameLower = fdaMed.name.toLowerCase();
        if (skipTerms.some(t => nameLower.includes(t))) {
            skipped++;
            continue;
        }

        // Map category
        const category = mapCategory(fdaMed.categories);

        // Format brands (capitalize properly)
        const brands = fdaMed.brands
            .filter(b => b.length > 1)
            .map(b => b.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '))
            .slice(0, 8);

        // Format name (Title Case)
        const name = fdaMed.name.split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(' ');

        existing.push({
            name,
            category,
            categoryId: slugify(category),
            brands: brands.length > 0 ? brands : undefined,
            source: 'FDA-NDC',
            fdaPharmClasses: fdaMed.categories.slice(0, 3)
        });

        existingIndex.add(slug);
        added++;

        categoryStats[category] = (categoryStats[category] || 0) + 1;
    }

    console.log(`  ✅ Added: ${added} new medications`);
    console.log(`  ⏭️  Skipped (duplicates/allergens): ${skipped}`);
    console.log(`  📊 Final total: ${existing.length} medications`);

    // Sort by category, then name
    existing.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

    // Save
    fs.writeFileSync(OUTPUT, JSON.stringify(existing, null, 2), 'utf8');
    console.log(`\n  💾 Saved to ${OUTPUT}`);

    // Print new category stats
    const sortedCats = Object.entries(categoryStats).sort((a, b) => b[1] - a[1]);
    console.log(`\n📂 New categories added (top 30):`);
    sortedCats.slice(0, 30).forEach(([cat, count], i) => {
        console.log(`  ${i + 1}. ${cat}: +${count}`);
    });
}

main();
