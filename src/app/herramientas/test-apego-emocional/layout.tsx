import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🔗 Identificador de Tipo de Apego | Laboratorio Bienestar',
    description: 'Descubre por qué saboteas tus relaciones, o por qué atraes narcisistas',
    openGraph: {
        title: '🔗 Identificador de Tipo de Apego',
        description: 'Descubre por qué saboteas tus relaciones, o por qué atraes narcisistas',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/test-apego-emocional',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
