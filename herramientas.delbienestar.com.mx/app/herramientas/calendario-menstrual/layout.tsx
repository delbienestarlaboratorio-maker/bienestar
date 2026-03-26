import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Calendario Menstrual | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre Calendario Menstrual. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: 'Calendario Menstrual',
        description: 'Calculadora e información médica sobre Calendario Menstrual. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/calendario-menstrual',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
