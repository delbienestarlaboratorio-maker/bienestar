'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function CalculadoraROMAPage() {
    const [estado, setEstado] = useState<'pre' | 'post'>('pre');
    const [he4, setHe4] = useState('');
    const [ca125, setCa125] = useState('');
    const [resultado, setResultado] = useState<number | null>(null);

    const calcular = () => {
        const vHe4 = parseFloat(he4);
        const vCa125 = parseFloat(ca125);

        if (vHe4 > 0 && vCa125 > 0) {
            let PI = 0;
            if (estado === 'pre') {
                PI = -12.0 + (2.38 * Math.log(vHe4)) + (0.0626 * Math.log(vCa125));
            } else {
                PI = -8.09 + (1.04 * Math.log(vHe4)) + (0.732 * Math.log(vCa125));
            }

            const roma = (Math.exp(PI) / (1 + Math.exp(PI))) * 100;
            setResultado(parseFloat(roma.toFixed(1)));
        }
    };

    const getCategoria = (score: number, est: string) => {
        if (est === 'pre') {
            return score >= 11.4
                ? { label: 'Alto Riesgo', color: 'text-red-600', bg: 'bg-red-100', threshold: '≥ 11.4%' }
                : { label: 'Bajo Riesgo', color: 'text-green-600', bg: 'bg-green-100', threshold: '< 11.4%' };
        } else {
            return score >= 29.9
                ? { label: 'Alto Riesgo', color: 'text-red-600', bg: 'bg-red-100', threshold: '≥ 29.9%' }
                : { label: 'Bajo Riesgo', color: 'text-green-600', bg: 'bg-green-100', threshold: '< 29.9%' };
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-fuchsia-800 to-purple-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-fuchsia-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🩸 Algoritmo ROMA</h1>
                    <p className="text-fuchsia-100 mt-2">Riesgo de Malignidad Ovárica (Risk of Ovarian Malignancy Algorithm)</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="flex gap-4 mb-6">
                        <button onClick={() => setEstado('pre')}
                            className={`flex-1 py-3 rounded-xl font-bold transition-colors ${estado === 'pre' ? 'bg-fuchsia-100 text-fuchsia-700 border-2 border-fuchsia-400' : 'bg-gray-100 text-gray-500 border-2 border-transparent hover:bg-gray-200'}`}>
                            👩 Premenopáusica
                        </button>
                        <button onClick={() => setEstado('post')}
                            className={`flex-1 py-3 rounded-xl font-bold transition-colors ${estado === 'post' ? 'bg-purple-100 text-purple-700 border-2 border-purple-400' : 'bg-gray-100 text-gray-500 border-2 border-transparent hover:bg-gray-200'}`}>
                            👵 Postmenopáusica
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Marcador CA-125 (U/mL)</label>
                            <input type="number" step="0.1" value={ca125} onChange={(e) => setCa125(e.target.value)} placeholder="Ej: 35"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Marcador HE4 (pmol/L)</label>
                            <input type="number" step="0.1" value={he4} onChange={(e) => setHe4(e.target.value)} placeholder="Ej: 50"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200 outline-none text-lg text-gray-800" />
                        </div>
                    </div>

                    <button onClick={calcular}
                        className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                        Calcular ROMA (%)
                    </button>

                    {resultado !== null && (() => {
                        const cat = getCategoria(resultado, estado);
                        return (
                            <div className="mt-8 animate-in fade-in">
                                <div className={`${cat.bg} rounded-2xl p-6 text-center mb-6`}>
                                    <p className="text-sm text-gray-600 mb-1">Algoritmo predictivo de riesgo</p>
                                    <p className={`text-6xl font-black ${cat.color}`}>{resultado}%</p>
                                    <p className={`text-xl font-bold ${cat.color} mt-2`}>{cat.label}</p>
                                    <p className="text-gray-500 text-sm mt-1">Punto de corte: {cat.threshold}</p>
                                </div>

                                <div className="bg-fuchsia-50 border-2 border-fuchsia-200 rounded-2xl p-6">
                                    <h3 className="font-bold text-fuchsia-900 text-lg mb-3">🔬 Requisito de Laboratorio</h3>
                                    <p className="text-gray-700 text-sm">El algoritmo ROMA combina los marcadores tumorales CA-125 y HE4, probados clínicamente como una herramienta superior al escrutinio individual. Para este cálculo requieres realizarlos de manera simultánea.</p>
                                </div>
                            </div>
                        );
                    })()}
                </div>
                
                <StudyCTA 
                    title={`Tranquilidad Oncológica`} 
                    description={`Ante la duda de quistes o tumores, los Marcadores Tumorales CA-125 y HE4, junto con un ultrasonido pélvico, son el protocolo ginecológico para detectar malignidad temprana.`} 
                    actionText={`Cotizar Marcador CA-125`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Marcador%20CA-125*`} 
                    type="estudio" 
                />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
