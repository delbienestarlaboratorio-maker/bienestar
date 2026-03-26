import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🩸 Índice Aterogénico | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🩸 Índice Aterogénico. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🩸 Índice Aterogénico',
        description: 'Calculadora e información médica sobre 🩸 Índice Aterogénico. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/indice-aterogenico',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
