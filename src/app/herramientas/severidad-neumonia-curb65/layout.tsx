import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🫁 Score CURB-65 | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🫁 Score CURB-65. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🫁 Score CURB-65',
        description: 'Calculadora e información médica sobre 🫁 Score CURB-65. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/severidad-neumonia-curb65',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
