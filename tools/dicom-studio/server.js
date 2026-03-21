/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  TILDE DICOM STUDIO — Servidor Web Local                    ║
 * ║  Laboratorio del Bienestar © 2026                           ║
 * ║                                                              ║
 * ║  API REST que conecta el frontend web con el motor Python    ║
 * ║  de conversión DICOM (dicom_engine.py).                      ║
 * ║                                                              ║
 * ║  Puerto: 30210 (no chocar con bienestar=30200)               ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const crypto = require('crypto');

const PORT = 30210;
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const OUTPUT_DIR = path.join(__dirname, 'outputs');
const PUBLIC_DIR = path.join(__dirname, 'public');

// Ollama configuration — try local first (has vision model), GPU server as fallback
const OLLAMA_URLS = [
    'http://localhost:11434',       // Local — has llama3.2-vision
    'http://192.168.20.70:11434',  // GPU server (RTX 3060) — text-only models
];
const VISION_MODEL = 'llama3.2-vision:latest';
let activeOllamaUrl = null;

// Ensure directories exist
[UPLOAD_DIR, OUTPUT_DIR, PUBLIC_DIR].forEach(d => fs.mkdirSync(d, { recursive: true }));

// ─────────────────────────────────────────────────────────────
// MIME types
// ─────────────────────────────────────────────────────────────
const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.webp': 'image/webp',
};

// ─────────────────────────────────────────────────────────────
// Multipart parser (minimal, for file uploads)
// ─────────────────────────────────────────────────────────────
function parseMultipart(buffer, boundary) {
    const files = [];
    const separator = Buffer.from('--' + boundary);
    let pos = 0;

    while (true) {
        const start = buffer.indexOf(separator, pos);
        if (start === -1) break;

        const nextStart = buffer.indexOf(separator, start + separator.length);
        if (nextStart === -1) break;

        const part = buffer.slice(start + separator.length, nextStart);
        const headerEnd = part.indexOf('\r\n\r\n');
        if (headerEnd === -1) { pos = nextStart; continue; }

        const headerStr = part.slice(0, headerEnd).toString('utf-8');
        const body = part.slice(headerEnd + 4);
        // Trim trailing \r\n
        const trimmedBody = body.slice(0, body.length - 2);

        const nameMatch = headerStr.match(/name="([^"]+)"/);
        const filenameMatch = headerStr.match(/filename="([^"]+)"/);
        const webkitPathMatch = headerStr.match(/name="webkitRelativePath"\r\n\r\n(.+)/);

        if (filenameMatch && nameMatch) {
            files.push({
                fieldName: nameMatch[1],
                filename: filenameMatch[1],
                data: trimmedBody,
            });
        }

        pos = nextStart;
    }

    return files;
}

// ─────────────────────────────────────────────────────────────
// Request body reader
// ─────────────────────────────────────────────────────────────
function readBody(req) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        req.on('data', c => chunks.push(c));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
    });
}

// ─────────────────────────────────────────────────────────────
// JSON response helper
// ─────────────────────────────────────────────────────────────
function jsonResponse(res, status, data) {
    const body = JSON.stringify(data);
    res.writeHead(status, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Content-Length': Buffer.byteLength(body),
    });
    res.end(body);
}

