import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🫁 Índice FIB-4 | Laboratorio Bienestar',
    description: '{c.label}',
    openGraph: {
        title: '🫁 Índice FIB-4',
        description: '{c.label}',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
