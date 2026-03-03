'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function CalculadoraHomaIRPage() {
    const [glucosa, setGlucosa] = useState('');
    const [insulina, setInsulina] = useState('');
    const [resultado, setResultado] = useState<number | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        const g = parseFloat(glucosa);
        const i = parseFloat(insulina);
        if (g > 0 && i > 0) {
            // Fórmula HOMA-IR (Glucosa en mg/dL)
            const homa = (g * i) / 405;
            setResultado(parseFloat(homa.toFixed(2)));
        }
    };

    const getCategoria = (homa: number) => {
        if (homa < 1.9) return { label: 'Óptimo (Sensibilidad Normal)', color: 'text-green-600', bg: 'bg-green-100', bar: 'bg-green-500', desc: 'No hay evidencia de resistencia a la insulina.' };
        if (homa < 2.9) return { label: 'Resistencia a la Insulina Temprana', color: 'text-yellow-600', bg: 'bg-yellow-100', bar: 'bg-yellow-500', desc: 'Precaución. Ligera resistencia a la insulina. Se recomiendan cambios en el estilo de vida.' };
        return { label: 'Resistencia a la Insulina Significativa', color: 'text-red-600', bg: 'bg-red-100', bar: 'bg-red-500', desc: 'Alta probabilidad de Síndrome Metabólico o prediabetes. Es necesaria evaluación médica.' };
    };

    const getBarWidth = (homa: number) => {
        const clamp = Math.min(Math.max(homa, 0), 6);
        return (clamp / 6) * 100;
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-800 to-orange-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🔥 Índice HOMA-IR</h1>
                    <p className="text-red-100 mt-2">Calculadora clínica de Resistencia a la Insulina</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Calculator */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Glucosa en Ayunas (mg/dL)</label>
                            <input type="number" value={glucosa} onChange={(e) => setGlucosa(e.target.value)} placeholder="Ej: 90"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Insulina Basal (µU/mL)</label>
                            <input type="number" value={insulina} onChange={(e) => setInsulina(e.target.value)} placeholder="Ej: 10" step="0.1"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none text-lg text-gray-800" />
                        </div>
                    </div>
                    <button onClick={calcular}
                        className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                        Calcular HOMA-IR
                    </button>

                    {/* Result */}
                    {resultado !== null && (() => {
                        const cat = getCategoria(resultado);
                        return (
                            <div className="mt-8 animate-in fade-in">
                                <div className={`${cat.bg} rounded-2xl p-6 text-center mb-6`}>
                                    <p className="text-sm text-gray-600 mb-1">Tu Índice HOMA-IR es</p>
                                    <p className={`text-5xl font-black ${cat.color}`}>{resultado}</p>
                                    <p className={`text-xl font-bold ${cat.color} mt-1`}>{cat.label}</p>
                                    <p className="text-gray-600 text-sm mt-2">{cat.desc}</p>
                                </div>

                                {/* Visual scale */}
                                <div className="mb-6">
                                    <div className="h-4 rounded-full bg-gray-200 relative overflow-hidden">
                                        <div className="absolute inset-y-0 left-0 flex">
                                            <div className="bg-green-400 h-full" style={{ width: '31.6%' }} /> {/* 0 to 1.9 */}
                                            <div className="bg-yellow-400 h-full" style={{ width: '16.6%' }} /> {/* 1.9 to 2.9 */}
                                            <div className="bg-red-500 h-full" style={{ width: '51.8%' }} /> {/* > 2.9 */}
                                        </div>
                                        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-6 bg-white border-2 border-gray-800 rounded shadow-lg transition-all duration-500"
                                            style={{ left: `${getBarWidth(resultado)}%`, transform: 'translate(-50%, -50%)' }} />
                                    </div>
                                    <div className="flex justify-between text-[10px] text-gray-500 mt-1 px-1">
                                        <span>Óptimo (&lt;1.9)</span><span>Temprana (1.9-2.9)</span><span>Significativa (&gt;2.9)</span>
                                    </div>
                                </div>

                                {/* Study recommendation */}
                                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                                    <h3 className="font-bold text-red-900 text-lg mb-3">🔬 Estudios para el Metabolismo de la Glucosa</h3>
                                    <p className="text-gray-600 text-sm mb-4">Para confirmar tu estado metabólico o llevar esta información a tu médico (Endocrinólogo/Nutriólogo), te sugerimos:</p>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Índice HOMA (Glucosa + Insulina)', reason: 'Prueba completa requerida para medir la resistencia a la insulina con precisión en laboratorio' },
                                            { name: 'Hemoglobina Glicosilada (HbA1c)', reason: 'Muestra tu promedio de azúcar en la sangre de los últimos 3 meses' },
                                            { name: 'Química Sanguínea de 27 elementos', reason: 'Evalúa función renal, hepática, triglicéridos y colesterol asociado al síndrome metabólico' },
                                        ].map((study) => (
                                            <div key={study.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
                                                <span className="text-red-600 mt-1">✓</span>
                                                <div>
                                                    <p className="font-semibold text-gray-800 text-sm">{study.name}</p>
                                                    <p className="text-gray-500 text-xs">{study.reason}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/estudios/analisis-clinicos"
                                        className="mt-4 inline-block bg-red-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-red-800 transition-colors">
                                        Agendar Estudios Ahora →
                                    </Link>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* Ad Banner */}
                
                <StudyCTA 
                    title={`Diagnostica tu Resistencia a la Insulina`} 
                    description={`Tener glucosa "normal" engaña. Si el cuerpo segrega demasiada Insulina Basal, subirás de peso. Determinar este índice requiere medir Insulina y Glucosa simultáneamente en ayuno.`} 
                    actionText={`Cotizar Insulina y Glucosa (HOMA)`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Insulina%20y%20Glucosa%20(HOMA)*`} 
                    type="estudio" 
                />
                <AdBanner variant="horizontal" className="mb-8" />

                {/* Scientific Info Collapsible */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    <button onClick={() => setShowInfo(!showInfo)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                        <span className="font-bold text-gray-900">📚 ¿Qué es el HOMA-IR? — Información Científica</span>
                        <span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {showInfo && (
                        <div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4">
                            <p>El modelo <strong>HOMA-IR</strong> (Homeostatic Model Assessment of Insulin Resistance) es una de las herramientas más exactas para calcular la sensibilidad y resistencia a la insulina. Se utiliza ampliamente en endocrinología y nutrición clínica para detectar el riesgo de prediabetes o síndrome metabólico mucho antes de que los niveles de glucosa por sí solos se eleven de manera advertible.</p>
                            <h4 className="font-bold text-gray-900">Fórmula de Matthews (1985)</h4>
                            <div className="bg-gray-50 rounded-xl p-4 text-center font-mono text-lg">
                                (Insulina en ayunas [µU/mL] × Glucosa en ayunas [mg/dL]) ÷ 405
                            </div>
                            <h4 className="font-bold text-gray-900">Interpretación Clínica</h4>
                            <p>Un páncreas sano requiere muy poca insulina para mantener la glucosa controlada, resultando en un HOMA-IR bajo (&lt; 1.9). Por el contrario, cuando hay resistencia celular a la insulina, el páncreas tiene que segregar enormes cantidades de la misma para mantener niveles normales de azúcar en la sangre, disparando el índice HOMA hacia arriba.</p>
                            <p>El Síndrome de Ovario Poliquístico (SOP), el sobrepeso, la falta de sueño y dietas altas en carbohidratos refinados son las principales causas del aumento del HOMA-IR.</p>

                            <h4 className="font-bold text-gray-900">Fuentes científicas</h4>
                            <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
                                <li>Matthews DR, et al. Homeostasis model assessment: insulin resistance and beta-cell function from fasting plasma glucose and insulin concentrations in man. Diabetologia. 1985.</li>
                                <li>American Diabetes Association (ADA). Standards of Medical Care in Diabetes.</li>
                            </ul>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
                                <strong>⚠️ Aviso Clínico:</strong> Siempre se debe realizar este examen con un ayuno estricto de 8-12 horas. Los resultados de esta calculadora no son un diagnóstico y deben ser evaluados por tu Mádico Tratante o Nutriólogo Clínico.
                            </div>
                        </div>
                    )}
                </div>

                {/* Ad Banner bottom */}
                
                <StudyCTA 
                    title={`Diagnostica tu Resistencia a la Insulina`} 
                    description={`Tener glucosa "normal" engaña. Si el cuerpo segrega demasiada Insulina Basal, subirás de peso. Determinar este índice requiere medir Insulina y Glucosa simultáneamente en ayuno.`} 
                    actionText={`Cotizar Insulina y Glucosa (HOMA)`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Insulina%20y%20Glucosa%20(HOMA)*`} 
                    type="estudio" 
                />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
