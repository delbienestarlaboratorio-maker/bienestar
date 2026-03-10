'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function RiesgoB12Page() {
    const [h, setH] = useState(false); // Hormigueo
    const [m, setM] = useState(false); // Memoria
    const [c, setC] = useState(false); // Cansancio / Palidez
    const [v, setV] = useState(false); // Vegano / Vegetariano
    const [g, setG] = useState(false); // Gastritis / Omeprazol / Metformina agudo
    const [l, setL] = useState(false); // Lengua roja lisa (Glotisis)
    const [activado, setActivado] = useState(false);

    const criticos = (h ? 1 : 0) + (m ? 1 : 0) + (l ? 1 : 0);
    const cofactores = (v ? 1 : 0) + (g ? 1 : 0);
    const score = criticos + cofactores + (c ? 1 : 0);

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-red-600 to-rose-700 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🩸 Evaluador Vitamina B12</h1>
                    <p className="text-red-100 mt-2">Detección de déficit neuropático y Anemia Megaloblástica</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">La vitamina B12 no solo previene un tipo oculto de anemia, sino que es el sustento físico de la "carcasa" de los nervios. Su déficit crónico puede causar daño neurológico permanente antes de que la anemia sea detectada.</p>

                    <div className="space-y-3 mb-8">
                        <label className="flex items-start gap-4 p-4 border border-red-100 rounded-xl cursor-pointer hover:bg-red-50 transition-colors">
                            <input type="checkbox" checked={h} onChange={(e) => { setH(e.target.checked); setActivado(true); }} className="mt-1 w-6 h-6 text-red-600 rounded" />
                            <div><span className="font-bold text-gray-800">Neuropatía Periférica</span><span className="block text-sm text-gray-500">Hormigueo persistente, ardor o "agujas" en manos y pies (en guante o calcetín).</span></div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-red-100 rounded-xl cursor-pointer hover:bg-red-50 transition-colors">
                            <input type="checkbox" checked={m} onChange={(e) => { setM(e.target.checked); setActivado(true); }} className="mt-1 w-6 h-6 text-red-600 rounded" />
                            <div><span className="font-bold text-gray-800">Niebla Mental / Deterioro Cognitivo</span><span className="block text-sm text-gray-500">Olvidos atípicos constantes, confusión, depresión inminente u oscilaciones de humor.</span></div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-red-100 rounded-xl cursor-pointer hover:bg-red-50 transition-colors">
                            <input type="checkbox" checked={l} onChange={(e) => { setL(e.target.checked); setActivado(true); }} className="mt-1 w-6 h-6 text-red-600 rounded" />
                            <div><span className="font-bold text-gray-800">Glositis (Lengua Bovina / Lisa)</span><span className="block text-sm text-gray-500">Pérdida de papilas gustativas, lengua brillante, roja, y dolorosa a los alimentos ácidos o calientes.</span></div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                            <input type="checkbox" checked={c} onChange={(e) => { setC(e.target.checked); setActivado(true); }} className="mt-1 w-6 h-6 text-gray-600 rounded" />
                            <div><span className="font-bold text-gray-800">Fatiga Extrema Inexplicable</span><span className="block text-sm text-gray-500">Palidez mucocutánea profunda, debilidad, latidos cardíacos irregulares.</span></div>
                        </label>
                        <div className="border-t border-gray-200 pt-4 mt-6">
                            <h4 className="font-bold text-gray-700 text-sm mb-3">Factores Causales Predisponentes</h4>
                            <label className="flex items-start gap-4 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors mb-2">
                                <input type="checkbox" checked={v} onChange={(e) => { setV(e.target.checked); setActivado(true); }} className="mt-1 w-5 h-5 text-gray-600 rounded" />
                                <div><span className="font-bold text-gray-800 text-sm">Dieta Estricta Libre de Vida Animal (Veganos/Años) o Bariátricos</span></div>
                            </label>
                            <label className="flex items-start gap-4 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                <input type="checkbox" checked={g} onChange={(e) => { setG(e.target.checked); setActivado(true); }} className="mt-1 w-5 h-5 text-gray-600 rounded" />
                                <div><span className="font-bold text-gray-800 text-sm">Uso diario de Omeprazol/Antiácidos crónico o Metformina prolongada</span></div>
                            </label>
                        </div>
                    </div>

                    {activado && (
                        <div className="mt-8 animate-in fade-in">
                            <div className={`p-6 rounded-2xl border text-center mb-6 
                                ${criticos > 0 ? 'bg-red-50 border-red-200 text-red-900' :
                                    cofactores > 0 ? 'bg-orange-50 border-orange-200 text-orange-900' :
                                        'bg-green-50 border-green-200 text-green-900'}`}>

                                <p className="text-xl font-bold mb-2">
                                    {criticos > 0 ? '⚠️ Alerta Roja Neurológica/Hematológica' :
                                        cofactores > 0 ? '⚠️ Probabilidad Subclínica de Deterioro' :
                                            '✅ Perfil de bajo riesgo'}
                                </p>
                                <p className="text-sm">
                                    {criticos > 0 ? 'Marcaste síntomas clave del déficit profundo de B12. Acude con tu médico de inmediato antes de que el daño nervioso avance.' :
                                        cofactores > 0 ? 'Tienes hábitos o toma de medicinas que boicotean el Factor Intrínseco en el estómago y destruyen la absorción de B12. Debes vigilar tus niveles séricos anualmente.' :
                                            'No cumples perfil agresivo de hipovitaminosis B12.'}
                                </p>
                            </div>

                            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                                <h3 className="font-bold text-red-900 text-lg mb-3">🔬 Requisito Sanguíneo</h3>
                                <p className="text-gray-700 text-sm mb-4">Para confirmar el diagnóstico de Anemia Megaloblástica o Síndrome de Déficit, requieres pruebas inmediatas de química especial:</p>
                                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 font-medium">
                                    <li>Vitamina B12 y Ácido Fólico en sangre (Juntos)</li>
                                    <li>Biometría Hemática Completa (Revisar el Volumen Corpuscular Medio - VCM - alterado si es &gt; 100 fL)</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                
                <StudyCTA 
                    title={`Resuelve tu problema neurológico hoy`} 
                    description={`Retrasar el diagnóstico de falta de Vitamina B12 provoca daños irreversibles al sistema nervioso. Mide los niveles de Ácido Fólico y B12 en suero hoy mismo.`} 
                    actionText={`Cotizar Ácido Fólico y B12`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20%C3%81cido%20F%C3%B3lico%20y%20B12*`} 
                    type="estudio" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩸 Guía Hematológica: Riesgo de Anemia Megaloblástica (Déficit B12)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El tamizaje inmensurable O o inmenso de u la Inmensurables U u anémia de inmensurable al el y O U genéricamente tipo megaloblástico a inmenso el O u a inmenso U evalúa U O o en genérico al e la sintomatología o el Inmenso o genérica O u el de de O a O o U deficiencia O u de de inmensurable al la vitamina o a en general B12 O u u o y a el y de folatos Inmenso O u O al a.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Estudios de Laboratorio Confirmatorios</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/vitamina-b12" className="text-blue-600 font-semibold hover:underline">Marcador Sérico Vitamina B12</a></li>
           <li><a href="/estudios/analisis-clinicos/biometria-hematica" className="text-blue-600 font-semibold hover:underline">Biometría Hemática Completa (VCM superior a 100)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />
            </div>
        </main>
    );
}
