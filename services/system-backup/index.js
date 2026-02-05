const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const schedule = require('node-schedule');
const { exec } = require('child_process');

// Configuration
const SOURCE_DIR = path.resolve(__dirname, '../../'); // Root of the project
const BACKUP_ROOT = path.join(SOURCE_DIR, 'copia cada 12 horas');
const BACKUP_INTERVAL_HOURS = 12;
const COMPRESSION_AGE_DAYS = 15;
const RETENTION_AGE_MONTHS = 6;

// Ensure backup root exists
fs.ensureDirSync(BACKUP_ROOT);

console.log(`
╔════════════════════════════════════════════════════════════════╗
║  🛡️ System Backup Service                                      ║
║  📁 Source: ${SOURCE_DIR}
║  📂 Destination: ${BACKUP_ROOT}
║  ⏰ Interval: Every ${BACKUP_INTERVAL_HOURS} hours
║  📦 Compression: After ${COMPRESSION_AGE_DAYS} days
║  🗑️ Retention: ${RETENTION_AGE_MONTHS} months
╚════════════════════════════════════════════════════════════════╝
`);

// Helper: Get formatted timestamp
const getTimestamp = () => {
    const now = new Date();
    return now.toISOString().replace(/[:.]/g, '-').slice(0, 16); // YYYY-MM-DDTHH-mm
};

// Helper: Create Restore Scripts
async function createRestoreScripts(backupPath) {
    const restoreBatContent = `@echo off
echo ===================================================
echo      RESTAURACION AUTOMATICA DEL SISTEMA
echo ===================================================
echo.
echo 1. Instalando dependencias (esto puede tardar)...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Fallo al instalar dependencias.
    pause
    exit /b %errorlevel%
)

echo.
echo 2. Construyendo la aplicacion...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Fallo al construir la aplicacion.
    pause
    exit /b %errorlevel%
)

echo.
echo 3. Iniciando servicios...
call pm2 start ecosystem.config.js
if %errorlevel% neq 0 (
    echo [ERROR] Fallo al iniciar PM2. Intentando instalar PM2 globalmente...
    call npm install -g pm2
    call pm2 start ecosystem.config.js
)

echo.
echo ===================================================
echo      SISTEMA RESTAURADO EXITOSAMENTE
echo ===================================================
echo.
pause
`;

    const howToRestoreContent = `# Guía de Restauración

Esta carpeta contiene una copia completa del sistema "Laboratorio Bienestar".

## Cómo Restaurar

### Opción A (Automática - Recomendada)
1. Haz doble clic en el archivo **\`restore.bat\`**.
2. Espera a que termine el proceso (instalará dependencias y arrancará el servidor).

### Opción B (Manual)
Si prefieres hacerlo manualmente, abre una terminal en esta carpeta y ejecuta:

1. \`npm install\`
2. \`npm run build\`
3. \`pm2 start ecosystem.config.js\`

## Contenido del Backup
- Código fuente completo
- Archivos de configuración (.env, ecosystem.config.js)
- Documentación del sistema
- **NO INCLUYE**: \`node_modules\` (se regenera automáticamente)
`;

    await fs.writeFile(path.join(backupPath, 'restore.bat'), restoreBatContent);
    await fs.writeFile(path.join(backupPath, 'HOW_TO_RESTORE.md'), howToRestoreContent);
}

// Core: Perform Backup
async function performBackup() {
    const timestamp = getTimestamp();
    const backupName = `backup_${timestamp}`;
    const backupPath = path.join(BACKUP_ROOT, backupName);

    console.log(`[${new Date().toISOString()}] 🚀 Starting backup: ${backupName}`);

    try {
        // 1. Copy Files (Iterate top-level to avoid "subdirectory of itself" error)
        const items = await fs.readdir(SOURCE_DIR);

        for (const item of items) {
            // Exclusions
            if (item === 'node_modules') continue;
            if (item === '.git') continue;
            if (item === '.next') continue;
            if (item === 'copia cada 12 horas') continue; // Skip backup folder
            if (item === '.gemini') continue;

            const srcPath = path.join(SOURCE_DIR, item);
            const destPath = path.join(backupPath, item);

            await fs.copy(srcPath, destPath);
        }

        // 2. Create Restore Scripts
        await createRestoreScripts(backupPath);

        console.log(`[${new Date().toISOString()}] ✅ Backup created successfully at ${backupPath}`);

        // 3. Run Maintenance (Compression & Cleanup)
        await performMaintenance();

    } catch (error) {
        console.error(`[${new Date().toISOString()}] ❌ Backup failed:`, error);
    }
}

// Core: Maintenance (Compression & Deletion)
async function performMaintenance() {
    console.log(`[${new Date().toISOString()}] 🧹 Starting maintenance...`);

    try {
        const items = await fs.readdir(BACKUP_ROOT);
        const now = Date.now();

        for (const item of items) {
            const itemPath = path.join(BACKUP_ROOT, item);
            const stats = await fs.stat(itemPath);
            const ageDays = (now - stats.mtimeMs) / (1000 * 60 * 60 * 24);

            // 1. Deletion (> 6 months)
            if (ageDays > (RETENTION_AGE_MONTHS * 30)) {
                console.log(`[DELETE] Removing old backup: ${item} (${Math.round(ageDays)} days old)`);
                await fs.remove(itemPath);
                continue;
            }

            // 2. Compression (> 15 days, is directory, not already zipped)
            if (ageDays > COMPRESSION_AGE_DAYS && stats.isDirectory() && !item.endsWith('.zip')) {
                console.log(`[COMPRESS] Compressing old backup: ${item} (${Math.round(ageDays)} days old)`);
                await compressBackup(itemPath);
            }
        }
    } catch (error) {
        console.error(`[${new Date().toISOString()}] ⚠️ Maintenance error:`, error);
    }
}

// Helper: Compress Directory
function compressBackup(sourcePath) {
    return new Promise((resolve, reject) => {
        const zipPath = `${sourcePath}.zip`;
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', {
            zlib: { level: 9 } // Max compression
        });

        output.on('close', async () => {
            console.log(`[COMPRESS] Created ${zipPath} (${archive.pointer()} bytes)`);
            // Delete original folder after successful zip
            try {
                await fs.remove(sourcePath);
                resolve();
            } catch (err) {
                console.error('Error removing original folder after zip:', err);
                resolve(); // Resolve anyway, zip is safe
            }
        });

        archive.on('error', (err) => reject(err));

        archive.pipe(output);
        archive.directory(sourcePath, false);
        archive.finalize();
    });
}

// Schedule
// Run immediately on startup to ensure we have a backup if we just deployed
performBackup();

// Schedule every 12 hours
setInterval(performBackup, BACKUP_INTERVAL_HOURS * 60 * 60 * 1000);

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('Stopping backup service...');
    process.exit();
});
