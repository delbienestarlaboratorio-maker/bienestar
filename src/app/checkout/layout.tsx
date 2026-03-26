import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Checkout | Laboratorio Del Bienestar',
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/checkout',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
