import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🩸 Calculadora de Colesterol LDL | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🩸 Calculadora de Colesterol LDL. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🩸 Calculadora de Colesterol LDL',
        description: 'Calculadora e información médica sobre 🩸 Calculadora de Colesterol LDL. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/calculadora-colesterol-ldl',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
