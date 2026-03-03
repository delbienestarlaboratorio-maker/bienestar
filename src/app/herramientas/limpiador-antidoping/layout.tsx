import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '⏱️ Rastreador Toxico-Cinético | Laboratorio Bienestar',
    description: '¿Cuántos días tarda tu cuerpo en limpiar rastros en la orina?',
    openGraph: {
        title: '⏱️ Rastreador Toxico-Cinético',
        description: '¿Cuántos días tarda tu cuerpo en limpiar rastros en la orina?',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
