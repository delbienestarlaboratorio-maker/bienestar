import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🌸 Criterios SOP | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🌸 Criterios SOP. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🌸 Criterios SOP',
        description: 'Calculadora e información médica sobre 🌸 Criterios SOP. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/evaluador-sop',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
