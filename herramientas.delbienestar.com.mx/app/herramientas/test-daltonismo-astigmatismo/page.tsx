'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function ViralToolPage() {
    const questions = ["Al ver luces de noche (ej. faros de coches), ¿ves destellos o líneas de luz alargadas que salen del foco?","¿Sueles confundir tonos oscuros de azul marino con negro, o rojo oscuro con marrón?","¿Te lloran los ojos o te duele la cabeza tras ver pantallas por más de 2 horas sin descanso?","¿Tienes que alejar o acercar excesivamente el texto del celular para poder leer las letras pequeñas?","¿Al ver líneas rectas cuadriculadas (como un excel o baldosas), algunas se ven curvas u onduladas?"];
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

    const results = ["Visión Robusta: No reportas síntomas claros de defectos refractivos graves. Tus ojos están muy funcionales.","Posible Astigmatismo/Fatiga: Tienes signos de fatiga visual (fotofobia de noche o dolor de cabeza). Podrías necesitar lentes de descanso.","Alerta Macular / Defecto Visual: Tienes fuerte probabilidad de Daltonismo, Presbicia avanzada o defectos de refracción. Necesitas un examen de la vista urgente."];

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-emerald-400 to-teal-600 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-white/80 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-sm">👁️ Test Online de Agudeza y Daltonismo</h1>
                    <p className="text-white/90 mt-2 font-medium text-lg">Averigua si tus ojos te engañan</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 mb-8">
                    
                    <div className="space-y-6 mb-8">
                        {questions.map((q, idx) => (
                            <div key={idx} className="p-5 border-2 border-gray-100 rounded-2xl bg-gray-50/50 hover:border-blue-200 transition-colors">
                                <p className="font-bold text-gray-800 mb-4 text-lg">{idx + 1}. {q}</p>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => { const ns = [...scores]; ns[idx] = 1; setScores(ns); }} 
                                        className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${scores[idx] === 1 ? 'bg-blue-600 text-white shadow-md' : 'bg-white border text-gray-600 hover:bg-blue-50'}`}>
                                        SÍ
                                    </button>
                                    <button 
                                        onClick={() => { const ns = [...scores]; ns[idx] = 0; setScores(ns); }} 
                                        className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${scores[idx] === 0 ? 'bg-gray-600 text-white shadow-md' : 'bg-white border text-gray-600 hover:bg-gray-50'}`}>
                                        NO
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={check} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-2xl text-xl shadow-lg transition-transform active:scale-95">
                        Revelar Mi Resultado 🔍
                    </button>

                    {evaluado && (
                        <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-blue-500 rounded-3xl text-center shadow-inner animate-in fade-in slide-in-from-bottom-5">
                            <p className="text-sm font-black text-blue-500 uppercase tracking-widest mb-2">Diagnóstico Interactivo</p>
                            <h3 className="font-black text-gray-900 text-2xl leading-tight">{results[resultIdx]}</h3>
                        </div>
                    )}
                </div>

                <div className="mb-8">
                    
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">👁️ Guía Oftalmológica: Anomalías Fotorreceptoras y Defectos Refractivos</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>La capacidad biológica para procesar correctamente y asimilar clínicamente las imágenes perfectas de alta nitidez recae enormemente en la correcta conformación de la córnea base del ojo vivo ocular y la distribución sana biológica química de los conos fotorreceptores celulares. El astigmatismo prolongado refractivo severo sistémico clínico, y en particular, la incapacidad de procesar gamas fotocromáticas (Daltonismo) representan unas de las alteraciones oftálmicas más prominentes clínicas genéticas globales detectables no infecciosas del ser humano en su óptica base.</p>
       
       <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">La Óptica Física Deficiente Biológica en Oftalmología </h3>
       <p>El Daltonismo biológico tiene una franca fuerte fisiopatología estructural central genética del cromosoma X ligada fuertemente biológica base al hombre o en menor porcentaje general femenino anatómico biológico puro. Se producen fallas biológicas celulares genéticamente en uno y ocasionalmente dos, de los \"Conos L, M y S\" dentro y físicamente formados en la membrana estructural de luz macular retineal neuronal profunda ocular física orgánica; ocasionando percepciones o cegueras visuales profundas crónicas entre tonos puros absolutos químicos (Clásicamente Rojo extremo puro contra el matiz verde opuesto biológico profundo o en los azules bases marrones orgánicos).</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Implicaciones Clínicas Anatómicas Orgánicas Refractivas</h3>
       <ul>
           <li><strong>Aberraciones de Imagen y Refracción:</strong> El globo fisiológico corneal de los pacientes orgánicos con niveles muy prolongados grandes estructurales genéticos no se constituye esféricamente sino oval o tórico grave impidiendo la focalización visual a ninguna precisa clara distancia global material de su entorno visual biológico exterior (Ametropía Central).</li>
           <li><strong>Somatización por el Esfuerzo Visual Muscular Intenso:</strong> Los músculos ciliares del paciente físico agotarán forzadamente crónicamente a lo larguísimo y continuo de unas simples crudas extenuantes biológicas por buscar corregir masivamente material ocular y el estrés óptico severísimo causando fotofobias agudas biológicas químicas graves.</li>
       </ul>

       <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-blue-800 font-bold mb-2 flex items-center gap-2">💡 Relevancia Clínica y Genético Quirúrgico Funcional</h4>
           <p className="text-blue-700 m-0">Mientras gran inmenso enorme porcentaje porcentual físico de todos los defectos químicos y de masa esclerótica (Astigmatismo Refractivo base anatómico óptico de la curvatura) de pacientes y humanos son corregidos e inmensamente sanables biológicamente de nivel por lentes oftálmicas puras ópticas base; el masivo diagnóstico colosal de un paciente biológico biológico retiniano masculino Daltoniano de tipo profundo severo biológico puro genético, impide fuertísimo general el manejo fisiológico, restando para el tratamiento en campos sistémicos quirúrgicos base u obstaculizando grandemente por la gran ceguera clínica física a muchísimas ramas inmensas fisiológicas técnicas laborales aéreas biológicas químicas sistémicas orgánicas de maquinaria. Y a la fecha genéticamente en laboratorio oftalmológico o científico central mundial general no hay curas definitivas orgánicas de la degeneración celular cónica.</p>
       </div>
   </div>
</section>
<AdBanner variant="horizontal" />
                </div>

                <StudyCTA 
                    title={"La pérdida visual repentina asusta. Revisa tu Azúcar."}
                    description={"Si borrosidad o destellos comenzaron de la nada, el primer sospechoso clínico no es el ojo, es la DIABETES. Los niveles altos de azúcar hinchan el cristalino y causan ceguera."}
                    actionText={"Cotizar Química Sanguínea General"}
                    type="estudio"
                    link={"https://wa.me/527757371811?text=Hola,%20busco%20una%20quimica%20sanguinea%20para%20descartar%20diabetes"}
                />
            
                <RelatedTools currentPath="/herramientas/test-daltonismo-astigmatismo" className="mb-8" />
            </div>
        </main>
    );
}
