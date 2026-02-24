'use client';

import { useEffect, useState, useCallback } from 'react';
import { visitorIntelligence, type VisitorProfile } from '@/lib/tracking/visitor-intelligence';

/**
 * Hook principal de inteligencia del visitante.
 * Inicializa el tracking y expone el perfil y acciones.
 */
export function useVisitorIntelligence() {
    const [profile, setProfile] = useState<VisitorProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!visitorIntelligence) return;
        const p = visitorIntelligence.initialize();
        setProfile(p);
        setIsReady(true);
    }, []);

    const trackStudyView = useCallback((slug: string, name: string, price: number) => {
        visitorIntelligence?.trackStudyView(slug, name, price);
    }, []);

    const trackSearch = useCallback((term: string) => {
        visitorIntelligence?.trackSearch(term);
    }, []);

    const trackCartAdd = useCallback((slug: string) => {
        visitorIntelligence?.trackCartAdd(slug);
    }, []);

    const trackConversion = useCallback((slugs: string[], revenue: number) => {
        visitorIntelligence?.trackConversion(slugs, revenue);
    }, []);

    const isFromCompetitor = visitorIntelligence?.isFromCompetitor() ?? { result: false };
    const isReturning = visitorIntelligence?.isReturning() ?? false;
    const timeOnSite = visitorIntelligence?.getTotalTimeOnSite() ?? 0;

    return {
        profile,
        isReady,
        isFromCompetitor,
        isReturning,
        timeOnSite,
        trackStudyView,
        trackSearch,
        trackCartAdd,
        trackConversion,
    };
}

/**
 * Hook simplificado solo para detección de competidores.
 * Útil en componentes que solo necesitan saber si viene del Chopo.
 */
export function useCompetitorDetection() {
    const [detected, setDetected] = useState<{ result: boolean; name?: string }>({ result: false });

    useEffect(() => {
        if (!visitorIntelligence) return;
        visitorIntelligence.initialize();
        setDetected(visitorIntelligence.isFromCompetitor());

        // También escuchar evento en tiempo real
        const handler = (e: Event) => {
            const ce = e as CustomEvent;
            setDetected({ result: true, name: ce.detail.competitor });
        };
        window.addEventListener('bienestar:competitor_visit', handler);
        return () => window.removeEventListener('bienestar:competitor_visit', handler);
    }, []);

    return detected;
}
