'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function IndiceFIB4Page() {
    const [edad, setEdad] = useState(''); const [ast, setAst] = useState(''); const [alt, setAlt] = useState(''); const [plaquetas, setPlaquetas] = useState('');
    const [resultado, setResultado] = useState<number | null>(null); const [showInfo, setShowInfo] = useState(false);

    const calcular = () => { const e = parseFloat(edad); const a = parseFloat(ast); const al = parseFloat(alt); const p = parseFloat(plaquetas); if (e > 0 && a > 0 && al > 0 && p > 0) { setResultado(parseFloat(((e * a) / (p * Math.sqrt(al))).toFixed(2))); } };

    const getCat = (f: number) => { if (f < 1.3) return { label: 'Riesgo bajo de fibrosis', color: 'text-green-600', bg: 'bg-green-100', desc: 'Probabilidad baja de fibrosis avanzada. Valor predictivo negativo >90%.' }; if (f <= 2.67) return { label: 'Riesgo indeterminado', color: 'text-yellow-600', bg: 'bg-yellow-100', desc: 'Se recomienda evaluación adicional (elastografía hepática).' }; return { label: 'Riesgo alto de fibrosis', color: 'text-red-600', bg: 'bg-red-100', desc: 'Alta probabilidad de fibrosis avanzada (F3-F4). Consulte hepatólogo.' }; };

    return (<main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-amber-700 to-yellow-800 py-8 px-4"><div className="max-w-3xl mx-auto"><Link href="/herramientas" className="text-amber-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link><h1 className="text-3xl md:text-4xl font-bold text-white">🫁 Índice FIB-4</h1><p className="text-amber-100 mt-2">Evaluación no invasiva de fibrosis hepática</p></div></div>
        <div className="max-w-3xl mx-auto px-4 py-8"><div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div><label className="block text-sm font-bold text-gray-700 mb-2">Edad (años)</label><input type="number" value={edad} onChange={e => setEdad(e.target.value)} placeholder="55" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none text-lg text-gray-800" /></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-2">AST (U/L)</label><input type="number" value={ast} onChange={e => setAst(e.target.value)} placeholder="45" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none text-lg text-gray-800" /></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-2">ALT (U/L)</label><input type="number" value={alt} onChange={e => setAlt(e.target.value)} placeholder="40" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none text-lg text-gray-800" /></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-2">Plaquetas (×10⁹/L)</label><input type="number" value={plaquetas} onChange={e => setPlaquetas(e.target.value)} placeholder="200" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none text-lg text-gray-800" /></div>
            </div>
            <button onClick={calcular} className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">Calcular FIB-4</button>
            {resultado !== null && (() => {
                const c = getCat(resultado); return (<div className="mt-8"><div className={`${c.bg} rounded-2xl p-6 text-center mb-6`}><p className="text-sm text-gray-600 mb-1">Índice FIB-4</p><p className={`text-5xl font-black ${c.color}`}>{resultado}</p><p className={`text-lg font-bold ${c.color} mt-2`}>{c.label}</p><p className="text-gray-600 text-sm mt-1">{c.desc}</p></div>
                    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"><h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3><div className="space-y-3">{[{ name: 'Perfil Hepático completo (AST, ALT, GGT, FA, Bilirrubinas)', reason: 'Evaluación integral de función hepática' }, { name: 'Biometría Hemática con Plaquetas', reason: 'Las plaquetas bajas indican hipertensión portal' }, { name: 'Albúmina', reason: 'Marcador de función de síntesis hepática' }, { name: 'Tiempo de Protrombina (TP/INR)', reason: 'La coagulación se altera con enfermedad hepática avanzada' }].map(s => (<div key={s.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm"><span className="text-green-600 mt-1">✓</span><div><p className="font-semibold text-gray-800 text-sm">{s.name}</p><p className="text-gray-500 text-xs">{s.reason}</p></div></div>))}</div><Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800">Ver Estudios →</Link></div></div>);
            })()}
        </div>
                <StudyCTA 
                    title={`Salva tu Hígado Hoy`} 
                    description={`Un FIB4 elevado apunta a fibrosis o cirrosis inminente. Estudios urgentes de Perfil Hepático o Pruebas de Función Hepática (AST, ALT, Bilirrubinas) te indicarán el camino clínico a seguir.`} 
                    actionText={`Cotizar Prueba Hepática`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Prueba%20Hep%C3%A1tica*`} 
                    type="estudio" 
                />
                <AdBanner variant="horizontal" className="mb-8" />
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"><button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"><span className="font-bold text-gray-900">📚 Índice FIB-4 — Información Científica</span><span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span></button>{showInfo && (<div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4"><p>El <strong>FIB-4</strong> es un índice no invasivo para estimar fibrosis hepática usando solo 4 datos que se obtienen de análisis de sangre rutinarios.</p><div className="bg-gray-50 rounded-xl p-4 text-center font-mono">FIB-4 = (Edad × AST) / (Plaquetas × √ALT)</div><p>Fue validado originalmente para hepatitis C pero se usa ampliamente en hígado graso no alcohólico (NAFLD/NASH).</p><h4 className="font-bold text-gray-900">Fuentes</h4><ul className="list-disc list-inside text-xs text-gray-500"><li>Sterling, R.K. et al. (2006). Development of a simple noninvasive index to predict significant fibrosis. Hepatology.</li><li>European Association for the Study of the Liver (EASL). Clinical Practice Guidelines. 2016.</li></ul><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800"><strong>⚠️ Aviso:</strong> Este índice no confirma ni descarta diagnósticos. Consulta a un hepatólogo para interpretación clínica.</div></div>)}</div>
            
                <StudyCTA 
                    title={`Salva tu Hígado Hoy`} 
                    description={`Un FIB4 elevado apunta a fibrosis o cirrosis inminente. Estudios urgentes de Perfil Hepático o Pruebas de Función Hepática (AST, ALT, Bilirrubinas) te indicarán el camino clínico a seguir.`} 
                    actionText={`Cotizar Prueba Hepática`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Prueba%20Hep%C3%A1tica*`} 
                    type="estudio" 
                />
                <AdBanner variant="compact" className="mb-8" /></div>
    </main>);
}
