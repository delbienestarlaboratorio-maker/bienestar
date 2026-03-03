import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🔥 Calculadora de Metabolismo Basal | Laboratorio Bienestar',
    description: 'calorías/día',
    openGraph: {
        title: '🔥 Calculadora de Metabolismo Basal',
        description: 'calorías/día',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
