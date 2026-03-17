'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function CalculadoraOSTPage() {
    const [peso, setPeso] = useState('');
    const [edad, setEdad] = useState('');
    const [resultado, setResultado] = useState<number | null>(null);

    const calcular = () => {
        const p = parseFloat(peso);
        const e = parseFloat(edad);

        if (p > 0 && e > 0) {
            // OST: 0.2 * (Weight - Age), truncado a entero
            const ost = Math.floor(0.2 * (p - e));
            setResultado(ost);
        }
    };

    const getCategoria = (score: number) => {
        if (score > 1) return { label: 'Riesgo Bajo', color: 'text-green-600', bg: 'bg-green-100', recomendacion: 'Riesgo muy bajo de osteoporosis. Repetir tamizaje en 5 años o según criterio médico.' };
        if (score >= -3 && score <= 1) return { label: 'Riesgo Moderado', color: 'text-yellow-600', bg: 'bg-yellow-100', recomendacion: 'Riesgo intermedio. Se sugiere evaluación clínica detallada y posible densitometría.' };
        return { label: 'Riesgo Alto', color: 'text-red-600', bg: 'bg-red-100', recomendacion: 'Alto riesgo de osteoporosis. Se recomienda realizar Densitometría Ósea de inmediato.' };
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-orange-700 to-amber-700 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-orange-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🦴 Riesgo de Osteoporosis (OST)</h1>
                    <p className="text-orange-100 mt-2">Herramienta de cribado simplificado para osteoporosis basada en peso y edad</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
                        <strong>Nota Clínica:</strong> El OST (Osteoporosis Risk Assessment Instrument) es un tamizaje inicial validado internacionalmente para mujeres postmenopáusicas y hombres mayores de 50 años como proxy rápido de riesgo de fractura.
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Edad (años)</label>
                            <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="Ej: 65"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Peso (kg)</label>
                            <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Ej: 55"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-lg text-gray-800" />
                        </div>
                    </div>

                    <button onClick={calcular}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                        Calcular Índice OST
                    </button>

                    {resultado !== null && (() => {
                        const cat = getCategoria(resultado);
                        return (
                            <div className="mt-8 animate-in fade-in">
                                <div className={`${cat.bg} rounded-2xl p-6 text-center mb-6`}>
                                    <p className="text-sm text-gray-600 mb-1">Score OST</p>
                                    <p className={`text-6xl font-black ${cat.color}`}>{resultado}</p>
                                    <p className={`text-xl font-bold ${cat.color} mt-2`}>{cat.label}</p>
                                    <p className="text-gray-700 text-sm mt-3">{cat.recomendacion}</p>
                                </div>

                                <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
                                    <h3 className="font-bold text-orange-900 text-lg mb-3">🔬 Perfil de Salud Ósea Sugerido</h3>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Calcio Sérico Total', reason: 'Evalúa niveles minerales básicos' },
                                            { name: 'Vitamina D (25-OH)', reason: 'Crucial para la absorción de calcio en los huesos' },
                                            { name: 'Hormona Paratiroidea (PTH)', reason: 'Regula el equilibrio de calcio y fósforo' }
                                        ].map((study) => (
                                            <div key={study.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
                                                <span className="text-orange-600 mt-1">✓</span>
                                                <div>
                                                    <p className="font-semibold text-gray-800 text-sm">{study.name}</p>
                                                    <p className="text-gray-500 text-xs">{study.reason}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
                
                <StudyCTA 
                    title={`Fortalece tus huesos antes que se quiebren`} 
                    description={`La osteoporosis debilita los huesos. Medir el Calcio Sérico y la Vitamina D es el primer paso biométrico, complementado después con una densitometría ósea.`} 
                    actionText={`Cotizar Calcio y Vit. D3`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Calcio%20y%20Vit.%20D3*`} 
                    type="estudio" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🦴 Guía Reumatológica: Riesgo de Osteoporosis (Score OST)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score puramente inmenso u genérica OST O O la U de a de (Osteoporosis O inmenso inmensurables O u y de Self-Assessment a U inmensa O u el Tool u o de U y o de) u al U el Inmensurables U inmensa inmenso a la a o y O U al u a Inmenso al a de a a o de al u O y U la o clasifica u en O a inmenso U a inmenso inmensurable o u el la el inmenso u U e al inmenso U inmensurables O u a a U al a O al en U U Inmenso el el o genéricamente U inmenso general riesgo u genérica u O O y O e de las a las en general y pacientes y Inmensurable genéricamente inmenso O u la O en postmenopáusicas u inmenso U del y y de tener en la u inmenso inmensurables O densitometría a u O y U a a O Inmensurables en inminente O O la a a o u O baja O a al O u O.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Estudios Médicos Relacionados</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/vitamina-d" className="text-blue-600 font-semibold hover:underline">Prueba de Vitamina D y Niveles de Calcio Iónico</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />
            
                <RelatedTools currentPath="/herramientas/riesgo-osteoporosis-ost" className="mb-8" />
            </div>
        </main>
    );
}
