'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function CalculadoraDAS28Page() {
    const [dolorosas, setDolorosas] = useState('');
    const [inflamadas, setInflamadas] = useState('');
    const [pcr, setPcr] = useState('');
    const [gh, setGh] = useState('50'); // Global Health 0-100

    const [resultado, setResultado] = useState<number | null>(null);

    const calcular = () => {
        const t28 = parseFloat(dolorosas);
        const sw28 = parseFloat(inflamadas);
        const crp = parseFloat(pcr);
        const g = parseFloat(gh);

        if (t28 >= 0 && sw28 >= 0 && crp > 0 && g >= 0) {
            // DAS28-PCR formula
            const das28 = (0.56 * Math.sqrt(t28)) + (0.28 * Math.sqrt(sw28)) + (0.36 * Math.log(crp + 1)) + (0.014 * g) + 0.96;
            setResultado(parseFloat(das28.toFixed(2)));
        }
    };

    const getCategoria = (score: number) => {
        if (score <= 2.6) return { label: 'Remisión', color: 'text-green-600', bg: 'bg-green-100' };
        if (score <= 3.2) return { label: 'Baja Actividad', color: 'text-yellow-600', bg: 'bg-yellow-100' };
        if (score <= 5.1) return { label: 'Moderada Actividad', color: 'text-orange-600', bg: 'bg-orange-100' };
        return { label: 'Alta Actividad', color: 'text-red-600', bg: 'bg-red-100' };
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-red-800 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🦴 Calculadora DAS28-PCR</h1>
                    <p className="text-red-100 mt-2">Medición de Actividad de la Artritis Reumatoide (Disease Activity Score)</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Articulaciones Dolorosas (0-28)</label>
                            <input type="number" min="0" max="28" value={dolorosas} onChange={(e) => setDolorosas(e.target.value)} placeholder="Ej: 4"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Articulaciones Inflamadas (0-28)</label>
                            <input type="number" min="0" max="28" value={inflamadas} onChange={(e) => setInflamadas(e.target.value)} placeholder="Ej: 2"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Proteína C Reactiva (mg/L)</label>
                            <input type="number" step="0.1" value={pcr} onChange={(e) => setPcr(e.target.value)} placeholder="Ej: 15"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Salud Global del Paciente (0-100)</label>
                            <div className="flex items-center gap-4">
                                <input type="range" min="0" max="100" value={gh} onChange={(e) => setGh(e.target.value)} className="w-full" />
                                <span className="font-bold w-12 text-center bg-gray-100 rounded-lg py-1">{gh}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">0 = Excelente, 100 = Peor posible</p>
                        </div>
                    </div>

                    <button onClick={calcular}
                        className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                        Calcular Score DAS28
                    </button>

                    {resultado !== null && (() => {
                        const cat = getCategoria(resultado);
                        return (
                            <div className="mt-8 animate-in fade-in">
                                <div className={`${cat.bg} rounded-2xl p-6 text-center mb-6`}>
                                    <p className="text-sm text-gray-600 mb-1">Score DAS28-PCR</p>
                                    <p className={`text-6xl font-black ${cat.color}`}>{resultado}</p>
                                    <p className={`text-xl font-bold ${cat.color} mt-2`}>{cat.label}</p>
                                </div>

                                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                                    <h3 className="font-bold text-red-900 text-lg mb-3">🔬 Estudios Reumatológicos Recomendados</h3>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Proteína C Reactiva (PCR)', reason: 'Para el cálculo exacto del DAS28' },
                                            { name: 'Factor Reumatoide', reason: 'Marcador clásico para el diagnóstico y pronóstico' },
                                            { name: 'Velocidad de Sedimentación Globular (VSG)', reason: 'Alternativa a la PCR para medir inflamación sistémica' }
                                        ].map((study) => (
                                            <div key={study.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
                                                <span className="text-red-600 mt-1">✓</span>
                                                <div>
                                                    <p className="font-semibold text-gray-800 text-sm">{study.name}</p>
                                                    <p className="text-gray-500 text-xs">{study.reason}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/estudios/analisis-clinicos"
                                        className="mt-4 inline-block bg-red-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-red-800 transition-colors">
                                        Solicitar Estudios Ahora →
                                    </Link>
                                </div>
                            </div>
                        );
                    })()}
                </div>
                
                <StudyCTA 
                    title={`Controla el dolor articular`} 
                    description={`La artritis reumatoide no se mide solo con el dolor. Estudios como Proteína C Reactiva (PCR) y Velocidad de Sedimentación Globular (VSG) miden la inflamación real de tu cuerpo.`} 
                    actionText={`Cotizar Reactantes (PCR y VSG)`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Reactantes%20(PCR%20y%20VSG)*`} 
                    type="estudio" 
                />
                <AdBanner variant="horizontal" className="mb-8" />
            </div>
        </main>
    );
}
