import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🫀 Score CHA₂DS₂-VASc | Laboratorio Bienestar',
    description: '{trs.r}',
    openGraph: {
        title: '🫀 Score CHA₂DS₂-VASc',
        description: '{trs.r}',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
