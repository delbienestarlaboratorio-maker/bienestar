import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🥗 Índice Glucémico (IG) | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🥗 Índice Glucémico (IG). Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🥗 Índice Glucémico (IG)',
        description: 'Calculadora e información médica sobre 🥗 Índice Glucémico (IG). Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
