import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '💇‍♀️ Evaluador de Caída de Cabello | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 💇‍♀️ Evaluador de Caída de Cabello. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '💇‍♀️ Evaluador de Caída de Cabello',
        description: 'Calculadora e información médica sobre 💇‍♀️ Evaluador de Caída de Cabello. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/evaluador-alopecia',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
