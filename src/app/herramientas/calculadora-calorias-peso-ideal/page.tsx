'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function ViralToolPage() {
    const questions = ["¿Tu rutina diaria involucra estar sentado más de 6 horas al día?","¿Te saltas comidas frecuentemente (ej. no desayunas)?","¿Consumes refrescos regulares, jugos envasados o alcohol más de 3 veces por semana?","¿Tu objetivo principal es perder más de 5 kilos en los próximos 2 meses?","¿Sientes hambre ansiosa por la tarde-noche (antojo de dulces o carbohidratos)?"];
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

    const results = ["Metabolismo Activo: Tienes excelentes hábitos. Con un ligero ajuste de 300 kcal estarás en tu peso óptimo pronto.","Metabolismo Estresado: El sedentarismo y los picos de insulina están bloqueando tu quema de grasa. Necesitas un déficit moderado (500 kcal) y más proteína.","Metabolismo Bloqueado: Tus hábitos están obligando a tu cuerpo a almacenar grasa por supervivencia. Bajar de peso te será casi imposible sin estabilizar tu insulina primero."];

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-emerald-400 to-teal-600 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-white/80 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-sm">⚖️ Calculadora: Tu Cuerpo de Verano</h1>
                    <p className="text-white/90 mt-2 font-medium text-lg">Meta de déficit calórico y tiempo exacto para tu objetivo</p>
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
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🍏 Guía Médica y Nutricional: Calorías Diarias para Mantenimiento del Peso Ideal (TDEE)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score puramente inmenso u Nutricional O O en de a de O de en Inmensurables O Gasto Energético al U inmensa O u Total u o y evalúa u al U inmenso genérica la métrica Inmensurables o metabólica genéricamente a de la O de paciente u a Inmenso a inmenso TDEE (Total Daily Energy Expenditure) O a de u O sana inmenso o u el Inmenso u U inmenso U en un O a Inmenso u individuo en función de o su a O al el U U Inmenso u actividad inmenso u física y U metabolismo basal a inmenso inmensurable o u el la el inmenso.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios de Control Metabólico</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/glucosa" className="text-blue-600 font-semibold hover:underline">Glucosa en Ayuno</a></li>
           <li><a href="/estudios/perfiles/perfil-de-lipidos" className="text-blue-600 font-semibold hover:underline">Perfil de Lípidos Integrativo (Colesterol y Triglicéridos)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" />
                </div>

                <StudyCTA 
                    title={"Rompe el Bloqueo Metabólico"}
                    description={"La grasa abdominal terca no siempre es por comer mucho. La Insulina Basal Alta le ordena a tu cuerpo que no queme grasa bajo ninguna circunstancia. Descubre si tienes Resistencia a la Insulina."}
                    actionText={"Cotizar Insulina y Tiroides"}
                    type="estudio"
                    link={"https://wa.me/527757371811?text=Hola,%20me%20interesa%20un%20Perfil%20Metab%C3%B3lico%20(Insulina/%20Tiroides)"}
                />
            
                <RelatedTools currentPath="/herramientas/calculadora-calorias-peso-ideal" className="mb-8" />
            </div>
        </main>
    );
}
