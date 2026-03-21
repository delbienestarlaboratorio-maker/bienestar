const fs = require('fs');
const path = require('path');

const dir = 'd:/Paginas_web/pagina/laboratorio-bienestar/src/app/precios';
let fixedCount = 0;

function fixLine(line) {
    let result = line;

    // Fix < followed by digits or negative numbers in text content
    // Lookbehind: preceded by whitespace, semicolons, periods, commas, opening parens
    // Matches: <20, <-2.5, etc.
    result = result.replace(/(?<=[\s;.,\(])<(-?\d)/g, "{'<'}$1");

    // Fix > followed by digits or negative numbers in text content 
    // Lookbehind: preceded by whitespace, semicolons, periods, commas, opening parens
    // Matches: >30, >-1, >99%, etc.
    result = result.replace(/(?<=[\s;.,\(])>(-?\d)/g, "{'>'}$1");

    return result;
}

function walk(d) {
    fs.readdirSync(d).forEach(f => {
        const fp = path.join(d, f);
        if (fs.statSync(fp).isDirectory()) walk(fp);
        else if (f === 'page.tsx') {
            const content = fs.readFileSync(fp, 'utf8');
            const lines = content.split('\n');
            let changed = false;

            for (let i = 0; i < lines.length; i++) {
                const fixed = fixLine(lines[i]);
                if (fixed !== lines[i]) {
                    console.log(`  Line ${i + 1}: ${lines[i].trim().substring(0, 80)}`);
                    console.log(`  Fixed:  ${fixed.trim().substring(0, 80)}`);
                    lines[i] = fixed;
                    changed = true;
                }
            }

            if (changed) {
                fs.writeFileSync(fp, lines.join('\n'), 'utf8');
                fixedCount++;
                console.log('Fixed:', fp);
                console.log('');
            }
        }
    });
}

walk(dir);
console.log('Total fixed:', fixedCount);
