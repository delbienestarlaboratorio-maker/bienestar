'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

const preguntas = [
    { id: 'fatiga', text: '¿Se siente cansado/a o con poca energía constantemente?', peso: 2 },
    { id: 'palido', text: '¿Su piel luce pálida o amarillenta?', peso: 2 },
    { id: 'mareo', text: '¿Tiene mareos o sensación de desmayo?', peso: 2 },
    { id: 'disnea', text: '¿Se agita con esfuerzos mínimos (subir escaleras)?', peso: 2 },
    { id: 'taquicardia', text: '¿Siente palpitaciones o latidos rápidos del corazón?', peso: 1 },
    { id: 'unas', text: '¿Sus uñas son quebradizas o tienen forma de cuchara?', peso: 1 },
    { id: 'cabello', text: '¿Tiene caída excesiva de cabello?', peso: 1 },
    { id: 'dieta', text: '¿Su dieta es baja en carnes rojas, legumbres o vegetales verdes?', peso: 1 },
    { id: 'menstruacion', text: '¿Tiene periodos menstruales abundantes o prolongados?', peso: 2 },
    { id: 'embarazo', text: '¿Está embarazada o dio a luz recientemente?', peso: 1 },
    { id: 'cronica', text: '¿Tiene alguna enfermedad crónica (renal, intestinal, cáncer)?', peso: 2 },
];

