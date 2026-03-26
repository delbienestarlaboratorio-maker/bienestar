'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function DosisInsulinaBasalPage() {
    const [peso, setPeso] = useState<string>('');
    const [glucosa, setGlucosa] = useState<string>('');
    const [hba1c, setHba1c] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const p=parseFloat(peso);const g=parseFloat(glucosa);const a1c=parseFloat(hba1c);if(!p||!g||!a1c)return;let u=0;if(a1c>10){u=p*0.2;}else if(a1c>8){u=p*0.15;}else{u=10;}let l='Dosis Recomendada',c='text-amber-600',b='bg-amber-100',d='Dosis basal segura y conservadora. Ajustar en 3 días de acuerdo a glucosas prepandriales.';if(u>30){l='Dosis Inicial Alta';c='text-red-600';b='bg-red-100';d='Revisar por riesgo de hipoglucemia. Considerar iniciar con max 30 U y titular.';}setResultado({value: Math.round(u), unit: 'Unidades / día', label:l, color:c, bg:b, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-amber-700 to-orange-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-amber-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">💉 Dosis de Insulina Basal Inicial</h1>
                    <p className="text-amber-100 mt-2">Cálculo en pacientes diabéticos tipo 2 vírgenes a insulina</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Datos del Paciente"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Peso del Paciente (kg)"}</label>
                        <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="ej: 75" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Glucosa Ayunas Promedio (mg/dL)"}</label>
                        <input type="number" value={glucosa} onChange={(e) => setGlucosa(e.target.value)} placeholder="ej: 250" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Hemoglobina Glucosilada (HbA1c) (%)"}</label>
                        <input type="number" value={hba1c} onChange={(e) => setHba1c(e.target.value)} placeholder="ej: 9.5" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all" />
                    </div>

                    <button onClick={calcular} className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className="bg-blue-50 rounded-2xl p-6 text-center mb-6">
                            <p className="text-sm text-gray-600 mb-1">Unidades Subcutáneas</p>
                            <p className="text-5xl font-black text-blue-700">{resultado.value}</p>
                            {resultado.unit && <p className="text-blue-500 text-sm mt-1">{resultado.unit}</p>}
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Monitoreo Clínico Obligatorio"
                    description="No puedes usar insulina sin conocer tu función renal y control de hemoglobina glucosilada."
                    actionText="Perfil Diabético Integral"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Quimica%20Sanguinea%20y%20HbA1c"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩸 Guía Diabetológica: Cálculo de Dosis de Insulina Basal</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El inmenso O en U general Cálculo y O U inmenso genérico de inmensurable al la Dosis u en de a Insulina al O u a inmensa inmenso Basal U O U u o Inmenso evalúa Inmenso u genéricamente a la purísima O inmensurable u inmensamente inmensurables O U de u la necesidad U u genéricamente U U o diaria U O inmensamente endocrinológica O en U u de Insulina a de inmenso genéricamente de la O de acción u inmensa lenta O u general a la O o para Inmenso o en inmensurable U el u de o inmenso U al a la o y hormonal U control u de la a O o glucosa inmenso U al Inmenso U diabético.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios URGENTES</h3>
       <ul>
           <li><a href="/estudios/perfiles/hemoglobina-glucosilada-hba1c" className="text-blue-600 font-semibold hover:underline">Hemoglobina Glucosilada (HbA1c)</a> (El O U estándar inmenso para o U O en medir Inmenso u de o de U control o a en Inmensurables u glicémico inmenso U).</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 ¿Cómo calcular la dosis de insulina basal?"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"El inicio de insulinización basal en pacientes con Diabetes Mellitus Tipo 2 (insulinización oportuna) es el pilar para mitigar descompensaciones mortales en glomérulos y nervios cuando las pastillas hipoglucemiantes han fracasado crónicamente."}</p>
                        <p>{"Las guías conjuntas de la ADA (Asociación Americana de Diabetes) y la EASD determinan iniciar con dosis conservadoras que usualmente promedian de 10 Unidades Internacionales diarias, o calculadas estrictamente a 0.1 - 0.2 U/kg/día."}</p>
                        <p>{"Este cálculo requiere conocer fehacientemente el porcentaje de Hemoglobina Glucosilada (HbA1c) dictando si requerimos dosis conservadoras (0.1 U) o agresivas (0.2 U). El riesgo primordial del debut diabético a la insulina recae en la hipoglucemia nocturna."}</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 mt-6">
                        <strong>⚠️ Aviso:</strong> Esta herramienta es orientativa y NO sustituye el diagnóstico médico profesional. Consulta a tu médico para interpretación.
                    </div>
                </div>

                
                <RelatedTools currentPath="/herramientas/dosis-insulina-basal" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
