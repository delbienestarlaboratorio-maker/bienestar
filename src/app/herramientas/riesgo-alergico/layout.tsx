import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🤧 Riesgo Alérgico Global | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🤧 Riesgo Alérgico Global. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🤧 Riesgo Alérgico Global',
        description: 'Calculadora e información médica sobre 🤧 Riesgo Alérgico Global. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
