import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🍼 Escala de Deshidratación Pediátrica | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🍼 Escala de Deshidratación Pediátrica. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🍼 Escala de Deshidratación Pediátrica',
        description: 'Calculadora e información médica sobre 🍼 Escala de Deshidratación Pediátrica. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/escala-deshidratacion-pediatrica',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
