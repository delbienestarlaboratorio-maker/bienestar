'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ScoreHasBledPage() {
    const [hypertension, setHypertension] = useState<boolean>(false);
    const [abnormalRenal, setAbnormalRenal] = useState<boolean>(false);
    const [abnormalLiver, setAbnormalLiver] = useState<boolean>(false);
    const [stroke, setStroke] = useState<boolean>(false);
    const [bleeding, setBleeding] = useState<boolean>(false);
    const [labileInr, setLabileInr] = useState<boolean>(false);
    const [elderly, setElderly] = useState<boolean>(false);
    const [drugs, setDrugs] = useState<boolean>(false);
    const [alcohol, setAlcohol] = useState<boolean>(false);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        let pts=0;if(hypertension)pts++;if(abnormal_renal)pts++;if(abnormal_liver)pts++;if(stroke)pts++;if(bleeding)pts++;if(labile_inr)pts++;if(elderly)pts++;if(drugs)pts++;if(alcohol)pts++;let l='Bajo Riesgo',c='text-green-600',b='bg-green-100',d='Riesgo anual de sangrado: 1-1.5%.';if(pts>=3){l='Alto Riesgo';c='text-red-600';b='bg-red-100';d='Riesgo anual de sangrado: ≥3.7%. Se debe monitorear estrechamente con la anticoagulación oral.';}else if(pts===2){l='Riesgo Moderado';c='text-yellow-600';b='bg-yellow-100';d='Riesgo anual de sangrado: 1.8%. Precaución.';}setResultado({value: pts,label:l,color:c,bg:b,desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-red-700 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">❤️ Score HAS-BLED</h1>
                    <p className="text-red-100 mt-2">Riesgo de sangrado mayor en fibrilación auricular</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Factores de Riesgo</h2>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="hypertension" checked={hypertension} onChange={(e) => setHypertension(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="hypertension" className="text-sm font-bold text-gray-700">{"Hipertensión (sistólica >160)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="abnormal_renal" checked={abnormalRenal} onChange={(e) => setAbnormalRenal(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="abnormal_renal" className="text-sm font-bold text-gray-700">{"Discreta Falla Renal (diálisis, post-trasplante, Cr >2.2)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="abnormal_liver" checked={abnormalLiver} onChange={(e) => setAbnormalLiver(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="abnormal_liver" className="text-sm font-bold text-gray-700">{"Discreta Falla Hepática (cirrosis, ALT/AST 3x superior)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="stroke" checked={stroke} onChange={(e) => setStroke(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="stroke" className="text-sm font-bold text-gray-700">{"Historia clínica de Ictus / EVC"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="bleeding" checked={bleeding} onChange={(e) => setBleeding(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="bleeding" className="text-sm font-bold text-gray-700">{"Predisposición o historial a sangrados"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="labile_inr" checked={labileInr} onChange={(e) => setLabileInr(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="labile_inr" className="text-sm font-bold text-gray-700">{"INR Lábil o Inestable (<60% del tiempo en rango terapéutico)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="elderly" checked={elderly} onChange={(e) => setElderly(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="elderly" className="text-sm font-bold text-gray-700">{"Personas Mayores (>65 años)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="drugs" checked={drugs} onChange={(e) => setDrugs(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="drugs" className="text-sm font-bold text-gray-700">{"Medicamentos (AINEs, antiplaquetarios, etc)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="alcohol" checked={alcohol} onChange={(e) => setAlcohol(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="alcohol" className="text-sm font-bold text-gray-700">{"Exceso de consumo de alcohol (≥8 copas por semana)"}</label>
                    </div>

                    <button onClick={calcular} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Puntaje HAS-BLED</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Monitoreo de Coagulación"
                    description="Para prescribir anticoagulantes es vital conocer tu INR, Tiempo de Protrombina (TP) y plaquetas."
                    actionText="Cotizar Tiempos de Coagulación"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Tiempos%20de%20Coagulacion"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 ¿Cómo previene hemorragias HAS-BLED?</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>El Score HAS-BLED es una herramienta decisiva para anticipar la posibilidad de que un paciente sufra hemorragias masivas al ser tratado con anticoagulantes orales por padecer Fibrilación Auricular (FA).</p>
                        <p>Calculado desde el 0 hasta 9 puntos, evalúa siete categorías principales: la presión arterial no controlada, daños previos en hígado o riñones, un embolismo previo o historial hemorrágico espontáneo (úlceras), y abuso de medicación y drogas o alcohol.</p>
                        <p>Una calificación HAS-BLED de 3 puntos o superior resalta que el paciente posee ALTO riesgo de sangrado. Un puntaje alto no significa obligatoriamente suspender la anticoagulación; sirve como indicador para minimizar riesgos corrigiendo factores modificables (como bajar la presión arterial).</p>
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
