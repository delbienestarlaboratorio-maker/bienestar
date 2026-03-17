'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { RelatedTools } from '@/components/ui/RelatedTools';

const CRITERIOS = [
    {
        name: 'Movimientos toracoabdominales', emoji: '🫁', opts: [
            { pts: 0, label: 'Rítmicos y regulares' },
            { pts: 1, label: 'Tórax inmóvil, abdomen en movimiento' },
            { pts: 2, label: 'Disociación toracoabdominal (movimiento de balanceo / «sube y baja»)' },
        ]
    },
    {
        name: 'Tiraje intercostal', emoji: '🦴', opts: [
            { pts: 0, label: 'Ausente — sin retracción' },
            { pts: 1, label: 'Discreto — apenas visible' },
            { pts: 2, label: 'Acentuado y constante — marcado en cada respiración' },
        ]
    },
    {
        name: 'Retracción xifoidea', emoji: '⬇️', opts: [
            { pts: 0, label: 'Ausente' },
            { pts: 1, label: 'Discreta — apenas perceptible' },
            { pts: 2, label: 'Acentuada — marcada y constante' },
        ]
    },
    {
        name: 'Aleteo nasal', emoji: '👃', opts: [
            { pts: 0, label: 'Ausente' },
            { pts: 1, label: 'Discreto — dilatación mínima de narinas' },
            { pts: 2, label: 'Acentuado — aleteo marcado y constante' },
        ]
    },
    {
        name: 'Quejido espiratorio', emoji: '🔊', opts: [
            { pts: 0, label: 'Ausente' },
            { pts: 1, label: 'Audible con estetoscopio' },
            { pts: 2, label: 'Audible sin estetoscopio — a distancia' },
        ]
    },
];

export default function SilvermanAndersenPage() {
    const [vals, setVals] = useState<Record<number, number>>({});
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        if (Object.keys(vals).length < CRITERIOS.length) return;
        const total = Object.values(vals).reduce((a, b) => a + b, 0);
        let label = '', color = '', bg = '', desc = '';
        if (total === 0) {
            label = 'Sin dificultad respiratoria'; color = 'text-green-700'; bg = 'bg-green-50';
            desc = 'Recién nacido sin signos de dificultad respiratoria. Continuar vigilancia habitual y contacto piel con piel.';
        } else if (total <= 3) {
            label = 'Dificultad respiratoria LEVE'; color = 'text-yellow-700'; bg = 'bg-yellow-50';
            desc = 'Vigilancia estrecha. Aspiración de secreciones. Mantener en posición semi-Fowler. Considerar oxígeno por puntas nasales si SpO2 <90%.';
        } else if (total <= 6) {
            label = 'Dificultad respiratoria MODERADA'; color = 'text-orange-700'; bg = 'bg-orange-50';
            desc = 'Requiere oxígeno suplementario (casco cefálico o CPAP nasal). Valoración por neonatología. Posible ingreso a UCIN. Solicitar gasometría.';
        } else {
            label = 'Dificultad respiratoria SEVERA'; color = 'text-red-700'; bg = 'bg-red-50';
            desc = 'Emergencia neonatal. Requiere CPAP o ventilación mecánica. Ingreso inmediato a UCIN. Surfactante si es prematuro. Acceso vascular urgente.';
        }
        setResultado({ total, label, color, bg, desc });
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-cyan-700 to-teal-800 py-10 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-cyan-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">👶🫁 Escala de Silverman-Andersen</h1>
                    <p className="text-cyan-100 mt-2 text-lg">Evaluación de la dificultad respiratoria en el recién nacido</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="bg-cyan-50 rounded-xl p-4 mb-6 border border-cyan-200">
                        <p className="text-cyan-800 text-sm"><strong>Instrucciones:</strong> Evalúe cada criterio observando al recién nacido sin ropa en la cuna térmica. Seleccione el grado que mejor corresponda. A mayor puntuación, mayor dificultad respiratoria.</p>
                    </div>

                    {CRITERIOS.map((c, ci) => (
                        <div key={ci} className="mb-5">
                            <h3 className="text-base font-bold text-gray-800 mb-2">{c.emoji} {c.name}</h3>
                            <div className="grid grid-cols-3 gap-2">
                                {c.opts.map((opt, oi) => (
                                    <button key={oi} onClick={() => setVals({ ...vals, [ci]: opt.pts })}
                                        className={`p-3 text-left rounded-xl border-2 text-sm transition-all ${vals[ci] === opt.pts ? 'border-cyan-500 bg-cyan-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <div className="font-bold text-gray-800">{opt.pts} pts</div>
                                        <div className="text-gray-600 text-xs mt-1">{opt.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button onClick={calcular} disabled={Object.keys(vals).length < CRITERIOS.length}
                        className="w-full bg-cyan-700 hover:bg-cyan-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg mt-4">
                        Calcular Silverman
                    </button>

                    {resultado && (
                        <div className="mt-8">
                            <div className={`rounded-2xl p-6 text-center ${resultado.bg} border`}>
                                <p className="text-sm text-gray-600">Escala de Silverman-Andersen</p>
                                <p className={`text-6xl font-black ${resultado.color}`}>{resultado.total}/10</p>
                                <p className={`text-xl font-bold ${resultado.color} mt-2`}>{resultado.label}</p>
                                <p className="text-gray-700 text-sm mt-3 max-w-lg mx-auto">{resultado.desc}</p>
                            </div>
                            <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
                                <div className="bg-green-50 p-2 rounded border"><span className="font-bold text-green-700">0</span><br />Normal</div>
                                <div className="bg-yellow-50 p-2 rounded border"><span className="font-bold text-yellow-700">1-3</span><br />Leve</div>
                                <div className="bg-orange-50 p-2 rounded border"><span className="font-bold text-orange-700">4-6</span><br />Moderado</div>
                                <div className="bg-red-50 p-2 rounded border"><span className="font-bold text-red-700">7-10</span><br />Severo</div>
                            </div>
                        </div>
                    )}
                </div>

                <AdBanner variant="horizontal" className="mb-8" />

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Guía: Silverman-Andersen para Neonatología</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>La <strong>Escala de Silverman-Andersen</strong> (1956) evalúa 5 signos clínicos de dificultad respiratoria en el recién nacido. Es el complemento perfecto del <strong>Apgar</strong>: mientras el Apgar evalúa el estado general al nacer, Silverman se enfoca específicamente en la <strong>función respiratoria</strong>.</p>
                        <p><strong>Dato clave:</strong> A diferencia del Apgar (donde mayor puntuación = mejor), en Silverman <strong>mayor puntuación = mayor dificultad</strong>. Un Silverman de 0 es normal; un Silverman de 10 es una emergencia.</p>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 mb-8">
                    <strong>⚠️ Aviso:</strong> Uso exclusivo para profesionales de salud en sala de parto o UCIN.
                </div>
            
                <RelatedTools currentPath="/herramientas/silverman-andersen-neonatal" className="mb-8" />
            </div>
        </main>
    );
}
