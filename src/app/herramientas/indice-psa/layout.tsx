import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🚹 Índice PSA Libre/Total | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🚹 Índice PSA Libre/Total. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🚹 Índice PSA Libre/Total',
        description: 'Calculadora e información médica sobre 🚹 Índice PSA Libre/Total. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
