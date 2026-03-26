'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { RelatedTools } from '@/components/ui/RelatedTools';

const ITEMS = [
    { name: '1a. Nivel de conciencia', opts: [{ pts: 0, label: 'Alerta, responde' }, { pts: 1, label: 'No alerta, responde a estímulo menor' }, { pts: 2, label: 'No alerta, requiere estímulo repetido o dolor' }, { pts: 3, label: 'Solo reflejos o arreactivo' }] },
    { name: '1b. Preguntas de orientación (¿mes? ¿edad?)', opts: [{ pts: 0, label: 'Ambas correctas' }, { pts: 1, label: 'Una correcta' }, { pts: 2, label: 'Ninguna correcta' }] },
    { name: '1c. Órdenes (cerrar ojos, apretar mano)', opts: [{ pts: 0, label: 'Ambas correctas' }, { pts: 1, label: 'Una correcta' }, { pts: 2, label: 'Ninguna correcta' }] },
    { name: '2. Mirada (movimiento ocular horizontal)', opts: [{ pts: 0, label: 'Normal' }, { pts: 1, label: 'Parálisis parcial de la mirada' }, { pts: 2, label: 'Desviación forzada o parálisis total' }] },
    { name: '3. Campos visuales', opts: [{ pts: 0, label: 'Sin defecto' }, { pts: 1, label: 'Hemianopsia parcial' }, { pts: 2, label: 'Hemianopsia completa' }, { pts: 3, label: 'Ceguera bilateral o hemianopsia bilateral' }] },
    { name: '4. Parálisis facial', opts: [{ pts: 0, label: 'Normal y simétrica' }, { pts: 1, label: 'Parálisis menor (surco nasogenianos aplanado)' }, { pts: 2, label: 'Parálisis parcial (hemicara inferior)' }, { pts: 3, label: 'Parálisis completa uni o bilateral' }] },
    { name: '5a. Motor brazo izquierdo (mantener 10 seg)', opts: [{ pts: 0, label: 'No cae en 10 seg' }, { pts: 1, label: 'Cae lentamente antes de 10 seg' }, { pts: 2, label: 'Esfuerzo contra gravedad pero no sostiene' }, { pts: 3, label: 'No esfuerzo contra gravedad' }, { pts: 4, label: 'Sin movimiento' }] },
    { name: '5b. Motor brazo derecho (mantener 10 seg)', opts: [{ pts: 0, label: 'No cae en 10 seg' }, { pts: 1, label: 'Cae lentamente antes de 10 seg' }, { pts: 2, label: 'Esfuerzo contra gravedad pero no sostiene' }, { pts: 3, label: 'No esfuerzo contra gravedad' }, { pts: 4, label: 'Sin movimiento' }] },
    { name: '6a. Motor pierna izquierda (mantener 5 seg)', opts: [{ pts: 0, label: 'No cae en 5 seg' }, { pts: 1, label: 'Cae antes de 5 seg' }, { pts: 2, label: 'Esfuerzo contra gravedad' }, { pts: 3, label: 'No esfuerzo contra gravedad' }, { pts: 4, label: 'Sin movimiento' }] },
    { name: '6b. Motor pierna derecha (mantener 5 seg)', opts: [{ pts: 0, label: 'No cae en 5 seg' }, { pts: 1, label: 'Cae antes de 5 seg' }, { pts: 2, label: 'Esfuerzo contra gravedad' }, { pts: 3, label: 'No esfuerzo contra gravedad' }, { pts: 4, label: 'Sin movimiento' }] },
    { name: '7. Ataxia de extremidades', opts: [{ pts: 0, label: 'Ausente' }, { pts: 1, label: 'En una extremidad' }, { pts: 2, label: 'En dos o más extremidades' }] },
    { name: '8. Sensibilidad (pinchazo)', opts: [{ pts: 0, label: 'Normal' }, { pts: 1, label: 'Disminuida parcialmente' }, { pts: 2, label: 'Anestesia severa o coma' }] },
    { name: '9. Lenguaje (afasia)', opts: [{ pts: 0, label: 'Normal, sin afasia' }, { pts: 1, label: 'Afasia leve (se entiende con dificultad)' }, { pts: 2, label: 'Afasia severa (comunicación fragmentaria)' }, { pts: 3, label: 'Mutismo o afasia global' }] },
    { name: '10. Disartria (articulación del habla)', opts: [{ pts: 0, label: 'Normal y claro' }, { pts: 1, label: 'Se entiende con dificultad' }, { pts: 2, label: 'Ininteligible o anártrico' }] },
    { name: '11. Extinción / Inatención', opts: [{ pts: 0, label: 'Sin anomalía' }, { pts: 1, label: 'Extinción en una modalidad' }, { pts: 2, label: 'Extinción en más de una modalidad' }] },
];

