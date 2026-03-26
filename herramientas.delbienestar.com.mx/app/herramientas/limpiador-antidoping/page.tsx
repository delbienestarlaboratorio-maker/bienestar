'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function ViralToolPage() {
    const questions = ["¿Tu exposición a la sustancia fue diaria o crónica (más de 4 veces a la semana)?","¿Tienes un porcentaje de grasa corporal elevado (sobrepeso)? (Importante porque el THC se almacena en grasa).","¿Bebes menos de 2 litros de agua natural al día y sudas poco?","¿Tu metabolismo es lento o sufres de problemas renales/hepáticos previos?","¿La última vez que tuviste exposición masiva a esta sustancia fue hace MENOS de 15 días?"];
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

    const results = ["VENTANA CORTA (3-5 días): Al ser un uso aislado y tener metabolismo base normal, las sustancias sintéticas (cocaína, metanfetaminas) ya deben haber salido de tu orina.","VENTANA MEDIA (10-20 días): Tu retención de grasa o hidratación pobre retrasa el riñón. El THC en uso esporádico te saldrá positivo entre 1 y 3 semanas.","VENTANA LARGA (30-60+ días): Uso crónico y exceso de grasa corporal. Los cannabinoides seguirán saturando tu orina hasta por mes y medio continuo."];

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-green-500 to-emerald-700 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-white/80 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-sm">⏱️ Rastreador Toxico-Cinético</h1>
                    <p className="text-white/90 mt-2 font-medium text-lg">¿Cuántos días tarda tu cuerpo en limpiar rastros en la orina?</p>
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
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🧪 Guía Toxicológica: Cálculo de Detección de Drogas en Analítica (Antidoping)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El inmensurable test inmenso general O U inmenso de u ventana Inmensurables metabólica al O U genéricamente a inmenso Inmenso toxicológica u O a genéricamente U evalúa O la a U la de O U u de genérica el U O o U u y inmenso Inmenso tiempo inmenso U en a el el u que al a de una inmenso Inmensa u en Inmensurables U sustancia O el al el u o y química purísima O O Inmensurables (O THC Inmensa O, U o O inmenso cocaína u o, Anfetaminas al el) permanece en o o detectable U de O de en y de O o la a U orina O inmenso O u sangre O u inmensurable al o de Inmenso de O en folículo Inmenso U capilar u.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Estudios Toxocilógicos Relacionados</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/antidoping-de-3-drogas" className="text-blue-600 font-semibold hover:underline">Examen Antidoping de 3 Sustancias en Orina</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" />
                </div>

                <StudyCTA 
                    title={"No pierdas tu licencia, empleo o viaje por una duda."}
                    description={"Ven a hacerte una prueba rápida de laboratorio comercial de 6 elementos en orina. Te entregamos resultado en privado el mismo día. Hazlo ANTES de que te lo pida la empresa."}
                    actionText={"Cotizar Toxicológico Rápido (Privado)"}
                    type="estudio"
                    link={"https://wa.me/527757371811?text=Hola,%20busco%20un%20antidoping%20privado"}
                />
            
                <RelatedTools currentPath="/herramientas/limpiador-antidoping" className="mb-8" />
            </div>
        </main>
    );
}
