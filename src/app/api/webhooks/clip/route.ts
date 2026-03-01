export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { ClipService } from '@/services/ClipService';

const clipService = new ClipService();

/**
 * Webhook handler para notificaciones de Clip v2
 *
 * Clip envía un POST con:
 * {
 *   "id": "payment_request_id",
 *   "origin": "checkout-api",
 *   "event_type": "INSERT" | "UPDATE"
 * }
 *
 * IMPORTANTE: El webhook NO envía monto ni status.
 * Tras recibirlo, debemos llamar a GET /v2/checkout/{id} para verificar.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, origin, event_type } = body;

        console.log('🔔 [Webhook Clip] Notification received');
        console.log('   ID:', id);
        console.log('   Origin:', origin);
        console.log('   Event:', event_type);

        if (!id) {
            console.warn('⚠️ [Webhook Clip] Missing payment ID');
            return NextResponse.json({ received: true }, { status: 200 });
        }

        // Solo verificar en eventos UPDATE (cambio de estado)
        if (event_type === 'UPDATE') {
            try {
                const status = await clipService.checkPaymentStatus(id);
                console.log('📊 [Webhook Clip] Status verified:', status.status);
                console.log('   Amount:', status.amount, status.currency);
                console.log('   Reference:', status.metadata?.me_reference_id);

                if (status.status === 'PAID') {
                    const orderId = status.metadata?.me_reference_id || id;
                    console.log(`💰 [Webhook Clip] PAYMENT CONFIRMED: ${orderId}`);

                    // TODO: Actualizar orden en base de datos
                    // await db.update(orders)
                    //   .set({ status: 'paid', paidAt: new Date(), clipPaymentId: id })
                    //   .where(eq(orders.reference, orderId));

                    // TODO: Enviar email de confirmación al paciente
                    // const email = status.metadata?.customer_info?.email;
                    // if (email) await sendConfirmationEmail(email, orderId, status.amount);

                    // TODO: Notificar al laboratorio por WhatsApp
                    // await notifyLabWhatsApp(orderId, status.amount);
                }
            } catch (err: any) {
                console.error('❌ [Webhook Clip] Error verifying status:', err.message);
            }
        }

        // Siempre responder 200 para que Clip no reintente
        return NextResponse.json({ received: true, processed: true });

    } catch (error: any) {
        console.error('💥 [Webhook Clip] Error:', error.message);
        return NextResponse.json({ received: true }, { status: 200 });
    }
}
