'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function EscalaCentorPage() {
    const [temp, setTemp] = useState(false);
    const [tos, setTos] = useState(false);
    const [exudado, setExudado] = useState(false);
    const [adenopatias, setAdenopatias] = useState(false);
    const [edad, setEdad] = useState<number | null>(null);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        if (edad === null) return;
        let total = (temp ? 1 : 0) + (tos ? 1 : 0) + (exudado ? 1 : 0) + (adenopatias ? 1 : 0) + edad;
        let label = '', color = '', bg = '', desc = '', prob = '';
        if (total <= 0) {
            label = 'Muy bajo riesgo de faringitis bacteriana'; color = 'text-green-700'; bg = 'bg-green-50';
            prob = '~2.5%'; desc = 'Probablemente viral. No se recomienda cultivo ni antibiótico. Manejo sintomático: analgésicos y líquidos.';
        } else if (total === 1) {
            label = 'Bajo riesgo'; color = 'text-green-600'; bg = 'bg-green-50';
            prob = '~6-7%'; desc = 'Posiblemente viral. No se recomienda antibiótico empírico. Considerar cultivo faríngeo rápido solo si persiste >5 días.';
        } else if (total === 2) {
            label = 'Riesgo moderado'; color = 'text-yellow-700'; bg = 'bg-yellow-50';
            prob = '~15%'; desc = 'Solicitar prueba rápida de antígeno estreptocócico o cultivo faríngeo. Antibiótico SOLO si resultado positivo.';
        } else if (total === 3) {
            label = 'Riesgo moderado-alto'; color = 'text-orange-700'; bg = 'bg-orange-50';
            prob = '~30-35%'; desc = 'Solicitar prueba rápida estreptocócica. Si es positiva, iniciar penicilina o amoxicilina. Si es negativa, manejo sintomático.';
        } else {
            label = 'Alto riesgo de estreptococo'; color = 'text-red-700'; bg = 'bg-red-50';
            prob = '~50-55%'; desc = 'Alta probabilidad de faringitis estreptocócica (Strep A). Se justifica antibiótico empírico con penicilina V oral o amoxicilina por 10 días. Confirmar idealmente con cultivo.';
        }
        setResultado({ total, label, color, bg, desc, prob });
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-amber-700 to-orange-800 py-10 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-amber-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🤒 Score de Centor Modificado (McIsaac)</h1>
                    <p className="text-amber-100 mt-2 text-lg">Determina si el dolor de garganta necesita antibiótico o es probablemente viral</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200">
                        <p className="text-amber-800 text-sm"><strong>¿Para qué sirve?</strong> Cuando alguien tiene dolor de garganta, este score ayuda a decidir si necesita antibiótico (infección bacteriana por Streptococcus) o solo tratamiento para el dolor (infección viral).</p>
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mb-4">Criterios de Centor-McIsaac</h2>

                    {[
                        { checked: temp, set: setTemp, label: 'Fiebre > 38°C (medida o referida)', emoji: '🌡️' },
                        { checked: tos, set: setTos, label: 'Ausencia de tos', desc: 'La ausencia de tos sugiere origen bacteriano; la presencia de tos sugiere viral', emoji: '🚫' },
                        { checked: exudado, set: setExudado, label: 'Exudado o inflamación amigdalina', desc: 'Amígdalas rojas, hinchadas o con «placas» blancas', emoji: '👅' },
                        { checked: adenopatias, set: setAdenopatias, label: 'Adenopatías cervicales anteriores dolorosas', desc: 'Ganglios inflamados y sensibles debajo de la mandíbula', emoji: '🔴' },
                    ].map((item, i) => (
                        <label key={i} className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all mb-3 ${item.checked ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-gray-300'}`}>
                            <input type="checkbox" checked={item.checked} onChange={() => item.set(!item.checked)} className="w-5 h-5 mt-1 rounded text-amber-600" />
                            <div>
                                <span className="text-lg mr-2">{item.emoji}</span>
                                <span className="font-bold text-gray-800">{item.label}</span>
                                {item.desc && <p className="text-gray-500 text-sm mt-1">{item.desc}</p>}
                            </div>
                        </label>
                    ))}

                    <div className="mb-4 mt-4">
                        <h3 className="text-sm font-bold text-gray-700 mb-2">🎂 Edad del paciente (ajuste McIsaac):</h3>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: '3-14 años (+1 pt)', pts: 1 },
                                { label: '15-44 años (0 pts)', pts: 0 },
                                { label: '≥45 años (−1 pt)', pts: -1 },
                            ].map((opt, i) => (
                                <button key={i} onClick={() => setEdad(opt.pts)}
                                    className={`px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all ${edad === opt.pts ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button onClick={calcular} disabled={edad === null}
                        className="w-full bg-amber-700 hover:bg-amber-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg mt-4">
                        Evaluar Centor
                    </button>

                    {resultado && (
                        <div className="mt-8">
                            <div className={`rounded-2xl p-6 text-center ${resultado.bg} border`}>
                                <p className="text-sm text-gray-600">Score de Centor-McIsaac</p>
                                <p className={`text-6xl font-black ${resultado.color}`}>{resultado.total}/5</p>
                                <p className={`font-bold text-lg ${resultado.color} mt-1`}>Probabilidad de Strep A: {resultado.prob}</p>
                                <p className={`text-xl font-bold ${resultado.color} mt-2`}>{resultado.label}</p>
                                <p className="text-gray-700 text-sm mt-3 max-w-lg mx-auto">{resultado.desc}</p>
                            </div>
                        </div>
                    )}
                </div>

                <AdBanner variant="horizontal" className="mb-8" />

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Guía: ¿Cuándo dar antibiótico por dolor de garganta?</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>El <strong>80% de los dolores de garganta son virales</strong> y no necesitan antibiótico. El score de Centor (1981) modificado por McIsaac (1998) ayuda a identificar el 20% que sí es bacteriano (Streptococcus del grupo A).</p>

                        <h3 className="text-xl font-bold text-gray-800 mt-6">¿Por qué importa tratar el estreptococo?</h3>
                        <ul>
                            <li><strong>Fiebre reumática</strong> — puede dañar las válvulas del corazón permanentemente (especialmente en niños)</li>
                            <li><strong>Glomerulonefritis post-estreptocócica</strong> — daño renal</li>
                            <li><strong>Absceso periamigdalino</strong> — complicación que requiere drenaje quirúrgico</li>
                        </ul>

                        <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6 rounded-r-xl">
                            <h4 className="text-green-800 font-bold mb-2">💡 Para padres de familia</h4>
                            <p className="text-green-700 m-0">Si su hijo tiene dolor de garganta <strong>con tos, moqueo y ojos rojos</strong>, es casi seguro un virus — no necesita antibiótico. Si tiene <strong>fiebre alta, placas blancas en amígdalas y ganglios inflamados sin tos</strong>, llévelo al pediatra para prueba rápida de Strep.</p>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mt-6">Estudios de laboratorio</h3>
                        <ul>
                            <li><a href="/estudios" className="text-blue-600 font-semibold hover:underline">Antiestreptolisinas (ASLO)</a> — detecta anticuerpos contra estreptococo</li>
                            <li><a href="/estudios" className="text-blue-600 font-semibold hover:underline">Biometría hemática</a> — leucocitosis con neutrofilia sugiere infección bacteriana</li>
                            <li><a href="/estudios" className="text-blue-600 font-semibold hover:underline">Proteína C reactiva (PCR)</a> — marcador de inflamación</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 mb-8">
                    <strong>⚠️ Aviso:</strong> Esta herramienta es orientativa. El diagnóstico definitivo de faringitis estreptocócica requiere prueba rápida de antígeno o cultivo faríngeo.
                </div>
            
                <RelatedTools currentPath="/herramientas/score-centor-faringitis" className="mb-8" />
            </div>
        </main>
    );
}
