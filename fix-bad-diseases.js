const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = 'sk-c2a2f25fc2764f1f9e1cd76f76d84254';
const dir = path.join(__dirname, 'src', 'data', 'diseases-fragments');
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'data', 'diseases.json'), 'utf8'));
const slugMap = {};
manifest.forEach(d => { slugMap[d.slug] = d; });

const BAD = [
    'gases-qu',
    'producto-unico-nacido-en-hospital',
    'envenenamiento-autoinfligido-intencional-por-otros-gases-y-vapores'
];

function gen(slug) {
    const d = slugMap[slug] || { slug, name: slug.replace(/-/g, ' '), code: '' };
    const prompt = `Eres medico clinico mexicano. Genera ficha CIE-10 para: "${d.name}" (codigo: ${d.code || ''}).
Responde SOLO con JSON valido sin markdown:
{"slug":"${slug}","name":"${d.name}","cie10":"${d.code || ''}","category":"categoria medica","shortDescription":"descripcion corta 50 palabras","intro":"introduccion detallada de 200 palabras explicando que es, causas principales y por que importa en Mexico","symptoms":["sintoma 1","sintoma 2","sintoma 3","sintoma 4","sintoma 5"],"causes":["causa 1","causa 2","causa 3","causa 4","causa 5"],"redFlags":["alarma 1","alarma 2","alarma 3"],"tests":["estudio 1","estudio 2","estudio 3","estudio 4","estudio 5"],"prevention":["prevencion 1","prevencion 2","prevencion 3"],"tags":["tag1","tag2"]}`;

    return new Promise((resolve) => {
        const payload = JSON.stringify({
            model: 'deepseek-chat',
            messages: [
                { role: 'system', content: 'Medico mexicano. Solo JSON valido.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.3,
            max_tokens: 2048
        });

        const req = https.request({
            hostname: 'api.deepseek.com',
            path: '/chat/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + API_KEY,
                'Content-Length': Buffer.byteLength(payload)
            },
            timeout: 90000
        }, (res) => {
            const chunks = [];
            res.on('data', c => chunks.push(c));
            res.on('end', () => {
                try {
                    const body = JSON.parse(Buffer.concat(chunks).toString());
                    let content = body.choices?.[0]?.message?.content || '';
                    content = content.replace(/```json\n?/g, '').replace(/```/g, '').trim();
                    let json;
                    try { json = JSON.parse(content); } catch {
                        const m = content.match(/\{[\s\S]*\}/);
                        if (m) json = JSON.parse(m[0]);
                        else throw new Error('No JSON');
                    }
                    fs.writeFileSync(path.join(dir, slug + '.json'), JSON.stringify(json, null, 2), 'utf8');
                    console.log('  OK:', slug);
                } catch (e) {
                    console.log('  ERR:', slug, e.message.substring(0, 60));
                }
                resolve();
            });
        });
        req.on('error', e => { console.log('  NET ERR:', e.message); resolve(); });
        req.on('timeout', () => { req.destroy(); console.log('  TIMEOUT:', slug); resolve(); });
        req.write(payload);
        req.end();
    });
}

(async () => {
    console.log('Fixing 3 bad disease fragments...');
    for (const slug of BAD) {
        const f = path.join(dir, slug + '.json');
        if (fs.existsSync(f)) fs.unlinkSync(f);
        await gen(slug);
        await new Promise(r => setTimeout(r, 800));
    }
    console.log('Done!');
})();
