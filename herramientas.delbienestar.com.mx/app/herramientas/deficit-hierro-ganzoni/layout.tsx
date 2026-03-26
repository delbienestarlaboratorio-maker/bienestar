import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🩸 Fórmula de Ganzoni | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🩸 Fórmula de Ganzoni. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🩸 Fórmula de Ganzoni',
        description: 'Calculadora e información médica sobre 🩸 Fórmula de Ganzoni. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/deficit-hierro-ganzoni',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
