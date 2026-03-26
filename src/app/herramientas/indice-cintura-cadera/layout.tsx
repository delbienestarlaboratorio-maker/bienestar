import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '📏 Índice Cintura-Cadera | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 📏 Índice Cintura-Cadera. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '📏 Índice Cintura-Cadera',
        description: 'Calculadora e información médica sobre 📏 Índice Cintura-Cadera. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/herramientas/indice-cintura-cadera',
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