// ─────────────────────────────────────────────────────────────
// CORS headers
// ─────────────────────────────────────────────────────────────
function setCORS(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// ─────────────────────────────────────────────────────────────
// SECURITY: Upload validation constants
// ─────────────────────────────────────────────────────────────
const MAX_UPLOAD_SIZE = 200 * 1024 * 1024; // 200 MB max per request
const MAX_FILE_SIZE = 150 * 1024 * 1024;   // 150 MB max per file
const BLOCKED_EXTENSIONS = new Set([
    '.exe', '.bat', '.cmd', '.com', '.msi', '.scr', '.pif',
    '.vbs', '.vbe', '.js', '.jse', '.wsf', '.wsh', '.ps1',
    '.php', '.py', '.rb', '.sh', '.bash', '.cgi', '.pl',
    '.dll', '.sys', '.drv', '.inf', '.reg',
]);
const QUARANTINE_DIR = path.join(__dirname, 'quarantine');
fs.mkdirSync(QUARANTINE_DIR, { recursive: true });

// Rate limiter: max 10 uploads per minute per IP
const uploadRateMap = new Map();
function checkRateLimit(ip) {
    const now = Date.now();
    const windowMs = 60_000;
    const maxRequests = 10;
    if (!uploadRateMap.has(ip)) uploadRateMap.set(ip, []);
    const timestamps = uploadRateMap.get(ip).filter(t => now - t < windowMs);
    timestamps.push(now);
    uploadRateMap.set(ip, timestamps);
    return timestamps.length <= maxRequests;
}

// Validate DICOM magic number: bytes 128-131 must be "DICM"
function isDICOM(buffer) {
    if (buffer.length < 132) return false;
    return buffer.toString('ascii', 128, 132) === 'DICM';
}

// Scan file with Windows Defender (async, non-blocking)
function scanWithDefender(filePath) {
    return new Promise((resolve) => {
        const mpCmd = '"C:\\Program Files\\Windows Defender\\MpCmdRun.exe"';
        const child = spawn('cmd', ['/c', `${mpCmd} -Scan -ScanType 3 -File "${filePath}" -DisableRemediation`], {
            timeout: 30000,
            windowsHide: true,
        });
        let output = '';
        child.stdout.on('data', d => output += d.toString());
        child.stderr.on('data', d => output += d.toString());
        child.on('close', (code) => {
            // Exit code 0 = clean, 2 = threat found
            resolve({ clean: code === 0, exitCode: code, output: output.substring(0, 500) });
        });
        child.on('error', () => resolve({ clean: true, exitCode: -1, output: 'Defender not available' }));
    });
}

// ─────────────────────────────────────────────────────────────
// Route: POST /api/upload — receive DICOM files (SECURED)
// ─────────────────────────────────────────────────────────────
async function handleUpload(req, res) {
    // ── Rate limit ──
    const clientIp = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (!checkRateLimit(clientIp)) {
        console.log(`🚫 Rate limit exceeded for ${clientIp}`);
        return jsonResponse(res, 429, { error: 'Demasiadas solicitudes. Intenta en un minuto.' });
    }

    // ── Content-Length check (early rejection before reading body) ──
    const contentLength = parseInt(req.headers['content-length'] || '0', 10);
    if (contentLength > MAX_UPLOAD_SIZE) {
        console.log(`🚫 Upload rejected: ${(contentLength / 1024 / 1024).toFixed(1)}MB exceeds limit`);
        return jsonResponse(res, 413, { error: `Archivo demasiado grande. Máximo ${MAX_UPLOAD_SIZE / 1024 / 1024}MB.` });
    }

    const contentType = req.headers['content-type'] || '';
    const boundaryMatch = contentType.match(/boundary=(.+)/);

    if (!boundaryMatch) {
        return jsonResponse(res, 400, { error: 'No boundary in Content-Type' });
    }

    const body = await readBody(req);

    // ── Double-check actual body size ──
    if (body.length > MAX_UPLOAD_SIZE) {
        return jsonResponse(res, 413, { error: 'Payload excede el límite permitido.' });
    }

    const files = parseMultipart(body, boundaryMatch[1]);

    if (files.length === 0) {
        return jsonResponse(res, 400, { error: 'No files received' });
    }

    // Create a session directory
    const sessionId = crypto.randomBytes(8).toString('hex');
    const sessionDir = path.join(UPLOAD_DIR, sessionId);
    fs.mkdirSync(sessionDir, { recursive: true });

    const savedFiles = [];
    const rejectedFiles = [];

    for (const file of files) {
        const ext = path.extname(file.filename).toLowerCase();

        // ── Block dangerous extensions ──
        if (BLOCKED_EXTENSIONS.has(ext)) {
            rejectedFiles.push({ name: file.filename, reason: `Extensión bloqueada: ${ext}` });
            console.log(`🚫 Blocked dangerous file: ${file.filename} (${ext})`);
            continue;
        }

        // ── File size check ──
        if (file.data.length > MAX_FILE_SIZE) {
            rejectedFiles.push({ name: file.filename, reason: `Excede ${MAX_FILE_SIZE / 1024 / 1024}MB` });
            continue;
        }

        // ── DICOM magic number validation ──
        if (!isDICOM(file.data)) {
            // Allow common image formats for testing, but warn
            const allowedNonDicom = new Set(['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.tif']);
            if (!allowedNonDicom.has(ext)) {
                rejectedFiles.push({ name: file.filename, reason: 'No es un archivo DICOM válido (falta cabecera DICM)' });
                console.log(`🚫 Invalid DICOM rejected: ${file.filename}`);
                continue;
            }
        }

        // ── Save with UUID filename (prevent path traversal) ──
        const safeId = crypto.randomBytes(6).toString('hex');
        const safeName = `${safeId}${ext || '.dcm'}`;
        const filePath = path.join(sessionDir, safeName);
        fs.writeFileSync(filePath, file.data);

        // ── Windows Defender scan (async) ──
        const scanResult = await scanWithDefender(filePath);
        if (!scanResult.clean) {
            // Move to quarantine instead of deleting
            console.log(`🦠 VIRUS DETECTED in ${file.filename}! Moving to quarantine.`);
            const quarantinePath = path.join(QUARANTINE_DIR, `${Date.now()}_${safeName}`);
            try { fs.renameSync(filePath, quarantinePath); } catch { fs.unlinkSync(filePath); }
            rejectedFiles.push({ name: file.filename, reason: '🦠 Amenaza detectada por antivirus' });
            continue;
        }

        savedFiles.push({
            name: safeName,
            originalName: file.filename.replace(/[^a-zA-Z0-9._-]/g, '_'),
            size: file.data.length,
            path: filePath,
            dicom: isDICOM(file.data),
            scanned: true,
        });
    }

    // If no files passed validation, cleanup
    if (savedFiles.length === 0 && rejectedFiles.length > 0) {
        try { fs.rmdirSync(sessionDir); } catch { /* non-empty */ }
        return jsonResponse(res, 400, {
            error: 'Ningún archivo pasó la validación de seguridad.',
            rejected: rejectedFiles,
        });
    }

    console.log(`📂 Session ${sessionId}: ✅ ${savedFiles.length} accepted, 🚫 ${rejectedFiles.length} rejected (IP: ${clientIp})`);

    return jsonResponse(res, 200, {
        sessionId,
        filesReceived: savedFiles.length,
        files: savedFiles.map(f => ({ name: f.originalName, size: f.size, dicom: f.dicom, scanned: f.scanned })),
        rejected: rejectedFiles.length > 0 ? rejectedFiles : undefined,
    });
}

// ─────────────────────────────────────────────────────────────
// Route: POST /api/convert — run dicom_engine.py
// ─────────────────────────────────────────────────────────────
async function handleConvert(req, res) {
    const body = await readBody(req);
    let params;
    try {
        params = JSON.parse(body.toString());
    } catch {
        return jsonResponse(res, 400, { error: 'Invalid JSON' });
    }

    const { sessionId, preset = 'auto', clahe = true, unsharp = false } = params;
    if (!sessionId) {
        return jsonResponse(res, 400, { error: 'Missing sessionId' });
    }

    const sessionDir = path.join(UPLOAD_DIR, sessionId);
    if (!fs.existsSync(sessionDir)) {
        return jsonResponse(res, 404, { error: 'Session not found' });
    }

    const outputDir = path.join(OUTPUT_DIR, sessionId);
    fs.mkdirSync(outputDir, { recursive: true });

    // Build dicom_engine.py command
    const enginePath = path.join(__dirname, 'dicom_engine.py');
    const args = [
        enginePath,
        sessionDir,
        '--output', outputDir,
        '--preset', preset,
    ];
    if (!clahe) args.push('--no-clahe');
    if (unsharp) args.push('--unsharp');

    console.log(`🔄 Converting session ${sessionId}...`);

    try {
        const result = execSync(`python ${args.map(a => `"${a}"`).join(' ')}`, {
            timeout: 120000, // 2 min max
            encoding: 'utf-8',
            cwd: __dirname,
            env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
        });
        console.log(result);

        // Read the summary JSON
        const summaryPath = path.join(outputDir, '_RESUMEN.json');
        let summary = {};
        if (fs.existsSync(summaryPath)) {
            summary = JSON.parse(fs.readFileSync(summaryPath, 'utf-8'));
        }

        // List output files
        const outputFiles = fs.readdirSync(outputDir)
            .filter(f => f.endsWith('.jpg') || f.endsWith('.png'))
            .map(f => ({
                name: f,
                url: `/outputs/${sessionId}/${f}`,
                size: fs.statSync(path.join(outputDir, f)).size,
            }));

        // List metadata files
        const metaFiles = fs.readdirSync(outputDir)
            .filter(f => f.endsWith('.json') && f !== '_RESUMEN.json')
            .map(f => {
                const meta = JSON.parse(fs.readFileSync(path.join(outputDir, f), 'utf-8'));
                return { name: f, url: `/outputs/${sessionId}/${f}`, metadata: meta };
            });

        return jsonResponse(res, 200, {
            sessionId,
            success: true,
            summary,
            images: outputFiles,
            metadata: metaFiles,
            log: result.substring(0, 2000),
        });
    } catch (err) {
        console.error('Conversion error:', err.message);
        return jsonResponse(res, 500, {
            error: 'Conversion failed',
            details: err.stderr || err.message,
        });
    }
}

// ─────────────────────────────────────────────────────────────
// Route: POST /api/convert-folder — convert from local path
// ─────────────────────────────────────────────────────────────
async function handleConvertFolder(req, res) {
    const body = await readBody(req);
    let params;
    try {
        params = JSON.parse(body.toString());
    } catch {
        return jsonResponse(res, 400, { error: 'Invalid JSON' });
    }

    const { folderPath, preset = 'auto', clahe = true, unsharp = false } = params;
    if (!folderPath) {
        return jsonResponse(res, 400, { error: 'Missing folderPath' });
    }

    if (!fs.existsSync(folderPath)) {
        return jsonResponse(res, 404, { error: 'Folder not found: ' + folderPath });
    }

    const sessionId = crypto.randomBytes(8).toString('hex');
    const outputDir = path.join(OUTPUT_DIR, sessionId);
    fs.mkdirSync(outputDir, { recursive: true });

    const enginePath = path.join(__dirname, 'dicom_engine.py');
    const args = [
        enginePath,
        folderPath,
        '--output', outputDir,
        '--preset', preset,
    ];
    if (!clahe) args.push('--no-clahe');
    if (unsharp) args.push('--unsharp');

    console.log(`🔄 Converting folder: ${folderPath}...`);

    try {
        const result = execSync(`python ${args.map(a => `"${a}"`).join(' ')}`, {
            timeout: 120000,
            encoding: 'utf-8',
            cwd: __dirname,
            env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
        });
        console.log(result);

        const summaryPath = path.join(outputDir, '_RESUMEN.json');
        let summary = {};
        if (fs.existsSync(summaryPath)) {
            summary = JSON.parse(fs.readFileSync(summaryPath, 'utf-8'));
        }

        const outputFiles = fs.readdirSync(outputDir)
            .filter(f => f.endsWith('.jpg') || f.endsWith('.png'))
            .map(f => ({
                name: f,
                url: `/outputs/${sessionId}/${f}`,
                size: fs.statSync(path.join(outputDir, f)).size,
            }));

        const metaFiles = fs.readdirSync(outputDir)
            .filter(f => f.endsWith('.json') && f !== '_RESUMEN.json')
            .map(f => {
                const meta = JSON.parse(fs.readFileSync(path.join(outputDir, f), 'utf-8'));
                return { name: f, url: `/outputs/${sessionId}/${f}`, metadata: meta };
            });

        return jsonResponse(res, 200, {
            sessionId,
            success: true,
            summary,
            images: outputFiles,
            metadata: metaFiles,
        });
    } catch (err) {
        console.error('Conversion error:', err.message);
        return jsonResponse(res, 500, {
            error: 'Conversion failed',
            details: err.stderr || err.message,
        });
    }
}

// ─────────────────────────────────────────────────────────────
// Ollama: Find available server
// ─────────────────────────────────────────────────────────────
async function findOllamaServer() {
    if (activeOllamaUrl) {
        // Verify it's still alive
        try {
            await httpFetch(activeOllamaUrl + '/api/tags', 'GET', null, 3000);
            return activeOllamaUrl;
        } catch {
            activeOllamaUrl = null;
        }
    }

    for (const url of OLLAMA_URLS) {
        try {
            await httpFetch(url + '/api/tags', 'GET', null, 3000);
            activeOllamaUrl = url;
            console.log(`🧠 Ollama encontrado en: ${url}`);
            return url;
        } catch {
            continue;
        }
    }
    return null;
}

function httpFetch(url, method = 'GET', body = null, timeout = 60000) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port,
            path: urlObj.pathname,
            method,
            timeout,
            headers: {},
        };

        if (body) {
            const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
            options.headers['Content-Type'] = 'application/json';
            options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
        }

        const req = http.request(options, res => {
            const chunks = [];
            res.on('data', c => chunks.push(c));
            res.on('end', () => {
                const raw = Buffer.concat(chunks).toString('utf-8');
                resolve({ status: res.statusCode, body: raw, headers: res.headers });
            });
        });

        req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
        req.on('error', reject);

        if (body) {
            req.write(typeof body === 'string' ? body : JSON.stringify(body));
        }
        req.end();
    });
}

