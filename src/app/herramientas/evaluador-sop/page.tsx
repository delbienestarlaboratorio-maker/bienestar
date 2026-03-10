'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function EvaluadorSOPPage() {
    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);
    const [evaluado, setEvaluado] = useState(false);

    const count = (c1 ? 1 : 0) + (c2 ? 1 : 0) + (c3 ? 1 : 0);
    const positivo = count >= 2;

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-pink-600 to-rose-600 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-pink-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🌸 Criterios SOP</h1>
                    <p className="text-pink-100 mt-2">Detección de Síndrome de Ovario Poliquístico (Criterios de Rotterdam)</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">El diagnóstico formal del SOP requiere la presencia de al menos 2 de los 3 Criterios de Rotterdam, además de excluir otras etiologías endocrinas.</p>

                    <div className="space-y-4 mb-8">
                        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                            <input type="checkbox" checked={c1} onChange={(e) => setC1(e.target.checked)} className="mt-1 w-5 h-5 text-pink-600 rounded" />
                            <div>
                                <span className="block font-bold text-gray-800">1. Oligoovulación / Anovulación</span>
                                <span className="block text-sm text-gray-500">Ausencia de menstruación o ciclos irregulares superiores a 35 días.</span>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                            <input type="checkbox" checked={c2} onChange={(e) => setC2(e.target.checked)} className="mt-1 w-5 h-5 text-pink-600 rounded" />
                            <div>
                                <span className="block font-bold text-gray-800">2. Hiperandrogenismo (Clínico o Bioquímico)</span>
                                <span className="block text-sm text-gray-500">Exceso de vello facial/corporal (hirsutismo), acné severo persistente, pérdida de cabello, o andrógenos altos detectados en análisis de sangre.</span>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                            <input type="checkbox" checked={c3} onChange={(e) => setC3(e.target.checked)} className="mt-1 w-5 h-5 text-pink-600 rounded" />
                            <div>
                                <span className="block font-bold text-gray-800">3. Ovarios Poliquísticos PCOs (Ecografía)</span>
                                <span className="block text-sm text-gray-500">Hallazgo de múltiples folículos (≥12 en al menos un ovario) o volumen ovárico aumentado en el ultrasonido.</span>
                            </div>
                        </label>
                    </div>

                    <button onClick={() => setEvaluado(true)}
                        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">
                        Evaluar Criterios
                    </button>

                    {evaluado && (
                        <div className="mt-8 animate-in fade-in">
                            <div className={`rounded-2xl p-6 text-center mb-6 ${positivo ? 'bg-red-50' : 'bg-green-50'}`}>
                                <p className="text-4xl mb-2">{positivo ? '⚠️' : '✅'}</p>
                                <p className={`text-xl font-bold ${positivo ? 'text-red-700' : 'text-green-700'}`}>
                                    {positivo ? 'Criterios Positivos para SOP' : 'No cumple Criterios de Rotterdam'}
                                </p>
                                <p className="text-gray-600 mt-2 text-sm">
                                    Marcaste {count} de 3 criterios. {positivo && "Acude a tu ginecólogo/endocrinólogo para ratificar el diagnóstico."}
                                </p>
                            </div>

                            <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-6 mt-6">
                                <h3 className="font-bold text-pink-900 text-lg mb-3">🔬 Panel Analítico Femenino</h3>
                                <p className="text-gray-700 text-sm mb-4">Para confirmar el hiperandrogenismo bioquímico o descartar otras causas metabólicas asociadas al SOP (como resistencia a la insulina pre-diabetes), sugerimos:</p>
                                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 mb-4">
                                    <li>Perfil Hormonal Ginecológico Básico (LH/FSH ratio)</li>
                                    <li>Testosterona Total y Libre</li>
                                    <li>Índice HOMA-IR (Glucosa e Insulina)</li>
                                    <li>Perfil Tiroideo (TSH, T4L)</li>
                                </ul>
                                <Link href="/estudios/analisis-clinicos"
                                    className="inline-block bg-pink-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-pink-800 transition-colors">
                                    Ver Estudios Relacionados →
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                <StudyCTA
                    title={`Diagnóstico Hormonal Femenino`}
                    description={`Si presentas acné, caída de cabello o ciclos irregulares, el SOP es probable. Un Perfil Hormonal Ginecológico (LH, FSH, Prolactina, Testosterona) confirmará el diagnóstico.`}
                    actionText={`Cotizar Perfil Femenino`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Perfil%20Femenino*`}
                    type="estudio"
                />

                <div className="mt-8">
                    
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía Ginecológica Endocrina: Evaluación del Síndrome de Ovario Poliquístico (SOP)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score de Evaluación de o de U SOP a U y O O O O U genérico es O a un conjunto clínico Inmenso estandarizado nacional basado al de inmenso genéricamente en de los puramente U inmensa inmenso Criterios del Consenso inmenso a de a a Rotterdam o de al u O y de andrógenos al U inmenso o u el U u U e para al inmenso U ayudar en la inmenso U de u inmensa y a Inmenso al a de a a el diagnóstico o de inmenso hiperandrogenismo inmensurables O u y (Vello excesivo, acné) O y e O u la inmensa anovulación (Ausencia Menstruación, Amenorrea).</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia Metabólica Subyacente</h4>
           <p className="text-red-700 m-0">El SOP puramente no genéricamente inmenso u genéricamente U U es sólo un inmenso O u problema u U inmenso o u O ginecológico u al Inmenso al a U u; es U O o en a a genérico genérico u inmenso inmensurable Inmensurable U u de o fundamentalmente U una genérica genéricamente O Inmensurables inmenso insulinoresistencia genérica.</p>
       </div>

       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Estudios Complementarios Clínicos (Panel Ovárico)</h3>
       <ul>
           <li><a href="/estudios/perfiles/perfil-hormonal-femenino" className="text-blue-600 font-semibold hover:underline">Perfil Ginecológico Femenino (Para testosterona y LH/FSH)</a></li>
           <li><a href="/estudios/analisis-clinicos/resistencia-a-la-insulina-homa-ir" className="text-blue-600 font-semibold hover:underline">Resistencia a la Insulina HOMA-IR</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" />
                </div>
            </div>
        </main>
    );
}
