import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Calculadora | Laboratorio Del Bienestar',
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/calculadora',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
