'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function EscalaKellgrenLawrenceOsteoartritisPage() {
    const [osteofitos, setOsteofitos] = useState<string>('');
    const [espacio, setEspacio] = useState<string>('');
    const [esclerosis, setEsclerosis] = useState<boolean>(false);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const o=parseInt(osteofitos);const e=parseInt(espacio);if(isNaN(o)||isNaN(e))return;let score=Math.max(o,e);if(esclerosis&&score<3)score=3;if(o===4&&e===4)score=4;let label='';let color='';let bg='';let desc='';if(score===0){label='Grado 0: Normal';color='text-green-600';bg='bg-green-100';desc='Sin evidencia radiológica de osteoartritis.';}else if(score===1){label='Grado 1: Dudoso';color='text-yellow-600';bg='bg-yellow-100';desc='Dudoso estrechamiento del espacio y posible osteofitosis. Desgaste incipiente.';}else if(score===2){label='Grado 2: Leve (OA Definida)';color='text-orange-500';bg='bg-orange-100';desc='Osteofitos bien definidos y posible pinzamiento leve. Inicio de desgaste articular definitivo.';}else if(score===3){label='Grado 3: Moderado';color='text-red-500';bg='bg-red-100';desc='Múltiples osteofitos, estrechamiento evidente, comienzo de esclerosis e irregularidades cortocales.';}else{label='Grado 4: Severo';color='text-red-700';bg='bg-red-200';desc='Pérdida masiva del espacio articular, grandes osteofitos, deforma ósea severa. Candidato probable a reemplazo protésico.';}setResultado({value:'Grado '+score,label,color,bg,desc});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-zinc-700 to-neutral-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-zinc-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🦵 Escala de Kellgren-Lawrence</h1>
                    <p className="text-zinc-100 mt-2">Grados de Severidad Radiológica en Osteoartritis</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Hallazgos Radiológicos Observados (Carga / AP)"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Presencia de Osteofitos"}</label>
                        <select value={osteofitos} onChange={(e) => setOsteofitos(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-zinc-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Ausentes"}</option>
                            <option value="1">{"Posibles osteofitos pequeños (Dudosos)"}</option>
                            <option value="2">{"Osteofitos definidos pero pequeños"}</option>
                            <option value="3">{"Osteofitos múltiples y moderados"}</option>
                            <option value="4">{"Osteofitos severos y extensos"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Estrechamiento del Espacio Articular"}</label>
                        <select value={espacio} onChange={(e) => setEspacio(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-zinc-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Normal"}</option>
                            <option value="1">{"Dudoso / Posible leve estrechamiento"}</option>
                            <option value="2">{"Estrechamiento definido pero leve"}</option>
                            <option value="3">{"Estrechamiento moderado a severo (Contacto posible)"}</option>
                            <option value="4">{"Pérdida total del espacio ('Hueso con Hueso')"}</option>
                        </select>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="esclerosis" checked={esclerosis} onChange={(e) => setEsclerosis(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="esclerosis" className="text-sm font-bold text-gray-700">{"Esclerosis subcondral evidente o deforma ósea severa"}</label>
                    </div>

                    <button onClick={calcular} className="w-full bg-zinc-700 hover:bg-zinc-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Clasificación Kellgren-Lawrence</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="¿Planeas una cirugía de rodilla?"
                    description="Para las artroplastias se requieren pruebas preoperatorias clínicas."
                    actionText="Ver Pre-Quirúrgicos"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Perfil%20Preoperatorio"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Radiología del Desgaste Articular: Kellgren y Lawrence"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p dangerouslySetInnerHTML={{ __html: "La escala de Kellgren y Lawrence, publicada en 1957, ha resistido la prueba del tiempo como el principal predictor radiológico universal de la severidad de la Osteoartritis (también conocida como artrosis), especialmente aplicada a rodillas (gonartrosis) y caderas (coxartrosis)." }} />
                        <p dangerouslySetInnerHTML={{ __html: "Esta clasificación estandarizada toma en cuenta la degeneración patológica del cartílago, evidenciada por la reducción física del espacio intraarticular (pinzamiento asimétrico en RX de carga AP), así como los mecanismos defensivos del hueso subyacente que reacciona proliferando exostosis perimarginales (osteofitos) o endureciendo la cortical matriz (esclerosis subcondral o eburnación)." }} />
                        <p dangerouslySetInnerHTML={{ __html: "Clínicamente, un grado II a III justifica tratamientos conservadores extensos como infiltraciones de ácido hialurónico o PRP, mientras que un grado IV indica colapso irreversible de la diartrosis, exigiendo en la mayoría de los casos intervenciones de artroplastia total ortopédica." }} />
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
