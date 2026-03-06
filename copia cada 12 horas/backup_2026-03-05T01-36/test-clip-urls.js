// Test simple con nuevas credenciales directamente
const https = require('https');

const testClipWithNewCredentials = () => {
    const apiKey = '9ccba8b2-1d65-4d93-9220-2f34b76045bd';
    const apiSecret = 'test_a5417bd5-94ab-4cd4-99a1-9c60b548af56';

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    const payload = JSON.stringify({
        amount: 1150,
        currency: 'MXN',
        purchase_description: 'Pedido de prueba - 2 estudios',
        redirection_url: {
            success: 'https://laboratorio.delbienestar.com.mx/checkout/success',
            error: 'https://laboratorio.delbienestar.com.mx/checkout/error'
        },
        metadata: {
            me_reference_id: `TEST-${Date.now()}`,
            customer_info: {
                email: 'test@laboratoriobienestar.com'
            }
        }
    });

    // Probando diferentes URLs
    const urlsToTry = [
        { hostname: 'api.payclip.com', path: '/v2/checkout', name: 'Production v2' },
        { hostname: 'sandbox.payclip.com', path: '/v2/checkout', name: 'Sandbox v2' },
        { hostname: 'api.payclip.com', path: '/checkout', name: 'Production v1' },
        { hostname: 'sandbox.payclip.com', path: '/checkout', name: 'Sandbox v1' },
    ];

    console.log('🧪 Probando diferentes URLs de Clip\n');
    console.log('Credenciales:');
    console.log('  API Key:', apiKey.substring(0, 8) + '...');
    console.log('  Secret:', apiSecret.substring(0, 10) + '...');
    console.log('');

    urlsToTry.forEach((urlConfig, index) => {
        setTimeout(() => {
            console.log(`\n[${index + 1}/${urlsToTry.length}] Probando: ${urlConfig.name}`);
            console.log(`    https://${urlConfig.hostname}${urlConfig.path}`);

            const options = {
                hostname: urlConfig.hostname,
                path: urlConfig.path,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'Authorization': `Basic ${auth}`,
                    'Content-Length': Buffer.byteLength(payload)
                },
                timeout: 5000
            };

            const req = https.request(options, (res) => {
                console.log(`    ✓ Status: ${res.statusCode} ${res.statusMessage}`);

                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => {
                    try {
                        const json = JSON.parse(data);
                        if (json.payment_link) {
                            console.log(`    🎉 ÉXITO! Payment link: ${json.payment_link}`);
                        } else if (res.statusCode >= 400) {
                            console.log(`    ❌ Error: ${JSON.stringify(json)}`);
                        } else {
                            console.log(`    ⚠️  Response:`, json);
                        }
                    } catch (e) {
                        console.log(`    📋 Raw:`, data.substring(0, 200));
                    }
                });
            });

            req.on('error', (error) => {
                console.log(`    ❌ ${error.code || error.message}`);
            });

            req.on('timeout', () => {
                console.log(`    ⏰ Timeout (5s)`);
                req.destroy();
            });

            req.write(payload);
            req.end();

        }, index * 1000);
    });
};

testClipWithNewCredentials();


setTimeout(() => {
    console.log('\n\n═══════════════════════════════════════');
    console.log('Pruebas completadas.');
    console.log('═══════════════════════════════════════\n');
}, 5000);
