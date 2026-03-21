/**
 * inject-related-tools.js
 * ────────────────────────
 * Injects the <RelatedTools> component into every page.tsx inside /herramientas/.
 * Also injects into /sintomas/, /enfermedades/, /check-ups/, etc.
 *
 * Run: node inject-related-tools.js
 */

const fs = require('fs');
const path = require('path');

const HERRAMIENTAS_DIR = path.join(__dirname, 'src', 'app', 'herramientas');

const IMPORT_LINE = "import { RelatedTools } from '@/components/ui/RelatedTools';";

let injected = 0;
let skipped = 0;
let errors = 0;

function processFile(filePath) {
    const relPath = path.relative(__dirname, filePath);
    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Skip if already has RelatedTools
        if (content.includes('RelatedTools')) {
            skipped++;
            return;
        }

        // 1. Add import
        if (!content.includes(IMPORT_LINE)) {
            // Add after last import line
            const importRegex = /^import .+$/gm;
            let lastImportEnd = 0;
            let m;
            while ((m = importRegex.exec(content)) !== null) {
                lastImportEnd = m.index + m[0].length;
            }
            if (lastImportEnd > 0) {
                content = content.slice(0, lastImportEnd) + '\n' + IMPORT_LINE + content.slice(lastImportEnd);
            }
        }

        // 2. Determine the href for this tool
        const hrefMatch = filePath.match(/herramientas[\\\/]([^\\\/]+)/);
        const href = hrefMatch ? `/herramientas/${hrefMatch[1]}` : '/herramientas';

        // 3. Find injection point: right before the last </div> </main>, before the closing container
        // Strategy: insert before the last <AdBanner variant="compact"  or before the last disclaimer div
        const relatedJSX = `\n                <RelatedTools currentPath="${href}" className="mb-8" />\n`;

        // Try to inject before the last AdBanner compact
        const compactIdx = content.lastIndexOf('variant="compact"');
        if (compactIdx > -1) {
            // Find the <AdBanner that contains this
            const adStart = content.lastIndexOf('<AdBanner', compactIdx);
            if (adStart > -1) {
                content = content.slice(0, adStart) + relatedJSX + '                ' + content.slice(adStart);
                fs.writeFileSync(filePath, content, 'utf8');
                injected++;
                console.log(`✅ ${relPath}`);
                return;
            }
        }

        // Fallback: inject before the last </main>
        const mainClose = content.lastIndexOf('</main>');
        if (mainClose > -1) {
            // Go back to find a good spot — before the closing divs
            const spot = content.lastIndexOf('</div>', mainClose);
            if (spot > -1) {
                content = content.slice(0, spot) + relatedJSX + '            ' + content.slice(spot);
                fs.writeFileSync(filePath, content, 'utf8');
                injected++;
                console.log(`✅ ${relPath} (fallback)`);
                return;
            }
        }

        console.log(`⚠️  ${relPath} — no injection point found`);
        errors++;
    } catch (err) {
        console.error(`❌ ${relPath}: ${err.message}`);
        errors++;
    }
}

// Process all herramientas
function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const pageFile = path.join(full, 'page.tsx');
            if (fs.existsSync(pageFile)) {
                processFile(pageFile);
            }
        }
    }
}

console.log('🔧 Injecting RelatedTools into herramientas...\n');
walkDir(HERRAMIENTAS_DIR);

// Also process other main pages
const OTHER_PAGES = [
    { file: 'src/app/sintomas/page.tsx', href: '/sintomas' },
    { file: 'src/app/enfermedades/page.tsx', href: '/enfermedades' },
    { file: 'src/app/check-ups/page.tsx', href: '/check-ups' },
    { file: 'src/app/sueroterapia/page.tsx', href: '/sueroterapia' },
    { file: 'src/app/valores-clinicos/page.tsx', href: '/valores-clinicos' },
    { file: 'src/app/estudios/page.tsx', href: '/estudios' },
];

console.log('\n🔧 Injecting into other pages...\n');
for (const { file, href } of OTHER_PAGES) {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('RelatedTools')) {
            console.log(`⏭️  ${file} — already has RelatedTools`);
            skipped++;
            continue;
        }

        // Add import
        const importRegex = /^import .+$/gm;
        let lastImportEnd = 0;
        let m;
        while ((m = importRegex.exec(content)) !== null) {
            lastImportEnd = m.index + m[0].length;
        }
        if (lastImportEnd > 0) {
            content = content.slice(0, lastImportEnd) + '\n' + IMPORT_LINE + content.slice(lastImportEnd);
        }

        const relatedJSX = `\n                <RelatedTools currentPath="${href}" className="mb-8" />\n`;

        // Try before last AdBanner
        const compactIdx = content.lastIndexOf('variant="compact"');
        const horizIdx = content.lastIndexOf('AdBanner');
        const adIdx = Math.max(compactIdx, horizIdx);
        if (adIdx > -1) {
            const adStart = content.lastIndexOf('<AdBanner', adIdx);
            if (adStart > -1) {
                content = content.slice(0, adStart) + relatedJSX + '                ' + content.slice(adStart);
                fs.writeFileSync(fullPath, content, 'utf8');
                injected++;
                console.log(`✅ ${file}`);
                continue;
            }
        }

        // Fallback
        const mainClose = content.lastIndexOf('</main>');
        if (mainClose > -1) {
            const spot = content.lastIndexOf('</div>', mainClose);
            if (spot > -1) {
                content = content.slice(0, spot) + relatedJSX + '            ' + content.slice(spot);
                fs.writeFileSync(fullPath, content, 'utf8');
                injected++;
                console.log(`✅ ${file} (fallback)`);
                continue;
            }
        }
        console.log(`⚠️  ${file} — no injection point`);
        errors++;
    } else {
        console.log(`⏭️  ${file} — not found`);
    }
}

console.log(`\n═══════════════════════════════`);
console.log(`✅ Injected: ${injected}`);
console.log(`⏭️  Skipped:  ${skipped}`);
console.log(`❌ Errors:   ${errors}`);
console.log(`═══════════════════════════════`);
