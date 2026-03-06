const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

const PORT = 30210;
const BACKUP_INTERVAL = 10 * 60 * 1000; // 10 minutos en milisegundos
const DOCS_PATH = 'D:\\Paginas_web\\pagina\\laboratorio-bienestar\\33ebb4da-ca02-4d77-9332-d03a45bd00d5';

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Estado en memoria de documentación
let documentationState = {
    sessions: [],
    apiCalls: [],
    errors: [],
    analytics: [],
    userInteractions: []
};

// Crear directorio de documentación si no existe
async function ensureDocsDirectory() {
    try {
        await fs.mkdir(DOCS_PATH, { recursive: true });
        console.log(`✓ Directorio de documentación creado/verificado: ${DOCS_PATH}`);
    } catch (error) {
        console.error('Error creando directorio de documentación:', error);
    }
}

// Guardar snapshot de documentación
async function saveDocumentationSnapshot() {
    try {
        const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '_');
        const filename = `snapshot_${timestamp}.json`;
        const filePath = path.join(DOCS_PATH, filename);

        // Agregar metadata al snapshot
        const snapshot = {
            timestamp: new Date().toISOString(),
            serverUptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
            data: documentationState,
            stats: {
                totalSessions: documentationState.sessions.length,
                totalApiCalls: documentationState.apiCalls.length,
                totalErrors: documentationState.errors.length,
                totalAnalytics: documentationState.analytics.length,
                totalInteractions: documentationState.userInteractions.length
            }
        };

        await fs.writeFile(filePath, JSON.stringify(snapshot, null, 2), 'utf-8');
        console.log(`✓ Snapshot guardado: ${filename}`);

        // Guardar también un archivo "latest.json" para fácil acceso
        const latestPath = path.join(DOCS_PATH, 'latest.json');
        await fs.writeFile(latestPath, JSON.stringify(snapshot, null, 2), 'utf-8');

        // Limpiar snapshots antiguos (mantener solo los últimos 50)
        await cleanOldSnapshots();

        return { success: true, filename, path: filePath };
    } catch (error) {
        console.error('Error guardando snapshot:', error);
        return { success: false, error: error.message };
    }
}

// Limpiar snapshots antiguos
async function cleanOldSnapshots() {
    try {
        const files = await fs.readdir(DOCS_PATH);
        const snapshotFiles = files
            .filter(f => f.startsWith('snapshot_') && f.endsWith('.json'))
            .map(f => ({
                name: f,
                path: path.join(DOCS_PATH, f),
                time: fs.stat(path.join(DOCS_PATH, f)).then(stats => stats.mtime.getTime())
            }));

        const filesWithTime = await Promise.all(
            snapshotFiles.map(async f => ({
                name: f.name,
                path: f.path,
                time: await f.time
            }))
        );

        // Ordenar por fecha (más recientes primero)
        filesWithTime.sort((a, b) => b.time - a.time);

        // Eliminar archivos antiguos si hay más de 50
        if (filesWithTime.length > 50) {
            const toDelete = filesWithTime.slice(50);
            for (const file of toDelete) {
                await fs.unlink(file.path);
                console.log(`✓ Snapshot antiguo eliminado: ${file.name}`);
            }
        }
    } catch (error) {
        console.error('Error limpiando snapshots antiguos:', error);
    }
}

