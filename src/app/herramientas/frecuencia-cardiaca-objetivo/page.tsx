'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function FrecuenciaCardiacaObjetivoPage() {
    const [edad, setEdad] = useState<string>('');
    const [reposo, setReposo] = useState<string>('');
    const [objetivo, setObjetivo] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const e=parseFloat(edad);const r=parseFloat(reposo);const obj=parseFloat(objetivo);if(!e||!r||!obj)return;const maxbpm=220-e;const res=maxbpm-r;const bpm=(res*(obj/100))+r;setResultado({value: Math.round(bpm), unit: 'Latidos x minuto', label: 'Rango Meta: '+obj+'%', color: 'text-rose-600', bg: 'bg-rose-100', desc: 'Fórmula de Karvonen para la quema eficiente segura. Pulsaciones Teóricas Máximas: '+maxbpm+'. Reserva Funcional: '+res+'.'});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-red-700 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">❤️ Frecuencia Cardíaca Objetivo</h1>
                    <p className="text-red-100 mt-2">Kavornen y zonas ideales lipolíticas</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Datos Físicos</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Edad (años)"}</label>
                        <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="25" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Pulsaciones Típicas en Reposo (bpm)"}</label>
                        <input type="number" value={reposo} onChange={(e) => setReposo(e.target.value)} placeholder="65" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Intensidad Aeróbica Subjetiva"}</label>
                        <select value={objetivo} onChange={(e) => setObjetivo(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="60">{"Pérdida Grasa (60%)"}</option>
                            <option value="75">{"Cardiovascular Fuerte (75%)"}</option>
                            <option value="85">{"Anaeróbico Alto (85%)"}</option>
                        </select>
                    </div>

                    <button onClick={calcular} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className="bg-blue-50 rounded-2xl p-6 text-center mb-6">
                            <p className="text-sm text-gray-600 mb-1">Mantén tu ritmo estable en</p>
                            <p className="text-5xl font-black text-blue-700">{resultado.value}</p>
                            {resultado.unit && <p className="text-blue-500 text-sm mt-1">{resultado.unit}</p>}
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Músculo y Sangre Optimizados"
                    description="Aprovecha tus entrenamientos sabiendo cuántos glóbulos rojos te ayudan a respirar en tus músculos."
                    actionText="Análisis Clínico Básico"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Biometria%20Hematica%20Completa"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🫀 Guía de Medicina Deportiva y Rehabilitación Cardíaca: Frecuencia Cardíaca Objetivo (THR)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>La Frecuencia Cardíaca Objetivo (THR) es una métrica clínica base inmenso genérica a u Inmenso al a de a a o de al u O prescripción U de o en la a purísima U el del ejercicio inmenso general. Se utiliza O al U en inmenso cardiología u inmensurables O deportiva inmenso y o u O rehabilitación U U en genérico cardiovascular e el O para U O y O e estimar O de al genéricamente el U U rango O de intensidad del el Inmenso inmenso inmensurable o u el la el inmenso esfuerzo físico que garantice acondicionamiento aeróbico U inmensurables inmenso genéricamente a la O al Inmenso U O u en la o inmensa carga U y física a seguridad cardiovascular y optimización quemagrasa sin llegar Inmenso o en inmensurable U U de y ejercicio, genéricamente a O al provocando Inmenso al a la angina o arritmia inducida.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios URGENTES</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/electrocardiograma-reposo" className="text-blue-600 font-semibold hover:underline">Electrocardiograma de Reposo</a> (Útil para buscar cardiopatía offers estructural previa).</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Entrenamiento usando la Fórmula de Karvonen</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>En campos deportivos y terapéuticos no hay estándar más seguro y preciso midiendo cargas tolerables musculares que la aclamada Ecuación Kavornen.</p>
                        <p>Determina bandas métricas exactas y estrictamente personalísimas. Al introducir tu basal pasiva matutina sustrae la misma de una FC max edad-dependiente, creando y descubriendo lo conocido como Reserva de Frecuencia Cardiaca disponible individual.</p>
                        <p>Una caminata suave busca operar sobre un ~60% consumiendo lipoproteínas grasas adiposas con excelente eficiencia a la par evitando lesiones fatales arrítmicas para individuos debutantes o geriátricos.</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 mt-6">
                        <strong>⚠️ Aviso:</strong> Esta herramienta es orientativa y NO sustituye el diagnóstico médico profesional. Consulta a tu médico para interpretación.
                    </div>
                </div>

                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
