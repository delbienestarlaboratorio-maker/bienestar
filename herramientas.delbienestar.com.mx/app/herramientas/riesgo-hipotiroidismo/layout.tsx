import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🦋 Riesgo de Hipotiroidismo | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🦋 Riesgo de Hipotiroidismo. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🦋 Riesgo de Hipotiroidismo',
        description: 'Calculadora e información médica sobre 🦋 Riesgo de Hipotiroidismo. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/riesgo-hipotiroidismo',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
