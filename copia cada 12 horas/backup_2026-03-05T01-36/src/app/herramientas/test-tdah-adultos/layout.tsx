import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🌪️ Evaluador Visual de TDAH | Laboratorio Bienestar',
    description: 'Descubre si tu cerebro procesa la atención de manera atípica',
    openGraph: {
        title: '🌪️ Evaluador Visual de TDAH',
        description: 'Descubre si tu cerebro procesa la atención de manera atípica',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
