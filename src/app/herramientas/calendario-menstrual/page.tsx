import { Metadata } from 'next';
import { CalendarClient } from './CalendarClient';

export const metadata: Metadata = {
    title: 'Calendario Menstrual Avanzado | Calculadora de Fertilidad | Laboratorio Bienestar',
    description: 'Calcula tus días fértiles, fecha de ovulación y próximo periodo menstrual. Herramienta ginecológica gratuita y predictiva.',
};

export default function MenstrualCalendarPage() {
    return <CalendarClient />;
}
