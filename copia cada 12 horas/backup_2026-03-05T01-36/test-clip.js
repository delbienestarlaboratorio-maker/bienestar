// Test de integración de Clip
// Este script prueba el flujo completo: checkout → Clip API

const testClipIntegration = async () => {
    console.log('🧪 Iniciando prueba de Clip...\n');

    // Datos de prueba
    const testData = {
        items: [
            {
                id: 'test-001',
                name: 'Química Sanguínea de 45 elementos',
                price: 850,
                promotionalPrice: 650,
                category: 'analisis-clinicos',
                slug: 'quimica-sanguinea-45',
                quantity: 1
            },
            {
                id: 'test-002',
                name: 'Biometría Hemática Completa',
                price: 250,
                category: 'analisis-clinicos',
                slug: 'biometria-hematica',
                quantity: 2
            }
        ],
        customerInfo: {
            name: 'Juan Pérez Test',
            email: 'test@laboratoriobienestar.com',
            phone: '5512345678',
            notes: 'Prueba de integración Clip'
        }
    };

    console.log('📦 Datos de prueba:');
    console.log('   Items:', testData.items.length);
    console.log('   Cliente:', testData.customerInfo.name);
    console.log('   Total esperado: $', testData.items.reduce((sum, item) => {
        return sum + ((item.promotionalPrice || item.price) * item.quantity);
    }, 0));
    console.log('');

    try {
        console.log('🌐 Llamando a /api/checkout...');
        const startTime = Date.now();

        const response = await fetch('http://localhost:30200/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        const duration = Date.now() - startTime;
        console.log(`⏱️  Respuesta recibida en ${duration}ms\n`);

        // Verificar status
        console.log('📊 Status:', response.status, response.statusText);

        // Leer respuesta
        const data = await response.json();

        if (response.ok) {
            console.log('\n✅ ÉXITO - Clip respondió correctamente\n');
            console.log('📋 Detalles de la respuesta:');
            console.log('   Success:', data.success);
            console.log('   Reference:', data.reference);
            console.log('   Payment Link:', data.paymentLink);
            console.log('');
            console.log('🔗 Link completo de pago:');
            console.log('   ', data.paymentLink);
            console.log('');
            console.log('✨ El flujo funcionó perfectamente!');
            console.log('   El usuario sería redirigido a Clip para completar el pago.');
        } else {
            console.log('\n❌ ERROR - La API retornó un error\n');
            console.log('📋 Detalles del error:');
            console.log(JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.log('\n💥 ERROR CRÍTICO\n');
        console.log('Tipo:', error.name);
        console.log('Mensaje:', error.message);

        if (error.cause) {
            console.log('Causa:', error.cause);
        }

        console.log('\n🔍 Posibles causas:');
        console.log('   1. El servidor Next.js no está corriendo');
        console.log('   2. Credenciales de Clip inválidas');
        console.log('   3. Problema de red/firewall');
        console.log('   4. Error en ClipService');
    }

    console.log('\n─────────────────────────────────────');
};

// Ejecutar prueba
testClipIntegration();
