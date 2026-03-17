'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { RelatedTools } from '@/components/ui/RelatedTools';

const ITEMS = [
    { name: 'Comer', emoji: '🍽️', opts: [{ pts: 10, label: 'Independiente' }, { pts: 5, label: 'Necesita ayuda (cortar, untar)' }, { pts: 0, label: 'Dependiente' }] },
    { name: 'Trasladarse silla/cama', emoji: '🛏️', opts: [{ pts: 15, label: 'Independiente' }, { pts: 10, label: 'Mínima ayuda' }, { pts: 5, label: 'Gran ayuda (puede sentarse)' }, { pts: 0, label: 'Dependiente' }] },
    { name: 'Aseo personal', emoji: '🪥', opts: [{ pts: 5, label: 'Independiente (cara, pelo, dientes)' }, { pts: 0, label: 'Dependiente' }] },
    { name: 'Uso del retrete', emoji: '🚽', opts: [{ pts: 10, label: 'Independiente' }, { pts: 5, label: 'Necesita algo de ayuda' }, { pts: 0, label: 'Dependiente' }] },
    { name: 'Bañarse', emoji: '🚿', opts: [{ pts: 5, label: 'Independiente' }, { pts: 0, label: 'Dependiente' }] },
    { name: 'Desplazarse (caminar)', emoji: '🚶', opts: [{ pts: 15, label: 'Independiente 50+ metros' }, { pts: 10, label: 'Con ayuda (andadera, bastón)' }, { pts: 5, label: 'En silla de ruedas, independiente' }, { pts: 0, label: 'Inmóvil' }] },
    { name: 'Subir/bajar escaleras', emoji: '🪜', opts: [{ pts: 10, label: 'Independiente' }, { pts: 5, label: 'Con ayuda (barandal, alguien)' }, { pts: 0, label: 'No puede' }] },
    { name: 'Vestirse', emoji: '👔', opts: [{ pts: 10, label: 'Independiente (incluye botones, zipper)' }, { pts: 5, label: 'Necesita ayuda parcial' }, { pts: 0, label: 'Dependiente' }] },
    { name: 'Control de heces', emoji: '💩', opts: [{ pts: 10, label: 'Continente' }, { pts: 5, label: 'Accidente ocasional' }, { pts: 0, label: 'Incontinente' }] },
    { name: 'Control de orina', emoji: '💧', opts: [{ pts: 10, label: 'Continente' }, { pts: 5, label: 'Accidente ocasional' }, { pts: 0, label: 'Incontinente o usa sonda' }] },
];

