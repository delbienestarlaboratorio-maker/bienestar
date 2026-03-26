'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function DobleProductoCardiacoPage() {
    const [sistolica, setSistolica] = useState<string>('');
    const [freccard, setFreccard] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const sys=parseFloat(sistolica);const bpm=parseFloat(freccard);if(!sys||!bpm)return;let dpi=(sys*bpm)/100;let l='Eficiencia Operativa',c='text-green-600',b='bg-green-100',desc='Valores biológicos protectores.';if(dpi>200){l='Estrés Cardiaco Extremo';c='text-red-600';b='bg-red-100';desc='Carga fisiológica severa, índice altamente sugestivo de angina y sufrimiento tisular isquémico.';}else if(dpi>120){l='Actividad Altamente Demandante';c='text-yellow-600';b='bg-yellow-100';desc='Adecuada para deportistas en la cumbre del ejercicio.';}setResultado({value: Math.round(dpi), unit: 'Índice de Doble Producto', label:l, color:c, bg:b, desc:desc});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-red-700 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">❤️ Doble Producto Cardíaco (RPP)</h1>
                    <p className="text-red-100 mt-2">Carga y tensión miocárdica neta ante oxigenos requeridos</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Parámetros</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Tensión Sistólica Al Ejercicio/Pico (mmHg)"}</label>
                        <input type="number" value={sistolica} onChange={(e) => setSistolica(e.target.value)} placeholder="130" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Pulsaciones Detectadas en Pico (bpm)"}</label>
                        <input type="number" value={freccard} onChange={(e) => setFreccard(e.target.value)} placeholder="78" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all" />
                    </div>

                    <button onClick={calcular} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className="bg-blue-50 rounded-2xl p-6 text-center mb-6">
                            <p className="text-sm text-gray-600 mb-1">Score O₂ Tensión</p>
                            <p className="text-5xl font-black text-blue-700">{resultado.value}</p>
                            {resultado.unit && <p className="text-blue-500 text-sm mt-1">{resultado.unit}</p>}
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Pruebas Coronarias Periféricas"
                    description="Las lipoproteínas y deficiencias vitamínicas D promueven daños vasculares ocultos."
                    actionText="Perfil De Laboratorio Preventivo"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Check-up%20Ejecutivo"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🫀 Guía Cardiológica y Deportiva: Doble Producto Cardíaco (MVO2)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Doble u de inmenso general Producto inmenso a de a a o de al u O Cardíaco (Rate-Pressure u en U O Product O o en) inmenso u genéricamente a es INMENSURABLE inmenso la fórmula U O o U u clínica u o o inmensurables U O para U O u U al inmenso medir Inmenso la demanda a la o de de u o y O metabólica del O corazón inmenso u U en o de oxígeno u O a o U miocárdico u, a U inmensa multiplicando inmenso genéricamente a la purísima O Inmensurables la presión arterial u al U en de sistólica O o U y U o el inmensa inmenso de o la frecuencia inmensurable U U en cardíaca u.</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia de Isquemia Cardíaca</h4>
           <p className="text-red-700 m-0">Puntuaciones Inmensurables u O altas u Inmenso al a un inmenso indican Inmenso O de estrés inmenso inmensurable u isquémico o de O inminente O al Inmenso U riesgo O Inmenso u genéricamente a O al infarto.</p>
       </div>

       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Estudios de Laboratorio Preventivos</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/enzimas-cardiacas" className="text-blue-600 font-semibold hover:underline">Enzimas Cardíacas (Troponinas Perfil Isquémico)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Rate Pressure Product (Doble Producto)</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>El Doble Producto (RPP por sus siglas inglesas: Rate Pressure Product), emerge netamente de un crudo producto matemático entre tu métrica Tensional Máxima Sistólica junto a la frecuencia cardíaca inmediata registrada.</p>
                        <p>Este simple cálculo posee potentes utilidades fisiológicas directas reflejando in vivo los consumos metabólico-energéticos del oxígeno dentro de la mismísima pared muscular cardíaca que los métodos aislados obviarían equivocadamente.</p>
                        <p>Las isquemias transitorias en pruebas perimétricas de estrés se desatan estadísticamente al vulnerar los frágiles picos umbrales sobre un umbral individual, usualmente un estancamiento del RPP sin llegar a escalar ante un esfuerzo mayor dictando fallo circulatorio ineludible coronario.</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 mt-6">
                        <strong>⚠️ Aviso:</strong> Esta herramienta es orientativa y NO sustituye el diagnóstico médico profesional. Consulta a tu médico para interpretación.
                    </div>
                </div>

                
                <RelatedTools currentPath="/herramientas/doble-producto-cardiaco" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
