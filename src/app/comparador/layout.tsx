import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Comparador de Estudios | Laboratorio Del Bienestar',
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/comparador',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
