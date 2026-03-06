'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ViralToolPage() {
    const questions = ["¿Sientes una angustia gigante que te oprime el pecho si tu pareja tarda horas en responderte un mensaje trivial?","¿Sueles alejarte, pedir espacio o enojarte cuando alguien intenta tener demasiada intimidad emocional muy rápido contigo?","¿Sientes en el fondo que en cualquier momento tu pareja se va a cansar de ti y te va a abandonar por alguien mejor?","¿Te molestan excesivamente las demostraciones empalagosas de afecto en público o te resulta sofocante convivir 24/7?","¿Buscas validar desesperadamente tu apariencia o decisiones a través de la aprobación de tu pareja (subiéndole el ego inmensamente)?"];
    const [scores, setScores] = useState<number[]>(Array(questions.length).fill(-1));
    const [evaluado, setEvaluado] = useState(false);

    const check = () => {
        if (scores.includes(-1)) {
            alert("Por favor contesta todas las preguntas para arrojar tu resultado exacto.");
            return;
        }
        setEvaluado(true);
    };

    const countYes = scores.filter(s => s === 1).length;
    let resultIdx = 0;
    if (countYes >= 4) resultIdx = 2;
    else if (countYes >= 2) resultIdx = 1;
    else resultIdx = 0;

    const results = ["Apego Seguro: Tienes inteligencia emocional sólida. Disfrutas la intimidad, pero respetas plenamente el espacio.","Apego Evitativo: Te sientes sofocado cuando alguien te exige amor. Tienes terror a perder tu valiosa independencia.","Apego Ansioso-Preocupado: Vives en agonía esperando aprobación. Tienes un miedo irracional y doloroso al abandono que asfixia a tu pareja (Típicamente este apego atrae a personas Evitativas o Narcisistas, creando relaciones ultra tóxicas)."];

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-rose-500 to-pink-700 py-8 px-4 shadow-xl">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-white/80 hover:text-white text-sm mb-2 inline-block">← Regresar a todas las herramientas</Link>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-sm mb-1">🔗 Identificador de Tipo de Apego</h1>
                    <p className="text-white/90 font-medium text-lg leading-snug">Descubre por qué saboteas tus relaciones, o por qué atraes narcisistas</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8 relative -top-6">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 mb-8 backdrop-blur-xl bg-white/95">
                    
                    <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl p-4 mb-8 text-indigo-900 font-medium text-sm text-balance">
                        ✨ Contesta estas breves preguntas con SÍ o NO para recibir tu diagnóstico inmediato. 
                    </div>

                    <div className="space-y-6 mb-8">
                        {questions.map((q, idx) => (
                            <div key={idx} className="p-5 border-2 border-gray-100 rounded-2xl bg-gray-50/50 hover:border-blue-200 transition-colors">
                                <p className="font-bold text-gray-800 mb-4 text-lg leading-tight">{idx + 1}. {q}</p>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => { const ns = [...scores]; ns[idx] = 1; setScores(ns); }} 
                                        className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all shadow-sm active:scale-95 ${scores[idx] === 1 ? 'bg-blue-600 text-white shadow-md' : 'bg-white border text-gray-600 hover:bg-blue-50 hover:border-blue-300'}`}>
                                        SÍ
                                    </button>
                                    <button 
                                        onClick={() => { const ns = [...scores]; ns[idx] = 0; setScores(ns); }} 
                                        className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all shadow-sm active:scale-95 ${scores[idx] === 0 ? 'bg-gray-700 text-white shadow-md' : 'bg-white border text-gray-600 hover:bg-gray-50 hover:border-gray-300'}`}>
                                        NO
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={check} className="w-full bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold py-5 rounded-2xl text-xl shadow-xl transition-all active:scale-[0.98]">
                        Revelar Mi Resultado 🔍
                    </button>

                    {evaluado && (
                        <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 border-4 border-indigo-500 rounded-3xl text-center shadow-inner animate-in fade-in zoom-in-95 fill-mode-forwards">
                            <p className="text-sm font-black text-indigo-500 uppercase tracking-widest mb-3">Diagnóstico Interactivo</p>
                            <h3 className="font-black text-indigo-950 text-2xl md:text-3xl leading-tight text-balance">{results[resultIdx]}</h3>
                        </div>
                    )}
                </div>

                <div className="mb-10 transform hover:scale-[1.01] transition-transform">
                    <AdBanner variant="horizontal" />
                </div>

                <div className="shadow-2xl rounded-3xl bg-white overflow-hidden border border-gray-100">
                    <StudyCTA 
                        title={"El dolor físico del desamor es real (Y comprobable en sangre)"}
                        description={"Las crisis de ansiedad en el apego ansioso inflaman el cuerpo y suben el colesterol y los triglicéridos. Si vives estresado por tus relaciones, monitorea tu Glucosa, Cortisol y Colesterol ya mismo."}
                        actionText={"Cotizar Checkup Cuidado del Corazón"}
                        type="estudio"
                        link={"https://wa.me/527757371811?text=Hola,%20deseo%20saber%20mis%20niveles%20de%20colesterol%20y%20glucosa"}
                    />
                </div>
            </div>
        </main>
    );
}
