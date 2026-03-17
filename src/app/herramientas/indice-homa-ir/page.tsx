'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

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

                {/* SEO Content GPT Injected */}
<section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-xl overflow-hidden border border-blue-100 mb-8 p-8 lg:p-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía Médica y Científica Exhaustiva: El Índice HOMA-IR</h2>
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        <p>El Índice HOMA-IR (Homeostasis Model Assessment - Insulin Resistance) es una herramienta diagnóstica no invasiva y ampliamente utilizada para estimar la resistencia a la insulina en individuos. Desarrollado en 1985, este índice se ha consolidado como un marcador fundamental en la evaluación del riesgo metabólico, permitiendo una detección temprana de alteraciones que pueden conducir a condiciones más graves como la prediabetes, la diabetes tipo 2 y enfermedades cardiovasculares.</p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 flex items-center gap-2">🔬 Fisiopatología de la Resistencia a la Insulina</h3>
        <p>La resistencia a la insulina es una condición metabólica en la que las células del cuerpo (principalmente musculares, hepáticas y adiposas) no responden adecuadamente a la insulina, una hormona vital producida por el páncreas. La insulina es la llave que permite a la glucosa (azúcar) entrar en las células para ser utilizada como energía o almacenada.</p>
        <p>Cuando existe resistencia, el páncreas compensa produciendo más insulina (hiperinsulinemia) para mantener los niveles de glucosa en sangre dentro de un rango normal. Sin embargo, con el tiempo, esta sobrecarga puede agotar las células beta del páncreas, llevando a una disminución en la producción de insulina y, eventualmente, a la elevación crónica de la glucosa en sangre, característica de la prediabetes y la diabetes tipo 2.</p>
        <p>Los factores que contribuyen a la resistencia a la insulina son multifactoriales e incluyen la genética, la obesidad (especialmente la grasa visceral), el sedentarismo, una dieta rica en azúcares refinados y grasas saturadas, el estrés crónico y la inflamación sistémica. Esta condición es un pilar central del Síndrome Metabólico, un conjunto de factores de riesgo que aumentan la probabilidad de enfermedad cardíaca, accidente cerebrovascular y diabetes.</p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 flex items-center gap-2">📊 Interpretación Clínica de los Resultados del HOMA-IR</h3>
        <p>El cálculo del HOMA-IR se basa en los niveles de glucosa e insulina en ayunas. La fórmula utilizada es: <code className="bg-gray-100 px-2 py-1 rounded-md text-sm font-mono">HOMA-IR = (Glucosa en Ayunas [mg/dL] × Insulina en Ayunas [µU/mL]) / 405</code>. Los valores resultantes se interpretan de la siguiente manera:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong className="text-green-600">Óptimo (Sensibilidad Normal) - HOMA-IR &lt; 1.9:</strong> Indica una buena sensibilidad a la insulina. Las células responden eficazmente a la insulina, y el riesgo de resistencia es bajo.</li>
            <li><strong className="text-yellow-600">Resistencia a la Insulina Temprana - HOMA-IR entre 1.9 y 2.8:</strong> Sugiere el inicio de una resistencia a la insulina. Aunque los niveles de glucosa pueden aún ser normales, el páncreas ya está trabajando más para mantenerlos. Es un momento crucial para implementar cambios en el estilo de vida.</li>
            <li><strong className="text-red-600">Resistencia a la Insulina Significativa - HOMA-IR &ge; 2.9:</strong> Indica una resistencia a la insulina bien establecida. Existe un alto riesgo de desarrollar prediabetes, diabetes tipo 2, síndrome metabólico y enfermedades cardiovasculares. Se requiere una evaluación médica exhaustiva y un plan de intervención.</li>
        </ul>
        <p className="mt-4">Es importante recordar que estos puntos de corte son guías generales y pueden variar ligeramente según la población y el laboratorio. Siempre se debe interpretar el resultado en el contexto clínico completo del paciente.</p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 flex items-center gap-2">🚨 Banderas Rojas (Red Flags) y Síntomas Asociados</h3>
        <p>La resistencia a la insulina a menudo es asintomática en sus etapas iniciales, pero ciertas señales y condiciones pueden alertar sobre su presencia:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Obesidad Central:</strong> Acumulación de grasa alrededor de la cintura (abdomen).</li>
            <li><strong>Acanthosis Nigricans:</strong> Manchas oscuras y aterciopeladas en la piel, especialmente en el cuello, axilas e ingles.</li>
            <li><strong>Hipertensión Arterial:</strong> Presión sanguínea elevada.</li>
            <li><strong>Dislipidemia:</strong> Niveles elevados de triglicéridos y/o bajos de colesterol HDL ("bueno").</li>
            <li><strong>Fatiga Crónica:</strong> Sensación constante de cansancio sin causa aparente.</li>
            <li><strong>Dificultad para Perder Peso:</strong> A pesar de esfuerzos dietéticos y de ejercicio.</li>
            <li><strong>Antecedentes Familiares:</strong> Historia de diabetes tipo 2 o enfermedades cardiovasculares en la familia.</li>
            <li><strong>S��ndrome de Ovario Poliquístico (SOP):</strong> En mujeres, es una causa común de resistencia a la insulina.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 flex items-center gap-2">🧪 Estudios de Laboratorio Recomendados</h3>
        <p>Para una evaluación completa de la resistencia a la insulina y el riesgo metabólico, además del HOMA-IR, se recomiendan los siguientes estudios:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Glucosa en Ayunas:</strong> Nivel de azúcar en sangre después de 8-12 horas de ayuno.</li>
            <li><strong>Insulina en Ayunas:</strong> Nivel de insulina en sangre después de 8-12 horas de ayuno.</li>
            <li><strong>Hemoglobina Glicosilada (HbA1c):</strong> Refleja el promedio de glucosa en sangre durante los últimos 2-3 meses.</li>
            <li><strong>Perfil Lipídico Completo:</strong> Mide colesterol total, HDL, LDL y triglicéridos.</li>
            <li><strong>Presión Arterial:</strong> Medición regular.</li>
            <li><strong>Circunferencia de Cintura:</strong> Un indicador clave de obesidad central.</li>
            <li><strong>Prueba de Tolerancia Oral a la Glucosa (PTOG):</strong> En casos específicos, para diagnosticar prediabetes o diabetes.</li>
            <li><strong>Marcadores Inflamatorios:</strong> Como la Proteína C Reactiva (PCR) ultrasensible, pueden ser útiles para evaluar la inflamación crónica asociada.</li>
        </ul>

        <p className="mt-8">La detección temprana de la resistencia a la insulina a través de herramientas como el HOMA-IR es crucial. Permite implementar intervenciones oportunas, principalmente a través de cambios en el estilo de vida (dieta saludable, ejercicio regular, manejo del estrés), que pueden prevenir o retrasar significativamente la progresión hacia enfermedades crónicas y mejorar la calidad de vida. Consulte siempre a un profesional de la salud para una interpretación adecuada de sus resultados y un plan de tratamiento personalizado.</p>
    </div>
</section>

                {/* Ad Banner bottom */}
                
                <StudyCTA 
                    title={`Diagnostica tu Resistencia a la Insulina`} 
                    description={`Tener glucosa "normal" engaña. Si el cuerpo segrega demasiada Insulina Basal, subirás de peso. Determinar este índice requiere medir Insulina y Glucosa simultáneamente en ayuno.`} 
                    actionText={`Cotizar Insulina y Glucosa (HOMA)`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Insulina%20y%20Glucosa%20(HOMA)*`} 
                    type="estudio" 
                />
                
                <RelatedTools currentPath="/herramientas/indice-homa-ir" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
