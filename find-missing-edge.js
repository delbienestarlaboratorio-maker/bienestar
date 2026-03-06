const fs = require('fs');
const path = require('path');

function walk(dir, results = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) walk(full, results);
        else if (e.name === 'route.ts' || e.name === 'route.tsx') results.push(full);
    }
    return results;
}

const appDir = path.join(__dirname, 'src', 'app');
const routes = walk(appDir);
const missing = routes.filter(f => {
    const c = fs.readFileSync(f, 'utf8');
    return !c.includes("runtime = 'edge'") && !c.includes('runtime = "edge"');
});

console.log(`Total API routes: ${routes.length}`);
console.log(`Missing edge runtime: ${missing.length}`);
missing.forEach(m => console.log(' -', m.replace(__dirname, '')));