// ─────────────────────────────────────────────────────────────
// Route: GET /api/analyze-status — check Ollama availability
// ─────────────────────────────────────────────────────────────
async function handleAnalyzeStatus(req, res) {
    const ollamaUrl = await findOllamaServer();

    if (!ollamaUrl) {
        return jsonResponse(res, 200, {
            available: false,
            message: 'Ollama no disponible. Verifica que esté corriendo.',
        });
    }

    // Check if vision model is available
    try {
        const resp = await httpFetch(ollamaUrl + '/api/tags', 'GET');
        const data = JSON.parse(resp.body);
        const models = data.models || [];
        const hasVision = models.some(m => m.name.includes('llava') || m.name.includes('vision') || m.name.includes('qwen2.5-vl'));
        const visionModels = models.filter(m => m.name.includes('llava') || m.name.includes('vision') || m.name.includes('qwen2.5-vl'));

        return jsonResponse(res, 200, {
            available: hasVision,
            ollamaUrl,
            model: VISION_MODEL,
            visionModels: visionModels.map(m => m.name),
            allModels: models.map(m => m.name),
            message: hasVision
                ? `IA lista: ${VISION_MODEL} en ${ollamaUrl}`
                : `Ollama disponible pero no tiene modelo de visión. Ejecuta: ollama pull ${VISION_MODEL}`,
        });
    } catch (err) {
        return jsonResponse(res, 200, {
            available: false,
            message: 'Error consultando modelos: ' + err.message,
        });
    }
}

