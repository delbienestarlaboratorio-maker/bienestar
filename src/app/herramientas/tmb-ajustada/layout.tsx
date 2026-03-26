import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🔥 TMB Ajustada (Mifflin-St Jeor) | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🔥 TMB Ajustada (Mifflin-St Jeor). Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🔥 TMB Ajustada (Mifflin-St Jeor)',
        description: 'Calculadora e información médica sobre 🔥 TMB Ajustada (Mifflin-St Jeor). Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/tmb-ajustada',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