export default function RiesgoAnemiaPage() {
    const [resp, setResp] = useState<Record<string, boolean>>({}); const [resultado, setResultado] = useState<{ score: number; max: number } | null>(null); const [showInfo, setShowInfo] = useState(false);
    const calcular = () => { if (Object.keys(resp).length < preguntas.length) return; const score = preguntas.reduce((acc, p) => acc + (resp[p.id] ? p.peso : 0), 0); setResultado({ score, max: preguntas.reduce((a, p) => a + p.peso, 0) }); };
    const getCat = (s: number) => { if (s <= 3) return { label: 'Riesgo bajo', color: 'text-green-600', bg: 'bg-green-100', desc: 'Pocos factores de riesgo identificados.' }; if (s <= 7) return { label: 'Riesgo moderado', color: 'text-yellow-600', bg: 'bg-yellow-100', desc: 'Varios factores presentes. Se recomienda realizarse estudios.' }; return { label: 'Riesgo alto', color: 'text-red-600', bg: 'bg-red-100', desc: 'Múltiples factores de riesgo. Es importante realizarse una biometría hemática.' }; };

    return (<main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-rose-700 to-red-800 py-8 px-4"><div className="max-w-3xl mx-auto"><Link href="/herramientas" className="text-rose-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link><h1 className="text-3xl md:text-4xl font-bold text-white">🩸 Evaluación de Riesgo de Anemia</h1><p className="text-rose-100 mt-2">Cuestionario de síntomas y factores de riesgo</p></div></div>
        <div className="max-w-3xl mx-auto px-4 py-8"><div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
            <p className="text-gray-600 text-sm mb-6 bg-rose-50 rounded-xl p-4">Responde &quot;Sí&quot; o &quot;No&quot; a las siguientes preguntas para evaluar tu riesgo de anemia.</p>
            {preguntas.map(p => (<div key={p.id} className="mb-4 flex items-center justify-between bg-gray-50 rounded-xl p-4"><span className="text-gray-700 text-sm flex-1 pr-4">{p.text}</span><div className="flex gap-2 shrink-0"><button onClick={() => setResp(prev => ({ ...prev, [p.id]: true }))} className={`px-4 py-2 rounded-lg text-xs font-bold ${resp[p.id] === true ? 'bg-rose-600 text-white' : 'bg-gray-200 text-gray-600'}`}>Sí</button><button onClick={() => setResp(prev => ({ ...prev, [p.id]: false }))} className={`px-4 py-2 rounded-lg text-xs font-bold ${resp[p.id] === false ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-600'}`}>No</button></div></div>))}
            <button onClick={calcular} className="w-full bg-rose-700 hover:bg-rose-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-4">Evaluar Riesgo</button>
            {resultado && (() => {
                const c = getCat(resultado.score); return (<div className="mt-8"><div className={`${c.bg} rounded-2xl p-6 text-center mb-6`}><p className="text-sm text-gray-600 mb-1">Puntaje de riesgo</p><p className={`text-5xl font-black ${c.color}`}>{resultado.score}/{resultado.max}</p><p className={`text-xl font-bold ${c.color} mt-1`}>{c.label}</p><p className="text-gray-600 text-sm mt-2">{c.desc}</p></div>
                    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"><h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3><div className="space-y-3">{[{ name: 'Biometría Hemática Completa (BHC)', reason: 'Hemoglobina, hematocrito e índices eritrocitarios — diagnóstico definitivo de anemia' }, { name: 'Hierro Sérico', reason: 'Evalúa los niveles de hierro en sangre' }, { name: 'Ferritina', reason: 'Reserva de hierro del cuerpo — primer indicador en depleción' }, { name: 'Capacidad de Fijación de Hierro (TIBC)', reason: 'Evalúa el transporte de hierro' }, { name: 'Vitamina B12 y Ácido Fólico', reason: 'Causas frecuentes de anemia megaloblástica' }, { name: 'Reticulocitos', reason: 'Evalúa la respuesta de la médula ósea' }].map(s => (<div key={s.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm"><span className="text-green-600 mt-1">✓</span><div><p className="font-semibold text-gray-800 text-sm">{s.name}</p><p className="text-gray-500 text-xs">{s.reason}</p></div></div>))}</div><Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800">Ver Estudios →</Link></div></div>);
            })()}
        </div>
                <StudyCTA 
                    title={`Clarifica tu Fatiga Constante`} 
                    description={`Hay más de 5 tipos de Anemias distintas. La Citometría Hemática con Recuento de Reticulocitos define si es falta de hierro, hemorragia o un problema genético.`} 
                    actionText={`Cotizar Citometría Hemática (Biometría)`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Citometr%C3%ADa%20Hem%C3%A1tica%20(Biometr%C3%ADa)*`} 
                    type="estudio" 
                />
                <AdBanner variant="horizontal" className="mb-8" />
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"><button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"><span className="font-bold text-gray-900">📚 Anemia — Información Científica</span><span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span></button>{showInfo && (<div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4"><p>La <strong>anemia</strong> es una condición donde la sangre no tiene suficientes glóbulos rojos sanos o hemoglobina para transportar oxígeno adecuadamente. Afecta a ~1,620 millones de personas mundialmente (OMS).</p><h4 className="font-bold text-gray-900">Tipos más comunes</h4><ul className="list-disc list-inside space-y-1"><li><strong>Ferropénica:</strong> Deficiencia de hierro (más común)</li><li><strong>Megaloblástica:</strong> Deficiencia de B12 o ácido fólico</li><li><strong>Hemolítica:</strong> Destrucción acelerada de glóbulos rojos</li><li><strong>De enfermedad crónica:</strong> Asociada a enfermedades inflamatorias</li></ul><h4 className="font-bold text-gray-900">Criterios diagnósticos (OMS)</h4><table className="w-full text-sm"><thead><tr className="bg-gray-100"><th className="p-2">Grupo</th><th className="p-2">Hemoglobina</th></tr></thead><tbody><tr className="border-b"><td className="p-2">Hombres</td><td className="p-2 text-center">&lt; 13 g/dL</td></tr><tr className="border-b"><td className="p-2">Mujeres no embarazadas</td><td className="p-2 text-center">&lt; 12 g/dL</td></tr><tr><td className="p-2">Embarazadas</td><td className="p-2 text-center">&lt; 11 g/dL</td></tr></tbody></table><h4 className="font-bold text-gray-900">Fuentes</h4><ul className="list-disc list-inside text-xs text-gray-500"><li>WHO. Haemoglobin concentrations for the diagnosis of anaemia and assessment of severity. 2011.</li><li>Kassebaum, N.J. et al. (2014). A systematic analysis of global anemia burden. Blood.</li></ul><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800"><strong>⚠️ Aviso:</strong> Este cuestionario no diagnostica anemia. Solo un análisis de sangre puede confirmarla. Consulta a tu médico.</div></div>)}</div>
            
                <StudyCTA 
                    title={`Clarifica tu Fatiga Constante`} 
                    description={`Hay más de 5 tipos de Anemias distintas. La Citometría Hemática con Recuento de Reticulocitos define si es falta de hierro, hemorragia o un problema genético.`} 
                    actionText={`Cotizar Citometría Hemática (Biometría)`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Citometr%C3%ADa%20Hem%C3%A1tica%20(Biometr%C3%ADa)*`} 
                    type="estudio" 
                />
                <AdBanner variant="compact" className="mb-8" /></div>
    </main>);
}
