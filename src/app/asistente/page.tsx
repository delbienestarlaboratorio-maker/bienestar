import { Metadata } from 'next';
import { SymptomSearchPage } from '@/components/search/SymptomSearchPage';

export const metadata: Metadata = {
    title: '¿Qué Estudio Necesito? - Buscador por Síntomas | Laboratorio Bienestar',
    description: 'Describe tus síntomas y encuentra qué estudios de laboratorio necesitas. Sistema inteligente de recomendación basado en tus molestias.',
    keywords: 'síntomas, dolor, cansancio, fiebre, laboratorio, estudios clínicos, análisis, diagnóstico',
    openGraph: {
        title: '¿Qué Estudio Necesito? - Buscador por Síntomas',
        description: 'Encuentra qué estudios de laboratorio necesitas basándote en tus síntomas',
        type: 'website'
    }
};

export default function AsistentePage() {
    return <SymptomSearchPage />;
}
