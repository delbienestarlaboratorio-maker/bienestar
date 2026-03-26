import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🎯 Calculadora de Peso Ideal | Laboratorio Bienestar',
    description: 'kilogramos',
    openGraph: {
        title: '🎯 Calculadora de Peso Ideal',
        description: 'kilogramos',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/calculadora-peso-ideal',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
