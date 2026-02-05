import { NextRequest, NextResponse } from 'next/server';
import { ClipService } from '@/services/ClipService';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { items, customerInfo } = body;

        // Validar datos requeridos
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

        // Calcular total
        const total = items.reduce((sum: number, item: any) => {
            const price = item.promotionalPrice || item.price;
            return sum + (price * item.quantity);
        }, 0);

        // Generar referencia única
        const reference = `LAB-${Date.now()}-${Math.random().toString(36).substring(7)}`;

        // Crear descripción del pedido
        const studyNames = items.map((item: any) => item.name).join(', ');
        const description = items.length === 1
            ? studyNames
            : `${items.length} estudios: ${studyNames.substring(0, 100)}${studyNames.length > 100 ? '...' : ''}`;

        // Crear link de pago con Clip
        const clipService = new ClipService();
        const paymentLink = await clipService.createPaymentLink({
            amount: total,
            currency: 'MXN',
            reference: reference,
            message: description,
            email: customerInfo.email
        });

        // TODO: Guardar el pedido en base de datos aquí
        // await db.insert(orders).values({
        //     reference,
        //     customerName: customerInfo.name,
        //     customerEmail: customerInfo.email,
        //     customerPhone: customerInfo.phone,
        //     items: JSON.stringify(items),
        //     total,
        //     status: 'pending',
        //     notes: customerInfo.notes
        // });

        return NextResponse.json({
            success: true,
            paymentLink,
            reference
        });

    } catch (error: any) {
        console.error('Checkout API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Error al procesar el pago' },
            { status: 500 }
        );
    }
}
