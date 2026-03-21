const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/app/herramientas/*/page.tsx', { absolute: true });
let fixedFiles = 0;

for (const f of files) {
    let c = fs.readFileSync(f, 'utf8');
    const marker = 'Gu\u00eda ';
    const seoIdx = c.indexOf(marker);
    if (seoIdx === -1) continue;

    const before = c.slice(0, seoIdx);
    let after = c.slice(seoIdx);
    const orig = after;

    // Escape any < NOT followed by valid tag start chars
    after = after.replace(/<([^a-zA-Z\/\!\{])/g, '&lt;$1');

    // Fix h4/h3 mismatches on same line
    const lines = after.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('<h4') && lines[i].includes('</h3>')) {
            lines[i] = lines[i].replace('</h3>', '</h4>');
        }
    }
    after = lines.join('\n');

    if (after !== orig) {
        fs.writeFileSync(f, before + after);
        fixedFiles++;
        const parts = f.split(/[\\/]/);
        console.log('Fixed:', parts[parts.length - 2]);
    }
}
console.log('Total post-fix files:', fixedFiles);
