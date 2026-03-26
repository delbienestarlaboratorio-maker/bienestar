import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🔥 Cuestionario de Riesgo de Úlcera y Gastritis | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🔥 Cuestionario de Riesgo de Úlcera y Gastritis. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🔥 Cuestionario de Riesgo de Úlcera y Gastritis',
        description: 'Calculadora e información médica sobre 🔥 Cuestionario de Riesgo de Úlcera y Gastritis. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/riesgo-ulcera-gastritis',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
