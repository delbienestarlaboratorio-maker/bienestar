import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '💼 Test de Burnout (Síndrome del Quemado) | Laboratorio Bienestar',
    description: 'Descubre si tu trabajo está acabando con tu cuerpo y mente',
    openGraph: {
        title: '💼 Test de Burnout (Síndrome del Quemado)',
        description: 'Descubre si tu trabajo está acabando con tu cuerpo y mente',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
