'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function TestITUPage() {
    const [symptoms, setSymptoms] = useState<Record<string, boolean>>({});
    const [resultado, setResultado] = useState(false);

    const checklist = [
        { id: '1', title: 'Disuria', desc: 'Ardor, dolor o molestia intensa al orinar.' },
        { id: '2', title: 'Polaquiuria / Urgencia', desc: 'Necesidad frecuente o desesperada de ir al baño, aunque salgan solo unas gotas.' },
        { id: '3', title: 'Orina turbia o fétida', desc: 'Cambio notorio en el color, olor muy fuerte (pescado/amoníaco) o se ve "sucia".' },
        { id: '4', title: 'Hematuria', desc: 'Presencia de sangre o tinte rosado en la orina.' },
        { id: '5', title: 'Dolor pélvico/lumbar', desc: 'Sensación de pesadez sobre el pubis o dolor de espalda baja (posible infección en vías altas).' },
        { id: '6', title: 'Fiebre o escalofríos', desc: 'Síntoma de alerta médica, sugiere infección ascendente (pielonefritis).' },
    ];

    const toggle = (id: string) => {
        setSymptoms(prev => ({ ...prev, [id]: !prev[id] }));
        setResultado(true);
    };

    const count = Object.values(symptoms).filter(Boolean).length;
    const riesgoInfeccion = count >= 2;
    const riesgoGrave = symptoms['5'] || symptoms['6'];

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-teal-700 to-cyan-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-teal-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🦠 Test de Infección Urinaria</h1>
                    <p className="text-teal-100 mt-2">Cuestionario sintomático y orientación diagnóstica para ITU</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="space-y-3 mb-8">
                        {checklist.map(item => (
                            <label key={item.id} className="flex items-start gap-4 p-4 border border-teal-100 rounded-xl cursor-pointer hover:bg-teal-50 transition-colors">
                                <input type="checkbox" checked={!!symptoms[item.id]} onChange={() => toggle(item.id)} className="mt-1 w-6 h-6 text-teal-600 rounded" />
                                <div>
                                    <span className="font-bold text-gray-800 block mb-1">{item.title}</span>
                                    <span className="text-sm text-gray-500">{item.desc}</span>
                                </div>
                            </label>
                        ))}
                    </div>

                    {resultado && (
                        <div className="mt-8 animate-in fade-in">
                            <div className={`p-6 rounded-2xl border text-center mb-6 
                                ${riesgoGrave ? 'bg-red-50 border-red-200 text-red-900' :
                                    riesgoInfeccion ? 'bg-orange-50 border-orange-200 text-orange-900' :
                                        'bg-green-50 border-green-200 text-green-900'}`}>

                                <p className="text-xl font-bold mb-2">
                                    {riesgoGrave ? '⚠️ Riesgo Alto / Complicación' :
                                        riesgoInfeccion ? '⚠️ Alta Probabilidad de ITU Localizada' :
                                            '✅ Baja probabilidad de ITU activa'}
                                </p>
                                <p className="text-sm">
                                    {riesgoGrave ? 'Foco de emergencia: Tienes síntomas sugestivos de que la infección podría estar alcanzando el tejido renal. Evita la automedicación de emergencia y evalúate médicamente sin demora.' :
                                        riesgoInfeccion ? 'Tienes marcadores clásicos de cistitis bacteriana o uretritis.' :
                                            'Marca pocos o nulos síntomas, sin embargo si las molestias persisten revisa posibles irritantes o causas mecánicas.'}
                                </p>
                            </div>

                            <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-6">
                                <h3 className="font-bold text-teal-900 text-lg mb-3">🔬 Confirmación Bioquímica Requerida</h3>
                                <p className="text-gray-700 text-sm mb-4">No inicies antibióticos ("ciprofloxacino", etc.) sin confirmar. Tomar antibiótico arruinará el cultivo posterior si te sigues sintiendo mal. Solicita:</p>
                                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 mb-6 font-medium">
                                    <li><strong>Examen General de Orina (EGO)</strong>: Buscará bacterias, nitritos y reacción leucocitaria rápida (Se entrega en un par de horas).</li>
                                    <li><strong>Urocultivo con Antibiograma</strong>: Toma 3 días, pero indica el nombre y apellido exacto de la bacteria y *qué pastilla específica* te garantiza matar el germen para evitar recurrencias.</li>
                                </ul>
                                <Link href="/estudios/analisis-clinicos" className="inline-block bg-teal-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-teal-800 transition-colors">
                                    Revisar Instrucciones del Urocultivo →
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
                
                <StudyCTA 
                    title={`Alivio rápido para cistitis y dolor`} 
                    description={`El dolor al orinar obedece a bacterias. Un Urocultivo con Antibiograma identifica qué bacteria es y CÚAL antibiótico la aniquila, evitando que gaste en medicinas incorrectas.`} 
                    actionText={`Cotizar EGO / Urocultivo`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20EGO%20%2F%20Urocultivo*`} 
                    type="estudio" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🦠 Guía Clínica: Fisiopatología de Infecciones del Tracto Urinario (ITU)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>La Infección del Tracto Urinario (ITU) es la invasión y proliferación patológica de microorganismos, típicamente la bacteria gramnegativa <em>Escherichia coli</em> (responsable del 80-90% de los casos comunitarios), a través del epitelio estéril de las vías urinarias. Esta patología abarca desde la uretritis baja hasta la invasión potencial del parénquima renal, constituyendo una emergencia sistémica si no se intercepta velozmente.</p>
       
       <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Mecanismo de Invasión y Respuesta Inflamatoria</h3>
       <p>Las bacterias causantes poseen <em>fimbrias</em> u organelas de adhesión que actúan como \"ganchos microscópicos\", anclándose violentamente a los receptores de la mucosa vesical urotelial para resistir el barrido mecánico de la orina. Una vez adheridas, secretan hemolisinas y toxinas que destruyen el tejido local. El sistema inmunológico del paciente responde enviando torrentes de leucocitos (Pioctios) al área de la vejiga, lo que explica la inflamación dolorosa aguda masiva y la urgente necesidad falsa de orinar (Tenesmo y Polaquiuria).</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Sintomatología y Progresión Crítica Sistémica</h3>
       <ul>
           <li><strong>Disuria Aguda Grave:</strong> Sensación física de \"orinar fragmentos de cristal o fuego\", causada por el paso del ácido urinario a través del epitelio urotelial brutalizado y crónicamente inflamado.</li>
           <li><strong>Hematuria Macroscópica:</strong> La destructiva lisis capilar en las paredes de la vejiga desencadena sangrado visible francamente rojo o de tonalidad oxidada, signo de daño tisular masivo agudo.</li>
           <li><strong>Escalofríos y Fiebre Supurativa:</strong> Indicadores de que la bacteria ha superado la vejiga (Cistitis) y está escalando los uréteres hacia el riñón (Pielonefritis aguda).</li>
       </ul>

       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia Quirúrgica / Sepsis (Red Flags)</h4>
           <p className="text-red-700 m-0">El dolor lumbar punzante localizado (signo de Giordano positivo), acompañado de náuseas paralizantes, fiebre por encima de 38.5°C y confusión mental, sugiere vehementemente la instauración de una <strong>Pielonefritis Severa o Urosepsis</strong>. Las bacterias están irrumpiendo agresivamente en el torrente sanguíneo, pudiendo desencadenar shock séptico letal. Acuda a urgencias o terapia intensiva de manera fulminante.</p>
       </div>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Protocolo Diagnóstico Laboratorial Oficial</h3>
       <p>El diagnóstico clínico de oro requiere forzosamente la identificación microscópica objetiva microbiológica mediante cultivos estériles:</p>
       <ul>
           <li><a href="/estudios/analisis-clinicos/examen-general-de-orina" className="text-blue-600 font-semibold hover:underline">Examen General de Orina (EGO)</a> (Detección cualitativa rápida de grandes masas de Leucocitos, Nitritos positivos, sangre microscópica).</li>
           <li><a href="/estudios/analisis-clinicos/urocultivo" className="text-blue-600 font-semibold hover:underline">Urocultivo Sensible Estándar con Antibiograma</a> (El cultivo biológico a 72 hrs vital para determinar la especie microscópica exacta y reportar al médico a qué letal antibacteriano será sensible esa cepa resistente).</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />
            
                <RelatedTools currentPath="/herramientas/test-infeccion-urinaria" className="mb-8" />
            </div>
        </main>
    );
}
