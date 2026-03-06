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

                {/* SEO Content GPT Injected */}
<section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center gap-4">
        <span className="text-indigo-600">🩺</span> Guía Médica y Científica Exhaustiva: Entendiendo el MUST
    </h2>
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        <p className="mb-6">
            En "Laboratorio del Bienestar", nos dedicamos a ofrecer herramientas y conocimientos para una salud óptima. La malnutrición es un problema de salud pública significativo, a menudo subestimado, que afecta a millones. Para combatirla eficazmente, es crucial identificar a los individuos en riesgo de manera temprana. Aquí es donde el <strong>MUST (Malnutrition Universal Screening Tool)</strong>, una herramienta de cribado validada, juega un papel vital para detectar el riesgo de malnutrición en adultos.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-green-600">🔬</span> Fisiopatología de la Malnutrición
        </h3>
        <p className="mb-4">
            La malnutrición es un desequilibrio en la ingesta de energía, proteínas y otros nutrientes, con efectos adversos medibles en tejidos, función corporal y resultados clínicos. Puede manifestarse como desnutrición (ingesta insuficiente) o sobrenutrición (exceso, que puede coexistir con deficiencias de micronutrientes).
        </p>
        <p className="mb-4">
            Sus causas son multifactoriales:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
            <li><strong>Ingesta inadecuada:</strong> Anorexia, disfagia, problemas dentales, factores socioeconómicos.</li>
            <li><strong>Aumento de necesidades:</strong> Enfermedades agudas (infecciones, traumatismos, cirugías) o crónicas (cáncer, EPOC, insuficiencia orgánica).</li>
            <li><strong>Malabsorción:</strong> Enfermedad inflamatoria intestinal, celíaca, cirugía bariátrica.</li>
            <li><strong>Pérdida excesiva:</strong> Diarrea crónica, fístulas.</li>
        </ul>
        <p className="mb-6">
            Fisiopatológicamente, la malnutrición lleva a la depleción de reservas, catabolismo muscular, disfunción inmunitaria, cicatrización deficiente, debilidad y aumento de morbilidad/mortalidad.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-blue-600">📊</span> ¿Cómo funciona el MUST? Componentes y Puntuación
        </h3>
        <p className="mb-4">
            El MUST evalúa el riesgo de malnutrición basándose en tres criterios principales, asignando una puntuación a cada uno:
        </p>
        <ol className="list-decimal list-inside mb-4 pl-4">
            <li>
                <strong>Índice de Masa Corporal (IMC):</strong>
                <ul className="list-disc list-inside ml-4">
                    <li>IMC ≥ 20 kg/m²: Puntuación 0</li>
                    <li>IMC 18.5 - 20 kg/m²: Puntuación 1</li>
                    <li>IMC &lt; 18.5 kg/m²: Puntuación 2</li>
                </ul>
            </li>
            <li>
                <strong>Pérdida de Peso Involuntaria:</strong>
                <ul className="list-disc list-inside ml-4">
                    <li>Pérdida &lt; 5% en 3-6 meses: Puntuación 0</li>
                    <li>Pérdida 5-10% en 3-6 meses: Puntuación 1</li>
                    <li>Pérdida &gt; 10% en 3-6 meses: Puntuación 2</li>
                </ul>
            </li>
            <li>
                <strong>Efecto de Enfermedad Aguda:</strong>
                <ul className="list-disc list-inside ml-4">
                    <li>Sin efecto: Puntuación 0</li>
                    <li>Enfermo agudo sin ingesta &gt; 5 días: Puntuación 2</li>
                </ul>
            </li>
        </ol>
        <p className="mb-6">
            La puntuación total MUST es la suma de estos tres componentes.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-purple-600">📈</span> Interpretación Clínica de los Resultados
        </h3>
        <p className="mb-4">
            La puntuación MUST guía las acciones clínicas necesarias:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
            <li>
                <strong>Puntuación 0: Riesgo Bajo</strong> <span className="text-green-600">(✅)</span>
                <p className="ml-4 mt-1">
                    Atención clínica de rutina. Repetir cribado semanalmente (hospital) o mensualmente (asilos). Anualmente en la comunidad.
                </p>
            </li>
            <li>
                <strong>Puntuación 1: Riesgo Medio</strong> <span className="text-yellow-600">(⚠️)</span>
                <p className="ml-4 mt-1">
                    Observar. Documentar ingesta dietética 3 días. Si no mejora, considerar suplementación nutricional oral. Reevaluar semanalmente.
                </p>
            </li>
            <li>
                <strong>Puntuación ≥ 2: Riesgo Alto</strong> <span className="text-red-600">(🚨)</span>
                <p className="ml-4 mt-1">
                    Actuar de inmediato. Referir a nutriólogo clínico o equipo de soporte nutricional para evaluación y plan de tratamiento individualizado. Monitorear regularmente.
                </p>
            </li>
        </ul>
        <p className="mb-6">
            El MUST es una herramienta de cribado, no diagnóstica. Un resultado de riesgo alto requiere evaluación nutricional profunda por un profesional.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-red-600">🚩</span> Banderas Rojas (Red Flags)
        </h3>
        <p className="mb-4">
            Además del MUST, estas señales de advertencia requieren atención nutricional:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
            <li>Pérdida de peso involuntaria y rápida (ej. &gt;5% en 1 mes).</li>
            <li>IMC extremadamente bajo (&lt;17 kg/m²).</li>
            <li>Enfermedad aguda grave o crónica que afecta la ingesta/metabolismo (ej. cáncer avanzado, insuficiencia renal).</li>
            <li>Dificultad para tragar (disfagia) o masticar.</li>
            <li>Pérdida de apetito persistente o ingesta muy reducida &gt; 5 días.</li>
            <li>Signos clínicos de deficiencias de micronutrientes.</li>
            <li>Edema o ascitis inexplicables.</li>
            <li>Debilidad muscular severa o fatiga crónica.</li>
        </ul>
        <p className="mb-6">
            La detección temprana de estas banderas rojas es crucial para prevenir el deterioro nutricional y mejorar los resultados de salud.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-orange-600">🧪</span> Estudios de Laboratorio Recomendados
        </h3>
        <p className="mb-4">
            Aunque no hay un marcador único de malnutrición, varios estudios complementan la evaluación clínica y el cribado MUST:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
            <li><strong>Proteínas Viscerales:</strong> Albúmina sérica (indicador de inflamación/enfermedad crónica), Prealbúmina (cambios más agudos, también afectada por inflamación).</li>
            <li><strong>Marcadores Inflamatorios:</strong> Proteína C Reactiva (PCR) para evaluar inflamación.</li>
            <li><strong>Hemograma Completo (CBC):</strong> Puede revelar anemia u otras citopenias.</li>
            <li><strong>Electrolitos y Función Renal/Hepática:</strong> Para detectar desequilibrios y evaluar el metabolismo.</li>
            <li><strong>Vitaminas y Minerales Específicos:</strong> Si se sospechan deficiencias (ej. Vitamina D, B12, hierro).</li>
            <li><strong>Glucosa en Sangre:</strong> Para evaluar control metab��lico.</li>
        </ul>
        <p className="mb-6">
            La interpretación de estos resultados debe hacerse siempre en el contexto clínico global del paciente.
        </p>

        <p className="mb-4 text-center text-gray-600 italic">
            El cribado de malnutrición con herramientas como el MUST es un paso fundamental hacia una atención sanitaria proactiva. En "Laboratorio del Bienestar", te animamos a utilizar nuestras calculadoras como un recurso valioso para tu salud.
        </p>
    </div>
</section>

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
