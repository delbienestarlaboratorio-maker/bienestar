'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function SaludOcupacionalPage() {
    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);
    const [evaluado, setEvaluado] = useState(false);

    const check = () => setEvaluado(true);

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-gray-700 to-black py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-gray-300 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl font-bold text-white">🏭 Índice de Riesgo y Toxicología Laboral</h1>
                    <p className="text-gray-200 mt-2">Detección y pruebas exigidas para seguridad empresarial e industrial</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border p-6 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">
                        La Secretaría del Trabajo y los protocolos corporativos exigen que todos los empleados de alto riesgo (conductores, guardias, manejo de maquinaria) tengan cero rastro de sustancias en su organismo que mermen su atención.
                    </p>

                    <div className="space-y-4 mb-8">
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-gray-50">
                            <input type="checkbox" checked={c1} onChange={(e) => setC1(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">1. Conduces Maquinaria o Vehículos en carretera (Choferes DGT, Montacarguistas)</span></div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-gray-50">
                            <input type="checkbox" checked={c2} onChange={(e) => setC2(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">2. Pasaste por una exposición ocasional a alcohol o sustancias ilegales los fines de semana y el Lunes tienes chequeo en planta médica de tu trabajo.</span></div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-gray-50">
                            <input type="checkbox" checked={c3} onChange={(e) => setC3(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">3. Manejas explosivos, armas o vigilas valores y tu póliza exige un certificado de inocuidad en orina sellado.</span></div>
                        </label>
                    </div>

                    <button onClick={check} className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-xl">
                        Averiguar Requisito Antidoping
                    </button>

                    {evaluado && (
                        <div className="mt-6 p-5 bg-gray-100 border border-gray-300 rounded-xl text-center">
                            <h3 className="font-bold text-gray-900 text-xl">Tu trabajo está legalmente sujeto a Exámenes de Confianza</h3>
                            <p className="text-sm text-gray-800 mt-2">
                                Evita arriesgar tu liquidación o despido justificado. Conocer tus niveles antes del médico de tu empresa te garantiza total discreción.
                            </p>
                        </div>
                    )}
                </div>

                <StudyCTA
                    title="Protege tu expediente laboral y contrato"
                    description="Realizamos el Examen Toxicológico (Antidoping) de 5 y 6 elementos (Marihuana, Cocaína, Anfetaminas, etc.) en Orina de forma 100% privada para empleados o corporativos con entrega inmediata."
                    actionText="Cotizar Examen Antidoping Confidencial"
                    type="estudio"
                    link="https://wa.me/527757371811?text=Hola,%20busco%20cotizar%20una%20prueba%20Toxicol%C3%B3gica%20/%20Antidoping%20Confidencial"
                />

                <div className="mt-8">
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía de Salud Ocupacional: Riesgo Toxicológico y Exposición Laboral</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El tamizaje y evaluación U de a la purísima exposición puramente a al y U de u u tóxicos es O U inmenso de e U de o a al inmensurable el pilar el a u en fundamental genérico puros al u de de U O a U inmenso al O o o en en la general de y inmensurable al u salud O de el u U y O ocupacional u u en para O e e prevenir O y la o en la U base U a daño el al inmenso o orgánico inmenso la de U o al O u renal la a, a inmenso hepático O O u U o u en nervioso genéricamente.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios URGENTES</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/quimica-sanguinea" className="text-blue-600 font-semibold hover:underline">Química Sanguínea de Panel Completo</a></li>
           <li><a href="/estudios/analisis-clinicos/examen-general-de-orina" className="text-blue-600 font-semibold hover:underline">Examen General de Orina y Antidoping</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" /></div>
            
                <RelatedTools currentPath="/herramientas/salud-ocupacional-toxicologia" className="mb-8" />
            </div>
        </main>
    );
}
