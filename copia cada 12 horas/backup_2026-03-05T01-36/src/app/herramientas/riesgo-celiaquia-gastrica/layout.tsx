import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🌾 Riesgo de Enfermedad Celíaca | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🌾 Riesgo de Enfermedad Celíaca. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🌾 Riesgo de Enfermedad Celíaca',
        description: 'Calculadora e información médica sobre 🌾 Riesgo de Enfermedad Celíaca. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
