import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | Laboratorio Del Bienestar',
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/blog',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
