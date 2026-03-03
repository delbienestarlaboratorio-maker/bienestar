'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function DeficitHierroGanzoniPage() {
    const [peso, setPeso] = useState('');
    const [hbReal, setHbReal] = useState('');
    const [hbObjetivo, setHbObjetivo] = useState('15'); // 15 g/dL es estándar
    const [reservas, setReservas] = useState('500'); // 500mg es para adultos

    const [resultado, setResultado] = useState<number | null>(null);

    const calcular = () => {
        const p = parseFloat(peso);
        const hb = parseFloat(hbReal);
        const obj = parseFloat(hbObjetivo);
        const res = parseFloat(reservas);

        if (p > 0 && hb > 0 && obj >= hb) {
            // Formula Ganzoni: Peso (kg) x (Hb objetivo - Hb actual) x 2.4 + Hierro de depósito
            const deficit = (p * (obj - hb) * 2.4) + res;
            setResultado(Math.round(deficit));
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-red-800 to-red-950 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🩸 Fórmula de Ganzoni</h1>
                    <p className="text-red-100 mt-2">Cálculo del Déficit Total de Hierro en Anemia Ferropénica</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">Esta ecuación clásica ayuda a los internistas y hematólogos a estimar la suma total de Hierro en miligramos (mg) que requiere tu cuerpo para ser restaurado vía infusión intravenosa para corregir la anemia.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Tu Peso Actual (kg)</label>
                            <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Ej: 70"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Hemoglobina Actual Real (g/dL)</label>
                            <input type="number" step="0.1" value={hbReal} onChange={(e) => setHbReal(e.target.value)} placeholder="Ej: 8.5"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Hemoglobina Objetivo (g/dL)</label>
                            <input type="number" step="0.1" value={hbObjetivo} onChange={(e) => setHbObjetivo(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none text-lg text-gray-800" />
                            <p className="text-xs text-gray-500 mt-1">Adultos ~15 g/dL</p>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Hierro de Depósito (mg)</label>
                            <input type="number" value={reservas} onChange={(e) => setReservas(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none text-lg text-gray-800" />
                            <p className="text-xs text-gray-500 mt-1">Reserva basal (Adultos &gt; 35kg se usa 500mg)</p>
                        </div>
                    </div>

                    <button onClick={calcular}
                        className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">
                        Calcular Déficit Acumulado
                    </button>

                    {resultado !== null && (
                        <div className="mt-8 animate-in fade-in">
                            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center mb-6">
                                <p className="text-sm font-bold text-red-900 mb-1">Tu cuerpo requiere infundir o suplementar aproximadamente:</p>
                                <p className="text-6xl font-black text-red-700">{resultado}</p>
                                <p className="text-xl font-bold text-red-600 mt-1">miligramos de hierro elemental</p>
                            </div>

                            <div className="bg-red-900text-white border-2 border-red-950 rounded-2xl p-6 relative overflow-hidden text-red-100 bg-red-900">
                                <h3 className="font-bold text-white text-lg mb-3">🔬 Para evaluar la Anemia correctamente</h3>
                                <p className="text-sm mb-4">No toda la anemia o debilidad proviene de falta de hierro. La hemoglobina baja puede deberse a sangrados ocultos o mala absorción. La única forma de probar que te falta hierro (antes de tomar pastillas que estriñen o irritan) es revisando tus reservas:</p>
                                <div className="space-y-2 font-bold mb-4">
                                    <p className="bg-red-800/50 p-2 rounded">✓ Perfil de Hierro Completo (Hierro Sérico)</p>
                                    <p className="bg-red-800/50 p-2 rounded">✓ Ferritina Sérica (La proteína de tanque de reserva)</p>
                                    <p className="bg-red-800/50 p-2 rounded">✓ Capacidad de Fijación de Hierro (TIBC)</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <StudyCTA 
                    title={`Mide la severidad de tu Anemia`} 
                    description={`El cansancio profundo puede ser falta de hierro (anemia ferropénica). Una Biometría Hemática Completa revela si requieres donaciones, suplementos o hasta hierro intravenoso.`} 
                    actionText={`Cotizar Biometría Hemática`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Biometr%C3%ADa%20Hem%C3%A1tica*`} 
                    type="estudio" 
                />
                <AdBanner variant="horizontal" className="mb-8" />
            </div>
        </main>
    );
}
