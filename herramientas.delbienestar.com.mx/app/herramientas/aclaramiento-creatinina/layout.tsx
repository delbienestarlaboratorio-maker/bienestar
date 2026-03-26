import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🧪 Aclaramiento de Creatinina | Laboratorio Bienestar',
    description: 'mL / minuto',
    openGraph: {
        title: '🧪 Aclaramiento de Creatinina',
        description: 'mL / minuto',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/aclaramiento-creatinina',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
