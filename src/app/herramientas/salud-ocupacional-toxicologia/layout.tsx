import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🏭 Índice de Riesgo y Toxicología Laboral | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🏭 Índice de Riesgo y Toxicología Laboral. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🏭 Índice de Riesgo y Toxicología Laboral',
        description: 'Calculadora e información médica sobre 🏭 Índice de Riesgo y Toxicología Laboral. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/salud-ocupacional-toxicologia',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
