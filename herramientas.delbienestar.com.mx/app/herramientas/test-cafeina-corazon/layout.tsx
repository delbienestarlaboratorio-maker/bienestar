import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '☕ Rastreador de Toxicidad de Cafeína | Laboratorio Bienestar',
    description: '¿Es ataque de pánico o tomaste demasiado café/energizante?',
    openGraph: {
        title: '☕ Rastreador de Toxicidad de Cafeína',
        description: '¿Es ataque de pánico o tomaste demasiado café/energizante?',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/test-cafeina-corazon',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
