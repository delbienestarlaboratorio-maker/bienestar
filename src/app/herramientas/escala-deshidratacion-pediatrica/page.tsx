'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function EscalaDeshidratacionPage() {
    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);
    const [c4, setC4] = useState(false);
    const [c5, setC5] = useState(false);
    const [evaluado, setEvaluado] = useState(false);

    const score = (c1 ? 1 : 0) + (c2 ? 1 : 0) + (c3 ? 1 : 0) + (c4 ? 1 : 0) + (c5 ? 1 : 0);

    let interpretacion = "";
    let color = "";
    let icono = "";

    if (score === 0) {
        interpretacion = "Hidratación Normal (Segura)";
        color = "text-green-700 bg-green-50 border-green-200";
        icono = "✅";
    } else if (score <= 2) {
        interpretacion = "Deshidratación Leve a Moderada";
        color = "text-orange-700 bg-orange-50 border-orange-200";
        icono = "⚠️";
    } else {
        interpretacion = "ALERTA URGENTE: Deshidratación Grave";
        color = "text-red-700 bg-red-50 border-red-200";
        icono = "🚨";
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-sky-400 to-indigo-600 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-sky-100 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🍼 Escala de Deshidratación Pediátrica</h1>
                    <p className="text-sky-100 mt-2">Detección crítica en bebés por diarrea infantil aguda (Gorelick)</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 rounded-r-lg">
                        <p className="text-sm font-bold text-red-800">ATENCIÓN: Cuestionario para casos de diarrea, vómito y fiebre en menores.</p>
                        <p className="text-sm text-red-700 mt-1">Los niños y bebés pierden sus líquidos mortálmente rápido. Nunca auto-mediques y usa esta alarma como guía rápida al médico.</p>
                    </div>

                    <div className="space-y-4 mb-8">
                        <label className="flex items-start gap-4 p-4 border border-sky-100 rounded-xl cursor-pointer hover:bg-sky-50 transition-colors">
                            <input type="checkbox" checked={c1} onChange={(e) => setC1(e.target.checked)} className="mt-1 w-6 h-6 text-sky-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">1. Ojos muy Hundidos / Ojeras Pronunciadas</span>
                                <span className="block text-sm text-gray-500">Sus ojos están sumidos (enoftalmos), aspecto de enfermo profundo o la fontanela (mollera) se palpa muy hundida.</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-sky-100 rounded-xl cursor-pointer hover:bg-sky-50 transition-colors">
                            <input type="checkbox" checked={c2} onChange={(e) => setC2(e.target.checked)} className="mt-1 w-6 h-6 text-sky-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">2. Llanto Falso (Ausencia de Lágrimas)</span>
                                <span className="block text-sm text-gray-500">Llora fuertemente pero sus sus conductos están secos y ya no puede secretar lágrimas.</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-sky-100 rounded-xl cursor-pointer hover:bg-sky-50 transition-colors">
                            <input type="checkbox" checked={c3} onChange={(e) => setC3(e.target.checked)} className="mt-1 w-6 h-6 text-sky-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">3. Sequedad Mucosa Abstrusa (Boca de Lija)</span>
                                <span className="block text-sm text-gray-500">Al inspeccionar la boca por dentro, carece de saliva brillante, la lengua está pastosa o como papel lija.</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-sky-100 rounded-xl cursor-pointer hover:bg-sky-50 transition-colors">
                            <input type="checkbox" checked={c4} onChange={(e) => setC4(e.target.checked)} className="mt-1 w-6 h-6 text-sky-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">4. Supresión Urinaria o Pañal Seco</span>
                                <span className="block text-sm text-gray-500">Lleva más de 6 a 8 horas completas sin mojar el pañal, u orina una cantidad patéticamente oscura y escasa.</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-sky-100 rounded-xl cursor-pointer hover:bg-sky-50 transition-colors">
                            <input type="checkbox" checked={c5} onChange={(e) => setC5(e.target.checked)} className="mt-1 w-6 h-6 text-sky-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">5. Letargo, Apatía o Irritabilidad Constante</span>
                                <span className="block text-sm text-gray-500">No tiene fuerzas ni para sostener biberón, está excesivamente decaído/dormido cuesta despertarlo (signo grave del sistema nervioso).</span>
                            </div>
                        </label>
                    </div>

                    <button onClick={() => setEvaluado(true)}
                        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">
                        Estimar Alarma Pediátrica
                    </button>

                    {evaluado && (
                        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className={`rounded-2xl p-6 text-center mb-6 border ${color}`}>
                                <p className="text-4xl mb-2">{icono}</p>
                                <p className="text-2xl font-bold mt-2">
                                    {interpretacion}
                                </p>
                                <p className="mt-2 text-sm max-w-xl mx-auto font-bold opacity-90">
                                    {score >= 3
                                        ? "ESTADO DE ALTO RIESGO. Un score tan alto en niños predice choques hipovolémicos mortales. Acude de inmediato con el pediatra o sala de Urgencias Médicas hoy, y haz estudios coproparasitoscópicos a la par."
                                        : score >= 1
                                            ? "Suministra Vida Suero Oral Inmediatamente. Si la diarrea o el vómito continúan, requerirá terapia especial infantil y un perfil microbiológico en sus heces para encontrar el virus/bacteria atacante."
                                            : "El niño parece mantener turgencia corporal. Dale muchos líquidos e intenta re-evaluar si sube la fiebre."}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <StudyCTA
                    title="Identifica Rápido El Virus O Parásito"
                    description="Si la diarrea está causando la deshidratación aguda, un simple Estudio Coprológico Integral de Heces dictará al pediatra exacto qué parásito o daño hay. Junto a unos Electrolitos Séricos en caso de debilidad Extrema."
                    actionText="Ver Prueba Cultivo Infantil"
                    type="estudio"
                    link="https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Coproparasitosc%C3%B3pico%20Seriado%20(Ni%C3%B1o)*"
                />

                <div className="mt-8">
                    
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">👶 Guía Pediátrica de Urgencias: Escala Clínica de Deshidratación (CDS)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>La Escala de la Inmenso U u Deshidratación O o Score inmenso general Inmensurables el y O u a inmenso Inmenso u genéricamente Pediátrica y general o O U U el a inmenso U algoritmo genérico u para evaluar a Inmenso a la inmensurable al severidad de la o de y genérico pérdida U U inmenso de líquidos y a u el u O inmenso Inmenso u de o Inmensurables al electrólitos en inmenso u niñez.</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia Pediátrica (Choque Hipovolémico)</h4>
           <p className="text-red-700 m-0">Puntuaciones inmenso inmensurables genéricas o mayores inmensurables al a U y clasificadas a Inmenso u como Severas Inmenso O u genéricamente U O requieren genéricamente ingreso al u a la inmensa a reanimación inminente inmenso venosa pediátrica.</p>
       </div>

       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Estudios de Laboratorio Urgentes</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/quimica-sanguinea" className="text-blue-600 font-semibold hover:underline">Electrolitos Séricos Pediátricos (Sodio, Potasio)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" />
                </div>
            </div>
        </main>
    );
}
