import { tildeIA } from '@/services/TildeIAService'

export class StrategistAgent {
    private model = 'qwen2.5:14b' // As per task.md

    async optimizePricing(study: string, currentPrice: number, competitorPrices: number[]): Promise<{ suggestedPrice: number, reasoning: string }> {
        const prompt = `
        Eres un experto en estrategia de precios para laboratorios clínicos.
        Estudio: ${study}
        Mi Precio Actual: $${currentPrice}
        Precios Competencia: ${competitorPrices.join(', ')}
        
        Sugiere un nuevo precio competitivo que maximice margen pero mantenga competitividad.
        Responde en JSON: { "suggestedPrice": 0, "reasoning": "..." }
        `

        try {
            const response = await tildeIA.generateJSON<{ suggestedPrice: number, reasoning: string }>(prompt, this.model)
            return response
        } catch (error) {
            console.error('Error in StrategistAgent:', error)
            return { suggestedPrice: currentPrice, reasoning: 'Error en análisis de IA' }
        }
    }
}
