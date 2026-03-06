'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function CalculadoraTMBPage() {
    const [genero, setGenero] = useState<'masculino' | 'femenino'>('femenino');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [edad, setEdad] = useState('');
    const [actividad, setActividad] = useState('1.2'); // Sedentario por defecto
    const [objetivo, setObjetivo] = useState('mantener');

    const [resultado, setResultado] = useState<{
        tmb: number; // Basal Metabolic Rate
        tdee: number; // Total Daily Energy Expenditure
        objetivoCalorias: number;
    } | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        const p = parseFloat(peso);
        const a = parseFloat(altura); // cm
        const e = parseFloat(edad);
        const act = parseFloat(actividad);

        if (p > 0 && a > 0 && e > 0) {
            // Fórmula Mifflin-St Jeor
            let tmb = (10 * p) + (6.25 * a) - (5 * e);
            if (genero === 'masculino') {
                tmb += 5;
            } else {
                tmb -= 161;
            }

            // Gasto Energético Total (TDEE)
            let tdee = tmb * act;

            // Calorías según objetivo
            let objetivoCalorias = tdee;
            if (objetivo === 'perder_leve') objetivoCalorias *= 0.85; // Déficit 15%
            if (objetivo === 'perder_fuerte') objetivoCalorias *= 0.75; // Déficit 25%
            if (objetivo === 'ganar_leve') objetivoCalorias *= 1.10; // Superávit 10%
            if (objetivo === 'ganar_fuerte') objetivoCalorias *= 1.20; // Superávit 20%

            setResultado({
                tmb: Math.round(tmb),
                tdee: Math.round(tdee),
                objetivoCalorias: Math.round(objetivoCalorias)
            });
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-800 to-emerald-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-teal-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🔥 TMB Ajustada (Mifflin-St Jeor)</h1>
                    <p className="text-teal-100 mt-2">Calculadora de Tasa Metabólica Basal y Gasto Energético Total</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Calculator */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => setGenero('femenino')}
                            className={`flex-1 py-3 rounded-xl font-bold transition-colors ${genero === 'femenino' ? 'bg-pink-100 text-pink-700 border-2 border-pink-400' : 'bg-gray-100 text-gray-500 border-2 border-transparent hover:bg-gray-200'}`}>
                            👩 Femenino
                        </button>
                        <button
                            onClick={() => setGenero('masculino')}
                            className={`flex-1 py-3 rounded-xl font-bold transition-colors ${genero === 'masculino' ? 'bg-blue-100 text-blue-700 border-2 border-blue-400' : 'bg-gray-100 text-gray-500 border-2 border-transparent hover:bg-gray-200'}`}>
                            👨 Masculino
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Edad (años)</label>
                            <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="Ej: 30"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Peso (kg)</label>
                            <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Ej: 70"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Altura (cm)</label>
                            <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="Ej: 165"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-lg text-gray-800" />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nivel de Actividad Física</label>
                        <select value={actividad} onChange={(e) => setActividad(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-gray-800 bg-white cursor-pointer">
                            <option value="1.2">🛋️ Sedentario (Poco o ningún ejercicio)</option>
                            <option value="1.375">🚶 Ligeramente Activo (Ejercicio ligero 1-3 días/sem)</option>
                            <option value="1.55">🏃 Moderadamente Activo (Ejercicio moderado 3-5 días/sem)</option>
                            <option value="1.725">🏋️ Muy Activo (Ejercicio intenso 6-7 días/sem)</option>
                            <option value="1.9">🔥 Extra Activo (Trabajo físico muy duro o doble entreno)</option>
                        </select>
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Objetivo Nutricional</label>
                        <select value={objetivo} onChange={(e) => setObjetivo(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-gray-800 bg-white cursor-pointer">
                            <option value="perder_fuerte">📉 Pérdida Agresiva (-25% déficit)</option>
                            <option value="perder_leve">📉 Pérdida Sostenible (-15% déficit)</option>
                            <option value="mantener">⚖️ Mantenimiento (Igual)</option>
                            <option value="ganar_leve">📈 Ganancia Muscular Magra (+10% superávit)</option>
                            <option value="ganar_fuerte">📈 Volumen Muscular / Bulking (+20% superávit)</option>
                        </select>
                    </div>

                    <button onClick={calcular}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                        Calcular Gasto Metabólico
                    </button>

                    {/* Result */}
                    {resultado !== null && (
                        <div className="mt-8 animate-in fade-in">
                            {/* Main Goal Result */}
                            <div className={`rounded-2xl p-6 text-center mb-6 
                                ${objetivo.includes('perder') ? 'bg-orange-50 text-orange-900 border border-orange-200' :
                                    objetivo.includes('ganar') ? 'bg-indigo-50 text-indigo-900 border border-indigo-200' :
                                        'bg-teal-50 text-teal-900 border border-teal-200'}`}>
                                <p className="text-sm font-bold opacity-80 mb-1">Tu objetivo requiere consumir:</p>
                                <p className="text-6xl font-black mb-2">{resultado.objetivoCalorias}</p>
                                <p className="text-xl font-bold opacity-90">Kcal / día</p>
                            </div>

                            {/* Detailed Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-6 relative">
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col items-center">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl mb-2">🔋</div>
                                    <p className="text-xs text-gray-500 font-bold mb-1 text-center">Metabolismo Basal (TMB)</p>
                                    <p className="text-2xl font-bold text-gray-800">{resultado.tmb} <span className="text-sm text-gray-500">kcal</span></p>
                                    <p className="text-[10px] text-gray-400 text-center mt-1">Calorías quemadas en reposo total</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col items-center">
                                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-xl mb-2">⚡</div>
                                    <p className="text-xs text-gray-500 font-bold mb-1 text-center">Gasto Total (TDEE)</p>
                                    <p className="text-2xl font-bold text-gray-800">{resultado.tdee} <span className="text-sm text-gray-500">kcal</span></p>
                                    <p className="text-[10px] text-gray-400 text-center mt-1">Calorías quemadas con actividad actual</p>
                                </div>
                            </div>

                            {/* Study recommendation - Thyroid focus since metabolism depends on it */}
                            <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-6">
                                <h3 className="font-bold text-teal-900 text-lg mb-3">🦋 ¿Tu metabolismo está lento? Evalúa tu Tiroides</h3>
                                <p className="text-gray-600 text-sm mb-4">Las fórmulas matemáticas asumen que tu glándula tiroidea funciona perfectamente. Si estás comiendo poco y no bajas de peso, tu TMB real podría estar afectada por un problema metabólico oculto:</p>
                                <div className="space-y-3">
                                    {[
                                        { name: 'Perfil Tiroideo Básico (TSH, T3, T4)', reason: 'Detecta hipotiroidismo (metabolismo lento) o hipertiroidismo (metabolismo acelerado)' },
                                        { name: 'Insulina Basal (HOMA-IR)', reason: 'La resistencia a la insulina bloquea la quema de grasa sin importar cuántas calorías reduzcas' },
                                    ].map((study) => (
                                        <div key={study.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
                                            <span className="text-teal-600 mt-1">✓</span>
                                            <div>
                                                <p className="font-semibold text-gray-800 text-sm">{study.name}</p>
                                                <p className="text-gray-500 text-xs">{study.reason}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/estudios/analisis-clinicos"
                                    className="mt-4 inline-block bg-teal-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-teal-800 transition-colors">
                                    Ver Perfiles Hormonales →
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Ad Banner */}
                
                <StudyCTA 
                    title={`Equilibrio Energético Integral`} 
                    description={`Para lograr el balance de esta calculadora en dietas prolongadas, vigilar los perfiles de Sodio, Potasio y Magnesio asegura que evites caídas en tu desempeño y calambres.`} 
                    actionText={`Consulta Nutricional y Panel`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Consulta%20Nutricional%20y%20Panel*`} 
                    type="doctor" 
                />
                <AdBanner variant="horizontal" className="mb-8" />

                {/* SEO Content GPT Injected */}
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía Médica y Científica Exhaustiva</h2>
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        <p>
            En el "Laboratorio del Bienestar", entendemos que la gestión del peso y la optimización de la salud comienzan con una comprensión profunda de cómo nuestro cuerpo utiliza la energía. Nuestra calculadora de Tasa Metabólica Basal (TMB) y Gasto Energético Total (GET), basada en la precisa fórmula de Mifflin-St Jeor, es una herramienta fundamental para este propósito. Este artículo profundiza en la ciencia detrás de estas métricas vitales, su fisiopatología, cómo interpretar sus resultados y cuándo buscar atención médica adicional.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 flex items-center gap-2">🔬 Fisiopatología de la TMB y el GET</h3>
        <p>
            La <strong>Tasa Metabólica Basal (TMB)</strong> representa la cantidad mínima de energía (calorías) que tu cuerpo necesita para mantener sus funciones vitales básicas en reposo absoluto. Esto incluye procesos esenciales como la respiración, la circulación sanguínea, la regulación de la temperatura corporal, la función cerebral y la reparación celular. Es, en esencia, el "costo de mantenimiento" de tu organismo.
        </p>
        <p>
            La TMB está influenciada por varios factores fisiológicos:
        </p>
        <ul>
            <li><strong>Edad:</strong> Disminuye con la edad, principalmente debido a la pérdida de masa muscular y cambios hormonales.</li>
            <li><strong>Género:</strong> Los hombres suelen tener una TMB más alta que las mujeres debido a una mayor proporción de masa muscular.</li>
            <li><strong>Peso y Altura:</strong> Un mayor peso y altura generalmente se correlacionan con una TMB más alta, ya que hay más tejido corporal que mantener.</li>
            <li><strong>Composición Corporal:</strong> El tejido muscular es metabólicamente más activo que el tejido adiposo, por lo que una mayor masa muscular aumenta la TMB.</li>
            <li><strong>Factores Hormonales:</strong> Hormonas tiroideas (T3 y T4) son reguladores clave del metabolismo. Un hipertiroidismo puede elevar la TMB, mientras que un hipotiroidismo la disminuye. Otras hormonas como la insulina, el cortisol y las hormonas sexuales también influyen.</li>
            <li><strong>Genética:</strong> Existe una predisposición genética a tener una TMB naturalmente más alta o más baja.</li>
        </ul>
        <p>
            El <strong>Gasto Energético Total (GET)</strong>, también conocido como Gasto Energético Diario Total (TDEE por sus siglas en inglés), es la suma de tu TMB y la energía adicional que consumes a lo largo del día. Se compone de tres elementos principales:
        </p>
        <ol>
            <li><strong>TMB:</strong> Como se describió anteriormente, es el gasto energético en reposo.</li>
            <li><strong>Efecto Termogénico de los Alimentos (ETA):</strong> La energía requerida para digerir, absorber y metabolizar los nutrientes de los alimentos. Representa aproximadamente el 10% del GET.</li>
            <li><strong>Actividad Física y Termogénesis de la Actividad No Ejercicio (NEAT):</strong> La energía gastada durante el ejercicio intencional y todas las demás actividades físicas no relacionadas con el ejercicio (caminar, estar de pie, gesticular, etc.). Este es el componente más variable y modificable del GET.</li>
        </ol>
        <p>
            La fórmula de Mifflin-St Jeor es una de las ecuaciones predictivas más utilizadas y validadas para estimar la TMB, ofreciendo una aproximación razonablemente precisa para la mayoría de los adultos.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 flex items-center gap-2">📈 Interpretación Clínica de Resultados Altos y Bajos</h3>
        <p>
            Comprender si tu TMB o GET son "altos" o "bajos" en relación con los valores esperados para tus características es crucial para establecer objetivos de salud realistas.
        </p>
        <h4>Resultados de TMB/GET Altos:</h4>
        <ul>
            <li><strong>Significado:</strong> Tu cuerpo quema más calorías en reposo o a lo largo del día de lo que se consideraría promedio para tu edad, género, peso y altura.</li>
            <li><strong>Causas Comunes:</strong>
                <ul>
                    <li>Mayor masa muscular.</li>
                    <li>Edad más joven.</li>
                    <li>Nivel de actividad física elevado.</li>
                    <li>Condiciones como hipertiroidismo, fiebre, estrés significativo o ciertas enfermedades crónicas.</li>
                </ul>
            </li>
            <li><strong>Implicaciones:</strong> Necesitarás una ingesta calórica mayor para mantener tu peso. Si tu objetivo es ganar peso (masa muscular), el superávit calórico requerido será mayor. Si buscas perder peso, el déficit calórico puede ser más fácil de lograr, pero aún debe ser manejado cuidadosamente.</li>
        </ul>
        <h4>Resultados de TMB/GET Bajos:</h4>
        <ul>
            <li><strong>Significado:</strong> Tu cuerpo quema menos calorías en reposo o a lo largo del día de lo que se consideraría promedio.</li>
            <li><strong>Causas Comunes:</strong>
                <ul>
                    <li>Mayor edad.</li>
                    <li>Menor masa muscular y mayor porcentaje de grasa corporal.</li>
                    <li>Estilo de vida sedentario.</li>
                    <li>Condiciones como hipotiroidismo, privación severa de calorías (adaptación metabólica), o ciertos medicamentos.</li>
                </ul>
            </li>
            <li><strong>Implicaciones:</strong> Necesitarás una ingesta calórica menor para mantener tu peso. La pérdida de peso puede ser más desafiante, requiriendo un control más estricto de las calorías y un aumento de la actividad física. La ganancia de peso puede ocurrir con una ingesta calórica moderada.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 flex items-center gap-2">🚨 Banderas Rojas (Red Flags)</h3>
        <p>
            Si bien nuestra calculadora es una excelente herramienta de estimación, hay situaciones en las que los resultados o tu experiencia personal deberían motivarte a buscar una evaluación médica profesional:
        </p>
        <ul>
            <li><strong>Discrepancia Extrema:</strong> Si tus resultados calculados no se alinean en absoluto con tu experiencia (ej. ganas peso fácilmente con una ingesta calórica muy baja, o pierdes peso sin esfuerzo con una ingesta alta).</li>
            <li><strong>Síntomas de Disfunción Tiroidea:</strong>
                <ul>
                    <li><strong>Hipotiroidismo:</strong> Fatiga persistente, aumento de peso inexplicable, intolerancia al frío, piel seca, estreñimiento, voz ronca.</li>
                    <li><strong>Hipertiroidismo:</strong> Pérdida de peso inexplicable, nerviosismo, palpitaciones, intolerancia al calor, temblores, sudoración excesiva.</li>
                </ul>
            </li>
            <li><strong>Cambios de Peso Inexplicables:</strong> Ganancia o pérdida de peso significativa sin cambios en la dieta o el nivel de actividad.</li>
            <li><strong>Fatiga Crónica o Falta de Energía:</strong> Que no mejora con el descanso adecuado.</li>
            <li><strong>Dificultad Persistente para Alcanzar Objetivos:</strong> Si a pesar de seguir un plan dietético y de ejercicio consistente, no logras tus metas de peso o composición corporal.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 flex items-center gap-2">🧪 Estudios de Laboratorio Recomendados</h3>
        <p>
            Para una evaluación más profunda de tu metabolismo y salud general, tu médico podría recomendar los siguientes estudios:
        </p>
        <ul>
            <li><strong>Panel Tiroideo Completo:</strong>
                <ul>
                    <li><strong>TSH (Hormona Estimulante de la Tiroides):</strong> Indicador principal de la función tiroidea.</li>
                    <li><strong>T4 Libre y T3 Libre:</strong> Miden los niveles de hormonas tiroideas activas.</li>
                    <li><strong>Anticuerpos Tiroideos:</strong> Para descartar enfermedades autoinmunes de la tiroides.</li>
                </ul>
            </li>
            <li><strong>Glucosa en Ayunas y Hemoglobina Glicosilada (HbA1c):</strong> Para evaluar el metabolismo de la glucosa y el riesgo de diabetes o resistencia a la insulina.</li>
            <li><strong>Perfil Lipídico:</strong> Colesterol total, HDL, LDL y triglicéridos, importantes para la salud cardiovascular y metabólica.</li>
            <li><strong>Hemograma Completo (CBC):</strong> Para detectar anemia u otras condiciones que puedan afectar los niveles de energía.</li>
            <li><strong>Vitamina D:</strong> Niveles adecuados son importantes para la salud ósea, inmunológica y metabólica.</li>
            <li><strong>Análisis de Composición Corporal:</strong> Métodos como la absorciometría de rayos X de energía dual (DEXA) o la bioimpedancia eléctrica pueden proporcionar una medición más precisa de la masa muscular y grasa, lo que influye directamente en la TMB.</li>
            <li><strong>Calorimetría Indirecta:</strong> Considerado el "estándar de oro" para medir la TMB real. Aunque no es de rutina, puede ser útil en casos complejos para obtener una medición precisa del gasto energético en reposo.</li>
        </ul>
        <p>
            En "Laboratorio del Bienestar", te animamos a usar nuestras herramientas como un punto de partida para tu viaje de salud. Siempre consulta con un profesional de la salud para un diagnóstico y plan de tratamiento personalizados.
        </p>
    </div>
</section>

                {/* Ad Banner bottom */}
                
                <StudyCTA 
                    title={`Equilibrio Energético Integral`} 
                    description={`Para lograr el balance de esta calculadora en dietas prolongadas, vigilar los perfiles de Sodio, Potasio y Magnesio asegura que evites caídas en tu desempeño y calambres.`} 
                    actionText={`Consulta Nutricional y Panel`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Consulta%20Nutricional%20y%20Panel*`} 
                    type="doctor" 
                />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
