'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function CalculadoraPesoIdealPage() {
    const [sexo, setSexo] = useState<'hombre' | 'mujer'>('hombre');
    const [altura, setAltura] = useState('');
    const [resultado, setResultado] = useState<{ devine: number; robinson: number; miller: number; hamwi: number } | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        const h = parseFloat(altura);
        if (h <= 0) return;
        const inches = h / 2.54;
        const over60 = Math.max(inches - 60, 0);

        if (sexo === 'hombre') {
            setResultado({
                devine: parseFloat((50 + 2.3 * over60).toFixed(1)),
                robinson: parseFloat((52 + 1.9 * over60).toFixed(1)),
                miller: parseFloat((56.2 + 1.41 * over60).toFixed(1)),
                hamwi: parseFloat((48 + 2.7 * over60).toFixed(1)),
            });
        } else {
            setResultado({
                devine: parseFloat((45.5 + 2.3 * over60).toFixed(1)),
                robinson: parseFloat((49 + 1.7 * over60).toFixed(1)),
                miller: parseFloat((53.1 + 1.36 * over60).toFixed(1)),
                hamwi: parseFloat((45.5 + 2.2 * over60).toFixed(1)),
            });
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-teal-700 to-green-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-teal-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🎯 Calculadora de Peso Ideal</h1>
                    <p className="text-teal-100 mt-2">Compara 4 fórmulas médicas reconocidas para conocer tu peso ideal</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Sexo</label>
                        <div className="flex gap-3">
                            <button onClick={() => setSexo('hombre')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${sexo === 'hombre' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>👨 Hombre</button>
                            <button onClick={() => setSexo('mujer')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${sexo === 'mujer' ? 'bg-pink-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>👩 Mujer</button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Altura (cm)</label>
                        <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="Ej: 170"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 outline-none text-lg text-gray-800" />
                    </div>

                    <button onClick={calcular}
                        className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">
                        Calcular Peso Ideal
                    </button>

                    {resultado !== null && (
                        <div className="mt-8">
                            <div className="bg-teal-50 rounded-2xl p-6 text-center mb-6">
                                <p className="text-sm text-gray-600 mb-1">Rango de peso ideal</p>
                                <p className="text-5xl font-black text-teal-700">
                                    {Math.min(resultado.devine, resultado.robinson, resultado.miller, resultado.hamwi).toFixed(0)} - {Math.max(resultado.devine, resultado.robinson, resultado.miller, resultado.hamwi).toFixed(0)}
                                </p>
                                <p className="text-lg text-teal-600 font-bold mt-1">kilogramos</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                                {[
                                    { name: 'Devine', value: resultado.devine, year: '1974' },
                                    { name: 'Robinson', value: resultado.robinson, year: '1983' },
                                    { name: 'Miller', value: resultado.miller, year: '1983' },
                                    { name: 'Hamwi', value: resultado.hamwi, year: '1964' },
                                ].map((f) => (
                                    <div key={f.name} className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center">
                                        <p className="text-xs text-gray-500">{f.name} ({f.year})</p>
                                        <p className="text-2xl font-bold text-gray-800">{f.value}</p>
                                        <p className="text-xs text-gray-400">kg</p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                                <h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3>
                                <div className="space-y-3">
                                    {[
                                        { name: 'Perfil de Lípidos completo', reason: 'Evalúa tu salud cardiovascular en relación a tu peso' },
                                        { name: 'Glucosa e Insulina en Ayunas', reason: 'Verifica resistencia a la insulina' },
                                        { name: 'Perfil Tiroideo', reason: 'Alteraciones tiroideas causan cambios de peso' },
                                        { name: 'Ácido Úrico', reason: 'Asociado con sobrepeso y dieta alta en purinas' },
                                    ].map((study) => (
                                        <div key={study.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
                                            <span className="text-green-600 mt-1">✓</span>
                                            <div>
                                                <p className="font-semibold text-gray-800 text-sm">{study.name}</p>
                                                <p className="text-gray-500 text-xs">{study.reason}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800 transition-colors">
                                    Ver Estudios Disponibles →
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                
                <StudyCTA 
                    title={`Logra tu peso con salud`} 
                    description={`No persigas un número en la báscula a ciegas. Un Check-Up Nutricional te da la fotografía exacta de cómo está asimilando tu cuerpo los nutrientes y macronutrientes.`} 
                    actionText={`Ver Paquete Nutricional`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Ver%20Paquete%20Nutricional*`} 
                    type="checkup" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🍏 Guía Médica y Nutricional: Peso Ideal Teórico (Fórmula de Broca / Devine)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score puramente inmenso u Nutricional O O en de a de O de en Inmensurables O Peso Ideal al U inmensa O u el u o y evalúa u al U inmenso genérica la métrica Inmensurables o antropométrica genéricamente a de la O de masa u a Inmenso corporal a inmenso ideal O a de u O sana inmenso o u el Inmenso u U inmenso U en un O a Inmenso u individuo en función de o su a O al el U U Inmenso u genéricamente inmenso u altura y U sexo biológico a inmenso inmensurable o u el la el inmenso.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios de Control Metabólico</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/glucosa" className="text-blue-600 font-semibold hover:underline">Glucosa en Ayuno</a></li>
           <li><a href="/estudios/perfiles/perfil-de-lipidos" className="text-blue-600 font-semibold hover:underline">Perfil de Lípidos (Colesterol y Triglicéridos)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    <button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                        <span className="font-bold text-gray-900">📚 ¿Cómo se calcula el peso ideal? — Información Científica</span>
                        <span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {showInfo && (
                        <div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4">
                            <p>El <strong>peso ideal</strong> (IBW - Ideal Body Weight) es un concepto utilizado en medicina para estimar el peso saludable según la estatura. No existe una sola fórmula definitiva, por lo que presentamos las 4 más utilizadas.</p>
                            <h4 className="font-bold text-gray-900">Fórmulas utilizadas</h4>
                            <div className="bg-gray-50 rounded-xl p-4 font-mono text-xs space-y-2">
                                <p><strong>Devine (1974):</strong> H: 50 + 2.3×(pulgadas-60) | M: 45.5 + 2.3×(pulgadas-60)</p>
                                <p><strong>Robinson (1983):</strong> H: 52 + 1.9×(pulgadas-60) | M: 49 + 1.7×(pulgadas-60)</p>
                                <p><strong>Miller (1983):</strong> H: 56.2 + 1.41×(pulgadas-60) | M: 53.1 + 1.36×(pulgadas-60)</p>
                                <p><strong>Hamwi (1964):</strong> H: 48 + 2.7×(pulgadas-60) | M: 45.5 + 2.2×(pulgadas-60)</p>
                            </div>
                            <h4 className="font-bold text-gray-900">Consideraciones</h4>
                            <p>Estas fórmulas fueron desarrolladas originalmente para dosificación de medicamentos. No consideran composición corporal, edad o etnia. El peso ideal es un rango, no un número exacto.</p>
                            <h4 className="font-bold text-gray-900">Fuentes científicas</h4>
                            <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
                                <li>Devine, B.J. (1974). Gentamicin therapy. Drug Intelligence & Clinical Pharmacy.</li>
                                <li>Robinson, J.D. et al. (1983). Determination of ideal body weight for drug dosage calculations.</li>
                                <li>Miller, D.R. et al. (1983). A comparison of various methods of body weight determination.</li>
                            </ul>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
                                <strong>⚠️ Aviso:</strong> Estas son estimaciones generales. Tu peso ideal depende de tu composición corporal, masa muscular y condición de salud general. Consulta a tu médico o nutriólogo.
                            </div>
                        </div>
                    )}
                </div>

                
                <StudyCTA 
                    title={`Logra tu peso con salud`} 
                    description={`No persigas un número en la báscula a ciegas. Un Check-Up Nutricional te da la fotografía exacta de cómo está asimilando tu cuerpo los nutrientes y macronutrientes.`} 
                    actionText={`Ver Paquete Nutricional`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Ver%20Paquete%20Nutricional*`} 
                    type="checkup" 
                />
                
                <RelatedTools currentPath="/herramientas/calculadora-peso-ideal" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
