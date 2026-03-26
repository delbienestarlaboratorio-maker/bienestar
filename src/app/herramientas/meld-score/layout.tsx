import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '📊 MELD Score | Laboratorio Bienestar',
    description: '{c.label}',
    openGraph: {
        title: '📊 MELD Score',
        description: '{c.label}',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/meld-score',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
