import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🥗 Creador de Ventana de Ayuno | Laboratorio Bienestar',
    description: 'Descubre a qué hora tu cuerpo entra en cetosis pura',
    openGraph: {
        title: '🥗 Creador de Ventana de Ayuno',
        description: 'Descubre a qué hora tu cuerpo entra en cetosis pura',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
