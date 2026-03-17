'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { RelatedTools } from '@/components/ui/RelatedTools';

const PREGUNTAS = [
    { cat: '📅 Orientación Temporal (5 pts)', items: ['¿En qué año estamos?', '¿En qué estación del año?', '¿En qué mes estamos?', '¿Qué día del mes es hoy?', '¿Qué día de la semana es?'] },
    { cat: '📍 Orientación Espacial (5 pts)', items: ['¿En qué país estamos?', '¿En qué estado/provincia?', '¿En qué ciudad?', '¿En qué edificio/hospital?', '¿En qué piso/consultorio?'] },
    { cat: '🧠 Registro/Memoria Inmediata (3 pts)', items: ['Repita: ÁRBOL', 'Repita: MESA', 'Repita: AVIÓN'] },
    { cat: '🔢 Atención y Cálculo (5 pts)', items: ['100 - 7 = 93', '93 - 7 = 86', '86 - 7 = 79', '79 - 7 = 72', '72 - 7 = 65'] },
    { cat: '💭 Memoria Diferida (3 pts)', items: ['¿Cuál era la primera palabra? (ÁRBOL)', '¿Y la segunda? (MESA)', '¿Y la tercera? (AVIÓN)'] },
    { cat: '🗣️ Lenguaje y Praxias (9 pts)', items: ['Nombrar: ¿Qué es esto? (mostrar reloj)', 'Nombrar: ¿Qué es esto? (mostrar lápiz)', 'Repetir: "Ni sí, ni no, ni pero"', 'Ejecutar: Tome el papel, dóblelo a la mitad, póngalo en el suelo (3 pts)', '"Cierre los ojos" (leer y obedecer la orden escrita)', 'Escribir una oración completa con sujeto y verbo', 'Copiar dos pentágonos superpuestos (dibujo)'] },
];

