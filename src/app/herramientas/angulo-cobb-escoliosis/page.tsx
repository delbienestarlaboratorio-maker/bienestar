'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function AnguloCobbEscoliosisPage() {
    const [cobb, setCobb] = useState<string>('');
    const [madurez, setMadurez] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const v=parseFloat(cobb);if(isNaN(v)||!madurez)return;let label='';let color='';let bg='';let desc='';if(v<10){label='Asimetría Espinal (No Escoliosis)';color='text-green-600';bg='bg-green-100';desc='Un ángulo menor de 10° no se considera escoliosis clínica. Observación postural.';}else if(v<=20){label='Escoliosis Leve';color='text-yellow-600';bg='bg-yellow-100';desc=madurez==='inmaduro'?'Riesgo de progresión moderado. Monitoreo radiológico cada 6 meses.':'Bajo riesgo de progresión clínica. Requiere terapia física.';}else if(v<=40){label='Escoliosis Moderada';color='text-orange-500';bg='bg-orange-100';desc=madurez==='inmaduro'?'Alto riesgo de empeoramiento. Generalmente se indica uso de corsé ortopédico (Brace).':'Probabilidad de progresión de 1 grado por año. Observación y Fisioterapia especializada.';}else if(v<=50){label='Escoliosis Severa';color='text-red-600';bg='bg-red-100';desc='Cursa la indicación limítrofe para artrodesis espinal correctiva (Cirugía).';}else{label='Escoliosis Muy Severa';color='text-red-800';bg='bg-red-200';desc='Deterioro cardiopulmonar inminente. Indicación de instrumentación quirúrgica absoluta.';}setResultado({value:v+'°',label,color,bg,desc});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-zinc-700 to-neutral-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-zinc-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🦴 Ángulo de Cobb</h1>
                    <p className="text-zinc-100 mt-2">Estadificación Radiológica de Curvas Escolióticas</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Valores Angulares Medidos en la RX"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Medición del Ángulo de Cobb (Grados (°))"}</label>
                        <input type="number" value={cobb} onChange={(e) => setCobb(e.target.value)} placeholder="Ej: 25" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Madurez Esquelética (Signo de Risser)"}</label>
                        <select value={madurez} onChange={(e) => setMadurez(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-zinc-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="inmaduro">{"Risser 0-2 (Mayor potencial de progresión)"}</option>
                            <option value="maduro">{"Risser 3-5 (Crecimiento vertebral cercano al fin)"}</option>
                        </select>
                    </div>

                    <button onClick={calcular} className="w-full bg-zinc-700 hover:bg-zinc-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Diagnóstico Radiológico</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="¿Dolor crónico por deformidad espinal?"
                    description="Si la escoliosis general inflamación articular secundaria, descarta artropatías autoinmunes asociadas."
                    actionText="Cotizar Reactante de Fase Aguda"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Prote%C3%ADna%20C%20Reactiva%20Ultrasensible"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Qué es y cómo se mide el Ángulo de Cobb en Radiología"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p dangerouslySetInnerHTML={{ __html: "El Ángulo de Cobb, descrito por John Robert Cobb en 1948, sigue siendo la regla de oro mundial para la cuantificación métrica y seguimiento de la escoliosis o deformidades de la columna en el plano coronal y sagital (cifosis o lordosis patológica)." }} />
                        <p dangerouslySetInnerHTML={{ __html: "Para medirlo en los monitores PACS o de forma analógica, el radiólogo identifica la vértebra cefálica (superior) y la vértebra caudal (inferior) más predispuestas o basculadas al eje de la curva cóncava. Se traza una línea paralela al platillo vertebral superior de la primera, y otra paralela al platillo inferior de la segunda. El ángulo en la intersección de estas líneas (o de sus perpendiculares) da como resultado el Ángulo de Cobb." }} />
                        <p dangerouslySetInnerHTML={{ __html: "Cualquier medición superior a 10° (con rotación del cuerpo vertebral en el plano axial visible) certifica el diagnóstico anatómico de Escoliosis según la Scoliosis Research Society." }} />
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
