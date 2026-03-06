'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function EscalaFragilidadPage() {
    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);
    const [c4, setC4] = useState(false);
    const [c5, setC5] = useState(false);
    const [evaluado, setEvaluado] = useState(false);

    const score = (c1 ? 1 : 0) + (c2 ? 1 : 0) + (c3 ? 1 : 0) + (c4 ? 1 : 0) + (c5 ? 1 : 0);

    let interpretacion = "";
    let color = "";
    if (score === 0) {
        interpretacion = "Autonomía Robusta";
        color = "text-green-700 bg-green-50 border-green-200";
    } else if (score <= 2) {
        interpretacion = "Fase Pre-Frágil";
        color = "text-orange-700 bg-orange-50 border-orange-200";
    } else {
        interpretacion = "Síndrome de Fragilidad Geriátrica";
        color = "text-red-700 bg-red-50 border-red-200";
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-emerald-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">👴👵 Escala de Fragilidad (FRAIL)</h1>
                    <p className="text-emerald-100 mt-2">Medición Geriátrica Oficial del Riesgo Funcional en Adultos Mayores</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">
                        La escala FRAIL prevé a tiempo el deterioro biológico de un envejecimiento acelerado, pudiendo revertirlo antes de una caída mortal o déficit cognitivo.
                    </p>

                    <div className="space-y-4 mb-8">
                        <label className="flex items-start gap-4 p-4 border border-emerald-100 rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors">
                            <input type="checkbox" checked={c1} onChange={(e) => setC1(e.target.checked)} className="mt-1 w-6 h-6 text-emerald-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">F (Fatigue): Fatiga Crónica</span>
                                <span className="block text-sm text-gray-500">¿Siente que la mayor parte del tiempo, durante el último mes, hacer sus tareas diarias implicaba un esfuerzo extremo insuperable?</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-emerald-100 rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors">
                            <input type="checkbox" checked={c2} onChange={(e) => setC2(e.target.checked)} className="mt-1 w-6 h-6 text-emerald-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">R (Resistance): Pérdida de Resistencia Muscular</span>
                                <span className="block text-sm text-gray-500">Por sí mismo o sin ayuda (sin barandal), ¿tiene dificultad enorme para subir un piso completo de escaleras?</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-emerald-100 rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors">
                            <input type="checkbox" checked={c3} onChange={(e) => setC3(e.target.checked)} className="mt-1 w-6 h-6 text-emerald-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">A (Aerobic): Limitación Aeróbica / Caminata</span>
                                <span className="block text-sm text-gray-500">Por sí mismo, y sin apoyarse o descansar: ¿tiene dificultad grande para caminar la distancia de una cuadra entera?</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-emerald-100 rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors">
                            <input type="checkbox" checked={c4} onChange={(e) => setC4(e.target.checked)} className="mt-1 w-6 h-6 text-emerald-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">I (Illness): Interferencia por Enfermades Mixtas</span>
                                <span className="block text-sm text-gray-500">¿El geriatra ha dictaminado que tiene 5 o más enfermedades crónicas simultáneas? (HTA, Diabetes, Cáncer, Artritis, Enfermedad Renal, Demencia, etc).</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-emerald-100 rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors">
                            <input type="checkbox" checked={c5} onChange={(e) => setC5(e.target.checked)} className="mt-1 w-6 h-6 text-emerald-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">L (Loss of weight): Pérdida de Peso Desnutricional</span>
                                <span className="block text-sm text-gray-500">¿Ha perdido sin quererlo más del 5% de su peso base corporal en los últimos 6 o 12 meses? (Pérdida de sarcopenia - músculo).</span>
                            </div>
                        </label>
                    </div>

                    <button onClick={() => setEvaluado(true)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">
                        Calcular Puntos FRAIL
                    </button>

                    {evaluado && (
                        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className={`rounded-2xl p-6 text-center mb-6 border ${color}`}>
                                <p className="text-4xl font-black mb-1">{score} <span className="text-xl font-normal opacity-70">/ 5 puntos</span></p>
                                <p className="text-2xl font-bold mt-2">
                                    {interpretacion}
                                </p>
                                <p className="mt-2 text-sm opacity-90 max-w-xl mx-auto">
                                    {score >= 3
                                        ? "El grado de desgaste estructural requiere intervención integral. Es vital descartar anemia, medir reservas de proteínas o diagnosticar si sus riñones o hígado están fallando y debilitándole."
                                        : score >= 1
                                            ? "Punto exacto para detener el reloj fisiológico. Hay pérdida muscular detectada, pero los chequeos generales con Vitamina D y Nutrición prevendrán grandes caídas o huesos rotos."
                                            : "El adulto mantiene un estupendo vigor musculoesquelético para su cohorte biológica."}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <StudyCTA
                    title="Evita el agravamiento del adulto mayor"
                    description="Una Química Sanguínea Integral 30 elementos evaluará corazón, hígado, electrolitos y riñón de una vez. Y sumar la Vitamina D3 (Calcitriol) y el Calcio Sérico mostrará la resistencia de sus huesos antes de una caída letal."
                    actionText="Chequeo Integral Geriátrico"
                    type="checkup"
                    link="https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Qu%C3%ADmica%20Integral%20y%20Vitamina%20D3(Adulto%20Mayor)*"
                />

                <div className="mt-8">
                    <AdBanner variant="horizontal" />
                </div>
            </div>
        </main>
    );
}
