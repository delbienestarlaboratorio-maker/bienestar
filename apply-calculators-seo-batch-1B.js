const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, 'src', 'app', 'herramientas');
const batch1B = JSON.parse(fs.readFileSync(path.join(__dirname, 'seo-batch2k.json'), 'utf8'));

async function applyBatch() {
    let done = 0;
    for (const item of batch1B) {
        const filePath = path.join(TOOLS_DIR, item.slug, 'page.tsx');
        if (!fs.existsSync(filePath)) {
            console.error('No se encontro el archivo:', filePath);
            continue;
        }

        let content = fs.readFileSync(filePath, 'utf8');

        const startTag = "<AdBanner";
        const startIndex = content.indexOf(startTag);

        if (startIndex !== -1) {
            const wrapStart = content.lastIndexOf("<div", startIndex);
            let targetIndex = startIndex;
            if (wrapStart !== -1 && wrapStart > content.lastIndexOf("</section>", startIndex)) {
                if (startIndex - wrapStart < 150) {
                    targetIndex = wrapStart;
                }
            }

            const newContent = content.substring(0, targetIndex) +
                "{/* SEO Content GPT Injected */}\\n                " + item.content + "\\n\\n                " +
                content.substring(targetIndex);
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log('✅ Aplicado SEO a:', item.slug);
            done++;
        } else {
            console.log('⚠️ Warning: No se encontró el bloque AdBanner en:', item.slug);
        }
    }
    console.log('🎉 Finalizada inyección del batch manual local JSON. Total aplicados: ' + done);
}

applyBatch().catch(console.error);
