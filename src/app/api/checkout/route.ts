import { NextRequest, NextResponse } from 'next/server';
import { ClipService } from '@/services/ClipService';

const clipService = new ClipService();

/**
 * POST /api/checkout - Crea un pago con Clip
 * Usado por checkout/page.tsx cuando el usuario elige "Pagar con Clip"
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { items, customerInfo } = body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: 'No hay estudios en el carrito' },
                { status: 400 }
            );
        }

        if (!customerInfo?.name || !customerInfo?.email || !customerInfo?.phone) {
            return NextResponse.json(
                { error: 'Información de contacto incompleta' },
                { status: 400 }
            );
        }

        // Calcular total con cantidades
        const total = items.reduce((sum: number, item: any) => {
            const price = Number(item.promotionalPrice || item.price) || 0;
            const qty = Number(item.quantity) || 1;
            return sum + (price * qty);
        }, 0);

        if (total < 1) {
            return NextResponse.json(
                { error: 'El monto mínimo es $1.00 MXN' },
                { status: 400 }
            );
        }

        // Generar referencia única
        const orderId = `LAB-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

        // Descripción para Clip
        const studyNames = items.map((item: any) => item.name).join(', ');
        const description = items.length === 1
            ? `Lab Bienestar: ${studyNames}`
            : `Lab Bienestar: ${items.length} estudios - ${studyNames.substring(0, 200)}`;

        // Crear link de pago
        const result = await clipService.createPaymentLink({
            amount: total,
            description,
            orderId,
            email: customerInfo.email,
        });

        // TODO: Guardar pedido en DB
        // await db.insert(orders).values({
        //     reference: orderId,
        //     clipPaymentId: result.payment_request_id,
        //     customerName: customerInfo.name,
        //     customerEmail: customerInfo.email,
        //     customerPhone: customerInfo.phone,
        //     items: JSON.stringify(items),
        //     total,
        //     status: 'pending',
        //     sucursal: customerInfo.sucursal,
        //     preferredDate: customerInfo.date,
        // });

        return NextResponse.json({
            success: true,
            paymentLink: result.payment_url,
            paymentRequestId: result.payment_request_id,
            reference: orderId,
        });

    } catch (error: any) {
        console.error('❌ [Checkout API] Error:', error.message);
        return NextResponse.json(
            { error: error.message || 'Error al procesar el pago' },
            { status: 500 }
        );
    }
}
