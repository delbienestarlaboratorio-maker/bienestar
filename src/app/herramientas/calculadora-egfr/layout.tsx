import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🫘 Filtración Glomerular (eGFR) | Laboratorio Bienestar',
    description: '{c.label}',
    openGraph: {
        title: '🫘 Filtración Glomerular (eGFR)',
        description: '{c.label}',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/calculadora-egfr',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
