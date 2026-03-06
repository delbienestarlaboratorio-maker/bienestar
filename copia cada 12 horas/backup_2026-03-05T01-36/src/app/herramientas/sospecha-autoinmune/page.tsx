'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function SospechaAutoinmunePage() {
    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);
    const [c4, setC4] = useState(false);
    const [evaluado, setEvaluado] = useState(false);

    const check = () => setEvaluado(true);

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-violet-600 to-indigo-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-violet-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl font-bold text-white">🛡️ Cuestionario de Sospecha Autoinmune</h1>
                    <p className="text-violet-100 mt-2">Detección de marcadores ocultos de Lupus y Artritis</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border p-6 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">
                        Las enfermedades autoinmunes ocurren cuando los escudos de tu propio cuerpo se confunden y atacan tus propias articulaciones, piel y órganos sanos, simulando infecciones fantasmas que nunca ceden.
                    </p>

                    <div className="space-y-4 mb-8">
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-violet-50">
                            <input type="checkbox" checked={c1} onChange={(e) => setC1(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">1. Rigidez Articular Matutina (Las manos duelen y amanecen tiesas y no las puedes doblar por horas)</span></div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-violet-50">
                            <input type="checkbox" checked={c2} onChange={(e) => setC2(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">2. Erupción Cutánea Inexplicable (Especialmente manchas rojas en las mejillas en forma de Mariposa, o reacción grave al sol)</span></div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-violet-50">
                            <input type="checkbox" checked={c3} onChange={(e) => setC3(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">3. Dedos blancos o morados con el frío (Fenómeno de Raynaud doloroso)</span></div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-violet-50">
                            <input type="checkbox" checked={c4} onChange={(e) => setC4(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">4. Fiebre recurrente de bajo grado sin tener ninguna infección, combinada con fatiga pulverizante</span></div>
                        </label>
                    </div>

                    <button onClick={check} className="w-full bg-violet-700 hover:bg-violet-800 text-white font-bold py-3 rounded-xl">
                        Averiguar Posibilidad Autoinmunitaria
                    </button>

                    {evaluado && (
                        <div className="mt-6 p-5 bg-violet-50 border border-violet-200 rounded-xl text-center">
                            <h3 className="font-bold text-violet-900 text-xl">Tu sistema inmune puede estar atacándote</h3>
                            <p className="text-sm text-violet-800 mt-2">
                                Estas señales tempranas no son dolor muscular por estrés. Ignorarlas permite que tus propios anticuerpos comiencen a dañar irreversiblemente tus cartílagos o pulmones.
                            </p>
                        </div>
                    )}
                </div>

                <StudyCTA
                    title="Certeza ante el dolor articular crónico"
                    description="Los Anticuerpos Antinucleares (ANA) y el Factor Reumatoide son pruebas de escaneo global obligatorias. Permiten al médico reumatólogo apagar tu propio sistema inmune con corticoides para que dejes de sufrir."
                    actionText="Conocer Marcadores Autoinmunes"
                    type="estudio"
                    link="https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20precio%20de%20la%20prueba%20Anticuerpos%20Antinucleares%20(ANA)%20y%20Factor%20Reumatoide"
                />

                <div className="mt-8"><AdBanner variant="horizontal" /></div>
            </div>
        </main>
    );
}
