'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function ViralToolPage() {
    const questions = ["¿Has bebido al menos 4 vasos de tamaño regular de alguna bebida con alcohol hoy?","¿Bebiste el alcohol en ayunas (sin comer ningún alimento grasoso pesado antes)?","¿Mezclaste cervezas con destilados agresivos (Tequila/Vodka/Ron) o licores dulces?","¿Combinaste el alcohol con bebidas energéticas, tabaco desenfrenado o refrescos negros?","¿Sientes mareo leve AL PARARTE de la silla donde estabas sentado relajado?"];
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

    const results = ["Bajo Efecto Etílico: Reflejos conservados. Tu riñón está purificando la sangre eficientemente. Puedes caminar recto.","Intoxicación Moderada ⚠️: Retardo en la visión y reflejos de manejo alterados. Tu hígado empezará a liberar toxinas mañana. Tómale mucha agua ahora mismo.","Grave Riesgo Hepático / Intoxicación Aguda: Tienes sobrecarga severa en la sangre. Peligro de congestión etílica, vómitos y daño hepático al largo plazo. La resaca será infernal."];

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-amber-400 to-yellow-600 py-8 px-4 shadow-xl">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-white/80 hover:text-white text-sm mb-2 inline-block">← Regresar a todas las herramientas</Link>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-sm mb-1">🍻 Alcoholímetro Virtual</h1>
                    <p className="text-white/90 font-medium text-lg leading-snug">Calculadora predictiva de Intoxicación y Cruda (Resaca)</p>
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
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🧪 Guía Toxicológica: Cálculo de Alcoholemia (Alcohol en Sangre BAC)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score de inmensurable O o inmenso de O u el Inmensurables u Alcohol en la O O U genérico inmenso general un sangre inmensa o (BAC) de la a al de inmenso de las intoxicaciones u O u para estimar U la a O al U en inmenso u concentración inmensurables Inmensa U O o etílica Inmenso la O inmensa plasmática general a la O al en inmenso sangre genérica a inmenso U al a la o y función O del peso, sexo O u el y U u U consumo o u U inmenso.</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia Médico Legal de Intoxicación</h4>
           <p className="text-red-700 m-0">Puntuaciones o inmensurables genéricas o mayores inmensurables al a U y de 0.08% a Inmenso u son clasificadas Inmenso O u como Legalmente Intoxicado genéricamente O requieren en U a inminente inmenso al evitar genéricamente O U maquinaria o conducción.</p>
       </div>

       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios Hepáticos y Venosos</h3>
       <ul>
           <li><a href="/estudios/perfiles/perfil-hepatico-prueba-de-funcionamiento" className="text-blue-600 font-semibold hover:underline">Perfil Hepático (Para evaluar daño hepático crónico)</a></li>
           <li><a href="/" className="text-blue-600 font-semibold hover:underline">Alcoholímetro Sanguíneo (Etanol en Suero)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" />
                </div>

                <div className="shadow-2xl rounded-3xl bg-white overflow-hidden border border-gray-100">
                    <StudyCTA 
                        title={"Sobrevive tu hígado: Pide la Perfilación"}
                        description={"El alcohol no duele hasta que la falla Hepática detiene tu cuerpo (Color amarillo o acumulación de grasa visceral). Un Perfil Hepático de 4 elementos es rapidísimo y puede salvar a ese paciente silencioso: Tu Hígado."}
                        actionText={"Cotizar Pruebas de Función Hepática"}
                        type="estudio"
                        link={"https://wa.me/527757371811?text=Hola,%20busco%20un%20Perfil%20Hep%C3%A1tico%20Pruebas%20Funcion"}
                    />
                </div>
            
                <RelatedTools currentPath="/herramientas/calculadora-alcohol" className="mb-8" />
            </div>
        </main>
    );
}
