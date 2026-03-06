# Test alternativo - Llamar directamente al ClipService
import { ClipService } from './src/services/ClipService.js';

const testDirectClip = async () => {
    console.log('🧪 Test directo de ClipService\n');

    // Simular variables de entorno
    process.env.CLIP_API_KEY = '8d12c56e-34db-4496-8cf2-6e54c8381716';
    process.env.CLIP_API_SECRET = 'test_e25092a9-d1df-472b-a6d4-67e6e10615a9';
    process.env.CLIP_ENV = 'sandbox';

    const clipService = new ClipService();

    try {
        console.log('Llamando a createPaymentLink...\n');

        const paymentLink = await clipService.createPaymentLink({
            amount: 1150,
            currency: 'MXN',
            reference: `TEST-${Date.now()}`,
            message: 'Pedido de prueba - 2 estudios',
            email: 'test@laboratoriobienestar.com'
        });

        console.log('\n✅ ÉXITO!');
        console.log('Payment Link:', paymentLink);

    } catch (error) {
        console.log('\n❌ ERROR:');
        console.log(error);
    }
};

testDirectClip();
