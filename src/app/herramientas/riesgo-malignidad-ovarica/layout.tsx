import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🩸 Algoritmo ROMA | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🩸 Algoritmo ROMA. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🩸 Algoritmo ROMA',
        description: 'Calculadora e información médica sobre 🩸 Algoritmo ROMA. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/riesgo-malignidad-ovarica',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
