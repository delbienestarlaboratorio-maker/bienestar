import { Metadata } from 'next';
import { CalendarClient } from './CalendarClient';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
    title: 'Calendario Menstrual Avanzado | Calculadora de Fertilidad | Laboratorio Bienestar',
    description: 'Calcula tus días fértiles, fecha de ovulación y próximo periodo menstrual. Herramienta ginecológica gratuita y predictiva.',
};

export default function MenstrualCalendarPage() {
    return (
        <>
            <CalendarClient />
            <div className="max-w-3xl mx-auto px-4 pb-8">
                <RelatedTools currentPath="/herramientas/calendario-menstrual" className="mb-8" />
            </div>
        </>
    );
}
