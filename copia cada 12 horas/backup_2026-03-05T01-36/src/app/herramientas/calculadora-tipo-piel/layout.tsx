import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🧴 Creador de Rutina de Skincare | Laboratorio Bienestar',
    description: 'Identifica los ingredientes que tu rostro grita por tener',
    openGraph: {
        title: '🧴 Creador de Rutina de Skincare',
        description: 'Identifica los ingredientes que tu rostro grita por tener',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
