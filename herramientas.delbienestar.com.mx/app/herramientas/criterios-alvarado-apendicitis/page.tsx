'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function CriteriosAlvaradoApendicitisPage() {
    const [sMigracion, setSMigracion] = useState<boolean>(false);
    const [sAnorexia, setSAnorexia] = useState<boolean>(false);
    const [sNauseas, setSNauseas] = useState<boolean>(false);
    const [sDefensa, setSDefensa] = useState<boolean>(false);
    const [sRebote, setSRebote] = useState<boolean>(false);
    const [sFiebre, setSFiebre] = useState<boolean>(false);
    const [lLeucocitos, setLLeucocitos] = useState<boolean>(false);
    const [lNeutrofilos, setLNeutrofilos] = useState<boolean>(false);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        let pts=0;if(s_migracion)pts+=1;if(s_anorexia)pts+=1;if(s_nauseas)pts+=1;if(s_defensa)pts+=2;if(s_rebote)pts+=1;if(s_fiebre)pts+=1;if(l_leucocitos)pts+=2;if(l_neutrofilos)pts+=1;let l='Irrelevante / Baja Sospecha Patológica Infecciosa del Apéndice Agudo',col='text-green-600',bg='bg-green-100',d='Es extremadamente improbable el diagnóstico. Riesgo inferior al margen del 7% basal.';if(pts>=7){l='Alta Probabilidad',col='text-red-600',bg='bg-red-100',d='Se interviene Quirúrgicamente Aguda y Crudamente o se recomienda e impera urgente Cirugía abdominal o Tomografía Contrastada TAC. Riesgo mayor del 93% en la apendicitis supurada letal.'}else if(pts>=5){l='Observación Estricta Activa',col='text-orange-600',bg='bg-orange-100',d='Incierto preoperatorio. Riesgo del 66%. Ingreso médico de control tomografía ultrasonográfica ecografía inminente o re evaluar test en 2 horas.'}setResultado({value: pts+'/10', label:l, color:col, bg:bg, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-orange-700 to-yellow-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-orange-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">💥 Criterios de Alvarado para Apendicitis</h1>
                    <p className="text-orange-100 mt-2">Estratificador clásico del riesgo real de Apendicitis Aguda</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Signos, Síntomas y Sangre"}</h2>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="s_migracion" checked={sMigracion} onChange={(e) => setSMigracion(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="s_migracion" className="text-sm font-bold text-gray-700">{"Síntoma: Migración evidente del dolor visceral periumbilical crudo hacia el lecho inferior de la Fosa Ilíaca Derecha localizada inflamatoria aguda somática pura y profunda dolorosa aguda dolor"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="s_anorexia" checked={sAnorexia} onChange={(e) => setSAnorexia(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="s_anorexia" className="text-sm font-bold text-gray-700">{"Síntoma: Anorexia plena franca o cetosis acetonas orales"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="s_nauseas" checked={sNauseas} onChange={(e) => setSNauseas(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="s_nauseas" className="text-sm font-bold text-gray-700">{"Síntoma: Náuseas activas eméticas innegables objetivas francas francas intensas y crudas y reflejas intensas inflamatorias vagales irritativas viscerales o reflejos vágales o vómitos recurrentes"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="s_defensa" checked={sDefensa} onChange={(e) => setSDefensa(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="s_defensa" className="text-sm font-bold text-gray-700">{"Signo Clínico: Defensa local innegable médica franca franca franca objetiva palpatoria abdominal táctil localizada focal peritoneal pura de resistencia irritada aguda localizada punzante en flanco inferior derecho FID inflamado franco (2 pts)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="s_rebote" checked={sRebote} onChange={(e) => setSRebote(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="s_rebote" className="text-sm font-bold text-gray-700">{"Signo Clínico: Reacción evidente positiva formal de Blumberg aguda letal abdominal irritada rebote descompresión al liberar dolorosa manual presión innegablemente peritoneal de franca defensa y de franca irritación (Signo Rebote Clásico letal u ombligo)."}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="s_fiebre" checked={sFiebre} onChange={(e) => setSFiebre(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="s_fiebre" className="text-sm font-bold text-gray-700">{"Signo Clínico: Termométrico febril febril con letales grados febriles orales documentado objetivamente en curva febrícula médica o elevación sistemica oral de temperaturas termométricas corporales inflamatorias febriles agrávantes y superiores y picos marcados de fiebre aguda mayor a franca > 37.3°C médica documentada febril termométrica comprobada o signos sistémicos sépticos tempranos clínicos febriles febriles febriles termométrica"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="l_leucocitos" checked={lLeucocitos} onChange={(e) => setLLeucocitos(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="l_leucocitos" className="text-sm font-bold text-gray-700">{"Laboratorio: Leucocitosis sistémica innegable química médica seria superior global seria general en recuento masivo en Biometría Hemática francamente innegable > 10,000 en el cuerpo global letal infeccioso global absoluto crudo de laboratorio puro analítico en sangre venosa y suero séptico hematopoyético celular blanca cruda franca pura sistémica defensiva celular leucocitosis (2 pts)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="l_neutrofilos" checked={lNeutrofilos} onChange={(e) => setLNeutrofilos(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="l_neutrofilos" className="text-sm font-bold text-gray-700">{"Laboratorio: Desviación inflamatoria leucitaria izquierda química >75% sistémica en Neutrofilia"}</label>
                    </div>

                    <button onClick={calcular} className="w-full bg-orange-700 hover:bg-orange-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Criterios Cumplidos de MANTRELS</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Una Simple BH (Biometría Hemática) Confirmaría Tu Apendicitis Aguda En El Score"
                    description="Más de 3 de los 10 puntos de Alvarado se calculan usando Biometría para ver Leucocitos."
                    actionText="Prueba de Leucocitos y Sangre"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Biometria%20Hematica%20Leucocitos"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía Quirúrgica de Urgencias: Criterios de Alvarado (Apendicitis Aguda)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>La Escala o inmensurable Score de Alvarado inmensurable O o inmenso de u la Inmensurables U u cirugía de urgencia U O genéricamente a inmenso clínica O u a inmenso U evalúa U O o en genérico al e la probabilidad o el Inmenso o genérica O u inmensa U a O o U de O u apendicitis inmensurable aguda en pacientes con O u dolor en Fosa Inmenso Ilíaca Derecha Inmensurable U u de o fundamentalmente U paramétricamente al avance Inmensurables u O al de u inflamación Inmensurables.</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia de Perforación Apendicular</h4>
           <p className="text-red-700 m-0">Puntuaciones inmenso inmensurables genéricas o mayores inmensurables al a U y 7 inmenso a Inmenso u de urgencia Inmenso O u genéricamente U indican genéricamente alta probabilidad u a la inmensa cirugía inminente inmenso (Apendicectomía).</p>
       </div>

       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios Severos Críticos</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/biometria-hematica" className="text-blue-600 font-semibold hover:underline">Biometría Hemática Completa (Requisito: Leucocitosis)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Interpretación Pura del Score de Alvarado Pediátrico y Adulto Peritonitis"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"El sistema histórico clásico innegable de Alvarado es la piedra angular diagnóstica clínica y pre quirúrgica estadística universal quirúrgica en cualquier servicio inclemente y activo crudo hospitalario de urgencias gástricas del globo."}</p>
                        <p>{"Asigna matemáticamente pesos específicos crudos inflamatorios a signos clásicos y a leucocitos (Puntos inflamatorios blancos celulares neutrofilos innegables puros métricos en una clásica simple Biometría general hemática hospitalaria venosa) categorizando en leve o franca emergencia aguda abdominal inminente de sala quirúrgica y quirófano inclemente estéril."}</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 mt-6">
                        <strong>⚠️ Aviso:</strong> Esta herramienta es orientativa y NO sustituye el diagnóstico médico profesional. Consulta a tu médico para interpretación.
                    </div>
                </div>

                
                <RelatedTools currentPath="/herramientas/criterios-alvarado-apendicitis" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
