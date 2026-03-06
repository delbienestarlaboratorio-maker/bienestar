'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function BrechaAnionicaGapPage() {
    const [na, setNa] = useState<string>('');
    const [cl, setCl] = useState<string>('');
    const [hco3, setHco3] = useState<string>('');
    const [alb, setAlb] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const n=parseFloat(na);const c=parseFloat(cl);const h=parseFloat(hco3);let a=parseFloat(alb);if(!n||!c||!h)return;if(!a)a=4.0;const gap=n-(c+h);const gap_c=gap+2.5*(4-a);let l='Estado Normo-aniónico Sano Plasmático Fisiológico Ácido-Base Normal Celular Plasmático Sanguíneo',col='text-green-600',bg='bg-green-100',d='Equilibrado celular eléctrico biológico neutral e isotónico. En acidosis pura implicaría pérdidas innegables entéricas crudas directas o masivas anales fecales diarreicas alcalinas digestivas gastro pre biliares.';if(gap_c>12){l='Ácidosis Letal Biológica Elevada de Brecha Elevadísima GAP Crudo Altísimo Acidótico Metabólico Cetoacidotico Séptico Masivo Lactato',col='text-red-700',bg='bg-red-100',d='Acidosis química generada toxicológica puramente interna biológica médica extrema láctica médica fallada innegable e isquémica u urémica médica biológica y salicílica cruda diabética orgánica metabólica.';}setResultado({value: gap_c.toFixed(1), unit: 'mEq/L Corregidos', label:l, color:col, bg:bg, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-teal-700 to-cyan-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-teal-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">⚖️ Anión GAP (Brecha Aniónica con Delta)</h1>
                    <p className="text-teal-100 mt-2">Etiología Acidosis Metabólica Sérica</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Gasometría y Electrolitos Plasmáticos Venosos"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Sodio (Na) (mEq/L)"}</label>
                        <input type="number" value={na} onChange={(e) => setNa(e.target.value)} placeholder="140" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Cloruro (Cl-) (mEq/L)"}</label>
                        <input type="number" value={cl} onChange={(e) => setCl(e.target.value)} placeholder="104" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Bicarbonato Aniónico Químico Sérico Celular Básico Reactivo (HCO3-) (mEq/L)"}</label>
                        <input type="number" value={hco3} onChange={(e) => setHco3(e.target.value)} placeholder="24" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Albúmina Sérica Celular Plasmática Orgánica (g/dL)"}</label>
                        <input type="number" value={alb} onChange={(e) => setAlb(e.target.value)} placeholder="4.0" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all" />
                    </div>

                    <button onClick={calcular} className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className="bg-blue-50 rounded-2xl p-6 text-center mb-6">
                            <p className="text-sm text-gray-600 mb-1">Brecha Estimada GAP Pura Logarítmica Calculada</p>
                            <p className="text-5xl font-black text-blue-700">{resultado.value}</p>
                            {resultado.unit && <p className="text-blue-500 text-sm mt-1">{resultado.unit}</p>}
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Electrolitos Venosos Gasométricos Claves y Sépticos en UCI y Shock Vital Agudo"
                    description="Si estás débil y te falta aire evalúa tu sangre venosa en urgencias para evitar un paro arrítmico electrolisis crudo sérico bioquímico celular basal masiva acidosis."
                    actionText="Anión Panel Plasmático"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Electrolitos%20Sericos%20y%20Quimica"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Gasometrías Acidóticas Letales: Descifra Rápidamente Qué Acidez Inorgánica Venéfica Peligrosa Pura Cetoácida O Láctica Frena Sangre Múltiple Celular Orgánica Eléctrica."}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"Dentro innegable de la química biológica estricta médica del enfermo críticamente o metabólicamente crudo descompensado masivamente celular ácido o desastre mortal tóxico agudo en UCI o estado agendado."}</p>
                        <p>{"La estricta fórmula mundial biológica Anión Gap biológico crudo orgánico eléctrico representa inequívocamente y global masivo los indetectables crudos ocultos iones metabólicos celulares tóxicos venosos sanguíneos ácidos plasmáticos aniones ácidos invisibles moleculares crudos orgánicos como indudable y letal lactato mortal isquémico orgánico hipóxico o cetonas venenosas diabéticas innegables o intoxicación puro ácido crudo y salicilato biológico crudo."}</p>
                        <p>{"Cualquier franca superación métrica analítica innegable arriba matemática cruda del estrecho valor celular del 12 innegable alerta letal acidosis médica aguda sistémica e intervencionista cruzada uremia renal celular uremica aguda o sepsis sistémica masiva ceto acidótica cruda indudable médica celular letal descompensada global puramente desastrosa celular y diabética global basal letal."}</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 mt-6">
                        <strong>⚠️ Aviso:</strong> Esta herramienta es orientativa y NO sustituye el diagnóstico médico profesional. Consulta a tu médico para interpretación.
                    </div>
                </div>

                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
