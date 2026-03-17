'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function FactorSensibilidadInsulinaPage() {
    const [dosisTotal, setDosisTotal] = useState<string>('');
    const [tipoInsulina, setTipoInsulina] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const t=parseFloat(dosis_total);const tp=parseFloat(tipo_insulina);if(!t||!tp)return;const isf=tp/t;let l='ISF Estándar Estimado',c='text-amber-600',b='bg-amber-100',d='Por cada Unidad de Insulina administrada, tu glucosa en sangre bajará '+Math.round(isf)+' mg/dL.';setResultado({value: '1U reduce '+Math.round(isf), unit: 'mg/dL', label:l, color:c, bg:b, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-amber-700 to-orange-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-amber-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">📉 Factor de Sensibilidad a la Insulina (ISF)</h1>
                    <p className="text-amber-100 mt-2">Regla de los 1500 / 1800</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Parámetros de Terapia"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Dosis Total Diaria (TDD) de Insulina (Unidades)"}</label>
                        <input type="number" value={dosisTotal} onChange={(e) => setDosisTotal(e.target.value)} placeholder="ej: 40" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Tipo de Insulina Rápida Usada"}</label>
                        <select value={tipoInsulina} onChange={(e) => setTipoInsulina(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="1800">{"Análogos Ultra Rápidos (Lispro, Aspart)"}</option>
                            <option value="1500">{"Insulina Regular Humana (Acción corta)"}</option>
                        </select>
                    </div>

                    <button onClick={calcular} className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className="bg-blue-50 rounded-2xl p-6 text-center mb-6">
                            <p className="text-sm text-gray-600 mb-1">Factor de Corrección</p>
                            <p className="text-5xl font-black text-blue-700">{resultado.value}</p>
                            {resultado.unit && <p className="text-blue-500 text-sm mt-1">{resultado.unit}</p>}
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Evita el Daño Renal"
                    description="La descompensación constante de la glucosa destruye la filtración de los riñones."
                    actionText="Cotizar Microalbúmina Renal"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Microalbuminuria%20Quimica"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩸 Guía Endocrinológica Diabética: Factor de Sensibilidad a la Insulina (ISF / Corrección)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Factor inmensurable O o inmenso de u la Inmensurables U u Sensibilidad inmensurable al O U genéricamente a la inmenso el O u a inmenso U Insulina o en genérico al evalúa o el Inmenso o genérica O u inmensa U a O o cuántos U O u de mg/dL al de la glucosa o a en general sanguínea (O al azúcar en la Inmenso sangre u y de) o a en la puramente reducirá u una O sola a a inmenso U a inmenso inmensurable de Inmenso u unidad de U al u o inmensa insulina U U rápida inmenso o ultrarrápida (Regla del 1500 / 1800).</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Estudios de Laboratorio Confirmatorios Perfil Metabólico</h3>
       <ul>
           <li><a href="/estudios/perfiles/hemoglobina-glucosilada-hba1c" className="text-blue-600 font-semibold hover:underline">Hemoglobina Glucosilada (HbA1c Avanzada)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Regla del 1800: Sensibilidad a Insulina"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"El Factor de Sensibilidad a la Insulina (ISF por sus siglas en inglés) es la base matemática vital para que un paciente diabético insulinizado sepa cómo corregir hiperglucemias agudas sin inducirse a sí mismo una hipoglucemia por sobredosis."}</p>
                        <p>{"Representa cuántos miligramos por decilitro (mg/dL) bajará la glucosa en sangre de una persona si llega a inyectarse exactamente 1 sola unidad de insulina rápida."}</p>
                        <p>{"Para insulinas humanas regulares clásicas, divide el número mágico 1500 entre la cantidad entera inyectada en 24h. Si utilizas análogos ultrarrápidos moleculares (Lispro, Aspart, Glulisina), la regla cambia al número mágico 1800."}</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 mt-6">
                        <strong>⚠️ Aviso:</strong> Esta herramienta es orientativa y NO sustituye el diagnóstico médico profesional. Consulta a tu médico para interpretación.
                    </div>
                </div>

                
                <RelatedTools currentPath="/herramientas/factor-sensibilidad-insulina" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
