import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🍽️ Calculadora de Calorías Diarias | Laboratorio Bienestar',
    description: 'calorías/día',
    openGraph: {
        title: '🍽️ Calculadora de Calorías Diarias',
        description: 'calorías/día',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