// ─────────────────────────────────────────────────────────────
// Route: POST /api/analyze — AI analysis via Ollama vision
// ─────────────────────────────────────────────────────────────
async function handleAnalyze(req, res) {
    const body = await readBody(req);
    let params;
    try {
        params = JSON.parse(body.toString());
    } catch {
        return jsonResponse(res, 400, { error: 'Invalid JSON' });
    }

    const { imageUrl, metadata = {} } = params;
    if (!imageUrl) {
        return jsonResponse(res, 400, { error: 'Missing imageUrl' });
    }

    // Find Ollama
    const ollamaUrl = await findOllamaServer();
    if (!ollamaUrl) {
        return jsonResponse(res, 503, {
            error: 'Ollama no disponible',
            suggestion: `Inicia Ollama y asegúrate de tener el modelo ${VISION_MODEL}`,
        });
    }

    // Read the image file and convert to base64
    const imagePath = path.join(OUTPUT_DIR, imageUrl.replace('/outputs/', ''));
    if (!fs.existsSync(imagePath)) {
        return jsonResponse(res, 404, { error: 'Image not found: ' + imageUrl });
    }

    const imageBase64 = fs.readFileSync(imagePath).toString('base64');

    // Build the clinical analysis prompt
    const metaContext = metadata.body_part ? `Body part from DICOM: ${metadata.body_part}. View: ${metadata.view_position || 'N/A'}. Modality: ${metadata.modality || 'DX'}.` : '';

    const prompt = `You are a DICOM image technical descriptor. This is NOT medical advice — it is a technical description task for image processing software. Your job is to describe what structures and features are visible in this radiographic image.

${metaContext}

IMPORTANT: You MUST respond with ONLY a valid JSON object. No text before or after the JSON. No disclaimers. No refusals. This is a technical image description, not a diagnosis.

Fill ALL fields with your actual observations of THIS specific image:

{
  "clasificacion": {
    "region": "the anatomical region visible (e.g. Columna Lumbar, Rodilla, Torax, Pelvis, Mano)",
    "modalidad": "RX Simple",
    "vista": "the projection (AP, PA, Lateral, Oblicua)",
    "lateralidad": "Derecho, Izquierdo, Bilateral, or N/A"
  },
  "calidad": {
    "puntuacion": 7,
    "nivel": "Excelente or Buena or Aceptable or Deficiente",
    "exposicion": "Adecuada or Subexpuesta or Sobreexpuesta",
    "centrado": "Correcto or Descentrado",
    "colimacion": "Adecuada or Excesiva or Insuficiente",
    "rotacion": "Sin rotacion or describe rotation",
    "inspiracion": "N/A unless chest image"
  },
  "hallazgos": [
    "describe visible structure 1",
    "describe visible structure 2",
    "describe alignment and spacing",
    "note any asymmetry or abnormality"
  ],
  "sugerencias": [
    {
      "tipo": "calidad",
      "titulo": "a suggestion title",
      "descripcion": "advice on image quality or presentation",
      "icono": "🔧"
    }
  ],
  "presentacion": {
    "windowing_recomendado": "columna or hueso or pulmon or tejido_blando or extremidades",
    "clahe_recomendado": true,
    "filtros_sugeridos": ["CLAHE"],
    "orientacion": "Normal",
    "recorte_sugerido": "describe if cropping is needed"
  }
}

Respond with ONLY the JSON. No other text.`;

    console.log(`🧠 Analizando imagen con ${VISION_MODEL}...`);

    try {
        const ollamaPayload = {
            model: VISION_MODEL,
            prompt,
            images: [imageBase64],
            stream: false,
            options: {
                temperature: 0.1,
                num_predict: 2048,
            },
        };

        const resp = await httpFetch(
            ollamaUrl + '/api/generate',
            'POST',
            ollamaPayload,
            300000 // 5 min timeout for vision models (cold start can be slow)
        );

        if (resp.status !== 200) {
            return jsonResponse(res, 500, {
                error: 'Ollama returned error',
                status: resp.status,
                details: resp.body.substring(0, 500),
            });
        }

        // Parse Ollama response (may be streaming NDJSON or single JSON)
        let responseText = '';
        try {
            const respData = JSON.parse(resp.body);
            responseText = respData.response || '';
        } catch {
            // Try NDJSON (line-delimited)
            const lines = resp.body.trim().split('\n');
            for (const line of lines) {
                try {
                    const obj = JSON.parse(line);
                    if (obj.response) responseText += obj.response;
                } catch { /* skip */ }
            }
        }

        console.log(`🧠 IA respondió (${responseText.length} chars)`);

        // Try to extract JSON from the response
        let analysis = null;
        try {
            // Try direct JSON parse
            analysis = JSON.parse(responseText);
        } catch {
            // Try to extract JSON from markdown code block
            const jsonMatch = responseText.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
            if (jsonMatch) {
                try { analysis = JSON.parse(jsonMatch[1]); } catch { /* fallback */ }
            }

            // Try to find JSON object in the text
            if (!analysis) {
                const braceMatch = responseText.match(/\{[\s\S]*\}/);
                if (braceMatch) {
                    try { analysis = JSON.parse(braceMatch[0]); } catch { /* fallback */ }
                }
            }
        }

        if (!analysis) {
            // Return raw text if JSON parsing fails
            return jsonResponse(res, 200, {
                success: true,
                parsed: false,
                rawResponse: responseText,
                analysis: {
                    clasificacion: {
                        region: metadata.body_part || 'No detectada',
                        modalidad: metadata.modality || 'RX Simple',
                        vista: metadata.view_position || 'N/A',
                        lateralidad: 'N/A',
                    },
                    calidad: { puntuacion: 0, nivel: 'No evaluado', exposicion: 'N/A' },
                    hallazgos: ['Análisis de texto libre (JSON no parseable)'],
                    sugerencias: [{ tipo: 'info', titulo: 'Respuesta de IA', descripcion: responseText.substring(0, 500), icono: '🤖' }],
                    presentacion: {},
                },
            });
        }

        return jsonResponse(res, 200, {
            success: true,
            parsed: true,
            model: VISION_MODEL,
            ollamaUrl,
            analysis,
        });
    } catch (err) {
        console.error('AI analysis error:', err.message);
        return jsonResponse(res, 500, {
            error: 'AI analysis failed',
            details: err.message,
        });
    }
}

