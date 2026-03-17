'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function ApgarScorePage() {
    const [fc, setFc] = useState(-1);
    const [resp, setResp] = useState(-1);
    const [tono, setTono] = useState(-1);
    const [reflejos, setReflejos] = useState(-1);
    const [color, setColor] = useState(-1);
    const [minuto, setMinuto] = useState('1');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        if (fc < 0 || resp < 0 || tono < 0 || reflejos < 0 || color < 0) return;
        const total = fc + resp + tono + reflejos + color;
        let label = '', col = '', bg = '', desc = '';
        if (total >= 7) {
            label = 'Recién nacido en buenas condiciones'; col = 'text-green-700'; bg = 'bg-green-50';
            desc = 'El bebé se encuentra en buenas condiciones generales. Se recomienda mantener contacto piel a piel con la madre e iniciar lactancia materna temprana.';
        } else if (total >= 4) {
            label = 'Depresión moderada — requiere intervención'; col = 'text-orange-700'; bg = 'bg-orange-50';
            desc = 'El recién nacido necesita estimulación táctil, aspiración de secreciones y posiblemente ventilación con presión positiva. Evaluar a los 5 minutos.';
        } else {
            label = 'Depresión severa — reanimación urgente'; col = 'text-red-700'; bg = 'bg-red-50';
            desc = 'Requiere reanimación neonatal inmediata: ventilación con presión positiva, posible intubación, compresiones torácicas y/o medicamentos. Pase a UCIN.';
        }
        setResultado({ total, label, col, bg, desc, min: minuto });
    };

    const ScoreRow = ({ title, emoji, options, value, onChange }: any) => (
        <div className="mb-5">
            <h3 className="text-base font-bold text-gray-800 mb-2">{emoji} {title}</h3>
            <div className="grid grid-cols-3 gap-2">
                {options.map((opt: any, i: number) => (
                    <button key={i} onClick={() => onChange(opt.pts)} className={`p-3 text-left rounded-xl border-2 text-sm transition-all ${value === opt.pts ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className="font-bold text-gray-800">{opt.pts} pts</div>
                        <div className="text-gray-600 text-xs mt-1">{opt.label}</div>
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-pink-700 to-rose-800 py-10 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-pink-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">👶 Test de Apgar Neonatal</h1>
                    <p className="text-pink-100 mt-2 text-lg">Evaluación rápida del estado del recién nacido al minuto 1 y 5 de vida</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="bg-pink-50 rounded-xl p-4 mb-6 border border-pink-200">
                        <p className="text-pink-800 text-sm"><strong>¿Qué evalúa?</strong> El Test de Apgar usa 5 criterios (cada uno vale 0, 1 o 2 puntos) para evaluar rápidamente al bebé justo después de nacer. Se aplica al minuto 1 y se repite al minuto 5.</p>
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-bold text-gray-700">⏱️ Momento de evaluación:</label>
                        <div className="flex gap-3 mt-1">
                            <button onClick={() => setMinuto('1')} className={`px-4 py-2 rounded-lg font-bold ${minuto === '1' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-600'}`}>1 minuto</button>
                            <button onClick={() => setMinuto('5')} className={`px-4 py-2 rounded-lg font-bold ${minuto === '5' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-600'}`}>5 minutos</button>
                        </div>
                    </div>

                    <ScoreRow title="Frecuencia Cardíaca" emoji="❤️" value={fc} onChange={setFc} options={[
                        { pts: 0, label: 'Ausente (sin latido)' },
                        { pts: 1, label: '< 100 lpm' },
                        { pts: 2, label: '≥ 100 lpm' },
                    ]} />

                    <ScoreRow title="Esfuerzo Respiratorio" emoji="🫁" value={resp} onChange={setResp} options={[
                        { pts: 0, label: 'Ausente (no respira)' },
                        { pts: 1, label: 'Llanto débil, irregular' },
                        { pts: 2, label: 'Llanto fuerte y vigoroso' },
                    ]} />

                    <ScoreRow title="Tono Muscular" emoji="💪" value={tono} onChange={setTono} options={[
                        { pts: 0, label: 'Flácido (sin tono)' },
                        { pts: 1, label: 'Flexión leve de extremidades' },
                        { pts: 2, label: 'Movimientos activos' },
                    ]} />

                    <ScoreRow title="Reflejos (irritabilidad)" emoji="🦶" value={reflejos} onChange={setReflejos} options={[
                        { pts: 0, label: 'Sin respuesta' },
                        { pts: 1, label: 'Mueca o gesticulación' },
                        { pts: 2, label: 'Llanto, tos o estornudo' },
                    ]} />

                    <ScoreRow title="Coloración de la Piel" emoji="🎨" value={color} onChange={setColor} options={[
                        { pts: 0, label: 'Azul/pálido generalizado' },
                        { pts: 1, label: 'Cuerpo rosado, extremidades azules' },
                        { pts: 2, label: 'Completamente rosado' },
                    ]} />

                    <button onClick={calcular} disabled={fc < 0 || resp < 0 || tono < 0 || reflejos < 0 || color < 0}
                        className="w-full bg-pink-700 hover:bg-pink-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg mt-4">
                        Calcular Apgar
                    </button>

                    {resultado && (
                        <div className="mt-8">
                            <div className={`rounded-2xl p-6 text-center ${resultado.bg} border`}>
                                <p className="text-sm text-gray-600">Apgar al minuto {resultado.min}</p>
                                <p className={`text-6xl font-black ${resultado.col}`}>{resultado.total}/10</p>
                                <p className={`text-xl font-bold ${resultado.col} mt-2`}>{resultado.label}</p>
                                <p className="text-gray-700 text-sm mt-3 max-w-lg mx-auto">{resultado.desc}</p>
                            </div>
                            <div className="mt-4 bg-gray-50 rounded-xl p-4 border text-sm">
                                <p className="font-bold text-gray-800 mb-2">📊 Interpretación del Apgar:</p>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="bg-green-50 p-2 rounded-lg"><span className="font-bold text-green-700">7-10</span><br /><span className="text-xs text-green-600">Normal</span></div>
                                    <div className="bg-orange-50 p-2 rounded-lg"><span className="font-bold text-orange-700">4-6</span><br /><span className="text-xs text-orange-600">Depresión moderada</span></div>
                                    <div className="bg-red-50 p-2 rounded-lg"><span className="font-bold text-red-700">0-3</span><br /><span className="text-xs text-red-600">Depresión severa</span></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <AdBanner variant="horizontal" className="mb-8" />

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Guía Completa del Test de Apgar</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>El <strong>Test de Apgar</strong> fue creado en 1952 por la Dra. Virginia Apgar, anestesióloga americana. El nombre también funciona como acrónimo: <strong>A</strong>pariencia, <strong>P</strong>ulso, <strong>G</strong>esticulación, <strong>A</strong>ctividad, <strong>R</strong>espiración.</p>
                        <p>Se aplica <strong>universalmente</strong> a todo recién nacido en hospitales de todo el mundo. La primera evaluación se hace al <strong>minuto 1</strong> (indica necesidad de reanimación inmediata) y al <strong>minuto 5</strong> (evalúa respuesta al tratamiento).</p>

                        <h3 className="text-xl font-bold text-gray-800 mt-6">¿Cómo se usa en la sala de parto?</h3>
                        <ol>
                            <li>El pediatra o neonatólogo evalúa al bebé inmediatamente al nacer</li>
                            <li>Asigna puntuación de 0, 1 o 2 a cada uno de los 5 parámetros</li>
                            <li>Suma los puntos (máximo 10)</li>
                            <li>Si Apgar al minuto 1 es bajo, se inicia reanimación y se re-evalúa al minuto 5</li>
                            <li>Si continúa bajo al minuto 5, se re-evalúa cada 5 minutos hasta los 20 minutos</li>
                        </ol>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6 rounded-r-xl">
                            <h4 className="text-blue-800 font-bold mb-2">💡 Dato importante para padres</h4>
                            <p className="text-blue-700 m-0">Un Apgar bajo al minuto 1 <strong>no predice</strong> problemas a largo plazo. Muchos bebés con Apgar de 4-5 al minuto 1 mejoran a 7-9 al minuto 5. Lo que importa es la <strong>tendencia de mejora</strong>.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 mb-8">
                    <strong>⚠️ Aviso:</strong> Esta calculadora es educativa. El Test de Apgar debe ser realizado exclusivamente por personal médico capacitado en la sala de parto.
                </div>

                
                <RelatedTools currentPath="/herramientas/test-apgar-neonatal" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
