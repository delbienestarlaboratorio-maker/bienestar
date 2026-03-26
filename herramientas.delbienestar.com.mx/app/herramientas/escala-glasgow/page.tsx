'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function EscalaGlasgowPage() {
    const [ocular, setOcular] = useState(0);
    const [verbal, setVerbal] = useState(0);
    const [motor, setMotor] = useState(0);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        if (ocular === 0 || verbal === 0 || motor === 0) return;
        const total = ocular + verbal + motor;
        let label = '', color = '', bg = '', desc = '', gravedad = '';
        if (total >= 13) {
            label = 'Traumatismo Craneoencefálico LEVE'; color = 'text-green-700'; bg = 'bg-green-50';
            gravedad = '🟢 Leve';
            desc = 'Buen pronóstico. El paciente está consciente, orientado y responde adecuadamente. Generalmente se observa por 24 horas y se realiza tomografía solo si hay factores de riesgo (anticoagulantes, edad >65, vómitos repetidos).';
        } else if (total >= 9) {
            label = 'Traumatismo Craneoencefálico MODERADO'; color = 'text-orange-700'; bg = 'bg-orange-50';
            gravedad = '🟡 Moderado';
            desc = 'Requiere hospitalización, tomografía de cráneo urgente y valoración por neurocirugía. Monitoreo neurológico cada hora. Riesgo de deterioro.';
        } else {
            label = 'Traumatismo Craneoencefálico GRAVE'; color = 'text-red-700'; bg = 'bg-red-50';
            gravedad = '🔴 Grave';
            desc = 'Emergencia neuroquirúrgica. Requiere intubación, manejo en UCI, tomografía urgente y posible intervención quirúrgica. Mortalidad significativa.';
        }
        setResultado({ total, label, color, bg, desc, gravedad, desglose: `O:${ocular} V:${verbal} M:${motor}` });
    };

    const RadioGroup = ({ title, name, options, value, onChange }: any) => (
        <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">{title}</h3>
            <div className="space-y-2">
                {options.map((opt: any) => (
                    <label key={opt.value} className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${value === opt.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name={name} value={opt.value} checked={value === opt.value} onChange={() => onChange(opt.value)} className="mt-1 w-4 h-4 text-blue-600" />
                        <div>
                            <span className="font-semibold text-gray-800">{opt.value} pts — </span>
                            <span className="text-gray-600">{opt.label}</span>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-red-800 to-rose-900 py-10 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-rose-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🧠 Escala de Coma de Glasgow (GCS)</h1>
                    <p className="text-rose-100 mt-2 text-lg">Evaluación estandarizada del nivel de conciencia en pacientes con traumatismo craneoencefálico</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
                        <p className="text-blue-800 text-sm"><strong>Instrucciones:</strong> Evalúe la MEJOR respuesta del paciente en cada categoría. Si el paciente está intubado, use la escala verbal NT (no testable) y registre como GCS-OcularMotor + «T».</p>
                    </div>

                    <RadioGroup title="👁️ Respuesta Ocular (O)" name="ocular" value={ocular} onChange={setOcular} options={[
                        { value: 4, label: 'Espontánea — abre los ojos sin estímulo' },
                        { value: 3, label: 'Al estímulo verbal — abre al hablarle o pedirlo' },
                        { value: 2, label: 'Al dolor — abre solo ante estímulo doloroso (presión ungueal)' },
                        { value: 1, label: 'Ninguna — no abre los ojos ante ningún estímulo' },
                    ]} />

                    <RadioGroup title="🗣️ Respuesta Verbal (V)" name="verbal" value={verbal} onChange={setVerbal} options={[
                        { value: 5, label: 'Orientada — sabe quién es, dónde está y la fecha' },
                        { value: 4, label: 'Confusa — habla en oraciones pero desorientado' },
                        { value: 3, label: 'Palabras inapropiadas — palabras sueltas sin coherencia' },
                        { value: 2, label: 'Sonidos incomprensibles — gemidos, quejidos' },
                        { value: 1, label: 'Ninguna — sin respuesta verbal' },
                    ]} />

                    <RadioGroup title="💪 Respuesta Motora (M)" name="motor" value={motor} onChange={setMotor} options={[
                        { value: 6, label: 'Obedece órdenes — realiza movimientos solicitados' },
                        { value: 5, label: 'Localiza dolor — intenta retirar la mano que presiona' },
                        { value: 4, label: 'Retira al dolor — flexión de retirada (sin localizar)' },
                        { value: 3, label: 'Flexión anormal — postura de decorticación' },
                        { value: 2, label: 'Extensión anormal — postura de descerebración' },
                        { value: 1, label: 'Ninguna — sin respuesta motora' },
                    ]} />

                    <button onClick={calcular} disabled={ocular === 0 || verbal === 0 || motor === 0}
                        className="w-full bg-red-800 hover:bg-red-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-4">
                        Calcular Glasgow
                    </button>

                    {resultado && (
                        <div className="mt-8">
                            <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg} border`}>
                                <p className="text-sm text-gray-600 mb-1">Escala de Coma de Glasgow ({resultado.desglose})</p>
                                <p className={`text-6xl font-black ${resultado.color}`}>{resultado.total}/15</p>
                                <p className="text-lg font-bold mt-1">{resultado.gravedad}</p>
                                <p className={`text-xl font-bold ${resultado.color} mt-2`}>{resultado.label}</p>
                                <p className="text-gray-700 text-sm mt-3 max-w-lg mx-auto">{resultado.desc}</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 border">
                                <h4 className="font-bold text-gray-800 mb-2">📋 Interpretación rápida:</h4>
                                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                        <div className="font-bold text-green-700">13-15</div>
                                        <div className="text-green-600">Leve</div>
                                    </div>
                                    <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                                        <div className="font-bold text-orange-700">9-12</div>
                                        <div className="text-orange-600">Moderado</div>
                                    </div>
                                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                                        <div className="font-bold text-red-700">3-8</div>
                                        <div className="text-red-600">Grave</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <AdBanner variant="horizontal" className="mb-8" />

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Guía Médica: Escala de Coma de Glasgow</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>La <strong>Escala de Coma de Glasgow (GCS)</strong> fue creada en 1974 por los neurocirujanos Graham Teasdale y Bryan Jennett en la Universidad de Glasgow, Escocia. Es el estándar mundial para evaluar el nivel de conciencia de un paciente con lesión cerebral.</p>
                        <p>Evalúa tres componentes independientes: <strong>apertura ocular</strong> (1-4 puntos), <strong>respuesta verbal</strong> (1-5 puntos) y <strong>respuesta motora</strong> (1-6 puntos), para un rango total de <strong>3 a 15 puntos</strong>.</p>

                        <h3 className="text-xl font-bold text-gray-800 mt-6">¿Cuándo usar la Escala de Glasgow?</h3>
                        <ul>
                            <li><strong>Traumatismo craneoencefálico (TCE)</strong> — la indicación principal</li>
                            <li><strong>Evaluación en urgencias</strong> de cualquier paciente con alteración del estado de alerta</li>
                            <li><strong>Monitoreo seriado</strong> en terapia intensiva (cada hora o cada 4 horas)</li>
                            <li><strong>Decisión de intubación</strong> — GCS ≤8 generalmente indica necesidad de proteger vía aérea</li>
                        </ul>

                        <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6 rounded-r-xl">
                            <h4 className="text-red-800 font-bold mb-2">⚠️ Dato clínico importante</h4>
                            <p className="text-red-700 m-0">Un GCS ≤ 8 es indicación de <strong>intubación endotraqueal</strong> para proteger la vía aérea. Todo paciente con GCS ≤ 12 requiere <strong>tomografía de cráneo urgente</strong>.</p>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mt-6">Estudios de laboratorio complementarios</h3>
                        <ul>
                            <li><a href="/estudios/analisis-clinicos/biometria-hematica" className="text-blue-600 font-semibold hover:underline">Biometría hemática completa</a> — evaluar sangrado o infección</li>
                            <li><a href="/estudios/analisis-clinicos/quimica-sanguinea" className="text-blue-600 font-semibold hover:underline">Química sanguínea</a> — descartar causas metabólicas (glucosa, electrolitos)</li>
                            <li><a href="/estudios/analisis-clinicos/tiempos-de-coagulacion" className="text-blue-600 font-semibold hover:underline">Tiempos de coagulación</a> — previo a procedimiento quirúrgico</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 mb-8">
                    <strong>⚠️ Aviso médico:</strong> Esta calculadora es una herramienta de referencia clínica. No sustituye la evaluación médica profesional. Ante cualquier traumatismo craneoencefálico, acuda a urgencias inmediatamente.
                </div>

                
                <RelatedTools currentPath="/herramientas/escala-glasgow" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
