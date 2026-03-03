'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function CalculadoraTMBPage() {
    const [genero, setGenero] = useState<'masculino' | 'femenino'>('femenino');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [edad, setEdad] = useState('');
    const [actividad, setActividad] = useState('1.2'); // Sedentario por defecto
    const [objetivo, setObjetivo] = useState('mantener');

    const [resultado, setResultado] = useState<{
        tmb: number; // Basal Metabolic Rate
        tdee: number; // Total Daily Energy Expenditure
        objetivoCalorias: number;
    } | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        const p = parseFloat(peso);
        const a = parseFloat(altura); // cm
        const e = parseFloat(edad);
        const act = parseFloat(actividad);

        if (p > 0 && a > 0 && e > 0) {
            // Fórmula Mifflin-St Jeor
            let tmb = (10 * p) + (6.25 * a) - (5 * e);
            if (genero === 'masculino') {
                tmb += 5;
            } else {
                tmb -= 161;
            }

            // Gasto Energético Total (TDEE)
            let tdee = tmb * act;

            // Calorías según objetivo
            let objetivoCalorias = tdee;
            if (objetivo === 'perder_leve') objetivoCalorias *= 0.85; // Déficit 15%
            if (objetivo === 'perder_fuerte') objetivoCalorias *= 0.75; // Déficit 25%
            if (objetivo === 'ganar_leve') objetivoCalorias *= 1.10; // Superávit 10%
            if (objetivo === 'ganar_fuerte') objetivoCalorias *= 1.20; // Superávit 20%

            setResultado({
                tmb: Math.round(tmb),
                tdee: Math.round(tdee),
                objetivoCalorias: Math.round(objetivoCalorias)
            });
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-800 to-emerald-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-teal-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🔥 TMB Ajustada (Mifflin-St Jeor)</h1>
                    <p className="text-teal-100 mt-2">Calculadora de Tasa Metabólica Basal y Gasto Energético Total</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Calculator */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => setGenero('femenino')}
                            className={`flex-1 py-3 rounded-xl font-bold transition-colors ${genero === 'femenino' ? 'bg-pink-100 text-pink-700 border-2 border-pink-400' : 'bg-gray-100 text-gray-500 border-2 border-transparent hover:bg-gray-200'}`}>
                            👩 Femenino
                        </button>
                        <button
                            onClick={() => setGenero('masculino')}
                            className={`flex-1 py-3 rounded-xl font-bold transition-colors ${genero === 'masculino' ? 'bg-blue-100 text-blue-700 border-2 border-blue-400' : 'bg-gray-100 text-gray-500 border-2 border-transparent hover:bg-gray-200'}`}>
                            👨 Masculino
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Edad (años)</label>
                            <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="Ej: 30"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Peso (kg)</label>
                            <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Ej: 70"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Altura (cm)</label>
                            <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="Ej: 165"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-lg text-gray-800" />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nivel de Actividad Física</label>
                        <select value={actividad} onChange={(e) => setActividad(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-gray-800 bg-white cursor-pointer">
                            <option value="1.2">🛋️ Sedentario (Poco o ningún ejercicio)</option>
                            <option value="1.375">🚶 Ligeramente Activo (Ejercicio ligero 1-3 días/sem)</option>
                            <option value="1.55">🏃 Moderadamente Activo (Ejercicio moderado 3-5 días/sem)</option>
                            <option value="1.725">🏋️ Muy Activo (Ejercicio intenso 6-7 días/sem)</option>
                            <option value="1.9">🔥 Extra Activo (Trabajo físico muy duro o doble entreno)</option>
                        </select>
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Objetivo Nutricional</label>
                        <select value={objetivo} onChange={(e) => setObjetivo(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-gray-800 bg-white cursor-pointer">
                            <option value="perder_fuerte">📉 Pérdida Agresiva (-25% déficit)</option>
                            <option value="perder_leve">📉 Pérdida Sostenible (-15% déficit)</option>
                            <option value="mantener">⚖️ Mantenimiento (Igual)</option>
                            <option value="ganar_leve">📈 Ganancia Muscular Magra (+10% superávit)</option>
                            <option value="ganar_fuerte">📈 Volumen Muscular / Bulking (+20% superávit)</option>
                        </select>
                    </div>

                    <button onClick={calcular}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                        Calcular Gasto Metabólico
                    </button>

                    {/* Result */}
                    {resultado !== null && (
                        <div className="mt-8 animate-in fade-in">
                            {/* Main Goal Result */}
                            <div className={`rounded-2xl p-6 text-center mb-6 
                                ${objetivo.includes('perder') ? 'bg-orange-50 text-orange-900 border border-orange-200' :
                                    objetivo.includes('ganar') ? 'bg-indigo-50 text-indigo-900 border border-indigo-200' :
                                        'bg-teal-50 text-teal-900 border border-teal-200'}`}>
                                <p className="text-sm font-bold opacity-80 mb-1">Tu objetivo requiere consumir:</p>
                                <p className="text-6xl font-black mb-2">{resultado.objetivoCalorias}</p>
                                <p className="text-xl font-bold opacity-90">Kcal / día</p>
                            </div>

                            {/* Detailed Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-6 relative">
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col items-center">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl mb-2">🔋</div>
                                    <p className="text-xs text-gray-500 font-bold mb-1 text-center">Metabolismo Basal (TMB)</p>
                                    <p className="text-2xl font-bold text-gray-800">{resultado.tmb} <span className="text-sm text-gray-500">kcal</span></p>
                                    <p className="text-[10px] text-gray-400 text-center mt-1">Calorías quemadas en reposo total</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col items-center">
                                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-xl mb-2">⚡</div>
                                    <p className="text-xs text-gray-500 font-bold mb-1 text-center">Gasto Total (TDEE)</p>
                                    <p className="text-2xl font-bold text-gray-800">{resultado.tdee} <span className="text-sm text-gray-500">kcal</span></p>
                                    <p className="text-[10px] text-gray-400 text-center mt-1">Calorías quemadas con actividad actual</p>
                                </div>
                            </div>

                            {/* Study recommendation - Thyroid focus since metabolism depends on it */}
                            <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-6">
                                <h3 className="font-bold text-teal-900 text-lg mb-3">🦋 ¿Tu metabolismo está lento? Evalúa tu Tiroides</h3>
                                <p className="text-gray-600 text-sm mb-4">Las fórmulas matemáticas asumen que tu glándula tiroidea funciona perfectamente. Si estás comiendo poco y no bajas de peso, tu TMB real podría estar afectada por un problema metabólico oculto:</p>
                                <div className="space-y-3">
                                    {[
                                        { name: 'Perfil Tiroideo Básico (TSH, T3, T4)', reason: 'Detecta hipotiroidismo (metabolismo lento) o hipertiroidismo (metabolismo acelerado)' },
                                        { name: 'Insulina Basal (HOMA-IR)', reason: 'La resistencia a la insulina bloquea la quema de grasa sin importar cuántas calorías reduzcas' },
                                    ].map((study) => (
                                        <div key={study.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
                                            <span className="text-teal-600 mt-1">✓</span>
                                            <div>
                                                <p className="font-semibold text-gray-800 text-sm">{study.name}</p>
                                                <p className="text-gray-500 text-xs">{study.reason}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/estudios/analisis-clinicos"
                                    className="mt-4 inline-block bg-teal-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-teal-800 transition-colors">
                                    Ver Perfiles Hormonales →
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Ad Banner */}
                
                <StudyCTA 
                    title={`Equilibrio Energético Integral`} 
                    description={`Para lograr el balance de esta calculadora en dietas prolongadas, vigilar los perfiles de Sodio, Potasio y Magnesio asegura que evites caídas en tu desempeño y calambres.`} 
                    actionText={`Consulta Nutricional y Panel`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Consulta%20Nutricional%20y%20Panel*`} 
                    type="doctor" 
                />
                <AdBanner variant="horizontal" className="mb-8" />

                {/* Scientific Info Collapsible */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    <button onClick={() => setShowInfo(!showInfo)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                        <span className="font-bold text-gray-900">📚 ¿Qué es la TMB Mifflin-St Jeor? — Información Científica</span>
                        <span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {showInfo && (
                        <div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4">
                            <p>La <strong>Tasa Metabólica Basal (TMB)</strong> es la cantidad mínima de energía (calorías) que el cuerpo humano necesita para mantener las funciones vitales básicas estando en reposo (como respirar, mantener la temperatura y el latido cardíaco).</p>

                            <h4 className="font-bold text-gray-900">Mifflin-St Jeor vs Harris-Benedict</h4>
                            <p>Aunque históricamente se usaba la ecuación de Harris-Benedict (1919), la <strong>Asociación Americana de Dietética (ADA)</strong> recomienda usar la ecuación de <strong>Mifflin-St Jeor (1990)</strong> porque ha demostrado ser mucho más precisa, especialmente en personas con sobrepeso y obesidad, reduciendo el margen de error del 20% a menos del 10%.</p>

                            <div className="bg-gray-100 p-4 rounded-lg font-mono text-xs text-gray-600">
                                <strong>Hombres:</strong> (10 × peso en kg) + (6.25 × altura en cm) - (5 × edad en años) + 5<br />
                                <strong>Mujeres:</strong> (10 × peso en kg) + (6.25 × altura en cm) - (5 × edad en años) - 161
                            </div>

                            <h4 className="font-bold text-gray-900">Gasto Energético Total (TDEE)</h4>
                            <p>El TDEE (Total Daily Energy Expenditure) multiplica la TMB por el Factor de Actividad de Harris-Benedict actualizados. Esta es la cifra de "Calorías de Mantenimiento". Comer por encima de esto generará tejido, comer por debajo obligará al cuerpo a usar reservas de energía.</p>

                            <h4 className="font-bold text-gray-900">Limitaciones</h4>
                            <p>Si una persona tiene una composición corporal muy inusual (e.g. un fisicoculturista extramadamente magro), la fórmula de Katch-McArdle (que usa masa libre de grasa) es más precisa. Además, alteraciones tiroideas (Hipotiroidismo) pueden reducir la TMB real hasta un 30% respecto al cálculo matemático.</p>
                        </div>
                    )}
                </div>

                {/* Ad Banner bottom */}
                
                <StudyCTA 
                    title={`Equilibrio Energético Integral`} 
                    description={`Para lograr el balance de esta calculadora en dietas prolongadas, vigilar los perfiles de Sodio, Potasio y Magnesio asegura que evites caídas en tu desempeño y calambres.`} 
                    actionText={`Consulta Nutricional y Panel`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Consulta%20Nutricional%20y%20Panel*`} 
                    type="doctor" 
                />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
