'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function RatioInsulinaCarbohidratosPage() {
    const [dosisTotal, setDosisTotal] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const t=parseFloat(dosis_total);if(!t)return;const icr=500/t;let l='Ratio de Conversión',c='text-orange-600',b='bg-orange-100',d='Se requiere 1 Unidad de insulina de acción rápida por cada '+Math.round(icr)+' gramos netos de carbohidratos consumidos en comida.';setResultado({value: '1U x '+Math.round(icr)+'g Carbos', label:l, color:c, bg:b, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-amber-700 to-orange-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-amber-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🍞 Ratio Insulina-Carbohidratos (ICR)</h1>
                    <p className="text-amber-100 mt-2">Regla del 500 para control de alimentos</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Esquema Diario"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Dosis Total Diaria (TDD) de Insulina (Unidades)"}</label>
                        <input type="number" value={dosisTotal} onChange={(e) => setDosisTotal(e.target.value)} placeholder="ej: 40" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all" />
                    </div>

                    <button onClick={calcular} className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className="bg-blue-50 rounded-2xl p-6 text-center mb-6">
                            <p className="text-sm text-gray-600 mb-1">Cálculo del IC Ratio</p>
                            <p className="text-5xl font-black text-blue-700">{resultado.value}</p>
                            {resultado.unit && <p className="text-blue-500 text-sm mt-1">{resultado.unit}</p>}
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Valoración Nutricional Integral"
                    description="Conoce tu metabolismo a nivel celular con perfiles tiroideos completos."
                    actionText="Tiroides y Glucosa"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Perfil%20Tiroideo%20y%20Glucosa"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩸 Guía Endocrinológica: Ratio Insulina a Carbohidratos (ICR)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>La métrica biológica u del o O inmensa de la ICR al general determina o U y o U exactamente cuántos u O el U a o de al u inmenso Inmenso gramos de carbohidratos O a y Inmenso cubre O de u U u en una sola y al O o a Inmenso al unidad de insulina inmenso u inmensurable al O de U O general y en U la sangre al puramente Inmenso del diabético tipo 1.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios URGENTES</h3>
       <ul>
           <li><a href="/estudios/perfiles/hemoglobina-glucosilada-hba1c" className="text-blue-600 font-semibold hover:underline">Hemoglobina Glucosilada (HbA1c Avanzada)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 ¿Qué es la Regla de los 500 para Diabéticos?"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"La Regla del 500 provee el Ratio Insulina/Carbohidratos (I:C Ratio). Proporciona a pacientes con terapia de bomba o inyecciones múltiples, la libertad de adaptar la dosificación exacta frente a porciones alimenticias variables."}</p>
                        <p>{"Determina literalmente cuántos gramos biológicos de azúcares absorbidos de una comida cubrirá enteramente 1 sola Unidad Internacional fisiológica introducida sub cutáneamente."}</p>
                        <p>{"Si presumes tener una Inyección Total Diaria (TDD) de 40 unidades para vivir, 500 / 40 = 12.5. Para fines prácticos requerirás administrar 1 Inyección Corta por casi 13 gramos de pastas o azúcares."}</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 mt-6">
                        <strong>⚠️ Aviso:</strong> Esta herramienta es orientativa y NO sustituye el diagnóstico médico profesional. Consulta a tu médico para interpretación.
                    </div>
                </div>

                
                <RelatedTools currentPath="/herramientas/ratio-insulina-carbohidratos" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
