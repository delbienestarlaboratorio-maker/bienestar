import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🛡️ Cuestionario de Sospecha Autoinmune | Laboratorio Bienestar',
    description: 'Calculadora e información médica sobre 🛡️ Cuestionario de Sospecha Autoinmune. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
    openGraph: {
        title: '🛡️ Cuestionario de Sospecha Autoinmune',
        description: 'Calculadora e información médica sobre 🛡️ Cuestionario de Sospecha Autoinmune. Cotiza tus estudios de laboratorio hoy mismo en Pachuca, Tulancingo y CDMX.',
        type: 'website',
    }
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
