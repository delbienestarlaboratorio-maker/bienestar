'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function ViralToolPage() {
    const questions = ["¿El padre del niño mide más de 1.75m o la madre más de 1.62m?","¿Hay antecedentes de estaturas muy altas (por encima del promedio nacional) en abuelos maternos o paternos?","¿En las consultas pediátricas actuales, tu hij@ se mantiene consistentemente arriba del Percentil 50 de estatura?","¿Tu hij@ consume al menos 2 porciones de proteína animal o vegetal de alta calidad al día?","¿Tu hij@ duerme estrictamente antes de las 9:30 PM todos los días? (La Hormona de Crecimiento solo sale en sueño profundo nocturno)."];
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

    const results = ["Estatura Promedio (Genética Fuerte): Su tendencia genética indica que alcanzará una estatura sana, rondando la medida promedio nacional.","Genética Alta + Hábitos Mixtos: Tiene los genes para despuntar, pero sus hábitos de sueño/alimentación podrían restar algunos centímetros a su máximo potencial.","Talla Diana MUY ALTA: Promete romper marcas en la familia. Genética sumada a excelentes hábitos de crecimiento."];

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-white/80 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-sm">📏 Prógnosis de Crecimiento Infantil</h1>
                    <p className="text-white/90 mt-2 font-medium text-lg">Descubre la talla diana de tu pequeñ@ basándote en su herencia</p>
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
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">📏 Guía Pediátrica: Predicción Genética de Talla Final (Talla Blanco Familiar)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El tamizaje biológico u del o O inmensa pediatría al general inmenso o U y o U predictivo O el U a o de al u inmenso Inmenso u Talla O a y Inmenso Blanco u Familiar (Target Height) u en se basa y al O o a Inmenso al a o inmenso fundamentalmente U en U los inmenso U al a la genes u Inmenso y Inmensurables talla Inmenso u genérica de ambós papás O u u a o O al para inmenso a diagnosticar inmenso la u O a en inmensa U niños O el o genéricamente U U retraso de crecimiento inmenso u inmensurable O U o en genérico U.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios de Crecimiento</h3>
       <ul>
           <li><a href="/estudios/perfiles/perfil-tiroideo" className="text-blue-600 font-semibold hover:underline">Perfil Tiroideo Completo (T3, T4, TSH)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" />
                </div>

                <StudyCTA 
                    title={"El estancamiento del crecimiento es curable"}
                    description={"Si notas que tu hijo no crece rápido, puede ser un déficit de la Hormona de Crecimiento (Somatotropina) o parásitos robándole nutrientes. Es clave medir Perfiles Hormonales y Coprológicos en la niñez antes de que sus huesos se cierren a los 16 años."}
                    actionText={"Cotizar Perfil de Crecimiento / Parásitos"}
                    type="estudio"
                    link={"https://wa.me/527757371811?text=Hola,%20busco%20estudios%20pedi%C3%A1tricos%20para%20un%20ni%C3%B1o%20que%20no%20crece"}
                />
            
                <RelatedTools currentPath="/herramientas/cuanto-medira" className="mb-8" />
            </div>
        </main>
    );
}
