'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ScoreMeldNaPage() {
    const [bilirrubina, setBilirrubina] = useState<string>('');
    const [inr, setInr] = useState<string>('');
    const [creatinina, setCreatinina] = useState<string>('');
    const [sodio, setSodio] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        let b=parseFloat(bilirrubina);let i=parseFloat(inr);let cr=parseFloat(creatinina);let na=parseFloat(sodio);if(!b||!i||!cr||!na)return;if(b<1.0)b=1.0;if(i<1.0)i=1.0;if(cr<1.0)cr=1.0;else if(cr>4.0)cr=4.0;let meld= (0.957*Math.log(cr)) + (0.378*Math.log(b)) + (1.120*Math.log(i)) + 0.643;meld=Math.round(meld*10);if(na<125)na=125;else if(na>137)na=137;let meld_na = meld + 1.32*(137-na) - (0.033*meld*(137-na));let l='Mortalidad Mínima a 90 Días',col='text-green-600',bg='bg-green-100',d='Pronóstico de supervivencia mayor al 98% en tres meses.';if(meld_na>=40){l='Mortalidad GIGANTE a 90 Días > 70%',col='text-red-900',bg='bg-red-200';d='Prioridad absoluta UNOS universal e indiscutible pre Lista Quirúrgica Transplante Hepático urgente inminente innegable o muerte por fallo de falla multiorgánico agudísimo.';}else if(meld_na>=30){l='Mortalidad Severísima Altísima 52% 90x',col='text-red-600',bg='bg-red-100';d='Riesgos vitales profundos fatales. Alta posición en el escalafón para derivaciones trasplantes imperativos hepatólogos o hepatorenales urgentes y letales cirugías o derivaciones hepato formales pre urgencias médicas UCI reanimación de choque y volumen y uremia de falla multisistémica.';}else if(meld_na>=20){l='Mortalidad Alta 20% a 90 Días',col='text-orange-600',bg='bg-orange-100';d='Riesgo intermedio alto. El fallo y las comorbilidades dictan atención estrecha y de hospital continuo.';}else if(meld_na>=10){l='Mortalidad Leve Moderada 6% en 90x',col='text-yellow-600',bg='bg-yellow-100';d='Monitoreo ambulatorio recomendado.';}setResultado({value: Math.round(meld_na), label:l, color:col, bg:bg, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-orange-700 to-yellow-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-orange-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">⚖️ Score MELD-Na</h1>
                    <p className="text-orange-100 mt-2">Model for End-Stage Liver Disease (con Sodio)</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Valores Bioquímicos Esenciales (Edad > 12 Años)"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Bilirrubina Sérica Total (mg/dL)"}</label>
                        <input type="number" value={bilirrubina} onChange={(e) => setBilirrubina(e.target.value)} placeholder="ej: 4.5" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Índice Internacional Normalizado (INR) (Indice)"}</label>
                        <input type="number" value={inr} onChange={(e) => setInr(e.target.value)} placeholder="ej: 2.1" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Creatinina Sérica Renal (mg/dL)"}</label>
                        <input type="number" value={creatinina} onChange={(e) => setCreatinina(e.target.value)} placeholder="ej: 1.8" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Sodio Sérico (Na) (mEq/L)"}</label>
                        <input type="number" value={sodio} onChange={(e) => setSodio(e.target.value)} placeholder="ej: 132" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all" />
                    </div>

                    <button onClick={calcular} className="w-full bg-orange-700 hover:bg-orange-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Score MELD-Na Global Ajustado Calculado</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Evita o Anticipa Invariablemente la Severidad del Trasplante de Órganos por Disfunción Fallo Letal del Hígado Extensiva Renal"
                    description="Para el Score MELD requieres tener actualizadas forzosamente y mensualmente las Bilirrubinas, Funcionalidad Renal Creatinínica Nitrógenada, Iones BioSodio (Na) e INR Hematológico Universal."
                    actionText="Cotiza Tu Paquete Hepatológico y Falla Hepatorenal Pre-Trasplante y Trasplante"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Pruebas%20de%20Funcion%20Hepatica%20y%20Urea%20y%20Creatinina%20Sanguinea"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía Hepática: Escala Prognóstica MELD-Na para Cirrosis</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El MELD-Na (Model for End-Stage Liver Disease con Sodio) es el puntaje mundial definitivo para evaluar la supervivencia en pacientes con cirrosis o insuficiencia hepática terminal.</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia Clínica</h4>
           <p className="text-red-700 m-0">Puntajes superiores a 15 indican riesgo vital severo de mortalidad a 3 meses y señalan la entrada urgente a protocolos de trasplante hepático.</p>
       </div>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios de Control Hepático</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/quimica-sanguinea" className="text-blue-600 font-semibold hover:underline">Química Sanguínea Total (Creatinina, Sodio, Bilirrubina)</a></li>
           <li><a href="/estudios/analisis-clinicos/tiempos-de-coagulacion" className="text-blue-600 font-semibold hover:underline">Tiempos de Coagulación (INR)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 ¿Por qué importa enormemente MELD-Na en el trasplante hepático global nacional e internacional unificador?"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"El sistema MELD inicial crudo (acrónimo inglés general Model for End-Stage Liver Disease Global Systemic Organ Failure Risk Assesment Scoring Test System of Mortality 3 months Universal) revolucionó de manera mundial universal sistémica toda la antigua inefectiva manera con la que los centros nacionales y los cirujanos mundiales trasplantólogos otorgaban órden de los invaluables y escasos órganos hepáticos basándose por fin en ecuaciones puramente letales objetivas libres de sesgos puramente médicos o empíricos y sesgos apreciativos visuales del físico biológico individualizado del enfermo ascitico cirrótico."}</p>
                        <p>{"El cálculo en su núcleo evalúa crudamente en el paciente la magnitud cruda de su incapacidad para que este excrete la bilis tóxica al nivel de vías heces y vías biliares (evaluada indirectamente por la hiper-bilirrubina sérica estática en piel medible sérica y laboratorialmente observable cruda en Química), mide también su fracaso coagulador hematológico molecular masivo secundario letal de las heparinas y hemorragias secundarias (métrica INR global pura estandarizada planetaria globalizada hemo hemostática) y cruza la presencia letal concurrente formal y muy grave de falla aguda o crónica orgánica de fallo de los riñones o falla hepatorrenal cruzada biológica de insuficiencia filtrante de las nefronas medulares y corticales urinarias y ureicas mortales depurativas necróticas (calculada global pura mediante métricas matemáticas logarítmicas de toxina retentiva Creatinina pura química toxica nitrógena base sérica sin filtrar o con baja glomerular letal disfunción ureica pre renal de creatininas sanguíneas altísimas sin exclusiones absolutas biológicas necróticas puramente logarítmicas)."}</p>
                        <p>{"La actualización gigantesca médica y crucial MELD-Na en la medicina incorporó el Sodio debido a que la incapacidad de eliminar líquidos (Hiponatremia severa metabólica) predice masiva e independientemente el fallecimiento abismal y agudo o comorbido e inmediato crudo de enfermos graves letales pre coma en espera estricta lista general."}</p>
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
