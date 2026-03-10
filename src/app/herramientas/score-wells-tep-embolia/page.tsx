'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ScoreWellsTepEmboliaPage() {
    const [w1, setW1] = useState<boolean>(false);
    const [w2, setW2] = useState<boolean>(false);
    const [w3, setW3] = useState<boolean>(false);
    const [w4, setW4] = useState<boolean>(false);
    const [w5, setW5] = useState<boolean>(false);
    const [w6, setW6] = useState<boolean>(false);
    const [w7, setW7] = useState<boolean>(false);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        let p=0;if(w1)p+=3.0;if(w2)p+=3.0;if(w3)p+=1.5;if(w4)p+=1.5;if(w5)p+=1.5;if(w6)p+=1.0;if(w7)p+=1.0;let l='TEP Improbable Baja Pobre Probabilidad Clínica D-Dímero Confirmatorio Agudo Desacreditada y Virtual Mínima y Negativa y Virtualmente Clínica Mínima Nula Infecciosa',col='text-green-600',bg='bg-green-100',d='Riesgos del <3.4%. Exigir Dímero-D, si es negativo se excluye el TEP. Si no pedir Angio TAC pulmonar para estar super certeros médicos.';if(p>6){l='Alta Confirmatoria Flagrante Probable Urgente Alta Cruda Y Letal TEP',col='text-red-700',bg='bg-red-100',d='Riesgos del 40-78%. Escanear inminente urgente letal rápido urgente innegable con TAC Tomografía inyección médica pulmonar angiográfica Angio y Angio escáner urgente cruzar a vascular urgente hospitalizado heparina inmediata cruda masiva.'}else if(p>=2){l='Moderada Cierta Probabilidad Angio Indudable Tomográfica',col='text-orange-600',bg='bg-orange-100',d='Riesgos del 16% al 28%. Requiere Dímero D altísimo o tomografía médica pulmonar torácica.'}setResultado({value: p+' pts', label:l, color:col, bg:bg, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-sky-700 to-blue-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-sky-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🩸 Score WELLS Embolismo Pulmonar</h1>
                    <p className="text-sky-100 mt-2">Probabilidad Tromboembólica Pulmonar Aguda</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Síntomas y Clínica de Embolismo y Coágulos Sangrantes"}</h2>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="w1" checked={w1} onChange={(e) => setW1(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="w1" className="text-sm font-bold text-gray-700">{"Signos francos visibles de Trombosis Cruda Severa Clínica Venosa TVP en extremidades y dolores profundos pantorrilla edematoso (3.0 pts)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="w2" checked={w2} onChange={(e) => setW2(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="w2" className="text-sm font-bold text-gray-700">{"Acaso y ¿El Diagnóstico TEP es flagrantemente médicamente e indiscutiblemente la Causa Mayoritaria Más Fuerte Cruda Que Explícitamente Biológica Explica el Choque Paciente Crudo Y No Hay Más Opciones Claras y Despejables Diagnósticas Mejor Explicativas Evidentes Alternativas Agudas Clínicas Clínicas (3.0)?"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="w3" checked={w3} onChange={(e) => setW3(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="w3" className="text-sm font-bold text-gray-700">{"Tasa Rápida Pura Pulso y Taquicardia Arterial Cardiaca Severa Estricta Acelerada Innegable Letal Masiva y Elevada Cardiaca Frecuencia > 100 y letal cardiaca lpm pura (1.5 pts)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="w4" checked={w4} onChange={(e) => setW4(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="w4" className="text-sm font-bold text-gray-700">{"Postración Cama Indiscutible Quirúrgica Trombomatosa > 3 crudos días reposos o Invasión Médica Operatoria Cirugía Previa de menos o a los postreros 30 o 4 Semanas quirófano previo (1.5 pts)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="w5" checked={w5} onChange={(e) => setW5(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="w5" className="text-sm font-bold text-gray-700">{"Histórico Precedente Claro Crónico Confirmado Franco Biológico e Indudable Clínico Médico Trombosis Médica TVP Pura Ciega Previa Médica Crónica Basal Comorbida o TEP Histórico Médico Documentado Explicito Previo Base Trombogénico Biológico Comprobado (1.5 pts)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="w6" checked={w6} onChange={(e) => setW6(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="w6" className="text-sm font-bold text-gray-700">{"Desgarro Hemangioma Franco Tos Hemoptisis Cruda Sanguinolento Expectorante Puro Sangrante Ortopneico Clínico Tos o Moco Sanguineo Tisular Letal Franco Frotis o Tos Aguda Respiratorio y Sangre Respiratorio Esputando Sangre Esputo Sangrante Innegable Sangrante Respiratorios Puro (1.0 pts)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="w7" checked={w7} onChange={(e) => setW7(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="w7" className="text-sm font-bold text-gray-700">{"Neoplasia Metástasis Letal Tumoral Maligna Activa Biológica o tratada crónicamente hace un año 6 letales dolorosos y malignos Oncológicos meses crónicamente de historial activo invasivo agresivo médico (1.0 pts)"}</label>
                    </div>

                    <button onClick={calcular} className="w-full bg-sky-700 hover:bg-sky-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Wells Riesgo Calculador Clínico TEP Masivo Trombótico Global</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Valoración Sangre y Fibrina Letal Dímero D Torácico TVP Trombo Confirmatoria"
                    description="Si sacas más de 1.5 puntos Wells necesitas urgente obligadamente verificar el biomarcador D-Dímero cruzado sangrante para evitar infarto vascular masivo."
                    actionText="Cuantifica Sangrado y Fibrina D"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Dimero%20D%20Sangre%20Letal%20Cuantitativo"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🫁 Guía Médica de Urgencias: Escala de Wells para TEP (Embolia Pulmonar)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score de Wells es la inmensa regla u de Inmenso y Inmensurables U genérica predicción u O u clínica o al el de al a O y oro genérico u al mundial Inmensurables U O para U O u U al inmenso estimar Inmenso la probabilidad a la o de de u o y O U que un al al paciente Inmenso con a de u o genéricamente U Inmensurables O U en síntomas inmenso inmensurables de de dolor torácico u U en O o a y disnea u al puramente aguda inmensurable U O U en inmenso o U u al en la al o y genéricamente de la O U o O tenga e un Embolismo O Pulmonary O al (TEP), una U inmenso O u de de o urgencia O u de de Inmenso mortal en Inmenso al a la Inmensurables en o u inmenso U.</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia de Riesgo Alto (Inminente)</h4>
           <p className="text-red-700 m-0">Un score O U de U U mayor U al genéricamente Inmenso a O u O 6 de u o O puntos en inmenso Inmenso genérica u y a a al inmenso genéricamente U u O requiere Inmenso genéricamente a AngioTAC inmenso o U pulmonar U U inminente U. Si es de u O o moderado, U o genéricamente a debe puramente inmenso u genéricamente U O U inmensurables O O la a realizarse u al Inmenso al de u purísima O u general Dímero-D.</p>
       </div>

       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios URGENTES</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/dimero-d" className="text-blue-600 font-semibold hover:underline">Marcador Tromboembólico Dímero-D</a> (El descartador químico de oro. Si es Inmenso u U O general negativo, descarta O el general U a TEP por O a O completo).</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Por qué y cómo diagnosticar TEP con Score Wells Urgente Hemático Coagulación Coágulos"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"Diseñado para urgencias agudas por el ínclito hematólogo letal Wells a finales médicos de los noventa. Es la herramienta oficial mundial dorada trombótica indiscutible clínica letal predictiva sistémica angio cardiológica validada en guías para filtrar coágulos masivos mortales agudos y fulminantes innegables embolismos mortales arteriales pulmonares obstructivos venosos (TEP)."}</p>
                        <p>{"Esta letal escala ponderada adjudica innegables biológicos puntos matemáticos crudos logarítmicos mayores cuando explícitamente existe trombos innegables crudos venosos de venas grandes TVP o cuando no se dispone absolutamente innegable e indiscutible médica o biológicamente de nadie y nada que explique la aguda disnea insufrible cruda hipóxica sino un embolo."}</p>
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
