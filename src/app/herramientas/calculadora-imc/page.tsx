'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';

export default function CalculadoraIMCPage() {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [resultado, setResultado] = useState<number | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        const p = parseFloat(peso);
        const a = parseFloat(altura) / 100; // cm to m
        if (p > 0 && a > 0) {
            setResultado(parseFloat((p / (a * a)).toFixed(1)));
        }
    };

    const getCategoria = (imc: number) => {
        if (imc < 18.5) return { label: 'Bajo peso', color: 'text-blue-600', bg: 'bg-blue-100', bar: 'bg-blue-500', desc: 'Tu peso está por debajo del rango saludable. Consulta a tu médico.' };
        if (imc < 25) return { label: 'Peso normal', color: 'text-green-600', bg: 'bg-green-100', bar: 'bg-green-500', desc: '¡Excelente! Tu peso está en un rango saludable.' };
        if (imc < 30) return { label: 'Sobrepeso', color: 'text-yellow-600', bg: 'bg-yellow-100', bar: 'bg-yellow-500', desc: 'Tu peso está por encima del rango ideal. Se recomienda evaluación médica.' };
        if (imc < 35) return { label: 'Obesidad Grado I', color: 'text-orange-600', bg: 'bg-orange-100', bar: 'bg-orange-500', desc: 'Riesgo moderado de enfermedades metabólicas. Consulta a tu médico.' };
        if (imc < 40) return { label: 'Obesidad Grado II', color: 'text-red-500', bg: 'bg-red-100', bar: 'bg-red-500', desc: 'Riesgo alto de enfermedades cardiovasculares y metabólicas.' };
        return { label: 'Obesidad Grado III', color: 'text-red-700', bg: 'bg-red-200', bar: 'bg-red-700', desc: 'Riesgo muy alto. Se requiere atención médica especializada.' };
    };

    const getBarWidth = (imc: number) => {
        const clamp = Math.min(Math.max(imc, 10), 50);
        return ((clamp - 10) / 40) * 100;
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-800 to-teal-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-green-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">⚖️ Calculadora de IMC</h1>
                    <p className="text-green-100 mt-2">Índice de Masa Corporal — evalúa si tu peso es saludable</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Calculator */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Peso (kg)</label>
                            <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Ej: 70"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Altura (cm)</label>
                            <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="Ej: 170"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-lg text-gray-800" />
                        </div>
                    </div>
                    <button onClick={calcular}
                        className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                        Calcular IMC
                    </button>

                    {/* Result */}
                    {resultado !== null && (() => {
                        const cat = getCategoria(resultado);
                        return (
                            <div className="mt-8 animate-in fade-in">
                                <div className={`${cat.bg} rounded-2xl p-6 text-center mb-6`}>
                                    <p className="text-sm text-gray-600 mb-1">Tu IMC es</p>
                                    <p className={`text-5xl font-black ${cat.color}`}>{resultado}</p>
                                    <p className={`text-xl font-bold ${cat.color} mt-1`}>{cat.label}</p>
                                    <p className="text-gray-600 text-sm mt-2">{cat.desc}</p>
                                </div>

                                {/* Visual scale */}
                                <div className="mb-6">
                                    <div className="h-4 rounded-full bg-gray-200 relative overflow-hidden">
                                        <div className="absolute inset-y-0 left-0 flex">
                                            <div className="bg-blue-400 h-full" style={{ width: '21.25%' }} />
                                            <div className="bg-green-400 h-full" style={{ width: '16.25%' }} />
                                            <div className="bg-yellow-400 h-full" style={{ width: '12.5%' }} />
                                            <div className="bg-orange-400 h-full" style={{ width: '12.5%' }} />
                                            <div className="bg-red-400 h-full" style={{ width: '12.5%' }} />
                                            <div className="bg-red-600 h-full" style={{ width: '25%' }} />
                                        </div>
                                        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-6 bg-white border-2 border-gray-800 rounded shadow-lg transition-all duration-500"
                                            style={{ left: `${getBarWidth(resultado)}%`, transform: 'translate(-50%, -50%)' }} />
                                    </div>
                                    <div className="flex justify-between text-[10px] text-gray-500 mt-1 px-1">
                                        <span>Bajo peso</span><span>Normal</span><span>Sobrepeso</span><span>Obesidad I</span><span>Obesidad II</span><span>Obesidad III</span>
                                    </div>
                                </div>

                                {/* Study recommendation */}
                                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                                    <h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3>
                                    <p className="text-gray-600 text-sm mb-4">Basado en tu IMC, estos estudios clínicos te ayudarán a evaluar tu estado de salud completo:</p>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Perfil de Lípidos (Colesterol y Triglicéridos)', reason: 'Evalúa tu riesgo cardiovascular' },
                                            { name: 'Glucosa en Ayunas', reason: 'Descarta resistencia a la insulina o diabetes' },
                                            { name: 'Química Sanguínea de 27 elementos', reason: 'Panel completo de salud metabólica' },
                                            { name: 'Perfil Tiroideo (TSH, T3, T4)', reason: 'La tiroides influye directamente en el peso' },
                                        ].map((study) => (
                                            <div key={study.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
                                                <span className="text-green-600 mt-1">✓</span>
                                                <div>
                                                    <p className="font-semibold text-gray-800 text-sm">{study.name}</p>
                                                    <p className="text-gray-500 text-xs">{study.reason}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/estudios/analisis-clinicos"
                                        className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800 transition-colors">
                                        Ver Estudios Disponibles →
                                    </Link>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* Ad Banner */}
                <AdBanner variant="horizontal" className="mb-8" />

                {/* Scientific Info Collapsible */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    <button onClick={() => setShowInfo(!showInfo)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                        <span className="font-bold text-gray-900">📚 ¿Qué es el IMC? — Información Científica</span>
                        <span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {showInfo && (
                        <div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4">
                            <p>El <strong>Índice de Masa Corporal (IMC)</strong>, también conocido como BMI por sus siglas en inglés (Body Mass Index), es una medida que relaciona el peso con la estatura para clasificar a las personas en diferentes categorías de peso.</p>
                            <h4 className="font-bold text-gray-900">Fórmula</h4>
                            <div className="bg-gray-50 rounded-xl p-4 text-center font-mono text-lg">
                                IMC = Peso (kg) ÷ Altura² (m²)
                            </div>
                            <h4 className="font-bold text-gray-900">Clasificación de la OMS</h4>
                            <table className="w-full text-sm">
                                <thead><tr className="bg-gray-100"><th className="p-2 text-left">IMC</th><th className="p-2 text-left">Clasificación</th></tr></thead>
                                <tbody>
                                    <tr className="border-b"><td className="p-2">&lt; 18.5</td><td className="p-2">Bajo peso</td></tr>
                                    <tr className="border-b"><td className="p-2">18.5 – 24.9</td><td className="p-2">Peso normal</td></tr>
                                    <tr className="border-b"><td className="p-2">25.0 – 29.9</td><td className="p-2">Sobrepeso</td></tr>
                                    <tr className="border-b"><td className="p-2">30.0 – 34.9</td><td className="p-2">Obesidad Grado I</td></tr>
                                    <tr className="border-b"><td className="p-2">35.0 – 39.9</td><td className="p-2">Obesidad Grado II</td></tr>
                                    <tr><td className="p-2">≥ 40</td><td className="p-2">Obesidad Grado III</td></tr>
                                </tbody>
                            </table>
                            <h4 className="font-bold text-gray-900">Limitaciones</h4>
                            <p>El IMC no distingue entre masa muscular y masa grasa, por lo que atletas o personas con alta masa muscular pueden tener un IMC alto sin tener exceso de grasa. Para una evaluación más precisa, se recomienda complementar con la medición del porcentaje de grasa corporal y la circunferencia de cintura.</p>
                            <h4 className="font-bold text-gray-900">Fuentes científicas</h4>
                            <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
                                <li>Organización Mundial de la Salud (OMS). Clasificación del IMC.</li>
                                <li>National Institutes of Health (NIH). Clinical Guidelines on the Identification, Evaluation, and Treatment of Overweight and Obesity in Adults.</li>
                                <li>Quetelet, A. (1832). Recherches sur le poids de l&apos;homme aux différents âges.</li>
                            </ul>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
                                <strong>⚠️ Aviso:</strong> Esta calculadora es una herramienta informativa. No sustituye la consulta médica profesional. Consulta siempre a tu médico para una evaluación integral de tu salud.
                            </div>
                        </div>
                    )}
                </div>

                {/* Ad Banner bottom */}
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
