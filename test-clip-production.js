// Test de credenciales de Clip (Producción)
// Node 18+ tiene fetch nativo, no necesita imports

const CLIP_API_KEY = "1b5331da-bdb2-45d5-9a0b-ae1976ff91ed";
const CLIP_API_SECRET = "7059f1b6-fbe6-458d-b88e-7c73621b21d6";

async function testClipCredentials() {
    console.log('🔑 Testing Clip Production Credentials...\n');

    try {
        // 1. Obtener Access Token
        console.log('1️⃣ Requesting OAuth token...');
        const tokenResponse = await fetch('https://api.payclip.com/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: CLIP_API_KEY,
                client_secret: CLIP_API_SECRET
            })
        });

        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            console.error('❌ Token request failed:', tokenResponse.status, errorText);
            return;
        }

        const tokenData = await tokenResponse.json();
        console.log('✅ Access token obtained!');
        console.log('   Token type:', tokenData.token_type);
        console.log('   Expires in:', tokenData.expires_in, 'seconds');
        console.log('   Token preview:', tokenData.access_token.substring(0, 20) + '...\n');

        // 2. Crear Payment Link
        console.log('2️⃣ Creating test payment link...');
        const checkoutResponse = await fetch('https://api.payclip.com/v2/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenData.access_token}`
            },
            body: JSON.stringify({
                amount: 100,
                currency: 'MXN',
                purchase_description: 'Test - Laboratorio Bienestar',
                redirection_url: {
                    success: 'https://laboratorio.delbienestar.com.mx/checkout/success',
                    error: 'https://laboratorio.delbienestar.com.mx/checkout/error'
                },
                metadata: {
                    me_reference_id: 'TEST-' + Date.now(),
                    customer_info: {
                        email: 'test@bienestar.com.mx'
                    }
                }
            })
        });

        if (!checkoutResponse.ok) {
            const errorDetail = await checkoutResponse.json();
            console.error('❌ Checkout creation failed:', checkoutResponse.status, errorDetail);
            return;
        }

        const checkoutData = await checkoutResponse.json();
        console.log('✅ Payment link created successfully!');
        console.log('   Payment URL:', checkoutData.payment_link || checkoutData.checkout_url || checkoutData.url);
        console.log('   Transaction ID:', checkoutData.id || 'N/A');

        console.log('\n🎉 ALL TESTS PASSED! Credentials are valid for PRODUCTION.\n');

    } catch (error) {
        console.error('💥 ERROR:', error.message);
    }
}

testClipCredentials();
