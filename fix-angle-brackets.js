const fs = require('fs');
const glob = require('glob');
const files = glob.sync('src/app/herramientas/*/page.tsx', { absolute: true });
let count = 0;
for (const f of files) {
    let c = fs.readFileSync(f, 'utf8');
    let orig = c;
    // Fix unescaped < followed by digits in text content (not JSX tags)
    c = c.replace(/<(\d)/g, '&lt;$1');
    // Fix unescaped > followed by digits in text content 
    c = c.replace(/>(\d)/g, '&gt;$1');
    if (c !== orig) {
        fs.writeFileSync(f, c);
        count++;
        const parts = f.split(/[\\/]/);
        console.log('Fixed:', parts[parts.length - 2]);
    }
}
console.log('Total files fixed:', count);
