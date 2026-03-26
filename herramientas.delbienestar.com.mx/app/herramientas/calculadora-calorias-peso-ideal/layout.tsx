import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '⚖️ Calculadora: Tu Cuerpo de Verano | Laboratorio Bienestar',
    description: 'Meta de déficit calórico y tiempo exacto para tu objetivo',
    openGraph: {
        title: '⚖️ Calculadora: Tu Cuerpo de Verano',
        description: 'Meta de déficit calórico y tiempo exacto para tu objetivo',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/calculadora-calorias-peso-ideal',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
