'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ViralToolPage() {
    const questions = ["¿Te hace más feliz que tu pareja te abrace de la nada que recibir un regalo de cumpleaños?","¿Consideras que es una gran muestra de amor que alguien te cocine tu comida favorita o te lave el auto?","¿Prefieres pasar 2 horas platicando a solas que ir al cine espectacular pero sin hablar?","¿Un mensaje de texto sorpresivo diciendo 'Estoy orgulloso de ti' puede mejorarte toda la semana?","¿Guardas todos los regalitos (incluso boletos de cine o notas) porque el valor simbólico te fascina?"];
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

    const results = ["Tu Lenguaje Principal: ACTOS DE SERVICIO y PALABRAS. Amas la comunicación y que te demuestren interés con ayuda práctica.","Tu Lenguaje Principal: TIEMPO DE CALIDAD y CONTACTO FÍSICO. Eres sumamente kinestésico; necesitas presencia física y mimos constantes.","Tu Lenguaje Principal: REGALOS y AFIRMACIÓN. Te sientes amado cuando te validan verbalmente y tienen detalles tangibles que demuestran que pensaron en ti."];

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-pink-500 to-red-500 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-white/80 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-sm">❤️ Las 5 Formas de Amar</h1>
                    <p className="text-white/90 mt-2 font-medium text-lg">Descubre qué idioma del amor exiges y ofreces</p>
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
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🧠 Guía Psicológica: Lenguajes del Amor y Regulación Emocional</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El concepto clínico de los \"Lenguajes del Amor\", aunque popularizado sociológicamente, tiene un profundo fundamento en la neurobiología del apego. Representan las vías de comunicación somato-sensoriales y cognitivas mediante las cuales el sistema límbico de una persona decodifica las señales de \"seguridad, confianza y afecto\" provenientes de su tribu o pareja sentimental.</p>
       
       <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">El Circuito de Recompensa (Oxitocina y Dopamina)</h3>
       <p>Cada individuo, debido a la plasticidad neuronal forjada en su primera infancia (estilos de apego de Bowlby), desarrolla una hipersensibilidad a ciertos estímulos de recompensa. Si una persona requiere \"Palabras de Afirmación\", su córtex auditivo está directamente enlazado con el área tegmental ventral; las verbalizaciones positivas le generan descargas masivas de dopamina. Por el contrario, un individuo cuyo circuito primario es el \"Contacto Físico\" requiere estimulación mecánica de los corpúsculos táctiles en la piel para secretar oxitocina sistémica, lo que biológicamente reduce su frecuencia cardíaca y cortisol basal.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Implicaciones Clínicas en la Salud de Pareja</h3>
       <ul>
           <li><strong>Disonancia Afectiva Crónica:</strong> Cuando dos personas se aman pero usan canales neurológicos incompatibles (Ej: Uno da regalos [canal material] pero el otro necesita tiempo de calidad [canal atencional prefrontal]), el cerebro de ambos registra un \"déficit de cuidado\".</li>
           <li><strong>Somatización del Desapego:</strong> La percepción de no ser amado (por usar el canal incorrecto) eleva los marcadores de estrés inflamatorio y reduce el sistema inmunológico, propiciando resfriados frecuentes y síndromes gastrointestinales tensionales.</li>
       </ul>

       <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-blue-800 font-bold mb-2 flex items-center gap-2">💡 Intervención de Terapia Relacional</h4>
           <p className="text-blue-700 m-0">El mapeo científico de tu lenguaje principal permite ejecutar una reestructuración conductual en la relación. Se instruye a las parejas a \"traducir\" voluntariamente sus esfuerzos cerebrales hacia la vía sensorial que de facto impacta bioquímicamente a su compañero, previniendo el Síndrome de Estrés Postraumático Relacional y consolidando un apego seguro maduro.</p>
       </div>
   </div>
</section>
<AdBanner variant="horizontal" />
                </div>

                <StudyCTA 
                    title={"El amor a veces es ciego (y también las ETS)"}
                    description={"Antes de formalizar cualquier conexión íntima, la verdadera muestra de amor del Siglo XXI es compartir un panel de salud sexual. Protégete a ti y a tu pareja."}
                    actionText={"Cotizar Paquete Parejas (ETS)"}
                    type="estudio"
                    link={"https://wa.me/527757371811?text=Hola,%20me%20interesa%20un%20chequeo%20nupcial%20o%20de%20ETS%20para%20m%C3%AD%20y%20mi%20pareja"}
                />
            </div>
        </main>
    );
}
