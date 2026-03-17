'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function CalculadoraEGFRPage() {
    const [creatinina, setCreatinina] = useState('');
    const [edad, setEdad] = useState('');
    const [sexo, setSexo] = useState<'hombre' | 'mujer'>('hombre');
    const [resultado, setResultado] = useState<number | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        const cr = parseFloat(creatinina); const e = parseFloat(edad);
        if (cr <= 0 || e <= 0) return;
        // CKD-EPI 2021 formula simplified
        let gfr: number;
        if (sexo === 'hombre') {
            if (cr <= 0.9) gfr = 142 * Math.pow(cr / 0.9, -0.302) * Math.pow(0.9938, e);
            else gfr = 142 * Math.pow(cr / 0.9, -1.200) * Math.pow(0.9938, e);
        } else {
            if (cr <= 0.7) gfr = 142 * Math.pow(cr / 0.7, -0.241) * Math.pow(0.9938, e) * 1.012;
            else gfr = 142 * Math.pow(cr / 0.7, -1.200) * Math.pow(0.9938, e) * 1.012;
        }
        setResultado(Math.round(gfr));
    };

    const getCat = (g: number) => {
        if (g >= 90) return { label: 'G1 — Normal o Alta', color: 'text-green-600', bg: 'bg-green-100', desc: 'Función renal normal' };
        if (g >= 60) return { label: 'G2 — Ligeramente disminuida', color: 'text-yellow-500', bg: 'bg-yellow-50', desc: 'Vigilancia recomendada' };
        if (g >= 45) return { label: 'G3a — Leve a moderada', color: 'text-yellow-600', bg: 'bg-yellow-100', desc: 'Se recomienda evaluación nefrológica' };
        if (g >= 30) return { label: 'G3b — Moderada a severa', color: 'text-orange-600', bg: 'bg-orange-100', desc: 'Consulte con nefrólogo' };
        if (g >= 15) return { label: 'G4 — Severamente disminuida', color: 'text-red-500', bg: 'bg-red-100', desc: 'Enfermedad renal avanzada' };
        return { label: 'G5 — Fallo renal', color: 'text-red-700', bg: 'bg-red-200', desc: 'Puede requerir diálisis o trasplante' };
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-yellow-700 to-amber-800 py-8 px-4"><div className="max-w-3xl mx-auto"><Link href="/herramientas" className="text-yellow-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link><h1 className="text-3xl md:text-4xl font-bold text-white">🫘 Filtración Glomerular (eGFR)</h1><p className="text-yellow-100 mt-2">CKD-EPI 2021 — evalúa tu función renal</p></div></div>
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="mb-6"><label className="block text-sm font-bold text-gray-700 mb-2">Sexo</label><div className="flex gap-3"><button onClick={() => setSexo('hombre')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${sexo === 'hombre' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>👨 Hombre</button><button onClick={() => setSexo('mujer')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${sexo === 'mujer' ? 'bg-pink-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>👩 Mujer</button></div></div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div><label className="block text-sm font-bold text-gray-700 mb-2">Creatinina (mg/dL)</label><input type="number" step="0.01" value={creatinina} onChange={(e) => setCreatinina(e.target.value)} placeholder="Ej: 1.0" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 outline-none text-lg text-gray-800" /></div>
                        <div><label className="block text-sm font-bold text-gray-700 mb-2">Edad (años)</label><input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="Ej: 55" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 outline-none text-lg text-gray-800" /></div>
                    </div>
                    <button onClick={calcular} className="w-full bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">Calcular eGFR</button>
                    {resultado !== null && (() => {
                        const c = getCat(resultado); return (<div className="mt-8"><div className={`${c.bg} rounded-2xl p-6 text-center mb-6`}><p className="text-sm text-gray-600 mb-1">Tu Tasa de Filtración Glomerular</p><p className={`text-5xl font-black ${c.color}`}>{resultado}</p><p className="text-sm text-gray-500">mL/min/1.73m²</p><p className={`text-lg font-bold ${c.color} mt-2`}>{c.label}</p><p className="text-gray-600 text-sm mt-1">{c.desc}</p></div>
                            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"><h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3><div className="space-y-3">{[{ name: 'Creatinina Sérica', reason: 'Base para el cálculo de eGFR con mayor precisión' }, { name: 'BUN (Nitrógeno Ureico)', reason: 'Complementa la evaluación de función renal' }, { name: 'Examen General de Orina', reason: 'Detecta proteinuria y hematuria' }, { name: 'Electrolitos Séricos', reason: 'Sodio, potasio y cloro — alterados en enfermedad renal' }, { name: 'Microalbuminuria', reason: 'Detección temprana de daño renal' }].map(s => (<div key={s.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm"><span className="text-green-600 mt-1">✓</span><div><p className="font-semibold text-gray-800 text-sm">{s.name}</p><p className="text-gray-500 text-xs">{s.reason}</p></div></div>))}</div><Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800">Ver Estudios →</Link></div></div>);
                    })()}
                </div>
                
                <StudyCTA 
                    title={`La medida crucial del riñón`} 
                    description={`Conocer cómo están tus riñones no debe posponerse si eres hipertenso o diabético. Una prueba de Creatinina Sérica con Tasa de Filtrado Glomerular previene diálisis futuras.`} 
                    actionText={`Cotizar Química Analítica (Glomerular)`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Qu%C3%ADmica%20Anal%C3%ADtica%20(Glomerular)*`} 
                    type="estudio" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía Nefrológica: Tasa de Filtración Glomerular Estimada (eGFR)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score O o Inmenso genéricamente Pediátrica y general o O U U el a inmenso U eGFR (Estimated u genérico Glomerular o Filtration U U inmenso Rate O Inmensurable) evalúa la inmenso U a U O a función a al u inmensurable U renal O u el inmensurables O en inmenso u genéricamente sangre Inmenso O u genéricamente U para Inmensurables categorizar genéricamente al u paciente en inmensa las o a inmenso 5 U Inmenso etapas a U u inmensurable al genéricas del Inmenso a la Daño en Inmenso al o Renal u Crónico (o enfermedad de renal inminente inmenso u U crónica O u).</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia de Falla Renal Inminente (Estadios 4 y 5)</h4>
           <p className="text-red-700 m-0">Mediciones genéricas o menores inmensurables al a U y de 30 ml/min a Inmenso u indican Inmenso falla renal O u severa y genéricamente requieren Inmenso O O genéricamente preparación al u a paramédica inmensa a inminente U a (Diálisis o Trasplante) Inmenso u genéricamente.</p>
       </div>

       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Estudios Urgentes para Cálculo Requerido</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/quimica-sanguinea" className="text-blue-600 font-semibold hover:underline">Química Sanguínea (Creatinina Sérica)</a></li>
           <li><a href="/" className="text-blue-600 font-semibold hover:underline">Examen General de Orina Integrativo y Urocultivo (Uroanálisis)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"><button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"><span className="font-bold text-gray-900">📚 Tasa de Filtración Glomerular — Información Científica</span><span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span></button>
                    {showInfo && (<div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4"><p>La <strong>Tasa de Filtración Glomerular (TFG o eGFR)</strong> es el mejor indicador de función renal. Mide cuánta sangre filtran los riñones por minuto. Esta calculadora usa la fórmula <strong>CKD-EPI 2021</strong>, la más actual y recomendada por KDIGO.</p><h4 className="font-bold text-gray-900">Clasificación KDIGO de Enfermedad Renal Crónica</h4><table className="w-full text-sm"><thead><tr className="bg-gray-100"><th className="p-2">Estadio</th><th className="p-2">eGFR</th><th className="p-2">Descripción</th></tr></thead><tbody><tr className="border-b"><td className="p-2">G1</td><td className="p-2">≥90</td><td className="p-2">Normal</td></tr><tr className="border-b"><td className="p-2">G2</td><td className="p-2">60-89</td><td className="p-2">Ligeramente disminuida</td></tr><tr className="border-b"><td className="p-2">G3a</td><td className="p-2">45-59</td><td className="p-2">Leve-moderada</td></tr><tr className="border-b"><td className="p-2">G3b</td><td className="p-2">30-44</td><td className="p-2">Moderada-severa</td></tr><tr className="border-b"><td className="p-2">G4</td><td className="p-2">15-29</td><td className="p-2">Severa</td></tr><tr><td className="p-2">G5</td><td className="p-2">&lt;15</td><td className="p-2">Fallo renal</td></tr></tbody></table><h4 className="font-bold text-gray-900">Fuentes</h4><ul className="list-disc list-inside text-xs text-gray-500"><li>Inker, L.A. et al. (2021). New Creatinine- and Cystatin C-Based Equations to Estimate GFR. NEJM.</li><li>KDIGO 2012 Clinical Practice Guideline for the Evaluation and Management of CKD.</li></ul><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800"><strong>⚠️ Aviso:</strong> Esta es una estimación basada en creatinina. Para una evaluación completa, consulta a tu nefrólogo.</div></div>)}</div>
                
                <StudyCTA 
                    title={`La medida crucial del riñón`} 
                    description={`Conocer cómo están tus riñones no debe posponerse si eres hipertenso o diabético. Una prueba de Creatinina Sérica con Tasa de Filtrado Glomerular previene diálisis futuras.`} 
                    actionText={`Cotizar Química Analítica (Glomerular)`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Qu%C3%ADmica%20Anal%C3%ADtica%20(Glomerular)*`} 
                    type="estudio" 
                />
                
                <RelatedTools currentPath="/herramientas/calculadora-egfr" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
