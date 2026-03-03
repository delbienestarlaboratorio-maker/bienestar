import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '👶 Percentil de Crecimiento Infantil | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 👶 Percentil de Crecimiento Infantil. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '👶 Percentil de Crecimiento Infantil',
        description: 'Calculadora e información médica sobre 👶 Percentil de Crecimiento Infantil. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
