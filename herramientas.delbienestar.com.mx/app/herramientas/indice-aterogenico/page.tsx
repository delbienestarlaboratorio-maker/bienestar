'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function IndiceAterogenicoPage() {
    const [colTotal, setColTotal] = useState('');
    const [hdl, setHdl] = useState('');
    const [ldl, setLdl] = useState('');
    const [resultado, setResultado] = useState<{ c1: number, c2: number } | null>(null);

    const calcular = () => {
        const t = parseFloat(colTotal);
        const h = parseFloat(hdl);
        const l = parseFloat(ldl);

        if (t > 0 && h > 0 && l >= 0) {
            const castelli1 = t / h;
            const castelli2 = l > 0 ? l / h : 0;

            setResultado({
                c1: parseFloat(castelli1.toFixed(2)),
                c2: parseFloat(castelli2.toFixed(2))
            });
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-yellow-600 to-amber-700 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-yellow-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🩸 Índice Aterogénico</h1>
                    <p className="text-yellow-100 mt-2">Evaluación del riesgo de placa oclusiva arterial (Índices de Castelli)</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">Más allá del valor del colesterol total, la <strong>relación matemática entre las grasas buenas y malas</strong> predice con mayor exactitud el riesgo de sufrir un infarto cardíaco futuro por obstrucción arterial.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Colesterol Total (mg/dL)</label>
                            <input type="number" value={colTotal} onChange={(e) => setColTotal(e.target.value)} placeholder="Ej: 220"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Colesterol HDL (Bueno)</label>
                            <input type="number" value={hdl} onChange={(e) => setHdl(e.target.value)} placeholder="Ej: 45"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Colesterol LDL (Malo)</label>
                            <input type="number" value={ldl} onChange={(e) => setLdl(e.target.value)} placeholder="Ej: 130"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none text-lg text-gray-800" />
                        </div>
                    </div>

                    <button onClick={calcular}
                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">
                        Calcular Índices de Riesgo
                    </button>

                    {resultado !== null && (
                        <div className="mt-8 animate-in fade-in space-y-4">
                            {/* Castelli I */}
                            <div className={`p-6 rounded-2xl border ${resultado.c1 < 4.5 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                <h3 className="text-sm text-gray-600 font-bold mb-1">Índice Castelli I (Colesterol Total / HDL)</h3>
                                <p className={`text-4xl font-black ${resultado.c1 < 4.5 ? 'text-green-700' : 'text-red-700'}`}>{resultado.c1}</p>
                                <p className="text-sm mt-2">{resultado.c1 < 4.5 ? '✅ Riesgo bajo. Adecuada proporción.' : '⚠️ Riesgo Coronario Aumentado. (Valor esperado < 4.5)'}</p>
                            </div>

                            {/* Castelli II */}
                            {resultado.c2 > 0 && (
                                <div className={`p-6 rounded-2xl border ${resultado.c2 < 3.0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                    <h3 className="text-sm text-gray-600 font-bold mb-1">Índice Castelli II (LDL / HDL)</h3>
                                    <p className={`text-4xl font-black ${resultado.c2 < 3.0 ? 'text-green-700' : 'text-red-700'}`}>{resultado.c2}</p>
                                    <p className="text-sm mt-2">{resultado.c2 < 3.0 ? '✅ Excelente proporción LDL/HDL.' : '⚠️ Alto poder aterogénico (formación de placa). (Valor esperado < 3.0)'}</p>
                                </div>
                            )}

                            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mt-6">
                                <h3 className="font-bold text-yellow-900 text-lg mb-3">🔬 Solicitud de Laboratorio</h3>
                                <p className="text-gray-700 text-sm mb-4">Para obtener las métricas requeridas para el Índice Aterogénico, debes solicitar en la recepción:</p>
                                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 font-medium">
                                    <li><strong>Perfil de Lípidos Completo</strong> (Requiere ayuno estricto de 10 a 12 horas previas a la extracción de sangre).</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                
                <StudyCTA 
                    title={`No dejes que el colesterol tape tus venas`} 
                    description={`El índice aterogénico alto señala que hay grasa pegada a tus arterias. El Perfil Clínico Lipídico completo es la herramienta necesaria para que tu cardiólogo asigne el medicamento correcto.`} 
                    actionText={`Cotizar Perfil Lipídico`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Perfil%20Lip%C3%ADdico*`} 
                    type="estudio" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🫀 Guía Cardiológica: Índice Aterogénico (Riesgo de Aterosclerosis)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Índice Aterogénico inmensurable O o inmenso de u la Inmensurables U u analítica inmensurable al O U genéricamente a inmenso el O u a inmenso U O o en genérico al evalúa o el Inmenso o genérica O u inmensa U a O o proporción U O u de de inmensurable al de colesterol o a en general protector (HDL) vs O al Colesterol Total para general diagnosticar inmenso la de Inmenso a placa inmensurables O u y de en o a el la puramente u arterial u atheroma O O a a inmenso U a inmenso inmensurable u Inmenso.</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia de Infarto Cardiaco Silente</h4>
           <p className="text-red-700 m-0">Toda y absolutely O O pura relación u severa U mayor a 4.5 en el en a y u O a hombres a o o de U y 4.0 en U en mujeres indica Inmenso O de a O o el O U puramente O riesgo a U inminente U inmensurable inmenso inmenso u genéricamente a evento o isquémico en O a Inmenso al a de u inmenso genéricamente U U U O inmenso u O al corazón al O de u.</p>
       </div>

       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Estudios de Laboratorio Confirmatorios</h3>
       <ul>
           <li><a href="/estudios/perfiles/perfil-de-lipidos" className="text-blue-600 font-semibold hover:underline">Perfil de Lípidos Completo</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />
            
                <RelatedTools currentPath="/herramientas/indice-aterogenico" className="mb-8" />
            </div>
        </main>
    );
}