// ─────────────────────────────────────────────────────────────
// Route: POST /api/enhance — Generate visual variants
// ─────────────────────────────────────────────────────────────
async function handleEnhance(req, res) {
    const body = await readBody(req);
    let params;
    try {
        params = JSON.parse(body.toString());
    } catch {
        return jsonResponse(res, 400, { error: 'Invalid JSON' });
    }

    const { sessionId, imageUrl, dicomSourceFolder, metadata = {} } = params;

    // We need the original DICOM file to re-process
    // First try to find DICOM source from the session summary
    let dicomPath = null;
    const sourceFile = metadata._source_file || '';

    // Recursive file finder helper
    function findFileRecursive(dir, targetName, maxDepth = 5) {
        if (maxDepth <= 0) return null;
        try {
            const entries = fs.readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                if (entry.isFile() && entry.name === targetName) {
                    return fullPath;
                }
                if (entry.isDirectory()) {
                    const found = findFileRecursive(fullPath, targetName, maxDepth - 1);
                    if (found) return found;
                }
            }
        } catch { /* ignore permission errors */ }
        return null;
    }

    // Try finding the DICOM source from the folder used in conversion  
    if (dicomSourceFolder && sourceFile) {
        // Direct check first
        const candidate = path.join(dicomSourceFolder, sourceFile);
        if (fs.existsSync(candidate)) {
            dicomPath = candidate;
        } else {
            // Recursive search in source folder
            dicomPath = findFileRecursive(dicomSourceFolder, sourceFile);
        }
    }

    // Try getting from the RESUMEN.json
    if (!dicomPath && sessionId) {
        const summaryPath = path.join(OUTPUT_DIR, sessionId, '_RESUMEN.json');
        if (fs.existsSync(summaryPath)) {
            try {
                const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf-8'));
                const inputPath = summary.input_path;
                if (inputPath && sourceFile) {
                    const candidate = path.join(inputPath, sourceFile);
                    if (fs.existsSync(candidate)) {
                        dicomPath = candidate;
                    } else {
                        // Recursive search
                        dicomPath = findFileRecursive(inputPath, sourceFile);
                    }
                }
            } catch { /* ignore */ }
        }
    }

    // Try finding in the uploads directory (remote upload scenario)
    if (!dicomPath && sessionId) {
        const uploadSessionDir = path.join(UPLOAD_DIR, sessionId);
        if (fs.existsSync(uploadSessionDir)) {
            if (sourceFile) {
                const candidate = path.join(uploadSessionDir, sourceFile);
                if (fs.existsSync(candidate)) {
                    dicomPath = candidate;
                } else {
                    dicomPath = findFileRecursive(uploadSessionDir, sourceFile);
                }
            }
            // If still not found, grab the first DICOM-like file in the upload session
            if (!dicomPath) {
                try {
                    const uploadedFiles = fs.readdirSync(uploadSessionDir);
                    const dicomFile = uploadedFiles.find(f => !f.startsWith('.') && !f.endsWith('.json') && !f.endsWith('.txt'));
                    if (dicomFile) {
                        dicomPath = path.join(uploadSessionDir, dicomFile);
                    }
                } catch { /* ignore */ }
            }
        }
    }

    // Also try checking inside the output directory for DICOM source copies
    if (!dicomPath && sessionId) {
        const outputSessionDir = path.join(OUTPUT_DIR, sessionId);
        if (fs.existsSync(outputSessionDir)) {
            if (sourceFile) {
                dicomPath = findFileRecursive(outputSessionDir, sourceFile);
            }
            if (!dicomPath) {
                try {
                    const outFiles = fs.readdirSync(outputSessionDir);
                    const dicomFile = outFiles.find(f => !f.endsWith('.jpg') && !f.endsWith('.png') && !f.endsWith('.json') && !f.endsWith('.txt') && !f.endsWith('.py') && !f.startsWith('_') && !f.startsWith('.'));
                    if (dicomFile) {
                        dicomPath = path.join(outputSessionDir, dicomFile);
                    }
                } catch { /* ignore */ }
            }
        }
    }

    if (!dicomPath) {
        return jsonResponse(res, 404, {
            error: 'No se encontró el archivo DICOM original para re-procesar.',
            hint: 'Asegúrate de que la carpeta DICOM de origen siga accesible.',
            debug: { sessionId, sourceFile, dicomSourceFolder }
        });
    }

    console.log(`🎨 Generando variantes de mejora: ${dicomPath}`);

    // Call Python engine with the enhance-file approach
    const outputDir = path.join(OUTPUT_DIR, sessionId || crypto.randomBytes(8).toString('hex'));
    fs.mkdirSync(outputDir, { recursive: true });

    const enginePath = path.join(__dirname, 'dicom_engine.py');

    // Use a small Python script inline to call generate_enhancement_variants
    const pyScript = `import sys, json, os
sys.path.insert(0, r"${__dirname.replace(/\\/g, '\\\\')}")
from dicom_engine import generate_enhancement_variants
result = generate_enhancement_variants(r"${dicomPath.replace(/\\/g, '\\\\')}", r"${outputDir.replace(/\\/g, '\\\\')}")
if result:
    print("__ENHANCE_JSON_START__")
    print(json.dumps(result["manifest"], ensure_ascii=False))
    print("__ENHANCE_JSON_END__")
    print("ENHANCE_DIR:" + result["enhance_dir"])
else:
    print("ERROR: Could not generate variants")
    sys.exit(1)
`;

    // Write temp script file (python -c can't handle if/else blocks properly on Windows)
    const tmpScript = path.join(outputDir, '_enhance_script.py');
    fs.writeFileSync(tmpScript, pyScript, 'utf-8');

    try {
        const result = execSync(`python "${tmpScript}"`, {
            timeout: 60000,
            encoding: 'utf-8',
            cwd: __dirname,
            env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
        });
        console.log(result);

        // Cleanup temp script
        try { fs.unlinkSync(tmpScript); } catch { }

        // Parse the manifest from output
        const jsonMatch = result.match(/__ENHANCE_JSON_START__([\s\S]*?)__ENHANCE_JSON_END__/);
        const enhanceDirMatch = result.match(/ENHANCE_DIR:(.+)/);

        if (!jsonMatch || !enhanceDirMatch) {
            return jsonResponse(res, 500, { error: 'Enhancement failed - no output', raw: result.substring(0, 500) });
        }

        const manifest = JSON.parse(jsonMatch[1].trim());
        const enhanceDir = enhanceDirMatch[1].trim();

        // Build URLs for the generated variant images 
        const enhanceDirRel = path.relative(OUTPUT_DIR, enhanceDir).replace(/\\/g, '/');
        const variants = manifest.variantes.map(v => ({
            ...v,
            url: `/outputs/${enhanceDirRel}/${v.archivo}`,
        }));

        return jsonResponse(res, 200, {
            success: true,
            manifest: { ...manifest, variantes: variants },
            variants,
            guia_impresion: manifest.guia_impresion || null,
            inteligencia: manifest.inteligencia || null,
            enhanceDir: enhanceDirRel,
        });
    } catch (err) {
        console.error('Enhancement error:', err.message);
        return jsonResponse(res, 500, {
            error: 'Enhancement failed',
            details: (err.stderr || err.message || '').substring(0, 500),
        });
    }
}

