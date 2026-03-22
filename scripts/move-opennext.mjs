import fs from 'fs';
import path from 'path';

const openNextDir = path.join(process.cwd(), '.open-next');
const assetsDir = path.join(openNextDir, 'assets');

// Archivos/carpetas a mover al directorio assets
const itemsToMove = [
    'worker.js',
    'cloudflare',
    'middleware',
    'server-functions',
    '.build'
];

for (const item of itemsToMove) {
    const src = path.join(openNextDir, item);
    let dest = path.join(assetsDir, item);

    if (item === 'worker.js') {
        dest = path.join(assetsDir, '_worker.js'); // renombrar el worker a _worker.js
    }

    if (fs.existsSync(src)) {
        console.log(`Moviendo ${item} a ${dest}...`);
        fs.renameSync(src, dest);
    } else {
        console.log(`El elemento ${item} no existe, omitiendo.`);
    }
}

console.log('¡Carpetas de OpenNext movidas correctamente a assets!');
