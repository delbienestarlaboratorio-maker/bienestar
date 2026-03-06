import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🦴 Calculadora DAS28-PCR | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🦴 Calculadora DAS28-PCR. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🦴 Calculadora DAS28-PCR',
        description: 'Calculadora e información médica sobre 🦴 Calculadora DAS28-PCR. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
