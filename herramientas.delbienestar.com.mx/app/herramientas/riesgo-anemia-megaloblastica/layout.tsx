import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🩸 Evaluador Vitamina B12 | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🩸 Evaluador Vitamina B12. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🩸 Evaluador Vitamina B12',
        description: 'Calculadora e información médica sobre 🩸 Evaluador Vitamina B12. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/riesgo-anemia-megaloblastica',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
