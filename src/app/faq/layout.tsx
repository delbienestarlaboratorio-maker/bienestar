import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Preguntas Frecuentes | Laboratorio Del Bienestar',
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/faq',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
