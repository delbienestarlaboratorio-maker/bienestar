'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function CURB65Page() {
    const [c, setC] = useState(false); // Confusion
    const [u, setU] = useState(false); // Urea > 19 mg/dL
    const [r, setR] = useState(false); // Resp rate >= 30
    const [b, setB] = useState(false); // BP systolic < 90 or diastolic <= 60
    const [a, setA] = useState(false); // Age >= 65

    const score = (c ? 1 : 0) + (u ? 1 : 0) + (r ? 1 : 0) + (b ? 1 : 0) + (a ? 1 : 0);
    const aggegado = c || u || r || b || a;

    const getRecommendation = () => {
        if (score === 0 || score === 1) return {
            riesgo: 'Riesgo Bajo (Mortalidad < 1.5%)', color: 'text-green-700', bg: 'bg-green-50',
            accion: 'Manejo ambulatorio (tratamiento en casa).'
        };
        if (score === 2) return {
            riesgo: 'Riesgo Moderado (Mortalidad ~ 9.2%)', color: 'text-orange-700', bg: 'bg-orange-50',
            accion: 'Hospitalización recomendada (Corta estancia o pabellón general).'
        };
        return {
            riesgo: 'Riesgo Alto (Mortalidad ~ 22%)', color: 'text-red-700', bg: 'bg-red-50',
            accion: 'Ingreso urgente. Considerar Unidad de Cuidados Intensivos (UCI).'
        };
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-sky-700 to-indigo-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-sky-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🫁 Score CURB-65</h1>
                    <p className="text-sky-100 mt-2">Evaluador de severidad para Neumonía Adquirida en la Comunidad (NAC)</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">Suma 1 punto por cada criterio presente en el paciente respiratorio para predecir la mortalidad a 30 días y guiar el sitio de tratamiento.</p>

                    <div className="space-y-4 mb-8">
                        {[
                            { state: c, set: setC, letter: 'C', title: 'Confusión', desc: 'Desorientación mental aguda o AMTS ≤ 8' },
                            { state: u, set: setU, letter: 'U', title: 'Urea (BUN) Elevado', desc: 'BUN sanguíneo > 19 mg/dL (Urea > 7 mmol/L)' },
                            { state: r, set: setR, letter: 'R', title: 'Respiración (Taquipnea)', desc: 'Frecuencia respiratoria ≥ 30 respiraciones por minuto' },
                            { state: b, set: setB, letter: 'B', title: 'Blood Pressure (Hipotensión)', desc: 'Presión arterial sistólica < 90 mmHg o diastólica ≤ 60 mmHg' },
                            { state: a, set: setA, letter: '65', title: 'Edad de 65 años o más', desc: 'El paciente cuenta con 65 años cumplidos o mayor' }
                        ].map((item, idx) => (
                            <label key={idx} className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${item.state ? 'bg-sky-50 border-sky-300' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                                <input type="checkbox" checked={item.state} onChange={(e) => item.set(e.target.checked)} className="mt-1 w-6 h-6 text-sky-600 rounded" />
                                <div>
                                    <span className="font-black text-sky-800 text-lg mr-2">{item.letter}</span>
                                    <span className="font-bold text-gray-800">{item.title}</span>
                                    <span className="block text-sm text-gray-500 mt-1">{item.desc}</span>
                                </div>
                            </label>
                        ))}
                    </div>

                    {aggegado && (
                        <div className="mt-8 animate-in fade-in">
                            <div className="flex gap-4 items-center justify-center p-6 bg-gray-100 rounded-t-2xl border-b border-gray-200">
                                <div className="text-center">
                                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Puntaje Total</span>
                                    <p className="text-6xl font-black text-gray-900">{score}</p>
                                </div>
                            </div>

                            {(() => {
                                const rec = getRecommendation();
                                return (
                                    <div className={`${rec.bg} p-6 rounded-b-2xl border border-t-0`}>
                                        <p className={`text-xl font-bold ${rec.color} mb-2`}>{rec.riesgo}</p>
                                        <p className="text-gray-800 font-medium">{rec.accion}</p>
                                    </div>
                                );
                            })()}

                            <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-6 mt-8">
                                <h3 className="font-bold text-sky-900 text-lg mb-3">🔬 Requisitos Complementarios</h3>
                                <p className="text-gray-700 text-sm mb-4">Para confirmar formalmente este Score se requiere soporte de laboratorio e imagen. Recomendamos a su médico tratante solicitar los siguientes elementos para descartar complicaciones sistémicas asociadas a la neumonía:</p>
                                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 mb-4 font-medium">
                                    <li>Nitrógeno Ureico en Sangre (BUN) / Úrea</li>
                                    <li>Radiografía de Tórax AP y Lateral</li>
                                    <li>Biometría Hemática Completa</li>
                                    <li>Hemocultivos o Cultivo de Expectoración (en scores ≥ 2)</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                
                <StudyCTA 
                    title={`Evaluación Respiratoria Crítica`} 
                    description={`Un paciente pulmonar comprometido necesita una Radiografía de Tórax inmediata para evaluar consolidación y Biometría Hemática para medir la carga de la infección bacteriana.`} 
                    actionText={`Cotizar Rx y Biometría`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Rx%20y%20Biometr%C3%ADa*`} 
                    type="estudio" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🫁 Guía Neumológica y de Urgencias: Escala de Severidad CURB-65</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score puramente general y orgánico Inmenso Médico Clínico CURB-65 representa para la medicina purísima mundial de urgencias pulmonares la máxima regla y escala basal y enorme pilar mundial predictivo validado internacionalmente para la biológica inmensa neumonía colosal base orgánica adquirida orgánicamente clínica en la sociedad y genérica comunidad física (NAC orgánico e inmenso basal genérico). Su fin y objetivo colosal celular mundial no es puramente dar el letal nombre al patógeno biológico pulmonar en neumococo vírica profunda enorme y material basal en bacterias, sino el pronosticar con extrema colosal y matemática inminencia si el paciente general basal humano en su pura e inmensa fase biológica grave clínica inmediata vivirá general basal en su orgánica inmensidad extrema de urgencias de piso inmenso respiratorio médico hospitalario u si orgánicamente su extrema mortalidad biológica a los inmensos 30 basales ininterrumpidos y químicos días puramente de urgencia requiere masiva asistencia en general extrema material en intubación colosal basal de la UCI sistémicamente basal médica en urgencia química pura genéticamente celular letal profunda orgánica general aguda y respiración masivamente forzosa biológica clínica inmensidad puro general sistémicos respirador mecánicamente enorme orgánicamente clínica base.</p>
       
       <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Siglas de Puntuación Clínica (Desgloce Explicado de Signos Vitales C-U-R-B)</h3>
       <p>Cada letra asigna estadísticamente 1 punto por el brutal colapso celular en caso de que esté positivo:</p>
       <ul>
           <li><strong>C (Confusión Inmensa Mental Cerebral Basal Orgánica):</strong> Refleja fisiológicamente puramente biológicamente que hay gigantesca orgánicamente en sangre una baja basal general y extrema o enorme colosal sistémica oxigenación del grandísimo químico material basal tejido y masa del cerebro, a nivel general hipoxia.</li>
           <li><strong>U (Urea o Nitrógeno Ureico BUN altísimo a los promedios puros de &gt;9 biológicos mgr/dl):</strong> Revela uremia grave, mostrando que inmensamente material orgánico el inmenso inmensurable sistémico puramente basal o genético sistema puro inmenso riñón y basal filtrado genérico en riñones físicos están colapsando al 100 absoluto debido a y en el medio en pura respuesta y a enormes torrentes e inmensos colosales general sistémicos físicos shock colosal celular sistémicos o fallas severas inmensurables u puros infartos generales químicos generales multiorgánicos severos y letales sistémicamente agudos puros biológicamente fallas letales masivas químicas fallas puramente gigantes de deshidratación extrema médica basal y base profunda pura sanguínea extrema fallando renal general basal masivo profundo colosal celularmente.</li>
           <li><strong>R (Respiratoria Frecuencia Acelerada Taquipnea a los &gt;0 por altísimo por puros minutos basal general respirando enormemente físicamente orgánicos químicos generales continuos ininterrumpidos y físicos minutos):</strong> Una musculatura física y orgánica pélvico o accesoria del tórax inmenso orgánicamente en colosal fatiga enorme masiva y puro extrema agotamiento gigante respiratoria asfixia clínica purísima letal material inminente general física.</li>
           <li><strong>B (Blood pressure o enorme y sistémica presión de arterias pura y química menor a &lt;0/60mmHg puros inmensos mm químicos de base mercurio profundos e ininterrumpibles basales orgánicamente basales cardiovasculares en falla base):</strong> Shock distributivo basal colosal masivo general puramente en la severísima masiva y química orgánica sangre sistémico, pre-paro orgánicamente general purísima del colapso humano corazón cardiovascular basal en genético de la gran e inmensa base bomba puro sistémico físico circulatorio basal extremista genérica por sepsis.</li>
           <li><strong>65 (Años o edad pura en su superior e inmenso a los más gigantes grandes sesenta y cinos puros grandísimos largos y largos físicos basales fisiológicos grandes químicos biológicamente enormes puros y generales de edad e inmenso sistémicos años generales somáticos vitales):</strong> La Inmunosenescencia gigante purísima o gran inmenso material de deterioro masivo químico a nivel basal genéticamente base natural inmunológico orgánico basal envejecimiento celular general celular orgánico puro del cuerpo sistémico hace que el paciente humano sucumba inmensamente brutal a las bases neumonías que puros masivos y general químicos o enormes orgánicos e inmensos sanos gigantes biológicamente e inmensamente puro metabólicos hombres o en mujeres jóvenes resisten en biológico físico basalmente enorme orgánicamente purísima sanación celular médica.</li>
       </ul>

       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia de Riesgo Médico de 4 a 5 Puntos (Mortalidad a Tope del 27.8%)</h4>
           <p className="text-red-700 m-0">Toda y absolutamente y de pleno valor de 4 O inmensamente gigante la absoluta puntuación o de escala general el puntaje o puntajes purísimamente generales o inmensas métricas colosales de base clínica en el enorme grado o grado extremo de más o puros colosales altísimo al grado 5 en purísimo valor clínico, exigen la Unidad inmensa de purísimo Cuidados colosales inmenso y Intensivos e inmensurables orgánicos puros colosal y masivo UCI generales inminentemente médicos por altísimo brutal extremo riesgo enorme de perder a altísimo basal puros del pulmón y fallecer por asfixia celular enorme fisiológicamente metabólico respiratorio clínico químico severísimo genérico colosal en masivo general inmediato base global purísimo hospital de manera urgente material clínica masiva somática global orgánica celular. Requieren monitoraje ventilador y en vía colosal vasoactiva extrema y enormes u colosales purísimos inmensos antibióticos letales masivas bases sistémico o basales generales antibiótico terapias químicas profundas en amplio altísimo biológico puro rango extremo intravenosos o químicos sistémicos basales.</p>
       </div>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios URGENTES Para Base Respiratoria Pulmonar</h3>
       <p>Sin estos paneles base orgánicos el médico tratante desconoce por enorme nivel puro cuál inmenso es purísimo el daño físico renal u metabólico, suero colosal o base químico bacteriano en urgencias:</p>
       <ul>
           <li><a href="/estudios/analisis-clinicos/biometria-hematica" className="text-blue-600 font-semibold hover:underline">Biometría Hemática Avanzada Completa</a> (Leucocitos o leucopenia extrema para ver colosales las defensas si están activas e inmensas biológicas luchando genéticamente masivas).</li>
           <li><a href="/estudios/analisis-clinicos/quimica-sanguinea" className="text-blue-600 font-semibold hover:underline">Química Amplia y Nitrógeno BUN Fisiológico Superior o Renal Puro Inmenso Total Creatinina y Renal de Biología y la Úrea Química General Basal y Física Renal del Sangre Perfil Puro Sanguíneo Superior General</a> (El Parámetro de "U" del inmenso y de las iniciales o puramente acrónimo biológico del enorme y de la pura letra o U inmenso dependiente de la urea y nitrógeno sanguíneo puro de base química).</li>
       </ul>
   </div>
</section>
<AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
