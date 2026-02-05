'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { pixelTracker } from '@/lib/tracking/pixels';

export interface VisitorData {
    // Competencia
    visitedCompetitor: boolean;
    competitorName?: string;

    // Comportamiento
    timeOnSite: number; // segundos
    pageViews: number;

    // Usuario
    returningVisitor: boolean;
    hasAbandonedCart: boolean;
    sessionId: string;

    // Device & Source
    deviceType: 'mobile' | 'desktop' | 'tablet';
    trafficSource: string;

    // Engagement
    scrollDepth: number; // porcentaje
    interactionCount: number;
}

export function useVisitorTracking(): VisitorData {
    const [visitorData, setVisitorData] = useState<VisitorData>({
        visitedCompetitor: false,
        timeOnSite: 0,
        pageViews: 0,
        returningVisitor: false,
        hasAbandonedCart: false,
        deviceType: 'desktop',
        trafficSource: 'direct',
        sessionId: '',
        scrollDepth: 0,
        interactionCount: 0
    });

    useEffect(() => {
        // ==========================================
        // 1. SESSION ID
        // ==========================================
        let sessionId = Cookies.get('session_id');
        if (!sessionId) {
            sessionId = generateSessionId();
            Cookies.set('session_id', sessionId, { expires: 1 }); // 1 día
        }

        // ==========================================
        // 2. VISITANTE RECURRENTE
        // ==========================================
        const isReturning = Cookies.get('returning_visitor') === 'true';
        if (!isReturning) {
            Cookies.set('returning_visitor', 'true', { expires: 365 });
        }

        // ==========================================
        // 3. DETECTAR COMPETENCIA
        // ==========================================
        const competitorData = pixelTracker.hasRecentCompetitorVisit();

        // ==========================================
        // 4. CARRITO ABANDONADO
        // ==========================================
        const hasAbandonedCart = localStorage.getItem('cart_abandoned') === 'true';

        // ==========================================
        // 5. FUENTE DE TRÁFICO
        // ==========================================
        const trafficSource = getTrafficSource();

        // ==========================================
        // 6. TIPO DE DISPOSITIVO
        // ==========================================
        const deviceType = getDeviceType();

        // ==========================================
        // 7. PÁGINAS VISTAS (Sesión actual)
        // ==========================================
        let pageViews = parseInt(sessionStorage.getItem('page_views') || '0') + 1;
        sessionStorage.setItem('page_views', pageViews.toString());

        // ==========================================
        // 8. TIEMPO EN SITIO
        // ==========================================
        const startTime = parseInt(
            sessionStorage.getItem('session_start') || Date.now().toString()
        );

        if (!sessionStorage.getItem('session_start')) {
            sessionStorage.setItem('session_start', Date.now().toString());
        }

        const calculateTimeOnSite = () => {
            return Math.floor((Date.now() - startTime) / 1000);
        };

        // ==========================================
        // 9. SCROLL DEPTH
        // ==========================================
        const trackScrollDepth = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const scrollDepth = Math.round(
                ((scrollTop + windowHeight) / documentHeight) * 100
            );

            setVisitorData(prev => ({
                ...prev,
                scrollDepth: Math.max(prev.scrollDepth, scrollDepth)
            }));
        };

        // ==========================================
        // 10. INTERACCIONES
        // ==========================================
        let interactionCount = 0;

        const trackInteraction = () => {
            interactionCount++;
            setVisitorData(prev => ({
                ...prev,
                interactionCount: interactionCount
            }));
        };

        // Event listeners
        window.addEventListener('scroll', trackScrollDepth, { passive: true });
        window.addEventListener('click', trackInteraction);
        window.addEventListener('keydown', trackInteraction);

        // ==========================================
        // ACTUALIZAR ESTADO INICIAL
        // ==========================================
        setVisitorData({
            visitedCompetitor: competitorData.visited,
            competitorName: competitorData.competitor,
            timeOnSite: calculateTimeOnSite(),
            pageViews: pageViews,
            returningVisitor: isReturning,
            hasAbandonedCart: hasAbandonedCart,
            deviceType: deviceType,
            trafficSource: trafficSource,
            sessionId: sessionId,
            scrollDepth: 0,
            interactionCount: 0
        });

        // ==========================================
        // ACTUALIZAR TIEMPO CADA 10 SEGUNDOS
        // ==========================================
        const timeInterval = setInterval(() => {
            setVisitorData(prev => ({
                ...prev,
                timeOnSite: calculateTimeOnSite()
            }));
        }, 10000); // 10 segundos

        // ==========================================
        // CLEANUP
        // ==========================================
        return () => {
            clearInterval(timeInterval);
            window.removeEventListener('scroll', trackScrollDepth);
            window.removeEventListener('click', trackInteraction);
            window.removeEventListener('keydown', trackInteraction);
        };
    }, []);

    return visitorData;
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getTrafficSource(): string {
    if (typeof window === 'undefined') return 'direct';

    // Primero revisar UTM parameters
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');

    if (utmSource) {
        // Guardar en cookie para persistencia
        Cookies.set('traffic_source', utmSource, { expires: 7 });

        if (utmCampaign) {
            Cookies.set('campaign', utmCampaign, { expires: 7 });
        }

        return utmSource;
    }

    // Revisar si hay fuente guardada
    const savedSource = Cookies.get('traffic_source');
    if (savedSource) return savedSource;

    // Analizar referrer
    const referrer = document.referrer.toLowerCase();

    if (!referrer || referrer.includes(window.location.hostname)) {
        return 'direct';
    }

    // Redes sociales
    if (referrer.includes('facebook.com')) return 'facebook';
    if (referrer.includes('instagram.com')) return 'instagram';
    if (referrer.includes('twitter.com') || referrer.includes('t.co')) return 'twitter';
    if (referrer.includes('linkedin.com')) return 'linkedin';
    if (referrer.includes('tiktok.com')) return 'tiktok';
    if (referrer.includes('youtube.com')) return 'youtube';

    // Buscadores
    if (referrer.includes('google.com')) return 'google';
    if (referrer.includes('bing.com')) return 'bing';
    if (referrer.includes('yahoo.com')) return 'yahoo';
    if (referrer.includes('duckduckgo.com')) return 'duckduckgo';

    // Competidores (para tracking adicional)
    if (referrer.includes('chopo.com')) return 'competitor_chopo';
    if (referrer.includes('medicapolanco.com')) return 'competitor_polanco';
    if (referrer.includes('saluddigna.com')) return 'competitor_saluddigna';

    // Otros
    return 'referral';
}

function getDeviceType(): 'mobile' | 'desktop' | 'tablet' {
    if (typeof window === 'undefined') return 'desktop';

    const ua = navigator.userAgent;

    // Tablet detection
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }

    // Mobile detection
    if (
        /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        return 'mobile';
    }

    return 'desktop';
}

/**
 * Hook para obtener solo competidor
 */
export function useCompetitorDetection() {
    const { visitedCompetitor, competitorName } = useVisitorTracking();
    return { visitedCompetitor, competitorName };
}

/**
 * Hook para obtener solo engagement metrics
 */
export function useEngagementMetrics() {
    const { timeOnSite, pageViews, scrollDepth, interactionCount } = useVisitorTracking();
    return { timeOnSite, pageViews, scrollDepth, interactionCount };
}
