'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ViralToolPage() {
    const questions = ["¿Te hace más feliz que tu pareja te abrace de la nada que recibir un regalo de cumpleaños?","¿Consideras que es una gran muestra de amor que alguien te cocine tu comida favorita o te lave el auto?","¿Prefieres pasar 2 horas platicando a solas que ir al cine espectacular pero sin hablar?","¿Un mensaje de texto sorpresivo diciendo 'Estoy orgulloso de ti' puede mejorarte toda la semana?","¿Guardas todos los regalitos (incluso boletos de cine o notas) porque el valor simbólico te fascina?"];
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

    const results = ["Tu Lenguaje Principal: ACTOS DE SERVICIO y PALABRAS. Amas la comunicación y que te demuestren interés con ayuda práctica.","Tu Lenguaje Principal: TIEMPO DE CALIDAD y CONTACTO FÍSICO. Eres sumamente kinestésico; necesitas presencia física y mimos constantes.","Tu Lenguaje Principal: REGALOS y AFIRMACIÓN. Te sientes amado cuando te validan verbalmente y tienen detalles tangibles que demuestran que pensaron en ti."];

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-pink-500 to-red-500 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-white/80 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-sm">❤️ Las 5 Formas de Amar</h1>
                    <p className="text-white/90 mt-2 font-medium text-lg">Descubre qué idioma del amor exiges y ofreces</p>
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
                    title={"El amor a veces es ciego (y también las ETS)"}
                    description={"Antes de formalizar cualquier conexión íntima, la verdadera muestra de amor del Siglo XXI es compartir un panel de salud sexual. Protégete a ti y a tu pareja."}
                    actionText={"Cotizar Paquete Parejas (ETS)"}
                    type="estudio"
                    link={"https://wa.me/527757371811?text=Hola,%20me%20interesa%20un%20chequeo%20nupcial%20o%20de%20ETS%20para%20m%C3%AD%20y%20mi%20pareja"}
                />
            </div>
        </main>
    );
}
