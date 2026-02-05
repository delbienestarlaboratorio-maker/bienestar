// Motor de Precios Dinámicos - Estilo Aerolíneas
// Calcula precios personalizados basados en comportamiento del usuario

import { VisitorData } from '@/hooks/useVisitorTracking';

export interface PricingFactors {
    visitedCompetitor: boolean;
    competitorName?: string;
    timeOnSite: number; // segundos
    pageViews: number;
    returningVisitor: boolean;
    cartAbandonment: boolean;
    deviceType: 'mobile' | 'desktop' | 'tablet';
    trafficSource: string;
    timeOfDay: 'peak' | 'normal' | 'off-peak';
    dayOfWeek: 'weekday' | 'weekend';
    scrollDepth?: number;
    interactionCount?: number;
}

export interface PriceAdjustment {
    name: string;
    adjustment: number; // Porcentaje (+/-)
    reason: string;
    icon?: string;
}

export interface PriceCalculation {
    basePrice: number;
    finalPrice: number;
    discount: number;
    discountPercentage: number;
    adjustments: PriceAdjustment[];
    urgency: {
        show: boolean;
        message?: string;
        timeLeft?: number; // segundos
    };
    competitorMessage?: {
        show: boolean;
        competitor?: string;
        savings?: number;
    };
}

export class DynamicPricingEngine {
    // Descuentos base por competidor
    private competitorDiscounts: Record<string, number> = {
        'Laboratorios Chopo': 15,
        'Médica Polanco': 18,
        'Salud Digna': 12,
        'Farmacias Similares': 10,
        'Lab Polanco': 16
    };

    // Límites de ajuste de precio
    private readonly MAX_DISCOUNT = 35; // -35% máximo
    private readonly MAX_SURCHARGE = 10; // +10% máximo

    /**
     * Calcular precio personalizado
     */
    calculatePrice(basePrice: number, factors: PricingFactors): PriceCalculation {
        const adjustments: PriceAdjustment[] = [];
        let totalAdjustment = 0;

        // ==========================================
        // 1. VISITÓ COMPETENCIA - MÁXIMA PRIORIDAD
        // ==========================================
        if (factors.visitedCompetitor && factors.competitorName) {
            const discount = this.competitorDiscounts[factors.competitorName] || 10;
            adjustments.push({
                name: `Visitaste ${factors.competitorName}`,
                adjustment: -discount,
                reason: `Te ofrecemos ${discount}% menos que ${factors.competitorName}`,
                icon: '🎯'
            });
            totalAdjustment -= discount;
        }

        // ==========================================
        // 2. TIEMPO EN SITIO
        // ==========================================
        if (factors.timeOnSite > 300) {
            // Más de 5 minutos
            const minutes = Math.floor(factors.timeOnSite / 60);
            const discount = Math.min(10, Math.floor(minutes / 5) * 2);

            if (discount > 0) {
                adjustments.push({
                    name: 'Tiempo en sitio',
                    adjustment: -discount,
                    reason: `Has pasado ${minutes} minutos explorando`,
                    icon: '⏱️'
                });
                totalAdjustment -= discount;
            }
        }

        // ==========================================
        // 3. PÁGINAS VISTAS - ENGAGEMENT
        // ==========================================
        if (factors.pageViews > 5) {
            const discount = Math.min(8, (factors.pageViews - 5) * 1);
            adjustments.push({
                name: 'Exploración activa',
                adjustment: -discount,
                reason: `Has visto ${factors.pageViews} estudios diferentes`,
                icon: '📊'
            });
            totalAdjustment -= discount;
        }

        // ==========================================
        // 4. CARRITO ABANDONADO - RECUPERACIÓN AGRESIVA
        // ==========================================
        if (factors.cartAbandonment) {
            adjustments.push({
                name: '¡Regresaste!',
                adjustment: -15,
                reason: 'Te extrañamos - descuento especial por volver',
                icon: '💝'
            });
            totalAdjustment -= 15;
        }

        // ==========================================
        // 5. CLIENTE RECURRENTE - LOYALTY
        // ==========================================
        if (factors.returningVisitor && !factors.cartAbandonment) {
            adjustments.push({
                name: 'Cliente frecuente',
                adjustment: -10,
                reason: 'Gracias por tu preferencia',
                icon: '⭐'
            });
            totalAdjustment -= 10;
        }

        // ==========================================
        // 6. DISPOSITIVO MÓVIL
        // ==========================================
        if (factors.deviceType === 'mobile') {
            adjustments.push({
                name: 'Compra móvil',
                adjustment: -5,
                reason: 'Descuento especial desde tu celular',
                icon: '📱'
            });
            totalAdjustment -= 5;
        }

        // ==========================================
        // 7. FUENTE DE TRÁFICO
        // ==========================================
        if (
            factors.trafficSource === 'facebook' ||
            factors.trafficSource === 'instagram'
        ) {
            adjustments.push({
                name: 'Redes sociales',
                adjustment: -8,
                reason: 'Descuento exclusivo desde redes sociales',
                icon: '📱'
            });
            totalAdjustment -= 8;
        } else if (factors.trafficSource === 'google') {
            adjustments.push({
                name: 'Búsqueda Google',
                adjustment: -5,
                reason: 'Bienvenida desde Google',
                icon: '🔍'
            });
            totalAdjustment -= 5;
        }

        // ==========================================
        // 8. HORA DEL DÍA - SURGE PRICING
        // ==========================================
        if (factors.timeOfDay === 'peak') {
            // Hora pico - aumentar precio ligeramente
            adjustments.push({
                name: 'Hora pico',
                adjustment: 5,
                reason: 'Demanda alta - precio ajustado',
                icon: '🔥'
            });
            totalAdjustment += 5;
        } else if (factors.timeOfDay === 'off-peak') {
            // Hora valle - descuento
            adjustments.push({
                name: 'Hora valle',
                adjustment: -7,
                reason: 'Descuento por horario de baja demanda',
                icon: '🌙'
            });
            totalAdjustment -= 7;
        }

        // ==========================================
        // 9. DÍA DE LA SEMANA
        // ==========================================
        if (factors.dayOfWeek === 'weekend') {
            adjustments.push({
                name: 'Fin de semana',
                adjustment: -5,
                reason: 'Promoción especial de fin de semana',
                icon: '🎉'
            });
            totalAdjustment -= 5;
        }

        // ==========================================
        // 10. SCROLL DEPTH - ALTO INTERÉS
        // ==========================================
        if (factors.scrollDepth && factors.scrollDepth > 80) {
            adjustments.push({
                name: 'Alto interés',
                adjustment: -3,
                reason: 'Has leído toda la información del estudio',
                icon: '📖'
            });
            totalAdjustment -= 3;
        }

        // ==========================================
        // 11. INTERACCIONES
        // ==========================================
        if (factors.interactionCount && factors.interactionCount > 20) {
            adjustments.push({
                name: 'Engagement alto',
                adjustment: -2,
                reason: 'Gran interacción con el sitio',
                icon: '✨'
            });
            totalAdjustment -= 2;
        }

        // ==========================================
        // APLICAR LÍMITES
        // ==========================================
        const finalAdjustment = Math.max(
            -this.MAX_DISCOUNT,
            Math.min(this.MAX_SURCHARGE, totalAdjustment)
        );

        // ==========================================
        // CALCULAR PRECIO FINAL
        // ==========================================
        const discountPercentage = finalAdjustment;
        const discountAmount =
            (basePrice * Math.abs(discountPercentage)) / 100;
        const finalPrice =
            discountPercentage < 0
                ? basePrice - discountAmount
                : basePrice + discountAmount;

        // Redondear a 2 decimales
        const roundedFinalPrice = Math.round(finalPrice * 100) / 100;
        const roundedDiscount = Math.round(discountAmount * 100) / 100;

        // ==========================================
        // URGENCIA
        // ==========================================
        const urgency = this.calculateUrgency(adjustments);

        // ==========================================
        // MENSAJE DE COMPETENCIA
        // ==========================================
        const competitorMessage = this.getCompetitorMessage(
            factors,
            basePrice,
            roundedFinalPrice
        );

        return {
            basePrice,
            finalPrice: roundedFinalPrice,
            discount: roundedDiscount,
            discountPercentage: finalAdjustment,
            adjustments: adjustments.filter(a => a.adjustment !== 0),
            urgency,
            competitorMessage
        };
    }

