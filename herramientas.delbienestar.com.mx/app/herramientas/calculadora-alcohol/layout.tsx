import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🍻 Alcoholímetro Virtual | Laboratorio Bienestar',
    description: 'Calculadora predictiva de Intoxicación y Cruda (Resaca)',
    openGraph: {
        title: '🍻 Alcoholímetro Virtual',
        description: 'Calculadora predictiva de Intoxicación y Cruda (Resaca)',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/calculadora-alcohol',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