export default function BarthelIndexPage() {
    const [vals, setVals] = useState<Record<number, number>>({});
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        if (Object.keys(vals).length < ITEMS.length) return;
        const total = Object.values(vals).reduce((a, b) => a + b, 0);
        let label = '', color = '', bg = '', desc = '';
        if (total === 100) {
            label = 'Independiente'; color = 'text-green-700'; bg = 'bg-green-50';
            desc = 'El paciente es completamente autónomo para todas las actividades básicas de la vida diaria. No requiere cuidador.';
        } else if (total >= 60) {
            label = 'Dependencia leve'; color = 'text-yellow-700'; bg = 'bg-yellow-50';
            desc = 'Capaz de realizar la mayoría de las actividades pero requiere supervisión o ayuda menor en algunas. Puede vivir solo con apoyo ocasional.';
        } else if (total >= 40) {
            label = 'Dependencia moderada'; color = 'text-orange-700'; bg = 'bg-orange-50';
            desc = 'Necesita ayuda significativa en varias actividades diarias. Requiere cuidador parcial o estancias asistidas.';
        } else if (total >= 20) {
            label = 'Dependencia severa'; color = 'text-red-600'; bg = 'bg-red-50';
            desc = 'Depende de otros para la mayoría de las actividades. Necesita cuidador permanente o institucionalización.';
        } else {
            label = 'Dependencia total'; color = 'text-red-800'; bg = 'bg-red-100';
            desc = 'Completamente dependiente para todas las actividades. Requiere atención continua de enfermería.';
        }
        setResultado({ total, label, color, bg, desc });
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-violet-700 to-purple-800 py-10 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-violet-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">👴 Índice de Barthel — Independencia Funcional</h1>
                    <p className="text-violet-100 mt-2 text-lg">Evalúa la capacidad del adulto mayor para realizar las 10 actividades básicas de la vida diaria</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="bg-violet-50 rounded-xl p-4 mb-6 border border-violet-200">
                        <p className="text-violet-800 text-sm"><strong>Instrucciones:</strong> Evalúe cada actividad según lo que el paciente PUEDE hacer de forma habitual, no lo que podría hacer en su mejor momento. Una puntuación de 100 indica independencia total.</p>
                    </div>

                    {ITEMS.map((item, idx) => (
                        <div key={idx} className="mb-5">
                            <h3 className="text-base font-bold text-gray-800 mb-2">{item.emoji} {item.name}</h3>
                            <div className="flex flex-wrap gap-2">
                                {item.opts.map((opt, oi) => (
                                    <button key={oi} onClick={() => setVals({ ...vals, [idx]: opt.pts })}
                                        className={`px-3 py-2 rounded-lg text-sm border-2 transition-all ${vals[idx] === opt.pts ? 'border-violet-500 bg-violet-50 text-violet-700 font-bold' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                                        {opt.pts}pt — {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button onClick={calcular} disabled={Object.keys(vals).length < ITEMS.length}
                        className="w-full bg-violet-700 hover:bg-violet-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg mt-4">
                        Calcular Barthel
                    </button>

                    {resultado && (
                        <div className="mt-8">
                            <div className={`rounded-2xl p-6 text-center ${resultado.bg} border`}>
                                <p className="text-sm text-gray-600">Índice de Barthel</p>
                                <p className={`text-6xl font-black ${resultado.color}`}>{resultado.total}/100</p>
                                <p className={`text-xl font-bold ${resultado.color} mt-2`}>{resultado.label}</p>
                                <p className="text-gray-700 text-sm mt-3 max-w-lg mx-auto">{resultado.desc}</p>
                            </div>
                            <div className="mt-4 grid grid-cols-5 gap-1 text-center text-xs">
                                <div className="bg-green-50 p-2 rounded"><span className="font-bold text-green-700">100</span><br />Independiente</div>
                                <div className="bg-yellow-50 p-2 rounded"><span className="font-bold text-yellow-700">60-95</span><br />Leve</div>
                                <div className="bg-orange-50 p-2 rounded"><span className="font-bold text-orange-700">40-55</span><br />Moderado</div>
                                <div className="bg-red-50 p-2 rounded"><span className="font-bold text-red-600">20-35</span><br />Severo</div>
                                <div className="bg-red-100 p-2 rounded"><span className="font-bold text-red-800">0-15</span><br />Total</div>
                            </div>
                        </div>
                    )}
                </div>

                <AdBanner variant="horizontal" className="mb-8" />

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Guía: Índice de Barthel en Geriatría</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>El <strong>Índice de Barthel</strong> fue creado en 1965 por Dorothea Barthel y Florence Mahoney. Es la escala <strong>más utilizada en rehabilitación y geriatría</strong> para medir la capacidad funcional en actividades básicas de la vida diaria (ABVD).</p>

                        <h3 className="text-xl font-bold text-gray-800 mt-6">¿Para qué sirve en la práctica?</h3>
                        <ul>
                            <li><strong>Determinar si el adulto mayor necesita cuidador</strong> — Barthel &lt;60 generalmente indica que sí</li>
                            <li><strong>Medir progreso en rehabilitación</strong> — después de fractura de cadera, EVC, cirugía</li>
                            <li><strong>Planear el alta hospitalaria</strong> — ¿puede regresar a casa o necesita asilo?</li>
                            <li><strong>Documentar para seguros y pensiones</strong> — certificar grado de dependencia</li>
                        </ul>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6 rounded-r-xl">
                            <h4 className="text-blue-800 font-bold mb-2">💡 Para familias</h4>
                            <p className="text-blue-700 m-0">Si su familiar adulto mayor tiene Barthel menor a 60, es momento de considerar apoyo profesional: cuidador capacitado, terapia de rehabilitación, o adaptaciones en el hogar (barras en el baño, rampas, silla de ruedas).</p>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 mb-8">
                    <strong>⚠️ Aviso:</strong> El Índice de Barthel evalúa funcionalidad física. No sustituye la evaluación geriátrica integral que incluye cognición, nutrición y estado emocional.
                </div>
            
                <RelatedTools currentPath="/herramientas/barthel-independencia-funcional" className="mb-8" />
            </div>
        </main>
    );
}
