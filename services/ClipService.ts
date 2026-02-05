export interface CreatePaymentParams {
    amount: number;
    currency: string;
    reference: string; // Order ID
    message: string;   // Concepto (ej: "Estudio Química 45")
    email: string;
}

export class ClipService {
    private apiKey: string;
    private apiSecret: string;
    private isSandbox: boolean;

    constructor() {
        this.apiKey = process.env.CLIP_API_KEY || '';
        this.apiSecret = process.env.CLIP_API_SECRET || '';
        this.isSandbox = process.env.CLIP_ENV === 'sandbox';
    }

    private getBaseUrl() {
        return this.isSandbox
            ? 'https://api-sandbox.clip.mx'
            : 'https://api.clip.mx';
    }

    async createPaymentLink(params: CreatePaymentParams) {
        if (!this.apiKey) throw new Error('CLIP_API_KEY not configured');

        const url = `${this.getBaseUrl()}/checkout`;

        // Payload para Clip Checkout
        const payload = {
            amount: params.amount,
            currency: params.currency,
            purchase_description: params.message,
            redirection_url: {
                success: 'https://laboratorio.delbienestar.com.mx/checkout/success',
                error: 'https://laboratorio.delbienestar.com.mx/checkout/error',
            },
            metadata: {
                me_reference_id: params.reference,
                customer_info: {
                    email: params.email
                }
            }
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                    'Authorization': `Basic ${Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString('base64')}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Clip API Error: ${JSON.stringify(error)}`);
            }

            const data = await response.json();
            return data.payment_link; // URL a donde redirigir al usuario

        } catch (error) {
            console.error('Clip Service Error:', error);
            throw error;
        }
    }
}
