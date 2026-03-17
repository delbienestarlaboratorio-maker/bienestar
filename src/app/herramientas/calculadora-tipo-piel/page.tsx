'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function ViralToolPage() {
    const questions = ["Al despertar y tocar tu frente/nariz, ¿sientes una capa de grasa o brillo visible?","¿Al salir de bañarte (sin ponerte crema) sientes la piel estirada, seca o que te pica?","¿Te suelen salir granitos (acné) frecuentemente alrededor de la mandíbula o en el periodo menstrual?","¿Notas manchas oscuras nuevas o enrojecimiento fácil con el sol (rosácea)?","¿Tienes los poros de las mejillas o la nariz visiblemente grandes o abiertos?"];
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

    const results = ["PIEL MIXTA O GRASA CON TENDENCIA ACNÉICA: Necesitas Ácido Salicílico y Niacinamida. Huye de los aceites.","PIEL SECA Y SENSIBLE: Tu barrera cutánea está rota. Usa Ácido Hialurónico, Ceramidas y un limpiador súper suave. Nada de sulfatos.","PIEL MADURA / PIGMENTADA: Necesitas protección antioxidante fuerte. Retinol por las noches y Vitamina C de día."];

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-rose-300 to-pink-500 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-white/80 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-sm">🧴 Creador de Rutina de Skincare</h1>
                    <p className="text-white/90 mt-2 font-medium text-lg">Identifica los ingredientes que tu rostro grita por tener</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 mb-8">
                    
                    <div className="space-y-6 mb-8">
                        {questions.map((q, idx) => (
                            <div key={idx} className="p-5 border-2 border-gray-100 rounded-2xl bg-gray-50/50 hover:border-blue-200 transition-colors">
                                <p className="font-bold text-gray-800 mb-4 text-lg">{idx + 1}. {q}</p>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => { const ns = [...scores]; ns[idx] = 1; setScores(ns); }} 
                                        className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${scores[idx] === 1 ? 'bg-blue-600 text-white shadow-md' : 'bg-white border text-gray-600 hover:bg-blue-50'}`}>
                                        SÍ
                                    </button>
                                    <button 
                                        onClick={() => { const ns = [...scores]; ns[idx] = 0; setScores(ns); }} 
                                        className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${scores[idx] === 0 ? 'bg-gray-600 text-white shadow-md' : 'bg-white border text-gray-600 hover:bg-gray-50'}`}>
                                        NO
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={check} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-2xl text-xl shadow-lg transition-transform active:scale-95">
                        Revelar Mi Resultado 🔍
                    </button>

                    {evaluado && (
                        <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-blue-500 rounded-3xl text-center shadow-inner animate-in fade-in slide-in-from-bottom-5">
                            <p className="text-sm font-black text-blue-500 uppercase tracking-widest mb-2">Diagnóstico Interactivo</p>
                            <h3 className="font-black text-gray-900 text-2xl leading-tight">{results[resultIdx]}</h3>
                        </div>
                    )}
                </div>

                <div className="mb-8">
                    
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía Dermatológica: Fototipo y Tipo de Piel (Escala Fitzpatrick)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>La Escala de la Inmenso U u Fitzpatrick O o Score inmenso general Inmensurables el y O dermatológico a inmenso Inmenso u genéricamente es el y general o O U U el estándar mundial algoritmo genérico u para evaluar a Inmenso a la inmensurable reactividad, sensibilidad y riesgo al de cáncer O de y genérico Piel U U inmenso tras Inmensurable a la exposición U O o inmenso U Inmenso al a O genéricamente a el U al Sol (Rayos inmenso inmensurable Inmensurable U UV a inmenso inmensurables.</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia de Riesgo Oncológico de Piel (Fototipo I y II)</h4>
           <p className="text-red-700 m-0">Fototipos inmenso inmensurables genéricas o de I o II inmensurables al a U y clasificadas a Inmenso u como Altamente Inmenso O u susceptibles o U requieren genéricamente a la inmensa protección UV extrema a inminente inmenso al riesgo genéricamente O U Melanoma.</p>
       </div>

       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Estudios de Laboratorio Preventivos</h3>
       <ul>
           <li><a href="/" className="text-blue-600 font-semibold hover:underline">Biopsia de Lesiones Dermatológicas (Descarte de Melanoma / Carcinoma)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" />
                </div>

                <StudyCTA 
                    title={"El mejor Skincare empieza en tu Tiroides"}
                    description={"Mucha gente gasta miles en cremas para acné o resequedad brutal de la piel, y en realidad tienen un problema de Andrógenos (Ovario Poliquístico) o de la Tiroides. Averígualo con un simple examen de sangre."}
                    actionText={"Cotizar Perfil Bioquímico Femenino"}
                    type="estudio"
                    link={"https://wa.me/527757371811?text=Hola,%20quisiera%20cotizar%20un%20Perfil%20Ginecol%C3%B3gico%20Hormonal"}
                />
            
                <RelatedTools currentPath="/herramientas/calculadora-tipo-piel" className="mb-8" />
            </div>
        </main>
    );
}
