'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function IndiceGlucemicoPage() {
    const [busqueda, setBusqueda] = useState('');

    const database = [
        { name: 'Pan Blanco o Baguette', gi: 75, gl: 22, level: 'alto' },
        { name: 'Arroz Blanco Estándar', gi: 73, gl: 25, level: 'alto' },
        { name: 'Papas Horneadas / Fritas', gi: 85, gl: 28, level: 'alto' },
        { name: 'Sandía', gi: 76, gl: 5, level: 'alto' }, // Alto IG pero poca carga
        { name: 'Refresco Azucarado', gi: 63, gl: 16, level: 'medio' }, // Liquid sugar spikes fast
        { name: 'Plátano Maduro', gi: 62, gl: 16, level: 'medio' },
        { name: 'Avena Cruda', gi: 55, gl: 11, level: 'bajo' },
        { name: 'Lentejas Cocidas', gi: 32, gl: 7, level: 'bajo' },
        { name: 'Manzana Cruda', gi: 36, gl: 5, level: 'bajo' },
        { name: 'Brócoli, Espinaca', gi: 15, gl: 1, level: 'bajo' },
        { name: 'Zanahoria Cruda', gi: 16, gl: 1, level: 'bajo' },
        { name: 'Quinoa', gi: 53, gl: 13, level: 'bajo' },
        { name: 'Tortilla de Maíz Clásica', gi: 46, gl: 14, level: 'bajo' },
    ];

    const filt = database.filter(item => item.name.toLowerCase().includes(busqueda.toLowerCase()));

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-amber-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🥗 Índice Glucémico (IG)</h1>
                    <p className="text-amber-100 mt-2">Nivel de asimilación de azúcar por tipo de alimento</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">
                        Busca alimentos para consultar la velocidad con la que disparan el azúcar en sangre. <br />
                        <strong>IG Bajo (0-55)</strong> ideal | <strong>IG Medio (56-69)</strong> moderar | <strong>IG Alto (70+)</strong> evitar aisaldos en diabetes.
                    </p>

                    <input type="text" placeholder="🔍 Buscar alimento (Ej. Arroz, Lentejas...)"
                        value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full px-4 py-3 mb-6 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-lg text-gray-800" />

                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {filt.map((item, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row justify-between items-center p-4 border border-gray-100 rounded-xl bg-gray-50 hover:bg-white transition-colors">
                                <span className="font-bold text-gray-800 mb-2 md:mb-0 text-lg">{item.name}</span>
                                <div className="flex gap-4">
                                    <div className="text-center">
                                        <p className="text-xs uppercase text-gray-400 font-bold mb-1">Índice (Velocidad)</p>
                                        <span className={`px-4 py-1 rounded-full font-bold text-sm text-white ${item.level === 'alto' ? 'bg-red-500' : item.level === 'medio' ? 'bg-yellow-500' : 'bg-green-500'}`}>{item.gi}</span>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs uppercase text-gray-400 font-bold mb-1">Carga (Volumen)</p>
                                        <span className="px-4 py-1 rounded-full font-bold text-sm bg-gray-200 text-gray-700">{item.gl}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filt.length === 0 && <p className="text-center text-gray-500 py-4">No se encontraron resultados en la base de datos de ejemplo.</p>}
                    </div>

                    <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mt-8">
                        <h3 className="font-bold text-amber-900 text-lg mb-3">🔬 Pruebas de Tolerancia a los Carbohidratos</h3>
                        <p className="text-gray-700 text-sm mb-4">Incluso comiendo alimentos de ajo IG, tu cuerpo puede tener intolerancia. Sugerimos la <strong>Curva de Tolerancia a la Glucosa (75g)</strong> si notas letargo tras comer carnes o sientes que no bajas de peso con dieta limpia.</p>
                        <Link href="/estudios/analisis-clinicos" className="inline-block bg-amber-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-amber-700 transition-colors">
                            Ver Estudios de Glucosa →
                        </Link>
                    </div>
                </div>
                
                <StudyCTA 
                    title={`Control Total de Azúcar`} 
                    description={`La gestión de alimentos afecta picos de azúcar ocultos en la noche. Monitorear tu metabolismo general con HbA1c certifica los hábitos a largo plazo.`} 
                    actionText={`Prueba de Glucosa`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Prueba%20de%20Glucosa*`} 
                    type="estudio" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🍏 Guía de Nutrición Diabética: Cálculo de Índice Glucémico (IG)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>La evaluación u inmenso inmensurable u el del Inmenso o genéricamente U U Índice O al a e U al Glucémico O al a de inmenso u de un O alimento u evalúa U la a O al U en inmenso u velocidad u inmensurables Inmensa U O o con Inmenso la O inmensa u u general a la O al que eleva genéricamente la la la O de glucosa U o al basal de a al torrente U inmensurable O U o en sanguíneo a U Inmenso al U.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios de Control</h3>
       <ul>
           <li><a href="/estudios/perfiles/hemoglobina-glucosilada-hba1c" className="text-blue-600 font-semibold hover:underline">Hemoglobina Glucosilada Avanzada</a></li>
           <li><a href="/estudios/analisis-clinicos/glucosa" className="text-blue-600 font-semibold hover:underline">Glucosa Postprandial de 2 Horas</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />
            
                <RelatedTools currentPath="/herramientas/indice-glucemico" className="mb-8" />
            </div>
        </main>
    );
}
