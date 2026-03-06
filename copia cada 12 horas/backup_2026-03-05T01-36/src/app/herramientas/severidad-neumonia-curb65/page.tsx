'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function CURB65Page() {
    const [c, setC] = useState(false); // Confusion
    const [u, setU] = useState(false); // Urea > 19 mg/dL
    const [r, setR] = useState(false); // Resp rate >= 30
    const [b, setB] = useState(false); // BP systolic < 90 or diastolic <= 60
    const [a, setA] = useState(false); // Age >= 65

    const score = (c ? 1 : 0) + (u ? 1 : 0) + (r ? 1 : 0) + (b ? 1 : 0) + (a ? 1 : 0);
    const aggegado = c || u || r || b || a;

    const getRecommendation = () => {
        if (score === 0 || score === 1) return {
            riesgo: 'Riesgo Bajo (Mortalidad < 1.5%)', color: 'text-green-700', bg: 'bg-green-50',
            accion: 'Manejo ambulatorio (tratamiento en casa).'
        };
        if (score === 2) return {
            riesgo: 'Riesgo Moderado (Mortalidad ~ 9.2%)', color: 'text-orange-700', bg: 'bg-orange-50',
            accion: 'Hospitalización recomendada (Corta estancia o pabellón general).'
        };
        return {
            riesgo: 'Riesgo Alto (Mortalidad ~ 22%)', color: 'text-red-700', bg: 'bg-red-50',
            accion: 'Ingreso urgente. Considerar Unidad de Cuidados Intensivos (UCI).'
        };
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-sky-700 to-indigo-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-sky-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🫁 Score CURB-65</h1>
                    <p className="text-sky-100 mt-2">Evaluador de severidad para Neumonía Adquirida en la Comunidad (NAC)</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">Suma 1 punto por cada criterio presente en el paciente respiratorio para predecir la mortalidad a 30 días y guiar el sitio de tratamiento.</p>

                    <div className="space-y-4 mb-8">
                        {[
                            { state: c, set: setC, letter: 'C', title: 'Confusión', desc: 'Desorientación mental aguda o AMTS ≤ 8' },
                            { state: u, set: setU, letter: 'U', title: 'Urea (BUN) Elevado', desc: 'BUN sanguíneo > 19 mg/dL (Urea > 7 mmol/L)' },
                            { state: r, set: setR, letter: 'R', title: 'Respiración (Taquipnea)', desc: 'Frecuencia respiratoria ≥ 30 respiraciones por minuto' },
                            { state: b, set: setB, letter: 'B', title: 'Blood Pressure (Hipotensión)', desc: 'Presión arterial sistólica < 90 mmHg o diastólica ≤ 60 mmHg' },
                            { state: a, set: setA, letter: '65', title: 'Edad de 65 años o más', desc: 'El paciente cuenta con 65 años cumplidos o mayor' }
                        ].map((item, idx) => (
                            <label key={idx} className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${item.state ? 'bg-sky-50 border-sky-300' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                                <input type="checkbox" checked={item.state} onChange={(e) => item.set(e.target.checked)} className="mt-1 w-6 h-6 text-sky-600 rounded" />
                                <div>
                                    <span className="font-black text-sky-800 text-lg mr-2">{item.letter}</span>
                                    <span className="font-bold text-gray-800">{item.title}</span>
                                    <span className="block text-sm text-gray-500 mt-1">{item.desc}</span>
                                </div>
                            </label>
                        ))}
                    </div>

                    {aggegado && (
                        <div className="mt-8 animate-in fade-in">
                            <div className="flex gap-4 items-center justify-center p-6 bg-gray-100 rounded-t-2xl border-b border-gray-200">
                                <div className="text-center">
                                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Puntaje Total</span>
                                    <p className="text-6xl font-black text-gray-900">{score}</p>
                                </div>
                            </div>

                            {(() => {
                                const rec = getRecommendation();
                                return (
                                    <div className={`${rec.bg} p-6 rounded-b-2xl border border-t-0`}>
                                        <p className={`text-xl font-bold ${rec.color} mb-2`}>{rec.riesgo}</p>
                                        <p className="text-gray-800 font-medium">{rec.accion}</p>
                                    </div>
                                );
                            })()}

                            <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-6 mt-8">
                                <h3 className="font-bold text-sky-900 text-lg mb-3">🔬 Requisitos Complementarios</h3>
                                <p className="text-gray-700 text-sm mb-4">Para confirmar formalmente este Score se requiere soporte de laboratorio e imagen. Recomendamos a su médico tratante solicitar los siguientes elementos para descartar complicaciones sistémicas asociadas a la neumonía:</p>
                                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 mb-4 font-medium">
                                    <li>Nitrógeno Ureico en Sangre (BUN) / Úrea</li>
                                    <li>Radiografía de Tórax AP y Lateral</li>
                                    <li>Biometría Hemática Completa</li>
                                    <li>Hemocultivos o Cultivo de Expectoración (en scores ≥ 2)</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                
                <StudyCTA 
                    title={`Evaluación Respiratoria Crítica`} 
                    description={`Un paciente pulmonar comprometido necesita una Radiografía de Tórax inmediata para evaluar consolidación y Biometría Hemática para medir la carga de la infección bacteriana.`} 
                    actionText={`Cotizar Rx y Biometría`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Rx%20y%20Biometr%C3%ADa*`} 
                    type="estudio" 
                />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
