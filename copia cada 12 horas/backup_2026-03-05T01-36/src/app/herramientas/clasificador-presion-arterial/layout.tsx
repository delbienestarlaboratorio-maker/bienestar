import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '💓 Clasificador de Presión Arterial | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 💓 Clasificador de Presión Arterial. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '💓 Clasificador de Presión Arterial',
        description: 'Calculadora e información médica sobre 💓 Clasificador de Presión Arterial. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
