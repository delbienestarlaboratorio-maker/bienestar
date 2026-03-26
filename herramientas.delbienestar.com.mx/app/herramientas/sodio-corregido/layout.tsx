import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🧂 Sodio Corregido | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🧂 Sodio Corregido. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🧂 Sodio Corregido',
        description: 'Calculadora e información médica sobre 🧂 Sodio Corregido. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/sodio-corregido',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
