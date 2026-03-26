import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🧠 Test de Depresión PHQ-9 | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🧠 Test de Depresión PHQ-9. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🧠 Test de Depresión PHQ-9',
        description: 'Calculadora e información médica sobre 🧠 Test de Depresión PHQ-9. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/test-depresion-phq9',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