// Guardar log de actividad
async function saveActivityLog(type, data) {
    try {
        const logPath = path.join(DOCS_PATH, 'activity.log');
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] [${type}] ${JSON.stringify(data)}\n`;

        await fs.appendFile(logPath, logEntry, 'utf-8');
    } catch (error) {
        console.error('Error guardando log de actividad:', error);
    }
}

// ===== ENDPOINTS DE API =====

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'online',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        docsPath: DOCS_PATH,
        nextBackup: Math.ceil((BACKUP_INTERVAL - (Date.now() % BACKUP_INTERVAL)) / 1000) + 's'
    });
});

// Registrar sesión de usuario
app.post('/api/session/start', async (req, res) => {
    try {
        const session = {
            id: req.body.sessionId || Date.now().toString(),
            startTime: new Date().toISOString(),
            userAgent: req.headers['user-agent'],
            ip: req.ip,
            ...req.body
        };

        documentationState.sessions.push(session);
        await saveActivityLog('SESSION_START', session);

        res.json({ success: true, sessionId: session.id });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Registrar llamada a API
app.post('/api/log/api-call', async (req, res) => {
    try {
        const apiCall = {
            timestamp: new Date().toISOString(),
            ...req.body
        };

        documentationState.apiCalls.push(apiCall);
        await saveActivityLog('API_CALL', apiCall);

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Registrar error
app.post('/api/log/error', async (req, res) => {
    try {
        const errorLog = {
            timestamp: new Date().toISOString(),
            ...req.body
        };

        documentationState.errors.push(errorLog);
        await saveActivityLog('ERROR', errorLog);

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Registrar evento de analytics
app.post('/api/log/analytics', async (req, res) => {
    try {
        const analyticsEvent = {
            timestamp: new Date().toISOString(),
            ...req.body
        };

        documentationState.analytics.push(analyticsEvent);
        await saveActivityLog('ANALYTICS', analyticsEvent);

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Registrar interacción de usuario
app.post('/api/log/interaction', async (req, res) => {
    try {
        const interaction = {
            timestamp: new Date().toISOString(),
            ...req.body
        };

        documentationState.userInteractions.push(interaction);
        await saveActivityLog('INTERACTION', interaction);

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Forzar backup manual
app.post('/api/backup/now', async (req, res) => {
    try {
        const result = await saveDocumentationSnapshot();
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Obtener estadísticas
app.get('/api/stats', (req, res) => {
    res.json({
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        stats: {
            sessions: documentationState.sessions.length,
            apiCalls: documentationState.apiCalls.length,
            errors: documentationState.errors.length,
            analytics: documentationState.analytics.length,
            interactions: documentationState.userInteractions.length
        },
        memoryUsage: process.memoryUsage(),
        docsPath: DOCS_PATH
    });
});

// Obtener últimos eventos
app.get('/api/recent/:type?', (req, res) => {
    const { type } = req.params;
    const limit = parseInt(req.query.limit) || 50;

    let data;
    switch (type) {
        case 'sessions':
            data = documentationState.sessions.slice(-limit);
            break;
        case 'api-calls':
            data = documentationState.apiCalls.slice(-limit);
            break;
        case 'errors':
            data = documentationState.errors.slice(-limit);
            break;
        case 'analytics':
            data = documentationState.analytics.slice(-limit);
            break;
        case 'interactions':
            data = documentationState.userInteractions.slice(-limit);
            break;
        default:
            data = {
                sessions: documentationState.sessions.slice(-10),
                apiCalls: documentationState.apiCalls.slice(-10),
                errors: documentationState.errors.slice(-10),
                analytics: documentationState.analytics.slice(-10),
                interactions: documentationState.userInteractions.slice(-10)
            };
    }

    res.json(data);
});

// Inicialización
async function initialize() {
    await ensureDocsDirectory();

    // Configurar backup automático cada 10 minutos
    setInterval(async () => {
        console.log('⏰ Ejecutando backup automático...');
        await saveDocumentationSnapshot();
    }, BACKUP_INTERVAL);

    // Guardar snapshot inicial
    await saveDocumentationSnapshot();
    console.log('✓ Snapshot inicial guardado');

    // Iniciar servidor
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`
╔════════════════════════════════════════════════════════════════╗
║  🔷 Auto-Documentation Service                                 ║
║  📁 Ruta de Documentación: ${DOCS_PATH.padEnd(29)} ║
║  🌐 Puerto: ${PORT.toString().padEnd(46)} ║
║  ⏰ Intervalo de Backup: 10 minutos                            ║
║  ✓ Servicio iniciado correctamente                            ║
╚════════════════════════════════════════════════════════════════╝
        `);
    });
}

// Manejo de señales para guardar antes de cerrar
process.on('SIGINT', async () => {
    console.log('\n⚠️  Señal de cierre recibida, guardando último snapshot...');
    await saveDocumentationSnapshot();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n⚠️  Señal de terminación recibida, guardando último snapshot...');
    await saveDocumentationSnapshot();
    process.exit(0);
});

// Iniciar
initialize().catch(error => {
    console.error('Error fatal durante la inicialización:', error);
    process.exit(1);
});
