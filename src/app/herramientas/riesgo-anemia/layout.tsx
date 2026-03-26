import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🩸 Evaluación de Riesgo de Anemia | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🩸 Evaluación de Riesgo de Anemia. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🩸 Evaluación de Riesgo de Anemia',
        description: 'Calculadora e información médica sobre 🩸 Evaluación de Riesgo de Anemia. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/riesgo-anemia',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
