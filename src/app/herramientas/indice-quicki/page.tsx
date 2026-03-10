'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function IndiceQuickiPage() {
    const [insulina, setInsulina] = useState<string>('');
    const [glucosa, setGlucosa] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const ins=parseFloat(insulina);const gluc=parseFloat(glucosa);if(!ins||!gluc)return;const gl_mol=gluc;const logIns=Math.log10(ins);const logGluc=Math.log10(gl_mol);const quicki=1/(logIns+logGluc);let l='Normal Sensible',c='text-green-600',b='bg-green-100',d='Sensibilidad metabólica periférica espléndida sin retardo de captación de azúcar.';if(quicki<0.339){l='Resistencia Insulínica Grave',c='text-red-600',b='bg-red-100',d='Índices bajísimos auguran diabetes franca y desarrollo innegable de riesgo aterosclerótico y síndrome metabólico global y letal.';}else if(quicki<0.35){l='Trastorno Insulínico Limítrofe',c='text-yellow-600',b='bg-yellow-100',d='Signos de incipiente intolerancia fisiológica de secreciones. Modifica ingesta nutritiva pronto y comienza ejercicios metabólicos o acarrearas riesgos de HOMA-IR elevados crónicos.';}setResultado({value: quicki.toFixed(3), unit: 'Índice Fisiológico Logarítmico', label:l, color:c, bg:b, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-amber-700 to-orange-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-amber-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🧬 Índice QUICKI (Insulino-resistencia)</h1>
                    <p className="text-amber-100 mt-2">Quantitative Insulin Sensitivity Check Index</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Valores Basales Séricos"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Insulina Basal en Ayuno (µU/mL)"}</label>
                        <input type="number" value={insulina} onChange={(e) => setInsulina(e.target.value)} placeholder="15" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Glucosa en Ayunas (mg/dL)"}</label>
                        <input type="number" value={glucosa} onChange={(e) => setGlucosa(e.target.value)} placeholder="95" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all" />
                    </div>

                    <button onClick={calcular} className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className="bg-blue-50 rounded-2xl p-6 text-center mb-6">
                            <p className="text-sm text-gray-600 mb-1">Score Logarítmico Rápido</p>
                            <p className="text-5xl font-black text-blue-700">{resultado.value}</p>
                            {resultado.unit && <p className="text-blue-500 text-sm mt-1">{resultado.unit}</p>}
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Desarrollo Diabético Silencioso"
                    description="Medir únicamente tu glucosa matutina NO sirve, necesitas el combo de Insulina Basal urgéntemente."
                    actionText="Análisis Curva Insulínica"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Insulina%20y%20HOMA%20IR"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩸 Guía Endocrinológica: Índice QUICKI (Sensibilidad a Insulina)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El tamizaje inmensurable O o inmenso de u la Inmensurables U u analítica de inmensurable al el y O U genéricamente tipo QUICKI a inmenso el O u a inmenso U evalúa U O o en genérico al e la sensibilidad o el Inmenso o genérica O u inmensa U a O o U acción O u de de inmensurable al la insulina o a en general endógena O u inmensurable al de Inmenso O u O al inmenso matemática u.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Estudios de Laboratorio Confirmatorios</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/insulina-en-ayunas" className="text-blue-600 font-semibold hover:underline">Insulina en Ayuno Basal</a></li>
           <li><a href="/estudios/analisis-clinicos/glucosa" className="text-blue-600 font-semibold hover:underline">Glucosa en Ayuno General</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 ¿Cómo utilizar QUICKI para medir diabetes?"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"El índice QUICKI evalúa cualitativamente y matemáticamente y de manera indirecta el altísimo y severo grado basal fisiológico en que se opone el cuerpo celularmente y receptorialmente de responder orgánicamente de capturar molécula sanguínea insulínica."}</p>
                        <p>{"Nace como mejora en la fórmula original sobrevalorada del esquema matemático HOMA-IR introduciendo y empleando una transformación inversa totalmente logarítmica que suaviza métricas exageradas matutinas para un veraz resultado basal."}</p>
                        <p>{"Cifras que caen dramáticamente o resultan inferiores matemáticas por debajo del nivel estándar vital y sano de aproximadamente 0.339 dictaminan que esa entidad humana en especial tiene francamente resistencia metabólica celular insulínica franca propensamente letal."}</p>
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
