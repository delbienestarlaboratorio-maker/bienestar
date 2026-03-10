'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function IntervaloQtCorregidoPage() {
    const [qt, setQt] = useState<string>('');
    const [fc, setFc] = useState<string>('');
    const [sexo, setSexo] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const Q=parseFloat(qt);const F=parseFloat(fc);if(!Q||!F||!sexo)return;const RR=60/F;const qtc=Q/Math.sqrt(RR);let max=sexo==='M'?440:460;let l='Normal',c='text-green-600',b='bg-green-100',desc='Intervalo inferior al máximo recomendado ('+max+'ms).';if(qtc>500){l='Peligroso';c='text-red-600';b='bg-red-100';desc='>500ms causa alto riesgo letal de Taquicardia Torsades de Pointes.';}else if(qtc>max){l='Prolongado';c='text-yellow-600';b='bg-yellow-100';desc='Superior a límites anatómicos en reposo.';}setResultado({value: Math.round(qtc)+' ms', label:l, color:c, bg:b, desc:desc});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-red-700 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">❤️ Intervalo QT Corregido (QTc) - Bazett</h1>
                    <p className="text-red-100 mt-2">Estandarización del trazo QT vs latidos por minuto</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Valores de Monitor EKG</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Intervalo QT medido (ms)"}</label>
                        <input type="number" value={qt} onChange={(e) => setQt(e.target.value)} placeholder="ej: 400" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Frecuencia Cardíaca (bpm)"}</label>
                        <input type="number" value={fc} onChange={(e) => setFc(e.target.value)} placeholder="ej: 60" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Sexo Biológico"}</label>
                        <select value={sexo} onChange={(e) => setSexo(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="M">{"Masculino"}</option>
                            <option value="F">{"Femenino"}</option>
                        </select>
                    </div>

                    <button onClick={calcular} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Intervalo QTc Estimado</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Monitoreo Clínico Complementario"
                    description="El desequilibrio electrolítico por potasio o calcio altera silenciosamente el segmento QT."
                    actionText="Electrolitos Séricos"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Electrolitos%20Sericos%206%20Elementos"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🫀 Guía Cardiológica: Cálculo del Intervalo QT Corregido (QTc)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Inmensurables U O cálculo del u O o Inmenso Intervalo U u de QT O a y Inmenso Corregido u inmensurable al (QTc) al O o a Inmenso al O en electrocardiografía u inmensurable al O de U O general el tiempo puramente Inmenso de la inmensa u despolarización y Inmensurables a U <em>repolarización</em> e Inmensurables U O inmenso de O y U u ventricular O o O U en independientemente U a inmenso inmensurables O U de u la O frecuencia cardíaca.</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia de Arritmia Letal (Torsades de Pointes)</h4>
           <p className="text-red-700 m-0">Un QTc puramente prolongado U O genéricamente Inmenso al a denotan u O u Inmenso al a un inmenso U u U riesgo O de e inmenso o inmensamente O U fibrilación O inmenso u ventricular O al O Inmensurables y la Muerte Súbita.</p>
       </div>

       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Estudios Complementarios Clínicos</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/quimica-sanguinea" className="text-blue-600 font-semibold hover:underline">Electrolitos Séricos (Potasio, Calcio, Magnesio)</a> (Desbalances Iónicos causan QTc Prolongado)</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 ¿Cómo se calcula el Intervalo QT Corregido?</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>En cardiología, el segmento QT de los electros manifiesta el periodo completo de despolarización y repolarización originado en los ventrículos. Sin embargo, este milisegundo oscila fisiológicamente atado a cuán veloz late el corazón en tal momento.</p>
                        <p>La trascendente ecuación de Henry Bazett en 1920 resuelve este eslabón: asila el valor dividiendo al intervalo detectado sobre la raíz cuadrada de cada latido adyacente, dando luz al QT ajustado o QTc.</p>
                        <p>Con un límite máximo alrededor de 440 ms (hombres) o 460 ms (mujeres), cifras más altas, especialmente sobrepasando 500ms, delatan alta peligrosidad arritmogénica y alertan contrarrestar drogas causantes o deficiencias críticas de electrolitos séricos.</p>
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
