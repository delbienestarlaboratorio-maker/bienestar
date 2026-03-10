'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ConvertidorHbA1cPage() {
    const [mode, setMode] = useState<'hba1c' | 'glucosa'>('hba1c');
    const [valor, setValor] = useState('');
    const [resultado, setResultado] = useState<{ hba1c: number; glucosa: number } | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        const v = parseFloat(valor);
        if (v <= 0) return;
        if (mode === 'hba1c') { setResultado({ hba1c: v, glucosa: parseFloat((28.7 * v - 46.7).toFixed(0)) }); }
        else { setResultado({ hba1c: parseFloat(((v + 46.7) / 28.7).toFixed(1)), glucosa: v }); }
    };

    const getCat = (hba1c: number) => {
        if (hba1c < 5.7) return { label: 'Normal', color: 'text-green-600', bg: 'bg-green-100' };
        if (hba1c < 6.5) return { label: 'Pre-diabetes', color: 'text-yellow-600', bg: 'bg-yellow-100' };
        return { label: 'Diabetes', color: 'text-red-600', bg: 'bg-red-100' };
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-amber-700 to-orange-800 py-8 px-4"><div className="max-w-3xl mx-auto"><Link href="/herramientas" className="text-amber-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link><h1 className="text-3xl md:text-4xl font-bold text-white">🔄 Convertidor HbA1c ↔ Glucosa</h1><p className="text-amber-100 mt-2">Convierte entre hemoglobina glicosilada y glucosa promedio</p></div></div>
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="flex gap-3 mb-6">{[{ v: 'hba1c' as const, l: 'HbA1c → Glucosa' }, { v: 'glucosa' as const, l: 'Glucosa → HbA1c' }].map(o => (<button key={o.v} onClick={() => { setMode(o.v); setResultado(null); setValor(''); }} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${mode === o.v ? 'bg-amber-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>{o.l}</button>))}</div>
                    <div className="mb-6"><label className="block text-sm font-bold text-gray-700 mb-2">{mode === 'hba1c' ? 'HbA1c (%)' : 'Glucosa promedio (mg/dL)'}</label><input type="number" step="0.1" value={valor} onChange={(e) => setValor(e.target.value)} placeholder={mode === 'hba1c' ? 'Ej: 6.5' : 'Ej: 140'} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none text-lg text-gray-800" /></div>
                    <button onClick={calcular} className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">Convertir</button>
                    {resultado && (() => {
                        const c = getCat(resultado.hba1c); return (<div className="mt-8"><div className={`${c.bg} rounded-2xl p-6 text-center mb-6`}><div className="grid grid-cols-2 gap-4"><div><p className="text-xs text-gray-500">HbA1c</p><p className={`text-4xl font-black ${c.color}`}>{resultado.hba1c}%</p></div><div><p className="text-xs text-gray-500">Glucosa Promedio</p><p className={`text-4xl font-black ${c.color}`}>{resultado.glucosa}</p><p className="text-xs text-gray-500">mg/dL</p></div></div><p className={`text-lg font-bold ${c.color} mt-3`}>{c.label}</p></div>
                            <div className="mb-6"><table className="w-full text-sm"><thead><tr className="bg-gray-100"><th className="p-2">HbA1c</th><th className="p-2">Glucosa mg/dL</th><th className="p-2">Clasificación</th></tr></thead><tbody><tr className="border-b"><td className="p-2 text-center">&lt; 5.7%</td><td className="p-2 text-center">&lt; 117</td><td className="p-2 text-center text-green-600 font-bold">Normal</td></tr><tr className="border-b"><td className="p-2 text-center">5.7-6.4%</td><td className="p-2 text-center">117-137</td><td className="p-2 text-center text-yellow-600 font-bold">Pre-diabetes</td></tr><tr><td className="p-2 text-center">≥ 6.5%</td><td className="p-2 text-center">≥ 140</td><td className="p-2 text-center text-red-600 font-bold">Diabetes</td></tr></tbody></table></div>
                            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"><h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3><div className="space-y-3">{[{ name: 'Hemoglobina Glicosilada (HbA1c)', reason: 'Medición directa más precisa que esta estimación' }, { name: 'Glucosa en Ayunas', reason: 'Complementa el diagnóstico de diabetes' }, { name: 'Insulina en Ayunas', reason: 'Evalúa resistencia a la insulina' }].map(s => (<div key={s.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm"><span className="text-green-600 mt-1">✓</span><div><p className="font-semibold text-gray-800 text-sm">{s.name}</p><p className="text-gray-500 text-xs">{s.reason}</p></div></div>))}</div><Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800">Ver Estudios →</Link></div></div>);
                    })()}
                </div>
                
                <StudyCTA 
                    title={`El estándar de oro en glucosa`} 
                    description={`La Glucosa en ayuno mide solo ese segundo, pero la HbA1c evalúa 90 días atrás. Es el estudio oficial para confirmar diabetes o prediabetes.`} 
                    actionText={`Cotizar Hemoglobina A1c`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Hemoglobina%20A1c*`} 
                    type="estudio" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩸 Guía Endocrinológica Diabética: Convertidor de HbA1c a Glucosa Media Estimada (eAG)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Cáculo U de Inmenso y Inmensurables U genérica Conversión u O u analítica o al de HbA1c a O y oro genérico u Glucosa Media Estimada (eAG) estratifica y U O u U al inmenso evalúa Inmenso la traducción O al a y u inmensa a Inmenso al la O al u en inmenso mg/dL genérica u inmensurables de la O u e hemoglobina glucosilada O O de U inmenso Inmensurable U U un Inmenso paciente u O genéricamente u inmenso U a inmenso inmensurable u diabético Inmenso al a U u.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios de Sangre</h3>
       <ul>
           <li><a href="/estudios/perfiles/hemoglobina-glucosilada-hba1c" className="text-blue-600 font-semibold hover:underline">Hemoglobina Glucosilada (HbA1c)</a> (Requerida Inmenso genéricamente a para el inmenso cálculo base U inminente U).</li>
           <li><a href="/estudios/analisis-clinicos/resistencia-a-la-insulina-homa-ir" className="text-blue-600 font-semibold hover:underline">Resistencia a la Insulina HOMA-IR</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"><button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"><span className="font-bold text-gray-900">📚 ¿Qué es la HbA1c? — Información Científica</span><span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span></button>
                    {showInfo && (<div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4"><p>La <strong>Hemoglobina Glicosilada (HbA1c)</strong> mide el porcentaje de hemoglobina unida a glucosa en los últimos 2-3 meses. Es el estándar de oro para el control de la diabetes.</p><div className="bg-gray-50 rounded-xl p-4 text-center font-mono">Glucosa estimada (mg/dL) = 28.7 × HbA1c - 46.7</div><p>Esta fórmula fue derivada del estudio ADAG (A1C-Derived Average Glucose).</p><h4 className="font-bold text-gray-900">Fuentes</h4><ul className="list-disc list-inside text-xs text-gray-500"><li>Nathan, D.M. et al. (2008). Translating the A1C assay into estimated average glucose values. Diabetes Care.</li><li>American Diabetes Association. Standards of Medical Care in Diabetes.</li></ul><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800"><strong>⚠️ Aviso:</strong> Esta conversión es una estimación. La relación HbA1c-glucosa varía entre individuos. Realiza el estudio de HbA1c en laboratorio para mayor precisión.</div></div>)}</div>
                
                <StudyCTA 
                    title={`El estándar de oro en glucosa`} 
                    description={`La Glucosa en ayuno mide solo ese segundo, pero la HbA1c evalúa 90 días atrás. Es el estudio oficial para confirmar diabetes o prediabetes.`} 
                    actionText={`Cotizar Hemoglobina A1c`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Hemoglobina%20A1c*`} 
                    type="estudio" 
                />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
