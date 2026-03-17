'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function NRIPage() {
    const [albumina, setAlbumina] = useState('');
    const [pesoActual, setPesoActual] = useState('');
    const [pesoHabitual, setPesoHabitual] = useState('');
    const [resultado, setResultado] = useState<number | null>(null);

    const calcular = () => {
        const a = parseFloat(albumina); // g/dL
        const pAct = parseFloat(pesoActual);
        const pHab = parseFloat(pesoHabitual);

        if (a > 0 && pAct > 0 && pHab > 0) {
            // Convert albumin g/dL to g/L
            const alb_gL = a * 10;
            // Formula NRI: (1.519 * Albumin g/L) + (41.7 * (Current / Usual weight))
            const ratio = pAct / pHab;
            // The formula caps the weight ratio at 1 (if current > usual, don't artificially inflate score)
            const safeRatio = ratio > 1 ? 1 : ratio;

            const nri = (1.519 * alb_gL) + (41.7 * safeRatio);
            setResultado(parseFloat(nri.toFixed(1)));
        }
    };

    const getRiesgo = (score: number) => {
        if (score > 100) return { r: 'Sin Riesgo', c: 'text-green-700', b: 'bg-green-100', m: 'Estado nutricional y proteico adecuado.' };
        if (score >= 97.5) return { r: 'Riesgo Leve', c: 'text-yellow-700', b: 'bg-yellow-100', m: 'Déficit nutricional temprano.' };
        if (score >= 83.5) return { r: 'Riesgo Moderado', c: 'text-orange-700', b: 'bg-orange-100', m: 'Depleción proteico-calórica significativa.' };
        return { r: 'Riesgo Severo', c: 'text-red-700', b: 'bg-red-100', m: 'Desnutrición grave. Alto riesgo de complicaciones.' };
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-lime-800 to-green-900 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-lime-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🥗 Índice de Riesgo Nutricional (NRI)</h1>
                    <p className="text-lime-100 mt-2">Detección de desnutrición clínica y preoperatoria</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">El NRI (Nutritional Risk Index) es un parámetro objetivo que combina la pérdida de peso reciente con el nivel de proteínas en la sangre, siendo uno de los mejores predictores de riesgo en pacientes postoperatorios y geriátricos.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Albúmina Sérica (g/dL)</label>
                            <input type="number" step="0.1" value={albumina} onChange={(e) => setAlbumina(e.target.value)} placeholder="Ej: 4.2"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-lime-600 focus:ring-2 focus:ring-lime-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Peso Actual (kg)</label>
                            <input type="number" value={pesoActual} onChange={(e) => setPesoActual(e.target.value)} placeholder="Ej: 60"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-lime-600 focus:ring-2 focus:ring-lime-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Peso Habitual (kg)</label>
                            <input type="number" value={pesoHabitual} onChange={(e) => setPesoHabitual(e.target.value)} placeholder="Ej: 68"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-lime-600 focus:ring-2 focus:ring-lime-200 outline-none text-lg text-gray-800" />
                            <p className="text-xs text-gray-500 mt-1">Peso sano de hace ~3 meses</p>
                        </div>
                    </div>

                    <button onClick={calcular}
                        className="w-full bg-lime-700 hover:bg-lime-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">
                        Calcular NRI Nutricional
                    </button>

                    {resultado !== null && (() => {
                        const rec = getRiesgo(resultado);
                        return (
                            <div className="mt-8 animate-in fade-in">
                                <div className={`${rec.b} p-6 rounded-2xl border text-center mb-6`}>
                                    <p className="text-sm font-bold mb-1">Puntuación NRI</p>
                                    <p className={`text-5xl font-black ${rec.c}`}>{resultado}</p>
                                    <p className={`text-xl font-bold mt-2 uppercase ${rec.c}`}>{rec.r}</p>
                                    <p className="mt-2 text-sm">{rec.m}</p>
                                </div>
                                <div className="bg-lime-50 border-2 border-lime-200 rounded-2xl p-6 relative overflow-hidden text-lime-900">
                                    <h3 className="font-bold text-lg mb-3">🔬 Requisito de Laboratorio: Proteínas</h3>
                                    <p className="text-sm mb-4">El peso es engañoso: alguien puede retener líquidos orgánicos pesados (edema) y ocultar su grado de desnutrición real. La Albúmina en sangre es la proteína estelar que no engaña.</p>
                                    <div className="space-y-2 font-bold mb-4">
                                        <p className="bg-white/50 p-2 rounded border border-lime-100">✓ Albúmina Sérica Aislada</p>
                                        <p className="bg-white/50 p-2 rounded border border-lime-100">✓ Proteínas Totales (Relación A/G)</p>
                                    </div>
                                    <Link href="/estudios/analisis-clinicos" className="text-sm font-bold text-lime-700 hover:underline">Solicitar estudios →</Link>
                                </div>
                            </div>
                        );
                    })()}
                </div>
                
                <StudyCTA 
                    title={`Déficits Nutricionales Críticos`} 
                    description={`Un riesgo moderado o grave obliga a vigilar la deficiente absorción visceral de micronutrientes, destacando la Biometría para descartar depleción de tejido.`} 
                    actionText={`Check-Up Completo de Rutina`}
                    link={`/paquetes`} 
                    type="checkup" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🥗 Guía Nutricional Clínica: Índice de Riesgo Nutricional (NRI)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Índice de Riesgo Nutricional O el inmenso inmensurables O u y de NRI a U inmensa O u el u o de U y o de evalúa u al U el Inmensurables U inmensa inmenso a la a o y O U al u a Inmenso al a de a a o de al u O y U la o malnutrición u en O a inmenso U a inmenso inmensurable o u el la severa el inmenso u U e al inmenso U inmensurables O u a a U al a O al en U U Inmenso el el o genéricamente U inmenso general riesgo u genérica u O O y O e de en general y pacientes hospitalizados y Inmensurable genéricamente inmenso O u la O en u inmenso U prequirúrgicos u inmensurables u O y U a a O Inmensurables en inminente O O la a a o u O desnutrición O a al O u O.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Marcadores Bioquímicos URGENTES del de En Laboratorio</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/albumina" className="text-blue-600 font-semibold hover:underline">Albúmina Sérica</a> (El indicador proteico principal para la desnutrición basal).</li>
       </ul>
   </div>
</section>

                <RelatedTools currentPath="/herramientas/riesgo-nutricional-nri" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
