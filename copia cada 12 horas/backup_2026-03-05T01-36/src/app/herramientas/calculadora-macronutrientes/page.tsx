'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function CalculadoraMacronutrientesPage() {
    const [calorias, setCalorias] = useState('');
    const [objetivo, setObjetivo] = useState('mantener');
    const [resultado, setResultado] = useState<{ carbs: number; protein: number; fat: number; carbsG: number; proteinG: number; fatG: number } | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        let cal = parseFloat(calorias);
        if (cal <= 0) return;
        let carbsPct: number, protPct: number, fatPct: number;
        if (objetivo === 'perder') { carbsPct = 40; protPct = 35; fatPct = 25; }
        else if (objetivo === 'ganar') { carbsPct = 50; protPct = 25; fatPct = 25; }
        else if (objetivo === 'keto') { carbsPct = 10; protPct = 25; fatPct = 65; }
        else { carbsPct = 50; protPct = 25; fatPct = 25; }
        setResultado({
            carbs: carbsPct, protein: protPct, fat: fatPct,
            carbsG: Math.round((cal * carbsPct / 100) / 4),
            proteinG: Math.round((cal * protPct / 100) / 4),
            fatG: Math.round((cal * fatPct / 100) / 9),
        });
    };

    return (<main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-lime-700 to-green-800 py-8 px-4"><div className="max-w-3xl mx-auto"><Link href="/herramientas" className="text-lime-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link><h1 className="text-3xl md:text-4xl font-bold text-white">🥗 Calculadora de Macronutrientes</h1><p className="text-lime-100 mt-2">Distribución de carbohidratos, proteínas y grasas según tu objetivo</p></div></div>
        <div className="max-w-3xl mx-auto px-4 py-8"><div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
            <div className="mb-6"><label className="block text-sm font-bold text-gray-700 mb-2">Calorías diarias (usa nuestra calculadora TDEE)</label><input type="number" value={calorias} onChange={e => setCalorias(e.target.value)} placeholder="Ej: 2000" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-lime-500 outline-none text-lg text-gray-800" /></div>
            <div className="mb-6"><label className="block text-sm font-bold text-gray-700 mb-2">Objetivo</label><div className="grid grid-cols-2 md:grid-cols-4 gap-2">{[{ v: 'mantener', l: '⚖️ Mantener' }, { v: 'perder', l: '🔻 Perder grasa' }, { v: 'ganar', l: '💪 Ganar músculo' }, { v: 'keto', l: '🥑 Keto' }].map(o => (<button key={o.v} onClick={() => setObjetivo(o.v)} className={`p-3 rounded-xl text-xs font-bold transition-all ${objetivo === o.v ? 'bg-lime-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{o.l}</button>))}</div></div>
            <button onClick={calcular} className="w-full bg-lime-700 hover:bg-lime-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">Calcular Macros</button>
            {resultado && (<div className="mt-8">
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-2xl p-5 text-center border-2 border-blue-200"><p className="text-xs text-gray-500">🍞 Carbohidratos</p><p className="text-3xl font-bold text-blue-700">{resultado.carbsG}g</p><p className="text-xs text-blue-500">{resultado.carbs}%</p></div>
                    <div className="bg-red-50 rounded-2xl p-5 text-center border-2 border-red-200"><p className="text-xs text-gray-500">🥩 Proteínas</p><p className="text-3xl font-bold text-red-700">{resultado.proteinG}g</p><p className="text-xs text-red-500">{resultado.protein}%</p></div>
                    <div className="bg-yellow-50 rounded-2xl p-5 text-center border-2 border-yellow-200"><p className="text-xs text-gray-500">🥑 Grasas</p><p className="text-3xl font-bold text-yellow-700">{resultado.fatG}g</p><p className="text-xs text-yellow-500">{resultado.fat}%</p></div>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"><h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3><div className="space-y-3">{[{ name: 'Química Sanguínea 27 elementos', reason: 'Panel metabólico completo para tu plan nutricional' }, { name: 'Perfil de Lípidos', reason: 'Importante si sigues dieta alta en grasas (keto)' }, { name: 'Glucosa e Insulina', reason: 'Cómo tu cuerpo procesa los carbohidratos' }, { name: 'Albúmina y Proteínas Totales', reason: 'Evalúa si tu ingesta proteica es adecuada' }].map(s => (<div key={s.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm"><span className="text-green-600 mt-1">✓</span><div><p className="font-semibold text-gray-800 text-sm">{s.name}</p><p className="text-gray-500 text-xs">{s.reason}</p></div></div>))}</div><Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800">Ver Estudios →</Link></div>
            </div>)}
        </div>
                <StudyCTA 
                    title={`Maximiza el desempeño deportivo`} 
                    description={`Modificar drásticamente tus "macros" impacta el ácido úrico y urea (por exceso de proteína). Un chequeo trimestral previene daños a los riñones.`} 
                    actionText={`Cotizar Urea y Creatinina`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Urea%20y%20Creatinina*`} 
                    type="estudio" 
                />
                <AdBanner variant="horizontal" className="mb-8" />
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"><button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"><span className="font-bold text-gray-900">📚 Macronutrientes — Información Científica</span><span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span></button>{showInfo && (<div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4"><p>Los <strong>macronutrientes</strong> son los nutrientes que el cuerpo necesita en grandes cantidades: carbohidratos (4 kcal/g), proteínas (4 kcal/g) y grasas (9 kcal/g).</p><h4 className="font-bold text-gray-900">Distribuciones recomendadas</h4><table className="w-full text-sm"><thead><tr className="bg-gray-100"><th className="p-2 text-left">Objetivo</th><th className="p-2">Carbos</th><th className="p-2">Proteínas</th><th className="p-2">Grasas</th></tr></thead><tbody><tr className="border-b"><td className="p-2">Mantener</td><td className="p-2 text-center">50%</td><td className="p-2 text-center">25%</td><td className="p-2 text-center">25%</td></tr><tr className="border-b"><td className="p-2">Perder grasa</td><td className="p-2 text-center">40%</td><td className="p-2 text-center">35%</td><td className="p-2 text-center">25%</td></tr><tr className="border-b"><td className="p-2">Ganar masa</td><td className="p-2 text-center">50%</td><td className="p-2 text-center">25%</td><td className="p-2 text-center">25%</td></tr><tr><td className="p-2">Keto</td><td className="p-2 text-center">10%</td><td className="p-2 text-center">25%</td><td className="p-2 text-center">65%</td></tr></tbody></table><h4 className="font-bold text-gray-900">Fuentes</h4><ul className="list-disc list-inside text-xs text-gray-500"><li>Dietary Guidelines for Americans. U.S. Department of Health and Human Services.</li><li>International Society of Sports Nutrition position stand. JISSN. 2017.</li></ul><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800"><strong>⚠️ Aviso:</strong> Consulta a un nutriólogo para un plan personalizado.</div></div>)}</div>
            
                <StudyCTA 
                    title={`Maximiza el desempeño deportivo`} 
                    description={`Modificar drásticamente tus "macros" impacta el ácido úrico y urea (por exceso de proteína). Un chequeo trimestral previene daños a los riñones.`} 
                    actionText={`Cotizar Urea y Creatinina`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Urea%20y%20Creatinina*`} 
                    type="estudio" 
                />
                <AdBanner variant="compact" className="mb-8" /></div>
    </main>);
}
