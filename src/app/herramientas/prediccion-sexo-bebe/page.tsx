'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ViralToolPage() {
    const questions = ["¿Tu vientre tiene más forma de pico (hacia adelante) que redondo (hacia los lados)?","¿Tus antojos principales han sido cosas saladas o ácidas en lugar de cosas dulces?","¿Tu piel se ha mantenido libre de acné y con buen brillo durante el embarazo?","¿La frecuencia cardíaca del bebé en tu último eco fue menor a 140 latidos por minuto?","¿Has sentido menos náuseas matutinas en este embarazo comparado con lo habitual?"];
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

    const results = ["ALTA PROBABILIDAD: NIÑA 👧 (Tus síntomas apuntan a exceso de estrógenos)","PROBABILIDAD MIXTA: 50/50 👶 (Tienes síntomas de ambos géneros)","ALTA PROBABILIDAD: NIÑO 👦 (Los marcadores apuntan a carga de testosterona fetal)"];

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-pink-400 to-blue-500 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-white/80 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-sm">👶 Predicción del Sexo del Bebé</h1>
                    <p className="text-white/90 mt-2 font-medium text-lg">Descubre qué será tu bebé respondiendo este test rápido</p>
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
                    <AdBanner variant="horizontal" />
                </div>

                <StudyCTA 
                    title={"Confirma el sexo de tu bebé con 99% de precisión hoy"}
                    description={"Un ultrasonido puede equivocarse si el bebé cruza las piernas. Nuestro Estudio de Sexo Fetal en Sangre Materna busca el Cromosoma Y directamente en tu sangre. Seguro desde la semana 10."}
                    actionText={"Cotizar Sexo Fetal en Sangre"}
                    type="estudio"
                    link={"https://wa.me/527757371811?text=Hola,%20me%20interesa%20el%20estudio%20de%20Sexo%20Fetal%20en%20Sangre"}
                />
            </div>
        </main>
    );
}
