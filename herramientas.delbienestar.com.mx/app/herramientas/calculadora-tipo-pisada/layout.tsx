import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🦵 Test Rápido de Daño Articular (Rodillas) | Laboratorio Bienestar',
    description: 'Saber si tu desgaste es normal, o inminente artritis/lesión',
    openGraph: {
        title: '🦵 Test Rápido de Daño Articular (Rodillas)',
        description: 'Saber si tu desgaste es normal, o inminente artritis/lesión',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/calculadora-tipo-pisada',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
