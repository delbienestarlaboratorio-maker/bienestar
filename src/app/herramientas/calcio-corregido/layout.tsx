import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🦴 Calcio Corregido | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🦴 Calcio Corregido. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🦴 Calcio Corregido',
        description: 'Calculadora e información médica sobre 🦴 Calcio Corregido. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/calcio-corregido',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
