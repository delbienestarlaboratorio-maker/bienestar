'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function CHA2DS2VAScPage() {
    const [c, setC] = useState(false); // CHF (1)
    const [h, setH] = useState(false); // HTN (1)
    const [a2, setA2] = useState(false); // Age >= 75 (2)
    const [d, setD] = useState(false); // Diabetes (1)
    const [s2, setS2] = useState(false); // Stroke/TIA (2)
    const [v, setV] = useState(false); // Vascular (1)
    const [a, setA] = useState(false); // Age 65-74 (1)
    const [sc, setSc] = useState(false); // Sex category (Female) (1)

    const handleA2 = (checked: boolean) => {
        setA2(checked);
        if (checked) setA(false); // Cant be 75+ and 65-74 simultaneously
    };

    const handleA = (checked: boolean) => {
        setA(checked);
        if (checked) setA2(false);
    };

    const score = (c ? 1 : 0) + (h ? 1 : 0) + (a2 ? 2 : 0) + (d ? 1 : 0) + (s2 ? 2 : 0) + (v ? 1 : 0) + (a ? 1 : 0) + (sc ? 1 : 0);
    const interacted = c || h || a2 || d || s2 || v || a || sc;

    const recomendacionTratamiento = (s: number, mujer: boolean) => {
        // En mujeres, el puntaje de 1 solo por sexo generalmente se considera bajo riesgo para dar anticoagulantes.
        if (s === 0 || (s === 1 && mujer)) {
            return { r: 'Bajo Riesgo', d: 'Baja probabilidad de embolia (Tratamiento anticoagulante: NO)', clase: 'bg-green-100 text-green-800 border-green-200' };
        }
        if (s === 1 || (s === 2 && mujer)) {
            return { r: 'Riesgo Moderado', d: 'Riesgo intermedio (Anticoagulante Oral: A CONSIDERAR según criterio)', clase: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
        }
        return { r: 'Alto Riesgo', d: 'Peligro inminente de coágulo cardíaco cerebral (Anticoagulante Oral: RECOMENDADO CLARO)', clase: 'bg-red-100 text-red-800 border-red-200' };
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-red-700 to-rose-900 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🫀 Score CHA₂DS₂-VASc</h1>
                    <p className="text-red-100 mt-2">Riesgo de ACV en Fibrilación Auricular (Riesgo Tromboembólico)</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">Escala clínica utilizada mundialmente por cardiólogos para determinar la probabilidad de que un paciente con Fibrilación Auricular no valvular sufra un infarto cerebral u otra embolia sistémica.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 flex-col">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" checked={c} onChange={(e) => setC(e.target.checked)} className="w-5 h-5 text-red-600 rounded" />
                                <span className="font-bold text-gray-800">C | Falla Cardíaca (1)</span>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 flex-col">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" checked={h} onChange={(e) => setH(e.target.checked)} className="w-5 h-5 text-red-600 rounded" />
                                <span className="font-bold text-gray-800">H | Hipertensión (1)</span>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 flex-col">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" checked={a2} onChange={(e) => handleA2(e.target.checked)} className="w-5 h-5 text-red-600 rounded" />
                                <span className="font-bold text-gray-800">A₂ | Edad ≥ 75 años (2)</span>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 flex-col">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" checked={d} onChange={(e) => setD(e.target.checked)} className="w-5 h-5 text-red-600 rounded" />
                                <span className="font-bold text-gray-800">D | Diabetes Mellitus (1)</span>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 flex-col">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" checked={s2} onChange={(e) => setS2(e.target.checked)} className="w-5 h-5 text-red-600 rounded" />
                                <span className="font-bold text-gray-800">S₂ | Ictus previo / AIT (2)</span>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 flex-col">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" checked={v} onChange={(e) => setV(e.target.checked)} className="w-5 h-5 text-red-600 rounded" />
                                <span className="font-bold text-gray-800">V | Enf. Vascular (infarto/AOP) (1)</span>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 flex-col">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" checked={a} onChange={(e) => handleA(e.target.checked)} className="w-5 h-5 text-red-600 rounded" />
                                <span className="font-bold text-gray-800">A | Edad de 65 a 74 años (1)</span>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 flex-col">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" checked={sc} onChange={(e) => setSc(e.target.checked)} className="w-5 h-5 text-red-600 rounded" />
                                <span className="font-bold text-gray-800">Sc | Categoría Sexo: Mujer (1)</span>
                            </div>
                        </label>
                    </div>

                    {interacted && (
                        <div className="mt-8 animate-in fade-in">
                            {(() => {
                                const trs = recomendacionTratamiento(score, sc);
                                return (
                                    <div className={`${trs.clase} p-6 rounded-2xl border text-center mb-6`}>
                                        <p className="text-xl font-bold mb-1">Score: {score} Puntos</p>
                                        <p className="text-lg font-bold mb-1 uppercase">{trs.r}</p>
                                        <p className="font-medium text-sm">{trs.d}</p>
                                    </div>
                                );
                            })()}

                            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                                <h3 className="font-bold text-red-900 text-lg mb-3">⚠️ Manejo de Anticoagulantes (Laboratorio)</h3>
                                <p className="text-gray-700 text-sm mb-4">Si usted o su paciente será iniciado en terapia con anticoagulantes clásicos (ej. Acenocumarina / Warfarina) debido a un CHA₂DS₂-VASc de alto riesgo, es ABSOLUTAMENTE VITAL el monitoreo estricto para evitar hemorragias fatales.</p>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm border border-red-100">
                                        <span className="text-red-600 mt-1">🩸</span>
                                        <div>
                                            <p className="font-bold text-red-900 text-sm">Tiempo de Protrombina e INR (TP/INR)</p>
                                            <p className="text-gray-600 text-xs">Examen mensual obligatorio. El rango objetivo para evitar trombos y evitar sangrados usualmente es un INR de 2.0 a 3.0 para Fibrilación Auricular.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <StudyCTA 
                    title={`Prevención de Embolias y Trombos`} 
                    description={`Este score evalúa el riesgo clínico. Pruebas como Tiempos de Coagulación (TP, TTP) y el Dímero-D, revelan la tendencia de tu sangre a formar coágulos que podrían ir al cerebro.`} 
                    actionText={`Cotizar Perfil de Coagulación`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Perfil%20de%20Coagulaci%C3%B3n*`} 
                    type="estudio" 
                />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
