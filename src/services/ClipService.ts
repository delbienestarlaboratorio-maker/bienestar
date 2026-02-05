export interface CreatePaymentParams {
    amount: number;
    currency: string;
    reference: string; // Order ID
    message: string;   // Concepto (ej: "Estudio Química 45")
    email: string;
}

interface ClipTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export class ClipService {
    private apiKey: string;
    private apiSecret: string;
    private isSandbox: boolean;
    private accessToken: string | null = null;
    private tokenExpiry: number = 0;

    constructor() {
        this.apiKey = process.env.CLIP_API_KEY || '';
        this.apiSecret = process.env.CLIP_API_SECRET || '';
        this.isSandbox = process.env.CLIP_ENV === 'sandbox';

        console.log('🔧 [ClipService] Initialized with OAuth:');
        console.log('   Mode:', this.isSandbox ? 'Sandbox (Production API)' : 'Production');
        console.log('   Client ID:', this.apiKey.substring(0, 8) + '...');
        console.log('   Has Secret:', !!this.apiSecret);
    }

    private getBaseUrl() {
        // URL correcta según documentación oficial: https://api.payclip.com
        // No existe sandbox separado, se usa producción con credenciales de prueba
        return 'https://api.payclip.com';
    }

    /**
     * Obtiene un access token OAuth válido
     * Cache el token hasta que expire para evitar solicitudes innecesarias
     */
    private async getAccessToken(): Promise<string> {
        // Si tenemos un token válido, usarlo
        if (this.accessToken && Date.now() < this.tokenExpiry) {
            console.log('🔑 [ClipService] Using cached access token');
            return this.accessToken;
        }

        console.log('🔑 [ClipService] Requesting new access token...');

        try {
            // Solicitar nuevo token OAuth
            const response = await fetch(`${this.getBaseUrl()}/oauth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: this.apiKey,
                    client_secret: this.apiSecret
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ [ClipService] Token request failed:', response.status, errorText);
                throw new Error(`Failed to get access token: ${response.status} ${errorText}`);
            }

            const data: ClipTokenResponse = await response.json();

            this.accessToken = data.access_token;
            // Expirar 1 minuto antes para seguridad
            this.tokenExpiry = Date.now() + ((data.expires_in - 60) * 1000);

            console.log('✅ [ClipService] Access token obtained');
            console.log('   Expires in:', data.expires_in, 'seconds');

            return this.accessToken;

        } catch (error: any) {
            console.error('💥 [ClipService] Error getting access token:', error);
            throw new Error(`OAuth authentication failed: ${error.message}`);
        }
    }

    async createPaymentLink(params: CreatePaymentParams) {
        if (!this.apiKey) throw new Error('CLIP_API_KEY not configured');
        if (!this.apiSecret) throw new Error('CLIP_API_SECRET not configured');

        // Obtener o reusar access token
        const accessToken = await this.getAccessToken();

        // URL completa según documentación: https://api.payclip.com/v2/checkout
        const url = `${this.getBaseUrl()}/v2/checkout`;

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
            console.log('🔍 [ClipService] Creating payment link with OAuth');
            console.log('   URL:', url);
            console.log('   Amount:', params.amount, params.currency);
            console.log('   Reference:', params.reference);
            console.log('   Email:', params.email);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`  // ← OAuth Bearer token!
                },
                body: JSON.stringify(payload)
            });

            console.log('📊 [ClipService] Response status:', response.status, response.statusText);

            if (!response.ok) {
                let errorDetail;
                try {
                    errorDetail = await response.json();
                } catch {
                    errorDetail = await response.text();
                }
                console.error('❌ [ClipService] Clip API rejected request:', errorDetail);
                throw new Error(`Clip API Error (${response.status}): ${JSON.stringify(errorDetail)}`);
            }

            const data = await response.json();
            console.log('✅ [ClipService] Payment link created successfully!');
            console.log('   Link:', data.payment_link || data.checkout_url || 'N/A');

            // Clip puede retornar payment_link o checkout_url
            return data.payment_link || data.checkout_url || data.url;

        } catch (error: any) {
            console.error('💥 [ClipService] CRITICAL ERROR');
            console.error('   Type:', error.constructor.name);
            console.error('   Message:', error.message);

            if (error.cause) {
                console.error('   Cause:', error.cause);
            }

            throw error;
        }
    }
}
