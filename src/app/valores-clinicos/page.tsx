import React from 'react';
import { BiomarkerClientList } from './components/BiomarkerClientList';
import { loadJsonData } from '@/lib/build-time-data';
import { Metadata } from 'next';
import { Beaker } from 'lucide-react';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
    title: 'test metadata',
    description: 'test',
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/valores-clinicos',
    },
};

export default async function ValoresHub() {
    const rawBiomarkers = loadJsonData<any[]>('biomarkers.json');
    const biomarkers = Array.isArray(rawBiomarkers) ? [...rawBiomarkers].sort((a: any, b: any) => a.name?.localeCompare?.(b.name || '', 'es', { sensitivity: 'base' })) : [];
    const panelCount = new Set(biomarkers.map((b: any) => b.panel)).size;

    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-teal-100 rounded-full mb-6">
                        <Beaker className="w-8 h-8 text-teal-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Valores de Referencia <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">A-Z</span>
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed mb-8">
                        Directorio de más de <strong className="text-teal-700">{biomarkers.length}</strong> parámetros en <strong className="text-teal-700">{panelCount}</strong> paneles clínicos. Revisa los rangos normales para entender tus resultados.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/valores-clinicos/analizador" className="group flex items-center justify-center gap-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all">
                            <span className="text-xl">✨ Analizar Mis Resultados con IA</span>
                        </a>
                    </div>
                </div>

                <BiomarkerClientList biomarkers={biomarkers} />

                <RelatedTools currentPath="/valores-clinicos" className="mb-8" />
            </div>
        </main>
    );
}
