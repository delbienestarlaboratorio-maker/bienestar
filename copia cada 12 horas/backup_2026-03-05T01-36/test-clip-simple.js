// Test simple para diagnosticar problema de Clip
const https = require('https');

const testClipAPI = () => {
    const apiKey = '8d12c56e-34db-4496-8cf2-6e54c8381716';
    const apiSecret = 'test_e25092a9-d1df-472b-a6d4-67e6e10615a9';

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

    const options = {
        hostname: 'api-sandbox.clip.mx',
        path: '/checkout',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'Authorization': `Basic ${auth}`,
            'Content-Length': Buffer.byteLength(payload)
        }
    };

    console.log('🧪 Test Clip API\n');
    console.log('📡 Enviando request a:', `https://${options.hostname}${options.path}`);
    console.log('💰 Amount: 1150 MXN\n');

    const req = https.request(options, (res) => {
        console.log(`📊 Status: ${res.statusCode} ${res.statusMessage}`);
        console.log('📋 Headers:');
        console.log(JSON.stringify(res.headers, null, 2));
        console.log('');

        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('📦 Response Body:');
            try {
                const json = JSON.parse(data);
                console.log(JSON.stringify(json, null, 2));

                if (json.payment_link) {
                    console.log('\n✅ ÉXITO! Link de pago generado:');
                    console.log(json.payment_link);
                } else {
                    console.log('\n⚠️  Respuesta sin payment_link');
                }
            } catch (e) {
                console.log(data);
            }
        });
    });

    req.on('error', (error) => {
        console.log('\n❌ ERROR de conexión:');
        console.log('   Type:', error.constructor.name);
        console.log('   Message:', error.message);
        console.log('   Code:', error.code);
        console.log('   Syscall:', error.syscall);
    });

    req.write(payload);
    req.end();
};

testClipAPI();
