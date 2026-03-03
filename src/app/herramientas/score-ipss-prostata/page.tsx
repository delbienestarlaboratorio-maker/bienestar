'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

const questions = [
    { text: "Durante el último mes, ¿cuántas veces ha tenido la sensación de no vaciar completamente su vejiga al terminar de orinar?", id: 'vaciado' },
    { text: "¿Cuántas veces ha tenido que volver a orinar en las dos horas siguientes después de haber orinado?", id: 'frecuencia' },
    { text: "¿Cuántas veces ha notado que, al orinar, para y vuelve a comenzar varias veces?", id: 'intermitencia' },
    { text: "¿Cuántas veces ha tenido dificultad para posponer la micción (aguantarse las ganas de orinar)?", id: 'urgencia' },
    { text: "¿Cuántas veces ha observado que el chorro de orina es débil?", id: 'chorro' },
    { text: "¿Cuántas veces ha tenido que empujar o hacer esfuerzo para comenzar a orinar?", id: 'esfuerzo' },
    { text: "¿Cuántas veces suele tener que levantarse para orinar desde que se va a la cama en la noche hasta que se levanta por la mañana?", id: 'nicturia' }
];

const answers = ["Ninguna vez (0)", "Menos de 1 de cada 5 veces (1)", "Menos de la mitad de las veces (2)", "La mitad de las veces (3)", "Más de la mitad de las veces (4)", "Casi siempre (5)"];

export default function ScoreIPSSProstataPage() {
    const [scores, setScores] = useState<number[]>(Array(7).fill(0));
    const [evaluado, setEvaluado] = useState(false);

    const updateScore = (index: number, val: number) => {
        const newScores = [...scores];
        newScores[index] = val;
        setScores(newScores);
    };

    const total = scores.reduce((a, b) => a + b, 0);

    let interpretacion = "";
    let severidad = "";
    let color = "";

    if (total <= 7) {
        interpretacion = "Síntomas Leves";
        severidad = "Baja";
        color = "text-green-600 bg-green-50 border-green-200";
    } else if (total <= 19) {
        interpretacion = "Síntomas Moderados";
        severidad = "Moderada";
        color = "text-orange-600 bg-orange-50 border-orange-200";
    } else {
        interpretacion = "Síntomas Severos";
        severidad = "Alta";
        color = "text-red-700 bg-red-50 border-red-200";
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <Link href="/herramientas" className="text-blue-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">💧 Score IPSS Próstata</h1>
                    <p className="text-blue-100 mt-2">Cuestionario Internacional de Síntomas Prostáticos (HPB)</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">
                        La Hiperplasia Prostática Benigna (crecimiento de la próstata) comprime la uretra a partir de los 45 años, arruinando la calidad de vida y amenazando la salud de los riñones si la orina se estanca.
                    </p>

                    <div className="space-y-8 mb-8">
                        {questions.map((q, idx) => (
                            <div key={idx} className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                <p className="font-bold text-gray-800 mb-4">{idx + 1}. {q.text}</p>
                                <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
                                    {answers.map((ans, ansIdx) => (
                                        <button
                                            key={ansIdx}
                                            onClick={() => updateScore(idx, ansIdx)}
                                            className={`text-xs p-2 rounded-lg border transition-all ${scores[idx] === ansIdx
                                                    ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-md'
                                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300'
                                                }`}
                                        >
                                            {ans}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={() => setEvaluado(true)}
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">
                        Calcular Mi Puntuación
                    </button>

                    {evaluado && (
                        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className={`rounded-2xl p-6 text-center mb-6 border ${color}`}>
                                <p className="text-5xl font-black mb-1">{total} <span className="text-xl font-normal opacity-70">/ 35 puntos</span></p>
                                <p className="text-2xl font-bold mt-2">
                                    {interpretacion}
                                </p>
                                <p className="mt-2 text-sm opacity-90 max-w-xl mx-auto">
                                    {total > 7
                                        ? "El flujo de orina se está obstruyendo gravemente. Si la orina retrocede o se infecta por no poder salir, la próstata puede provocar daño renal agudo."
                                        : "Tus síntomas prostáticos están controlados. Te felicitamos por monitorearte a tiempo."}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <StudyCTA
                    title="Vigila el Cáncer de Próstata y las Infecciones Ocultas"
                    description="El aumento de tamaño de la próstata es normal, pero descartar cáncer es obligatorio si pasas de 40 años o hay síntomas urinarios. El Examen de Antígeno Prostático (PSA) en sangre y un Urocultivo salvan vidas en cuestión de días."
                    actionText="Cotizar Examen de Próstata"
                    type="doctor"
                    link="https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Sangre:%20Ant%C3%ADgeno%20Prost%C3%A1tico%20PSA%20y%20Orina(Cultivo)*"
                />

                <div className="mt-8">
                    <AdBanner variant="horizontal" />
                </div>
            </div>
        </main>
    );
}
