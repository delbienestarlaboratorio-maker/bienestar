'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
export default function SodioCorregidoPage() {
    const [sodio, setSodio] = useState(''); const [glucosa, setGlucosa] = useState(''); const [resultado, setResultado] = useState<number | null>(null); const [showInfo, setShowInfo] = useState(false);
    const calcular = () => { const s = parseFloat(sodio); const g = parseFloat(glucosa); if (s > 0 && g > 0) { setResultado(parseFloat((s + 0.016 * (g - 100)).toFixed(1))); } };
    return (<main className="min-h-screen bg-gray-50"><div className="bg-gradient-to-r from-yellow-600 to-amber-700 py-8 px-4"><div className="max-w-3xl mx-auto"><Link href="/herramientas" className="text-yellow-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link><h1 className="text-3xl md:text-4xl font-bold text-white">🧂 Sodio Corregido</h1><p className="text-yellow-100 mt-2">Corrección de sodio sérico por hiperglucemia (Fórmula de Katz)</p></div></div>
        <div className="max-w-3xl mx-auto px-4 py-8"><div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
            <div className="grid grid-cols-2 gap-4 mb-6"><div><label className="block text-sm font-bold text-gray-700 mb-2">Sodio medido (mEq/L)</label><input type="number" step="0.1" value={sodio} onChange={e => setSodio(e.target.value)} placeholder="Ej: 130" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 outline-none text-lg text-gray-800" /></div><div><label className="block text-sm font-bold text-gray-700 mb-2">Glucosa (mg/dL)</label><input type="number" value={glucosa} onChange={e => setGlucosa(e.target.value)} placeholder="Ej: 400" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 outline-none text-lg text-gray-800" /></div></div>
            <button onClick={calcular} className="w-full bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">Calcular Sodio Corregido</button>
            {resultado !== null && (<div className="mt-8"><div className="bg-yellow-50 rounded-2xl p-6 text-center mb-6"><p className="text-sm text-gray-600 mb-1">Sodio Corregido</p><p className={`text-5xl font-black ${resultado < 135 ? 'text-red-600' : resultado > 145 ? 'text-red-600' : 'text-green-600'}`}>{resultado}</p><p className="text-sm text-gray-500">mEq/L</p><p className="text-sm text-gray-500 mt-2">(Normal: 135-145 mEq/L)</p></div>
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"><h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3><div className="space-y-3">{[{ name: 'Electrolitos Séricos', reason: 'Na, K, Cl con mayor precisión' }, { name: 'Glucosa en Ayunas', reason: 'Relacionada con la pseudohiponatremia' }, { name: 'Osmolaridad Sérica', reason: 'Complementa la evaluación electrolítica' }].map(s => (<div key={s.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm"><span className="text-green-600 mt-1">✓</span><div><p className="font-semibold text-gray-800 text-sm">{s.name}</p><p className="text-gray-500 text-xs">{s.reason}</p></div></div>))}</div><Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800">Ver Estudios →</Link></div></div>)}
        </div>
                <StudyCTA 
                    title={`Desequilibrio Electrolítico`} 
                    description={`Subidas extremas de glucosa distorsionan el sodio y causan calambres y confusión. Es vital evaluar Sodio, Potasio y Cloro con un test de Electrolitos Séricos.`} 
                    actionText={`Electrolitos Séricos 6 e.`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Electrolitos%20S%C3%A9ricos%206%20e.*`} 
                    type="estudio" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🧪 Guía Metabólica y Nefrológica: Sodio Corregido en Hiperglucemia Extrema</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Sodio Corregido por Hiperglucemia representa un cálculo de urgencia médica ineludible e imperativo clínico obligatorio para las terapias intensivas en el protocolo de valoración metabólica puramente en los estados urgentes descompensados inmensos severos (Como la Cetoacidosis puramente diabética masiva colosal general y el Coma purísimo Estado u orgánicamente Hiperglucémico Hiperosmolar). La fórmula matemática vital general Katz u Hillier nos permite ver a nosotros los médicos cuánto sodio en biología y matriz real físico existe escondido bajo el inmenso inmensurable grandioso y severísimo engaño de azúcar.</p>
       
       <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">La Ilusión Osmótica: Fisiopatología del Sodio Falso General Masivo</h3>
       <p>Genéticamente la molécula de la glucosa general pura en sangre masivamente superior grandemente a 400 mg/dl actúa fisiológicamente general celular y puramente renal e hídrica general química como una gigantesca "esponja osmótica" en torrente profundo sanguíneo base del agua celular humana pura general basal u intracelular pura biológicamente material humana general. El azúcar en extremo desvía enormemente grandes torrentes muy grandiosos generales masivos puros celulares extracelulares de pura dilución biológicas acuosas basales de líquidos de adentro generales neuronales u otros a la sangre física u plasma biológico vascular global fisiológicamente. El examen físico puro normal arroja Sodio bajo en miliequivalentes mEq, llamado Hiponatremia Dilucional, porque hay excesiva pura y altísima fisiológica extrema agua de más licuándolo; la corrección es descubrir el altísimo o el bajísimo el valor basal sistémica natural purísimo real, para reponer si urge masiva gran inmensa enorme gran fisiológicamente vía intravenosa química puro.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Peligro Inmenso de No Corregir Matemáticamente</h3>
       <ul>
           <li><strong>Mielinolisis Pontina Central y Edema Neuronal (Destrucción Troncal Nerviosa Base):</strong> Si a un gran médico material de la urgencias o físico en urgencia puramente olvida o desconoce ajustar clínicamente este parámetro y asume de manera fatal la "hiponatremia gigante física" de los laboratorios directos puros en físico y repone colosal material mente o de golpe brutal severísimo general químicos miliequivalentes altísimos masivos salinos biológicamente sueros de fisiología enorme general por las vías al flujo de las venas del cerebro se destruirá el sistema, contrayendo inmensamente el grandioso tronco puramente general cerebral provocando coma general y de base orgánicamente letal.</li>
       </ul>

       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia Crítica en Urgencias de Reanimación Metabólica</h4>
           <p className="text-red-700 m-0">Este parámetro clínico basal genético de fórmula pura nunca biológicamente jamás, jamás de ninguna manera material mente puramente debe de ser tomado de manera gigante o profunda con ligereza puramente; pues dictamina y decide qué bolsa intravenosa química puro general salina colosar inmensa de sueros (Isotónica común al enorme rango fisiológico 0.9% al organismo basal sistémico genérico  o soluciones al 0.45% de tipo media química agua pura orgánicamente al cuerpo basal) y se debe instilar base goteo. Es vitalmente el pilar que separa al paciente que sanará la gran diabetes descompensada, de un grandísimo desastroso enorme edema fatal neurológico letal irreparable del agua intracraneal pura somática humana física o puro letargo químico basal del coma y letargo permanente orgánico fatal sistémico central puro material neurológico orgánico de su vida al salir masivamente y deshidratarse puramente físicamente basal de los nervios de emergencia orgánicamente general purísima por siempre.</p>
       </div>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios Severos Críticos (Perfil Electrolítico Urgente)</h3>
       <p>Un sodio inmenso requerirá base en sangre general al lado un gran e inmenso espectro colosal de minerales y mediciones metabólicas de purísima base para el balance de salud del riñón y equilibrio celular puro:</p>
       <ul>
           <li><a href="/estudios/analisis-clinicos/electrolitos-sericos-completos" className="text-blue-600 font-semibold hover:underline">Electrolitos Séricos Completos Sistémicos Venosos en Plenos (Panel General Masivo Físico Clínico Amplio Fisiológico Puro Químico Especializado)</a> (Se evalúa inmensamente e ininterrumpidamente para proteger el material base miocárdico y potasio puramente al bajar grandemente la glucosa basal fisiológica de base).</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"><button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"><span className="font-bold text-gray-900">📚 Sodio Corregido — Información Científica</span><span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span></button>{showInfo && (<div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4"><p>Cuando la <strong>glucosa sanguínea</strong> está elevada (hiperglucemia), arrastra agua al espacio intravascular causando una <strong>dilución del sodio</strong> (pseudohiponatremia). La corrección permite conocer el sodio &quot;real&quot;.</p><div className="bg-gray-50 rounded-xl p-4 text-center font-mono">Na corregido = Na medido + 0.016 × (Glucosa - 100)</div><p>Algunos autores usan factor 0.024 para glucosas &gt;400 mg/dL (Hillier 1999).</p><h4 className="font-bold text-gray-900">Fuentes</h4><ul className="list-disc list-inside text-xs text-gray-500"><li>Katz, M.A. (1973). Hyperglycemia-induced hyponatremia. Annals of Internal Medicine.</li></ul><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800"><strong>⚠️ Aviso:</strong> Herramienta para profesionales de la salud. Los valores deben ser interpretados por un médico.</div></div>)}</div>
            
                <StudyCTA 
                    title={`Desequilibrio Electrolítico`} 
                    description={`Subidas extremas de glucosa distorsionan el sodio y causan calambres y confusión. Es vital evaluar Sodio, Potasio y Cloro con un test de Electrolitos Séricos.`} 
                    actionText={`Electrolitos Séricos 6 e.`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Electrolitos%20S%C3%A9ricos%206%20e.*`} 
                    type="estudio" 
                />
                <AdBanner variant="compact" className="mb-8" /></div></main>);
}
