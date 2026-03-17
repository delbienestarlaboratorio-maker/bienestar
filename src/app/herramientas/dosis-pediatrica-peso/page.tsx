'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { RelatedTools } from '@/components/ui/RelatedTools';

const MEDICAMENTOS = [
    { name: 'Paracetamol (Acetaminofén)', dosis: 15, unidad: 'mg', freq: 'cada 6 horas', max: 60, nota: 'No exceder 5 dosis en 24h. Dosis máxima diaria: 75 mg/kg o 4g (lo que sea menor).', concentracion: '100 mg/mL (gotas) o 160 mg/5mL (jarabe)', emoji: '🌡️' },
    { name: 'Ibuprofeno', dosis: 10, unidad: 'mg', freq: 'cada 8 horas', max: 40, nota: 'Solo mayores de 6 meses. Administrar con alimentos. No usar si hay deshidratación.', concentracion: '100 mg/5mL (jarabe)', emoji: '💊' },
    { name: 'Amoxicilina (dosis estándar)', dosis: 50, unidad: 'mg', freq: 'cada 8 horas', max: 100, nota: 'Dosis estándar para infecciones comunes (otitis, faringitis, ITU). Completar esquema 7-10 días.', concentracion: '250 mg/5mL o 500 mg/5mL', emoji: '💉' },
    { name: 'Amoxicilina (dosis alta – Otitis)', dosis: 90, unidad: 'mg', freq: 'cada 12 horas', max: 90, nota: 'Dosis alta para otitis media aguda o neumococo resistente. Dividir en 2 tomas.', concentracion: '400 mg/5mL', emoji: '👂' },
    { name: 'Salbutamol (nebulización)', dosis: 0.15, unidad: 'mg', freq: 'cada 20 min (crisis) o cada 4-6h', max: 0.3, nota: 'Diluir en 3 mL de solución salina. Dosis min 2.5 mg, máx 5 mg por nebulización.', concentracion: '5 mg/mL (solución)', emoji: '🫁' },
    { name: 'Ondansetrón (antivomitivo)', dosis: 0.15, unidad: 'mg', freq: 'dosis única (puede repetir cada 8h)', max: 0.45, nota: 'Máximo 4 mg por dosis. Útil para prevenir vómito por gastroenteritis aguda.', concentracion: '4 mg/5mL o tabletas 4mg', emoji: '🤢' },
    { name: 'Prednisolona (crup/asma)', dosis: 1, unidad: 'mg', freq: 'cada 24 horas', max: 2, nota: 'Tratamiento corto (3-5 días). Máximo 60 mg/día. No suspender abruptamente si >7 días.', concentracion: '15 mg/5mL', emoji: '🔬' },
];

export default function DosisPediatricaPage() {
    const [peso, setPeso] = useState('');
    const [medIdx, setMedIdx] = useState(0);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const p = parseFloat(peso);
        if (!p || p <= 0 || p > 150) return;
        const med = MEDICAMENTOS[medIdx];
        const dosisCalc = Math.round(p * med.dosis * 100) / 100;
        setResultado({
            med: med.name,
            dosis: dosisCalc,
            unidad: med.unidad,
            freq: med.freq,
            nota: med.nota,
            concentracion: med.concentracion,
            peso: p,
            dosisPorKg: med.dosis,
        });
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 py-10 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-purple-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">👶💊 Calculadora de Dosis Pediátrica por Peso</h1>
                    <p className="text-purple-100 mt-2 text-lg">Calcula la dosis correcta de los medicamentos pediátricos más comunes según el peso del niño</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">

                    <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
                        <p className="text-red-800 text-sm font-bold">⚠️ IMPORTANTE: Esta calculadora es una referencia. SIEMPRE confirme la dosis con el pediatra antes de administrar cualquier medicamento a un menor.</p>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">⚖️ Peso del niño (kg):</label>
                        <input type="number" value={peso} onChange={e => setPeso(e.target.value)} placeholder="Ej: 12.5"
                            className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none" min="0.5" max="150" step="0.1" />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">💊 Medicamento:</label>
                        <div className="space-y-2">
                            {MEDICAMENTOS.map((med, i) => (
                                <button key={i} onClick={() => setMedIdx(i)} className={`w-full text-left p-3 rounded-xl border-2 transition-all ${i === medIdx ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <span className="font-bold text-gray-800">{med.emoji} {med.name}</span>
                                    <span className="text-gray-500 text-sm ml-2">({med.dosis} {med.unidad}/kg, {med.freq})</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button onClick={calcular} disabled={!peso || parseFloat(peso) <= 0}
                        className="w-full bg-purple-700 hover:bg-purple-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg">
                        Calcular Dosis
                    </button>

                    {resultado && (
                        <div className="mt-8 bg-purple-50 rounded-2xl p-6 border border-purple-200">
                            <h3 className="text-lg font-bold text-purple-900 mb-3">{resultado.med}</h3>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                                    <p className="text-sm text-gray-500">Dosis por toma</p>
                                    <p className="text-3xl font-black text-purple-700">{resultado.dosis} {resultado.unidad}</p>
                                    <p className="text-xs text-gray-500">({resultado.dosisPorKg} {resultado.unidad}/kg × {resultado.peso} kg)</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                                    <p className="text-sm text-gray-500">Frecuencia</p>
                                    <p className="text-xl font-bold text-purple-700 mt-2">{resultado.freq}</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 text-sm">
                                <p className="font-bold text-gray-800 mb-1">📋 Presentación: <span className="font-normal text-gray-600">{resultado.concentracion}</span></p>
                                <p className="font-bold text-gray-800">📝 Nota: <span className="font-normal text-gray-600">{resultado.nota}</span></p>
                            </div>
                        </div>
                    )}
                </div>

                <AdBanner variant="horizontal" className="mb-8" />

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Guía para Padres: Dosis Pediátricas</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>Los medicamentos en niños se calculan <strong>por kilogramo de peso</strong>, nunca por edad. Un niño de 5 años que pesa 25 kg necesita una dosis muy diferente a uno de 5 años que pesa 15 kg.</p>

                        <h3 className="text-xl font-bold text-gray-800 mt-6">Errores comunes que debes evitar:</h3>
                        <ul>
                            <li><strong>No usar cucharas de cocina</strong> — siempre use jeringa dosificadora o el vasito medidor que trae el medicamento</li>
                            <li><strong>No duplicar medicamentos</strong> — el paracetamol y «Tempra» son lo mismo; el ibuprofeno y «Motrin» son lo mismo</li>
                            <li><strong>No dar ibuprofeno a menores de 6 meses</strong></li>
                            <li><strong>No dar aspirina a niños</strong> — riesgo de Síndrome de Reye</li>
                        </ul>

                        <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6 rounded-r-xl">
                            <h4 className="text-green-800 font-bold mb-2">✅ Tip: ¿Cuándo alternar paracetamol e ibuprofeno?</h4>
                            <p className="text-green-700 m-0">Si la fiebre no baja con paracetamol solo, puedes alternar: paracetamol a las 12:00, ibuprofeno a las 15:00, paracetamol a las 18:00. <strong>Siempre bajo indicación del pediatra.</strong></p>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 mb-8">
                    <strong>⚠️ Aviso:</strong> Esta calculadora es una referencia educativa. Consulte siempre al pediatra antes de administrar cualquier medicamento. Las dosis pueden variar según la condición clínica del paciente.
                </div>
            
                <RelatedTools currentPath="/herramientas/dosis-pediatrica-peso" className="mb-8" />
            </div>
        </main>
    );
}
