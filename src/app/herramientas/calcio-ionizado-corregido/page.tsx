'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function CalcioIonizadoCorregidoPage() {
    const [calcioTotal, setCalcioTotal] = useState<string>('');
    const [albumina, setAlbumina] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const ca=parseFloat(calcio_total);const alb=parseFloat(albumina);if(!ca||!alb)return;const ca_c = ca + (0.8 * (4.0 - alb));let l='Normal',c='text-green-600',b='bg-green-100',d='Metabolismo del calcio fisiológico. Aparenta hipocalcemia en laboratorio por niveles bajos proteicos.';if(ca_c<8.5){l='Hipocalcemia',c='text-blue-600',b='bg-blue-100',d='Hipocalcemia Verdadera. Calcio severamente bajo incluso tras ajuste molecular proteico. Vigilar tétanos.'}else if(ca_c>10.5){l='Hipercalcemia',c='text-red-600',b='bg-red-100',d='Hipercalcemia Verdadera. Riesgo alto arrítmico y de necrosis tubular. Descartar tumoración.'}setResultado({value: ca_c.toFixed(2), unit: 'mg/dL (corregido)', label:l, color:c, bg:b, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-amber-700 to-orange-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-amber-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🦴 Calcio Sérico Corregido</h1>
                    <p className="text-amber-100 mt-2">Ajuste real del calcio según niveles de albúmina</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Valores de Sangre"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Calcio Total Medido (mg/dL)"}</label>
                        <input type="number" value={calcioTotal} onChange={(e) => setCalcioTotal(e.target.value)} placeholder="8.5" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Albúmina Sérica (g/dL)"}</label>
                        <input type="number" value={albumina} onChange={(e) => setAlbumina(e.target.value)} placeholder="2.8" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all" />
                    </div>

                    <button onClick={calcular} className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className="bg-blue-50 rounded-2xl p-6 text-center mb-6">
                            <p className="text-sm text-gray-600 mb-1">Concentración Corregida</p>
                            <p className="text-5xl font-black text-blue-700">{resultado.value}</p>
                            {resultado.unit && <p className="text-blue-500 text-sm mt-1">{resultado.unit}</p>}
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Evita Descalcificación Severa"
                    description="Medir Vitamina D y Paratohormona asisten para evitar una descalcificación irreparable de los huesos."
                    actionText="Revisar Test Vitamina D"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Vitamina%20D%20y%20Fosforo"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Fórmula del Calcio Sanguíneo Corregido"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"Más del 50% de todo el calcio que circula transportado a través del lecho venoso sistémico lo hace atascado mediante uniones covalentes a la estructura de la gigantesca proteína Albúmina."}</p>
                        <p>{"Cuando pacientes sufren de malnutrición o enfermedades hepáticas (hígado enfermo no crea albúmina), el examen de Calcio ordinario engañosamente marcará deficiencia extrema sin existir tal hipocalcemia verdadera en la clínica del paciente."}</p>
                        <p>{"El factor calculador de corrección agrega empíricamente 0.8 miligramos al valor total emitido en laboratorio clínico multiplicados por cada único gramo que nuestro enfermo haya decrecido bajo el rango normalizado universal de Albúmina de 4 g/dL."}</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 mt-6">
                        <strong>⚠️ Aviso:</strong> Esta herramienta es orientativa y NO sustituye el diagnóstico médico profesional. Consulta a tu médico para interpretación.
                    </div>
                </div>

                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
