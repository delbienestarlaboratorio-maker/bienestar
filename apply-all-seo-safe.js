// Apply all SEO, then detect and revert files with broken <digit patterns
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { execSync } = require('child_process');
const TOOLS_DIR = path.join(__dirname, 'src', 'app', 'herramientas');

// Step 1: Apply all batch JSONs
const batchFiles = glob.sync('seo-batch*.json', { cwd: __dirname, absolute: true });
let totalApplied = 0;
for (const bf of batchFiles) {
    const batch = JSON.parse(fs.readFileSync(bf, 'utf8'));
    for (const item of batch) {
        const pageFile = path.join(TOOLS_DIR, item.slug, 'page.tsx');
        if (!fs.existsSync(pageFile)) continue;
        let content = fs.readFileSync(pageFile, 'utf8');
        if (content.includes('Gu\u00eda ')) continue;
        const adBannerIndex = content.indexOf('<AdBanner');
        if (adBannerIndex === -1) continue;
        content = content.slice(0, adBannerIndex) + item.content + '\n' + content.slice(adBannerIndex);
        fs.writeFileSync(pageFile, content);
        totalApplied++;
    }
}
console.log('Total SEO applied:', totalApplied);

// Step 2: Scan for problematic files and revert them
const files = glob.sync('*/page.tsx', { cwd: TOOLS_DIR, absolute: true });
let problemFiles = [];
for (const f of files) {
    const c = fs.readFileSync(f, 'utf8');
    const guiaIdx = c.indexOf('Gu\u00eda ');
    if (guiaIdx === -1) continue;

    // Only check the SEO section (after Guia)
    const seoBlock = c.slice(guiaIdx);

    // Check for raw < not followed by valid HTML tag characters
    // Valid: <a, <p, <h1-6, <ul, <ol, <li, <div, <section, <strong, <span, <br, </...
    const dangerousPattern = /<[^a-zA-Z\/\!\-]/;
    if (dangerousPattern.test(seoBlock)) {
        const slug = path.basename(path.dirname(f));
        problemFiles.push(slug);
    }
}

if (problemFiles.length > 0) {
    console.log('Problematic files (reverting ' + problemFiles.length + '):', problemFiles.join(', '));
    for (const slug of problemFiles) {
        const pageFile = path.join(TOOLS_DIR, slug, 'page.tsx');
        execSync('git checkout HEAD -- ' + pageFile.replace(/\\/g, '/'));
        console.log('  Reverted:', slug);
    }
} else {
    console.log('No problematic files found!');
}

// Step 3: Also fix h4/h3 mismatches on same line in remaining files
const allFiles = glob.sync('*/page.tsx', { cwd: TOOLS_DIR, absolute: true });
let h4Fixed = 0;
for (const f of allFiles) {
    const c = fs.readFileSync(f, 'utf8');
    if (!c.includes('Gu\u00eda ')) continue;
    const lines = c.split('\n');
    let changed = false;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('<h4') && lines[i].includes('</h3>')) {
            lines[i] = lines[i].replace('</h3>', '</h4>');
            changed = true;
        }
    }
    if (changed) {
        fs.writeFileSync(f, lines.join('\n'));
        h4Fixed++;
    }
}
console.log('h4/h3 mismatches fixed:', h4Fixed);

// Final count
let finalMissing = 0;
for (const f of allFiles) {
    const c = fs.readFileSync(f, 'utf8');
    if (!c.includes('Gu\u00eda ')) finalMissing++;
}
console.log('Final calculators without SEO:', finalMissing);
