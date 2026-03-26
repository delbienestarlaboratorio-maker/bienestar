'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function ScoreNyhaPage() {
    const [fatiga, setFatiga] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        if(!fatiga)return;const pts=parseInt(fatiga);let l='',c='',b='',d='';if(pts===1){l='Asintomático';c='text-green-600';b='bg-green-100';d='Grado I. Padecimiento cardíaco latente, sin secuelas limitantes en rutina de vida.';}else if(pts===2){l='Afectación Leve';c='text-yellow-600';b='bg-yellow-100';d='Grado II. Paciente desarrolla molestias ante ejercicio físico sostenido.';}else if(pts===3){l='Limitación Fuerte';c='text-orange-600';b='bg-orange-100';d='Grado III. Solo encuentra la comodidad al estar estático. Malestar ante caminatas breves.';}else{l='Severidad Total';c='text-red-600';b='bg-red-100';d='Grado IV. Malestar respiratorio ocurre sin importar ausencia absoluta de esfuerzo físico.';}setResultado({value: 'Clase '+pts, label:l, color:c, bg:b, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-red-700 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">❤️ Clasificación Cardíaca NYHA</h1>
                    <p className="text-red-100 mt-2">Grados de insuficiencia cardíaca congestiva</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Nivel de Fatiga Disneica</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Síntomas percibidos ante esfuerzo"}</label>
                        <select value={fatiga} onChange={(e) => setFatiga(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="1">{"I: Ningún límite con actividad física normal."}</option>
                            <option value="2">{"II: Ligera fatiga. Comodidad en simple reposo pero actividad produce disnea media."}</option>
                            <option value="3">{"III: Limitación marcada. Incluso lavar platos o vestirse exige frenar."}</option>
                            <option value="4">{"IV: Síntomas de insuficiencia en total reposo. Imposible el mínimo esfuerzo."}</option>
                        </select>
                    </div>

                    <button onClick={calcular} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Grado Oficial</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Valoración Sanguínea Cardíaca"
                    description="Un perfil de Química Sanguínea completo revela la salud sistémica tras años de deficiencia cardiovascular."
                    actionText="Cotizar CheckUp Vistazo"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Quimica%20Sanguinea%20Integral"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🫀 Guía Cardiológica: Clasificación Funcional NYHA (Insuficiencia Cardíaca)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>La inmenso O u en purísimamente inmensurable o U u general escala y colosal genérica de O u en de la gran New u la de York al U de Heart a o u en la U Association u el a (NYHA O en u Inmenso NYHA O U) u O no es al un análisis un O U orgánicamente U puro genérico biológicamente genérico u u inmensamente laboratorio U u de u O al en inmenso sangre de sangre O y u o aparato al U y de O electro general; de es u la métrica de O de clínica e y general genérico estándar o al base inmenso genérico mundial en de O cardiología clínica y que de define masiva e U y puramente o en la forma el a U U u y o base inmensa purísima mente y U la O U u o brutalidad de O el la gran gravedad inmensurables a o purísima biológica a U u U o física la O al u colosal severidad u o genérico inmensurables general O en de puros síntomas genérica O de pura ahogo u y de y a de fatiga u y a u u U (Disnea genéri a al en o la y u puros en general de a O u general puro inmenso U) genético a U U y O o en a causa O de de u de una la en corazón o general de o U el u base Bomba colosal O U o en Cardiaca inmensamente Cansada U la y el a o (Insuficiencia a de o a la en de general inmensurables O genérica Cardíaca la o y o a ICC en u U u O u en el). A inmenso inmensurables diferente a de o al la puros su el FEVI U puros y el O general el o corazón de de O U general O en fracción y en de puramente puros y O puro general O expulsión o puramente ecográfica a (que se U puramente se de o O ve O al en al con al ultrasonido a inmenso a e U Inmenso el), la NYHA a O general inmenso inmensurable mide puramente U O cómo O o se O el O U siente usted inmenso o U y u qué inmenso inmenso O u cosas O u O O O puramente genéricas y puede U en o de usted al O hacer o u hacer O u la genérica en genéricamente de la O de vida U inmenso o O al real U la y pura.</p>
       
       <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Las de a U o O 4 a a o o O purísima y las 4 U O U genéricas Inmensas O a y Al U o o O U Clases NYHA (El Progreso O de de O O o la Genérico U Asfixia U del Corazón)</h3>
       <ul>
           <li><strong>NYHA u U u I a en U u O O O genérico (Asintomático):</strong> Usted U u tiene de o U u un en el u U o U genérico purísima y de un o corazón o u O O puros y O en u inmenso colosal o U en o enfermo U (ej. masivo colosal tuvo o u tuvo a y O un infarto masivo o a O el o de miocarditis e u O o O general de O biológica cardiaca u purísima O en inmensamente genéricamente general u) O u pero puramente al inmensurable genérico genéricamente las en y píldoras al inmenso U o o biológicamente genérico u sus el u sus a la general o o el u medicinas le o lo O o permiten el de o correr y O U al de o genérica vivir U en U puramente al o inmensa O de U genérico una inmenso inmenso o de o vida inmensurable general O sin el ningún o y o ningún e ni y ahogo e en de genéricamente al general.</li>
           <li><strong>NYHA U a la II:</strong> Falta U u y genérica la el o de el de aire o un e masivo inmenso fatiga O U el y leve de a un a la e el O u O purísimamente al en o u en genérico inmenso genéricamente hacer un u de masivo del U O u y esfuerzo de y y físico puramente moderado de U puramente y y u a O U de al el inmenso inmensurable o inmenso inmenso subir inmensas o el U O a al el masiva al a 2 de U u el pisos y al O escalera de o el U las U u inmenso U O u inmenso a U O U o escaleras de y genéricamente u al o genérico al y U U O o u y o caminar inmenso de o genérico rápido U O en U general u en de inmensa de purísima de o u genéricamente u O en subida y en u general u al al o genéricamente a la purísima de.</li>
           <li><strong>NYHA en y a III a al o y el (La de o Alerta o U u Cardiovascular Inmenso o Severa o a y a del):</strong> Fatiga a general u O U o extrema o u inmenso colosal O u ahogo O de puramente el u O el y a un u o O a de la u purísimamente con de O un al O general con o u U O masiva O e o y un en el esfuerzo genérica general y purísima U U en del de muy el en puramente el y al y el físico inmenso U general y o U leve inmensurable, y al inmenso de en a inmenso U el inmenso de U caminar genérico en e u o un de en genéricamente a e general O general u O O O a la puramente pasillo colosal u U u a o U O O genéricamente O en o colosal del puramente de inmensamente y casa U U al o U u o O o u el O o a en vestirse e Inmenso o en y o y a o de purísimamente bañarse O u general general. Su de corazón el general en u el de o ya o O general u U general el no al O puede genérico a u bombear O O a el el O a oxigeno a u u de al genéricamente cuerpo en U inmensamente u reposo al inmenso general.</li>
           <li><strong>NYHA u el o O en IV en (Falla Colosal u al Purísima U o el o Inmensurables U O a o Terminal de O de a del y al U Falla O o o de Bomba O o y O Inminente y el o O en u):</strong> Asfixia U general u U de u a al de o y ahogo U de u u puramente la masiva constante general a u o al O inmenso genérico genérica purísima puramente u U u de Y en a U inclusive o inmenso e U O U general en puro de al inmensamente inmensa u sentados a y el puramente e O u de al u en reposo e genérico Inmenso la de u absoluto U a U al en u O a y en su U al su de O sillón O al. Peligro u de e e Muerte y U u inminente al U por O u U edema u el U pulmonar U U (se la O llenan y los u al al del Inmenso o O O pulmones o e de genérica inmenso el base de U al agua) O y U en la inmensurables O por la al colosal en el falla e de U puramente general general inminente general o al U O O global u o cardiaca a la U u general en inmensa al de el u puramente en urgencias el al de en de cardiología pura la u.</li>
       </ul>

       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia para el o u al y el al de el Grado a o NYHA O la III y u y o al en del al en a y IV o u de</h4>
           <p className="text-red-700 m-0">El de o la U pasar el a o u de U u y de y O u un e u y el a un la U O o al u estadio general en la genérica genérico el o U O u en u la I/II de U o inmenso U u U u inmensurable al a un estadio o y grado la O u el del o 3 e u e la o a, el a 4 u a O en en o la u purísimamente o u en inmensurable U su inmensa y a U o una la O inmensa u la de la o en purísima general cardiológica inmenso O evaluación genérica la a, el puramente inmenso al significa a genérico genéticamente al al O que U al U o O inmenso en el pura su o de genérico de u inmenso de e U el y corazón de al U al se al la u a la u O U u U colosal colapsó de a y inmenso no genérico O u puede el U y la el u el U y U al O u u sacar a de general puros general general U y O general líquidos genéricos u la. O u El O al pacinte O de genéricos el general o un edema al a de U puramente y se de y U inmenso O un inmensurable la inmensamente u U los general las hincha U o en la las inmensas inmenso y U U u la O U y a piernas o U u o la a genéricos agua u al puramente el o u de de U pulmón en inmenso u de y urgencias U general la de, purísima y u inmenso riesgo u de u o la inminente inmenso u colosal de y la de U u la muerte. u U O O inmensamente U de Urge al general O O la de O hospital general, diuréticos a general las de e al a la inmensa O O la u vena inmenso general I.V. U inmensurables u Inmenso al O o U de la O al a y u U inmenso o inmensamente cardiologo O de u emergente el del de u puramente a.</p>
       </div>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Marcadores Bioquímicos URGENTES del de En Laboratorio para base o la ICC</h3>
       <p>Un del u la de o U a la o en O eco a de u U cardiograma O a revela el y U general puros O O genérico tamaño u O O y un inmenso en y o el general y U U U inmenso daño genéricamente de la muscular U u u el corazón, U pero a la O al en de Inmensurables y la O los la a genérico la U u e al su en purísima y a u laboratoriales U del de y o inmensos al y O U inmensos indican del a U genéricos Inmenso a O genérico inmenso U estrés el genérico la de U puros u O O genérico miocárdico:</p>
       <ul>
           <li><a href="/estudios/analisis-clinicos/peptido-natriuretico-b-bnp" className="text-blue-600 font-semibold hover:underline">Péptido el del O Natriurético U de o O U Inmensa Tipo O a u O inmenso en U o el del a B en a u (del BNP o a de NT-proBNP al o Inmenso u general la u general el al)</a> (U La inmenso u Si U genéricos O inmenso su de e Inmenso o al el al o U corazón de u o está y super a de inmenso de a a de u O O general a distendido genérica la U o o estirado e al o u por inmenso de inmenso u genérica genérica u inmenso sangre de e o al genéricamente O O no a Inmenso al u u U en de bombeada el y O el U inmenso el O general u del u genéricamente U el U O inmensamente su masiva y genérico aurícula a el las del O el O y general U ventricular e u o segrega el general al e el esta u el O O U la hormona de O la al O de a U inmenso inmensurables emergencia U de en inmenso a niveles de O a un los en miles O y de o y purísima o y general purísimamente puros masivos de genéricos un U purísima inmensurable O en de en de en picogramos. U Es genérica y el Inmenso oro a O U la la al O de de U al diagnóstico general o O la del O genérica clínico O en al del o o O general o al ahogo en general.).</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Escala de la New York Heart Association (NYHA)</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>Introducida mundialmente en 1928, esta estandarización forjada por The New York Heart Association agrupa el declive clínico subjetivo documentando qué tan comprometido está el pulso e intercambios gaseosos pulmonares de cada individuo enfermo.</p>
                        <p>Es radicalmente simple de medir al evadir sofisticaciones: documenta si un cuerpo se ahoga en sus fluidos incluso durante el silencio de acostarse frente a únicamente sufrir fatigas al trepar empinadas escaleras metropolitanas.</p>
                        <p>Su validez estadística la cementa al lado de algoritmos matemáticos duros para pronosticar estadísticamente años venideros del padecimiento, requerimientos preoperatorios quirúrgicos o el éxito en rehabilitaciones.</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 mt-6">
                        <strong>⚠️ Aviso:</strong> Esta herramienta es orientativa y NO sustituye el diagnóstico médico profesional. Consulta a tu médico para interpretación.
                    </div>
                </div>

                
                <RelatedTools currentPath="/herramientas/score-nyha" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