export default function NIHSSStrokePage() {
    const [vals, setVals] = useState<Record<number, number>>({});
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        if (Object.keys(vals).length < ITEMS.length) return;
        const total = Object.values(vals).reduce((a, b) => a + b, 0);
        let label = '', color = '', bg = '', desc = '';
        if (total === 0) {
            label = 'Sin déficit neurológico'; color = 'text-green-700'; bg = 'bg-green-50';
            desc = 'Examen neurológico normal. Si hay sospecha clínica de EVC, solicitar neuroimagen de todas formas.';
        } else if (total <= 4) {
            label = 'EVC menor / leve'; color = 'text-yellow-700'; bg = 'bg-yellow-50';
            desc = 'Déficit neurológico leve. Evaluar elegibilidad para trombólisis si <4.5 horas. Hospitalización para monitoreo y prevención secundaria.';
        } else if (total <= 15) {
            label = 'EVC moderado'; color = 'text-orange-700'; bg = 'bg-orange-50';
            desc = 'Déficit significativo. Candidato a trombólisis IV (alteplasa) si <4.5h del inicio, o trombectomía mecánica si <24h con oclusión proximal. Ingreso a Unidad de Ictus.';
        } else if (total <= 20) {
            label = 'EVC moderado-severo'; color = 'text-red-600'; bg = 'bg-red-50';
            desc = 'Déficit neurológico importante. Alta probabilidad de oclusión de gran vaso. Activar código ictus para trombectomía urgente. TAC + angioTAC inmediatos.';
        } else {
            label = 'EVC severo'; color = 'text-red-800'; bg = 'bg-red-100';
            desc = 'Déficit devastador. Alta mortalidad y discapacidad severa. Manejo en UCI neurocrítica. Evaluar intervención solo si hay oclusión tratable.';
        }
        setResultado({ total, label, color, bg, desc });
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-red-900 to-rose-800 py-10 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🧠⚡ Escala NIHSS — Evento Vascular Cerebral</h1>
                    <p className="text-red-100 mt-2 text-lg">National Institutes of Health Stroke Scale — cuantifica la severidad del EVC para guiar tratamiento</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
                        <p className="text-red-800 text-sm font-bold">⏰ TIEMPO ES CEREBRO: Ventana para trombólisis &lt;4.5 horas. Ventana para trombectomía &lt;24 horas. Cada minuto de retraso = 1.9 millones de neuronas perdidas.</p>
                    </div>

                    {ITEMS.map((item, idx) => (
                        <div key={idx} className="mb-4">
                            <h3 className="text-sm font-bold text-gray-800 mb-2">{item.name}</h3>
                            <div className="flex flex-wrap gap-1">
                                {item.opts.map((opt, oi) => (
                                    <button key={oi} onClick={() => setVals({ ...vals, [idx]: opt.pts })}
                                        className={`px-2 py-1.5 rounded-lg text-xs border-2 transition-all ${vals[idx] === opt.pts ? (opt.pts === 0 ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-gray-200 hover:border-gray-300'}`}>
                                        <span className="font-bold">{opt.pts}</span> {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button onClick={calcular} disabled={Object.keys(vals).length < ITEMS.length}
                        className="w-full bg-red-800 hover:bg-red-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg mt-4">
                        Calcular NIHSS
                    </button>

                    {resultado && (
                        <div className="mt-8">
                            <div className={`rounded-2xl p-6 text-center ${resultado.bg} border`}>
                                <p className="text-sm text-gray-600">NIHSS Score</p>
                                <p className={`text-6xl font-black ${resultado.color}`}>{resultado.total}/42</p>
                                <p className={`text-xl font-bold ${resultado.color} mt-2`}>{resultado.label}</p>
                                <p className="text-gray-700 text-sm mt-3 max-w-lg mx-auto">{resultado.desc}</p>
                            </div>
                            <div className="mt-4 grid grid-cols-5 gap-1 text-center text-xs">
                                <div className="bg-green-50 p-2 rounded"><span className="font-bold text-green-700">0</span><br />Normal</div>
                                <div className="bg-yellow-50 p-2 rounded"><span className="font-bold text-yellow-700">1-4</span><br />Leve</div>
                                <div className="bg-orange-50 p-2 rounded"><span className="font-bold text-orange-700">5-15</span><br />Moderado</div>
                                <div className="bg-red-50 p-2 rounded"><span className="font-bold text-red-600">16-20</span><br />Mod-Severo</div>
                                <div className="bg-red-100 p-2 rounded"><span className="font-bold text-red-800">21-42</span><br />Severo</div>
                            </div>
                        </div>
                    )}
                </div>

                <AdBanner variant="horizontal" className="mb-8" />

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Guía: NIHSS y Código Ictus</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>La <strong>NIHSS</strong> fue desarrollada por el NIH de EE.UU. y es la escala estándar mundial para cuantificar la severidad del evento vascular cerebral (EVC/ictus). Toma aproximadamente <strong>6-10 minutos</strong>.</p>

                        <h3 className="text-xl font-bold text-gray-800 mt-6">¿Cuándo activar Código Ictus?</h3>
                        <p>Si el paciente presenta <strong>inicio súbito</strong> de cualquiera de estos síntomas (recuerde FAST):</p>
                        <ul>
                            <li><strong>F</strong>ace — Parálisis facial (pida que sonría)</li>
                            <li><strong>A</strong>rms — Debilidad de un brazo (pida que levante ambos)</li>
                            <li><strong>S</strong>peech — Problemas para hablar (pida que repita una frase)</li>
                            <li><strong>T</strong>ime — ¡Llame al 911 AHORA!</li>
                        </ul>

                        <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6 rounded-r-xl">
                            <h4 className="text-red-800 font-bold mb-2">⚠️ Ventanas de tratamiento</h4>
                            <p className="text-red-700 m-0"><strong>Trombólisis IV (alteplasa):</strong> &lt;4.5 horas. <strong>Trombectomía mecánica:</strong> &lt;6-24 horas (con criterios de imagen). El NIHSS es fundamental para decidir el tratamiento: NIHSS ≥6 con oclusión proximal = candidato a trombectomía.</p>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mt-6">Laboratorios urgentes en EVC</h3>
                        <ul>
                            <li><a href="/estudios" className="text-blue-600 font-semibold hover:underline">Glucosa rápida</a> — descartar hipoglucemia (simula EVC)</li>
                            <li><a href="/estudios" className="text-blue-600 font-semibold hover:underline">Tiempos de coagulación (TP, INR)</a> — necesarios antes de trombólisis</li>
                            <li><a href="/estudios" className="text-blue-600 font-semibold hover:underline">Biometría hemática</a> — plaquetas &gt;100,000 requeridas para trombólisis</li>
                            <li><a href="/estudios" className="text-blue-600 font-semibold hover:underline">Troponinas</a> — descartar evento cardíaco concomitante</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 mb-8">
                    <strong>⚠️ Aviso:</strong> La NIHSS debe ser aplicada por personal médico certificado. Ante sospecha de EVC, llame al 911 inmediatamente. El tiempo es el factor más crítico para el pronóstico.
                </div>

                
                <RelatedTools currentPath="/herramientas/nihss-escala-ictus" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
