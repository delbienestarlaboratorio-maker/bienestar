'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';
export default function CalcioCorregidoPage() {
    const [calcio, setCalcio] = useState(''); const [albumina, setAlbumina] = useState(''); const [resultado, setResultado] = useState<number | null>(null); const [showInfo, setShowInfo] = useState(false);
    const calcular = () => { const c = parseFloat(calcio); const a = parseFloat(albumina); if (c > 0 && a > 0) { setResultado(parseFloat((c + 0.8 * (4.0 - a)).toFixed(1))); } };
    return (<main className="min-h-screen bg-gray-50"><div className="bg-gradient-to-r from-amber-600 to-yellow-700 py-8 px-4"><div className="max-w-3xl mx-auto"><Link href="/herramientas" className="text-amber-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link><h1 className="text-3xl md:text-4xl font-bold text-white">🦴 Calcio Corregido</h1><p className="text-amber-100 mt-2">Corrección de calcio sérico por albúmina</p></div></div>
        <div className="max-w-3xl mx-auto px-4 py-8"><div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
            <div className="grid grid-cols-2 gap-4 mb-6"><div><label className="block text-sm font-bold text-gray-700 mb-2">Calcio sérico (mg/dL)</label><input type="number" step="0.1" value={calcio} onChange={e => setCalcio(e.target.value)} placeholder="Ej: 8.5" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none text-lg text-gray-800" /></div><div><label className="block text-sm font-bold text-gray-700 mb-2">Albúmina (g/dL)</label><input type="number" step="0.1" value={albumina} onChange={e => setAlbumina(e.target.value)} placeholder="Ej: 3.0" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none text-lg text-gray-800" /></div></div>
            <button onClick={calcular} className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">Calcular Calcio Corregido</button>
            {resultado !== null && (<div className="mt-8"><div className="bg-amber-50 rounded-2xl p-6 text-center mb-6"><p className="text-sm text-gray-600 mb-1">Calcio Corregido</p><p className={`text-5xl font-black ${resultado < 8.5 ? 'text-blue-600' : resultado > 10.5 ? 'text-red-600' : 'text-green-600'}`}>{resultado}</p><p className="text-sm text-gray-500">mg/dL</p><p className={`text-sm mt-2 ${resultado < 8.5 ? 'text-blue-600' : resultado > 10.5 ? 'text-red-600' : 'text-green-600'}`}>{resultado < 8.5 ? 'Hipocalcemia' : resultado > 10.5 ? 'Hipercalcemia' : 'Normal (8.5-10.5 mg/dL)'}</p></div>
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"><h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3><div className="space-y-3">{[{ name: 'Calcio Sérico', reason: 'Medición directa con mayor precisión' }, { name: 'Albúmina', reason: 'Necesaria para la corrección del calcio' }, { name: 'Fósforo', reason: 'Equilibrio calcio-fósforo esencial' }, { name: 'Vitamina D (25-OH)', reason: 'Regulador principal de absorción de calcio' }, { name: 'PTH (Hormona Paratiroidea)', reason: 'Regulador hormonal del metabolismo del calcio' }].map(s => (<div key={s.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm"><span className="text-green-600 mt-1">✓</span><div><p className="font-semibold text-gray-800 text-sm">{s.name}</p><p className="text-gray-500 text-xs">{s.reason}</p></div></div>))}</div><Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800">Ver Estudios →</Link></div></div>)}
        </div>
                <StudyCTA 
                    title={`Importancia del Calcio y Albúmina`} 
                    description={`Si tu albúmina o proteínas están bajas, el calcio activo del cuerpo también decrece. Una Química Integral revela todos estos componentes minerales vitales juntos.`} 
                    actionText={`Química Sanguínea Clínica`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Qu%C3%ADmica%20Sangu%C3%ADnea%20Cl%C3%ADnica*`} 
                    type="estudio" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩸 Guía Endocrinológica Médica: Cálculo de Calcio Corregido por Albúmina</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El inmenso O en U general Cálculo y O U inmenso genérico de inmensurable al Calcio u en de a Corregido al O u a inmensa inmenso ajusta U O U u o Inmenso el nivel u genéricamente a la de O inmensurable calcio Inmensurables O U de u la sanguíneo U u de acuerdo a la o U concentración O o de Albúmina u genérico. Al a de inmenso genéricamente de la O de el calcio de unirse mns a las inmenso O u albúminas, variaciones en O estas en inmensurable U el u de o inmenso U al alteran a la o y hormonal U subestimándolo Inmensurable (pseudohipocalcemia).</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios Integrales</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/quimica-sanguinea" className="text-blue-600 font-semibold hover:underline">Química Sanguínea Integrativa</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"><button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"><span className="font-bold text-gray-900">📚 Calcio Corregido — Información Científica</span><span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span></button>{showInfo && (<div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4"><p>Aproximadamente el 40% del calcio sérico está unido a proteínas, principalmente <strong>albúmina</strong>. Cuando la albúmina está baja (hipoalbuminemia), el calcio total medido puede parecer falsamente bajo.</p><div className="bg-gray-50 rounded-xl p-4 text-center font-mono">Ca corregido = Ca medido + 0.8 × (4.0 - Albúmina)</div><p>Esto asume una albúmina normal de 4.0 g/dL. La fórmula agrega 0.8 mg/dL de calcio por cada 1 g/dL que la albúmina está por debajo de 4.0.</p><h4 className="font-bold text-gray-900">Fuentes</h4><ul className="list-disc list-inside text-xs text-gray-500"><li>Payne, R.B. et al. (1973). Interpretation of serum calcium in patients with abnormal serum proteins. BMJ.</li></ul><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800"><strong>⚠️ Aviso:</strong> Herramienta para profesionales de salud. Los valores deben ser interpretados por un médico.</div></div>)}</div>
            
                <StudyCTA 
                    title={`Importancia del Calcio y Albúmina`} 
                    description={`Si tu albúmina o proteínas están bajas, el calcio activo del cuerpo también decrece. Una Química Integral revela todos estos componentes minerales vitales juntos.`} 
                    actionText={`Química Sanguínea Clínica`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Qu%C3%ADmica%20Sangu%C3%ADnea%20Cl%C3%ADnica*`} 
                    type="estudio" 
                />
                
                <RelatedTools currentPath="/herramientas/calcio-corregido" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" /></div></main>);
}
