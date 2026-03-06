import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '✨ Cuestionario: Personas Altamente Sensibles (PAS) | Laboratorio Bienestar',
    description: '¿Sientes el mundo con más intensidad que los demás?',
    openGraph: {
        title: '✨ Cuestionario: Personas Altamente Sensibles (PAS)',
        description: '¿Sientes el mundo con más intensidad que los demás?',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
