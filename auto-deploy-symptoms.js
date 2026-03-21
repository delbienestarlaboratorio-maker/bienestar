const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🤖 Auto-Deploy Monitor iniciado...');
console.log('📊 Monitoreará el generador y desplegará cuando termine.\n');

// Lanza el generador
const gen = spawn('node', ['generate-massive-gemini.js'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
});

gen.on('close', (code) => {
    console.log(`\n📌 Generador terminó con código: ${code}`);
    console.log('🔄 Iniciando pipeline de sincronización y deploy...\n');

    try {
        // 1. Purgar corruptos y sincronizar
        console.log('1️⃣  Limpiando y sincronizando fragmentos...');
        execSync('node deep-clean-symptoms.js', { cwd: __dirname, stdio: 'inherit' });

        // 2. Git add + commit + push
        const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'data', 'symptoms-quality.json'), 'utf8'));
        const total = db.length;
        console.log(`\n2️⃣  Haciendo git commit con ${total} síntomas...`);

        execSync('git add src/data/symptoms-quality.json src/data/symptoms.json src/data/symptoms-fragments/', {
            cwd: __dirname, stdio: 'inherit'
        });
        execSync(`git commit -m "feat: ${total} síntomas clínicos generados por Gemini AI"`, {
            cwd: __dirname, stdio: 'inherit'
        });
        execSync('git push', { cwd: __dirname, stdio: 'inherit' });

        console.log(`\n✅ DEPLOY COMPLETADO — ${total} síntomas en producción.`);
        console.log('🌐 Cloudflare Pages buildea automáticamente en ~4 min.');
    } catch (e) {
        console.error('❌ Error en pipeline:', e.message);
    }
});

gen.on('error', (err) => {
    console.error('❌ Error iniciando generador:', err);
});
