'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function EvaluadorAlopeciaPage() {
    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);
    const [c4, setC4] = useState(false);
    const [evaluado, setEvaluado] = useState(false);

    const check = () => setEvaluado(true);

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-slate-700 to-slate-900 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-slate-300 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl font-bold text-white">💇‍♀️ Evaluador de Caída de Cabello</h1>
                    <p className="text-slate-200 mt-2">Detección de causas nutricionales y hormonales de la Alopecia</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border p-6 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">
                        La pérdida de cabello severa (alopecia difusa) no siempre es genética. Frecuentemente es un grito de auxilio del cuerpo por falta de nutrientes esenciales o un desequilibrio agresivo en las hormonas tiroideas.
                    </p>

                    <div className="space-y-4 mb-8">
                        <label className="flex items-start gap-4 p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                            <input type="checkbox" checked={c1} onChange={(e) => setC1(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div>
                                <span className="font-bold">1. Caída mayor a 100 cabellos por día</span>
                                <span className="block text-sm text-gray-500">Dejas la almohada o la ducha tapizadas de mechones enteros sistemáticamente todos los días.</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                            <input type="checkbox" checked={c2} onChange={(e) => setC2(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div>
                                <span className="font-bold">2. Uñas Quebradizas y Fatiga</span>
                                <span className="block text-sm text-gray-500">Tus uñas se rompen o descarapelan muy fácil y sientes cansancio crónico. (Signos clásicos de anemia férrica o carencia de vitaminas).</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                            <input type="checkbox" checked={c3} onChange={(e) => setC3(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div>
                                <span className="font-bold">3. Alteraciones en el Peso o Temperatura</span>
                                <span className="block text-sm text-gray-500">¿Sientes mucho frío, tu piel es muy seca, o subiste/bajaste de peso bruscamente últimamente? (Signo Tiroideo).</span>
                            </div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                            <input type="checkbox" checked={c4} onChange={(e) => setC4(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div>
                                <span className="font-bold">4. Episodio de Estrés Severo Reciente</span>
                                <span className="block text-sm text-gray-500">Tuviste una cirugía, enfermedad grave, embarazo, o crash emocional gigante hace 1 a 3 meses (Efluvio Telógeno).</span>
                            </div>
                        </label>
                    </div>

                    <button onClick={check} className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl">
                        Diagnosticar mi Caída Capilar
                    </button>

                    {evaluado && (
                        <div className="mt-6 p-5 bg-blue-50 border border-blue-200 rounded-xl text-center">
                            <h3 className="font-bold text-blue-900 text-xl">Tu cabello necesita materia prima y orden</h3>
                            <p className="text-sm text-blue-800 mt-2">
                                Para que los folículos capilares vivan, exigen Hierro, Zinc, un nivel correcto de hormonas tiroideas (T3/T4) y ausencia de Anemia. Comprar champús caros no servirá si el problema viene desde tu sangre.
                            </p>
                        </div>
                    )}
                </div>

                <StudyCTA
                    title="Detén la caída encontrando la causa sanguínea"
                    description="Un Perfil Tiroideo junto con una prueba de Hierro Sérico y Ferritina le darán a tu dermatólogo el mapa exacto de por qué se está ahogando tu folículo capilar. Sin esto, gastarás miles en ampolletas ciegas."
                    actionText="Cotizar Perfil Alopecia / Caída"
                    type="estudio"
                    link="https://wa.me/527757371811?text=Hola,%20me%20gustar%C3%ADa%20cotizar%20estudios%20para%20la%20caida%20de%20cabello%20(Perfil%20Tiroideo%20y%20Hierro)"
                />

                <div className="mt-8"><AdBanner variant="horizontal" /></div>
            </div>
        </main>
    );
}
