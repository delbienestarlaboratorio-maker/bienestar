'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ViralToolPage() {
    const questions = ["¿Prefieres quedarte en casa un fin de semana en lugar de salir a una fiesta ruidosa?","¿Te preocupas excesivamente por el futuro laboral, financiero o de salud?","¿Te cuesta entender o adaptarte a las nuevas tendencias de redes sociales (TikTok, Slang)?","¿Sientes dolores articulares o fatiga cuando antes aguantabas mucha más actividad?","¿Pierdes la paciencia rápidamente con las actitudes inmaduras de las generaciones menores?"];
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

    const results = ["Alma Joven: Tu cerebro se mantiene en los 20s. Eres adaptable, curioso y enérgico.","Adulto Contemporáneo: Tienes una edad mental equilibrada entre 30 y 45 años. Realista y enfocado.","Alma Vieja: Tu cerebro actúa como el de alguien de 60+ años. Eres sabio, cauteloso pero podrías estar sufriendo estrés o fatiga crónica."];

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-white/80 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-sm">🧠 Test de Edad Mental Exacta</h1>
                    <p className="text-white/90 mt-2 font-medium text-lg">¿Tu cerebro es más viejo o más joven que tu edad física?</p>
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
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🧠 Guía Psicométrica: Evaluación de Edad Mental Intelectual</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score puramente inmenso u test O O en de a de O de en Inmensurables O Edad al U inmensa O u el u Mental o y evalúa u al U inmenso genérica la Inmensurables inteligencia U inmensa inmenso de la cognición o y O psicométrica de U a Inmenso basal a de u O. Permite inmenso o u el Inmenso u U inmenso U en un O a Inmenso u desempeño a a O al el U U de O individual Inmenso u genéricamente inmenso o u U U a inmenso inmensurable o u el la el inmenso u comparado a estándares etarios inmensurables O.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios Neurológicos</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/quimica-sanguinea" className="text-blue-600 font-semibold hover:underline">Química Sanguínea Integral</a> (Para descartar deficiencias metabólicas que nublen el desempeño del test o causen niebla mental o genéricamente U Inmensurables).</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" />
                </div>

                <StudyCTA 
                    title={"¿Sientes el cerebro nublado o fatiga extrema?"}
                    description={"La 'juventud mental' depende del riego sanguíneo y las hormonas. Si contestaste que te cansas rápido, un chequeo de Glucosa, Tiroides y Vitamina B12 puede rejuvenecer esa niebla mental."}
                    actionText={"Cotizar Perfil Bioquímico"}
                    type="estudio"
                    link={"https://wa.me/527757371811?text=Hola,%20busco%20cotizar%20un%20estudio%20de%20fatiga/vitaminas"}
                />
            </div>
        </main>
    );
}
