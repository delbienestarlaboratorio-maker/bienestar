'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function RiesgoUlceraPage() {
    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);
    const [c4, setC4] = useState(false);
    const [evaluado, setEvaluado] = useState(false);

    const check = () => setEvaluado(true);

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-red-600 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl font-bold text-white">🔥 Cuestionario de Riesgo de Úlcera y Gastritis</h1>
                    <p className="text-red-100 mt-2">Detección clínica de la bacteria Helicobacter Pylori</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border p-6 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">
                        La mayoría de gastritis crónicas y úlceras sangrantes no se deben al estrés ni al picante, sino a una bacteria devastadora llamada Helicobacter Pylori que carcome la pared de tu estómago.
                    </p>

                    <div className="space-y-4 mb-8">
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-gray-50">
                            <input type="checkbox" checked={c1} onChange={(e) => setC1(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">1. Ardor intenso en la boca del estómago (Especialmente en la madrugada o en ayuno)</span></div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-gray-50">
                            <input type="checkbox" checked={c2} onChange={(e) => setC2(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">2. Saciedad Temprana constante y Nauseas (Te llenas de inmediato tras 3 bocados de comida)</span></div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-gray-50">
                            <input type="checkbox" checked={c3} onChange={(e) => setC3(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">3. Dependencia Absoluta de Antiácidos (Omeprazol, Melox, Pepto) que solo calman por horas</span></div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-gray-50">
                            <input type="checkbox" checked={c4} onChange={(e) => setC4(e.target.checked)} className="mt-1 w-6 h-6 text-red-600" />
                            <div><span className="font-bold text-red-800">SÍNTOMA DE EMERGENCIA: Heces de color negro alquitrán o Vómito con sangre color café seco.</span></div>
                        </label>
                    </div>

                    <button onClick={check} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl">
                        Averiguar Causa Biológica
                    </button>

                    {evaluado && (
                        <div className="mt-6 p-5 bg-rose-50 border border-rose-200 rounded-xl text-center">
                            <h3 className="font-bold text-rose-900 text-xl">{c4 ? "¡ALERTA DE SANGRADO INTERNO!" : "Gastro-Erosión Activa"}</h3>
                            <p className="text-sm text-rose-800 mt-2">
                                Un nivel elevado de ardor persistente es sinónimo de que tu mucosa está destruida. Tomar remedios caseros cuando ya hay una herida interna predispone a futuro cáncer gástrico. Es necesario cazar la bacteria de inmediato.
                            </p>
                        </div>
                    )}
                </div>

                <StudyCTA
                    title="Pon fin definitivo a tu Gastritis Infecciosa"
                    description="Un simple Estudio Coprológico para Antígeno de Helicobacter Pylori detecta a la bacteria en 1 día. Al confirmarlo, tu médico te recetará un tratamiento erradicador específico de 14 días y el ardor desaparecerá para siempre."
                    actionText="Tratar Causa de Úlcera"
                    type="estudio"
                    link="https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20precio%20de%20la%20prueba%20Ant%C3%ADgeno%20de%20Helicobacter%20Pylori%20en%20Heces"
                />

                <div className="mt-8">
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía Gastroenterológica: Riesgo de Úlcera y Gastritis Erosiva</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>La evaluación clínica u del o O inmensa o del al general nivel o U y o U riesgo u O el U a o de al u inmenso Inmenso u de o de úlceras O a y Inmenso pépticas O de u U u en se basa y al O o a Inmenso al a o inmenso predominantemente u inmensurable al O de U O general y en U la O al u infección al puramente Inmenso a por al y Inmensurables a U <em>Helicobacter y inmensa el pylori</em> e Inmensurables U O inmenso de O y U u de el y el U o O a abuso O de a inmenso inmensurables O U de u la O crónico al de u medicamentos y AINEs O y o la Inmenso del de.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios</h3>
       <ul>
           <li><a href="/" className="text-blue-600 font-semibold hover:underline">Detección de Helicobacter Pylori (Antígeno en Heces)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" /></div>
            </div>
        </main>
    );
}
