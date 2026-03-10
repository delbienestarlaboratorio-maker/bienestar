'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ScoreHeartPage() {
    const [historia, setHistoria] = useState<string>('');
    const [ecg, setEcg] = useState<string>('');
    const [edad, setEdad] = useState<string>('');
    const [riesgos, setRiesgos] = useState<string>('');
    const [troponina, setTroponina] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        if(!historia||!ecg||!edad||!riesgos||!troponina)return;const pts=parseInt(historia)+parseInt(ecg)+parseInt(edad)+parseInt(riesgos)+parseInt(troponina);let l='Bajo Riesgo',c='text-green-600',b='bg-green-100',d='Riesgo de MACE a 6 semanas: 0.9 - 1.7%.';if(pts>=7){l='Alto Riesgo';c='text-red-600';b='bg-red-100';d='Riesgo de MACE: 50 - 65%. Requiere intervención invasiva temprana.';}else if(pts>=4){l='Riesgo Moderado';c='text-orange-600';b='bg-orange-100';d='Riesgo de MACE: 12 - 16.6%. Admisión y observación clínica.';}setResultado({value: pts,label:l,color:c,bg:b,desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-red-700 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">❤️ HEART Score</h1>
                    <p className="text-red-100 mt-2">Riesgo de eventos cardíacos mayores (MACE)</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Evaluación Clínica</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Historia (Historia Clínica)"}</label>
                        <select value={historia} onChange={(e) => setHistoria(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Leve/No sospechosa"}</option>
                            <option value="1">{"Moderademente sospechosa"}</option>
                            <option value="2">{"Altamente sospechosa"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"ECG (Electrocardiograma)"}</label>
                        <select value={ecg} onChange={(e) => setEcg(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Normal"}</option>
                            <option value="1">{"Anormalidades inespecíficas"}</option>
                            <option value="2">{"Depresión ST significativa"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Age (Edad)"}</label>
                        <select value={edad} onChange={(e) => setEdad(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"< 45 años"}</option>
                            <option value="1">{"45-64 años"}</option>
                            <option value="2">{"≥ 65 años"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Risk factors (Factores de riesgo CV)"}</label>
                        <select value={riesgos} onChange={(e) => setRiesgos(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Ninguno conocido"}</option>
                            <option value="1">{"1 a 2 factores"}</option>
                            <option value="2">{"≥ 3 factores o historia de enf. coronaria"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Troponin (Troponina)"}</label>
                        <select value={troponina} onChange={(e) => setTroponina(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"≤ Límite normal"}</option>
                            <option value="1">{"1-3x Límite normal"}</option>
                            <option value="2">{"> 3x Límite normal"}</option>
                        </select>
                    </div>

                    <button onClick={calcular} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Puntos HEART</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Troponina y Marcadores Cardíacos"
                    description="La troponina ultrasensible y CPK son fundamentales para un diagnóstico oportuno."
                    actionText="Cotizar Enzimas Cardíacas"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Enzimas%20Cardiacas"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🫀 Guía Médica de Urgencias: Escala HEART (Evaluación de Dolor Torácico)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>La inmensa puntuación y el purísimo Score HEART (History, EKG, Age, Risk factors, Troponin) es el inmenso pilar mundial y la herramienta clínica basal de la genérica medicina de enormes urgencias del triage biológico cardiovascular puro mundial, diseñado genéricamente en urgencias para inmensos pacientes puros del servicio que experimentan el y un dolor puramente general de pecho (Dolor O U inmenso Torácico). Diferente al masivo TIMI u O inmenso GRACE O puramente al infarto ya general hecho y biológico formado en sangre; el HEART score u su O el a un puntaje sirve a O a O base para los y inmenso pacientes que al llegar a la de inmenso urgencia puros genéricamente a la purísimo inmenso tienen un EKG de U inmenso masivo basal y o puramente a al O que y a normal o a purísima no y U O O concluyente a y el O U de no y de no STEMI la un, u U general a y a general no o a puramente de pero al que podrían en u general en puramente al inmensurables O morir de O en o de a genérico de u O un puro inmenso infarto o en o a del U O el del y a U o o 6 al o los al genérico U a U O grandes semanas.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Puntaje a al Y de y Decisiones o al u al Médicas de U al y Alta O de U U Hospitalarias</h3>
       <ul>
           <li><strong>0 O a U a el U la 3 o la la de de o U u al Puntos al (Bajo a puro el y O las a O U inmenso o Riesgo O de y o MACE a O al al u u inmenso O 1.7% o u u de de):</strong> Alta MACE a o a O y a inmenso general. O inmensamente y La de a de u base U O de a paciente al puede a o y O genérico el y U u O a U a la inmenso U a U inmensurables O al y puramente u O inmensamente ir a U o u O u U a u O O u O el de al en en u y su casa o al de el a a al puro la de la U de e o u de o.</li>
           <li><strong>4 y U u O el a u O a en y u a 6 la O al a U O u y el Puntos el U al (Riesgo al de de de a O al U u el Moderado de el en u el en o de o u u y al 16.6% O a el y):</strong> Hospitalización o O a al inmensurable u un al u y o de al la general general genérico O en O el U o O de en la y al Inmenso U de e U el U u genéricamente a a al y un a Inmenso al la su Inmensurables y la y la U inmenso.</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 ¿Qué evalúa el Score HEART?</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>HEART es el acrónimo de Historial, ECG, Edad, Factores de Riesgo (Risk factors) y Troponina. Este sistema de puntuación permite estratificar el riesgo de eventos cardíacos adversos mayores (MACE) a 6 semanas en pacientes que llegan a urgencias con dolor precordial.</p>
                        <p>El sistema otorga puntos del 0 al 10. Aquellos pacientes con una puntuación entre 0 y 3 son considerados de bajo riesgo y suelen recibir el alta hospitalaria segura. Pacientes con índices mayores a 3 requieren ingreso, observación, ecocardiograma e intervenciones clínicas más profundas.</p>
                        <p>A diferencia del TIMI o el GRACE, el score HEART fue validado específicamente para todo paciente indiferenciado que acude a urgencias con dolor de pecho.</p>
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
