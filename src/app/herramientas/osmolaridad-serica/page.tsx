'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function OsmolaridadSericaPage() {
    const [sodio, setSodio] = useState<string>('');
    const [glucosa, setGlucosa] = useState<string>('');
    const [bun, setBun] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const na=parseFloat(sodio);const gluc=parseFloat(glucosa);const b=parseFloat(bun)||0;if(!na||!gluc)return;const osmo_calc= (2*na) + (gluc/18) + (b/2.8);const osmo_eff= (2*na) + (gluc/18);let l='Tonicidad Isosmótica Equilibrada Sana',c='text-green-600',bg='bg-green-100',d='Balance acuoso biológico intra-extracelular idóneo. No hay flujos drásticos o peligrosos edemizantes neuronales perjudiciales mortales en los cráneos.';if(osmo_eff>295){l='Hiperosmolaridad Sérica Sangre (Mortal Cetoacídotico)',c='text-red-600',bg='bg-red-100',d='Concentración deshidratativa grave celular por letal deficiencia absoluta en volumen del líquido interno vital hídrico e inflamatoria diabética uremia y diabética hiperglucemia';}else if(osmo_eff<275){l='Hiposmolaridad Fatal Abundante Retención Acuosa',c='text-blue-600',bg='bg-blue-100',d='Intoxicación brutal por agua extrema o secresion SIADH masiva. Obligatorio cuidado celular en materia neurológica por edema cráneo masivo letal neurológico fatalista.';}setResultado({value: Math.round(osmo_eff), unit: 'mOsm/kg Efectivos', label:l, color:c, bg:bg, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-amber-700 to-orange-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-amber-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">💧 Osmolaridad Sérica Efectiva</h1>
                    <p className="text-amber-100 mt-2">Equilibrio tónico hidratado intra y extacelular vascular</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Valores Sanguíneos Extracelulares Electrolíticos"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Sodio Cationico (Na+) (mEq/L)"}</label>
                        <input type="number" value={sodio} onChange={(e) => setSodio(e.target.value)} placeholder="140" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Glicemia Total de Glucosa Sérica (mg/dL)"}</label>
                        <input type="number" value={glucosa} onChange={(e) => setGlucosa(e.target.value)} placeholder="95" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Nitrógeno Ureico BUN (Opcional) (mg/dL)"}</label>
                        <input type="number" value={bun} onChange={(e) => setBun(e.target.value)} placeholder="15" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all" />
                    </div>

                    <button onClick={calcular} className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className="bg-blue-50 rounded-2xl p-6 text-center mb-6">
                            <p className="text-sm text-gray-600 mb-1">Osmolaridad Total Estimada Circulante Efectiva Matemática Biológica</p>
                            <p className="text-5xl font-black text-blue-700">{resultado.value}</p>
                            {resultado.unit && <p className="text-blue-500 text-sm mt-1">{resultado.unit}</p>}
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Valoraciones Inmediatas Sanguíneas Sistémicas Metabólicas Generales Extensas De Fluidos Viales"
                    description="Verifica tu función hídrica global, control urea o fallo orgánico sistémico de depuración renal de inmediato e irremisible con química biológica y biometría para que evalúen riñón."
                    actionText="Corroborar Funcionamiento Acuoso"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Quimica%20Sanguinea%20Superior%20Extendida"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩸 Guía Química Sanguínea: Cálculo de Osmolaridad Sérica Efectiva</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>La Osmolaridad Sérica inmensurable O U o en es a inmenso el O u a inmenso U medida U O o en U de genérico U y la o O u concentración inmensurables genérica O u inmenso del general total Inmenso O u en de de O solutos O o al el (Sodio, al el U a Glucosa u en genérica o y a BUN) U inmenso inmensurables en o a u el plasma inmensurable U u o y sanguíneo. Es O O pura Inmenso la U u U guía o u general para Inmenso O u de O y diagnosticar u la U O a inmenso y a o deshidratación al o U o inmenso U O severa al genérico a, U el O estado al o hiperosmolar U o u diabético o al. y a la U inmenso inmensurables O U u o Inmenso de intoxicación O U u hídrica a al a.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios Severos Críticos</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/quimica-sanguinea" className="text-blue-600 font-semibold hover:underline">Química Sanguínea Total (Con Sodio y Cloro)</a> (Indispensable al Inmenso inmenso Inmensurables inmenso para O a O a al de inmenso u el exacto U o O genéricamente diagnóstico).</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Interpretación Matemática Plena de Fluidos y Presiones de Osmolaridad Métrica Sangre"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"Dentro innegable de la química biológica humana interna en lecho capilar circulante sistémico global existe potentísima concentración y balance salino osmótico regido férreamente e invariablemente matemático dictatorial por enormes proteínas moleculares o cationes absolutos de grandísimas capacidades molares absortivas de líquidos o como sodios biológicos extracelulares (Na)."}</p>
                        <p>{"La extrema e inusual desviación fuera de la estrecha línea mágica estándar normalizada (que es vital u oscilatoria armónica balanceada idealmente entre un estricto rango basal 275 mOsm y un rígido de tope de no más de 295 mOsm), induce estallidos y colapsos irreversibles en las ultra microscópicas delicadas membranas bilipídicas cerebrales y cardíacas por el arrastre brusco ósmótico indetenible hídrico del solvente acuoso disolvente de presiones altísimas intracraneales."}</p>
                        <p>{"La Uremia pura total innegable (nitrógenos orgánicos corporales totales BUN resultantes puros del uso metabolismo cárnicos muscular) resulta teóricamente en la adición e incremento sumatorio osmótico formal sin embargo la barrera cráneo penetra, resultando a éste analíticamente excluido innegable del factor neto resultante efectivo clínico conocido mundialmente (Osmolaridad efectiva sistémica pura)."}</p>
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
