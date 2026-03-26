import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '💩 Escala de Heces (Test de Bristol) | Laboratorio Bienestar',
    description: 'Dime cómo vas al baño y te diré cómo está tu colón',
    openGraph: {
        title: '💩 Escala de Heces (Test de Bristol)',
        description: 'Dime cómo vas al baño y te diré cómo está tu colón',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/identificador-heces-bristol',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
