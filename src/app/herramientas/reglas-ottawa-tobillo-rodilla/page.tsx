'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function OttawaRulesPage() {
    const [tipo, setTipo] = useState<'tobillo' | 'rodilla'>('tobillo');
    // Tobillo
    const [tA, setTA] = useState(false); // dolor maléolo posterior lat
    const [tB, setTB] = useState(false); // dolor maléolo posterior med
    const [tC, setTC] = useState(false); // dolor base 5to metatarsiano
    const [tD, setTD] = useState(false); // dolor navicular
    const [tE, setTE] = useState(false); // no puede caminar 4 pasos
    // Rodilla
    const [rA, setRA] = useState(false); // >55 años
    const [rB, setRB] = useState(false); // dolor aislado en rótula
    const [rC, setRC] = useState(false); // dolor cabeza peroné
    const [rD, setRD] = useState(false); // no puede flexionar 90°
    const [rE, setRE] = useState(false); // no puede caminar 4 pasos

    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        let necesitaRx = false, criterios: string[] = [];
        if (tipo === 'tobillo') {
            if (tA) { necesitaRx = true; criterios.push('Dolor en borde posterior del maléolo lateral (6 cm distales)'); }
            if (tB) { necesitaRx = true; criterios.push('Dolor en borde posterior del maléolo medial (6 cm distales)'); }
            if (tC) { necesitaRx = true; criterios.push('Dolor en base del 5° metatarsiano'); }
            if (tD) { necesitaRx = true; criterios.push('Dolor en hueso navicular (escafoides del pie)'); }
            if (tE) { necesitaRx = true; criterios.push('Incapacidad para dar 4 pasos inmediatamente y en urgencias'); }
        } else {
            if (rA) { necesitaRx = true; criterios.push('Edad ≥ 55 años'); }
            if (rB) { necesitaRx = true; criterios.push('Dolor aislado en la rótula (sin otro dolor óseo)'); }
            if (rC) { necesitaRx = true; criterios.push('Dolor en la cabeza del peroné'); }
            if (rD) { necesitaRx = true; criterios.push('Incapacidad para flexionar la rodilla a 90°'); }
            if (rE) { necesitaRx = true; criterios.push('Incapacidad para dar 4 pasos inmediatamente y en urgencias'); }
        }
        setResultado({ necesitaRx, criterios, tipo });
    };

    const reset = () => {
        setTA(false); setTB(false); setTC(false); setTD(false); setTE(false);
        setRA(false); setRB(false); setRC(false); setRD(false); setRE(false);
        setResultado(null);
    };

    const CheckItem = ({ checked, onChange, label, desc }: any) => (
        <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all mb-3 ${checked ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
            <input type="checkbox" checked={checked} onChange={() => onChange(!checked)} className="w-5 h-5 mt-1 rounded text-blue-600" />
            <div>
                <span className="font-bold text-gray-800">{label}</span>
                {desc && <p className="text-gray-500 text-sm mt-1">{desc}</p>}
            </div>
        </label>
    );

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-blue-800 to-indigo-900 py-10 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-blue-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🦶 Reglas de Ottawa — ¿Necesito Rayos X?</h1>
                    <p className="text-blue-100 mt-2 text-lg">Determina si un traumatismo de tobillo, pie o rodilla requiere radiografía para descartar fractura</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
                        <p className="text-blue-800 text-sm"><strong>Sensibilidad: ~98-100%.</strong> Estas reglas tienen un valor predictivo negativo altísimo: si NINGÚN criterio es positivo, la probabilidad de fractura es &lt;2%. Reduce radiografías innecesarias en un 30-40%.</p>
                    </div>

                    <div className="flex gap-3 mb-6">
                        <button onClick={() => { setTipo('tobillo'); reset(); }} className={`flex-1 py-3 rounded-xl font-bold transition-all ${tipo === 'tobillo' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>🦶 Tobillo / Pie</button>
                        <button onClick={() => { setTipo('rodilla'); reset(); }} className={`flex-1 py-3 rounded-xl font-bold transition-all ${tipo === 'rodilla' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>🦵 Rodilla</button>
                    </div>

                    {tipo === 'tobillo' ? (
                        <>
                            <h3 className="font-bold text-gray-800 mb-3">¿Presenta alguno de los siguientes?</h3>
                            <CheckItem checked={tA} onChange={setTA} label="Dolor óseo en borde posterior del maléolo lateral (peroné)" desc="Palpar los 6 cm distales del borde posterior del peroné" />
                            <CheckItem checked={tB} onChange={setTB} label="Dolor óseo en borde posterior del maléolo medial (tibia)" desc="Palpar los 6 cm distales del borde posterior de la tibia" />
                            <CheckItem checked={tC} onChange={setTC} label="Dolor en la base del 5° metatarsiano" desc="Dolor en el hueso que sobresale en el borde externo del pie" />
                            <CheckItem checked={tD} onChange={setTD} label="Dolor en el hueso navicular" desc="Dolor en la parte interna media del pie" />
                            <CheckItem checked={tE} onChange={setTE} label="No puede caminar 4 pasos completos" desc="Ni inmediatamente después del traumatismo ni al momento de la evaluación" />
                        </>
                    ) : (
                        <>
                            <h3 className="font-bold text-gray-800 mb-3">¿Presenta alguno de los siguientes?</h3>
                            <CheckItem checked={rA} onChange={setRA} label="Edad ≥ 55 años" />
                            <CheckItem checked={rB} onChange={setRB} label="Dolor aislado en la rótula" desc="Dolor únicamente en la rótula, sin dolor en otros huesos de la rodilla" />
                            <CheckItem checked={rC} onChange={setRC} label="Dolor en la cabeza del peroné" desc="Dolor en la prominencia ósea en la parte externa de la rodilla" />
                            <CheckItem checked={rD} onChange={setRD} label="No puede flexionar la rodilla a 90°" />
                            <CheckItem checked={rE} onChange={setRE} label="No puede caminar 4 pasos completos" desc="Ni inmediatamente después del traumatismo ni al momento de la evaluación" />
                        </>
                    )}

                    <button onClick={calcular} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg mt-4">
                        Evaluar Ottawa
                    </button>

                    {resultado && (
                        <div className="mt-8">
                            <div className={`rounded-2xl p-6 text-center border ${resultado.necesitaRx ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                                <p className="text-6xl mb-3">{resultado.necesitaRx ? '📸' : '✅'}</p>
                                <p className={`text-2xl font-black ${resultado.necesitaRx ? 'text-red-700' : 'text-green-700'}`}>
                                    {resultado.necesitaRx ? 'SÍ — Se recomienda Radiografía' : 'NO — Radiografía probablemente innecesaria'}
                                </p>
                                {resultado.necesitaRx ? (
                                    <div className="mt-4 text-left">
                                        <p className="text-red-800 font-bold text-sm mb-2">Criterios positivos:</p>
                                        <ul className="space-y-1">
                                            {resultado.criterios.map((c: string, i: number) => (
                                                <li key={i} className="text-red-700 text-sm flex items-start gap-2">
                                                    <span className="mt-1">•</span> {c}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <p className="text-green-700 text-sm mt-3">Sin criterios de Ottawa positivos. Probabilidad de fractura &lt;2%. Manejo conservador: hielo, reposo, analgésicos y reevaluación en 5-7 días.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <AdBanner variant="horizontal" className="mb-8" />

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Guía: Reglas de Ottawa para Tobillo, Pie y Rodilla</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>Las <strong>Reglas de Ottawa</strong> fueron desarrolladas en 1992 por el Dr. Ian Stiell en el Hospital de Ottawa, Canadá. Son las reglas de decisión clínica <strong>más validadas en medicina de urgencias</strong>, con más de 30 estudios en diferentes países.</p>
                        <p>Su principal virtud: tienen una <strong>sensibilidad cercana al 100%</strong> para detectar fracturas clínicamente significativas, lo que significa que si todos los criterios son negativos, es extremadamente improbable que haya fractura.</p>

                        <h3 className="text-xl font-bold text-gray-800 mt-6">¿Cuándo NO aplicar las Reglas de Ottawa?</h3>
                        <ul>
                            <li>Menores de 18 años (especialmente &lt;5 años — lesiones en placa de crecimiento)</li>
                            <li>Embarazadas</li>
                            <li>Pacientes intoxicados o con alteración neurológica</li>
                            <li>Lesiones que tienen más de 10 días</li>
                            <li>Politraumatizados</li>
                        </ul>

                        <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6 rounded-r-xl">
                            <h4 className="text-green-800 font-bold mb-2">💡 Para deportistas</h4>
                            <p className="text-green-700 m-0">Si te torciste el tobillo jugando fútbol y puedes caminar 4 pasos (aunque duela), y no hay dolor en los huesos (solo en ligamentos), probablemente <strong>no necesitas rayos X</strong>. Pero si el dolor persiste más de 5 días, consulta al médico.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 mb-8">
                    <strong>⚠️ Aviso:</strong> Las Reglas de Ottawa son una herramienta clínica de apoyo. No sustituyen el juicio del médico. Si tiene dolor intenso o deformidad visible, acuda a urgencias.
                </div>
            
                <RelatedTools currentPath="/herramientas/reglas-ottawa-tobillo-rodilla" className="mb-8" />
            </div>
        </main>
    );
}
