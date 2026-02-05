import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const signature = request.headers.get('x-clip-signature');
        const body = await request.json();

        // TODO: Validar firma con CLIP_WEBHOOK_SECRET cuando esté disponible
        // if (!isValidSignature(signature, body)) return NextResponse.json({error: 'Invalid signature'}, {status: 401});

        console.log('📦 Webhook Clip Recibido:', body);

        const { type, payload } = body;

        if (type === 'PAYMENT.SUCCEEDED') {
            const orderId = payload.metadata.me_reference_id;
            console.log(`✅ Pago Exitoso para Orden: ${orderId}`);

            // AQUÍ: Actualizar base de datos
            // await db.orders.update({ where: { id: orderId }, data: { status: 'paid' } });

            // AQUÍ: Enviar confirmación (Email/WhatsApp)
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
