import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🦠 Riesgo de Infección Sexual (ETS) | Laboratorio Bienestar',
    description: '{score >= 2 ? "⚠️ ALTO RIESGO DE EXPOSICIÓN" : score === 1 ? "⚠️ RIESGO MODERADO" : "✅ Riesgo Bajo"}',
    openGraph: {
        title: '🦠 Riesgo de Infección Sexual (ETS)',
        description: '{score >= 2 ? "⚠️ ALTO RIESGO DE EXPOSICIÓN" : score === 1 ? "⚠️ RIESGO MODERADO" : "✅ Riesgo Bajo"}',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/riesgo-ets',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
