const fs = require('fs');
const path = require('path');
const glob = require('glob');

const API_KEY = 'AIzaSyAuvCfkcaZzhlNq73BuM4Dnl5Tw6VSxYeE';
const MODEL = 'gemini-2.5-flash';

// Configuración de Límites (Nivel Gratuito de Google API = 15 RPM)
const CONCURRENCY = 1;
const DELAY_MS = 15000;

// Directorio Raíz de Herramientas
const TOOLS_DIR = path.join(__dirname, 'src', 'app', 'herramientas');

async function callGeminiForSEO(fileName, fileContent) {
    const prompt = `Eres un Médico Especialista y Experto en SEO Técnico de "Laboratorio del Bienestar".
Tu misión es mejorar radicalmente la página de una de nuestras calculadoras clínicas interactivas desarrollada en React (Next.js).

PROBLEMA ACTUAL: La calculadora tiene la información científica "oculta" en un acordeón que se despliega con un botón. Esto es pésimo para el SEO.
OBJETIVO:
1. Analiza el código fuente que te enviaré.
2. Identifica el propósito médico de esa calculadora.
3. Redacta un artículo clínico exhaustivo (500 a 800 palabras) sobre esa herramienta.
   - Debe incluir: Fisiopatología exacta, interpretación clínica de resultados altos/bajos, banderas rojas (Red Flags) y estudios de laboratorio recomendados.
4. MUY IMPORTANTE: Retorna ÚNICAMENTE código JSX/Tailwind válido. No retornes explicaciones, ni Markdown de bloques de código (sin \`\`\`), solo el código crudo.

INSTRUCCIONES DE DISEÑO (JSX/Tailwind):
El diseño debe ser espectacular, usando fondos gradientes ligeros, iconos (usa emojis nativos si no tienes acceso a Lucide), y una tipografía impecable (prose prose-lg text-gray-700). Usa contenedores como:
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía Médica y Científica Exhaustiva</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       ... Tu contenido médico SEO aquí (Párrafos, h3, listas) ...
   </div>
</section>

CÓDIGO FUENTE ACTUAL DE LA CALCULADORA (${fileName}):
${fileContent.substring(0, 3000)} // Enviamos solo las primeras lineas para ahorrar tokens si es muy larga.
`;

    const bodyObj = {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
            temperature: 0.2, // Ligera creatividad clínica pero manteniendo precisión
        }
    };

    const postData = JSON.stringify(bodyObj);
    const https = require('https');

    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: 'generativelanguage.googleapis.com',
            port: 443,
            path: '/v1beta/models/' + MODEL + ':generateContent?key=' + API_KEY,
            method: 'POST',
            timeout: 60000,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error("Gemini HTTP " + res.statusCode + ": " + data));
                }
                try {
                    const parsed = JSON.parse(data);
                    if (!parsed.candidates || parsed.candidates.length === 0) return reject(new Error("No candidates"));
                    let text = parsed.candidates[0].content.parts[0].text;
                    text = text.replace(/^```jsx?\\n?/m, '').replace(/^```\\n?/m, '').replace(/```$/m, '').trim();
                    resolve(text);
                } catch (e) {
                    reject(new Error("JSON Parse error: " + e.message));
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.on('timeout', () => { req.destroy(); reject(new Error("Timeout Gemini 60s")); });
        req.write(postData);
        req.end();
    });
}

async function processFile(fileInfo) {
    const fileBase = path.basename(path.dirname(fileInfo));
    console.log("\n🛠️  Injectando SEO Médico en ->", fileBase);

    let content = fs.readFileSync(fileInfo, 'utf8');

    // Lógica para detectar el acordeón genérico de información en el archivo
    const startTag = "{/* Scientific Info Collapsible */}";
    const endTag = "{/* Ad Banner bottom */}";

    const startIndex = content.indexOf(startTag);
    const endIndex = content.indexOf(endTag);

    if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
        console.log("✅ No se detectó acordeón o ya fue optimizado en", fileBase);
        return;
    }

    const originalBlock = content.substring(startIndex, endIndex);

    console.log("⚠️  Acordeón SEO-Oculto detectado en", fileBase, "Solicitando inyección a Gemini 2.5 Flash...");
    try {
        const newSEOBlock = await callGeminiForSEO(path.basename(fileInfo), content);

        // Reemplazar el viejo acordeón por la respuesta limpia de Tailwind de Gemini
        const newContent = content.substring(0, startIndex) +
            "{/* SEO Content GPT Injected */}\n" + newSEOBlock + "\n\n                " +
            content.substring(endIndex);

        fs.writeFileSync(fileInfo, newContent);
        console.log("💾 Archivo actualizado y guardado:", fileBase);
    } catch (e) {
        console.log("❌ Error en Gemini (" + fileBase + "):", e.message);
    }
}

async function main() {
    console.log("\n🚀 INICIANDO AUDITORÍA Y MEJORA SEO MASIVA NUBE: 75 Calculadoras");

    // Encontrar TODOS los archivos page.tsx dentro de la carpeta herramientas
    const files = glob.sync('*/page.tsx', { cwd: TOOLS_DIR, absolute: true });
    console.log("📂 Encontradas", files.length, "calculadoras para procesar.");

    // Loop respetando límite de velocidad de Google API Free (15 RPM -> 1 cada 4 seg)
    for (const f of files) {
        await processFile(f);
        // Espera 5 segundos entre peticiones para no saturar la cuota gratuita (15 RPM)
        console.log("⏳ Esperando 5 segundos para cuota...");
        await new Promise(r => setTimeout(r, 5000));
    }
}

main().catch(console.error);
