import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🥗 Índice de Riesgo Nutricional (NRI) | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🥗 Índice de Riesgo Nutricional (NRI). Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🥗 Índice de Riesgo Nutricional (NRI)',
        description: 'Calculadora e información médica sobre 🥗 Índice de Riesgo Nutricional (NRI). Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/riesgo-nutricional-nri',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
