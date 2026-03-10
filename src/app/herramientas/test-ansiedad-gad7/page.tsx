'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

const preguntas = [
    'Se ha sentido nervioso/a, ansioso/a o con los nervios de punta',
    'No ha sido capaz de parar o controlar su preocupación',
    'Se ha preocupado demasiado por motivos diferentes',
    'Ha tenido dificultad para relajarse',
    'Se ha sentido tan inquieto/a que no ha podido quedarse quieto/a',
    'Se ha molestado o irritado fácilmente',
    'Ha sentido miedo, como si algo terrible fuera a pasar',
];
const opciones = [{ v: 0, l: 'Nunca' }, { v: 1, l: 'Varios días' }, { v: 2, l: 'Más de la mitad' }, { v: 3, l: 'Casi todos los días' }];

export default function TestAnsiedadGAD7Page() {
    const [resp, setResp] = useState<Record<number, number>>({}); const [resultado, setResultado] = useState<number | null>(null); const [showInfo, setShowInfo] = useState(false);
    const calcular = () => { if (Object.keys(resp).length < 7) return; setResultado(Object.values(resp).reduce((a, b) => a + b, 0)); };
    const getCat = (s: number) => { if (s < 5) return { label: 'Mínima', color: 'text-green-600', bg: 'bg-green-100', desc: 'Ansiedad dentro del rango normal.' }; if (s < 10) return { label: 'Leve', color: 'text-yellow-600', bg: 'bg-yellow-100', desc: 'Vigilancia recomendada. Técnicas de relajación pueden ayudar.' }; if (s < 15) return { label: 'Moderada', color: 'text-orange-600', bg: 'bg-orange-100', desc: 'Se recomienda evaluación profesional y posible tratamiento.' }; return { label: 'Severa', color: 'text-red-600', bg: 'bg-red-100', desc: 'Se recomienda evaluación psiquiátrica y tratamiento activo.' }; };

    return (<main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-purple-700 to-indigo-800 py-8 px-4"><div className="max-w-3xl mx-auto"><Link href="/herramientas" className="text-purple-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link><h1 className="text-3xl md:text-4xl font-bold text-white">😰 Test de Ansiedad GAD-7</h1><p className="text-purple-100 mt-2">Generalized Anxiety Disorder — cuestionario validado de 7 preguntas</p></div></div>
        <div className="max-w-3xl mx-auto px-4 py-8"><div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
            <p className="text-gray-600 text-sm mb-6 bg-purple-50 rounded-xl p-4">Durante las <strong>últimas 2 semanas</strong>, ¿con qué frecuencia le han molestado los siguientes problemas?</p>
            {preguntas.map((p, i) => (<div key={i} className="mb-5"><p className="font-bold text-gray-800 text-sm mb-2">{i + 1}. {p}</p><div className="grid grid-cols-2 md:grid-cols-4 gap-2">{opciones.map(o => (<button key={o.v} onClick={() => setResp(prev => ({ ...prev, [i]: o.v }))} className={`p-2 rounded-lg text-xs font-bold transition-all ${resp[i] === o.v ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{o.l}</button>))}</div></div>))}
            <button onClick={calcular} className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]" disabled={Object.keys(resp).length < 7}>Calcular Resultado</button>
            {resultado !== null && (() => {
                const c = getCat(resultado); return (<div className="mt-8"><div className={`${c.bg} rounded-2xl p-6 text-center mb-6`}><p className="text-sm text-gray-600 mb-1">Puntaje GAD-7</p><p className={`text-5xl font-black ${c.color}`}>{resultado}/21</p><p className={`text-xl font-bold ${c.color} mt-1`}>Ansiedad {c.label}</p><p className="text-gray-600 text-sm mt-2">{c.desc}</p></div>
                    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"><h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3><p className="text-sm text-gray-600 mb-3">Condiciones médicas que pueden causar o empeorar ansiedad:</p><div className="space-y-3">{[{ name: 'Cortisol Sérico', reason: 'El exceso de cortisol causa ansiedad, insomnio y nerviosismo' }, { name: 'Perfil Tiroideo (TSH, T3, T4)', reason: 'El hipertiroidismo causa ansiedad, taquicardia y temblor' }, { name: 'Glucosa en Ayunas', reason: 'La hipoglucemia causa síntomas que imitan ataques de pánico' }, { name: 'Electrolitos (Magnesio)', reason: 'La deficiencia de magnesio se asocia a ansiedad' }, { name: 'Biometría Hemática', reason: 'Descarta anemia que puede causar palpitaciones y nerviosismo' }].map(s => (<div key={s.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm"><span className="text-green-600 mt-1">✓</span><div><p className="font-semibold text-gray-800 text-sm">{s.name}</p><p className="text-gray-500 text-xs">{s.reason}</p></div></div>))}</div><Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800">Ver Estudios →</Link></div></div>);
            })()}
        </div>
                <StudyCTA 
                    title={`Tranquilidad Nerviosa Global`} 
                    description={`La clínica señala que faltantes crónicos de B12 y Vitamina D empeoran drásticamente los cuadros de ansiedad patológica y ataques de pánico.`} 
                    actionText={`Verificar Test de Vitaminas`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Verificar%20Test%20de%20Vitaminas*`} 
                    type="estudio" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🧠 Guía Psiquiátrica y Diagnóstica: Trastorno de Ansiedad Generalizada (Cuestionario GAD-7)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Trastorno de Ansiedad Generalizada (TAG, o GAD por sus siglas en inglés) dejó de catalogarse en la medicina funcional como un \"estado de nerviosismo temporal o sociológico\". Constituye una hiperactivación y corto circuito orgánico crónico del circuito biológico amigdalino-cortical del cerebro. El Cuestionario GAD-7 (Generalized Anxiety Disorder 7-item scale) es la herramienta matriz y pilar central de validación técnica psiquiátrica clínica inicial para cuantificar estadísticamente el grado en que el sistema neuro-endocrino de una persona biológica está completamente descontrolado frente al mundo de las últimas 2 semanas basalmente.</p>
       
       <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">El Secuestro Amigdalino: La Patología Central del TAG</h3>
       <p>En el paciente de ansiedad inmensa profunda clínica, el tálamo percibe todos lo datos sensoriales físicos mundanos puros y, en lugar biológico puro sano de mandarlos a filtrar a la corteza para la pura lógica de razonamiento; los interrumpe masivamente y envía las señales a la alarma de la amígdala. Esa glándula reacciona químicamente produciendo CRH, y desata un torrente colosal físico y neuroendocrino de noradrenalina que somatiza corporalmente la pura experiencia de que \"un león te va a masacrar materialmente\" aunque usted físicamente biológico neurológico puramente basalmente genéticamente general se halle recostado a salvo de masa real global en su sala de habitación química biológica puro en biológico reposo.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">El GAD-7 Expresado Físicamente en la Clínica General Sistémica</h3>
       <ul>
           <li><strong>Fatiga Muscular y Contracturas Base Severas (Maxilares y Cervicales):</strong> La acumulación diaria química pesada y masiva extrema biológicamente del nerviosismo sostenido contrae crónicamente fibras de trapecio en un preparativo corporal y tensional extremo biológico purísimo constante fisiológico puro irrefrenable somático.</li>
           <li><strong>Insomnio de Mantenimiento y Biología Circadiana Rota:</strong> Levantarse brutalmente agotado físico durante la profunda altísima alta noche biológico química con taquicardia orgánica general severa (Corazón galopante descontrolado extremo basal orgánico fisiológicamente) general mente debido a subidones físicos altísimos y graves inmensos masivos de base colosales enormes hormonas del nivel general de glucagones biológicos genéticos profundísimas generales químicas masivas adrenales somáticas en extrema oscuridad metabólicas puras biológicas.</li>
       </ul>

       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia Cardiovascular (La Amenaza Oculta)</h4>
           <p className="text-red-700 m-0">Tener puntuaciones superiores al umbral o superiores a 15 constantes o de un GAD-7 de grado agudo durante varios meses profundos o inmensamente orgánicos ininterrumpidamente; multiplica enormemente el severo altísimo profundo gran factor basal médico para desarrollar en su fisiología pura severos grandísimos microinfartos cerebrales genéticos a muchísima nivel silente de años por altísimos grados de inflamación purísima biológica continua sistémica vascular.</p>
       </div>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Evaluación Endocrina Necesaria Base Descarte Típico General</h3>
       <p>Cualquier psiquiatra certificado buscará descartar un problema orgánico metabólico que desencadena todo purísimo falso basal diagnóstico inmenso severo antes de tratar netamente ansiedad originada corticalmente.</p>
       <ul>
           <li><a href="/estudios/perfiles/perfil-tiroideo" className="text-blue-600 font-semibold hover:underline">Perfil de Laboratorio Tiroideo y Químico Especializado Amplio</a> (El Hipertiroidismo inmenso basal tóxico severísimo químico genera grandísimos inmensos nervios, tremores brutos corporales basales y taquicardia constante y sudor imitando el pánico sistémico).</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"><button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"><span className="font-bold text-gray-900">📚 GAD-7 — Información Científica</span><span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span></button>{showInfo && (<div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4"><p>El <strong>GAD-7 (Generalized Anxiety Disorder 7-item)</strong> es un cuestionario breve y validado para detectar y evaluar la severidad del trastorno de ansiedad generalizada.</p><h4 className="font-bold text-gray-900">Interpretación</h4><table className="w-full text-sm"><thead><tr className="bg-gray-100"><th className="p-2">Puntaje</th><th className="p-2">Severidad</th></tr></thead><tbody><tr className="border-b"><td className="p-2 text-center">0-4</td><td className="p-2">Mínima</td></tr><tr className="border-b"><td className="p-2 text-center">5-9</td><td className="p-2">Leve</td></tr><tr className="border-b"><td className="p-2 text-center">10-14</td><td className="p-2">Moderada</td></tr><tr><td className="p-2 text-center">15-21</td><td className="p-2">Severa</td></tr></tbody></table><h4 className="font-bold text-gray-900">Fuentes</h4><ul className="list-disc list-inside text-xs text-gray-500"><li>Spitzer, R.L. et al. (2006). A brief measure for assessing generalized anxiety disorder. Arch Intern Med.</li><li>Kroenke, K. et al. (2007). Anxiety disorders in primary care. Ann Intern Med.</li></ul><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800"><strong>⚠️ Aviso:</strong> Este test NO es un diagnóstico. Si tu puntaje es ≥10, busca evaluación profesional de salud mental.</div></div>)}</div>
            
                <StudyCTA 
                    title={`Tranquilidad Nerviosa Global`} 
                    description={`La clínica señala que faltantes crónicos de B12 y Vitamina D empeoran drásticamente los cuadros de ansiedad patológica y ataques de pánico.`} 
                    actionText={`Verificar Test de Vitaminas`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Verificar%20Test%20de%20Vitaminas*`} 
                    type="estudio" 
                />
                <AdBanner variant="compact" className="mb-8" /></div>
    </main>);
}
