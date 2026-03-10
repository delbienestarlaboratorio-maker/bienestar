'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function IndiceCinturaCaderaPage() {
    const [sexo, setSexo] = useState<'hombre' | 'mujer'>('hombre'); const [cintura, setCintura] = useState(''); const [cadera, setCadera] = useState('');
    const [resultado, setResultado] = useState<number | null>(null); const [showInfo, setShowInfo] = useState(false);
    const calcular = () => { const c = parseFloat(cintura); const h = parseFloat(cadera); if (c > 0 && h > 0) setResultado(parseFloat((c / h).toFixed(2))); };

    const getCat = (r: number, s: string) => {
        if (s === 'hombre') { if (r < 0.90) return { label: 'Riesgo bajo', color: 'text-green-600', bg: 'bg-green-100' }; if (r <= 1.0) return { label: 'Riesgo moderado', color: 'text-yellow-600', bg: 'bg-yellow-100' }; return { label: 'Riesgo alto', color: 'text-red-600', bg: 'bg-red-100' }; }
        else { if (r < 0.80) return { label: 'Riesgo bajo', color: 'text-green-600', bg: 'bg-green-100' }; if (r <= 0.85) return { label: 'Riesgo moderado', color: 'text-yellow-600', bg: 'bg-yellow-100' }; return { label: 'Riesgo alto', color: 'text-red-600', bg: 'bg-red-100' }; }
    };

    return (<main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-green-700 to-lime-800 py-8 px-4"><div className="max-w-3xl mx-auto"><Link href="/herramientas" className="text-green-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link><h1 className="text-3xl md:text-4xl font-bold text-white">📏 Índice Cintura-Cadera</h1><p className="text-green-100 mt-2">Indicador de distribución de grasa y riesgo cardiometabólico (OMS)</p></div></div>
        <div className="max-w-3xl mx-auto px-4 py-8"><div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
            <div className="mb-6"><label className="block text-sm font-bold text-gray-700 mb-2">Sexo</label><div className="flex gap-3"><button onClick={() => setSexo('hombre')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${sexo === 'hombre' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>👨 Hombre</button><button onClick={() => setSexo('mujer')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${sexo === 'mujer' ? 'bg-pink-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>👩 Mujer</button></div></div>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div><label className="block text-sm font-bold text-gray-700 mb-2">Cintura (cm)</label><input type="number" value={cintura} onChange={e => setCintura(e.target.value)} placeholder="Ej: 80" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none text-lg text-gray-800" /><p className="text-xs text-gray-400 mt-1">Al nivel del ombligo</p></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-2">Cadera (cm)</label><input type="number" value={cadera} onChange={e => setCadera(e.target.value)} placeholder="Ej: 95" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none text-lg text-gray-800" /><p className="text-xs text-gray-400 mt-1">En la parte más ancha</p></div>
            </div>
            <button onClick={calcular} className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">Calcular Índice</button>
            {resultado !== null && (() => {
                const c = getCat(resultado, sexo); return (<div className="mt-8"><div className={`${c.bg} rounded-2xl p-6 text-center mb-6`}><p className="text-sm text-gray-600 mb-1">Índice Cintura-Cadera</p><p className={`text-5xl font-black ${c.color}`}>{resultado}</p><p className={`text-xl font-bold ${c.color} mt-1`}>{c.label}</p></div>
                    <div className="mb-6"><table className="w-full text-sm"><thead><tr className="bg-gray-100"><th className="p-2">Riesgo</th><th className="p-2">Hombres</th><th className="p-2">Mujeres</th></tr></thead><tbody><tr className="border-b"><td className="p-2 text-green-600 font-bold">Bajo</td><td className="p-2 text-center">&lt; 0.90</td><td className="p-2 text-center">&lt; 0.80</td></tr><tr className="border-b"><td className="p-2 text-yellow-600 font-bold">Moderado</td><td className="p-2 text-center">0.90-1.0</td><td className="p-2 text-center">0.80-0.85</td></tr><tr><td className="p-2 text-red-600 font-bold">Alto</td><td className="p-2 text-center">&gt; 1.0</td><td className="p-2 text-center">&gt; 0.85</td></tr></tbody></table></div>
                    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"><h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3><div className="space-y-3">{[{ name: 'Perfil de Lípidos', reason: 'La grasa abdominal se asocia con dislipidemia' }, { name: 'Glucosa e Insulina en Ayunas', reason: 'La obesidad abdominal causa resistencia a insulina' }, { name: 'Perfil Hepático', reason: 'La grasa visceral afecta al hígado (esteatosis)' }, { name: 'PCR Ultrasensible', reason: 'La grasa abdominal produce inflamación crónica' }].map(s => (<div key={s.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm"><span className="text-green-600 mt-1">✓</span><div><p className="font-semibold text-gray-800 text-sm">{s.name}</p><p className="text-gray-500 text-xs">{s.reason}</p></div></div>))}</div><Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800">Ver Estudios →</Link></div></div>);
            })()}
        </div>
                <StudyCTA 
                    title={`Alerta de Riesgo Metabólico`} 
                    description={`Un índice cintura-cadera tipo "manzana" eleva fuertemente el riesgo de isquemia. Realizar Análisis Completos de Lípidos descarta formaciones de placa coronaria oculta.`} 
                    actionText={`Checkup Mujer / Hombre`}
                    link={`/paquetes`} 
                    type="checkup" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía Antropométrica: Índice Cintura-Cadera (ICC)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Índice Cintura-Cadera es una métrica clínica base inmenso genérica a u Inmenso al a de a a o de al u O daño cardiovascular U de o en la a purísima U el distribución inmenso general de la O al U en inmenso u grasa u inmensurables O corporal inmenso (androide o u O ginecoide U U en genérico al e el O) para U O y O e estimar O de al genéricamente el U U riesgo O de síndrome metabólico el Inmenso inmenso inmensurable o u el la el inmenso.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios Severos Críticos</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/glucosa" className="text-blue-600 font-semibold hover:underline">Glucosa en Sangre</a> (Para monitorear o y de Riesgo O a Diabetes U e Inmensurables U genérico secundario U a Inmenso inmenso Inmensurables a u inmenso de grasa abdominal a inminente U a la O inmenso).</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"><button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"><span className="font-bold text-gray-900">📚 Índice Cintura-Cadera — Información Científica</span><span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span></button>{showInfo && (<div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4"><p>El <strong>Índice Cintura-Cadera (ICC)</strong> es un indicador de la distribución de grasa corporal. La grasa abdominal (visceral) se asocia con mayor riesgo de enfermedades cardiovasculares, diabetes y síndrome metabólico.</p><div className="bg-gray-50 rounded-xl p-4 text-center font-mono">ICC = Cintura (cm) / Cadera (cm)</div><p>La OMS define obesidad abdominal como ICC &gt; 0.90 en hombres y &gt; 0.85 en mujeres.</p><h4 className="font-bold text-gray-900">Fuentes</h4><ul className="list-disc list-inside text-xs text-gray-500"><li>WHO Expert Consultation (2008). Waist Circumference and Waist-Hip Ratio.</li><li>Yusuf, S. et al. (2005). Obesity and the risk of myocardial infarction. Lancet (INTERHEART study).</li></ul><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800"><strong>⚠️ Aviso:</strong> Este es un indicador complementario. Consulta a tu médico para una evaluación integral.</div></div>)}</div>
            
                <StudyCTA 
                    title={`Alerta de Riesgo Metabólico`} 
                    description={`Un índice cintura-cadera tipo "manzana" eleva fuertemente el riesgo de isquemia. Realizar Análisis Completos de Lípidos descarta formaciones de placa coronaria oculta.`} 
                    actionText={`Checkup Mujer / Hombre`}
                    link={`/paquetes`} 
                    type="checkup" 
                />
                <AdBanner variant="compact" className="mb-8" /></div>
    </main>);
}
