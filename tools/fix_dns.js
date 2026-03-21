/**
 * Fix DNS for laboratorio.delbienestar.com.mx
 * 
 * This script uses wrangler's internal auth to call the Cloudflare API
 * to list and delete conflicting A records, allowing the tunnel CNAME to work.
 * 
 * Run with: npx wrangler --experimental-json-config exec tools/fix_dns.js
 * Or extract the token manually.
 */
const { execSync } = require('child_process');
const https = require('https');

function apiCall(method, path, body, token) {
    return new Promise((resolve, reject) => {
        const opts = {
            hostname: 'api.cloudflare.com',
            path: `/client/v4${path}`,
            method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const req = https.request(opts, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve({ raw: data, statusCode: res.statusCode });
                }
            });
        });
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function main() {
    const token = process.env.CLOUDFLARE_API_TOKEN || process.argv[2];

    if (!token) {
        console.log('❌ No API token provided.');
        console.log('');
        console.log('To fix this, you need to:');
        console.log('1. Go to https://dash.cloudflare.com/profile/api-tokens');
        console.log('2. Create an API Token with "Edit Zone DNS" permission for delbienestar.com.mx');
        console.log('3. Run: node tools/fix_dns.js YOUR_TOKEN_HERE');
        console.log('');
        console.log('Or set CLOUDFLARE_API_TOKEN environment variable');
        return;
    }

    console.log('🔍 Step 1: Finding zone ID for delbienestar.com.mx...');
    const zones = await apiCall('GET', '/zones?name=delbienestar.com.mx', null, token);

    if (!zones.success || !zones.result?.length) {
        console.log('❌ Zone not found:', JSON.stringify(zones.errors || zones));
        return;
    }

    const zoneId = zones.result[0].id;
    console.log('✅ Zone ID:', zoneId);

    console.log('🔍 Step 2: Listing DNS records for laboratorio.delbienestar.com.mx...');
    const records = await apiCall('GET', `/zones/${zoneId}/dns_records?name=laboratorio.delbienestar.com.mx`, null, token);

    if (!records.success) {
        console.log('❌ Failed to list records:', JSON.stringify(records.errors));
        return;
    }

    console.log(`Found ${records.result.length} DNS records:`);
    for (const r of records.result) {
        console.log(`  ${r.type} ${r.name} -> ${r.content} (ID: ${r.id}, proxied: ${r.proxied})`);
    }

    // Delete A records that conflict with the tunnel CNAME
    const aRecords = records.result.filter(r => r.type === 'A' || r.type === 'AAAA');
    const cnameRecords = records.result.filter(r => r.type === 'CNAME');

    if (aRecords.length === 0) {
        console.log('✅ No A/AAAA records to delete');
    } else {
        console.log(`\n🗑️  Step 3: Deleting ${aRecords.length} conflicting A/AAAA records...`);
        for (const r of aRecords) {
            console.log(`  Deleting ${r.type} ${r.content}...`);
            const del = await apiCall('DELETE', `/zones/${zoneId}/dns_records/${r.id}`, null, token);
            console.log(`  Result: ${del.success ? '✅ Deleted' : '❌ Failed: ' + JSON.stringify(del.errors)}`);
        }
    }

    // Check if CNAME for tunnel exists
    const tunnelCname = cnameRecords.find(r => r.content.includes('cfargotunnel.com'));
    if (tunnelCname) {
        console.log(`\n✅ Tunnel CNAME already exists: ${tunnelCname.content}`);
    } else {
        console.log('\n🔧 Step 4: Creating tunnel CNAME...');
        const create = await apiCall('POST', `/zones/${zoneId}/dns_records`, {
            type: 'CNAME',
            name: 'laboratorio',
            content: '53912039-bc34-48fc-9e3a-005f33e8ed51.cfargotunnel.com',
            proxied: true,
            ttl: 1,
        }, token);
        console.log(`  Result: ${create.success ? '✅ Created' : '❌ Failed: ' + JSON.stringify(create.errors)}`);
    }

    console.log('\n🔍 Step 5: Verifying final DNS state...');
    const finalRecords = await apiCall('GET', `/zones/${zoneId}/dns_records?name=laboratorio.delbienestar.com.mx`, null, token);
    if (finalRecords.success) {
        console.log('Final DNS records:');
        for (const r of finalRecords.result) {
            console.log(`  ${r.type} ${r.name} -> ${r.content} (proxied: ${r.proxied})`);
        }
    }

    // Also purge cache while we're at it
    console.log('\n🧹 Step 6: Purging Cloudflare cache...');
    const purge = await apiCall('POST', `/zones/${zoneId}/purge_cache`, { purge_everything: true }, token);
    console.log(`  Cache purge: ${purge.success ? '✅ Success' : '❌ Failed: ' + JSON.stringify(purge.errors)}`);

    console.log('\n✅ Done! The site should start working within 1-2 minutes.');
}

main().catch(console.error);
