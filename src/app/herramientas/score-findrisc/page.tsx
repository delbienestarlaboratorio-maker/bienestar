'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ScoreFindriscPage() {
    const [edad, setEdad] = useState<string>('');
    const [imc, setImc] = useState<string>('');
    const [ejercicio, setEjercicio] = useState<string>('');
    const [vegetales, setVegetales] = useState<string>('');
    const [medHta, setMedHta] = useState<string>('');
    const [famDb, setFamDb] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const e=parseInt(edad);const im=parseInt(imc);const ex=parseInt(ejercicio);const vg=parseInt(vegetales);const hta=parseInt(med_hta);const fm=parseInt(fam_db);if(isNaN(e)||isNaN(im)||isNaN(ex)||isNaN(vg)||isNaN(hta)||isNaN(fm))return;const pts=e+im+ex+vg+hta+fm;let l='',c='',b='',d='';if(pts<7){l='Escaso Probabilístico Normalizado Fijo Sanísimo';c='text-green-600';b='bg-green-100';d='Insignificante y bajísimo de solo el 1% en diez largos años en la población generativa nórdica.';}else if(pts<12){l='Acelerado y Leve Riesgo Sistémico en Incremento Fisiológico Célular Múltiple Hormonal Inevitable Metabólico de Resistencia';c='text-yellow-600';b='bg-yellow-100';d='En el 4%. Controla la ingesta de azúcar.';}else if(pts<15){l='Peligro Precautorio de Severo Cuidado de Azúcares y Comorbilidad Ateromatosa Arterial Aumentada Frecuencia Diaria de Monitoreo';c='text-orange-600';b='bg-orange-100';d='Severidad en uno de seis habitantes con el 17% a futuro. Urgencia analítica química glucémica basal';}else if(pts<=20){l='Urgencia Alarmante Altamente Franca Patológica y Destructiva Elevación Masiva Renal y Glucocorticoide Dañina';c='text-red-500';b='bg-red-100';d='Riesgos del 33% (un enfermo en cada trío inminente). Intervención medicada imperativa urgente vital y endocrina';}else{l='Inequívocamente Catastrófico Perfil Insulínico Fallido Definitivo Glucosa Severísima Diabética Extrema Peligrosísima Indudable de Diagnóstico Confirmatorio Categórico Clínico Indiscutible Agudo Extremo Hiperglucémico';c='text-red-900';b='bg-red-200';d='Mortal y devastador (mitad enfermará y >50%). Requiere screening metabólico extensivo completo o diagnostico real positivo actual.';}setResultado({value: pts+' pts',label:l,color:c,bg:b,desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-amber-700 to-orange-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-amber-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🔍 Score FINDRISC Diabetes</h1>
                    <p className="text-amber-100 mt-2">Índice de probabilidad del riesgo metabólico de diabetes tipo 2</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Hábitos Generales Biométricos Intervencionistas y Dieta Clásica"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Edad General Cronológica en Años"}</label>
                        <select value={edad} onChange={(e) => setEdad(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Menor de 45 joviales o en pubertad sana adolescente plena sana sana sana (0 Pts)"}</option>
                            <option value="2">{"Mediana de edad entre etapa 45 ó quizás 54 vital (2 pto)"}</option>
                            <option value="3">{"Estable entre 55 o entrando en 64 adultez de riesgo general sistémico senil en avance progresivo paulatino inexorable mortal inclemente (3 pts)"}</option>
                            <option value="4">{"Superiores marcados en ≥65 de vida vitales y ancianidad mayor sistémica decaimiento hormonal(4 pts)"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Estimación IMC Ponderal"}</label>
                        <select value={imc} onChange={(e) => setImc(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Esbelta anatomía normal (Índice < 25 kg/m2 o en extrema y marcada desnutrición consuntiva en vida) (0 p)"}</option>
                            <option value="1">{"Rechoncho Sobrepeso evidente y grasa (25 a < 30 y adiposidades) (1 pt)"}</option>
                            <option value="3">{"Mórbido e incontrolable Obeso Obesidad Tipo superior a >30 o lipodistrofia patológica sistémica central masiva extrema gástrica visceral profunda y abdominal obesa severa (3 pts)"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"¿Suda usted realizando cualquier fuerte forma o actividad al realizar intensa actividad del gimnasio por más de los estrictos estándares 30 min por innegables días?"}</label>
                        <select value={ejercicio} onChange={(e) => setEjercicio(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Si ejercito en rigurosa actividad de rigor de manera física al forzar mis latidos habitualmente cardíacos sanos"}</option>
                            <option value="2">{"Nunca me esfuerzo absolutamente no y en negación y rotundo reposo crónico basal sedente en sillones no productivo sedentario morfológico estructural(2)"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"¿Comes en consumo fresco al paladar verduras legumbres al día o frutales frescas jugosas inmensas en toda abundancia tu rutina clásica diaria?"}</label>
                        <select value={vegetales} onChange={(e) => setVegetales(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Si masco todos invariables los sacros días por recomendación de nutrólogos e intensamente ingiero verde en comida diariamente dietaria sana de fibra"}</option>
                            <option value="1">{"Evito siempre rotundamente no invariablemente de frutas verduras hortaliza no me esfuerzo jamas (1 p)"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"¿Pastillas o tratamientos te médicas habitualmente prescrito hoy y de presiones crónicas mortales?"}</label>
                        <select value={medHta} onChange={(e) => setMedHta(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Sano no jamas nada de pastillas por doctores del corazón"}</option>
                            <option value="2">{"SI hipertensión es diagnosticada fatal e ingiero píldoras(2)"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"¿Parientes Diabéticos en Linea o en historial clínico directo y lejano familiar de tipo fatal diabético insulínico consanguíneo en ADN familiarizado de padres?"}</label>
                        <select value={famDb} onChange={(e) => setFamDb(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Ningún antepasado absolutamente no enfermo de herencia familiar en sangre"}</option>
                            <option value="3">{"Mis abuelos viejos sí de tipo 2 indirecto 2da línea primos tíos familiares mortales portadores fatales (3 p)"}</option>
                            <option value="5">{"Padres biológicos de primera sangre directos hermanos hijos descendientes directos genética diabética de sangre hereditaria materna paterna (5)"}</option>
                        </select>
                    </div>

                    <button onClick={calcular} className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Cálculo Epidemiológico Punteado de Predicción Fino Rápido FINDRISC Test Finlandés Universal Clínico Metabólico Estándar Analógico Global Fijo</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Evidencia Hemoglobina A1C Temprana Urgente Y Basal Diaria de Azúcar en Venas y Funciones de Diabetes y Panel Médico de Detección Segura de Azúcares Diaria en México Urgente en Casa Fija"
                    description="Solo las exactas mediciones métricas clínicas laboratoriales hemáticas pueden corroborar de fondo infalibles los tests caseros de sospechas preventivo como Findrisc"
                    actionText="Descartar Diabetes Mellitus 2 Definitivo"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Quimica%20y%20Hemoglobina%20Glucosilada%20A1c%20Diagnosi"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 ¿Cómo utilizar FINDRISC Test Preventivo Global Diabético Finlandés Oficial Clínico Médico Standard Score Para Predictivo Inminente en Casa Rápidamente?"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"El validado y universal FINDRISC nace originario orgánico en Europa al interior de la cuna del país epidemiológico ejemplar de los análisis nórdicos preventivos la población nativa original nórdica y finesa (Finnish Diabetes Risk Score Score Punteado y Estratificado Universal Metabólico Médico Test) y ha cobrado global mundial la validez como primerísimo insustituible filtro universal para tamizaje predictivo diabético incruento estadunidense global sudamericano latino general sistémico basal."}</p>
                        <p>{"Es radicalmente simple de medir al evadir sofisticaciones: En ocho fáciles factores auto-referidos innegables auto-verificables sin sangre (Cintura adiposa, antecedentes obesas familiares puros de sangre genéticos en obesidad y tíos, presiones hipertensas arteriales crónicas del sistema)."}</p>
                        <p>{"Calcula con implacable precisión si cruzaras un rango o el dramático umbral liminar letal biológico de los crueles quince puntos, requiriendo obligatoriedad imperativa sin escape o exclusión a toda la gente acudir por punciones de sangre inminentes en hemoglobina glico-A1C que diagnostique un pre-diabetes incipiente veladamente furtiva."}</p>
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
