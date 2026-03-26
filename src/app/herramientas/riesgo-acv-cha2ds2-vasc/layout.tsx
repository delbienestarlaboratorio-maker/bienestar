import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🫀 Score CHA₂DS₂-VASc | Laboratorio Bienestar',
    description: '{trs.r}',
    openGraph: {
        title: '🫀 Score CHA₂DS₂-VASc',
        description: '{trs.r}',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/riesgo-acv-cha2ds2-vasc',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
