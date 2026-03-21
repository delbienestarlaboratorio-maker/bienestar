/**
 * Parse FDA NDC Directory (product.txt) to extract unique active ingredients.
 * Source: https://www.accessdata.fda.gov/cder/ndctext.zip
 * 
 * This extracts REAL medications from the official FDA database.
 * Run: node scripts/parse-fda-ndc.js
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const INPUT = path.join(process.env.TEMP, 'ndc', 'product.txt');
const OUTPUT = path.join(__dirname, 'fda-medications-raw.json');

async function main() {
    console.log('📋 Parsing FDA NDC product.txt …');

    const stream = fs.createReadStream(INPUT, 'utf8');
    const rl = readline.createInterface({ input: stream });

    let headers = null;
    let lineCount = 0;

    // Map: substanceName → { categories: Set, brands: Set, dosageForms: Set, routes: Set }
    const substanceMap = new Map();
    // Map: pharmClass → Set<substanceName>
    const categoryMap = new Map();

    for await (const line of rl) {
        lineCount++;
        const cols = line.split('\t');

        if (lineCount === 1) {
            headers = cols;
            console.log('  Headers:', headers.join(' | '));
            continue;
        }

        // Extract key fields
        const productType = cols[2] || '';  // PRODUCTTYPENAME
        const brandName = cols[3] || '';  // PROPRIETARYNAME
        const genericName = cols[5] || '';  // NONPROPRIETARYNAME
        const dosageForm = cols[6] || '';  // DOSAGEFORMNAME
        const route = cols[7] || '';  // ROUTENAME
        const labeler = cols[12] || '';  // LABELERNAME
        const substanceName = cols[13] || '';  // SUBSTANCENAME
        const pharmClasses = cols[16] || '';  // PHARM_CLASSES

        if (!substanceName.trim()) continue;

        // SUBSTANCENAME can contain multiple substances separated by "; "
        const substances = substanceName.split('; ').map(s => s.trim()).filter(Boolean);

        // PHARM_CLASSES is comma-separated with type tags like [EPC], [CS], [MoA], [PE]
        // We want the [EPC] (Established Pharmacologic Class) entries
        const epcClasses = pharmClasses
            .split(',')
            .map(s => s.trim())
            .filter(s => s.includes('[EPC]'))
            .map(s => s.replace('[EPC]', '').trim());

        for (const sub of substances) {
            const key = sub.toLowerCase();

            if (!substanceMap.has(key)) {
                substanceMap.set(key, {
                    name: sub,
                    brands: new Set(),
                    categories: new Set(),
                    dosageForms: new Set(),
                    routes: new Set(),
                    productTypes: new Set()
                });
            }

            const entry = substanceMap.get(key);
            if (brandName) entry.brands.add(brandName);
            if (dosageForm) entry.dosageForms.add(dosageForm);
            if (route) entry.routes.add(route);
            if (productType) entry.productTypes.add(productType);

            for (const epc of epcClasses) {
                entry.categories.add(epc);
                if (!categoryMap.has(epc)) categoryMap.set(epc, new Set());
                categoryMap.get(epc).add(sub);
            }
        }
    }

    console.log(`  📊 Parsed ${lineCount.toLocaleString()} product rows`);
    console.log(`  💊 Found ${substanceMap.size.toLocaleString()} unique active ingredients`);
    console.log(`  📂 Found ${categoryMap.size.toLocaleString()} pharmacologic classes`);

    // Convert to array
    const medications = Array.from(substanceMap.values()).map(entry => ({
        name: entry.name,
        brands: [...entry.brands].slice(0, 10),   // Limit to top 10 brands
        categories: [...entry.categories],
        dosageForms: [...entry.dosageForms],
        routes: [...entry.routes],
        productTypes: [...entry.productTypes]
    }));

    // Sort alphabetically
    medications.sort((a, b) => a.name.localeCompare(b.name));

    // Also output category summary
    const categorySummary = Array.from(categoryMap.entries())
        .map(([name, substances]) => ({ name, count: substances.size }))
        .sort((a, b) => b.count - a.count);

    const output = {
        source: 'FDA National Drug Code Directory (NDC)',
        sourceUrl: 'https://www.accessdata.fda.gov/cder/ndctext.zip',
        extractedAt: new Date().toISOString(),
        totalMedications: medications.length,
        totalCategories: categorySummary.length,
        categories: categorySummary,
        medications
    };

    fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2), 'utf8');
    console.log(`  ✅ Saved to ${OUTPUT}`);

    // Print top 20 categories
    console.log('\n🏷️  Top 20 Pharmacologic Classes:');
    categorySummary.slice(0, 20).forEach((c, i) => {
        console.log(`  ${i + 1}. ${c.name} (${c.count} substances)`);
    });

    // Print some sample rare drugs
    console.log('\n💎 Sample rare/specialty drugs found:');
    const rareTerms = ['orphan', 'gene therapy', 'enzyme replacement', 'monoclonal', 'kinase inhibitor'];
    for (const term of rareTerms) {
        const found = medications.filter(m =>
            m.categories.some(c => c.toLowerCase().includes(term)) ||
            m.name.toLowerCase().includes(term)
        );
        if (found.length) console.log(`  ${term}: ${found.length} (e.g., ${found.slice(0, 3).map(f => f.name).join(', ')})`);
    }
}

main().catch(err => { console.error(err); process.exit(1); });
