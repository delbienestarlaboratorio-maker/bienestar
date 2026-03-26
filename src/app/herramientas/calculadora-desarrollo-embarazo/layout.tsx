import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🍉 Escáner Fetal Mágico | Laboratorio Bienestar',
    description: '¿De qué tamaño exacto de fruta es tu bebé esta semana?',
    openGraph: {
        title: '🍉 Escáner Fetal Mágico',
        description: '¿De qué tamaño exacto de fruta es tu bebé esta semana?',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/calculadora-desarrollo-embarazo',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
