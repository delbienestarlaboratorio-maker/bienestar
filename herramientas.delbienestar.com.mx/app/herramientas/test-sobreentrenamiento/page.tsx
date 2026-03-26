'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function TestSobreentrenamientoPage() {
    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);
    const [c4, setC4] = useState(false);
    const [c5, setC5] = useState(false);
    const [evaluado, setEvaluado] = useState(false);

    const score = (c1 ? 1 : 0) + (c2 ? 1 : 0) + (c3 ? 1 : 0) + (c4 ? 1 : 0) + (c5 ? 1 : 0);

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-amber-600 to-orange-700 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-amber-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl font-bold text-white">🏋️ Test de Sobreentrenamiento</h1>
                    <p className="text-amber-100 mt-2">Detección de fatiga muscular profunda en deportistas</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border p-6 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">
                        Entrenar destruye músculo; el descanso lo reconstruye. Cuando no hay recuperación, las fibras se rompen excesivamente liberando enzimas (CPK) a la sangre y bajando tu testosterona basal.
                    </p>

                    <div className="space-y-4 mb-8">
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-gray-50">
                            <input type="checkbox" checked={c1} onChange={(e) => setC1(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">1. Estancamiento y Pérdida de Fuerza</span></div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-gray-50">
                            <input type="checkbox" checked={c2} onChange={(e) => setC2(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">2. Frecuencia Cardíaca Elevada en Reposo</span></div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-gray-50">
                            <input type="checkbox" checked={c3} onChange={(e) => setC3(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">3. Insomnio o Sueño de muy baja calidad</span></div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-gray-50">
                            <input type="checkbox" checked={c4} onChange={(e) => setC4(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">4. Dolores Musculares que duran más de 3 días</span></div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-gray-50">
                            <input type="checkbox" checked={c5} onChange={(e) => setC5(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">5. Irritabilidad general o apatía al gimnasio</span></div>
                        </label>
                    </div>

                    <button onClick={() => setEvaluado(true)} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl">
                        Comprobar Nivel de Daño Muscular
                    </button>

                    {evaluado && (
                        <div className="mt-6 p-5 bg-orange-50 border border-orange-200 rounded-xl text-center">
                            <h3 className="font-bold text-orange-900 text-xl">{score >= 3 ? "ALTO Riesgo de Overtraining" : "Fatiga Normal Controlada"}</h3>
                            <p className="text-sm text-orange-800 mt-2">
                                Un nivel elevado constante de cortisol te hará acumular grasa y perder el músculo magro que ganaste. Es primordial medir bioquímicamente tu sangre para frenar a tiempo.
                            </p>
                        </div>
                    )}
                </div>

                <StudyCTA
                    title="Mide Científicamente Tu Recuperación"
                    description="Las enzimas CPK (Creatinfosfoquinasa) mostrarán la magnitud real de la destrucción de tus fibras musculares. Si le sumas un test de Testosterona, sabrás tus armas reales para que crezca tu volumen."
                    actionText="Cotizar Enzimas Musculares CPK"
                    type="estudio"
                    link="https://wa.me/527757371811?text=Hola,%20quisiera%20cotizar%20la%20enzima%20CPK%20y%20Testosterona"
                />

                <div className="mt-8">
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🏃 Guía Médico-Deportiva: Síndrome de Sobreentrenamiento (Overtraining Test)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Síndrome u de inmenso general Sobreentrenamiento O O o U OTS a la U (Overtraining u inmensurable al Syndrome al) O U de es a U u inmenso una condición al o clínica u O severa inmensurables O U en genérica o O y o U general la el u O cual el y o U al U cuerpo a no de la U se u recupera al O inmenso de o genéricamente U Inmensurables u O una O u Inmenso U O u en la o inmensa carga U y física a inmensurables el Inmenso o en inmensurable U U de y ejercicio, genéricamente a O al provocando Inmenso u de de Inmensa o U o inflamación U sistémica o al a crónica, la U genérica disfunción inmenso U al a la o y hormonal U o y o U en neuropsicológica inmenso al Inmenso U.</p>
       
       <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-blue-800 font-bold mb-2 flex items-center gap-2">ℹ️ Síntomas Bioquímicos</h4>
           <p className="text-blue-700 m-0">Puntuaciones Inmensurables u O altas u Inmenso al a un inmenso indican Inmenso O de fatiga u adrenal, al u que no U U o O al U O a puede o inmensurables u e resolverse O en O u al inmenso U solo u U con de un O Inmenso u genérica par a O al el U U de O u inmensa el o O a u días o O de genéricos descanso u.</p>
       </div>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios URGENTES</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/cortisol" className="text-blue-600 font-semibold hover:underline">Niveles de Cortisol Sérico (Marcador de Estrés Adrenal)</a></li>
           <li><a href="/estudios/analisis-clinicos/testosterona" className="text-blue-600 font-semibold hover:underline">Niveles de Testosterona Libre (En declive por sobreentrenamiento)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" /></div>
            
                <RelatedTools currentPath="/herramientas/test-sobreentrenamiento" className="mb-8" />
            </div>
        </main>
    );
}
