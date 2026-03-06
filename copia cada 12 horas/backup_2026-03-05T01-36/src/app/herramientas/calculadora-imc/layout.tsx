import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '⚖️ Calculadora de IMC | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre ⚖️ Calculadora de IMC. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '⚖️ Calculadora de IMC',
        description: 'Calculadora e información médica sobre ⚖️ Calculadora de IMC. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
