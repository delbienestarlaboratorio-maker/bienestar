import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🪞 Test de Espectro Narcisista | Laboratorio Bienestar',
    description: 'Autoevaluación de personalidad, ego y empatía',
    openGraph: {
        title: '🪞 Test de Espectro Narcisista',
        description: 'Autoevaluación de personalidad, ego y empatía',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/test-narcisismo',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
