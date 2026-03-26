import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '👶 Predicción del Sexo del Bebé | Laboratorio Bienestar',
    description: 'Descubre qué será tu bebé respondiendo este test rápido',
    openGraph: {
        title: '👶 Predicción del Sexo del Bebé',
        description: 'Descubre qué será tu bebé respondiendo este test rápido',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/prediccion-sexo-bebe',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
