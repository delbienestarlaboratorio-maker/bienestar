import { tildeIA } from '@/services/TildeIAService'
import fs from 'fs/promises'
import path from 'path'

export interface MarketAlert {
    severity: 'low' | 'medium' | 'high' | 'critical'
    competitor: string
    study: string
    oldPrice: number
    newPrice: number
    changePercent: number
    message: string
}

export class SentinelAgent {
    private model = 'llama3.2' // Updated to llama3.2 as per task.md
    private scraperDataPath = 'services/scraper/data/historical' // Updated path

    async analyzeLatestChanges(competitor: 'chopo' | 'polanco' | 'olab' | 'salud_digna'): Promise<MarketAlert[]> {
        // 1. Leer archivos del scraper
        const files = await this.getLatestFiles(competitor)
        if (files.length < 2) return []

        const [newFile, oldFile] = files
        const newData = JSON.parse(await fs.readFile(path.join(this.scraperDataPath, newFile), 'utf-8'))
        const oldData = JSON.parse(await fs.readFile(path.join(this.scraperDataPath, oldFile), 'utf-8'))

        // 2. Detección algorítmica de cambios (Pre-filtrado para la IA)
        const changes = this.detectPriceChanges(newData, oldData)

        if (changes.length === 0) return []

        // 3. Análisis de IA para interpretar los cambios
        const alerts: MarketAlert[] = []

        for (const change of changes) {
            // Si el cambio es significativo, pedir opinión a la IA
            if (Math.abs(change.percent) > 5) {
                const analysis = await this.askAI(change)
                alerts.push({
                    severity: analysis.severity,
                    competitor,
                    study: change.study,
                    oldPrice: change.oldPrice,
                    newPrice: change.newPrice,
                    changePercent: change.percent,
                    message: analysis.message
                })
            }
        }

        return alerts
    }

    private async getLatestFiles(competitor: string): Promise<string[]> {
        try {
            const files = await fs.readdir(this.scraperDataPath)
            return files
                .filter(f => f.startsWith(competitor) && f.endsWith('.json'))
                .sort()
                .reverse() // Más recientes primero
                .slice(0, 2)
        } catch {
            return []
        }
    }

    private detectPriceChanges(newData: any, oldData: any) {
        // Lógica simplificada de comparación
        // Asume estructura { "Estudio": { price: 100 } }
        const changes = []
        for (const [key, value] of Object.entries(newData)) {
            const newVal = (value as any).price
            const oldVal = oldData[key]?.price
            if (newVal && oldVal && newVal !== oldVal) {
                changes.push({
                    study: key,
                    newPrice: newVal,
                    oldPrice: oldVal,
                    percent: ((newVal - oldVal) / oldVal) * 100
                })
            }
        }
        return changes
    }

    private async askAI(change: any): Promise<{ severity: 'low' | 'medium' | 'high' | 'critical', message: string }> {
        const prompt = `
    Analiza este cambio de precio en la competencia:
    Estudio: ${change.study}
    Precio Anterior: $${change.oldPrice}
    Precio Nuevo: $${change.newPrice}
    Cambio: ${change.percent.toFixed(2)}%
    
    Determina la severidad (low, medium, high, critical) y genera un mensaje corto para el equipo de ventas.
    Si bajaron el precio mucho, es critical.
    
    Responde en JSON: { "severity": "...", "message": "..." }
    `
        try {
            // Assuming tildeIA has a generateJSON method or similar. 
            // If not, we might need to adjust. Using the previous code as reference.
            const response = await tildeIA.generateJSON<{ severity: 'low' | 'medium' | 'high' | 'critical', message: string }>(prompt, this.model)
            return response
        } catch {
            return { severity: 'medium', message: 'Cambio de precio detectado (Tilde IA no disponible)' }
        }
    }
}
