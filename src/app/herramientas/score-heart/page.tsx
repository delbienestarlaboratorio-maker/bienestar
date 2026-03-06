'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ScoreHeartPage() {
    const [historia, setHistoria] = useState<string>('');
    const [ecg, setEcg] = useState<string>('');
    const [edad, setEdad] = useState<string>('');
    const [riesgos, setRiesgos] = useState<string>('');
    const [troponina, setTroponina] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        if(!historia||!ecg||!edad||!riesgos||!troponina)return;const pts=parseInt(historia)+parseInt(ecg)+parseInt(edad)+parseInt(riesgos)+parseInt(troponina);let l='Bajo Riesgo',c='text-green-600',b='bg-green-100',d='Riesgo de MACE a 6 semanas: 0.9 - 1.7%.';if(pts>=7){l='Alto Riesgo';c='text-red-600';b='bg-red-100';d='Riesgo de MACE: 50 - 65%. Requiere intervención invasiva temprana.';}else if(pts>=4){l='Riesgo Moderado';c='text-orange-600';b='bg-orange-100';d='Riesgo de MACE: 12 - 16.6%. Admisión y observación clínica.';}setResultado({value: pts,label:l,color:c,bg:b,desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-red-700 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">❤️ HEART Score</h1>
                    <p className="text-red-100 mt-2">Riesgo de eventos cardíacos mayores (MACE)</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Evaluación Clínica</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Historia (Historia Clínica)"}</label>
                        <select value={historia} onChange={(e) => setHistoria(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Leve/No sospechosa"}</option>
                            <option value="1">{"Moderademente sospechosa"}</option>
                            <option value="2">{"Altamente sospechosa"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"ECG (Electrocardiograma)"}</label>
                        <select value={ecg} onChange={(e) => setEcg(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Normal"}</option>
                            <option value="1">{"Anormalidades inespecíficas"}</option>
                            <option value="2">{"Depresión ST significativa"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Age (Edad)"}</label>
                        <select value={edad} onChange={(e) => setEdad(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"< 45 años"}</option>
                            <option value="1">{"45-64 años"}</option>
                            <option value="2">{"≥ 65 años"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Risk factors (Factores de riesgo CV)"}</label>
                        <select value={riesgos} onChange={(e) => setRiesgos(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Ninguno conocido"}</option>
                            <option value="1">{"1 a 2 factores"}</option>
                            <option value="2">{"≥ 3 factores o historia de enf. coronaria"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Troponin (Troponina)"}</label>
                        <select value={troponina} onChange={(e) => setTroponina(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"≤ Límite normal"}</option>
                            <option value="1">{"1-3x Límite normal"}</option>
                            <option value="2">{"> 3x Límite normal"}</option>
                        </select>
                    </div>

                    <button onClick={calcular} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Puntos HEART</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Troponina y Marcadores Cardíacos"
                    description="La troponina ultrasensible y CPK son fundamentales para un diagnóstico oportuno."
                    actionText="Cotizar Enzimas Cardíacas"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Enzimas%20Cardiacas"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 ¿Qué evalúa el Score HEART?</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>HEART es el acrónimo de Historial, ECG, Edad, Factores de Riesgo (Risk factors) y Troponina. Este sistema de puntuación permite estratificar el riesgo de eventos cardíacos adversos mayores (MACE) a 6 semanas en pacientes que llegan a urgencias con dolor precordial.</p>
                        <p>El sistema otorga puntos del 0 al 10. Aquellos pacientes con una puntuación entre 0 y 3 son considerados de bajo riesgo y suelen recibir el alta hospitalaria segura. Pacientes con índices mayores a 3 requieren ingreso, observación, ecocardiograma e intervenciones clínicas más profundas.</p>
                        <p>A diferencia del TIMI o el GRACE, el score HEART fue validado específicamente para todo paciente indiferenciado que acude a urgencias con dolor de pecho.</p>
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