export default function MiniMentalPage() {
    const allItems = PREGUNTAS.flatMap(p => p.items);
    const [respuestas, setRespuestas] = useState<Record<number, boolean>>({});
    const [resultado, setResultado] = useState<any>(null);

    const toggle = (idx: number) => {
        setRespuestas(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const calcular = () => {
        let total = 0;
        allItems.forEach((_, i) => { if (respuestas[i]) total++; });
        let label = '', color = '', bg = '', desc = '';
        if (total >= 27) {
            label = 'Normal — sin deterioro cognitivo'; color = 'text-green-700'; bg = 'bg-green-50';
            desc = 'Funciones cognitivas dentro de límites normales para la edad. No se requieren estudios adicionales por deterioro cognitivo en este momento.';
        } else if (total >= 24) {
            label = 'Deterioro cognitivo leve (sospecha)'; color = 'text-yellow-700'; bg = 'bg-yellow-50';
            desc = 'Se recomienda evaluación neuropsicológica completa, laboratorios de rutina (tiroides, B12, ácido fólico) y seguimiento en 6 meses.';
        } else if (total >= 18) {
            label = 'Deterioro cognitivo moderado'; color = 'text-orange-700'; bg = 'bg-orange-50';
            desc = 'Compatible con demencia leve a moderada. Requiere valoración por neurología o geriatría, neuroimagen (TAC/RM cerebral) y estudios de laboratorio completos.';
        } else if (total >= 11) {
            label = 'Deterioro cognitivo moderado-severo'; color = 'text-red-600'; bg = 'bg-red-50';
            desc = 'Demencia moderada establecida. Necesita apoyo para actividades de la vida diaria. Valoración integral por geriatría y plan de cuidados.';
        } else {
            label = 'Deterioro cognitivo severo'; color = 'text-red-800'; bg = 'bg-red-100';
            desc = 'Demencia severa. Dependencia funcional importante. Requiere cuidador permanente y manejo multidisciplinario (geriatría, neurología, trabajo social).';
        }
        setResultado({ total, label, color, bg, desc });
    };

    let globalIdx = 0;

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-teal-700 to-emerald-800 py-10 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-teal-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🧠 Mini-Mental State Examination (MMSE)</h1>
                    <p className="text-teal-100 mt-2 text-lg">Evaluación rápida del estado cognitivo en adultos mayores — detección de deterioro cognitivo y demencia</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="bg-teal-50 rounded-xl p-4 mb-6 border border-teal-200">
                        <p className="text-teal-800 text-sm"><strong>Instrucciones:</strong> Aplique cada pregunta al paciente. Marque ✅ si responde correctamente. El ítem 4 de Lenguaje (tomar papel, doblarlo, ponerlo en el suelo) vale 3 puntos — márquelo si completa las 3 acciones.</p>
                    </div>

                    {PREGUNTAS.map((grupo, gi) => (
                        <div key={gi} className="mb-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-3 bg-gray-50 p-3 rounded-lg">{grupo.cat}</h3>
                            <div className="space-y-2">
                                {grupo.items.map((item, ii) => {
                                    const idx = globalIdx++;
                                    return (
                                        <label key={idx} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${respuestas[idx] ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <input type="checkbox" checked={!!respuestas[idx]} onChange={() => toggle(idx)} className="w-5 h-5 rounded text-teal-600" />
                                            <span className="text-gray-700 text-sm">{item}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                    {/* Reset globalIdx for re-render */}
                    <span className="hidden">{globalIdx = 0}</span>

                    <button onClick={calcular} className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg mt-4">
                        Calcular Puntuación
                    </button>

                    {resultado && (
                        <div className="mt-8">
                            <div className={`rounded-2xl p-6 text-center ${resultado.bg} border`}>
                                <p className="text-sm text-gray-600">Mini-Mental State Examination</p>
                                <p className={`text-6xl font-black ${resultado.color}`}>{resultado.total}/30</p>
                                <p className={`text-xl font-bold ${resultado.color} mt-2`}>{resultado.label}</p>
                                <p className="text-gray-700 text-sm mt-3 max-w-lg mx-auto">{resultado.desc}</p>
                            </div>
                            <div className="mt-4 grid grid-cols-5 gap-1 text-center text-xs">
                                <div className="bg-green-50 p-2 rounded"><span className="font-bold text-green-700">27-30</span><br />Normal</div>
                                <div className="bg-yellow-50 p-2 rounded"><span className="font-bold text-yellow-700">24-26</span><br />Leve</div>
                                <div className="bg-orange-50 p-2 rounded"><span className="font-bold text-orange-700">18-23</span><br />Moderado</div>
                                <div className="bg-red-50 p-2 rounded"><span className="font-bold text-red-600">11-17</span><br />Mod-Severo</div>
                                <div className="bg-red-100 p-2 rounded"><span className="font-bold text-red-800">0-10</span><br />Severo</div>
                            </div>
                        </div>
                    )}
                </div>

                <AdBanner variant="horizontal" className="mb-8" />

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Guía: Mini-Mental para Detección de Demencia</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>El <strong>Mini-Mental State Examination (MMSE)</strong> fue creado en 1975 por los Drs. Marshal Folstein, Susan Folstein y Paul McHugh. Es la prueba de tamizaje cognitivo <strong>más utilizada en el mundo</strong>.</p>
                        <p>Evalúa 6 dominios cognitivos en aproximadamente <strong>5-10 minutos</strong>: orientación temporal y espacial, memoria inmediata y diferida, atención/cálculo, lenguaje y praxias constructivas.</p>

                        <h3 className="text-xl font-bold text-gray-800 mt-6">¿Cuándo aplicar el MMSE?</h3>
                        <ul>
                            <li><strong>Adultos mayores de 65 años</strong> con quejas de memoria</li>
                            <li><strong>Sospecha de demencia</strong> (Alzheimer, vascular, frontotemporal)</li>
                            <li><strong>Seguimiento</strong> de deterioro cognitivo ya diagnosticado</li>
                            <li><strong>Evaluación geriátrica integral</strong></li>
                        </ul>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6 rounded-r-xl">
                            <h4 className="text-blue-800 font-bold mb-2">💡 Importante: Ajustar por escolaridad</h4>
                            <p className="text-blue-700 m-0">En México, donde muchos adultos mayores tienen baja escolaridad, el punto de corte se ajusta: <strong>≤ 23 puntos</strong> con más de 5 años de estudio, o <strong>≤ 19 puntos</strong> con menos de 5 años de estudio.</p>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mt-6">Estudios de laboratorio complementarios</h3>
                        <ul>
                            <li><a href="/estudios" className="text-blue-600 font-semibold hover:underline">Perfil tiroideo (TSH, T4 libre)</a> — descartar hipotiroidismo que causa deterioro cognitivo reversible</li>
                            <li><a href="/estudios" className="text-blue-600 font-semibold hover:underline">Vitamina B12 y ácido fólico</a> — su deficiencia causa demencia reversible</li>
                            <li><a href="/estudios" className="text-blue-600 font-semibold hover:underline">Química sanguínea completa</a> — descartar causas metabólicas</li>
                            <li><a href="/estudios" className="text-blue-600 font-semibold hover:underline">VDRL</a> — descartar neurosífilis en población de riesgo</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 mb-8">
                    <strong>⚠️ Aviso:</strong> El MMSE es una herramienta de tamizaje. Un resultado anormal no es diagnóstico de demencia por sí solo. Se requiere evaluación neuropsicológica completa y neuroimagen para confirmar el diagnóstico.
                </div>

                
                <RelatedTools currentPath="/herramientas/mini-mental-mmse" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
