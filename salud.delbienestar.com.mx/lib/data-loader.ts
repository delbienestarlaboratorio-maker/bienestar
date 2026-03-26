/**
 * Data loader that works on both local (fs) and Cloudflare Workers (KV)
 * 
 * On local/Node.js: reads from data/{type}-fragments/{slug}.json
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

/**
 * Helper to prevent bundlers from statically analyzing and embedding large directories
 */
function safeRequire(moduleName: string) {
    try {
        // eval('require') hides the dependency from static analysis tools like Turbopack/Esbuild
        return eval('require')(moduleName);
    } catch {
        return null;
    }
}

function tryFS(fragmentsDir: string, slug: string): any | null {
    const fs = safeRequire('fs');
    const path = safeRequire('path');
    if (!fs || !path) return null;

    try {
        const candidates = [
            path.join(process.cwd(), 'data-fragments', fragmentsDir, `${slug}.json`),
            path.join(process.cwd(), '..', 'data-fragments', fragmentsDir, `${slug}.json`),
        ];

        for (const p of candidates) {
            try {
                if (fs.existsSync(p)) {
                    return JSON.parse(fs.readFileSync(p, 'utf8'));
                }
            } catch { /* next */ }
        }
    } catch { /* fs errors */ }
    return null;
}

export async function loadSymptomData(slug: string): Promise<any | null> {
    return (await tryKV('SYMPTOMS_KV', slug)) ?? tryFS('symptoms-fragments', slug);
}

export async function loadDiseaseData(slug: string): Promise<any | null> {
    return (await tryKV('DISEASES_KV', slug)) ?? tryFS('diseases-fragments', slug);
}

export async function loadBiomarkerData(slug: string): Promise<any | null> {
    // Note: No KV yet for biomarkers, but we use the safe FS loader
    return tryFS('biomarkers-fragments', slug);
}
