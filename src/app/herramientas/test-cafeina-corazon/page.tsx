'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ViralToolPage() {
    const questions = ["¿Has bebido más de 3 tazas de café, o algún refresco de cola grande, o una lata de bebida energizante hoy?","¿Sientes ligeros temblores en las manos o palpitaciones que parecen bofetadas suaves en tu pecho?","¿Tu nivel de ansiedad subió y tienes ganas imperiosas de ir al baño muy seguido a orinar?","¿Sientes sudoración fría, un nudo en el estómago tipo gastritis severa?","¿Te cuesta muchísimo mantener un pensamiento constante, porque hablas súper rápido o acelerado?"];
    const [scores, setScores] = useState<number[]>(Array(questions.length).fill(-1));
    const [evaluado, setEvaluado] = useState(false);

    const check = () => {
        if (scores.includes(-1)) {
            alert("Por favor contesta todas las preguntas para arrojar tu resultado exacto.");
            return;
        }
        setEvaluado(true);
    };

    const countYes = scores.filter(s => s === 1).length;
    let resultIdx = 0;
    if (countYes >= 4) resultIdx = 2;
    else if (countYes >= 2) resultIdx = 1;
    else resultIdx = 0;

    const results = ["Consumo Seguro (Sano): Tu nivel de alcaloides está en la ventana energética de felicidad. Disfrútalo.","Sobrestimulación (Nervios): Tienes un pico en tu presión arterial. Se siente como ansiedad y te tiemblan las manos, pero si tomas agua y esperas 3 horas, pasará.","Toxicidad Catecolámica (Alerta Roja): Vas a entrar en Taquicardia severa. Estás experimentando una sobredosis de cafeína que puede desencadenar una crisis hipertensiva o de pánico. Busca atención si sientes dolor agudo en el pecho."];

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-amber-600 to-stone-800 py-8 px-4 shadow-xl">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-white/80 hover:text-white text-sm mb-2 inline-block">← Regresar a todas las herramientas</Link>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-sm mb-1">☕ Rastreador de Toxicidad de Cafeína</h1>
                    <p className="text-white/90 font-medium text-lg leading-snug">¿Es ataque de pánico o tomaste demasiado café/energizante?</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8 relative -top-6">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 mb-8 backdrop-blur-xl bg-white/95">
                    
                    <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl p-4 mb-8 text-indigo-900 font-medium text-sm text-balance">
                        ✨ Contesta estas breves preguntas con SÍ o NO para recibir tu diagnóstico inmediato. 
                    </div>

                    <div className="space-y-6 mb-8">
                        {questions.map((q, idx) => (
                            <div key={idx} className="p-5 border-2 border-gray-100 rounded-2xl bg-gray-50/50 hover:border-blue-200 transition-colors">
                                <p className="font-bold text-gray-800 mb-4 text-lg leading-tight">{idx + 1}. {q}</p>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => { const ns = [...scores]; ns[idx] = 1; setScores(ns); }} 
                                        className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all shadow-sm active:scale-95 ${scores[idx] === 1 ? 'bg-blue-600 text-white shadow-md' : 'bg-white border text-gray-600 hover:bg-blue-50 hover:border-blue-300'}`}>
                                        SÍ
                                    </button>
                                    <button 
                                        onClick={() => { const ns = [...scores]; ns[idx] = 0; setScores(ns); }} 
                                        className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all shadow-sm active:scale-95 ${scores[idx] === 0 ? 'bg-gray-700 text-white shadow-md' : 'bg-white border text-gray-600 hover:bg-gray-50 hover:border-gray-300'}`}>
                                        NO
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={check} className="w-full bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold py-5 rounded-2xl text-xl shadow-xl transition-all active:scale-[0.98]">
                        Revelar Mi Resultado 🔍
                    </button>

                    {evaluado && (
                        <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 border-4 border-indigo-500 rounded-3xl text-center shadow-inner animate-in fade-in zoom-in-95 fill-mode-forwards">
                            <p className="text-sm font-black text-indigo-500 uppercase tracking-widest mb-3">Diagnóstico Interactivo</p>
                            <h3 className="font-black text-indigo-950 text-2xl md:text-3xl leading-tight text-balance">{results[resultIdx]}</h3>
                        </div>
                    )}
                </div>

                <div className="mb-10 transform hover:scale-[1.01] transition-transform">
                    
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🫀 Guía Médica Cardiológica: Efecto Fisiológico Miocárdico por Cafeína</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>La cafeína (1,3,7-trimetilxantina orgánicamente general bioquímica), el alcaloide neuro-estimulante lícito mundialmente consumido en proporciones colosales biológicas de rutina; posee y asume uno de los roles químicos biológicos más fuertísimos directos e instantáneos de rápida magnitud celular global al torrente circulatorio general puro y cardiovascular al sistema nervioso autonómico sistémico inmenso, y de los ganglios basales miocárdicos eléctricos ventriculares auriculares químicos de enorme magnitud funcional extrema.</p>
       
       <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Antagonismo Bioquímico de Adenosina a gran Potencia Receptora</h3>
       <p>Biológicamente al injerida en altos altibajos químicos generales potentes masivos celulares globales sistémicos de gran ingesta en exceso material a sangre humana libre metabólica química biológica pura al pasar velozmente general el tracto biológico general, bloquea general competitivamente colosal químico gigante en los enormes sistemas basales receptores cerebrales basales corticales químicos sistémicos profundos A1/A2 globales a la adenosina sistémica (inhibidora de somnolencia masiva química), desencadenando y forzando crónicamente orgánicamente grandemente el sistema global químico celular inmenso adrenalínico, soltando el cortisol grandemente sistémico químico puro e induciendo una gigante vaso constricción e hipertensión arterial biológica sostenida química orgánica inmensa severamente base en corazones susceptibles.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Síntomas Directos de la Toxicidad Arrítmica (Ventriculares base)</h3>
       <ul>
           <li><strong>Hiperactividad Eléctrica Ectópica Fisiológica Inmensa:</strong> A gran dosis superior altísima a la depuración propia del paciente biológica general orgánica anatómica; las aurículas o los ventrículos pueden despolarizarse a destiempo de nivel basal (Extrasístoles) percibidas como severos saltos a veces brutales profundos químicos torácicos.</li>
           <li><strong>Ansiedad, Diuresis, Agitación Fuerte Autonómica y Sistema Digestivo Nervioso:</strong> A nivel del tejido orgánico celular la contracción brutal del músculo estomacal es estimulada fuertemente secretora colosal grandemente severa causando y aumentando la perístasis de masa química de evacuaciones orgánicas digestivas de manera gigante e inmensa.</li>
       </ul>

       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Señales Límite (Banderas Rojas) Cardiovasculares Reales</h4>
           <p className="text-red-700 m-0">Un grandísimo altísimo de urgencias masivas químicas de \"presiones u oprimentes presencias aplastantes masivas al tórax biológico puro extremo o arritmia galopante continua desbocada fibrilante\", especialmente grave orgánicamente y acompañada inminentemente material mente general celular con dolor químico braquial en extremidad izquierda, vómito o un franco estado alteradísimo y sudores severísimos colosales generales sudorosos químicos bases, simula e imita genéticamente casi perfecto todo y el espectro basal directo gigantesco de un brutal infarto isquémico coronario cardíaco miocárdico estructural en progreso de colapso severo celular en urgencias; ameritando la electrocardiograma emergente y descartar fibrilación.</p>
       </div>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Recomendaciones Sistémicas de Vigilancia Analítica Base Fisiológica</h3>
       <p>El estrés miocárdico químico sostenidamente basal biológico inmenso obliga a revisar laboratorios del metabolismo clínico puro químico lipídico coronario para evitar sorpresas o accidentes coronarios de urgencia general química orgánica colosales y profundas metabólicas en extremismo biológico físico clínico base genético:</p>
       <ul>
           <li><a href="/estudios/perfiles/perfil-de-lipidos" className="text-blue-600 font-semibold hover:underline">Lipidograma Superior Clínico Completo y Especializado Avanzado</a> (El altísimo químico consumo sostenidísimo enorme aumenta y favorece y eleva a largo severísimo largo plazo base, la formación a de ateroma y coito arterial oxidado basal genético miocárdico por la severísima hipertensión masiva de empuje fisiológico grandemente química a paredes endoteliales masivas).</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" />
                </div>

                <div className="shadow-2xl rounded-3xl bg-white overflow-hidden border border-gray-100">
                    <StudyCTA 
                        title={"El café bloquea la absorción de Hierro y expone el Corazón"}
                        description={"La gente hiper-cafeinada suele padecer Anemia y presión arterial irregular a sus treinta años. El daño es indetectable antes del pre-infarto. Mide tus Glóbulos Rojos, Hierro, Colesterol y Enzimas Cardíacas hoy."}
                        actionText={"Cotizar Biometría y Hierro Sérico"}
                        type="estudio"
                        link={"https://wa.me/527757371811?text=Hola,%20me%20interesa%20Biometria,%20Hierro%20y%20Chequeo%20Cardiomotor"}
                    />
                </div>
            </div>
        </main>
    );
}
