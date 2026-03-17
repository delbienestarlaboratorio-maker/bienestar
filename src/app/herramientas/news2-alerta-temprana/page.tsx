'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { RelatedTools } from '@/components/ui/RelatedTools';

const PARAMS = [
    {
        name: 'Frecuencia respiratoria', ranges: [
            { label: '≤8', pts: 3 }, { label: '9-11', pts: 1 }, { label: '12-20', pts: 0 },
            { label: '21-24', pts: 2 }, { label: '≥25', pts: 3 }
        ]
    },
    {
        name: 'Saturación de O₂ (%)', ranges: [
            { label: '≤91', pts: 3 }, { label: '92-93', pts: 2 }, { label: '94-95', pts: 1 }, { label: '≥96', pts: 0 }
        ]
    },
    {
        name: 'Presión arterial sistólica', ranges: [
            { label: '≤90', pts: 3 }, { label: '91-100', pts: 2 }, { label: '101-110', pts: 1 },
            { label: '111-219', pts: 0 }, { label: '≥220', pts: 3 }
        ]
    },
    {
        name: 'Frecuencia cardíaca', ranges: [
            { label: '≤40', pts: 3 }, { label: '41-50', pts: 1 }, { label: '51-90', pts: 0 },
            { label: '91-110', pts: 1 }, { label: '111-130', pts: 2 }, { label: '≥131', pts: 3 }
        ]
    },
    {
        name: 'Nivel de conciencia', ranges: [
            { label: 'Alerta', pts: 0 }, { label: 'Responde a voz (Confuso)', pts: 3 }
        ]
    },
    {
        name: 'Temperatura (°C)', ranges: [
            { label: '≤35.0', pts: 3 }, { label: '35.1-36.0', pts: 1 }, { label: '36.1-38.0', pts: 0 },
            { label: '38.1-39.0', pts: 1 }, { label: '≥39.1', pts: 2 }
        ]
    },
    {
        name: '¿Necesita oxígeno suplementario?', ranges: [
            { label: 'No', pts: 0 }, { label: 'Sí (con O₂)', pts: 2 }
        ]
    },
];

