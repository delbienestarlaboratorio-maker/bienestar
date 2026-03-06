/**
 * Servicio para comunicarse con Tilde IA
 * Endpoint: http://localhost:10008/api/ia/chat
 */

export interface TildeIARequest {
    message: string;
    model?: string;
}

export interface TildeIAResponse {
    text: string;
    type: string;
    sender: string;
}

export interface TildeIAStatus {
    status: string;
    module: string;
    version: string;
    engine: string;
}

export class TildeIAService {
    private baseUrl: string;
    private chatEndpoint: string;
    private statusEndpoint: string;

    constructor() {
        this.baseUrl = process.env.TILDE_IA_URL || 'http://localhost:10008';
        this.chatEndpoint = `${this.baseUrl}/api/ia/chat`;
        this.statusEndpoint = `${this.baseUrl}/api/ia/status`;
    }

    /**
     * Envía un mensaje a Tilde IA y recibe una respuesta
     */
    async chat(message: string, model: string = 'llama2'): Promise<string> {
        try {
            const response = await fetch(this.chatEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message,
                    model
                } as TildeIARequest)
            });

            if (!response.ok) {
                throw new Error(`Tilde IA error: ${response.status} ${response.statusText}`);
            }

            const data: TildeIAResponse = await response.json();
            return data.text;

        } catch (error) {
            console.error('Error comunicándose con Tilde IA:', error);
            throw error;
        }
    }

    /**
     * Genera un JSON estructurado usando prompt engineering
     * Tilde IA no tiene endpoint nativo de JSON, así que pedimos JSON en el prompt
     */
    async generateJSON<T = any>(prompt: string, model: string = 'llama2'): Promise<T> {
        try {
            // Agregar instrucciones para obtener JSON válido
            const jsonPrompt = `${prompt}\n\nResponde SOLO con el JSON válido, sin texto adicional.`;
            
            const response = await this.chat(jsonPrompt, model);
            
            // Intentar extraer JSON de la respuesta
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No se encontró JSON válido en la respuesta');
            }

            return JSON.parse(jsonMatch[0]) as T;

        } catch (error) {
            console.error('Error generando JSON desde Tilde IA:', error);
            throw error;
        }
    }

    /**
     * Verifica el estado de Tilde IA
     */
    async checkStatus(): Promise<TildeIAStatus> {
        try {
            const response = await fetch(this.statusEndpoint);
            
            if (!response.ok) {
                throw new Error('Tilde IA no está disponible');
            }

            return await response.json();

        } catch (error) {
            console.error('Error verificando estado de Tilde IA:', error);
            throw error;
        }
    }

    /**
     * Verifica si Tilde IA está disponible
     */
    async isAvailable(): Promise<boolean> {
        try {
            await this.checkStatus();
            return true;
        } catch {
            return false;
        }
    }
}

// Exportar instancia singleton
export const tildeIA = new TildeIAService();
