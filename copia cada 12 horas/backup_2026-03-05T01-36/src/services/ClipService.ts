/**
 * Clip Payment Service - v2 API Integration
 * Docs: https://developer.clip.mx/reference/createnewpaymentlink
 *
 * Auth: Authorization: Basic base64(API_KEY:API_SECRET)
 * Endpoint: POST https://api.payclip.com/v2/checkout
 */

export interface CreatePaymentParams {
    amount: number;
    currency?: string;
    description: string;
    orderId: string;
    email?: string;
    webhookUrl?: string;
}

export interface ClipPaymentResponse {
    payment_request_id: string;
    payment_url: string;
    status: string;
}

export interface ClipPaymentStatusResponse {
    payment_request_id: string;
    status: 'PAID' | 'PENDING' | 'EXPIRED' | 'CANCELLED';
    amount: number;
    currency: string;
    payment_method?: string;
    metadata?: Record<string, any>;
}

export class ClipService {
    private apiKey: string;
    private apiSecret: string;
    private baseUrl = 'https://api.payclip.com';

    constructor() {
        this.apiKey = process.env.CLIP_API_KEY || '';
        this.apiSecret = process.env.CLIP_API_SECRET || '';

        if (!this.apiKey || !this.apiSecret) {
            console.warn('⚠️ [ClipService] CLIP_API_KEY or CLIP_API_SECRET not set');
        }
    }

    /**
     * Genera el header de autenticación Basic para Clip v2
     * Format: Authorization: Basic base64(API_KEY:API_SECRET)
     */
    private getAuthHeader(): string {
        const credentials = `${this.apiKey}:${this.apiSecret}`;
        const base64 = Buffer.from(credentials).toString('base64');
        return `Basic ${base64}`;
    }

    /**
     * Crea un nuevo link de pago (Checkout Redireccionado v2)
     * POST https://api.payclip.com/v2/checkout
     */
    async createPaymentLink(params: CreatePaymentParams): Promise<ClipPaymentResponse> {
        if (!this.apiKey) throw new Error('CLIP_API_KEY not configured');
        if (!this.apiSecret) throw new Error('CLIP_API_SECRET not configured');

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://laboratorio.delbienestar.com.mx';

        const payload = {
            amount: params.amount,
            currency: params.currency || 'MXN',
            purchase_description: params.description.substring(0, 250),
            redirection_url: {
                success: `${siteUrl}/checkout/success?ref=${params.orderId}`,
                error: `${siteUrl}/checkout/error?ref=${params.orderId}`,
                default: `${siteUrl}/checkout?ref=${params.orderId}`,
            },
            webhook_url: params.webhookUrl || `${siteUrl}/api/webhooks/clip`,
            metadata: {
                me_reference_id: params.orderId,
                customer_info: {
                    email: params.email || '',
                },
            },
        };

        try {
            console.log('💳 [ClipService] Creating payment link...');
            console.log('   Amount:', params.amount, payload.currency);
            console.log('   Order:', params.orderId);

            const response = await fetch(`${this.baseUrl}/v2/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': this.getAuthHeader(),
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                let errorDetail;
                try {
                    errorDetail = await response.json();
                } catch {
                    errorDetail = await response.text();
                }
                console.error('❌ [ClipService] API error:', response.status, errorDetail);
                throw new Error(`Clip API Error (${response.status}): ${JSON.stringify(errorDetail)}`);
            }

            const data = await response.json();
            // 🔍 Log FULL response so we can see exact Clip field names
            console.log('✅ [ClipService] Full Clip response:', JSON.stringify(data));

            // Clip API may return payment URL under different field names across versions
            const paymentId = data.payment_request_id || data.id || '';
            let paymentUrl =
                data.payment_url ||        // documented v2
                data.payment_link ||       // some sandbox versions
                data.checkout_url ||       // alternative
                data.link ||               // compact response
                data.url ||                // minimal response
                data.redirect_url ||       // redirect variant
                (data.data?.payment_url) || // nested data object variant
                (data.data?.link) ||       // nested compact
                '';

            // 🔑 CRITICAL FALLBACK: Clip v2 API often returns ONLY the payment_request_id
            // The checkout URL must be constructed manually
            if (!paymentUrl && paymentId) {
                paymentUrl = `https://checkout.clip.mx/${paymentId}`;
                console.log('🔧 [ClipService] Constructed checkout URL from payment_request_id');
            }

            console.log('💳 [ClipService] Final payment URL:', paymentUrl);
            console.log('   payment_request_id:', paymentId);

            if (!paymentUrl) {
                console.error('❌ [ClipService] No payment URL and no payment_request_id! Keys:', Object.keys(data));
            }

            return {
                payment_request_id: paymentId,
                payment_url: paymentUrl,
                status: data.status || 'PENDING',
            };

        } catch (error: any) {
            console.error('💥 [ClipService] Failed to create payment:', error.message);
            throw error;
        }
    }

    /**
     * Consulta el estado de un link de pago
     * GET https://api.payclip.com/v2/checkout/{payment_request_id}
     */
    async checkPaymentStatus(paymentRequestId: string): Promise<ClipPaymentStatusResponse> {
        if (!this.apiKey) throw new Error('CLIP_API_KEY not configured');

        try {
            const response = await fetch(`${this.baseUrl}/v2/checkout/${paymentRequestId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': this.getAuthHeader(),
                },
            });

            if (!response.ok) {
                const errorDetail = await response.text();
                throw new Error(`Clip API Error (${response.status}): ${errorDetail}`);
            }

            const data = await response.json();
            console.log('📊 [ClipService] Payment status:', data.status, 'for', paymentRequestId);

            return {
                payment_request_id: data.payment_request_id,
                status: data.status,
                amount: data.amount,
                currency: data.currency,
                payment_method: data.payment_method,
                metadata: data.metadata,
            };

        } catch (error: any) {
            console.error('❌ [ClipService] Failed to check status:', error.message);
            throw error;
        }
    }
}
