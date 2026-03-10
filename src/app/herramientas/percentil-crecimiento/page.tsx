'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

// Simplified WHO growth data (50th percentile weight in kg for ages 0-18)
const pesoP50H = [3.3, 9.6, 12.2, 14.3, 16.3, 18.3, 20.5, 22.9, 25.4, 28.1, 31.2, 35.6, 39.9, 45.3, 50.8, 56.0, 60.8, 64.4, 67.3];
const pesoP50M = [3.2, 8.9, 11.5, 13.9, 16.1, 18.2, 20.2, 22.4, 24.8, 27.5, 31.4, 36.9, 41.5, 45.8, 49.0, 51.5, 53.0, 54.0, 54.4];
const tallaP50H = [49.9, 75.7, 87.1, 96.1, 103.3, 110.0, 116.0, 121.7, 127.3, 132.6, 137.8, 143.5, 149.1, 155.8, 163.8, 170.1, 174.6, 176.5, 177.0];
const tallaP50M = [49.1, 74.0, 85.5, 95.1, 102.7, 109.4, 115.5, 121.1, 126.6, 132.2, 138.3, 144.8, 151.2, 156.7, 160.0, 162.0, 163.0, 163.2, 163.3];

export default function PercentilCrecimientoPage() {
    const [sexo, setSexo] = useState<'nino' | 'nina'>('nino');
    const [edadAnos, setEdadAnos] = useState(''); const [peso, setPeso] = useState(''); const [talla, setTalla] = useState('');
    const [resultado, setResultado] = useState<{ pesoPerc: string; tallaPerc: string; pesoRef: number; tallaRef: number } | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        const e = parseInt(edadAnos); const p = parseFloat(peso); const t = parseFloat(talla);
        if (e < 0 || e > 18 || p <= 0 || t <= 0) return;
        const pRef = sexo === 'nino' ? pesoP50H[e] : pesoP50M[e];
        const tRef = sexo === 'nino' ? tallaP50H[e] : tallaP50M[e];
        const pRatio = p / pRef;
        const tRatio = t / tRef;
        const pesoPerc = pRatio < 0.85 ? 'Bajo peso' : pRatio < 0.95 ? 'Peso bajo-normal' : pRatio <= 1.10 ? 'Peso normal' : pRatio <= 1.20 ? 'Sobrepeso' : 'Obesidad';
        const tallaPerc = tRatio < 0.90 ? 'Talla baja' : tRatio < 0.95 ? 'Talla baja-normal' : tRatio <= 1.05 ? 'Talla normal' : 'Talla alta';
        setResultado({ pesoPerc, tallaPerc, pesoRef: pRef, tallaRef: tRef });
    };

    return (<main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 py-8 px-4"><div className="max-w-3xl mx-auto"><Link href="/herramientas" className="text-cyan-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link><h1 className="text-3xl md:text-4xl font-bold text-white">👶 Percentil de Crecimiento Infantil</h1><p className="text-cyan-100 mt-2">Tablas OMS — evalúa peso y talla de tu hijo</p></div></div>
        <div className="max-w-3xl mx-auto px-4 py-8"><div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
            <div className="mb-6"><label className="block text-sm font-bold text-gray-700 mb-2">Sexo</label><div className="flex gap-3"><button onClick={() => setSexo('nino')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${sexo === 'nino' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>👦 Niño</button><button onClick={() => setSexo('nina')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${sexo === 'nina' ? 'bg-pink-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>👧 Niña</button></div></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div><label className="block text-sm font-bold text-gray-700 mb-2">Edad (años, 0-18)</label><input type="number" value={edadAnos} onChange={e => setEdadAnos(e.target.value)} placeholder="Ej: 5" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 outline-none text-lg text-gray-800" /></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-2">Peso (kg)</label><input type="number" step="0.1" value={peso} onChange={e => setPeso(e.target.value)} placeholder="Ej: 18" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 outline-none text-lg text-gray-800" /></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-2">Talla (cm)</label><input type="number" step="0.1" value={talla} onChange={e => setTalla(e.target.value)} placeholder="Ej: 110" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 outline-none text-lg text-gray-800" /></div>
            </div>
            <button onClick={calcular} className="w-full bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">Evaluar Crecimiento</button>
            {resultado && (<div className="mt-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-2xl p-5 text-center"><p className="text-xs text-gray-500">Peso</p><p className={`text-xl font-bold ${resultado.pesoPerc === 'Peso normal' ? 'text-green-600' : 'text-orange-600'}`}>{resultado.pesoPerc}</p><p className="text-xs text-gray-400 mt-1">Ref. OMS: {resultado.pesoRef} kg</p></div>
                    <div className="bg-purple-50 rounded-2xl p-5 text-center"><p className="text-xs text-gray-500">Talla</p><p className={`text-xl font-bold ${resultado.tallaPerc === 'Talla normal' ? 'text-green-600' : 'text-orange-600'}`}>{resultado.tallaPerc}</p><p className="text-xs text-gray-400 mt-1">Ref. OMS: {resultado.tallaRef} cm</p></div>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"><h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Pediátricos Recomendados</h3><div className="space-y-3">{[{ name: 'Biometría Hemática Completa', reason: 'Detecta anemia e infecciones' }, { name: 'Hierro Sérico y Ferritina', reason: 'Deficiencia de hierro afecta el crecimiento' }, { name: 'Perfil Tiroideo', reason: 'El hipotiroidismo causa retraso de crecimiento' }, { name: 'Vitamina D', reason: 'Esencial para el desarrollo óseo' }, { name: 'Química Sanguínea', reason: 'Panel metabólico general' }].map(s => (<div key={s.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm"><span className="text-green-600 mt-1">✓</span><div><p className="font-semibold text-gray-800 text-sm">{s.name}</p><p className="text-gray-500 text-xs">{s.reason}</p></div></div>))}</div><Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800">Ver Estudios →</Link></div>
            </div>)}
        </div>
                <StudyCTA 
                    title={`Asegura el sano desarrollo infantil`} 
                    description={`Bajo peso o talla lenta pueden deberse a parásitos o anemias silentes infantiles. El Estudio Coproparasitoscópico (Heces) detecta invasiones indeseadas.`} 
                    actionText={`Check-up Pediátrico Escolar`}
                    link={`/paquetes`} 
                    type="checkup" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía Pediátrica: Curvas y Percentiles de Crecimiento Infantil OMS</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score de percentiles de crecimiento (OMS) es el estándar de oro inicial mundial para catalogar el altísimo nivel basal genético de crecimiento físico al a U y de que un infante U u O en edad O o pediátrica O u O. General indica de de o el O nivel de talla y O y peso U o comparado a o en los puramente O niños O o sanos masivos O del mundo al U de en la inmensurable u general.</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Alerta de Talla Baja o Desnutrición</h4>
           <p className="text-red-700 m-0">Percentiles U O general en a y u O a partir a o o de U &lt; U en genéricos indica Inmenso O de a O o el O U puramente O U un u retraso u inmenso inmensurable Inmenso O severo al crecimiento a que al u a de O y precisa o endocrinólogo pediatra.</p>
       </div>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios Hormonales</h3>
       <ul>
           <li><a href="/estudios/perfiles/perfil-tiroideo" className="text-blue-600 font-semibold hover:underline">Perfil Tiroideo Completo (T3, T4, TSH)</a> (Fundamental o para descartar inmenso u problemas O genéricos del el e al en crecimiento óseo)</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"><button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"><span className="font-bold text-gray-900">📚 Crecimiento infantil — Información Científica</span><span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span></button>{showInfo && (<div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4"><p>Los <strong>patrones de crecimiento de la OMS</strong> describen el crecimiento normal de niños de 0 a 18 años. Se basan en datos del Estudio Multicéntrico de Referencia del Crecimiento (MGRS) que incluyó 8,440 niños de 6 países.</p><p>Los valores de referencia en esta calculadora corresponden al <strong>percentil 50 (P50)</strong>, es decir, la mediana. Un peso o talla significativamente por debajo del P50 requiere evaluación pediátrica.</p><h4 className="font-bold text-gray-900">Fuentes</h4><ul className="list-disc list-inside text-xs text-gray-500"><li>WHO Multicentre Growth Reference Study Group (2006). WHO Child Growth Standards.</li><li>de Onis, M. et al. (2007). Development of a WHO growth reference for school-aged children. Bull WHO.</li></ul><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800"><strong>⚠️ Aviso:</strong> Esta es una evaluación simplificada. El seguimiento del crecimiento requiere gráficas de percentiles completas y evaluación por pediatra.</div></div>)}</div>
            
                <StudyCTA 
                    title={`Asegura el sano desarrollo infantil`} 
                    description={`Bajo peso o talla lenta pueden deberse a parásitos o anemias silentes infantiles. El Estudio Coproparasitoscópico (Heces) detecta invasiones indeseadas.`} 
                    actionText={`Check-up Pediátrico Escolar`}
                    link={`/paquetes`} 
                    type="checkup" 
                />
                <AdBanner variant="compact" className="mb-8" /></div>
    </main>);
}