// ─────────────────────────────────────────────────────────────
// Static file server
// ─────────────────────────────────────────────────────────────
function serveStatic(req, res, basePath, urlPath) {
    const relPath = req.url.replace(urlPath, '').split('?')[0];
    const filePath = path.join(basePath, decodeURIComponent(relPath));

    // Prevent directory traversal
    if (!filePath.startsWith(basePath)) {
        res.writeHead(403);
        return res.end('Forbidden');
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404);
        return res.end('Not Found');
    }

    const ext = path.extname(filePath);
    const mime = MIME[ext] || 'application/octet-stream';
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': mime,
        'Content-Length': stat.size,
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
    });

    fs.createReadStream(filePath).pipe(res);
}

// ─────────────────────────────────────────────────────────────
// HTTP Server
// ─────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
    setCORS(res);

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    const url = req.url.split('?')[0];

    try {
        // API routes
        if (url === '/api/upload' && req.method === 'POST') {
            return await handleUpload(req, res);
        }
        if (url === '/api/convert' && req.method === 'POST') {
            return await handleConvert(req, res);
        }
        if (url === '/api/convert-folder' && req.method === 'POST') {
            return await handleConvertFolder(req, res);
        }
        if (url === '/api/analyze' && req.method === 'POST') {
            return await handleAnalyze(req, res);
        }
        if (url === '/api/analyze-status' && req.method === 'GET') {
            return await handleAnalyzeStatus(req, res);
        }
        if (url === '/api/enhance' && req.method === 'POST') {
            return await handleEnhance(req, res);
        }

        // Serve output files (converted images + metadata)
        if (url.startsWith('/outputs/')) {
            return serveStatic(req, res, OUTPUT_DIR, '/outputs');
        }

        // Serve frontend
        if (url === '/' || url === '/index.html') {
            const indexPath = path.join(PUBLIC_DIR, 'index.html');
            if (fs.existsSync(indexPath)) {
                const content = fs.readFileSync(indexPath);
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                return res.end(content);
            }
        }

        // Static public files
        if (fs.existsSync(path.join(PUBLIC_DIR, url.slice(1)))) {
            return serveStatic(req, res, PUBLIC_DIR, '/');
        }

        res.writeHead(404);
        res.end('Not Found');
    } catch (err) {
        console.error('Server error:', err);
        res.writeHead(500);
        res.end('Internal Server Error');
    }
});

server.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║              🩻 TILDE DICOM STUDIO v1.0                     ║
║           Servidor Web — Puerto ${PORT}                      ║
╚══════════════════════════════════════════════════════════════╝

  🌐 Abrir en navegador: http://localhost:${PORT}
  📂 Uploads:  ${UPLOAD_DIR}
  📁 Outputs:  ${OUTPUT_DIR}
  `);
});
