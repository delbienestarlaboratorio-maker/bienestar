import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '📏 Prógnosis de Crecimiento Infantil | Laboratorio Bienestar',
    description: 'Descubre la talla diana de tu pequeñ@ basándote en su herencia',
    openGraph: {
        title: '📏 Prógnosis de Crecimiento Infantil',
        description: 'Descubre la talla diana de tu pequeñ@ basándote en su herencia',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
