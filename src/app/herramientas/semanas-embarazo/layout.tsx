import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '📅 Semanas de Embarazo | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 📅 Semanas de Embarazo. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '📅 Semanas de Embarazo',
        description: 'Calculadora e información médica sobre 📅 Semanas de Embarazo. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
