import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Carrito de Compras | Laboratorio Del Bienestar',
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/carrito',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
