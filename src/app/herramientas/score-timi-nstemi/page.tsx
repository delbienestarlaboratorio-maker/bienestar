'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ScoreTimiNstemiPage() {
    const [edad, setEdad] = useState<boolean>(false);
    const [riesgos, setRiesgos] = useState<boolean>(false);
    const [coronaria, setCoronaria] = useState<boolean>(false);
    const [aspirina, setAspirina] = useState<boolean>(false);
    const [anginas, setAnginas] = useState<boolean>(false);
    const [ecg, setEcg] = useState<boolean>(false);
    const [marcadores, setMarcadores] = useState<boolean>(false);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        let pts=0;if(edad)pts++;if(riesgos)pts++;if(coronaria)pts++;if(aspirina)pts++;if(anginas)pts++;if(ecg)pts++;if(marcadores)pts++;let l='Bajo Riesgo',c='text-green-600',b='bg-green-100',r=0;switch(pts){case 0:case 1:case 2:r=8.3;break;case 3:r=13.2;l='Riesgo Intermedio';c='text-yellow-600';b='bg-yellow-100';break;case 4:r=19.9;l='Riesgo Intermedio';c='text-yellow-600';b='bg-yellow-100';break;case 5:r=26.2;l='Alta Severidad';c='text-orange-600';b='bg-orange-100';break;case 6:case 7:r=40.9;l='Riesgo Extremo Agudo';c='text-red-600';b='bg-red-100';break;}let desc='Probabilidad fatal de muerte inminente isquémica a 14 días: '+r+'%.';setResultado({value: pts+'/7', label:l, color:c, bg:b, desc:desc});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-red-700 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">❤️ Score TIMI (NSTE-ACS)</h1>
                    <p className="text-red-100 mt-2">Riesgo Síndromes Coronarios Agudos Sin Supradesnivel</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Predictores Isquémicos a evaluar (1 punto c/u)</h2>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="edad" checked={edad} onChange={(e) => setEdad(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="edad" className="text-sm font-bold text-gray-700">{"Paciente tiene 65 años o más"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="riesgos" checked={riesgos} onChange={(e) => setRiesgos(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="riesgos" className="text-sm font-bold text-gray-700">{"3 factores: Diabetes, Tabaco, HTA, Obesos o Colesterol"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="coronaria" checked={coronaria} onChange={(e) => setCoronaria(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="coronaria" className="text-sm font-bold text-gray-700">{"Estenosis coronaria antigua comprobada > 50%"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="aspirina" checked={aspirina} onChange={(e) => setAspirina(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="aspirina" className="text-sm font-bold text-gray-700">{"Uso diario profiláctico de Aspirina los pasados 7 días"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="anginas" checked={anginas} onChange={(e) => setAnginas(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="anginas" className="text-sm font-bold text-gray-700">{"≥ 2 ataques repentinos severos de angina dolorosa en últimas 24 hrs"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="ecg" checked={ecg} onChange={(e) => setEcg(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="ecg" className="text-sm font-bold text-gray-700">{"Desnivel nuevo y objetivo del trazo ST eléctrico > 0.5 mm"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="marcadores" checked={marcadores} onChange={(e) => setMarcadores(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="marcadores" className="text-sm font-bold text-gray-700">{"CPK, Mioglobina, TnI Sanguínea Positivamente Elevada"}</label>
                    </div>

                    <button onClick={calcular} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Severidad TIMI Clínico</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Valoraciones Isquémicas Urgentes"
                    description="Para el manejo certero ante dolores agudos son recomendatorias las enzimas de necrosis y CPK en laboratorio."
                    actionText="Análisis y Marcadores"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Enzimas%20Cardiacas"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🫀 Guía Cardiológica y Coronaria: Score TIMI Clínico para NSTEMI (Sin Elevación de ST) / Angina</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>Un genérico orgánicamente e O inmenso Síndrome U en puro purísima Coronario genérico de u Agudo Inmenso O u en SICA o del (SCA puro) general O NSTEMI en purísima U en general puramente (Infarto inmenso Agudo u O sin pura en Elevación o U de del ST O U y del en la segmento genético purísima general O y ST) o la U y de inmenso y purísima la Angina de y Inestable, ocurre o si inmensurable mente puramente de biológicamente cuando general en de una y tu inmensurable la arteria O del corazón inmenso puro purísima se tapa inmenso u grandiosa e de general o orgánicamente de o no y general en no a al u a 100% como de e en los graves puros u en colosales STEMI inmensurable, inmenso sino que O a y u a un y puro genérico y en un genérico a O un 70%, 80% o de e en 90% u o 99% a causa y general O puramente en del de colosal purísima placa a e O u inmensa a purísimamente inmenso y trombo de parcialmente tapante orgánico colosal general O oclusión puros parcial u puros purísima masivos orgánicos de química. El electrocardiograma puramente a en y el O en paciente O a U U en de no y Muestra u no eleva de su curva genérica u en ST a o o y a diferencia O de o a del paciente y del infarto de clásico u; pero puramente de o U la puros u colosal e isquemia genérica u purísima falta U masiva de aire puro purísimamente U u o miocardio O y O O corazón y y está o matando a las U O a de purísimas en general a de U y masas general de las O general u a purísimas células en y de inmensurables de colosal biológica al U del las y O cardíacas o general de cardiaca a al general a largo U u O O O mediano e O de plazo o O genérico inmenso general puro O purísima inmensurable O U o en biológico en u en y clínica y. La colosal escala pura inmenso TIMI inmenso NSTEMI del o de O U infarto U O O inmenso decide o O de puros cuánto y riesgo U masivas inmenso orgánicamente en de del fatal de de u O o pura masiva o muerte O u cardiovascular aguda o el y al general a un u y O de de U al u o puros de el las 14 u O inmenso días u u U a puro O a base tiene puro y el paciente inmensurable o U puros y colosal en O su y U corazón al U en de genérico O e purísima u y inmenso U urgencia o a cardiología o de puro de en genérico. </p>
       
       <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Las 7 u Puramente O Inmensurables 7 Variables del de en TIMI NSTEMI O de Puntaje</h3>
       <p>El médico U u al O u el o de urgencias cardiólogo del u y sumará e O masiva o u 1 genérico u a punto de de U si inmensurablemente o u usted cumple O u a o U O O cuenta en o u genéticamente las de O o con alguna puros puramente O e purísimas siguientes U o a u U de a o a de colosales fallas u O O puramente genérico fisiológicas O o purísima en sangre U O pura y u O clínica u en genéricas del U o en U genérico O O purísima colosales de base a al inmensamente general en u en purísimamente pura a cardiológica de al u química:</p>
       <ul>
           <li><strong>Troponinas Elevadas u o U u puramente y Positivas (Laboratorios Puros u Cardiacos U Positivo O y general O puros u Inmensurables):</strong> Si la O troponina O O en en sangre u u o I u al de genérica T al o o u O en general está alta, su u su U o de O O corazón y ya o inmenso derramó O O e O o purísima de su inmenso masivo y U puramente en o u sangre a o a de su y inmenso base pura material a al U en interior, es O el general que una y célula O u a y miocardio O ya inmenso O u de colosal u pura purísima mente O puramente o genérica U o explotó O y o ya U a falleció y O murió U al y O de isquemia u al de puro el O y U o por U de al a un U infarto al O no o a no masiva no U en completo.</li>
           <li><strong>Alteración O en e la del e en u Curva en o U del del a la del O a ST al u a O en el o del u y Eléctrico (Desviación O o U del segmento O O O puramente ST U y de a al O o &gt;.5 un mm O de puro puro en genérica en y puros e inmenso genéricas O u):</strong> Denota inmensurable u sufrimiento absoluto U inmensurable o general U general y o isquemia a o y a cardíaca y en viva al pura orgánicamente al la del U celular miocardio o al viva general purísima.</li>
           <li><strong>Consumo u o Ingesta colosal Previa O e U en en las en u O y últimas al 7 en a U O días y de de general las puros o u O puramente u inmensurables O puros el inmenso u general del u los O u aspirinas o de Aspirina U de O puros en Base Aspirinas u o de inmenso de O y o O Acido Acetilsalicílico U purísimamente O:</strong> Inmensurable indica O al que el puro el U e de en el O en sistema y de su corazón y U U puros y ya u a general venía en o u su genético O de corazón el y a o al ya O O U u fallando O u genéricamente a al o puros general base en O e la u a de o colosal en su a al u a circulación U O u general O purísima puramente en al e.</li>
           <li><strong>Al a o a los Inmensos y Menos 3 O de y los O masivos el U o puros Factores U genéricos el Factores O y u puros y de u en de inmenso de Riesgos U U U y O O puros y O O puros y Coronarios U puros genéricos puros O o (Fumar puro, colosal O O Edad u a &gt;5 O e de años general, de genérica o O O u o en U general y Masivo a Diabetes U, u en a O Colesterol Alto o Hipertensión y a de a general U o a masiva al u):</strong> Tu y sistema genéticamente u U u sus y o arterias y y U a pura e venían puros en deterioradas u al u O pura purísima y de inmensamente u hace puro años.</li>
       </ul>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Puntaje O Final U y U y el El Riesgo al al En o al de u 14 inmenso y de a a de y Días O (Muerte o de O o U Isquemia Reincidente al e u al u o O o u U en y a u infarto en y de infarto)</h3>
       <ul>
           <li><strong>0 al a o a 2 Puntos:</strong> Bajo inmenso U a inmenso U O u general general u riesgo de (4.7 u o al O O en 8% u de inmensurables u puros u al de evento U en de O y O o de O fatal al a o letal O O U). Plan o de conservador en en genéricos y y al u o pruebas de y de O de U al o esfuerzo.</li>
           <li><strong>5 U a en O o 7 Puntos a a genéricos u U U (Riesgo puro en Alto O O O a Severísimo y O o al a):</strong> Genéricamente Inmensamente gigante U U u O O inmenso riesgo u o en y genérico a o O U (26 a O puramente al a al y O u inmensurable al el general 40.9% u u u). Exige al puro puramente el paciente cateterismo y O o genérica u y la de angiografía a O U u o U inmensamente u O al general O coronaria al O de urgencias a o de e el u O purísima masivo a O en U u colosal al a al O y puro O O puramente hospitalización y de al a U la O O u general U inmensamente U inmensurables u U U general e O y en pura en o O u el en en hospital general.</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Niveles TIMI para Anginas e Infarto Menores</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>El sistema TIMI del ACS para síndromes coronarios agudos que carecen de marcados y letales supradesniveles agudos del segmento eléctrico cardíaco (NSTEMI / Antiguamente Angina Inestable), cataloga el curso natural sin cirugía percutánea intervencionista.</p>
                        <p>Cada elemento clínico desde un abuelo sobre 65 y la documentada resistencia farmacéutica (usar diariamente pastillas con ASA aspirínica previas sin lograr impedir que el infarto se desvele) es matemáticamente letal si se añade a un biomarcador (CPK-MB) destructivo sangrante positivo.</p>
                        <p>La gradación estricta clasifica si el paciente tiene la viabilidad idónea cardióloga para simplemente permanecer observado rutinariamente, comparado al escalofriante pronóstico del 41% requerimiento quirúrgico agudo forzado vital en caso de juntar siete variables sombrías concurrentes.</p>
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
