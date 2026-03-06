import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🔄 Convertidor HbA1c ↔ Glucosa | Laboratorio Bienestar',
    description: '{c.label}',
    openGraph: {
        title: '🔄 Convertidor HbA1c ↔ Glucosa',
        description: '{c.label}',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
