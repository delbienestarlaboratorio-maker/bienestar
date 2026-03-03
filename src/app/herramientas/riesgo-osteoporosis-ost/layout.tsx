import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🦴 Riesgo de Osteoporosis (OST) | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🦴 Riesgo de Osteoporosis (OST). Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🦴 Riesgo de Osteoporosis (OST)',
        description: 'Calculadora e información médica sobre 🦴 Riesgo de Osteoporosis (OST). Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
