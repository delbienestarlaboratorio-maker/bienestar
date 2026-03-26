import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '💧 Calculadora de Agua Diaria | Laboratorio Bienestar',
    description: '≈ {resultado.vasos} vasos de 250ml al día',
    openGraph: {
        title: '💧 Calculadora de Agua Diaria',
        description: '≈ {resultado.vasos} vasos de 250ml al día',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/calculadora-agua',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
