import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🫀 Riesgo Cardiovascular | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🫀 Riesgo Cardiovascular. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🫀 Riesgo Cardiovascular',
        description: 'Calculadora e información médica sobre 🫀 Riesgo Cardiovascular. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/riesgo-cardiovascular',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
