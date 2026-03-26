const fs = require('fs');
const path = require('path');

// Fix src/data references in lib files
const libFiles = ['lib/build-time-data.ts', 'lib/data-loader.ts'];
libFiles.forEach(f => {
    if (!fs.existsSync(f)) { console.log('SKIP:', f); return; }
    let c = fs.readFileSync(f, 'utf8');
    const orig = c;
    // Replace path.join(process.cwd(), 'src', 'data', ...) with path.join(process.cwd(), 'data', ...)
    c = c.replace(/'src',\s*'data'/g, "'data'");
    c = c.replace(/src\/data/g, 'data');
    if (c !== orig) {
        fs.writeFileSync(f, c, 'utf8');
        console.log('Fixed:', f);
    } else {
        console.log('OK (no changes):', f);
    }
});

// Fix src/data references in all page.tsx files
function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) walkDir(full);
        else if (e.name === 'page.tsx') {
            let c = fs.readFileSync(full, 'utf8');
            const orig = c;
            c = c.replace(/'src',\s*'data'/g, "'data'");
            if (c !== orig) {
                fs.writeFileSync(full, c, 'utf8');
                console.log('Fixed:', full);
            }
        }
    }
}
walkDir('app');
console.log('All paths fixed!');
