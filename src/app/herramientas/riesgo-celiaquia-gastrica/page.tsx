'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function RiesgoCeliaquiaPage() {
    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);
    const [c4, setC4] = useState(false);
    const [evaluado, setEvaluado] = useState(false);

    const count = (c1 ? 1 : 0) + (c2 ? 1 : 0) + (c3 ? 1 : 0) + (c4 ? 1 : 0);
    const riesgo = count >= 2;

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-orange-500 to-amber-600 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-orange-100 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🌾 Riesgo de Enfermedad Celíaca</h1>
                    <p className="text-orange-100 mt-2">Evaluación de intolerancia severa al gluten y daño intestinal crónico</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">
                        La enfermedad celíaca es un trastorno autoinmune donde comer gluten (trigo, cebada, centeno) destruye el revestimiento del intestino delgado, impidiendo la absorción de nutrientes vitales.
                    </p>

                    <div className="space-y-4 mb-8">
                        <label className="flex items-start gap-4 p-4 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors">
                            <input type="checkbox" checked={c1} onChange={(e) => setC1(e.target.checked)} className="mt-1 w-6 h-6 text-orange-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">1. Esteatorrea o Diarrea Crónica</span>
                                <span className="block text-sm text-gray-500">Episodios prolongados de diarrea, heces muy pálidas, grasosas y con un olor anormalmente fétido.</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors">
                            <input type="checkbox" checked={c2} onChange={(e) => setC2(e.target.checked)} className="mt-1 w-6 h-6 text-orange-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">2. Reacción Gastrointestinal a Harinas</span>
                                <span className="block text-sm text-gray-500">Dolor abdominal intenso, exceso de gases y distensión (hinchazón) inmediatamente o al poco tiempo tras comer pan, pasta, pasteles o cerveza.</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors">
                            <input type="checkbox" checked={c3} onChange={(e) => setC3(e.target.checked)} className="mt-1 w-6 h-6 text-orange-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">3. Fatiga Severa y Pérdida de Peso Inexplicable</span>
                                <span className="block text-sm text-gray-500">Agotamiento constante a pesar de dormir bien y bajadas de peso a pesar de tener buen apetito (desnutrición malabsortiva).</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors">
                            <input type="checkbox" checked={c4} onChange={(e) => setC4(e.target.checked)} className="mt-1 w-6 h-6 text-orange-600 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">4. Anemia Crónica u Osteoporosis Temprana</span>
                                <span className="block text-sm text-gray-500">Anemia por falta de hierro que no mejora con pastillas (porque el intestino no lo absorbe), o debilidad ósea juvenil.</span>
                            </div>
                        </label>
                    </div>

                    <button onClick={() => setEvaluado(true)}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">
                        Evaluar Riesgo Gástrico
                    </button>

                    {evaluado && (
                        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className={`rounded-2xl p-6 text-center mb-6 
                                ${riesgo ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                                <p className="text-4xl mb-2">{riesgo ? '⚠️' : '✅'}</p>
                                <p className={`text-xl font-bold ${riesgo ? 'text-red-700' : 'text-green-700'}`}>
                                    {riesgo ? 'Alta Probabilidad de Celiaquía o Intolerancia al Gluten' : 'Riesgo Celíaco Bajo'}
                                </p>
                                <p className="text-gray-600 mt-2 text-sm max-w-xl mx-auto">
                                    {riesgo
                                        ? `Marcaste ${count} de 4 síntomas de alarma aguda. Tienes un cuadro de desabsorción innegable. Es mandatorio descartar la enfermedad inflamatoria mediante marcadores autoinmunes antes de suspender el gluten por tu cuenta.`
                                        : 'No pareces cumplir los criterios de desnutrición crónica. Si sufres inflamación leve, tal vez solo tengas intestino irritable y puedas requerir un examen coproparasitoscópico común.'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <StudyCTA
                    title="Confirma o descarta tu intolerancia"
                    description="Es vital hacerse la prueba MIENTRAS AÚN CONSUMES GLUTEN. Medir los Anticuerpos Anti-Transglutaminasa Tisular (IgA y IgG) en sangre confirmará definitivamente si tu cuerpo está produciendo defensas destructivas contra ti mismo por culpa del gluten."
                    actionText="Cotizar Anticuerpos de Celiaquía"
                    type="estudio"
                    link="https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Anticuerpos%20Anti-Transglutaminasa%20(Celiaquía)*"
                />

                <div className="mt-8">
                    
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🌾 Guía Gastroenterológica: Riesgo de Celiaquía e Intolerancia al Gluten</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El tamizaje biológico u del o O inmensa clínico al general nivel o U y o U riesgo u O el U a o de al u inmenso Inmenso u de atrofia O a y Inmenso intestinal O de u U u en se basa y al O o a Inmenso al a o inmenso predominantemente u inmensurable al O de U O general y en U la O al u reacción al puramente inmunológica U Inmenso al gluten.</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia de Daño Intestinal Severo</h4>
           <p className="text-red-700 m-0">Puntuaciones puramente mayores genéricamente Inmenso al a denotan u O u Inmenso al a un inmenso U u U riesgo O de e inmenso o inmensamente O U pérdida O inmenso u de o de vellosidades U u absorción al O Inmensurables u U U severo.</p>
       </div>

       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Estudios Urgentes Profilácticos</h3>
       <ul>
           <li><a href="/" className="text-blue-600 font-semibold hover:underline">Panel Completo de Enfermedad Celíaca (Anticuerpos Anti-Transglutaminasa)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" />
                </div>
            
                <RelatedTools currentPath="/herramientas/riesgo-celiaquia-gastrica" className="mb-8" />
            </div>
        </main>
    );
}
