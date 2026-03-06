'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function RiesgoHipotiroidismoPage() {
    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);
    const [c4, setC4] = useState(false);
    const [c5, setC5] = useState(false);
    const [c6, setC6] = useState(false);
    const [evaluado, setEvaluado] = useState(false);

    const count = (c1 ? 1 : 0) + (c2 ? 1 : 0) + (c3 ? 1 : 0) + (c4 ? 1 : 0) + (c5 ? 1 : 0) + (c6 ? 1 : 0);
    const riesgo = count >= 3;

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-purple-600 to-fuchsia-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-purple-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🦋 Riesgo de Hipotiroidismo</h1>
                    <p className="text-purple-100 mt-2">Detección temprana de la deficiencia de la Glándula Tiroides</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">
                        La glándula tiroides es el motor energético del cuerpo. Cuando trabaja de forma lenta (hipotiroidismo), todos los sistemas de tu cuerpo comienzan a frenarse lentamente, causando estragos metabólicos.
                    </p>

                    <div className="space-y-4 mb-8">
                        <label className="flex items-start gap-4 p-4 border border-purple-100 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors">
                            <input type="checkbox" checked={c1} onChange={(e) => setC1(e.target.checked)} className="mt-1 w-6 h-6 text-purple-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">1. Fatiga Extrema y Sueño Diurno</span>
                                <span className="block text-sm text-gray-500">Sentirse agotado, letargo profundo o dormir excesivamente pero despertar cansado.</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-purple-100 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors">
                            <input type="checkbox" checked={c2} onChange={(e) => setC2(e.target.checked)} className="mt-1 w-6 h-6 text-purple-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">2. Ganancia de Peso Inexplicable</span>
                                <span className="block text-sm text-gray-500">Subir de peso rápidamente (o incapacidad total de adelgazar) a pesar de estar a dieta o hacer ejercicio.</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-purple-100 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors">
                            <input type="checkbox" checked={c3} onChange={(e) => setC3(e.target.checked)} className="mt-1 w-6 h-6 text-purple-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">3. Frialdad Constante</span>
                                <span className="block text-sm text-gray-500">Sentir mucho frío todo el tiempo, incluso cuando las demás personas a tu alrededor sienten calor.</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-purple-100 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors">
                            <input type="checkbox" checked={c4} onChange={(e) => setC4(e.target.checked)} className="mt-1 w-6 h-6 text-purple-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">4. Caída del Cabello y Piel Áspera</span>
                                <span className="block text-sm text-gray-500">Pérdida inusual de pelo crónico (incluyendo las cejas) y piel anormalmente seca, engrosada o agrietada.</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-purple-100 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors">
                            <input type="checkbox" checked={c5} onChange={(e) => setC5(e.target.checked)} className="mt-1 w-6 h-6 text-purple-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">5. Estreñimiento Crónico</span>
                                <span className="block text-sm text-gray-500">Dificultad constante para ir al baño de forma natural (debido al tránsito intestinal lento).</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-purple-100 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors">
                            <input type="checkbox" checked={c6} onChange={(e) => setC6(e.target.checked)} className="mt-1 w-6 h-6 text-purple-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">6. Apatía, Tristeza o Niebla Mental</span>
                                <span className="block text-sm text-gray-500">Sentirse triste sin razón (como depresión enmascarada), olvidos constantes y bajo enfoque intelectual.</span>
                            </div>
                        </label>
                    </div>

                    <button onClick={() => setEvaluado(true)}
                        className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">
                        Medir Score Metabólico
                    </button>

                    {evaluado && (
                        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className={`rounded-2xl p-6 text-center mb-6 
                                ${riesgo ? 'bg-fuchsia-50 border border-fuchsia-200' : 'bg-blue-50 border border-blue-200'}`}>
                                <p className="text-4xl mb-2">{riesgo ? '⚠️' : '✅'}</p>
                                <p className={`text-xl font-bold ${riesgo ? 'text-fuchsia-800' : 'text-blue-700'}`}>
                                    {riesgo ? 'Posible Falla Tiroidea Temprana u Oculta' : 'Bajo Riesgo Hormonal Tiroideo'}
                                </p>
                                <p className="text-gray-600 mt-2 text-sm max-w-xl mx-auto">
                                    {riesgo
                                        ? `Presentas ${count} marcadores típicos de metabolismo basal paralizado. No sigas haciendo dietas restrictivas ni ignores este agotamiento; requieres análisis endocrino sanguíneo hoy mismo.`
                                        : 'Tu fatiga podría deberse a otros factores no asociados a la glándula tiroidea (como estrés, anemia de hierro o desgaste muscular).'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <StudyCTA
                    title="Conoce Exactamente el Nivel de tu Glándula"
                    description="El Perfil Tiroideo completo (TSH de alta sensibilidad, T3 y T4 Libres) permite a tu médico administrar con precisión milimétrica la dosis de Levotiroxina que revitalizará de nuevo tus días, ayudándote a perder peso y energía."
                    actionText="Cotizar Perfil Tiroideo I"
                    type="estudio"
                    link="https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Perfil%20Tiroideo%20Completo*"
                />

                <div className="mt-8">
                    <AdBanner variant="horizontal" />
                </div>
            </div>
        </main>
    );
}
