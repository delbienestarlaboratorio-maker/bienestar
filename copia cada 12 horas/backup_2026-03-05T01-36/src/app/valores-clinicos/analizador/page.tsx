import React from 'react';
import { Metadata } from 'next';
import { AnalyzerClient } from './components/AnalyzerClient';
import rawBiomarkers from '@/data/biomarkers.json';
import { Activity, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Analizador Inteligente de Resultados de Laboratorio | AI Médica',
    description: 'Ingresa los números de tus estudios de laboratorio y nuestra IA los analizará gratuitamente para darte una interpretación médica simple, rápida y confiable.',
};

export default function AnalyzerPage() {
    const biomarkers = Array.isArray(rawBiomarkers) ? [...rawBiomarkers].sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })) : [];

    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-20">
            {/* Header Hero */}
            <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 text-white relative overflow-hidden mb-12 py-16">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 mb-6 text-sm font-semibold tracking-wide">
                        <Sparkles className="w-4 h-4 text-emerald-300" />
                        <span className="text-teal-100">BETA: Procesamiento de IA Local Seguro</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        Interpreta tus Análisis con <span className="text-emerald-400">Inteligencia Artificial</span>
                    </h1>
                    <p className="text-xl text-teal-100 max-w-3xl mx-auto font-light leading-relaxed">
                        Selecciona los biomarcadores (glucosa, colesterol, etc.), ingresa el valor que te salió en tu hoja impresa, y nuestra IA clínica generará un reporte gratuito fácil de entender.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnalyzerClient availableBiomarkers={biomarkers} />
            </div>

            {/* Trust Badges */}
            <div className="max-w-5xl mx-auto px-4 mt-16 pt-12 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                        <ShieldCheck className="w-10 h-10 text-teal-600 mb-3" />
                        <h4 className="font-bold text-gray-800 mb-1">100% Privado</h4>
                        <p className="text-sm">Tus datos médicos se procesan de forma local y nunca se comparten.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Activity className="w-10 h-10 text-teal-600 mb-3" />
                        <h4 className="font-bold text-gray-800 mb-1">Respaldado Médicamente</h4>
                        <p className="text-sm">IA entrenada con normativas clínicas y rangos poblacionales exactos.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Sparkles className="w-10 h-10 text-teal-600 mb-3" />
                        <h4 className="font-bold text-gray-800 mb-1">Análisis Multi-Variable</h4>
                        <p className="text-sm">Nuestra IA entiende cómo un valor altera al otro (ej. Triglicéridos y Glucosa).</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
