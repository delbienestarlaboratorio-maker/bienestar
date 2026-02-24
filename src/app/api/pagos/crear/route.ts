import { NextRequest, NextResponse } from 'next/server';
import { ClipService } from '@/services/ClipService';

const clipService = new ClipService();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { items, email, metadata } = body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { success: false, error: 'No hay estudios en el carrito' },
                { status: 400 }
            );
        }

        // Calcular total con validación
        const amount = items.reduce((sum: number, item: any) => {
            const price = Number(item.price) || 0;
            const qty = Number(item.quantity) || 1;
            return sum + (price * qty);
        }, 0);

        if (amount < 1) {
            return NextResponse.json(
                { success: false, error: 'El monto mínimo es $1.00 MXN' },
                { status: 400 }
            );
        }

        // Generar ID de orden único
        const orderId = `LAB-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

        // Descripción de la compra
        const studyNames = items.map((i: any) => i.name).join(', ');
        const description = items.length === 1
            ? `Lab Bienestar: ${studyNames}`
            : `Lab Bienestar: ${items.length} estudios - ${studyNames.substring(0, 200)}`;

        // Crear link de pago con Clip v2
        const result = await clipService.createPaymentLink({
            amount,
            description,
            orderId,
            email: email || metadata?.email || '',
        });

        console.log('✅ [API /pagos/crear] Payment created:', orderId, '→', result.payment_url);

        return NextResponse.json({
            success: true,
            paymentUrl: result.payment_url,
            paymentRequestId: result.payment_request_id,
            orderId,
            amount,
        });

    } catch (error: any) {
        console.error('❌ [API /pagos/crear] Error:', error.message);
        return NextResponse.json(
            { success: false, error: error.message || 'Error creating payment link' },
            { status: 500 }
        );
    }
}
