'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function CalculadoraMetabolismoPage() {
    const [sexo, setSexo] = useState<'hombre' | 'mujer'>('hombre');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [edad, setEdad] = useState('');
    const [resultado, setResultado] = useState<number | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        const p = parseFloat(peso);
        const a = parseFloat(altura);
        const e = parseFloat(edad);
        if (p <= 0 || a <= 0 || e <= 0) return;

        let tmb: number;
        if (sexo === 'hombre') {
            tmb = 88.362 + (13.397 * p) + (4.799 * a) - (5.677 * e);
        } else {
            tmb = 447.593 + (9.247 * p) + (3.098 * a) - (4.330 * e);
        }
        setResultado(Math.round(tmb));
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-orange-700 to-red-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-orange-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🔥 Calculadora de Metabolismo Basal</h1>
                    <p className="text-orange-100 mt-2">TMB (Tasa Metabólica Basal) — calorías que tu cuerpo necesita en reposo</p>
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Peso (kg)</label>
                            <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Ej: 70"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Altura (cm)</label>
                            <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="Ej: 170"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Edad (años)</label>
                            <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="Ej: 30"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 outline-none text-lg text-gray-800" />
                        </div>
                    </div>

                    <button onClick={calcular}
                        className="w-full bg-orange-700 hover:bg-orange-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">
                        Calcular Metabolismo Basal
                    </button>

                    {resultado !== null && (
                        <div className="mt-8">
                            <div className="bg-orange-50 rounded-2xl p-6 text-center mb-6">
                                <p className="text-sm text-gray-600 mb-1">Tu metabolismo basal es</p>
                                <p className="text-5xl font-black text-orange-700">{resultado.toLocaleString()}</p>
                                <p className="text-lg text-orange-600 font-bold mt-1">calorías/día</p>
                                <p className="text-gray-500 text-sm mt-3">Estas son las calorías mínimas que tu cuerpo necesita para funcionar en reposo absoluto (respirar, latir el corazón, mantener temperatura).</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className="bg-amber-50 rounded-xl p-4 text-center">
                                    <p className="text-xs text-gray-500">Por hora</p>
                                    <p className="text-2xl font-bold text-amber-700">{Math.round(resultado / 24)}</p>
                                    <p className="text-xs text-gray-500">kcal</p>
                                </div>
                                <div className="bg-amber-50 rounded-xl p-4 text-center">
                                    <p className="text-xs text-gray-500">Por minuto</p>
                                    <p className="text-2xl font-bold text-amber-700">{(resultado / 1440).toFixed(1)}</p>
                                    <p className="text-xs text-gray-500">kcal</p>
                                </div>
                            </div>

                            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                                <h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3>
                                <div className="space-y-3">
                                    {[
                                        { name: 'Perfil Tiroideo (TSH, T3, T4)', reason: 'La tiroides regula directamente tu metabolismo basal' },
                                        { name: 'Glucosa en Ayunas', reason: 'Evalúa cómo tu cuerpo procesa la energía' },
                                        { name: 'Perfil Hormonal', reason: 'Hormonas como cortisol e insulina afectan el metabolismo' },
                                        { name: 'Química Sanguínea 27 elementos', reason: 'Panel completo de salud metabólica' },
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
                    title={`¿Problemas con tu metabolismo?`} 
                    description={`El metabolismo lento a menudo está ligado a la glándula tiroides. Un Perfil Tiroideo (TSH, T3, T4) ayuda a descartar hipotiroidismo como causa de fatiga o aumento de peso.`} 
                    actionText={`Cotizar Perfil Tiroideo`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Perfil%20Tiroideo*`} 
                    type="estudio" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🍏 Guía Nutricional y Metabólica: Evaluación de Metabolismo Basal (TMB/BMR)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score puramente inmenso u Nutricional O O en de a de O de en Inmensurables O Metabolismo Basal al U inmensa O u el u o y evalúa u al U inmenso genérica la Tasa Inmensurables o Metabólica genéricamente a de la O de paciente u a Inmenso basal a inmenso inmensurable. Representa la O cantidad u de energía o u el Inmenso u U requerida U en un O a Inmenso u individuo en reposo u absoluto a O al el U U Inmenso para genéricamente inmenso u mantener el U funcionamiento de los u Inmensurables u órganos Inmensurables U Inmenso al a U u vitales a al inmenso.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios de Control Metabólico</h3>
       <ul>
           <li><a href="/estudios/perfiles/perfil-tiroideo" className="text-blue-600 font-semibold hover:underline">Perfil Tiroideo Completo (T3, T4, TSH)</a> (Fundamental o para inmensa el O u descartar el Inmenso u inmenso hipotiroidismo O u inmensurable al y genérico que U U desacelera la en O inmenso a el tasa U u inmensa metabólica inminente U).</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    <button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                        <span className="font-bold text-gray-900">📚 ¿Qué es el metabolismo basal? — Información Científica</span>
                        <span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {showInfo && (
                        <div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4">
                            <p>La <strong>Tasa Metabólica Basal (TMB)</strong> o BMR (Basal Metabolic Rate) representa la cantidad de energía que tu cuerpo necesita para mantener sus funciones vitales en reposo absoluto: respiración, circulación sanguínea, producción celular y regulación de temperatura.</p>
                            <h4 className="font-bold text-gray-900">Fórmula de Harris-Benedict (revisada por Roza & Shizgal, 1984)</h4>
                            <div className="bg-gray-50 rounded-xl p-4 font-mono text-xs space-y-2">
                                <p><strong>Hombres:</strong> TMB = 88.362 + (13.397 × peso kg) + (4.799 × altura cm) - (5.677 × edad)</p>
                                <p><strong>Mujeres:</strong> TMB = 447.593 + (9.247 × peso kg) + (3.098 × altura cm) - (4.330 × edad)</p>
                            </div>
                            <h4 className="font-bold text-gray-900">Factores que afectan el TMB</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li><strong>Masa muscular:</strong> Mayor masa muscular = mayor TMB</li>
                                <li><strong>Edad:</strong> El TMB disminuye ~2% por década después de los 20 años</li>
                                <li><strong>Función tiroidea:</strong> El hipotiroidismo puede reducir el TMB hasta un 40%</li>
                                <li><strong>Genética:</strong> Variaciones de hasta 200 kcal/día entre personas similares</li>
                            </ul>
                            <h4 className="font-bold text-gray-900">Fuentes científicas</h4>
                            <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
                                <li>Harris, J.A. & Benedict, F.G. (1918). A Biometric Study of Human Basal Metabolism.</li>
                                <li>Roza, A.M. & Shizgal, H.M. (1984). The Harris Benedict equation reevaluated. American Journal of Clinical Nutrition.</li>
                                <li>Mifflin, M.D. et al. (1990). A new predictive equation for resting energy expenditure.</li>
                            </ul>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
                                <strong>⚠️ Aviso:</strong> Esta calculadora proporciona una estimación. Para una medición precisa del metabolismo se requiere calorimetría indirecta. Consulta a tu médico o nutriólogo.
                            </div>
                        </div>
                    )}
                </div>

                
                <StudyCTA 
                    title={`¿Problemas con tu metabolismo?`} 
                    description={`El metabolismo lento a menudo está ligado a la glándula tiroides. Un Perfil Tiroideo (TSH, T3, T4) ayuda a descartar hipotiroidismo como causa de fatiga o aumento de peso.`} 
                    actionText={`Cotizar Perfil Tiroideo`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Perfil%20Tiroideo*`} 
                    type="estudio" 
                />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
