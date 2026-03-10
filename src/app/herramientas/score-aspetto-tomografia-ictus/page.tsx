'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ScoreAspettoTomografiaIctusPage() {
    const [gangliosC, setGangliosC] = useState<boolean>(false);
    const [gangliosL, setGangliosL] = useState<boolean>(false);
    const [gangliosIC, setGangliosIC] = useState<boolean>(false);
    const [insula, setInsula] = useState<boolean>(false);
    const [m1, setM1] = useState<boolean>(false);
    const [m2, setM2] = useState<boolean>(false);
    const [m3, setM3] = useState<boolean>(false);
    const [m4, setM4] = useState<boolean>(false);
    const [m5, setM5] = useState<boolean>(false);
    const [m6, setM6] = useState<boolean>(false);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        let score=10;[gangliosC,gangliosL,gangliosIC,insula,m1,m2,m3,m4,m5,m6].forEach(area=>{if(area)score-=1;});let label='';let color='';let bg='';let desc='';if(score===10){label='Isquemia no visible (Temprana)';color='text-green-600';bg='bg-green-100';desc='TC Normal en el territorio de la ACM. Paciente ideal para trombolisis IV si está en ventana (relojes críticos).';}else if(score>=8){label='Infarto Incipiente Favorable';color='text-blue-600';bg='bg-blue-100';desc='Alta tasa de buen desenlace funcional si se realiza trombectomía mecánica. Tejido salvable masivo.';}else if(score>=6){label='Infarto Moderado';color='text-orange-600';bg='bg-orange-100';desc='El volumen de infarto afecta considerablemente el pronóstico funcional futuro.';}else{label='Infarto Extenso (Desfavorable)';color='text-red-700';bg='bg-red-200';desc='Menor o igual a 5: Tejido cerebral irreversible masivo. Riesgo altísimo de hemorragia cerebral secundaria si se usan terapias de reperfusión (trombolíticos).';}setResultado({value:score+' / 10',label,color,bg,desc});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-zinc-700 to-neutral-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-zinc-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🧠 Score ASPECTS para Ictus</h1>
                    <p className="text-zinc-100 mt-2">Puntuación Tomográfica del Ictus Isquémico (Arteria Cerebral Media)</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Sustraer 1 punto por cada territorio territorial isquémico (hipodensidad temprana)"}</h2>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="gangliosC" checked={gangliosC} onChange={(e) => setGangliosC(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="gangliosC" className="text-sm font-bold text-gray-700 cursor-pointer select-none">1. Núcleo Caudado</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="gangliosL" checked={gangliosL} onChange={(e) => setGangliosL(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="gangliosL" className="text-sm font-bold text-gray-700 cursor-pointer select-none">2. Núcleo Lenticular</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="gangliosIC" checked={gangliosIC} onChange={(e) => setGangliosIC(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="gangliosIC" className="text-sm font-bold text-gray-700 cursor-pointer select-none">3. Cápsula Interna</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="insula" checked={insula} onChange={(e) => setInsula(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="insula" className="text-sm font-bold text-gray-700 cursor-pointer select-none">4. Cinta Insular</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="m1" checked={m1} onChange={(e) => setM1(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="m1" className="text-sm font-bold text-gray-700 cursor-pointer select-none">5. Región M1 (Corteza anterior ACM)</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="m2" checked={m2} onChange={(e) => setM2(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="m2" className="text-sm font-bold text-gray-700 cursor-pointer select-none">6. Región M2 (Corteza lateral ACM)</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="m3" checked={m3} onChange={(e) => setM3(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="m3" className="text-sm font-bold text-gray-700 cursor-pointer select-none">7. Región M3 (Corteza posterior ACM)</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="m4" checked={m4} onChange={(e) => setM4(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="m4" className="text-sm font-bold text-gray-700 cursor-pointer select-none">8. Región M4 (Corona radiata anterior)</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="m5" checked={m5} onChange={(e) => setM5(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="m5" className="text-sm font-bold text-gray-700 cursor-pointer select-none">9. Región M5 (Corona radiata lateral)</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="m6" checked={m6} onChange={(e) => setM6(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="m6" className="text-sm font-bold text-gray-700 cursor-pointer select-none">10. Región M6 (Corona radiata posterior)</label>
                    </div>

                    <button onClick={calcular} className="w-full bg-zinc-700 hover:bg-zinc-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Score ASPECTS Resultante</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Monitoreo Fisiológico en Estado Crítico"
                    description="Después de un evento neurovascular es imprescindible corregir tiempos de coagulación y desbalances lipídicos severos."
                    actionText="Cotizar Tiempos de Coagulación"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Perfil%20Tromb%C3%B3tico%20y%20Coagulaci%C3%B3n"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Interpretación Pediátrica y Tomográfica: El Score ASPECTS"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p dangerouslySetInnerHTML={{ __html: "El Alberta Stroke Program Early CT Score (ASPECTS) es un método cuantitativo topográfico superlativo ideado para homogeneizar la evaluación visual de una Tomografía Computarizada (TC) de cráneo simple sin contraste en pacientes que presentan signos de evento vascular cerebral isquémico agudo hiperagudo." }} />
                        <p dangerouslySetInnerHTML={{ __html: "Segmentando el hemisferio amenazado irrigado por la arteria cerebral media (ACM) en 10 áreas funcionales estandarizadas de interés. Por su base arquitectónica inversa, todos los pacientes sanos inician con 10 puntos, perdiendo 1 punto por cada delimitación anatómica donde el radiólogo logre constatar signos tempranos de hipodensidad tisular, pérdida del ribete insular o borramiento del núcleo lenticular." }} />
                        <p dangerouslySetInnerHTML={{ __html: "Es un filtro absoluto. Si un radiólogo documenta un score igual o menor a 5 u 6, el paciente presenta ya un infarto consolidado en extensión grande. Recibir el rTPA (Alteplasa) podría reventar la vasculatura friable, precipitando una temible transformación hemorrágica intracerebral con severa mortalidad." }} />
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
