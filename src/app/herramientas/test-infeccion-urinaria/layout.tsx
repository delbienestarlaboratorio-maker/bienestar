import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🦠 Test de Infección Urinaria | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🦠 Test de Infección Urinaria. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🦠 Test de Infección Urinaria',
        description: 'Calculadora e información médica sobre 🦠 Test de Infección Urinaria. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
