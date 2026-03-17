'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

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
                
                <StudyCTA 
                    title={`¿Tu IMC está fuera de rango?`} 
                    description={`El Índice de Masa Corporal es un indicador básico. Para conocer tu salud metabólica real, incluyendo posibles hígados grasos o riesgo de diabetes, se sugiere un Check-Up Metabólico o una Química Sanguínea Completa.`} 
                    actionText={`Cotizar Check-Up Metabólico`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Check-Up%20Metab%C3%B3lico*`} 
                    type="checkup" 
                />
                <AdBanner variant="horizontal" className="mb-8" />

                <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía Médica y Científica Exhaustiva del IMC</h2>
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        <p>
            El Índice de Masa Corporal (IMC) es una herramienta de cribado sencilla y ampliamente utilizada para evaluar si el peso de una persona es saludable en relación con su altura. Desarrollado por Adolphe Quetelet en el siglo XIX, el IMC se calcula dividiendo el peso en kilogramos por el cuadrado de la altura en metros (IMC = kg/m²). Aunque no mide directamente la grasa corporal, es un indicador útil para identificar categorías de peso que pueden estar asociadas con un mayor riesgo de problemas de salud.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 flex items-center gap-2">💡 Fisiopatología y Relevancia Clínica del IMC</h3>
        <p>
            La relación entre el IMC y la salud se basa en la observación de que un exceso o una deficiencia significativa de peso pueden impactar negativamente en la fisiología del cuerpo.
        </p>
        <ul className="list-disc pl-6 space-y-2">
            <li>
                <strong>IMC Elevado (Sobrepeso y Obesidad):</strong> Un IMC alto suele correlacionarse con un exceso de tejido adiposo. Este tejido, especialmente el visceral (alrededor de los órganos abdominales), no es inerte; es metabólicamente activo y secreta adipocinas y mediadores inflamatorios. Esto puede conducir a un estado de inflamación crónica de bajo grado, resistencia a la insulina, dislipidemia (alteraciones en los lípidos sanguíneos) e hipertensión arterial. Estos factores son pilares en el desarrollo de enfermedades cardiovasculares, diabetes mellitus tipo 2, ciertos tipos de cáncer (mama, colon, riñón, esófago), apnea del sueño, osteoartritis y enfermedad del hígado graso no alcohólico. La carga mecánica sobre las articulaciones y el sistema cardiovascular también aumenta.
            </li>
            <li>
                <strong>IMC Bajo (Bajo Peso):</strong> Un IMC por debajo del rango normal puede indicar una ingesta calórica y nutricional insuficiente, malabsorción, o la presencia de enfermedades crónicas subyacentes (como hipertiroidismo, enfermedad inflamatoria intestinal, cáncer, tuberculosis, o trastornos de la alimentación). El bajo peso se asocia con un sistema inmunitario debilitado, mayor riesgo de infecciones, osteoporosis, anemia, deficiencias vitamínicas, pérdida de masa muscular (sarcopenia), problemas de fertilidad y, en casos extremos, desnutrición severa con riesgo vital.
            </li>
        </ul>
        <p>
            Es crucial recordar que el IMC es una medida indirecta y no distingue entre masa muscular y masa grasa. Por ejemplo, atletas con gran masa muscular pueden tener un IMC elevado sin un exceso de grasa corporal, mientras que personas mayores con sarcopenia pueden tener un IMC "normal" pero con un porcentaje de grasa corporal elevado (obesidad sarcopénica).
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 flex items-center gap-2">📊 Interpretación Clínica de los Resultados del IMC</h3>
        <ul className="list-disc pl-6 space-y-2">
            <li>
                <strong>IMC &lt; 18.5 (Bajo peso):</strong> Indica que el peso está por debajo del rango saludable. Es fundamental investigar la causa subyacente, que puede ser nutricional, metabólica o psicológica. Se recomienda una evaluación médica exhaustiva.
            </li>
            <li>
                <strong>IMC 18.5 - 24.9 (Peso normal):</strong> Generalmente asociado con el menor riesgo de enfermedades relacionadas con el peso. Mantener un estilo de vida saludable es clave.
            </li>
            <li>
                <strong>IMC 25.0 - 29.9 (Sobrepeso):</strong> Sugiere un peso por encima del rango ideal. Aumenta el riesgo de desarrollar enfermedades crónicas. Se aconseja una evaluación médica para discutir estrategias de manejo del peso y prevención.
            </li>
            <li>
                <strong>IMC 30.0 - 34.9 (Obesidad Grado I):</strong> Riesgo moderado de enfermedades metabólicas y cardiovasculares. La intervención médica y cambios en el estilo de vida son altamente recomendados.
            </li>
            <li>
                <strong>IMC 35.0 - 39.9 (Obesidad Grado II):</strong> Riesgo alto de complicaciones graves. Requiere un enfoque médico más intensivo, que puede incluir cambios en la dieta, ejercicio, farmacoterapia y, en algunos casos, cirugía bariátrica.
            </li>
            <li>
                <strong>IMC ≥ 40.0 (Obesidad Grado III o Mórbida):</strong> Riesgo muy alto y severo de enfermedades crónicas y mortalidad prematura. Se requiere atención médica especializada y un plan de tratamiento integral.
            </li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 flex items-center gap-2">⚠️ Banderas Rojas (Red Flags) Asociadas al IMC</h3>
        <p>
            Más allá del número del IMC, ciertos signos y síntomas deben alertar a buscar atención médica inmediata:
        </p>
        <ul className="list-disc pl-6 space-y-2">
            <li>
                <strong>Cambios de peso rápidos e inexplicables:</strong> Pérdida o ganancia significativa de peso sin cambios intencionales en dieta o ejercicio.
            </li>
            <li>
                <strong>Síntomas acompañantes:</strong> Fatiga extrema, debilidad muscular, dificultad para respirar, dolor en el pecho, palpitaciones, hinchazón, cambios en los hábitos intestinales, sed excesiva o micción frecuente.
            </li>
            <li>
                <strong>Comorbilidades existentes:</strong> Diagnóstico reciente de diabetes, hipertensión, dislipidemia, enfermedades cardíacas o renales.
            </li>
            <li>
                <strong>Problemas de salud mental:</strong> Preocupación excesiva por el peso o la imagen corporal, patrones de alimentación desordenados (anorexia, bulimia, trastorno por atracón).
            </li>
            <li>
                <strong>Distribución de grasa abdominal:</strong> Una circunferencia de cintura elevada (más de 102 cm en hombres y 88 cm en mujeres) es un indicador de riesgo cardiovascular, incluso con un IMC en el rango de sobrepeso.
            </li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 flex items-center gap-2">🧪 Estudios de Laboratorio Recomendados</h3>
        <p>
            Ante un IMC fuera del rango normal, especialmente en sobrepeso u obesidad, o en casos de bajo peso, se recomienda una serie de estudios para evaluar el estado de salud general y detectar posibles complicaciones o causas subyacentes:
        </p>
        <ul className="list-disc pl-6 space-y-2">
            <li>
                <strong>Perfil Metabólico:</strong>
                <ul className="list-circle pl-6 mt-1">
                    <li>Glucosa en ayunas y Hemoglobina Glicosilada (HbA1c): Para cribado y diagnóstico de prediabetes y diabetes.</li>
                    <li>Perfil Lipídico Completo: Colesterol total, HDL, LDL, Triglicéridos para evaluar el riesgo cardiovascular.</li>
                </ul>
            </li>
            <li>
                <strong>Función Hepática:</strong>
                <ul className="list-circle pl-6 mt-1">
                    <li>Transaminasas (ALT, AST): Para detectar daño hepático, común en la enfermedad del hígado graso no alcohólico.</li>
                </ul>
            </li>
            <li>
                <strong>Función Renal:</strong>
                <ul className="list-circle pl-6 mt-1">
                    <li>Creatinina sérica y Tasa de Filtración Glomerular (TFG): Para evaluar la función renal, que puede verse afectada por la diabetes y la hipertensión.</li>
                </ul>
            </li>
            <li>
                <strong>Función Tiroidea:</strong>
                <ul className="list-circle pl-6 mt-1">
                    <li>Hormona Estimulante de la Tiroides (TSH): Para descartar hipotiroidismo (que puede causar aumento de peso) o hipertiroidismo (que puede causar pérdida de peso).</li>
                </ul>
            </li>
            <li>
                <strong>Marcadores Inflamatorios:</strong>
                <ul className="list-circle pl-6 mt-1">
                    <li>Proteína C Reactiva de alta sensibilidad (hs-CRP): Puede indicar inflamación sistémica, un factor de riesgo cardiovascular.</li>
                </ul>
            </li>
            <li>
                <strong>Evaluación Nutricional (especialmente en bajo peso):</strong>
                <ul className="list-circle pl-6 mt-1">
                    <li>Hemograma completo: Para detectar anemia.</li>
                    <li>Niveles de Vitamina D, B12, Folato, Hierro: Para identificar deficiencias nutricionales.</li>
                    <li>Albúmina y Prealbúmina: Indicadores del estado nutricional proteico.</li>
                </ul>
            </li>
        </ul>
        <p>
            El IMC es una herramienta valiosa para una evaluación inicial, pero siempre debe interpretarse en el contexto clínico completo del paciente, considerando su historial médico, estilo de vida y otros factores de riesgo. La consulta con un profesional de la salud es esencial para un diagnóstico preciso y un plan de manejo personalizado.
        </p>
    </div>
</section>

                {/* Ad Banner bottom */}
                
                <StudyCTA 
                    title={`¿Tu IMC está fuera de rango?`} 
                    description={`El Índice de Masa Corporal es un indicador básico. Para conocer tu salud metabólica real, incluyendo posibles hígados grasos o riesgo de diabetes, se sugiere un Check-Up Metabólico o una Química Sanguínea Completa.`} 
                    actionText={`Cotizar Check-Up Metabólico`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Check-Up%20Metab%C3%B3lico*`} 
                    type="checkup" 
                />
                
                <RelatedTools currentPath="/herramientas/calculadora-imc" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
