'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';

export default function CalculadoraGrasaCorporalPage() {
    const [sexo, setSexo] = useState<'hombre' | 'mujer'>('hombre');
    const [cintura, setCintura] = useState('');
    const [cuello, setCuello] = useState('');
    const [cadera, setCadera] = useState('');
    const [altura, setAltura] = useState('');
    const [resultado, setResultado] = useState<number | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        const c = parseFloat(cintura);
        const n = parseFloat(cuello);
        const h = parseFloat(altura);
        const hip = parseFloat(cadera);

        if (sexo === 'hombre' && c > 0 && n > 0 && h > 0) {
            // Navy Method: Men
            const bf = 495 / (1.0324 - 0.19077 * Math.log10(c - n) + 0.15456 * Math.log10(h)) - 450;
            setResultado(parseFloat(Math.max(bf, 2).toFixed(1)));
        } else if (sexo === 'mujer' && c > 0 && n > 0 && h > 0 && hip > 0) {
            // Navy Method: Women
            const bf = 495 / (1.29579 - 0.35004 * Math.log10(c + hip - n) + 0.22100 * Math.log10(h)) - 450;
            setResultado(parseFloat(Math.max(bf, 2).toFixed(1)));
        }
    };

    const getCategoria = (bf: number, sex: 'hombre' | 'mujer') => {
        if (sex === 'hombre') {
            if (bf < 6) return { label: 'Grasa esencial', color: 'text-blue-600', bg: 'bg-blue-100' };
            if (bf < 14) return { label: 'Atleta', color: 'text-green-600', bg: 'bg-green-100' };
            if (bf < 18) return { label: 'Fitness', color: 'text-green-600', bg: 'bg-green-100' };
            if (bf < 25) return { label: 'Promedio saludable', color: 'text-yellow-600', bg: 'bg-yellow-100' };
            return { label: 'Por encima del promedio', color: 'text-red-600', bg: 'bg-red-100' };
        } else {
            if (bf < 14) return { label: 'Grasa esencial', color: 'text-blue-600', bg: 'bg-blue-100' };
            if (bf < 21) return { label: 'Atleta', color: 'text-green-600', bg: 'bg-green-100' };
            if (bf < 25) return { label: 'Fitness', color: 'text-green-600', bg: 'bg-green-100' };
            if (bf < 32) return { label: 'Promedio saludable', color: 'text-yellow-600', bg: 'bg-yellow-100' };
            return { label: 'Por encima del promedio', color: 'text-red-600', bg: 'bg-red-100' };
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-green-800 to-teal-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-green-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🏋️ Calculadora de Grasa Corporal</h1>
                    <p className="text-green-100 mt-2">Método Navy — calcula tu porcentaje de grasa corporal</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    {/* Sex selector */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Sexo</label>
                        <div className="flex gap-3">
                            <button onClick={() => setSexo('hombre')}
                                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${sexo === 'hombre' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                👨 Hombre
                            </button>
                            <button onClick={() => setSexo('mujer')}
                                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${sexo === 'mujer' ? 'bg-pink-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                👩 Mujer
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Cintura (cm)</label>
                            <input type="number" value={cintura} onChange={(e) => setCintura(e.target.value)} placeholder="Ej: 80"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none text-lg text-gray-800" />
                            <p className="text-xs text-gray-400 mt-1">Mide al nivel del ombligo</p>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Cuello (cm)</label>
                            <input type="number" value={cuello} onChange={(e) => setCuello(e.target.value)} placeholder="Ej: 38"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none text-lg text-gray-800" />
                            <p className="text-xs text-gray-400 mt-1">Mide debajo de la nuez</p>
                        </div>
                        {sexo === 'mujer' && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Cadera (cm)</label>
                                <input type="number" value={cadera} onChange={(e) => setCadera(e.target.value)} placeholder="Ej: 95"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none text-lg text-gray-800" />
                                <p className="text-xs text-gray-400 mt-1">En la parte más ancha</p>
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Altura (cm)</label>
                            <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="Ej: 170"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none text-lg text-gray-800" />
                        </div>
                    </div>

                    <button onClick={calcular}
                        className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">
                        Calcular Grasa Corporal
                    </button>

                    {resultado !== null && (() => {
                        const cat = getCategoria(resultado, sexo);
                        return (
                            <div className="mt-8">
                                <div className={`${cat.bg} rounded-2xl p-6 text-center mb-6`}>
                                    <p className="text-sm text-gray-600 mb-1">Tu porcentaje de grasa corporal</p>
                                    <p className={`text-5xl font-black ${cat.color}`}>{resultado}%</p>
                                    <p className={`text-xl font-bold ${cat.color} mt-1`}>{cat.label}</p>
                                </div>

                                {/* Ranges table */}
                                <div className="mb-6 overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead><tr className="bg-gray-100"><th className="p-2 text-left">Categoría</th><th className="p-2">Hombres</th><th className="p-2">Mujeres</th></tr></thead>
                                        <tbody>
                                            <tr className="border-b"><td className="p-2 font-medium">Grasa esencial</td><td className="p-2 text-center">2-5%</td><td className="p-2 text-center">10-13%</td></tr>
                                            <tr className="border-b"><td className="p-2 font-medium">Atleta</td><td className="p-2 text-center">6-13%</td><td className="p-2 text-center">14-20%</td></tr>
                                            <tr className="border-b"><td className="p-2 font-medium">Fitness</td><td className="p-2 text-center">14-17%</td><td className="p-2 text-center">21-24%</td></tr>
                                            <tr className="border-b"><td className="p-2 font-medium">Promedio</td><td className="p-2 text-center">18-24%</td><td className="p-2 text-center">25-31%</td></tr>
                                            <tr><td className="p-2 font-medium">Obeso</td><td className="p-2 text-center">25%+</td><td className="p-2 text-center">32%+</td></tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                                    <h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3>
                                    <p className="text-gray-600 text-sm mb-4">Complementa esta información con estudios clínicos:</p>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Perfil Tiroideo (TSH, T3, T4)', reason: 'Descarta problemas de tiroides que afectan la composición corporal' },
                                            { name: 'Insulina en Ayunas', reason: 'Evalúa resistencia a la insulina' },
                                            { name: 'Hemoglobina Glicosilada (HbA1c)', reason: 'Control metabólico a largo plazo' },
                                            { name: 'Perfil de Lípidos', reason: 'Colesterol y triglicéridos asociados a grasa corporal' },
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
                        );
                    })()}
                </div>

                <AdBanner variant="horizontal" className="mb-8" />

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    <button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                        <span className="font-bold text-gray-900">📚 ¿Cómo se calcula la grasa corporal? — Información Científica</span>
                        <span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {showInfo && (
                        <div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4">
                            <p>El <strong>porcentaje de grasa corporal</strong> es la proporción de tu peso total que corresponde a tejido adiposo (grasa). Es un indicador más preciso que el IMC porque diferencia entre masa magra y masa grasa.</p>
                            <h4 className="font-bold text-gray-900">Método Navy (US Navy Body Fat Formula)</h4>
                            <p>Desarrollado por Hodgdon y Beckett para la Marina de los Estados Unidos. Utiliza circunferencias corporales y es uno de los métodos más precisos sin equipo especializado.</p>
                            <div className="bg-gray-50 rounded-xl p-4 font-mono text-xs">
                                <p><strong>Hombres:</strong> %Grasa = 495 / (1.0324 - 0.19077 × log10(cintura - cuello) + 0.15456 × log10(altura)) - 450</p>
                                <p className="mt-2"><strong>Mujeres:</strong> %Grasa = 495 / (1.29579 - 0.35004 × log10(cintura + cadera - cuello) + 0.22100 × log10(altura)) - 450</p>
                            </div>
                            <h4 className="font-bold text-gray-900">¿Por qué es importante?</h4>
                            <p>Un exceso de grasa corporal se asocia con mayor riesgo de enfermedades cardiovasculares, diabetes tipo 2, hipertensión y ciertos tipos de cáncer. Un porcentaje muy bajo también es peligroso, ya que la grasa esencial es necesaria para funciones hormonales y órganos vitales.</p>
                            <h4 className="font-bold text-gray-900">Fuentes científicas</h4>
                            <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
                                <li>Hodgdon, J.A. & Beckett, M.B. (1984). Prediction of percent body fat for U.S. Navy men and women from body circumferences and height. Naval Health Research Center.</li>
                                <li>American Council on Exercise (ACE). Body Fat Percentage Norms.</li>
                            </ul>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
                                <strong>⚠️ Aviso:</strong> Esta calculadora es informativa. No sustituye la evaluación médica profesional con métodos como DEXA o bioimpedancia.
                            </div>
                        </div>
                    )}
                </div>

                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
