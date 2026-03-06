'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function CalculadoraPSAPage() {
    const [psaTotal, setPsaTotal] = useState('');
    const [psaLibre, setPsaLibre] = useState('');
    const [resultado, setResultado] = useState<number | null>(null);

    const calcular = () => {
        const total = parseFloat(psaTotal);
        const libre = parseFloat(psaLibre);

        if (total > 0 && libre >= 0 && libre <= total) {
            const indice = (libre / total) * 100;
            setResultado(parseFloat(indice.toFixed(1)));
        } else if (libre > total) {
            alert('El PSA Libre no puede ser mayor al PSA Total.');
        }
    };

    const getCategoria = (score: number) => {
        if (score > 25) return { label: 'Bajo Riesgo', color: 'text-green-600', bg: 'bg-green-100', prob: '8% de probabilidad de hallazgo maligno' };
        if (score >= 10 && score <= 25) return { label: 'Zona Gris (Moderado Riesgo)', color: 'text-yellow-600', bg: 'bg-yellow-100', prob: 'Probabilidad intermedia, requiere seguimiento' };
        return { label: 'Alto Riesgo', color: 'text-red-600', bg: 'bg-red-100', prob: '56% de probabilidad de hallazgo maligno' };
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-blue-800 to-cyan-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-blue-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🚹 Índice PSA Libre/Total</h1>
                    <p className="text-blue-100 mt-2">Diferenciación entre patología prostática benigna y maligna</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 mb-6 text-sm text-cyan-800">
                        <strong>Uso Clínico:</strong> Este índice es de mayor utilidad cuando el PSA Total se encuentra en la "zona gris" diagnóstica, es decir, entre <strong>4.0 y 10.0 ng/mL</strong>.
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">PSA Total (ng/mL)</label>
                            <input type="number" step="0.1" value={psaTotal} onChange={(e) => setPsaTotal(e.target.value)} placeholder="Ej: 6.5"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">PSA Libre (ng/mL)</label>
                            <input type="number" step="0.01" value={psaLibre} onChange={(e) => setPsaLibre(e.target.value)} placeholder="Ej: 0.8"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg text-gray-800" />
                        </div>
                    </div>

                    <button onClick={calcular}
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                        Calcular Relación Porcentual
                    </button>

                    {resultado !== null && (() => {
                        const cat = getCategoria(resultado);
                        return (
                            <div className="mt-8 animate-in fade-in">
                                <div className={`${cat.bg} rounded-2xl p-6 text-center mb-6`}>
                                    <p className="text-sm text-gray-600 mb-1">Porcentaje de PSA Libre</p>
                                    <p className={`text-6xl font-black ${cat.color}`}>{resultado}%</p>
                                    <p className={`text-xl font-bold ${cat.color} mt-2`}>{cat.label}</p>
                                    <p className="text-gray-700 font-medium text-sm mt-2">{cat.prob}</p>
                                </div>
                            </div>
                        );
                    })()}
                </div>
                
                <StudyCTA 
                    title={`Cuida tu próstata hoy`} 
                    description={`El Cáncer de Próstata es silente. El Antígeno Prostático Específico (PSA) Total y Libre es un simple test de sangre que salva miles de vidas anualmente. Hazlo una vez al año.`} 
                    actionText={`Cotizar Prueba de PSA`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Prueba%20de%20PSA*`} 
                    type="estudio" 
                />
                <AdBanner variant="horizontal" className="mb-8" />
            </div>
        </main>
    );
}
