import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '💧 Score IPSS Próstata | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 💧 Score IPSS Próstata. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '💧 Score IPSS Próstata',
        description: 'Calculadora e información médica sobre 💧 Score IPSS Próstata. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/score-ipss-prostata',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
