import { NextResponse } from 'next/server';
import { ClipService } from '@/services/ClipService';

const clipService = new ClipService();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, email, user_id } = body;

        // Calcular total (esto debería validarse contra DB para seguridad)
        const amount = items.reduce((sum: number, item: any) => sum + item.price, 0);
        const orderId = `ORD-${Date.now()}`; // Generar ID único real en producción

        // Crear Link de Pago
        const paymentUrl = await clipService.createPaymentLink({
            amount,
            currency: 'MXN',
            reference: orderId,
            message: `Laboratorio Bienestar - ${items.length} Estudios`,
            email
        });

        return NextResponse.json({
            success: true,
            paymentUrl,
            orderId
        });

    } catch (error) {
        console.error('Payment Error:', error);
        return NextResponse.json(
            { success: false, error: 'Error creating payment link' },
            { status: 500 }
        );
    }
}
