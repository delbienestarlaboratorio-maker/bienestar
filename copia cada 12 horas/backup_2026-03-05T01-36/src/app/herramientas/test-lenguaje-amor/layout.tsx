import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '❤️ Las 5 Formas de Amar | Laboratorio Bienestar',
    description: 'Descubre qué idioma del amor exiges y ofreces',
    openGraph: {
        title: '❤️ Las 5 Formas de Amar',
        description: 'Descubre qué idioma del amor exiges y ofreces',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
