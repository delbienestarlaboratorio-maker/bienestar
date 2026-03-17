'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function ViralToolPage() {
    const questions = ["¿Te cuesta muchísimo trabajo comenzar a hacer tareas aburridas, posponiéndolas hasta el último minuto de pánico?","¿Sueles interrumpir a las personas cuando hablan porque sientes urgencia por decir tu idea antes de olvidarla?","¿Padeces ceguera del tiempo? (Ej. Crees que han pasado 5 minutos pero en realidad pasaron 2 horas).","¿Entras en 'hiperfoco' con cosas que te interesan, olvidando incluso comer o ir al baño?","¿Tienes una 'basura mental' de pestañas abiertas en el navegador y proyectos a medias que nunca terminas?"];
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

    const results = ["Función Ejecutiva Normal: Tienes distracciones normales, nada fuera de lo común en el siglo XXI.","Rasgos Atípicos / Sobrecarga: Tienes varios síntomas de déficit de atención, pero podrían ser causados por falta de sueño o estrés agudo.","Alta Propensión a TDAH: Tienes el cuadro clínico clásico de una neurodivergencia o de Déficit de Atención en el Adulto. Es sumamente recomendable acudir a un psiquiatra."];

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 py-8 px-4 shadow-xl">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-white/80 hover:text-white text-sm mb-2 inline-block">← Regresar a todas las herramientas</Link>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-sm mb-1">🌪️ Evaluador Visual de TDAH</h1>
                    <p className="text-white/90 font-medium text-lg leading-snug">Descubre si tu cerebro procesa la atención de manera atípica</p>
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
                        title={"Descarta problemas biológicos antes de medicarte"}
                        description={"Muchos diagnósticos de TDAH en realidad son fatiga crónica por problemas Tiroideos, Anemia o Resistencia a la Insulina. El psiquiatra te pedirá estudios de laboratorio antes de darte Ritalín/Adderall."}
                        actionText={"Cotizar Perfil Psiquiátrico Básico"}
                        type="estudio"
                        link={"https://wa.me/527757371811?text=Hola,%20me%20interesa%20un%20Perfil%20Tiroideo%20y%20Qu%C3%ADmica%20para%20psiquiatra"}
                    />
                </div>
            
                <RelatedTools currentPath="/herramientas/test-tdah-adultos" className="mb-8" />
            </div>
        </main>
    );
}
