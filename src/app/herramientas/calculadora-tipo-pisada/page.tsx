'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ViralToolPage() {
    const questions = ["¿Sientes 'tronidos' o arenilla al doblar y estirar la rodilla, acompañados de dolor punzante?","¿Te duele mucho más al bajar escaleras o al correr sobre pavimento duro?","¿Sientes tu rodilla visiblemente más gorda (hinchada) y caliente al tacto tras un largo paseo?","¿Tienes obesidad, sobrepeso cruzado o has cargado mucho peso industrial por años?","¿Tus zapatos se desgastan muy asimétricos (mucho de un lado y nada del otro)?"];
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

    const results = ["Molestia Mecánica Leve: Parece ser tensión muscular. Reposar y estirar debidamente los isquiotibiales ayudará mucho.","Desgaste de Cartílago (Condromalacia): Foco naranja. Tu cartílago rotuliano está rozando contra el fémur. Requieres fisioterapia para no destruirlo.","Derrame Articular / Desgaste Severo / Ácido Úrico: Peligro rojo. Hinchazón caliente denota un derrame o un ataque agudo de Gota (Ácido Úrico cristalizado rompiendo tendones)."];

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 py-8 px-4 shadow-xl">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-white/80 hover:text-white text-sm mb-2 inline-block">← Regresar a todas las herramientas</Link>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-sm mb-1">🦵 Test Rápido de Daño Articular (Rodillas)</h1>
                    <p className="text-white/90 font-medium text-lg leading-snug">Saber si tu desgaste es normal, o inminente artritis/lesión</p>
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
                    
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">👟 Guía Ortopédica Deportiva: Tipo de Pisada (Pronador, Supinador, Neutro)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>La evaluación biomecánica inmensurable O U o en es a inmenso el O u a inmenso U estándar U O o fisioterapéutico U de genérico U y la o O u deportiva inmensurables genérica O u inmenso para general U la Inmenso O u pisada de de O y evaluar O o al el el grado de al el U a pronación o supinación genérica u inmenso del inmenso inmensurables en o a u pie Inmenso al inmensa aterrizar, O u el la Inmensurables previniendo U genérica lesiones O u articulares u o u U a a inmenso Inmensurables meniscales inmenso Inmensurables.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Estudios Relacionados</h3>
       <ul>
           <li><a href="/" className="text-blue-600 font-semibold hover:underline">Consulta Ortopédica Biomecánica (Estudio de la Pisada Analítico)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" />
                </div>

                <div className="shadow-2xl rounded-3xl bg-white overflow-hidden border border-gray-100">
                    <StudyCTA 
                        title={"Comprueba si es desgaste por Sobrepeso o Gota Asesina"}
                        description={"El dolor insoportable de rodilla inflada a veces no es el tenis malo, son cristales de Ácido Úrico enterrados en la coyuntura. Un estudio de Química Sanguínea (Ácido Úrico y Factor Reumatoide) revelará la verdad oculta."}
                        actionText={"Cotizar Ácido Úrico y Factor Reumatoide"}
                        type="estudio"
                        link={"https://wa.me/527757371811?text=Hola,%20me%20duelen%20las%20articulaciones,%20quisiera%20cotizar%20%C3%81cido%20%C3%9Arico%20y%20Factor%20Reumatoide"}
                    />
                </div>
            </div>
        </main>
    );
}
