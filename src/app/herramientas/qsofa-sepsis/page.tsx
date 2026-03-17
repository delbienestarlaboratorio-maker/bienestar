'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function QsofaSepsisPage() {
    const [fr, setFr] = useState(false);
    const [pas, setPas] = useState(false);
    const [gcs, setGcs] = useState(false);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const total = (fr ? 1 : 0) + (pas ? 1 : 0) + (gcs ? 1 : 0);
        let label = '', color = '', bg = '', desc = '';
        if (total >= 2) {
            label = 'ALTO RIESGO de sepsis — activar protocolo'; color = 'text-red-700'; bg = 'bg-red-50';
            desc = 'qSOFA ≥2 predice mortalidad hospitalaria >10%. Activar protocolo de sepsis: hemocultivos, lactato sérico, antibiótico empírico IV en la primera hora, cristaloides 30 mL/kg. Solicitar procalcitonina.';
        } else if (total === 1) {
            label = 'Riesgo intermedio — vigilancia estrecha'; color = 'text-orange-700'; bg = 'bg-orange-50';
            desc = 'Un criterio positivo aislado no descarta sepsis. Monitorear signos vitales cada 1-2 horas. Considerar solicitar lactato sérico y biometría hemática si hay sospecha clínica de infección.';
        } else {
            label = 'Bajo riesgo de sepsis'; color = 'text-green-700'; bg = 'bg-green-50';
            desc = 'Sin criterios qSOFA positivos. Continuar evaluación clínica habitual. Si persiste sospecha de infección, solicitar laboratorios (BH, PCR, procalcitonina) y reevaluar.';
        }
        setResultado({ total, label, color, bg, desc });
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-rose-800 to-red-900 py-10 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-rose-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🦠 Score qSOFA — Detección Rápida de Sepsis</h1>
                    <p className="text-rose-100 mt-2 text-lg">Quick Sequential Organ Failure Assessment — identifica pacientes con sospecha de infección que pueden tener mal pronóstico</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
                        <p className="text-red-800 text-sm"><strong>⏰ El tiempo salva vidas:</strong> La sepsis requiere tratamiento en la primera hora. Por cada hora de retraso en antibiótico, la mortalidad aumenta 7.6%.</p>
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mb-4">Criterios qSOFA (marque los presentes):</h2>

                    {[
                        { checked: fr, set: setFr, label: 'Frecuencia respiratoria ≥ 22 respiraciones/minuto', desc: 'Cuente las respiraciones durante 30 segundos y multiplique por 2', emoji: '🫁' },
                        { checked: pas, set: setPas, label: 'Presión arterial sistólica ≤ 100 mmHg', desc: 'Tome la presión arterial — la cifra de arriba debe ser ≤ 100', emoji: '💉' },
                        { checked: gcs, set: setGcs, label: 'Alteración del estado mental (Glasgow < 15)', desc: 'El paciente está confuso, somnoliento, desorientado o responde lento', emoji: '🧠' },
                    ].map((item, i) => (
                        <label key={i} className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all mb-3 ${item.checked ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                            <input type="checkbox" checked={item.checked} onChange={() => item.set(!item.checked)} className="w-6 h-6 mt-1 rounded text-red-600" />
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">{item.emoji}</span>
                                    <span className="font-bold text-gray-800">{item.label}</span>
                                </div>
                                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                            </div>
                        </label>
                    ))}

                    <button onClick={calcular} className="w-full bg-red-800 hover:bg-red-900 text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg mt-4">
                        Evaluar qSOFA
                    </button>

                    {resultado && (
                        <div className="mt-8">
                            <div className={`rounded-2xl p-6 text-center ${resultado.bg} border`}>
                                <p className="text-sm text-gray-600">Score qSOFA</p>
                                <p className={`text-6xl font-black ${resultado.color}`}>{resultado.total}/3</p>
                                <p className={`text-xl font-bold ${resultado.color} mt-2`}>{resultado.label}</p>
                                <p className="text-gray-700 text-sm mt-3 max-w-lg mx-auto">{resultado.desc}</p>
                            </div>
                        </div>
                    )}
                </div>

                <AdBanner variant="horizontal" className="mb-8" />

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Guía Médica: Detección de Sepsis con qSOFA</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>El <strong>qSOFA</strong> (quick SOFA) fue introducido en 2016 como parte de la definición Sepsis-3 (Singer et al., JAMA). Es una herramienta de tamizaje que <strong>NO requiere laboratorios</strong> — se puede aplicar a la cabecera del paciente en menos de 1 minuto.</p>
                        <p>Su principal utilidad es identificar pacientes con sospecha de infección que tienen riesgo elevado de <strong>muerte hospitalaria o estancia prolongada en UCI</strong>.</p>

                        <h3 className="text-xl font-bold text-gray-800 mt-6">Protocolo de Sepsis — «La Hora Dorada»</h3>
                        <p>Si qSOFA ≥ 2, active el protocolo SEP-1 en la <strong>primera hora</strong>:</p>
                        <ol>
                            <li><strong>Medir lactato sérico</strong> — si &gt;2 mmol/L, indica hipoperfusión</li>
                            <li><strong>Hemocultivos</strong> — 2 sets (4 botellas) ANTES del antibiótico</li>
                            <li><strong>Antibiótico IV empírico</strong> de amplio espectro</li>
                            <li><strong>Cristaloides 30 mL/kg</strong> si hay hipotensión o lactato &gt;4</li>
                        </ol>

                        <h3 className="text-xl font-bold text-gray-800 mt-6">Laboratorios para sepsis</h3>
                        <ul>
                            <li><a href="/estudios" className="text-blue-600 font-semibold hover:underline">Biometría hemática completa</a> — leucocitosis, leucopenia o bandemia</li>
                            <li><a href="/estudios" className="text-blue-600 font-semibold hover:underline">Procalcitonina</a> — marcador específico de infección bacteriana</li>
                            <li><a href="/estudios" className="text-blue-600 font-semibold hover:underline">Lactato sérico</a> — marcador de perfusión tisular</li>
                            <li><a href="/estudios" className="text-blue-600 font-semibold hover:underline">Química sanguínea y electrolitos</a> — función renal y hepática</li>
                            <li><a href="/estudios" className="text-blue-600 font-semibold hover:underline">Gasometría arterial</a> — estado ácido-base</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 mb-8">
                    <strong>⚠️ Aviso:</strong> Un qSOFA bajo NO descarta sepsis. Si hay sospecha clínica de infección, solicite laboratorios completos independientemente del resultado. La sepsis requiere atención médica urgente.
                </div>

                
                <RelatedTools currentPath="/herramientas/qsofa-sepsis" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
