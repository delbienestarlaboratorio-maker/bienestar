/**
 * Data loader that works on both local (fs) and Cloudflare Workers (KV)
 * 
 * On local/Node.js: reads from src/data/{type}-fragments/{slug}.json
 * On Cloudflare Workers: reads from KV namespace via getCloudflareContext()
 */

async function tryKV(binding: string, slug: string): Promise<any | null> {
    try {
        // Dynamic import so it doesn't break on local Node.js
        const mod = await import('@opennextjs/cloudflare');
        const getCtx = (mod as any).getCloudflareContext || (mod as any).getRequestContext;
        if (getCtx) {
            const ctx = await getCtx();
            const kv = ctx?.env?.[binding];
            if (kv) {
                return await kv.get(slug, 'json');
            }
        }
    } catch {
        // Not on Cloudflare — expected on local dev
    }
    return null;
}

function tryFS(fragmentsDir: string, slug: string): any | null {
    try {
        const fs = require('fs');
        const path = require('path');
        const candidates = [
            path.join(process.cwd(), 'src', 'data', fragmentsDir, `${slug}.json`),
            path.join(process.cwd(), '..', 'src', 'data', fragmentsDir, `${slug}.json`),
            path.resolve(`D:\\Paginas_web\\pagina\\laboratorio-bienestar\\src\\data\\${fragmentsDir}`, `${slug}.json`),
        ];
        for (const p of candidates) {
            try {
                if (fs.existsSync(p)) {
                    return JSON.parse(fs.readFileSync(p, 'utf8'));
                }
            } catch { /* next */ }
        }
    } catch { /* fs not available (edge runtime) */ }
    return null;
}

export async function loadSymptomData(slug: string): Promise<any | null> {
    // Try Cloudflare KV first, fallback to local fs
    return (await tryKV('SYMPTOMS_KV', slug)) ?? tryFS('symptoms-fragments', slug);
}

export async function loadDiseaseData(slug: string): Promise<any | null> {
    return (await tryKV('DISEASES_KV', slug)) ?? tryFS('diseases-fragments', slug);
}