export default function News2Page() {
    const [vals, setVals] = useState<Record<number, number>>({});
    const [resultado, setResultado] = useState<any>(null);

    const setVal = (paramIdx: number, pts: number) => setVals({ ...vals, [paramIdx]: pts });

    const calcular = () => {
        if (Object.keys(vals).length < PARAMS.length) return;
        const total = Object.values(vals).reduce((a, b) => a + b, 0);
        const has3 = Object.values(vals).some(v => v === 3);
        let label = '', color = '', bg = '', desc = '', freq = '';
        if (total >= 7) {
            label = 'ALTO — Respuesta clínica urgente'; color = 'text-red-700'; bg = 'bg-red-50';
            desc = 'Activar equipo de respuesta rápida. Valoración médica inmediata. Considerar traslado a UCI o unidad de cuidados intermedios.';
            freq = 'Monitoreo continuo de signos vitales';
        } else if (total >= 5 || has3) {
            label = 'MEDIO — Respuesta clínica urgente'; color = 'text-orange-700'; bg = 'bg-orange-50';
            desc = 'Valoración urgente por médico con competencias en manejo de enfermos agudos. Considerar si el paciente necesita mayor nivel de cuidado.';
            freq = 'Signos vitales cada hora mínimo';
        } else if (total >= 1) {
            label = 'BAJO — Vigilancia de ward'; color = 'text-yellow-700'; bg = 'bg-yellow-50';
            desc = 'Continuar monitoreo de rutina. Informar a enfermería responsable. El médico debe ser notificado si hay tendencia al deterioro.';
            freq = 'Signos vitales cada 4-6 horas';
        } else {
            label = 'MUY BAJO — Sin alerta'; color = 'text-green-700'; bg = 'bg-green-50';
            desc = 'Todos los parámetros dentro de rangos normales. Continuar monitoreo habitual según protocolo del servicio.';
            freq = 'Signos vitales cada 12 horas';
        }
        setResultado({ total, label, color, bg, desc, freq, has3 });
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-sky-700 to-cyan-800 py-10 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-sky-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">📊 NEWS2 — National Early Warning Score</h1>
                    <p className="text-sky-100 mt-2 text-lg">Sistema de alerta temprana para detectar deterioro clínico en pacientes hospitalizados</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="bg-sky-50 rounded-xl p-4 mb-6 border border-sky-200">
                        <p className="text-sky-800 text-sm"><strong>Instrucciones:</strong> Seleccione el rango que corresponda a cada signo vital del paciente. Todos los campos son obligatorios para calcular el score.</p>
                    </div>

                    {PARAMS.map((param, pi) => (
                        <div key={pi} className="mb-5">
                            <h3 className="text-sm font-bold text-gray-800 mb-2">{param.name}</h3>
                            <div className="flex flex-wrap gap-2">
                                {param.ranges.map((r, ri) => (
                                    <button key={ri} onClick={() => setVal(pi, r.pts)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium border-2 transition-all ${vals[pi] === r.pts ? (r.pts === 0 ? 'border-green-500 bg-green-50 text-green-700' : r.pts <= 1 ? 'border-yellow-500 bg-yellow-50 text-yellow-700' : r.pts === 2 ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-red-500 bg-red-50 text-red-700') : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                                        {r.label} <span className="text-xs opacity-60">({r.pts}pt{r.pts !== 1 ? 's' : ''})</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button onClick={calcular} disabled={Object.keys(vals).length < PARAMS.length}
                        className="w-full bg-sky-700 hover:bg-sky-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg mt-4">
                        Calcular NEWS2
                    </button>

                    {resultado && (
                        <div className="mt-8">
                            <div className={`rounded-2xl p-6 text-center ${resultado.bg} border`}>
                                <p className="text-sm text-gray-600">National Early Warning Score 2</p>
                                <p className={`text-6xl font-black ${resultado.color}`}>{resultado.total}/20</p>
                                {resultado.has3 && resultado.total < 5 && (
                                    <p className="text-red-600 text-sm font-bold mt-1">⚠️ Parámetro individual con 3 puntos — escalar a MEDIO</p>
                                )}
                                <p className={`text-xl font-bold ${resultado.color} mt-2`}>{resultado.label}</p>
                                <p className="text-gray-700 text-sm mt-3 max-w-lg mx-auto">{resultado.desc}</p>
                                <div className="mt-3 bg-white rounded-lg p-2 text-sm">
                                    <strong>⏱️ Frecuencia de monitoreo:</strong> {resultado.freq}
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
                                <div className="bg-green-50 p-2 rounded border"><span className="font-bold text-green-700">0</span><br />Muy bajo</div>
                                <div className="bg-yellow-50 p-2 rounded border"><span className="font-bold text-yellow-700">1-4</span><br />Bajo</div>
                                <div className="bg-orange-50 p-2 rounded border"><span className="font-bold text-orange-700">5-6</span><br />Medio</div>
                                <div className="bg-red-50 p-2 rounded border"><span className="font-bold text-red-700">≥7</span><br />Alto</div>
                            </div>
                        </div>
                    )}
                </div>

                <AdBanner variant="horizontal" className="mb-8" />

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Guía: Sistema de Alerta Temprana NEWS2</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>El <strong>NEWS2</strong> (National Early Warning Score 2) fue desarrollado por el Royal College of Physicians de Inglaterra en 2017. Es el estándar del NHS británico para detectar deterioro clínico en pacientes hospitalizados.</p>
                        <p>Evalúa <strong>7 parámetros fisiológicos</strong>: frecuencia respiratoria, saturación de oxígeno, uso de oxígeno suplementario, presión arterial sistólica, frecuencia cardíaca, nivel de conciencia y temperatura.</p>

                        <h3 className="text-xl font-bold text-gray-800 mt-6">¿Por qué es importante?</h3>
                        <ul>
                            <li>Detecta deterioro clínico <strong>12-24 horas antes</strong> del evento adverso</li>
                            <li>Predice mortalidad, ingreso a UCI y paro cardíaco intrahospitalario</li>
                            <li>Estandariza la comunicación entre enfermería y médicos</li>
                        </ul>

                        <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6 rounded-r-xl">
                            <h4 className="text-red-800 font-bold mb-2">⚠️ Regla del parámetro extremo</h4>
                            <p className="text-red-700 m-0">Si <strong>cualquier parámetro individual puntúa 3</strong>, se debe escalar la respuesta clínica a MEDIO como mínimo, independientemente del total. Esto captura deterioro orgánico focal que podría pasarse por alto.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 mb-8">
                    <strong>⚠️ Aviso:</strong> NEWS2 es una herramienta de tamizaje hospitalario. No sustituye el juicio clínico. Requiere evaluación médica presencial para interpretación adecuada.
                </div>

                
                <RelatedTools currentPath="/herramientas/news2-alerta-temprana" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
