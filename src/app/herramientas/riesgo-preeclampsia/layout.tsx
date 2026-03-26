import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🤰 Riesgo de Preeclampsia | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🤰 Riesgo de Preeclampsia. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🤰 Riesgo de Preeclampsia',
        description: 'Calculadora e información médica sobre 🤰 Riesgo de Preeclampsia. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/riesgo-preeclampsia',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
