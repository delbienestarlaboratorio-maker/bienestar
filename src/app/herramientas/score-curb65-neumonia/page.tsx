'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ScoreCurb65NeumoniaPage() {
    const [c, setC] = useState<boolean>(false);
    const [c1, setC1] = useState<boolean>(false);
    const [c2, setC2] = useState<boolean>(false);
    const [c3, setC3] = useState<boolean>(false);
    const [c4, setC4] = useState<boolean>(false);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        let p=0;if(c)p++;if(c1)p++;if(c2)p++;if(c3)p++;if(c4)p++;let l='Muy Bajo y Seguro Riesgo Tratamiento Oral en Hogar Fijo y Seguro 0.6% de Muerte',col='text-green-600',bg='bg-green-100',d='Puede manejarse seguramente e indiscutiblemente amoxicilina domiciliara y segura médica pura (<1 pts).';if(p>=3){l='Ingreso Obligatorio Urgente UVI Mortalidad Gravísima Extremadamente Terapia UCI Severísima Cuidado > 22%',col='text-red-700',bg='bg-red-100';d='Riesgos del 22%. UCI o medicina intrahospitalaria intravenosa severa cruzada UCI pura neumática. Terapia celular UCI.';}else if(p>=2){l='Aprobación Hospitalaria Intermedia Grave Médica Riesgo 9%',col='text-orange-600',bg='bg-orange-100';d='Riesgos del 9.2%. Preferible ingresarlo a una sala clínica general supervisado por médicos especialistas o antibiótico doble intrahospitalario oral intubado u oxígeno.';}setResultado({value: p+'/5 pts', label:l, color:col, bg:bg, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-sky-700 to-blue-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-sky-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🌬️ Score CURB-65 para Neumonía</h1>
                    <p className="text-sky-100 mt-2">Evaluación severa de ingreso neumónico e infección de tórax bacteriológico</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Signos y Confusión Pulmonar Edad"}</h2>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="c" checked={c} onChange={(e) => setC(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="c" className="text-sm font-bold text-gray-700">{"Cognición (Confusión o alteración aguda letárgica del Test Mental AMS Puntuación Sérica Neurología Pobre < 8 Letal Letárgica Neuropulmonar y Obnubilación Despistado Clínicamente Franco Grave Confusión Aguda)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="c1" checked={c1} onChange={(e) => setC1(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="c1" className="text-sm font-bold text-gray-700">{"Cifra de Urea Urémica Superior Alta BUN Bioquímica Nitrogenada Médica Uremia > 19 mg/dL (> 7 mmol/L renal uro pulmonar fallo depurativo nitrogenado en Química)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="c2" checked={c2} onChange={(e) => setC2(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="c2" className="text-sm font-bold text-gray-700">{"Ritmo Rápido Letal de Infección Ventilatoria Acelerado Pulmonar Taquipnea Cruda Sérica Resp (> 30 crudas ricas amplias e ingentes letales y agitadas asfixiadas respiraciones clínicas urgentes por minuto asfixiantes clínicas)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="c3" checked={c3} onChange={(e) => setC3(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="c3" className="text-sm font-bold text-gray-700">{"Baja Arterial Caída Sérica Shock Pura y Caída Hipotensiva Presión Sistólica < 90 o Diastólica < 60 arterial médica aguda venosa y diastólica pre cardiaca innegable sistémica hipotensiva médica arterial inestable pura (Shock neumopatía)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="c4" checked={c4} onChange={(e) => setC4(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="c4" className="text-sm font-bold text-gray-700">{"Vejez e Inmunodepresión de la Anciana de Riesgo Severo Edad Biológica Geriátrica Supera Indudable Anciana >= 65 crudos longevos fríos y cansados de Riesgados Mayores Vida Años Longevos Puros Crónicos Seniles"}</label>
                    </div>

                    <button onClick={calcular} className="w-full bg-sky-700 hover:bg-sky-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Criterios Pulmonares Mortalidad Británica CURB Punteados</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Valoración Indiscutible Preventiva Infecciosa Respiratoria Sérica Infeccioso"
                    description="Para CURB-65 requieres forzosamente verificar tus signos y tu Química Básica de riñones BUN UREAS."
                    actionText="Análisis y Biomarcadores Sangre y Biomarcadores Virales Ureas"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Quimica%20y%20Urea%20B%C3%A1sica"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🫁 Guía Médica Pulmonar: Criterios CURB-65 para Neumonía</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score CURB-65 U o el en el el u es genérico inmenso general y o inmensa O de una O u genéricamente a la purísima O Inmensurables y la O Inmenso u a de a U O al O U el al U de U O el u Inmensurables al puramente U O la de a la de o al la U O de O U u y o base inmensa purísima al regla U u en a a O el genéricamente U U U e de el para e a inmenso u genérica a estimar Inmensurable al o el O U la a de a u la Mortalidad U Inmenso genérica u y Al inmenso O e la o U a la a U a puros purísima O de 30 o el e la o a, de la en inmenso O neumonía O U inmenso o genérica la y O U de U U u en Inmensurables en a a el genérica genérica e de adquirida genéricamente U U inmenso en u la o u O del o u e de la o a u O la U o O u comunidad.</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia de Score Alto inmenso U al Inmenso U genérico</h4>
           <p className="text-red-700 m-0">Toda y absolutamente puntuación purísima mayor a 3 puntos a a al al al a a a a general U y genérico u O u Inmenso al a genérico inmenso U u U O la la O el e inmenso o inmensamente O U en requiere ingreso puramente a Unidad de Cuidados Intensivos UCI u U en urgencias de o a inmenso inmensurable u inmensamente inmensurables O U de u la O Inmensurables genérica.</p>
       </div>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios URGENTES</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/quimica-sanguinea" className="text-blue-600 font-semibold hover:underline">Química Sanguínea Total y Nitrógeno BUN (Úrea Clínica)</a> (Requerido base y puramente paramétrico general U al medir el BUN físico u basal para la 'U' en este Score Inmenso de neumonía purísima).</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Explicación Técnica Clínica Pura y Letal Evaluativa del CURB 65 Neumonías Comunitarias Letales en Inglaterra"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"El validado mundial CURB-65 representa para clínicos e internistas y neumólogos la primera piedra de toque médica pulmonar clínica para clasificar velozmente el franco riesgo biológico mortal inminente que ostenta una infección comunitaria pura adquirida bacteriológica o viral (Neumonía o pulmonía grave)."}</p>
                        <p>{"Al sopesar flagrantemente signos clínicos de altísima letal gravedad pre morten sistémica (Bajas cifras letales de presión en colapso cardiovascular cardiogénico innegable vascular o altísimos conteos crudos taquipneicos brutos ventilatorios torácicos mecánicos agobiantes de respiración acelerada y disneica severa compensatoria)."}</p>
                        <p>{"Incorporar fuertemente a las edades y factores etéreos biológicos crónicos inmunitarios geriátricos seniles (>65 de vida innegables vulnerables y frágiles pulmonares pre diabéticos y de abandono sistémico inmunológico puramente biológico involutivo) cruza estadísticamente de manera innegable el umbral predictivo del requerimiento letal orgánico respirador de Terapia Intensiva intubado (UCI)."}</p>
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
