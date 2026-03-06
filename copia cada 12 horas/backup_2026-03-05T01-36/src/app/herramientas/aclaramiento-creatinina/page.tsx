'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function CreatinineClearancePage() {
    const [vol, setVol] = useState('');
    const [uCr, setUCr] = useState('');
    const [sCr, setSCr] = useState('');
    const [resultado, setResultado] = useState<number | null>(null);

    const calcular = () => {
        const v = parseFloat(vol);
        const u = parseFloat(uCr);
        const s = parseFloat(sCr);

        if (v > 0 && u > 0 && s > 0) {
            // Formula: (Urine Cr * Urine Vol) / (Serum Cr * 1440)
            const clearance = (u * v) / (s * 1440);
            setResultado(parseFloat(clearance.toFixed(1)));
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-blue-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🧪 Aclaramiento de Creatinina</h1>
                    <p className="text-blue-100 mt-2">Depuración formal de creatinina en orina de 24 horas</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">A diferencia de la Tasa de Filtrado Glomerular Estimada (eGFR) que solo usa un cálculo matemático, la depuración en 24 horas es la <strong>prueba real</strong> de cuántos mililitros de sangre limpian tus riñones por minuto, usando fluidos orgánicos reales.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Creatinina en Orina (mg/dL)</label>
                            <input type="number" step="0.1" value={uCr} onChange={(e) => setUCr(e.target.value)} placeholder="Ej: 120"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Volumen de Orina (mL/24h)</label>
                            <input type="number" value={vol} onChange={(e) => setVol(e.target.value)} placeholder="Ej: 1500"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Creatinina en Sangre (mg/dL)</label>
                            <input type="number" step="0.01" value={sCr} onChange={(e) => setSCr(e.target.value)} placeholder="Ej: 0.9"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg text-gray-800" />
                        </div>
                    </div>

                    <button onClick={calcular}
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">
                        Calcular Aclaramiento Real
                    </button>

                    {resultado !== null && (
                        <div className="mt-8 animate-in fade-in text-center">
                            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                                <p className="text-sm text-gray-600 mb-1">Tasa de Depuración Medida</p>
                                <p className="text-6xl font-black text-blue-800">{resultado}</p>
                                <p className="text-lg font-bold text-blue-600 mt-2">mL / minuto</p>
                                <p className="text-gray-500 text-sm mt-4 text-left">
                                    <em>Nota:</em> Valores normales típicos rondan entre 90 a 140 mL/min para adultos jóvenes sin patología, decayendo ~1 mL/min/año después de los 40. Consulta a tu Nefrólogo para interpretar tu resultado según tu área de superficie corporal métrica (SCM).
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                
                <StudyCTA 
                    title={`Evaluación Absoluta del Riñón`} 
                    description={`Si tienes sospecha de insuficiencia, se necesita el Aclaramiento de Creatinina (sanguínea y en orina de 24h) y depuración de urea integral.`} 
                    actionText={`Prueba Renal GFR / Aclaramiento`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Prueba%20Renal%20GFR%20%2F%20Aclaramiento*`} 
                    type="estudio" 
                />
                <AdBanner variant="horizontal" className="mb-8" />
            </div>
        </main>
    );
}
