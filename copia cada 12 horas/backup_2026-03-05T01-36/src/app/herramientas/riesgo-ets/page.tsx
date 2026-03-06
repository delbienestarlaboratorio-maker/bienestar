'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function RiesgoETSPage() {
    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);
    const [c4, setC4] = useState(false);
    const [evaluado, setEvaluado] = useState(false);

    const score = (c1 ? 1 : 0) + (c2 ? 1 : 0) + (c3 ? 1 : 0) + (c4 ? 1 : 0);

    let color = "";
    if (score === 0) {
        color = "bg-green-50 text-green-800 border-green-200";
    } else if (score === 1) {
        color = "bg-orange-50 text-orange-800 border-orange-200";
    } else {
        color = "bg-red-50 text-red-800 border-red-200";
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-rose-700 to-pink-900 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-rose-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🦠 Riesgo de Infección Sexual (ETS)</h1>
                    <p className="text-rose-100 mt-2">Cuestionario anónimo y confidencial de exposición</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">
                        Muchas Enfermedades de Transmisión Sexual son silenciosas durante años. Detectarlas a tiempo con una prueba de sangre u orina evita daños irreversibles a tu fertilidad e inmunidad.
                    </p>

                    <div className="space-y-4 mb-8">
                        <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                            <input type="checkbox" checked={c1} onChange={(e) => setC1(e.target.checked)} className="mt-1 w-6 h-6 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">1. Contacto sin protección</span>
                                <span className="block text-sm text-gray-500">¿Tuviste relaciones sexuales (orales, vaginales o anales) sin el uso de preservativo recientemente?</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                            <input type="checkbox" checked={c2} onChange={(e) => setC2(e.target.checked)} className="mt-1 w-6 h-6 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">2. Parejas múltiples o nuevas</span>
                                <span className="block text-sm text-gray-500">¿Has tenido más de una pareja sexual en los últimos 6 meses, o una pareja nueva cuyo estado de salud desconoces?</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                            <input type="checkbox" checked={c3} onChange={(e) => setC3(e.target.checked)} className="mt-1 w-6 h-6 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">3. Síntomas Físicos Anormales</span>
                                <span className="block text-sm text-gray-500">¿Sientes ardor al orinar, flujo de olor inusual, sangrados anormales o tienes llagas, verrugas o ampollas en la zona genital?</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                            <input type="checkbox" checked={c4} onChange={(e) => setC4(e.target.checked)} className="mt-1 w-6 h-6 rounded" />
                            <div>
                                <span className="font-bold text-gray-800">4. Rotura de preservativo o accidentes</span>
                                <span className="block text-sm text-gray-500">¿El método de barrera falló, se rompió o se resbaló durante el acto?</span>
                            </div>
                        </label>
                    </div>

                    <button onClick={() => setEvaluado(true)}
                        className="w-full bg-rose-700 hover:bg-rose-800 text-white font-bold py-3 px-6 rounded-xl text-lg shadow-lg">
                        Evaluar Riesgo Privado
                    </button>

                    {evaluado && (
                        <div className="mt-8 animate-in fade-in">
                            <div className={`rounded-xl p-6 text-center border ${color}`}>
                                <p className="text-lg font-bold">
                                    {score >= 2 ? "⚠️ ALTO RIESGO DE EXPOSICIÓN" : score === 1 ? "⚠️ RIESGO MODERADO" : "✅ Riesgo Bajo"}
                                </p>
                                <p className="mt-2 text-sm max-w-xl mx-auto">
                                    {score > 0
                                        ? "Cualquier contacto de riesgo o síntoma anómalo es motivo suficiente para un tamizaje clínico. Recuerda que infecciones como el VIH, Sífilis o Clamidia son curables/controlables si se detectan pronto, pero devastadoras si se ignoran."
                                        : "Mencionas no haber tenido exposición de riesgo. Aún así, un chequeo sexual preventivo anual es mandatorio en personas activas."}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <StudyCTA
                    title="Conoce tu estado de salud sexual hoy mismo (100% Confidencial)"
                    description="El Perfil de Enfermedades Venéreas (VDRL, VIH y Hepatitis B) es una prueba de sangre y orina rápida, discreta y profesional. Hazte la prueba y recupera la tranquilidad."
                    actionText="Cotizar Perfil de Detección (ETS)"
                    type="estudio"
                    link="https://wa.me/527757371811?text=Hola,%20me%20gustar%C3%ADa%20cotizar%20un%20Perfil%20de%20Enfermedades%20de%20Transmisio%CC%81n%20Sexual%20VDRL/VIH"
                />

                <div className="mt-8"><AdBanner variant="horizontal" /></div>
            </div>
        </main>
    );
}
