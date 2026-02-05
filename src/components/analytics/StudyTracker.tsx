'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';
import type { Study } from '@/data/studies';

interface StudyTrackerProps {
    study: Study;
    categoryName: string;
}

export function StudyTracker({ study, categoryName }: StudyTrackerProps) {
    useEffect(() => {
        // Track study view
        const price = study.price.promotional || study.price.regular;
        analytics.viewStudy(study.name, categoryName, price);
    }, [study, categoryName]);

    const handleAppointmentClick = () => {
        const price = study.price.promotional || study.price.regular;
        analytics.initiateAppointment(study.name, price);

        // Open WhatsApp (example)
        const message = encodeURIComponent(`Hola, me interesa agendar ${study.name}`);
        window.open(`https://wa.me/527716854026?text=${message}`, '_blank');
    };

    return (
        <button
            onClick={handleAppointmentClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1"
        >
            Agendar Cita Ahora
        </button>
    );
}
