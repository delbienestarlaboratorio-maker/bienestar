import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '👁️ Test Online de Agudeza y Daltonismo | Laboratorio Bienestar',
    description: 'Averigua si tus ojos te engañan',
    openGraph: {
        title: '👁️ Test Online de Agudeza y Daltonismo',
        description: 'Averigua si tus ojos te engañan',
        type: 'website',
    },
  alternates: {
    canonical: 'https://herramientas.delbienestar.com.mx/herramientas/test-daltonismo-astigmatismo',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
