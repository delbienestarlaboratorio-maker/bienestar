import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sueroterapia IV | Laboratorio Del Bienestar',
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/sueroterapia',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
