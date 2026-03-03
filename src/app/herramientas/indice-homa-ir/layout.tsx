import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🔥 Índice HOMA-IR | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🔥 Índice HOMA-IR. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🔥 Índice HOMA-IR',
        description: 'Calculadora e información médica sobre 🔥 Índice HOMA-IR. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
