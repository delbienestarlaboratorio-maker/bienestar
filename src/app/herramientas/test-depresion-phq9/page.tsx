'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

const preguntas = [
    'Poco interés o placer en hacer cosas',
    'Se ha sentido decaído/a, deprimido/a o sin esperanzas',
    'Dificultad para quedarse o permanecer dormido/a, o dormir demasiado',
    'Se ha sentido cansado/a o con poca energía',
    'Falta de apetito o ha comido en exceso',
    'Se ha sentido mal consigo mismo/a, o que es un fracaso',
    'Dificultad para concentrarse en cosas como leer o ver televisión',
    'Se ha movido o hablado tan lento que otros lo notarían, o lo contrario',
    'Pensamientos de que estaría mejor muerto/a o de hacerse daño',
];
const opciones = [{ v: 0, l: 'Nunca' }, { v: 1, l: 'Varios días' }, { v: 2, l: 'Más de la mitad de los días' }, { v: 3, l: 'Casi todos los días' }];

export default function TestDepresionPHQ9Page() {
    const [resp, setResp] = useState<Record<number, number>>({}); const [resultado, setResultado] = useState<number | null>(null); const [showInfo, setShowInfo] = useState(false);
    const calcular = () => { if (Object.keys(resp).length < 9) return; setResultado(Object.values(resp).reduce((a, b) => a + b, 0)); };
    const getCat = (s: number) => { if (s < 5) return { label: 'Mínima', color: 'text-green-600', bg: 'bg-green-100', desc: 'No se requiere tratamiento.' }; if (s < 10) return { label: 'Leve', color: 'text-yellow-600', bg: 'bg-yellow-100', desc: 'Vigilancia y seguimiento. Considere reevaluar en 2 semanas.' }; if (s < 15) return { label: 'Moderada', color: 'text-orange-500', bg: 'bg-orange-100', desc: 'Se recomienda plan de tratamiento con psicoterapia y/o farmacoterapia.' }; if (s < 20) return { label: 'Moderadamente severa', color: 'text-orange-600', bg: 'bg-orange-100', desc: 'Se recomienda tratamiento activo con farmacoterapia y/o psicoterapia.' }; return { label: 'Severa', color: 'text-red-600', bg: 'bg-red-100', desc: 'Se recomienda tratamiento farmacológico inmediato y psicoterapia. Considere referencia a psiquiatría.' }; };

    return (<main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-indigo-700 to-purple-800 py-8 px-4"><div className="max-w-3xl mx-auto"><Link href="/herramientas" className="text-indigo-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link><h1 className="text-3xl md:text-4xl font-bold text-white">🧠 Test de Depresión PHQ-9</h1><p className="text-indigo-100 mt-2">Patient Health Questionnaire — cuestionario validado de 9 preguntas</p></div></div>
        <div className="max-w-3xl mx-auto px-4 py-8"><div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
            <p className="text-gray-600 text-sm mb-6 bg-indigo-50 rounded-xl p-4">Durante las <strong>últimas 2 semanas</strong>, ¿con qué frecuencia le han molestado los siguientes problemas?</p>
            {preguntas.map((p, i) => (<div key={i} className="mb-5"><p className="font-bold text-gray-800 text-sm mb-2">{i + 1}. {p}</p><div className="grid grid-cols-2 md:grid-cols-4 gap-2">{opciones.map(o => (<button key={o.v} onClick={() => setResp(prev => ({ ...prev, [i]: o.v }))} className={`p-2 rounded-lg text-xs font-bold transition-all ${resp[i] === o.v ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{o.l}</button>))}</div></div>))}
            <button onClick={calcular} className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]" disabled={Object.keys(resp).length < 9}>Calcular Resultado</button>
            {resultado !== null && (() => {
                const c = getCat(resultado); return (<div className="mt-8"><div className={`${c.bg} rounded-2xl p-6 text-center mb-6`}><p className="text-sm text-gray-600 mb-1">Puntaje PHQ-9</p><p className={`text-5xl font-black ${c.color}`}>{resultado}/27</p><p className={`text-xl font-bold ${c.color} mt-1`}>Depresión {c.label}</p><p className="text-gray-600 text-sm mt-2">{c.desc}</p></div>
                    {resultado >= 10 && (<div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 text-sm text-red-800"><strong>⚠️ Importante:</strong> Si has tenido pensamientos de hacerte daño o suicidio, busca ayuda inmediata. Línea de la Vida: <strong>800-911-2000</strong> (24/7)</div>)}
                    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"><h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3><p className="text-sm text-gray-600 mb-3">Algunas condiciones médicas pueden causar o empeorar síntomas depresivos:</p><div className="space-y-3">{[{ name: 'Perfil Tiroideo (TSH, T3, T4)', reason: 'El hipotiroidismo causa depresión, fatiga y cambios de peso' }, { name: 'Vitamina D (25-OH)', reason: 'Deficiencia de vitamina D se asocia a depresión' }, { name: 'Biometría Hemática', reason: 'La anemia causa fatiga y síntomas similares a depresión' }, { name: 'Vitamina B12 y Ácido Fólico', reason: 'Deficiencias asociadas a síntomas neuropsiquiátricos' }, { name: 'Cortisol', reason: 'Disfunción del eje HPA asociada a trastornos del ánimo' }].map(s => (<div key={s.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm"><span className="text-green-600 mt-1">✓</span><div><p className="font-semibold text-gray-800 text-sm">{s.name}</p><p className="text-gray-500 text-xs">{s.reason}</p></div></div>))}</div><Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800">Ver Estudios →</Link></div></div>);
            })()}
        </div>
                <StudyCTA 
                    title={`Salud Mental y Fisiológica`} 
                    description={`Curiosamente, depresión y cansancio a menudo esconden causas orgánicas no diagnosticadas, como Hipotiroidismo Severo o Anemia. Evaluar el Perfil Tiroideo descarta estos gatillos físicos.`} 
                    actionText={`Cotizar Check-up General`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Check-up%20General*`} 
                    type="checkup" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🧠 Guía Psiquiátrica: Trastorno Depresivo Mayor (Cuestionario PHQ-9)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Trastorno Depresivo Mayor (TDM) no es un cuadro temporal de tristeza psicológica, sino un estado patológico neurotóxico sostenido. El Patient Health Questionnaire-9 (PHQ-9) es la herramienta clínica tipo \"Gold Standard\" internacional validada por la psiquiatría y la medicina familiar global para cuantificar estructuralmente la morbimortalidad y severidad del desgano dopaminérgico y colapso serotoninérgico en la corteza cerebral del paciente a largo de las últimas 2 semanas.</p>
       
       <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Fisiopatología de la Depresión Bioquímica Clínica</h3>
       <p>En un cerebro sumido en el abismo biológico de la depresión mayor crónica, se deprime la red metabólica sináptica. Ocurre una notable depleción de los neurotransmisores monoaminérgicos orgánicos gigantes: Serotonina (causando irritabilidad e insomnio), Dopamina (produciendo anhedonia clínica o nula percepción de la recompensa física) y Norepinefrina (ausencia total de fatiga psicomotriz motora). Estructuralmente, si el hipocampo (memoria cortical) se baña en cortisol del estrés psíquico prolongado, el tamaño microscópico fisiológico de esa región cerebral se encoge temporal y drásticamente.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Implicaciones Clínicas y Sintomatología Medible Puntuada</h3>
       <ul>
           <li><strong>Anhedonia Parcial y Completamente Abolida:</strong> La absoluta, paralizante e insuperable pérdida biológica central neurológica del puro \"Gusto por vivir o sentir alegría\" por actividades antaño amadas y veneradas biológicamente.</li>
           <li><strong>Retardo y Lentitud Psicomotora:</strong> El individuo camina psíquicamente bajo \"cemento cerebral\". Todo paso material o intelectual exige esfuerzos sobrehumanos colosales e indeseados fatales agotadores del metabolismo cerebral base.</li>
           <li><strong>Apatía Somatizada Mortal o Hipersomnia del Sueño:</strong> Descontrol del Ritmo Circadiano del Núcleo Supraquiasmático; incapacidad de pararse a base del cerebro que huye durmiendo permanentemente y comiendo azúcares inflamatorios.</li>
       </ul>

       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Emergencia Médica Psiquiatra: Alerta (Red Flag) del PHQ9</h4>
           <p className="text-red-700 m-0">La Pregunta Clínica 9 de la Valoración (Acerca de automutilación total o finalización psiquiátrica de la vida física) marca la máxima alerta y urgencia material prehospitalaria. Si el paciente o usted marca esta casilla, requiere de una atención y traslado hospitalario de rescate emergente de intervención clínica en psiquiatría de crisis de manera fulminantemente urgente. <strong>Es una alerta de rescate neuronal prioritaria por urgencia del peligro inminente estructural general.</strong></p>
       </div>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Abordaje y Laboratorios Sistémicos Endocrinos</h3>
       <p>Psiquiatras integrativos modernos y la medicina biológica indican obligatoriamente, previo y a la par de las dosis del tratamiento de antidepresivo, un mapeo celular que descarte la fatiga sistémica química y metabólica similar a depresión física material base:</p>
       <ul>
           <li><a href="/estudios/perfiles/perfil-tiroideo" className="text-blue-600 font-semibold hover:underline">Perfil de Tiroides Exacto (T3/T4)</a> (El hipotiroidismo letárgico no reacciona a los anti-depresivos inhibidores de serotonina químicos y lo mimetizan gravemente de por vida de no evaluarse exhaustivamente en laboratorios).</li>
           <li><a href="/estudios/analisis-clinicos/biometria-hematica" className="text-blue-600 font-semibold hover:underline">Biometría y Química Fisiología Superior (Déficits Severos)</a> (Una profunda ausencia clínica base prolongada de Vitamina D o de un agotamiento enorme sistémico por la Glucosa e insulina bloquean los receptores mentales y motores sistémicos colosales cerebrales en el humano moderno).</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"><button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"><span className="font-bold text-gray-900">📚 PHQ-9 — Información Científica</span><span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span></button>{showInfo && (<div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4"><p>El <strong>PHQ-9 (Patient Health Questionnaire-9)</strong> es un instrumento validado internacionalmente para el tamizaje y evaluación de la severidad de la depresión. Fue desarrollado por los Drs. Robert L. Spitzer, Janet B.W. Williams y Kurt Kroenke.</p><h4 className="font-bold text-gray-900">Interpretación</h4><table className="w-full text-sm"><thead><tr className="bg-gray-100"><th className="p-2">Puntaje</th><th className="p-2">Severidad</th></tr></thead><tbody><tr className="border-b"><td className="p-2 text-center">0-4</td><td className="p-2">Mínima</td></tr><tr className="border-b"><td className="p-2 text-center">5-9</td><td className="p-2">Leve</td></tr><tr className="border-b"><td className="p-2 text-center">10-14</td><td className="p-2">Moderada</td></tr><tr className="border-b"><td className="p-2 text-center">15-19</td><td className="p-2">Moderadamente severa</td></tr><tr><td className="p-2 text-center">20-27</td><td className="p-2">Severa</td></tr></tbody></table><h4 className="font-bold text-gray-900">Fuentes</h4><ul className="list-disc list-inside text-xs text-gray-500"><li>Kroenke, K. et al. (2001). The PHQ-9: validity of a brief depression severity measure. J Gen Intern Med.</li><li>Spitzer, R.L. et al. (1999). Validation and utility of a self-report version of PRIME-MD. JAMA.</li></ul><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800"><strong>⚠️ Aviso:</strong> Este test NO es un diagnóstico. Es un herramienta de tamizaje. Si obtuviste un puntaje ≥10, consulta a un profesional de salud mental.</div></div>)}</div>
            
                <StudyCTA 
                    title={`Salud Mental y Fisiológica`} 
                    description={`Curiosamente, depresión y cansancio a menudo esconden causas orgánicas no diagnosticadas, como Hipotiroidismo Severo o Anemia. Evaluar el Perfil Tiroideo descarta estos gatillos físicos.`} 
                    actionText={`Cotizar Check-up General`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Check-up%20General*`} 
                    type="checkup" 
                />
                <AdBanner variant="compact" className="mb-8" /></div>
    </main>);
}
