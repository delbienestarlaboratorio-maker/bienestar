'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function EscalaKillipPage() {
    const [clase, setClase] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        if(!clase)return;const c=parseInt(clase);let v='',l='',col='',bg='',d='';if(c===1){v='I';l='Bajo Riesgo';col='text-green-600';bg='bg-green-100';d='Mortalidad a 30 días: ~6%.';}else if(c===2){v='II';l='Riesgo Moderado';col='text-yellow-600';bg='bg-yellow-100';d='Mortalidad a 30 días: ~17%.';}else if(c===3){v='III';l='Riesgo Severo';col='text-orange-600';bg='bg-orange-100';d='Mortalidad a 30 días: ~38%.';}else{v='IV';l='Shock Cardiogénico';col='text-red-600';bg='bg-red-100';d='Mortalidad a 30 días: ~81%. Alto riesgo de muerte inminente.';}setResultado({value: 'Clase '+v,label:l,color:col,bg:bg,desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-red-700 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">❤️ Clasificación de Killip</h1>
                    <p className="text-red-100 mt-2">Severidad de insuficiencia cardíaca aguda</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Hallazgos Físicos Post-IAM</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Hallazgos Clínicos"}</label>
                        <select value={clase} onChange={(e) => setClase(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="1">{"I: Sin signos de fallo cardíaco (no estertores, no S3)"}</option>
                            <option value="2">{"II: Estertores en bases, S3, y/o distensión venosa yugular"}</option>
                            <option value="3">{"III: Edema agudo de pulmón franco"}</option>
                            <option value="4">{"IV: Shock cardiogénico (hipotensión, oliguria, cianosis)"}</option>
                        </select>
                    </div>

                    <button onClick={calcular} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Clase Killip-Kimball</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Evalúa el Daño Cardíaco"
                    description="Identifica rápidamente daño al músculo cardíaco mediante Troponina-I ultrasensible, Creatincinasa y Mioglobina."
                    actionText="Perfil Enzimas Cardiacas"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Perfil%20Cardiaco"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🫀 Guía Cardiológica Invasiva: Escala de Killip-Kimball (Falla Cardíaca Post-Infarto)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>La Escala U de Inmenso y Inmensurables U genérica Killip u O u clínica o al el de al a O y oro genérico u al mundial Inmensurables U O estratifica y U O u U al inmenso evalúa Inmenso la mortalidad O al a y u inmensa a Inmenso al la O al u en inmenso u genérica u inmensurables de pacientes O u e que acaban O O de U inmenso sufrir inmensurable U U un Infarto U o genéricamente a de corazón inmenso U a inmenso inmensurable u Inmenso al a U u IAM a al a o o de U.</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia de Choque Cardiogénico (Killip IV)</h4>
           <p className="text-red-700 m-0">Un score O U de U U clase IV U al genéricamente Inmenso a O u O indica inmenso Inmenso genérica u choque a a al inmenso genéricamente U u O cardiogénico Inmenso genéricamente severo inmenso o U con U U inminente U. mortalidad de u O o altísima (U o genéricamente 80%).</p>
       </div>

       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios URGENTES</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/enzimas-cardiacas" className="text-blue-600 font-semibold hover:underline">Enzimas Cardíacas (Troponinas I, CPK-MB)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 ¿Qué es la Escala de Killip y Kimball?</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>La Clasificación de Killip y Kimball agrupa la magnitud de la disfunción ventricular izquierda y el fallo cardíaco subsiguiente tras un infarto agudo al miocardio (IAM). Fue desarrollada en 1967.</p>
                        <p>Al enfocarse en la exploración física sistemática (auscultación en busca de tercer ruido cardíaco o estertores pulmonares, y medición de presión arterial), predice de forma asombrosamente precisa la mortalidad a 30 días.</p>
                        <p>Pacientes Killip I no tienen insuficiencia cardiaca. Pacientes Killip IV presentan shock cardiogénico (presión sistólica baja y signos de falla renal aguda) con más del 80% de letalidad en estudios históricos.</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 mt-6">
                        <strong>⚠️ Aviso:</strong> Esta herramienta es orientativa y NO sustituye el diagnóstico médico profesional. Consulta a tu médico para interpretación.
                    </div>
                </div>

                
                <RelatedTools currentPath="/herramientas/escala-killip" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
