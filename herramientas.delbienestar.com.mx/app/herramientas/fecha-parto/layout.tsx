import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🤰 Fecha Probable de Parto | Laboratorio Bienestar',
    description: '{resultado.trimestre}',
    openGraph: {
        title: '🤰 Fecha Probable de Parto',
        description: '{resultado.trimestre}',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/fecha-parto',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
