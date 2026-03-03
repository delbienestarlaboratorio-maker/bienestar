import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🥗 Score MUST | Laboratorio Bienestar',
    description: '{resultado.weightLossRaw}%',
    openGraph: {
        title: '🥗 Score MUST',
        description: '{resultado.weightLossRaw}%',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
