'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function CalculadoraMustPage() {
    const [pesoActual, setPesoActual] = useState('');
    const [pesoHabitual, setPesoHabitual] = useState('');
    const [altura, setAltura] = useState('');
    const [enfermoGrave, setEnfermoGrave] = useState(false);

    const [resultado, setResultado] = useState<{
        score: number;
        bmi: number;
        weightLossRaw: number;
        bmiScore: number;
        lossScore: number;
        acuteScore: number;
    } | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        const pa = parseFloat(pesoActual);
        const ph = parseFloat(pesoHabitual);
        const a = parseFloat(altura) / 100;

        if (pa > 0 && ph > 0 && a > 0) {
            // 1. BMI Score
            const bmi = pa / (a * a);
            let bmiScore = 0;
            if (bmi < 18.5) bmiScore = 2;
            else if (bmi >= 18.5 && bmi < 20) bmiScore = 1;
            else bmiScore = 0;

            // 2. Weight Loss Score
            let lossPercentage = ((ph - pa) / ph) * 100;
            if (lossPercentage < 0) lossPercentage = 0; // If they gained weight, loss is 0

            let lossScore = 0;
            if (lossPercentage > 10) lossScore = 2;
            else if (lossPercentage >= 5 && lossPercentage <= 10) lossScore = 1;
            else lossScore = 0;

            // 3. Acute Disease Score
            const acuteScore = enfermoGrave ? 2 : 0;

            // Total MUST Score
            const totalScore = bmiScore + lossScore + acuteScore;

            setResultado({
                score: totalScore,
                bmi: parseFloat(bmi.toFixed(1)),
                weightLossRaw: parseFloat(lossPercentage.toFixed(1)),
                bmiScore,
                lossScore,
                acuteScore
            });
        }
    };

    const getCategoria = (score: number) => {
        if (score === 0) return { label: 'Riesgo Bajo', color: 'text-green-600', bg: 'bg-green-100', bar: 'bg-green-500', desc: 'Atención clínica de rutina. Repetir el cribado semanalmente en hospital o mensualmente en asilos.' };
        if (score === 1) return { label: 'Riesgo Medio', color: 'text-yellow-600', bg: 'bg-yellow-100', bar: 'bg-yellow-500', desc: 'Observar. Documentar la ingesta dietética durante 3 días. Si no mejora, dar suplementos.' };
        return { label: 'Riesgo Alto', color: 'text-red-600', bg: 'bg-red-100', bar: 'bg-red-500', desc: 'Tratar. Referir inmediatamente a un nutriólogo clínico o equipo de soporte nutricional.' };
    };

    const getBarWidth = (score: number) => {
        const clamp = Math.min(Math.max(score, 0), 6); // Max theoretical 6
        return (clamp / 6) * 100;
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-800 to-indigo-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-blue-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🥗 Score MUST</h1>
                    <p className="text-blue-100 mt-2">Herramienta Universal de Detección de Riesgo de Desnutrición</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Calculator */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Peso Actual (kg)</label>
                            <input type="number" value={pesoActual} onChange={(e) => setPesoActual(e.target.value)} placeholder="Ej: 60"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Peso Habitual (hace 3-6 meses)</label>
                            <input type="number" value={pesoHabitual} onChange={(e) => setPesoHabitual(e.target.value)} placeholder="Ej: 65"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Altura (cm)</label>
                            <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="Ej: 170"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg text-gray-800" />
                        </div>
                    </div>

                    <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" checked={enfermoGrave} onChange={(e) => setEnfermoGrave(e.target.checked)} className="mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                            <div>
                                <span className="block font-bold text-gray-800">Enfermedad Aguda (Efecto)</span>
                                <span className="block text-sm text-gray-600 mt-1">¿El paciente está gravemente enfermo y no ha habido, o se espera que no haya, ingesta nutricional por más de 5 días?</span>
                            </div>
                        </label>
                    </div>

                    <button onClick={calcular}
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                        Calcular Score MUST
                    </button>

                    {/* Result */}
                    {resultado !== null && (() => {
                        const cat = getCategoria(resultado.score);
                        return (
                            <div className="mt-8 animate-in fade-in">
                                <div className={`${cat.bg} rounded-2xl p-6 text-center mb-6`}>
                                    <p className="text-sm text-gray-600 mb-1">Puntuación Total MUST</p>
                                    <p className={`text-6xl font-black ${cat.color}`}>{resultado.score}</p>
                                    <p className={`text-xl font-bold ${cat.color} mt-2`}>{cat.label}</p>
                                    <p className="text-gray-700 font-medium text-sm mt-3 bg-white/50 inline-block px-4 py-2 rounded-lg">{cat.desc}</p>
                                </div>

                                <div className="grid grid-cols-3 gap-3 mb-6 relative">
                                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 text-center">
                                        <p className="text-xs text-gray-500 font-bold mb-1">Paso 1: IMC</p>
                                        <p className="text-lg font-bold text-gray-800">{resultado.bmi} <span className="text-sm font-normal">kg/m²</span></p>
                                        <p className="text-xs text-blue-600 font-bold">+{resultado.bmiScore} puntos</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 text-center">
                                        <p className="text-xs text-gray-500 font-bold mb-1">Paso 2: Pérdida</p>
                                        <p className="text-lg font-bold text-gray-800">{resultado.weightLossRaw}%</p>
                                        <p className="text-xs text-blue-600 font-bold">+{resultado.lossScore} puntos</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 text-center">
                                        <p className="text-xs text-gray-500 font-bold mb-1">Paso 3: Agudo</p>
                                        <p className="text-lg font-bold text-gray-800">{enfermoGrave ? 'Sí' : 'No'}</p>
                                        <p className="text-xs text-blue-600 font-bold">+{resultado.acuteScore} puntos</p>
                                    </div>
                                </div>

                                {/* Study recommendation */}
                                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                                    <h3 className="font-bold text-blue-900 text-lg mb-3">🔬 Evaluación Biológica de Nutrición</h3>
                                    <p className="text-gray-600 text-sm mb-4">La desnutrición clínica tiene un fuerte impacto en los valores de laboratorio. Se sugiere evaluar urgentemente los depósitos de proteínas y defensas:</p>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Albúmina Sérica y Proteínas Totales', reason: 'El marcador de oro para saber si el cuerpo está perdiendo músculo y proteínas esenciales' },
                                            { name: 'Biometría Hemática Completa', reason: 'Para detectar linfopenia (bajas defensas por desnutrición) o signos de anemia' },
                                            { name: 'Perfil de Lípidos Corto', reason: 'Niveles drásticamente bajos de colesterol indican grave deterioro nutricional' },
                                        ].map((study) => (
                                            <div key={study.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
                                                <span className="text-blue-600 mt-1">✓</span>
                                                <div>
                                                    <p className="font-semibold text-gray-800 text-sm">{study.name}</p>
                                                    <p className="text-gray-500 text-xs">{study.reason}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/estudios/analisis-clinicos"
                                        className="mt-4 inline-block bg-blue-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-800 transition-colors">
                                        Solicitar Estudios Ahora →
                                    </Link>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* Ad Banner */}
                
                <StudyCTA 
                    title={`Desnutrición Hospitalaria`} 
                    description={`Para corroborar la desnutrición detectada, es imperativo obtener niveles sanguíneos de Albúmina y Proteínas Totales (marcadores de reservas musculares).`} 
                    actionText={`Cotizar Albúmina en Sangre`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Alb%C3%BAmina%20en%20Sangre*`} 
                    type="estudio" 
                />
                <AdBanner variant="horizontal" className="mb-8" />

                {/* Scientific Info Collapsible */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    <button onClick={() => setShowInfo(!showInfo)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                        <span className="font-bold text-gray-900">📚 ¿Qué es el Score MUST? — Información Científica</span>
                        <span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {showInfo && (
                        <div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4">
                            <p>El <strong>MUST</strong> (Malnutrition Universal Screening Tool) es una herramienta validada internacionalmente para identificar a adultos desnutridos, con riesgo de desnutrición (ya sea por desnutrición proteico-calórica) o con obesidad concomitante. Es recomendada universalmente por la Asociación Británica de Nutrición Parenteral y Enteral (BAPEN).</p>

                            <h4 className="font-bold text-gray-900">La evaluación tiene 3 pasos:</h4>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li><strong>Paso 1 (IMC):</strong> Mide si el paciente está crónicamente delgado. Un IMC mayor a 20 suma 0 puntos, de 18.5 a 20 suma 1 punto, y menor a 18.5 suma 2 puntos.</li>
                                <li><strong>Paso 2 (Pérdida de peso):</strong> Mide un posible proceso agudo de consunción. Pérdida menor al 5% es 0 puntos, de 5-10% es 1 punto, y mayor al 10% son 2 puntos.</li>
                                <li><strong>Paso 3 (Efecto de enfermedad):</strong> Suma directamente 2 puntos si el paciente está fisiológicamente estresado por una enfermedad aguda grave que le impide comer.</li>
                            </ul>

                            <h4 className="font-bold text-gray-900">Aplicación Clínica</h4>
                            <p>En el ámbito hospitalario, geriátrico o domiciliario, se utiliza como tamizaje obligatorio. Una puntuación ≥ 2 requiere una vía directa a intervención nutricional agresiva (suplementos hipercalóricos, nutrición por sonda, etc) porque está comprobado científicamente que a partir de este score, el riesgo de mortalidad y de infecciones aumenta exponencialmente.</p>

                            <h4 className="font-bold text-gray-900">Fuentes científicas</h4>
                            <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
                                <li>BAPEN (British Association for Parenteral and Enteral Nutrition). The ‘MUST’ Report. 2003.</li>
                                <li>Elia, M. Screening for malnutrition: a multidisciplinary responsibility. Development and use of the Malnutrition Universal Screening Tool (MUST) for adults.</li>
                            </ul>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
                                <strong>⚠️ Aviso Normativo:</strong> Esta herramienta de cribado nutricional se utiliza para decidir protocolos clínicos por parte del nutriólogo/médico tratante, y no reemplaza el juicio clínico ni los estudios de laboratorio en sangre.
                            </div>
                        </div>
                    )}
                </div>

                {/* Ad Banner bottom */}
                
                <StudyCTA 
                    title={`Desnutrición Hospitalaria`} 
                    description={`Para corroborar la desnutrición detectada, es imperativo obtener niveles sanguíneos de Albúmina y Proteínas Totales (marcadores de reservas musculares).`} 
                    actionText={`Cotizar Albúmina en Sangre`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Alb%C3%BAmina%20en%20Sangre*`} 
                    type="estudio" 
                />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
