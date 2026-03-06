'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function CalculadoraColesterolLDLPage() {
    const [colTotal, setColTotal] = useState('');
    const [hdl, setHdl] = useState('');
    const [tg, setTg] = useState('');
    const [resultado, setResultado] = useState<number | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        const ct = parseFloat(colTotal); const h = parseFloat(hdl); const t = parseFloat(tg);
        if (ct > 0 && h > 0 && t > 0 && t < 400) { setResultado(parseFloat((ct - h - t / 5).toFixed(1))); }
    };

    const getCat = (ldl: number) => {
        if (ldl < 100) return { label: 'Óptimo', color: 'text-green-600', bg: 'bg-green-100' };
        if (ldl < 130) return { label: 'Casi óptimo', color: 'text-green-500', bg: 'bg-green-50' };
        if (ldl < 160) return { label: 'Límite alto', color: 'text-yellow-600', bg: 'bg-yellow-100' };
        if (ldl < 190) return { label: 'Alto', color: 'text-orange-600', bg: 'bg-orange-100' };
        return { label: 'Muy alto', color: 'text-red-600', bg: 'bg-red-100' };
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-red-700 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🩸 Calculadora de Colesterol LDL</h1>
                    <p className="text-red-100 mt-2">Fórmula de Friedewald — calcula tu colesterol &quot;malo&quot;</p>
                </div>
            </div>
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div><label className="block text-sm font-bold text-gray-700 mb-2">Colesterol Total (mg/dL)</label><input type="number" value={colTotal} onChange={(e) => setColTotal(e.target.value)} placeholder="Ej: 220" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none text-lg text-gray-800" /></div>
                        <div><label className="block text-sm font-bold text-gray-700 mb-2">HDL (mg/dL)</label><input type="number" value={hdl} onChange={(e) => setHdl(e.target.value)} placeholder="Ej: 50" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none text-lg text-gray-800" /></div>
                        <div><label className="block text-sm font-bold text-gray-700 mb-2">Triglicéridos (mg/dL)</label><input type="number" value={tg} onChange={(e) => setTg(e.target.value)} placeholder="Ej: 150" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none text-lg text-gray-800" /><p className="text-xs text-gray-400 mt-1">Válido para TG &lt; 400 mg/dL</p></div>
                    </div>
                    <button onClick={calcular} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">Calcular LDL</button>
                    {resultado !== null && (() => {
                        const c = getCat(resultado); return (
                            <div className="mt-8">
                                <div className={`${c.bg} rounded-2xl p-6 text-center mb-6`}><p className="text-sm text-gray-600 mb-1">Tu Colesterol LDL estimado</p><p className={`text-5xl font-black ${c.color}`}>{resultado}</p><p className="text-sm text-gray-500">mg/dL</p><p className={`text-xl font-bold ${c.color} mt-1`}>{c.label}</p></div>
                                <div className="mb-6"><table className="w-full text-sm"><thead><tr className="bg-gray-100"><th className="p-2 text-left">LDL (mg/dL)</th><th className="p-2 text-left">Clasificación (NCEP ATP III)</th></tr></thead><tbody>
                                    <tr className="border-b"><td className="p-2">&lt; 100</td><td className="p-2 text-green-600 font-bold">Óptimo</td></tr>
                                    <tr className="border-b"><td className="p-2">100-129</td><td className="p-2 text-green-500 font-bold">Casi óptimo</td></tr>
                                    <tr className="border-b"><td className="p-2">130-159</td><td className="p-2 text-yellow-600 font-bold">Límite alto</td></tr>
                                    <tr className="border-b"><td className="p-2">160-189</td><td className="p-2 text-orange-600 font-bold">Alto</td></tr>
                                    <tr><td className="p-2">≥ 190</td><td className="p-2 text-red-600 font-bold">Muy alto</td></tr>
                                </tbody></table></div>
                                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"><h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3><div className="space-y-3">
                                    {[{ name: 'Perfil de Lípidos completo', reason: 'Incluye LDL directo, más preciso que Friedewald' }, { name: 'PCR Ultrasensible', reason: 'Inflamación vascular asociada a colesterol alto' }, { name: 'Apolipoproteína B', reason: 'Marcador avanzado de riesgo cardiovascular' }, { name: 'Glucosa en Ayunas', reason: 'Diabetes y colesterol están estrechamente relacionados' }].map(s => (<div key={s.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm"><span className="text-green-600 mt-1">✓</span><div><p className="font-semibold text-gray-800 text-sm">{s.name}</p><p className="text-gray-500 text-xs">{s.reason}</p></div></div>))}
                                </div><Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800 transition-colors">Ver Estudios →</Link></div>
                            </div>);
                    })()}
                </div>
                
                <StudyCTA 
                    title={`¿Colesterol LDL elevado?`} 
                    description={`El LDL es conocido como "colesterol malo" porque forma placas que tapan las arterias. Si tus niveles son altos, necesitas un Perfil Lipídico avanzado para iniciar tratamiento urgente.`} 
                    actionText={`Cotizar Perfil Clínico de Lípidos`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Perfil%20Cl%C3%ADnico%20de%20L%C3%ADpidos*`} 
                    type="estudio" 
                />
                <AdBanner variant="horizontal" className="mb-8" />
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    <button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"><span className="font-bold text-gray-900">📚 Fórmula de Friedewald — Información Científica</span><span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span></button>
                    {showInfo && (<div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4">
                        <p>La <strong>fórmula de Friedewald</strong> es el método estándar para estimar el colesterol LDL cuando no se mide directamente.</p>
                        <div className="bg-gray-50 rounded-xl p-4 text-center font-mono">LDL = Colesterol Total - HDL - (Triglicéridos / 5)</div>
                        <p><strong>Limitación:</strong> No es válida cuando los triglicéridos superan 400 mg/dL o en pacientes con quilomicronemia. En esos casos se requiere medición directa de LDL.</p>
                        <h4 className="font-bold text-gray-900">Fuentes</h4>
                        <ul className="list-disc list-inside text-xs text-gray-500"><li>Friedewald, W.T. et al. (1972). Estimation of LDL cholesterol. Clinical Chemistry.</li><li>NCEP ATP III Guidelines. National Cholesterol Education Program.</li></ul>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800"><strong>⚠️ Aviso:</strong> Para una evaluación precisa, solicita un Perfil de Lípidos con LDL directo en nuestro laboratorio.</div>
                    </div>)}
                </div>
                
                <StudyCTA 
                    title={`¿Colesterol LDL elevado?`} 
                    description={`El LDL es conocido como "colesterol malo" porque forma placas que tapan las arterias. Si tus niveles son altos, necesitas un Perfil Lipídico avanzado para iniciar tratamiento urgente.`} 
                    actionText={`Cotizar Perfil Clínico de Lípidos`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Perfil%20Cl%C3%ADnico%20de%20L%C3%ADpidos*`} 
                    type="estudio" 
                />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
