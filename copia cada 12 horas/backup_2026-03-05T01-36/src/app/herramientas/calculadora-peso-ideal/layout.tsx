import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🎯 Calculadora de Peso Ideal | Laboratorio Bienestar',
    description: 'kilogramos',
    openGraph: {
        title: '🎯 Calculadora de Peso Ideal',
        description: 'kilogramos',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
