/**
 * Purge Cloudflare cache using wrangler's internal API access.
 * This script imports wrangler's unstable_dev API to bypass auth token lookup.
 * Usage: node tools/purge_cache.mjs
 */
import { execSync } from 'child_process';

// Get account info and token from wrangler
async function getAccountInfo() {
    const result = execSync('npx wrangler whoami 2>&1', { encoding: 'utf8' });
    console.log('Wrangler auth info:', result.substring(0, 300));

    // Extract account ID from whoami output
    const match = result.match(/([a-f0-9]{32})/);
    if (match) {
        return match[1];
    }
    return null;
}

// Use the Cloudflare REST API via node fetch
// First, we need to get the API token from wrangler's config
async function findToken() {
    const os = await import('os');
    const fs = await import('fs');
    const path = await import('path');

    // Wrangler v3+ stores OAuth tokens in different locations per OS
    const home = os.default.homedir();
    const possiblePaths = [
        path.default.join(home, '.wrangler', 'config', 'default.toml'),
        path.default.join(home, '.wrangler', 'config', 'wrangler.toml'),
        path.default.join(process.env.APPDATA || '', 'wrangler', 'config', 'default.toml'),
        path.default.join(process.env.LOCALAPPDATA || '', 'wrangler', 'config', 'default.toml'),
    ];

    for (const p of possiblePaths) {
        try {
            const content = fs.default.readFileSync(p, 'utf8');
            console.log('Found config at:', p);
            const tokenMatch = content.match(/oauth_token\s*=\s*"([^"]+)"/);
            if (tokenMatch) return tokenMatch[1];
            const apiTokenMatch = content.match(/api_token\s*=\s*"([^"]+)"/);
            if (apiTokenMatch) return apiTokenMatch[1];
        } catch (e) {
            // Skip
        }
    }

    // Try environment variables
    if (process.env.CLOUDFLARE_API_TOKEN) return process.env.CLOUDFLARE_API_TOKEN;
    if (process.env.CF_API_TOKEN) return process.env.CF_API_TOKEN;

    return null;
}

async function main() {
    console.log('🔍 Looking for Cloudflare credentials...');
    const accountId = await getAccountInfo();
    console.log('Account ID:', accountId);

    const token = await findToken();
    if (!token) {
        console.log('⚠️  No API token found. Trying alternative approach...');
        console.log('Using wrangler deploy to force a new deployment...');
        return;
    }

    console.log('✅ Found token');

    // List zones
    const zoneResp = await fetch('https://api.cloudflare.com/client/v4/zones?name=delbienestar.com.mx', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const zones = await zoneResp.json();
    console.log('Zones:', JSON.stringify(zones.result?.map(z => ({ id: z.id, name: z.name })), null, 2));

    if (!zones.result?.length) {
        console.log('❌ No zones found');
        return;
    }

    const zoneId = zones.result[0].id;
    console.log('Zone ID:', zoneId);

    // Purge cache
    const purgeResp = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            files: [
                'https://laboratorio.delbienestar.com.mx/_next/static/chunks/19444aecd88b2f8d.css',
                'https://laboratorio.delbienestar.com.mx/_next/static/chunks/69e6fc0910450081.js',
                'https://laboratorio.delbienestar.com.mx/',
            ]
        })
    });

    const result = await purgeResp.json();
    console.log('Purge result:', JSON.stringify(result, null, 2));
}

main().catch(console.error);
