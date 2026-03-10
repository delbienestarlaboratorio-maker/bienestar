'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function IndiceCardoToracicoRxPage() {
    const [diametroA, setDiametroA] = useState<string>('');
    const [diametroB, setDiametroB] = useState<string>('');
    const [diametroC, setDiametroC] = useState<string>('');
    const [edad, setEdad] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const a=parseFloat(diametroA);const b=parseFloat(diametroB);const c=parseFloat(diametroC);if(!a||!b||!c||!edad)return;const ict=(a+b)/c;let label='Normal';let color='text-green-600';let bg='bg-green-100';let desc='La silueta cardíaca está dentro de los límites normales.';const cutoff=edad==='lactante'?0.6:0.5;if(ict>=cutoff){if(ict<0.55&&edad==='adulto'){label='Cardiomegalia Grado I';color='text-yellow-600';bg='bg-yellow-100';desc='Crecimiento cardíaco leve. Requiere correlación clínica.';}else if(ict<0.6&&edad==='adulto'){label='Cardiomegalia Grado II';color='text-orange-600';bg='bg-orange-100';desc='Crecimiento cardíaco moderado.';}else if(ict<0.65){label='Cardiomegalia Grado III';color='text-red-500';bg='bg-red-100';desc='Crecimiento cardíaco severo. Sugiere insuficiencia cardíaca o derrame pericárdico.';}else{label='Cardiomegalia Grado IV';color='text-red-700';bg='bg-red-200';desc='Crecimiento cardíaco masivo (Cor Bovinum). Riesgo altísimo.';}}setResultado({value:ict.toFixed(2),label,color,bg,desc});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-zinc-700 to-neutral-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-zinc-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🫀 Índice Cardiotorácico (ICT)</h1>
                    <p className="text-zinc-100 mt-2">Medición de Cardiomegalia en Radiografía de Tórax PA</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Medidas de la Radiografía (PA) en cm/mm"}</h2>

                    <div className="mb-4">

                        <label className="block text-sm font-bold text-gray-700 mb-1">Distancia 'A' (Línea media a borde lateral cardíaco derecho) (mm)</label>
                        <input type="number" value={diametroA} onChange={(e) => setDiametroA(e.target.value)} placeholder="Ej: 45" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-100 transition-all" />
                    </div>

                    <div className="mb-4">

                        <label className="block text-sm font-bold text-gray-700 mb-1">Distancia 'B' (Línea media a borde lateral cardíaco izquierdo) (mm)</label>
                        <input type="number" value={diametroB} onChange={(e) => setDiametroB(e.target.value)} placeholder="Ej: 85" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-100 transition-all" />
                    </div>

                    <div className="mb-4">

                        <label className="block text-sm font-bold text-gray-700 mb-1">Distancia 'C' (Diámetro torácico interno máximo costofrenico) (mm)</label>
                        <input type="number" value={diametroC} onChange={(e) => setDiametroC(e.target.value)} placeholder="Ej: 260" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-100 transition-all" />
                    </div>

                    <div className="mb-4">

                        <label className="block text-sm font-bold text-gray-700 mb-1">Grupo Etario del Paciente</label>
                        <select value={edad} onChange={(e) => setEdad(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-zinc-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="adulto">{"Adulto / Niño mayor de 5 años (< 0.50 Normal)"}</option>
                            <option value="lactante">{"Lactante / Recién nacido (< 0.60 Normal)"}</option>
                        </select>
                    </div>

                    <button onClick={calcular} className="w-full bg-zinc-700 hover:bg-zinc-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Índice (Ratio)</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="¿Sospecha de Insuficiencia Cardíaca?"
                    description="Un ICT alterado debe complementarse con biomarcadores cardíacos agudos como el NT-proBNP."
                    actionText="Cotizar Prueba NT-proBNP"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Pro-P%C3%A9ptido%20Natriur%C3%A9tico%20Cerebral%20(NT-proBNP)"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Cómo medir el Índice Cardiotorácico en Radiología"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p dangerouslySetInnerHTML={{ __html: "El Índice Cardiotorácico (ICT), propuesto inicialmente por Danzer en 1919, es uno de los métodos radiológicos más antiguos y accesibles para tamizar el crecimiento de las cámaras cardíacas o la presencia de derrames pericárdicos." }} />
                        <p dangerouslySetInnerHTML={{ __html: "Para un cálculo exacto, la radiografía DEBE ser tomada en proyección Postero-Anterior (PA) a una distancia tubo-película de 1.80 metros (72 pulgadas) y preferiblemente en inspiración máxima. Las proyecciones Antero-Posteriores (AP), como las de equipos portátiles en terapias intensivas, magnifican falsamente la silueta cardíaca entre un 10 y un 15%." }} />
                        <p dangerouslySetInnerHTML={{ __html: "La fórmula es simple: ICT = (A + B) / C. Siendo 'A' y 'B' la suma de la magnitud cardíaca transversal máxima hacia la derecha e izquierda de la línea media espinal, y 'C' el diámetro torácico máximo a nivel basal. En adultos sanos, debe ser estrictamente inferior a 0.50." }} />
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
