'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function IndiceRomaOvarioPage() {
    const [menopausia, setMenopausia] = useState<string>('');
    const [ca125, setCa125] = useState<string>('');
    const [he4, setHe4] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const meno=parseInt(menopausia);const ca=parseFloat(ca125);const he=parseFloat(he4);if(!meno||!ca||!he)return;let pi=0;let prob=0;if(meno===1){pi = -12.0 + 2.38*Math.log(he) + 0.0626*Math.log(ca);prob = Math.exp(pi)/(1+Math.exp(pi))*100;let l='Alto Riesgo Quirúrgico Cáncer (> 11.4%)',c='text-red-700',b='bg-red-100',d='La paciente pre-menopáusica entra en estratificación inmediata de altísimo innegable riesgo pélvico cirujano oncológico.';if(prob<11.4){l='Bajo Probable Nódulo Quiste Ovario Benigno (< 11.4%)';c='text-green-600';b='bg-green-100';d='Masas ováricas ginecológicamente controlables seguras en clínica ginecológica.'}setResultado({value: prob.toFixed(1), unit: '% ROMA Score', label:l, color:c, bg:b, desc:d});}else{pi = -8.09 + 1.04*Math.log(he) + 0.732*Math.log(ca);prob = Math.exp(pi)/(1+Math.exp(pi))*100;let l='Cáncer Ovario Inminente Maligno Letal Post-Menopáusica Alta (> 29.9%)',c='text-red-900',b='bg-red-200',d='Severo estado inminente quirófano ginecológico maligno cáncer. Letal malignidad ovárica pura oncología.';if(prob<29.9){l='Masa Quística Posible Cirugía Innecesaria Oncológica Menopausia Pura (< 29.9%)';c='text-yellow-600';b='bg-yellow-100';d='Riesgos del 29%. Evaluaciones repetidas gineco laparoscópicas pero NO oncológicas crudas radicales malignas mortales agresivas extremas amputativas ginecológicas.'}setResultado({value: prob.toFixed(1), unit: '% ROMA Score', label:l, color:c, bg:b, desc:d});}
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-purple-700 to-fuchsia-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-purple-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🩸 Índice de Malignidad Ovárica ROMA</h1>
                    <p className="text-purple-100 mt-2">Evaluación del Riesgo de Masa Pélvica Ovárica</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Marcadores Tumorales Serológicos Ováricos"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Estado Menopáusico"}</label>
                        <select value={menopausia} onChange={(e) => setMenopausia(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="1">{"Premenopáusica Múltiple Origen de Edad Fértil Activo Genital (Menstruante Activa Ginecológica Genital Menstrual Periodo Fértil Pura Sangrante Activa Vigorosa Fértil Sangre Útero Genital Ovarios Hormonales Activos)"}</option>
                            <option value="2">{"Postmenopáusica Inactiva Sangrante Regla Útero Inactiva Hormonal Genital Menopausia Pura Menopausia Climaterio Genitales Pasados"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Marcador Tumoral CA-125 Sérica (U/mL)"}</label>
                        <input type="number" value={ca125} onChange={(e) => setCa125(e.target.value)} placeholder="ej: 50" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Marcador Tumoral HE4 Sérica (pmol/L)"}</label>
                        <input type="number" value={he4} onChange={(e) => setHe4(e.target.value)} placeholder="ej: 120" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all" />
                    </div>

                    <button onClick={calcular} className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className="bg-blue-50 rounded-2xl p-6 text-center mb-6">
                            <p className="text-sm text-gray-600 mb-1">Porcentaje Logarítmico Muerte Cáncer ROMA Predictivo Ovárico Gineco Biomarcador</p>
                            <p className="text-5xl font-black text-blue-700">{resultado.value}</p>
                            {resultado.unit && <p className="text-blue-500 text-sm mt-1">{resultado.unit}</p>}
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Valoración Sangre CA-125 Ovular Confirmatoria Marcadores Ováricos Pre-Quirúrgicos"
                    description="No decidas una extirpación ovárica y anexos agresiva quirúrgica gineco castrante sin tener a la mano biomarcadores medidos químicos séricos pélvicos."
                    actionText="CA-125 Antígeno Ginecológico Marcador"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Ca%20125%20Quimica%20Tumoral%20Sanguinea"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Índice ROMA de Ovario Riesgo Cáncer Ovárico Quirúrgico Score Marcador Sangre Tumor Pélvico Quiste"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"El sistema de Ovario Oncológico ROMA es el estándar dorado médico universal global ginecológico logarítmico para diferenciar abismal y estricta una simple y gorda inofensiva bola o quiste ovárico benigno puramente doloroso (como hemorragias o líquido de chocolate endometrial benigno pre menstrual biológico benigno pélvico doloroso pero de ninguna índole neoplásico quirúrgico letal maligno mortal tumoral gineco ovular mortal inminente puramente metástasis sistémica) frente a horribles crueles y francos crasos mortales agresivos masivos letales silenciosos carcinomas ovarios."}</p>
                        <p>{"Requiere el cruce de un doble marcador y factor puramente hormonal menopáusico del estado sexual de reproducción de la edad femenina: El famoso tradicional clásico Antígeno marcador clínico Ovárico CA 125 medible séricamente (cuya simple elevación o falso positivo se ensucia abismalmente de falsedades e inexactitudes con la apendicitis o menstruaciones) cruzado logarítmicamente contra el novedoso potentísimo puro infalible y estricto biológico neoplásico puro y sin alteraciones falso puro marcador tumoral HE4 puramente cancerígeno letal para elevar francamente estratificaciones quirúrgicas estrictas radicales oncológicas."}</p>
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