    /**
     * Calcular urgencia basada en descuentos
     */
    private calculateUrgency(adjustments: PriceAdjustment[]): {
        show: boolean;
        message?: string;
        timeLeft?: number;
    } {
        const totalDiscount = adjustments.reduce(
            (sum, adj) => sum + Math.abs(Math.min(0, adj.adjustment)),
            0
        );

        if (totalDiscount >= 15) {
            return {
                show: true,
                message: 'Este precio especial es válido por tiempo limitado',
                timeLeft: 2 * 60 * 60 // 2 horas en segundos
            };
        }

        return { show: false };
    }

    /**
     * Mensaje especial si visitó competencia
     */
    private getCompetitorMessage(
        factors: PricingFactors,
        basePrice: number,
        finalPrice: number
    ): { show: boolean; competitor?: string; savings?: number } {
        if (!factors.visitedCompetitor || !factors.competitorName) {
            return { show: false };
        }

        // Estimar precio de competencia (generalmente más caro)
        const estimatedCompetitorPrice = basePrice * 1.15; // 15% más caro
        const savings = Math.round((estimatedCompetitorPrice - finalPrice) * 100) / 100;

        return {
            show: true,
            competitor: factors.competitorName,
            savings: savings > 0 ? savings : undefined
        };
    }

    /**
     * Obtener hora del día
     */
    getTimeOfDay(): 'peak' | 'normal' | 'off-peak' {
        const hour = new Date().getHours();

        // Horas pico
        if ((hour >= 8 && hour <= 10) || (hour >= 18 && hour <= 20)) {
            return 'peak';
        }

        // Horas valle (madrugada)
        if (hour >= 0 && hour <= 6) {
            return 'off-peak';
        }

        return 'normal';
    }

    /**
     * Verificar si es fin de semana
     */
    isWeekend(): boolean {
        const day = new Date().getDay();
        return day === 0 || day === 6; // Domingo o Sábado
    }

    /**
     * Generar factores desde VisitorData
     */
    static fromVisitorData(visitorData: VisitorData): PricingFactors {
        const engine = new DynamicPricingEngine();

        return {
            visitedCompetitor: visitorData.visitedCompetitor,
            competitorName: visitorData.competitorName,
            timeOnSite: visitorData.timeOnSite,
            pageViews: visitorData.pageViews,
            returningVisitor: visitorData.returningVisitor,
            cartAbandonment: visitorData.hasAbandonedCart,
            deviceType: visitorData.deviceType,
            trafficSource: visitorData.trafficSource,
            timeOfDay: engine.getTimeOfDay(),
            dayOfWeek: engine.isWeekend() ? 'weekend' : 'weekday',
            scrollDepth: visitorData.scrollDepth,
            interactionCount: visitorData.interactionCount
        };
    }
}

// Singleton instance
export const pricingEngine = new DynamicPricingEngine();
