'use client';

import { useEffect } from 'react';
import { visitorIntelligence } from '@/lib/tracking/visitor-intelligence';

interface StudyTrackerProps {
    slug: string;
    name: string;
    price: number;
}

/**
 * Componente invisible que registra silenciosamente la visita a un estudio.
 * Se monta en la página de detalle del estudio.
 */
export default function StudyTracker({ slug, name, price }: StudyTrackerProps) {
    useEffect(() => {
        if (!visitorIntelligence) return;

        // Inicializar y registrar vista
        visitorIntelligence.initialize();
        visitorIntelligence.trackStudyView(slug, name, price);

        // Al salir de la página, registrar tiempo y scroll
        return () => {
            visitorIntelligence.finalizeStudyView(slug);
        };
    }, [slug, name, price]);

    // Componente invisible — no renderiza nada
    return null;
}
