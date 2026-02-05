// Test detallado de Clip OAuth - Mostrando todos los detalles
console.log('🔍 CLIP OAUTH DIAGNOSTIC TEST\n');
console.log('═══════════════════════════════════════════════════\n');

const CLIP_API_KEY = "1b5331da-bdb2-45d5-9a0b-ae1976ff91ed";
const CLIP_API_SECRET = "7059f1b6-fbe6-458d-b88e-7c73621b21d6";

console.log('📋 Credentials:');
console.log('   Client ID:', CLIP_API_KEY);
console.log('   Client Secret:', CLIP_API_SECRET.substring(0, 20) + '...');
console.log('   API Base:', 'https://api.payclip.com');
console.log('\n');

async function testOAuth() {
    const url = 'https://api.payclip.com/oauth/token';
    const params = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CLIP_API_KEY,
        client_secret: CLIP_API_SECRET
    });

    console.log('📤 Request Details:');
    console.log('   URL:', url);
    console.log('   Method: POST');
    console.log('   Content-Type: application/x-www-form-urlencoded');
    console.log('   Body:', params.toString());
    console.log('\n');

    try {
        console.log('⏳ Sending request...\n');

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        });

        console.log('📥 Response:');
        console.log('   Status:', response.status, response.statusText);
        console.log('   Headers:', JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2));
        console.log('\n');

        const responseText = await response.text();
        console.log('📄 Response Body:');
        console.log(responseText);
        console.log('\n');

        if (!response.ok) {
            console.log('❌ FAILED - Status', response.status);
            try {
                const errorJson = JSON.parse(responseText);
                console.log('   Error Details:', JSON.stringify(errorJson, null, 2));
            } catch {
                console.log('   Error Text:', responseText);
            }
        } else {
            console.log('✅ SUCCESS!');
            const data = JSON.parse(responseText);
            console.log('   Token Type:', data.token_type);
            console.log('   Expires In:', data.expires_in, 'seconds');
            console.log('   Access Token:', data.access_token.substring(0, 30) + '...');
        }

    } catch (error) {
        console.log('💥 EXCEPTION:', error.message);
        console.log('   Stack:', error.stack);
    }
}

testOAuth();
