'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function MeldScorePage() {
    const [bilirrubina, setBilirrubina] = useState(''); const [creatinina, setCreatinina] = useState(''); const [inr, setInr] = useState(''); const [sodio, setSodio] = useState('');
    const [resultado, setResultado] = useState<number | null>(null); const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        let b = parseFloat(bilirrubina); let c = parseFloat(creatinina); const i = parseFloat(inr); let s = parseFloat(sodio);
        if (b <= 0 || c <= 0 || i <= 0 || s <= 0) return;
        b = Math.max(b, 1); c = Math.min(Math.max(c, 1), 4); s = Math.min(Math.max(s, 125), 137);
        const meld = Math.round(10 * (0.957 * Math.log(c) + 0.378 * Math.log(b) + 1.120 * Math.log(i) + 0.643));
        const meldNa = Math.round(meld + (1.32 * (137 - s)) - (0.033 * meld * (137 - s)));
        setResultado(Math.max(6, Math.min(meldNa, 40)));
    };

    const getCat = (m: number) => { if (m < 10) return { label: 'Enfermedad leve', color: 'text-green-600', bg: 'bg-green-100', mort: '<2%' }; if (m < 20) return { label: 'Moderada', color: 'text-yellow-600', bg: 'bg-yellow-100', mort: '6%' }; if (m < 30) return { label: 'Severa', color: 'text-orange-600', bg: 'bg-orange-100', mort: '20%' }; return { label: 'Muy severa', color: 'text-red-600', bg: 'bg-red-100', mort: '>70%' }; };

    return (<main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-amber-800 to-orange-900 py-8 px-4"><div className="max-w-3xl mx-auto"><Link href="/herramientas" className="text-amber-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link><h1 className="text-3xl md:text-4xl font-bold text-white">📊 MELD Score</h1><p className="text-amber-100 mt-2">Severidad de enfermedad hepática y prioridad de trasplante</p></div></div>
        <div className="max-w-3xl mx-auto px-4 py-8"><div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div><label className="block text-sm font-bold text-gray-700 mb-2">Bilirrubina Total (mg/dL)</label><input type="number" step="0.1" value={bilirrubina} onChange={e => setBilirrubina(e.target.value)} placeholder="1.2" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none text-lg text-gray-800" /></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-2">Creatinina (mg/dL)</label><input type="number" step="0.1" value={creatinina} onChange={e => setCreatinina(e.target.value)} placeholder="1.0" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none text-lg text-gray-800" /></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-2">INR</label><input type="number" step="0.1" value={inr} onChange={e => setInr(e.target.value)} placeholder="1.2" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none text-lg text-gray-800" /></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-2">Sodio (mEq/L)</label><input type="number" value={sodio} onChange={e => setSodio(e.target.value)} placeholder="138" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none text-lg text-gray-800" /></div>
            </div>
            <button onClick={calcular} className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">Calcular MELD-Na</button>
            {resultado !== null && (() => {
                const c = getCat(resultado); return (<div className="mt-8"><div className={`${c.bg} rounded-2xl p-6 text-center mb-6`}><p className="text-sm text-gray-600 mb-1">MELD-Na Score</p><p className={`text-5xl font-black ${c.color}`}>{resultado}</p><p className={`text-lg font-bold ${c.color} mt-1`}>{c.label}</p><p className="text-gray-500 text-sm mt-1">Mortalidad a 3 meses: {c.mort}</p></div>
                    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"><h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3><div className="space-y-3">{[{ name: 'Perfil Hepático completo', reason: 'AST, ALT, GGT, FA, Bilirrubinas directa/indirecta' }, { name: 'Tiempo de Protrombina e INR', reason: 'Función de coagulación hepática' }, { name: 'Creatinina y BUN', reason: 'Función renal asociada a síndrome hepatorrenal' }, { name: 'Electrolitos Séricos', reason: 'Sodio corregido para MELD-Na' }, { name: 'Albúmina', reason: 'Marcador de síntesis proteica hepática' }].map(s => (<div key={s.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm"><span className="text-green-600 mt-1">✓</span><div><p className="font-semibold text-gray-800 text-sm">{s.name}</p><p className="text-gray-500 text-xs">{s.reason}</p></div></div>))}</div><Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800">Ver Estudios →</Link></div></div>);
            })()}
        </div>
                <StudyCTA 
                    title={`Urgencia Gastroenterológica`} 
                    description={`En Scores elevados de MELD, los tiempos de coagulación y las bilirrubinas (junto con Creatinina) dictan la urgencia de recibir soporte hepático avanzado.`} 
                    actionText={`Cotizar Bilirrubina y TP`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Bilirrubina%20y%20TP*`} 
                    type="estudio" 
                />
                <AdBanner variant="horizontal" className="mb-8" />
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"><button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"><span className="font-bold text-gray-900">📚 MELD Score — Información Científica</span><span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span></button>{showInfo && (<div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4"><p>El <strong>MELD (Model for End-Stage Liver Disease)</strong> fue desarrollado en la Clínica Mayo para predecir la supervivencia a 3 meses en pacientes con enfermedad hepática crónica. Se usa internacionalmente para priorizar la lista de trasplante hepático.</p><div className="bg-gray-50 rounded-xl p-4 font-mono text-xs">MELD = 10 × [0.957 × ln(Cr) + 0.378 × ln(Bili) + 1.120 × ln(INR) + 0.643]<br />MELD-Na = MELD + 1.32 × (137-Na) - [0.033 × MELD × (137-Na)]</div><h4 className="font-bold text-gray-900">Fuentes</h4><ul className="list-disc list-inside text-xs text-gray-500"><li>Kamath, P.S. et al. (2001). A model to predict survival in patients with end-stage liver disease. Hepatology.</li><li>Kim, W.R. et al. (2008). Hyponatremia and mortality among patients on the liver-transplant waiting list. NEJM.</li></ul><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800"><strong>⚠️ Aviso:</strong> Herramienta para profesionales. Los resultados deben ser interpretados por un hepatólogo.</div></div>)}</div>
            
                <StudyCTA 
                    title={`Urgencia Gastroenterológica`} 
                    description={`En Scores elevados de MELD, los tiempos de coagulación y las bilirrubinas (junto con Creatinina) dictan la urgencia de recibir soporte hepático avanzado.`} 
                    actionText={`Cotizar Bilirrubina y TP`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Bilirrubina%20y%20TP*`} 
                    type="estudio" 
                />
                
                <RelatedTools currentPath="/herramientas/meld-score" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" /></div>
    </main>);
}
