import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🧠 Test de Edad Mental Exacta | Laboratorio Bienestar',
    description: '¿Tu cerebro es más viejo o más joven que tu edad física?',
    openGraph: {
        title: '🧠 Test de Edad Mental Exacta',
        description: '¿Tu cerebro es más viejo o más joven que tu edad física?',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
