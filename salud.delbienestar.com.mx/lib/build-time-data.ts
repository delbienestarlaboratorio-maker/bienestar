/**
 * Build-time-only JSON loader.
 * Uses eval('require') to hide the dependency from the bundler (Turbopack/esbuild).
 * This ensures large JSON files are read at build time for SSG/Static pages
 * but are NOT included in the Cloudflare worker bundle.
 * 
 * IMPORTANT: Only use this in pages that are static (○) or SSG (●).
 * Dynamic (ƒ) pages cannot use this because the files won't exist on the worker.
 */

function safeRequire(mod: string) {
    try {
        return eval('require')(mod);
    } catch {
        return null;
    }
}

export function loadJsonData<T = any>(fileName: string): T {
    const fs = safeRequire('fs');
    const path = safeRequire('path');

    if (!fs || !path) {
        console.warn(`[buildTimeData] fs/path not available, returning empty array for ${fileName}`);
        return [] as unknown as T;
    }

    const filePath = path.join(process.cwd(), 'data', fileName);
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
    } catch (e) {
        console.error(`[buildTimeData] Error loading ${fileName}:`, e);
    }

    return [] as unknown as T;
}
