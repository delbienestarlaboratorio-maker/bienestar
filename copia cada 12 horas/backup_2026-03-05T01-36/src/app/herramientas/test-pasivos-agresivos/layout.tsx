import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '💬 Evaluador de Comunicación Pasivo-Agresiva | Laboratorio Bienestar',
    description: 'Descubre si castigas con el silencio o indirectas crueles',
    openGraph: {
        title: '💬 Evaluador de Comunicación Pasivo-Agresiva',
        description: 'Descubre si castigas con el silencio o indirectas crueles',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
