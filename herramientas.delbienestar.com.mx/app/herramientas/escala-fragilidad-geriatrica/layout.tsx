import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '👴👵 Escala de Fragilidad (FRAIL) | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 👴👵 Escala de Fragilidad (FRAIL). Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '👴👵 Escala de Fragilidad (FRAIL)',
        description: 'Calculadora e información médica sobre 👴👵 Escala de Fragilidad (FRAIL). Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/escala-fragilidad-geriatrica',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
