import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '😰 Test de Ansiedad GAD-7 | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 😰 Test de Ansiedad GAD-7. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '😰 Test de Ansiedad GAD-7',
        description: 'Calculadora e información médica sobre 😰 Test de Ansiedad GAD-7. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/test-ansiedad-gad7',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
