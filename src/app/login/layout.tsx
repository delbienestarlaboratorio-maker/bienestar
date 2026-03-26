import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Iniciar Sesión | Laboratorio Del Bienestar',
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/login',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
