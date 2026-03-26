import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🩺 Test de Riesgo de Diabetes | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🩺 Test de Riesgo de Diabetes. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🩺 Test de Riesgo de Diabetes',
        description: 'Calculadora e información médica sobre 🩺 Test de Riesgo de Diabetes. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/riesgo-diabetes',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
