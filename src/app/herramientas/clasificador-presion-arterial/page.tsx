'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ClasificadorPresionArterialPage() {
    const [sistolica, setSistolica] = useState('');
    const [diastolica, setDiastolica] = useState('');
    const [resultado, setResultado] = useState<{ label: string; color: string; bg: string; desc: string } | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        const s = parseFloat(sistolica); const d = parseFloat(diastolica);
        if (s <= 0 || d <= 0) return;
        if (s >= 180 || d >= 120) setResultado({ label: 'Crisis Hipertensiva', color: 'text-red-700', bg: 'bg-red-200', desc: 'Busca atención médica inmediata. Esto puede ser una emergencia.' });
        else if (s >= 140 || d >= 90) setResultado({ label: 'Hipertensión Grado 2', color: 'text-red-600', bg: 'bg-red-100', desc: 'Se recomienda tratamiento y cambios en el estilo de vida. Consulta a tu médico.' });
        else if (s >= 130 || d >= 80) setResultado({ label: 'Hipertensión Grado 1', color: 'text-orange-600', bg: 'bg-orange-100', desc: 'Tu presión está elevada. Se recomiendan cambios en el estilo de vida y evaluación médica.' });
        else if (s >= 120) setResultado({ label: 'Presión Elevada', color: 'text-yellow-600', bg: 'bg-yellow-100', desc: 'Tu presión está por encima de lo normal. Vigila tu alimentación y ejercicio.' });
        else setResultado({ label: 'Normal', color: 'text-green-600', bg: 'bg-green-100', desc: '¡Excelente! Tu presión arterial está en un rango saludable.' });
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-rose-700 to-red-800 py-8 px-4"><div className="max-w-3xl mx-auto"><Link href="/herramientas" className="text-rose-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link><h1 className="text-3xl md:text-4xl font-bold text-white">💓 Clasificador de Presión Arterial</h1><p className="text-rose-100 mt-2">Clasificación según la American Heart Association (AHA)</p></div></div>
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div><label className="block text-sm font-bold text-gray-700 mb-2">Sistólica (mmHg)</label><input type="number" value={sistolica} onChange={(e) => setSistolica(e.target.value)} placeholder="Ej: 120" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none text-lg text-gray-800" /><p className="text-xs text-gray-400 mt-1">Número de arriba</p></div>
                        <div><label className="block text-sm font-bold text-gray-700 mb-2">Diastólica (mmHg)</label><input type="number" value={diastolica} onChange={(e) => setDiastolica(e.target.value)} placeholder="Ej: 80" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none text-lg text-gray-800" /><p className="text-xs text-gray-400 mt-1">Número de abajo</p></div>
                    </div>
                    <button onClick={calcular} className="w-full bg-rose-700 hover:bg-rose-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">Clasificar Presión Arterial</button>
                    {resultado && (<div className="mt-8"><div className={`${resultado.bg} rounded-2xl p-6 text-center mb-6`}><p className="text-sm text-gray-600 mb-1">Tu presión {sistolica}/{diastolica} mmHg es</p><p className={`text-3xl font-black ${resultado.color}`}>{resultado.label}</p><p className="text-gray-600 text-sm mt-2">{resultado.desc}</p></div>
                        <div className="mb-6"><table className="w-full text-sm"><thead><tr className="bg-gray-100"><th className="p-2 text-left">Categoría</th><th className="p-2">Sistólica</th><th className="p-2">Diastólica</th></tr></thead><tbody>
                            <tr className="border-b"><td className="p-2 text-green-600 font-bold">Normal</td><td className="p-2 text-center">&lt; 120</td><td className="p-2 text-center">&lt; 80</td></tr>
                            <tr className="border-b"><td className="p-2 text-yellow-600 font-bold">Elevada</td><td className="p-2 text-center">120-129</td><td className="p-2 text-center">&lt; 80</td></tr>
                            <tr className="border-b"><td className="p-2 text-orange-600 font-bold">Hipertensión 1</td><td className="p-2 text-center">130-139</td><td className="p-2 text-center">80-89</td></tr>
                            <tr className="border-b"><td className="p-2 text-red-600 font-bold">Hipertensión 2</td><td className="p-2 text-center">≥ 140</td><td className="p-2 text-center">≥ 90</td></tr>
                            <tr><td className="p-2 text-red-700 font-bold">Crisis</td><td className="p-2 text-center">&gt; 180</td><td className="p-2 text-center">&gt; 120</td></tr>
                        </tbody></table></div>
                        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"><h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3><div className="space-y-3">{[{ name: 'Creatinina y BUN', reason: 'Evalúa daño renal por hipertensión' }, { name: 'Electrolitos Séricos', reason: 'Sodio y potasio afectan la presión arterial' }, { name: 'EGO (Examen General de Orina)', reason: 'Detecta proteinuria por daño hipertensivo' }, { name: 'Perfil de Lípidos', reason: 'Hipertensión + colesterol alto multiplican el riesgo' }].map(s => (<div key={s.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm"><span className="text-green-600 mt-1">✓</span><div><p className="font-semibold text-gray-800 text-sm">{s.name}</p><p className="text-gray-500 text-xs">{s.reason}</p></div></div>))}</div><Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800">Ver Estudios →</Link></div></div>)}
                </div>
                
                <StudyCTA 
                    title={`Monitoreo de Hipertensión`} 
                    description={`La presión alta daña los riñones y el corazón a lo largo de los años. Una Química Analítica y un Electrocardiograma son esenciales en el paciente hipertenso.`} 
                    actionText={`Estudios de Hipertensión`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Estudios%20de%20Hipertensi%C3%B3n*`} 
                    type="estudio" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🫀 Guía Cardiológica y Riesgo: Clasificación de la Presión Arterial (AHA)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Clasificador Inmenso U u Score de O o inmenso Presión general Inmensurables Arterial y O u a inmenso Inmenso u genéricamente Pediátrica y general o O U U el a inmenso U algoritmo genérico u emitido por American Heart Association evalúa a Inmenso a la inmensurable severidad de la o de y genérico hipertensión U U inmenso en Inmensurable O pacientes en u niveles inmenso U u de Riesgo Inmensurables al Cardiovascular Inmenso de u genérico.</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia de Crisis Hipertensiva</h4>
           <p className="text-red-700 m-0">Mediciones inmenso inmensurables genéricas o mayores inmensurables al a U y 180 sistólicas a Inmenso u son clasificadas Inmenso O u como Urgencias o Emergencias genéricamente O requieren genéricamente ingreso al u a la inmensa a UCI cardiología inminente inmenso.</p>
       </div>

       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Estudios de Laboratorio Urgentes Químicos</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/quimica-sanguinea" className="text-blue-600 font-semibold hover:underline">Química Sanguínea Total (Creatinina y BUN)</a> (Para evaluar si la presión alta dañó los riñones de forma crónica inmensurable genérica U inmenso u genérico).</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"><button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"><span className="font-bold text-gray-900">📚 ¿Qué es la presión arterial? — Información Científica</span><span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span></button>
                    {showInfo && (<div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4"><p>La <strong>presión arterial</strong> es la fuerza que ejerce la sangre contra las paredes de las arterias. Se mide con dos valores: <strong>sistólica</strong> (cuando el corazón late) y <strong>diastólica</strong> (entre latidos).</p><p>La hipertensión es conocida como el &quot;asesino silencioso&quot; porque raramente causa síntomas pero puede llevar a enfermedades cardíacas, ACV, insuficiencia renal y daño retiniano.</p><h4 className="font-bold text-gray-900">Fuentes</h4><ul className="list-disc list-inside text-xs text-gray-500"><li>Whelton, P.K. et al. (2018). ACC/AHA Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure.</li><li>American Heart Association. Understanding Blood Pressure Readings.</li></ul><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800"><strong>⚠️ Aviso:</strong> Una sola lectura no es diagnóstica. La hipertensión se diagnostica con múltiples mediciones. Consulta a tu médico.</div></div>)}</div>
                
                <StudyCTA 
                    title={`Monitoreo de Hipertensión`} 
                    description={`La presión alta daña los riñones y el corazón a lo largo de los años. Una Química Analítica y un Electrocardiograma son esenciales en el paciente hipertenso.`} 
                    actionText={`Estudios de Hipertensión`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Estudios%20de%20Hipertensi%C3%B3n*`} 
                    type="estudio" 
                />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
