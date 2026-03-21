/**
 * create-cloudflare-portal.js
 * Crea el proyecto Cloudflare Pages para delbienestar-portal y sube el index.html
 * via API REST directamente, sin depender de wrangler local
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Lee las variables de wrangler.toml o pide que se pongan aquí
// Si no tienes el token disponible acá, buscamos en wrangler.toml
let ACCOUNT_ID = '';
let API_TOKEN = '';

// Intentar leer de wrangler.toml
try {
    const wranglerContent = fs.readFileSync(path.join(__dirname, 'wrangler.toml'), 'utf-8');
    const accountMatch = wranglerContent.match(/account_id\s*=\s*["']?([a-f0-9]+)["']?/);
    if (accountMatch) ACCOUNT_ID = accountMatch[1];
} catch (e) { }

// Si no se encontró en wrangler.toml, buscar en .env
if (!ACCOUNT_ID) {
    try {
        const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf-8');
        const accountMatch = envContent.match(/CLOUDFLARE_ACCOUNT_ID=([^\n]+)/);
        const tokenMatch = envContent.match(/CLOUDFLARE_API_TOKEN=([^\n]+)/);
        if (accountMatch) ACCOUNT_ID = accountMatch[1].trim();
        if (tokenMatch) API_TOKEN = tokenMatch[1].trim();
    } catch (e) { }
}

if (!ACCOUNT_ID || !API_TOKEN) {
    console.log('❌ No se pudieron obtener las credenciales de Cloudflare.');
    console.log('');
    console.log('Por favor ejecuta así:');
    console.log('  $env:CF_ACCOUNT_ID="tu_account_id"');
    console.log('  $env:CF_API_TOKEN="tu_api_token"');
    console.log('  node create-cloudflare-portal.js');
    console.log('');
    console.log('O si tienes wrangler autenticado, ejecuta:');
    console.log('  npx wrangler pages deploy "d:\\Paginas_web\\pagina\\delbienestar-portal" --project-name=delbienestar-portal');
    process.exit(1);
}

// Usar variables de entorno si se pasaron explícitamente
ACCOUNT_ID = process.env.CF_ACCOUNT_ID || ACCOUNT_ID;
API_TOKEN = process.env.CF_API_TOKEN || API_TOKEN;

const PROJECT_NAME = 'delbienestar-portal';
const PORTAL_DIR = path.join(__dirname, '..', 'delbienestar-portal');

function cfRequest(method, endpoint, body) {
    return new Promise((resolve, reject) => {
        const postData = body ? JSON.stringify(body) : null;
        const options = {
            hostname: 'api.cloudflare.com',
            path: `/client/v4/accounts/${ACCOUNT_ID}${endpoint}`,
            method,
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json',
                ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {})
            }
        };

        const req = https.request(options, res => {
            let data = '';
            res.on('data', chunk => { data += chunk; });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.success === false) {
                        reject(new Error(parsed.errors?.[0]?.message || 'API Error'));
                    } else {
                        resolve(parsed.result);
                    }
                } catch (e) {
                    resolve(data);
                }
            });
        });
        req.on('error', reject);
        req.setTimeout(30000, () => { req.destroy(); reject(new Error('Timeout')); });
        if (postData) req.write(postData);
        req.end();
    });
}

async function main() {
    console.log(`📋 Account ID: ${ACCOUNT_ID.substring(0, 8)}...`);
    console.log(`🔑 API Token: ${API_TOKEN.substring(0, 8)}...`);
    console.log('');

    // 1. Crear el proyecto Pages
    console.log('📁 Creando proyecto Cloudflare Pages...');
    try {
        const project = await cfRequest('POST', '/pages/projects', {
            name: PROJECT_NAME,
            production_branch: 'main'
        });
        console.log(`✅ Proyecto creado: ${project.subdomain || project.name}`);
    } catch (e) {
        if (e.message.includes('already exists') || e.message.includes('A project with')) {
            console.log(`ℹ️  El proyecto ya existe, continuando...`);
        } else {
            console.log(`❌ Error creando proyecto: ${e.message}`);
            console.log('');
            console.log('Alternativa: Ve a https://dash.cloudflare.com → Pages → Create project');
            console.log('→ Conecta el repo: delbienestarlaboratorio-maker/delbienestar-portal');
            return;
        }
    }

    // 2. Intentar upload del archivo via wrangler (que ya está instalado)
    console.log('');
    console.log('📤 Subiendo archivos con wrangler...');
    try {
        process.env.CLOUDFLARE_ACCOUNT_ID = ACCOUNT_ID;
        process.env.CLOUDFLARE_API_TOKEN = API_TOKEN;

        execSync(
            `npx wrangler pages deploy "${PORTAL_DIR}" --project-name=${PROJECT_NAME} --branch=main`,
            { stdio: 'inherit', env: { ...process.env } }
        );
        console.log('✅ Deploy exitoso');
    } catch (e) {
        console.log('⚠️  wrangler tuvo un error. El proyecto ya está creado en Cloudflare.');
        console.log('El deploy automático se hará al próximo push a GitHub via GitHub Actions.');
    }

    console.log('');
    console.log('🌐 Acciones pendientes (hazlas en dash.cloudflare.com):');
    console.log(`   1. Pages → ${PROJECT_NAME} → Custom domains → Add: delbienestar.com.mx`);
    console.log('   2. AdSense → Sites → Editar URL → delbienestar.com.mx');
}

main().catch(e => {
    console.error('Error:', e.message);
});
