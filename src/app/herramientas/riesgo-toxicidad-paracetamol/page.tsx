'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ToxicidadParacetamolPage() {
    const [peso, setPeso] = useState('');
    const [dosisMg, setDosisMg] = useState('');
    const [horas, setHoras] = useState('');
    const [resultado, setResultado] = useState<{ nivel: string; color: string; bg: string; mensaje: string; mgKg: number } | null>(null);

    const calcularRiesgo = () => {
        const p = parseFloat(peso);
        const d = parseFloat(dosisMg);
        const h = parseFloat(horas);

        if (p > 0 && d > 0 && h >= 0) {
            const mgKg = d / p;

            // Rumack-Matthew simplificado e indicaciones clínicas generales
            let nivel = '';
            let color = '';
            let bg = '';
            let mensaje = '';

            if (mgKg < 75) {
                nivel = 'Bajo Riesgo';
                color = 'text-green-600';
                bg = 'bg-green-100';
                mensaje = 'Dosis subterapéutica o terapéutica normal. Es poco probable que haya toxicidad hepática. Monitoree síntomas.';
            } else if (mgKg >= 75 && mgKg <= 150) {
                nivel = 'Riesgo Moderado';
                color = 'text-yellow-600';
                bg = 'bg-yellow-100';
                mensaje = 'Dosis supraterapéutica. Existe un riesgo leve de toxicidad dependiendo del metabolismo basal de la persona y patologías previas.';
            } else if (mgKg > 150 && h <= 24) {
                nivel = 'Riesgo Alto (Emergencia Médica)';
                color = 'text-red-600';
                bg = 'bg-red-100';
                mensaje = 'Dosis considerada TÓXICA. El riesgo de necrosis hepática aguda es ALTO. Acuda a urgencias médicas inmediatamente para valoración de uso de N-Acetilcisteína.';
            } else {
                nivel = 'Valoración Clínica Urgente';
                color = 'text-orange-600';
                bg = 'bg-orange-100';
                mensaje = 'Dosis elevada o tiempo de evolución incierto. Requiere valoración médica inmediata y pruebas de función hepática.';
            }

            setResultado({ nivel, color, bg, mensaje, mgKg: parseFloat(mgKg.toFixed(1)) });
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-800 to-rose-900 py-12 px-4 shadow-inner">
                <div className="max-w-4xl mx-auto">
                    <Link href="/herramientas" className="text-rose-200 hover:text-white text-sm mb-4 inline-block font-medium transition-colors">
                        ← Regresar a Calculadoras Médicas
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
                        ☠️ Riesgo de Toxicidad por Paracetamol
                    </h1>
                    <p className="text-xl text-rose-100 font-light max-w-2xl">
                        Calculadora clínica basada en la dosis ingerida para evaluar el peligro de daño hepático agudo.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 -mt-8">
                {/* Calculator Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 mb-10 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                Peso del Paciente (kg)
                            </label>
                            <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Ej: 75"
                                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none text-xl text-gray-800 transition-all font-medium" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                Dosis Ingerida (mg)
                            </label>
                            <input type="number" value={dosisMg} onChange={(e) => setDosisMg(e.target.value)} placeholder="Ej: 8000 (8 gramos)"
                                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none text-xl text-gray-800 transition-all font-medium" />
                            <p className="text-xs text-gray-500 mt-2">1 pastilla típica = 500mg</p>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                Horas desde Ingestión
                            </label>
                            <input type="number" value={horas} onChange={(e) => setHoras(e.target.value)} placeholder="Ej: 4"
                                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none text-xl text-gray-800 transition-all font-medium" />
                        </div>
                    </div>

                    <button onClick={calcularRiesgo}
                        className="w-full bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-1">
                        Calcular Carga Tóxica
                    </button>

                    {/* Result */}
                    {resultado && (
                        <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className={`${resultado.bg} border-2 border-t-8 border-current rounded-3xl p-8 text-center shadow-inner`}>
                                <p className="text-sm font-bold tracking-widest uppercase text-gray-600 mb-2">Evaluación de Sobredosis</p>
                                <p className={`text-4xl md:text-5xl font-black ${resultado.color} mb-4`}>{resultado.nivel}</p>

                                <div className="inline-flex justify-center flex-wrap gap-4 mb-6">
                                    <div className="bg-white/60 px-4 py-2 rounded-lg text-gray-800 font-medium">
                                        Carga: <span className="font-bold">{resultado.mgKg} mg/kg</span>
                                    </div>
                                </div>

                                <p className="text-gray-800 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                                    {resultado.mensaje}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Ad Banner */}
                <AdBanner variant="horizontal" className="mb-10" />

                {/* SEO Visible Information Block */}
                <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-10 p-8 md:p-12">
                    <h2 className="text-3xl font-extrabold text-red-900 mb-6 flex items-center gap-3">
                        <span className="text-4xl">🔬</span> Guía Clínica: Intoxicación por Paracetamol (Acetaminofén)
                    </h2>

                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                        <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-red-700 first-letter:float-left first-letter:mr-3">
                            El <strong>Paracetamol</strong> es el analgésico y antipirético más utilizado a nivel mundial debido a su venta libre, sin embargo, es la causa número uno de fallo hepático agudo fulminante cuando se consume en dosis supraterapéuticas. La ventana de oportunidad médica para salvar el hígado del paciente depende críticamente de las horas transcurridas desde la ingestión.
                        </p>

                        <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100 my-8">
                            <h3 className="text-xl font-bold text-rose-800 mb-3 block">Fisiopatología: ¿Cómo destruye el hígado?</h3>
                            <p>
                                A dosis terapéuticas normales, el paracetamol se metaboliza de forma segura en el hígado mediante procesos de sulfatación y glucuronidación. Sin embargo, en caso de sobredosis, estas vías enzimáticas se saturan. El cuerpo se ve obligado a utilizar una vía alternativa (el citocromo P450), lo cual genera un metabolito altamente tóxico llamado <strong>N-acetil-p-benzoquinonaimina (NAPQI)</strong>.
                                Si las reservas de glutatión (el antioxidante protector del hígado) se agotan, el NAPQI libre ataca las células hepáticas, provocando necrosis centrolobulillar rápida y masiva.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Dosis Tóxica (Adultos)</h3>
                                <p className="text-sm">Una dosis aguda superior a <strong>150 miligramos por kilogramo de peso</strong> o ingerir más de 7 a 10 gramos (unas 15 a 20 pastillas de 500mg) en un periodo de 24 horas representa un grave peligro de necrosis hepática. Para niños el umbral suele ser superior a 200 mg/kg.</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border-2 border-red-500 shadow-md">
                                <h3 className="text-xl font-bold text-red-700 mb-2">El Antídoto (NAC)</h3>
                                <p className="text-sm text-gray-800">El tratamiento médico definitivo en urgencias es la administración de <strong>N-acetilcisteína (NAC)</strong>. Si se administra por vía intravenosa dentro de las primeras 8 horas post-ingestión de sobredosis, la efectividad para prevenir el daño al hígado es casi del 100%.</p>
                            </div>
                        </div>

                        <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-2xl my-8">
                            <h3 className="text-xl font-bold text-red-900 mb-2">🚨 Banderas Rojas (Fases Clínicas)</h3>
                            <p className="mb-3">La intoxicación es traicionera porque las primeras 24 horas el paciente puede sentirse completamente sano (Fase Latente). Busque ayuda si experimenta:</p>
                            <ul className="list-none space-y-2">
                                <li className="flex gap-2"><span className="text-red-500 font-bold">»</span> <strong>Fase I (0-24 hrs):</strong> Náuseas, vómitos, letargo o palidez extrema sin justificación.</li>
                                <li className="flex gap-2"><span className="text-red-500 font-bold">»</span> <strong>Fase II (24-72 hrs):</strong> Dolor intenso en el Cuadrante Superior Derecho (zona del hígado) con aparente mejoría estomacal.</li>
                                <li className="flex gap-2"><span className="text-red-500 font-bold">»</span> <strong>Fase III (72-96 hrs):</strong> Piel y ojos amarillos (ictericia), confusión mental severa o sangrados espontáneos.</li>
                            </ul>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Nomograma de Rumack-Matthew</h3>
                        <p>
                            En el ámbito hospitalario, los urgenciólogos utilizan el <strong>Nomograma de Rumack-Matthew</strong>, un gráfico que cruza la cantidad de paracetamol en sangre con las horas transcurridas desde la sobredosis para decidir científicamente si el paciente requiere el antídoto intravenoso. Esta calculadora ofrece una aproximación clínica, pero <strong>jamás sustituye los estudios de química sanguínea</strong> realizados en un laboratorio.
                        </p>
                    </div>
                </section>

                <StudyCTA
                    title="¿Temes que tu hígado o riñón estén sobrecargados de analgésicos?"
                    description="Si has consumido paracetamol de manera crónica, la Pruebas de Funcionamiento Hepático pueden salvar tu vida detectando necrosis antes de notar síntomas como la piel amarilla."
                    actionText="Cotizar Química Sanguínea de Hígado"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20saber%20qué%20precio%20tiene%20el%20perfil%20hepático%20(PFH)%20que%20me%20recomienda%20la%20página."
                    type="estudio"
                />
            </div>
        </main>
    );
}
