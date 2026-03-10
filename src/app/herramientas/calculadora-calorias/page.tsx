'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function CalculadoraCaloriasPage() {
    const [sexo, setSexo] = useState<'hombre' | 'mujer'>('hombre');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [edad, setEdad] = useState('');
    const [actividad, setActividad] = useState('1.55');
    const [resultado, setResultado] = useState<number | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        const p = parseFloat(peso);
        const a = parseFloat(altura);
        const e = parseFloat(edad);
        const factor = parseFloat(actividad);
        if (p <= 0 || a <= 0 || e <= 0) return;

        let tmb: number;
        if (sexo === 'hombre') {
            tmb = 88.362 + (13.397 * p) + (4.799 * a) - (5.677 * e);
        } else {
            tmb = 447.593 + (9.247 * p) + (3.098 * a) - (4.330 * e);
        }
        setResultado(Math.round(tmb * factor));
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-amber-700 to-orange-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-amber-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🍽️ Calculadora de Calorías Diarias</h1>
                    <p className="text-amber-100 mt-2">TDEE (Total Daily Energy Expenditure) — calorías totales que gastas al día</p>
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
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Altura (cm)</label>
                            <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="Ej: 170"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Edad (años)</label>
                            <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="Ej: 30"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none text-lg text-gray-800" />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nivel de actividad</label>
                        <select value={actividad} onChange={(e) => setActividad(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none text-gray-800">
                            <option value="1.2">Sedentario (oficina, sin ejercicio)</option>
                            <option value="1.375">Ligeramente activo (1-3 días/semana)</option>
                            <option value="1.55">Moderadamente activo (3-5 días/semana)</option>
                            <option value="1.725">Muy activo (6-7 días/semana)</option>
                            <option value="1.9">Extremadamente activo (atleta/trabajo físico)</option>
                        </select>
                    </div>

                    <button onClick={calcular}
                        className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">
                        Calcular Calorías Diarias
                    </button>

                    {resultado !== null && (
                        <div className="mt-8">
                            <div className="bg-amber-50 rounded-2xl p-6 text-center mb-6">
                                <p className="text-sm text-gray-600 mb-1">Tu gasto calórico diario total</p>
                                <p className="text-5xl font-black text-amber-700">{resultado.toLocaleString()}</p>
                                <p className="text-lg text-amber-600 font-bold mt-1">calorías/día</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                                <div className="bg-green-50 rounded-xl p-4 text-center border-2 border-green-200">
                                    <p className="text-xs text-gray-500 mb-1">🔻 Perder peso</p>
                                    <p className="text-2xl font-bold text-green-700">{(resultado - 500).toLocaleString()}</p>
                                    <p className="text-xs text-gray-400">kcal/día (-500)</p>
                                    <p className="text-[10px] text-gray-400 mt-1">≈ 0.5 kg/semana</p>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4 text-center border-2 border-blue-200">
                                    <p className="text-xs text-gray-500 mb-1">⚖️ Mantener peso</p>
                                    <p className="text-2xl font-bold text-blue-700">{resultado.toLocaleString()}</p>
                                    <p className="text-xs text-gray-400">kcal/día</p>
                                    <p className="text-[10px] text-gray-400 mt-1">Tu TDEE actual</p>
                                </div>
                                <div className="bg-orange-50 rounded-xl p-4 text-center border-2 border-orange-200">
                                    <p className="text-xs text-gray-500 mb-1">🔺 Ganar masa</p>
                                    <p className="text-2xl font-bold text-orange-700">{(resultado + 500).toLocaleString()}</p>
                                    <p className="text-xs text-gray-400">kcal/día (+500)</p>
                                    <p className="text-[10px] text-gray-400 mt-1">≈ 0.5 kg/semana</p>
                                </div>
                            </div>

                            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                                <h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3>
                                <div className="space-y-3">
                                    {[
                                        { name: 'Química Sanguínea 27 elementos', reason: 'Panel metabólico completo para tu plan nutricional' },
                                        { name: 'Perfil de Lípidos', reason: 'Colesterol y triglicéridos para ajustar tu dieta' },
                                        { name: 'Glucosa e Insulina', reason: 'Evalúa cómo tu cuerpo procesa los carbohidratos' },
                                        { name: 'Perfil Tiroideo', reason: 'Tiroides influye directamente en cuántas calorías quemas' },
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
                    title={`Optimiza tu nutrición`} 
                    description={`Conocer tus calorías es el primer paso. Si vas a iniciar un régimen, asegúrate de que no haya desbalances básicos con una Biometría Hemática y Glucosa.`} 
                    actionText={`Cotizar Biometría y Glucosa`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Biometr%C3%ADa%20y%20Glucosa*`} 
                    type="estudio" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🔥 Guía Nutricional Metabólica: Calculadora Clínica de Requerimiento Calórico</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score puramente inmenso u Nutricional O de TDEE genérica U O a inmenso inmensurable O U o en es a inmenso el O u a inmenso U estándar U O o en U de genérico U y la o O u estratificación inmensurables genérica O u inmenso para general U la Inmenso O u estimación de de O y requerimientos de energía o O al el el paciente inmenso de la la o la inmensa O u el la Inmensurables u U U genérica O adulto O u mayor u o u U a a inmenso Inmensurables de.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios Clínicos</h3>
       <ul>
           <li><a href="/estudios/perfiles/perfil-tiroideo" className="text-blue-600 font-semibold hover:underline">Perfil Tiroideo Completo (Descarte Metabólico)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    <button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                        <span className="font-bold text-gray-900">📚 ¿Qué es el TDEE? — Información Científica</span>
                        <span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {showInfo && (
                        <div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4">
                            <p>El <strong>TDEE (Total Daily Energy Expenditure)</strong> es el número total de calorías que tu cuerpo quema en un día, incluyendo todas tus actividades. Se calcula multiplicando tu TMB por un factor de actividad.</p>
                            <h4 className="font-bold text-gray-900">Componentes del gasto energético</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li><strong>TMB (~60-70%):</strong> Funciones vitales en reposo</li>
                                <li><strong>Efecto térmico de alimentos (~10%):</strong> Energía para digerir</li>
                                <li><strong>Actividad física (~20-30%):</strong> Ejercicio y movimiento diario</li>
                            </ul>
                            <h4 className="font-bold text-gray-900">Factores de actividad (Katch-McArdle)</h4>
                            <table className="w-full text-sm">
                                <thead><tr className="bg-gray-100"><th className="p-2 text-left">Nivel</th><th className="p-2">Factor</th></tr></thead>
                                <tbody>
                                    <tr className="border-b"><td className="p-2">Sedentario</td><td className="p-2 text-center">1.2</td></tr>
                                    <tr className="border-b"><td className="p-2">Ligeramente activo</td><td className="p-2 text-center">1.375</td></tr>
                                    <tr className="border-b"><td className="p-2">Moderadamente activo</td><td className="p-2 text-center">1.55</td></tr>
                                    <tr className="border-b"><td className="p-2">Muy activo</td><td className="p-2 text-center">1.725</td></tr>
                                    <tr><td className="p-2">Extremadamente activo</td><td className="p-2 text-center">1.9</td></tr>
                                </tbody>
                            </table>
                            <h4 className="font-bold text-gray-900">Fuentes científicas</h4>
                            <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
                                <li>Harris, J.A. & Benedict, F.G. (1918). A Biometric Study of Human Basal Metabolism.</li>
                                <li>Katch, F. et al. Exercise Physiology: Nutrition, Energy, and Human Performance (8th ed.).</li>
                            </ul>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
                                <strong>⚠️ Aviso:</strong> Esta es una estimación. Las necesidades calóricas individuales varían. Consulta a un nutriólogo para un plan personalizado.
                            </div>
                        </div>
                    )}
                </div>

                
                <StudyCTA 
                    title={`Optimiza tu nutrición`} 
                    description={`Conocer tus calorías es el primer paso. Si vas a iniciar un régimen, asegúrate de que no haya desbalances básicos con una Biometría Hemática y Glucosa.`} 
                    actionText={`Cotizar Biometría y Glucosa`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Biometr%C3%ADa%20y%20Glucosa*`} 
                    type="estudio" 
                />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
