/**
 * Cloudflare Cache Purge Script
 * Extracts the OAuth token from wrangler's debug output and uses it to purge cache.
 */
const { execSync } = require('child_process');
const https = require('https');

// Step 1: Get the access token from wrangler debug output
function getAccessToken() {
    try {
        // Get the log file path from wrangler's debug output
        const result = execSync('set WRANGLER_LOG=debug && npx wrangler whoami 2>&1', {
            encoding: 'utf8',
            timeout: 20000,
            shell: 'cmd.exe'
        });

        // Look for the log file path
        const logMatch = result.match(/Writing logs to "([^"]+)"/);
        if (logMatch) {
            console.log('Log file:', logMatch[1]);
            const fs = require('fs');
            const logContent = fs.readFileSync(logMatch[1], 'utf8');

            // Find the Authorization header in the log
            const tokenMatch = logContent.match(/Authorization['":\s]+Bearer\s+([a-zA-Z0-9._-]+)/i);
            if (tokenMatch) {
                return tokenMatch[1];
            }

            // Try to find oauth_token or access_token
            const oauthMatch = logContent.match(/(?:oauth_token|access_token|token)['":\s]+([a-zA-Z0-9._-]{20,})/i);
            if (oauthMatch) {
                return oauthMatch[1];
            }

            // Show relevant log lines
            const relevantLines = logContent.split('\n').filter(l =>
                l.includes('token') || l.includes('auth') || l.includes('Authorization') || l.includes('Bearer')
            );
            console.log('Relevant log lines:', relevantLines.slice(0, 5));
        }

        // Also check for token in output
        const outputToken = result.match(/(?:oauth_token|Token|Bearer)[:\s]+([a-zA-Z0-9._-]{20,})/);
        if (outputToken) return outputToken[1];

    } catch (e) {
        console.log('Error getting token:', e.message);
    }
    return null;
}

// Step 2: Purge cache using Cloudflare API
function purgeCache(token, zoneId) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            files: [
                'https://laboratorio.delbienestar.com.mx/_next/static/chunks/19444aecd88b2f8d.css',
                'https://laboratorio.delbienestar.com.mx/_next/static/chunks/69e6fc0910450081.js',
                'https://laboratorio.delbienestar.com.mx/',
            ]
        });

        const req = https.request({
            hostname: 'api.cloudflare.com',
            path: `/client/v4/zones/${zoneId}/purge_cache`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }, (res) => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => {
                console.log('Purge response:', body);
                resolve(JSON.parse(body));
            });
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

// Step 3: Get zone ID
function getZoneId(token) {
    return new Promise((resolve, reject) => {
        https.get({
            hostname: 'api.cloudflare.com',
            path: '/client/v4/zones?name=delbienestar.com.mx',
            headers: { 'Authorization': `Bearer ${token}` }
        }, (res) => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => {
                const data = JSON.parse(body);
                if (data.result && data.result.length > 0) {
                    resolve(data.result[0].id);
                } else {
                    console.log('Zone lookup response:', body);
                    reject(new Error('Zone not found'));
                }
            });
        }).on('error', reject);
    });
}

async function main() {
    console.log('🔍 Extracting Cloudflare API token...');
    const token = getAccessToken();

    if (!token) {
        console.log('❌ Could not extract token from wrangler');
        console.log('Please set CLOUDFLARE_API_TOKEN environment variable');
        return;
    }

    console.log('✅ Token found (length:', token.length, ')');

    console.log('🔍 Looking up zone ID for delbienestar.com.mx...');
    const zoneId = await getZoneId(token);
    console.log('✅ Zone ID:', zoneId);

    console.log('🧹 Purging cache...');
    const result = await purgeCache(token, zoneId);
    console.log('✅ Cache purge complete:', result.success ? 'SUCCESS' : 'FAILED');
}

main().catch(console.error);
