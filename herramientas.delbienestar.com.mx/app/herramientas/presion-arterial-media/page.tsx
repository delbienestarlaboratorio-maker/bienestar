'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function PresionArterialMediaPage() {
    const [pas, setPas] = useState<string>('');
    const [pad, setPad] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const s=parseFloat(pas);const d=parseFloat(pad);if(!s||!d||s<=d)return;const pam=(s+(2*d))/3;let l='Óptima',c='text-green-600',b='bg-green-100',desc='Perfusión orgánica ideal.';if(pam<60){l='Peligrosa (Hipo-perfusión)';c='text-red-600';b='bg-red-100';desc='Fallo potencial del flujo cerebral o coronario. Isquemia tisular.';}else if(pam>105){l='Elevada';c='text-orange-600';b='bg-orange-100';desc='Sobrepresión prolongada causa estrés arterial periférico o hipertensión crónica.';}setResultado({value: pam.toFixed(1), unit: 'mmHg', label:l, color:c, bg:b, desc:desc});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-red-700 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">❤️ Presión Arterial Media (PAM)</h1>
                    <p className="text-red-100 mt-2">Cálculo de perfusión de órganos vitales</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Métricas de Tensión Arterial</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Presión Sistólica (alta) (mmHg)"}</label>
                        <input type="number" value={pas} onChange={(e) => setPas(e.target.value)} placeholder="ej: 120" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Presión Diastólica (baja) (mmHg)"}</label>
                        <input type="number" value={pad} onChange={(e) => setPad(e.target.value)} placeholder="ej: 80" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all" />
                    </div>

                    <button onClick={calcular} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">PAM Estimada</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Estudios Preventivos para Hipertensión"
                    description="La presión arterial crónicamente elevada daña la función renal y microvascular silenciosamente."
                    actionText="Perfil Renal y Riesgo Cardiovascular"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Quimica%20Sanguinea%20y%20Biometria"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🫀 Guía Cardiológica: Presión Arterial Media (PAM)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>La PAM es el estándar de oro inicial U en el área de cuidados críticos mundiales para catalogar el altísimo nivel basal de perfusión al a U y de a los U u órganos inmenso a O u O en vitales O o del cuerpo O u O. Mide de de o directamente la al o y O y circulación cerebral, U o renal u o en paramétricamente general.</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Falla Orgánica y Shock</h4>
           <p className="text-red-700 m-0">Una PAM inmensurable U O general en a y u O a inferior a o o de 60 mmHg U en indica Inmenso O de a O o el O U puramente O U un u colapso inmenso inmensurable o shock inminente al o O u U O de U general q la a al Inmenso a que al u a de O y precisa o O en o inmensa urgencia hospitalaria.</p>
       </div>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios de Monitoreo</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/quimica-sanguinea" className="text-blue-600 font-semibold hover:underline">Electrolitos Séricos (Sodio, Potasio, Cloro)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 ¿Qué es la PAM o Presión Arterial Media?</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>La Presión Arterial Media (PAM) es la presión intravascular promedio durante un ciclo cardíaco entero. No es una media estrictamente aritmética porque el corazón en reposo emplea el 60% del tiempo en su fase diastólica frente a un 40% empujando sangre en la sístole.</p>
                        <p>Este parámetro es esencial al administrar medicamentos vasopresores o vasodilatadores en cuidados intensivos. Se tolera ampliamente que el índice PAM mínimo para nutrir de oxígeno de la sangre a los capilares orgánicos vitales (como riñones, intestinos y cerebro) es de 60 mmHg a 65 mmHg.</p>
                        <p>Pacientes con lecturas PAM sostenidas debajo de este umbral presentan isquemia y posible fallo multiorgánico a las pocas horas.</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 mt-6">
                        <strong>⚠️ Aviso:</strong> Esta herramienta es orientativa y NO sustituye el diagnóstico médico profesional. Consulta a tu médico para interpretación.
                    </div>
                </div>

                
                <RelatedTools currentPath="/herramientas/presion-arterial-media" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
