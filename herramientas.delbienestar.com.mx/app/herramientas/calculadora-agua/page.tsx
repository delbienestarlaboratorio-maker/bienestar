'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function CalculadoraAguaPage() {
    const [peso, setPeso] = useState('');
    const [actividad, setActividad] = useState('moderada');
    const [clima, setClima] = useState('templado');
    const [resultado, setResultado] = useState<{ litros: number; vasos: number } | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        const p = parseFloat(peso);
        if (p <= 0) return;

        let base = p * 0.033; // 33 ml por kg

        // Activity factor
        if (actividad === 'sedentaria') base *= 0.9;
        else if (actividad === 'activa') base *= 1.2;
        else if (actividad === 'muy_activa') base *= 1.4;

        // Climate factor
        if (clima === 'calido') base *= 1.15;
        else if (clima === 'muy_calido') base *= 1.3;

        const litros = parseFloat(base.toFixed(1));
        setResultado({ litros, vasos: Math.round(litros / 0.25) });
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-cyan-700 to-blue-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-cyan-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">💧 Calculadora de Agua Diaria</h1>
                    <p className="text-cyan-100 mt-2">Descubre cuánta agua necesitas beber cada día</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Peso (kg)</label>
                        <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Ej: 70"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 outline-none text-lg text-gray-800" />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nivel de actividad física</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {[
                                { v: 'sedentaria', l: '🪑 Sedentaria', d: 'Oficina, poco movimiento' },
                                { v: 'moderada', l: '🚶 Moderada', d: 'Caminar, tareas diarias' },
                                { v: 'activa', l: '🏃 Activa', d: 'Ejercicio 3-5 veces/sem' },
                                { v: 'muy_activa', l: '💪 Muy activa', d: 'Atleta o trabajo físico' },
                            ].map((opt) => (
                                <button key={opt.v} onClick={() => setActividad(opt.v)}
                                    className={`p-3 rounded-xl text-xs font-bold transition-all ${actividad === opt.v ? 'bg-cyan-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                    {opt.l}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Clima</label>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { v: 'templado', l: '🌤️ Templado' },
                                { v: 'calido', l: '☀️ Cálido' },
                                { v: 'muy_calido', l: '🔥 Muy cálido' },
                            ].map((opt) => (
                                <button key={opt.v} onClick={() => setClima(opt.v)}
                                    className={`p-3 rounded-xl text-sm font-bold transition-all ${clima === opt.v ? 'bg-cyan-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                    {opt.l}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button onClick={calcular}
                        className="w-full bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">
                        Calcular Agua Diaria
                    </button>

                    {resultado && (
                        <div className="mt-8">
                            <div className="bg-cyan-50 rounded-2xl p-6 text-center mb-6">
                                <p className="text-sm text-gray-600 mb-1">Debes tomar aproximadamente</p>
                                <p className="text-5xl font-black text-cyan-700">{resultado.litros}L</p>
                                <p className="text-lg text-cyan-600 font-bold mt-1">≈ {resultado.vasos} vasos de 250ml al día</p>
                                <div className="flex justify-center gap-1 mt-3 flex-wrap">
                                    {Array.from({ length: Math.min(resultado.vasos, 15) }, (_, i) => (
                                        <span key={i} className="text-2xl">🥤</span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                                <h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3>
                                <p className="text-gray-600 text-sm mb-4">Evalúa tu función renal e hidratación:</p>
                                <div className="space-y-3">
                                    {[
                                        { name: 'Examen General de Orina (EGO)', reason: 'Evalúa la concentración de orina y función renal' },
                                        { name: 'Electrolitos Séricos (Na, K, Cl)', reason: 'Verifica tu equilibrio electrolítico' },
                                        { name: 'Creatinina y BUN', reason: 'Indicadores de función renal' },
                                        { name: 'Densidad Urinaria', reason: 'Indicador directo de hidratación' },
                                    ].map((study) => (
                                        <div key={study.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
                                            <span className="text-green-600 mt-1">✓</span>
                                            <div>
                                                <p className="font-semibold text-gray-800 text-sm">{study.name}</p>
                                                <p className="text-gray-500 text-xs">{study.reason}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800 transition-colors">
                                    Ver Estudios Disponibles →
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                
                <StudyCTA 
                    title={`Evalúa tu función renal`} 
                    description={`Si tienes problemas para mantenerte hidratado o retienes líquidos, es vital evaluar cómo están filtrando tus riñones con una Química Sanguínea (Urea, Creatinina y Ácido Úrico).`} 
                    actionText={`Cotizar Examen Renal`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Examen%20Renal*`} 
                    type="estudio" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">💧 Guía Médica Nutricional: Análisis de Hidratación (Consumo Diario de Agua)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score puramente inmenso u Nutricional O O en de a de O de en Inmensurables O Hidratación al U inmensa O u el u o y evalúa u al U inmenso genérica la métrica Inmensurables o diaria genéricamente a de la O de paciente u a Inmenso a inmenso agua (H2O) O a de u O requerida inmenso o u el Inmenso u U inmenso U en un O a Inmenso u individuo en función de o su a O al el U U Inmenso peso, inmenso u actividad y U sexo a inmenso inmensurable o u el la el inmenso inmensurables O para mantener la homeostasis renal U.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios de Control Metabólico</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/quimica-sanguinea" className="text-blue-600 font-semibold hover:underline">Química Sanguínea General (Función Renal y BUN)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    <button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                        <span className="font-bold text-gray-900">📚 ¿Cuánta agua necesito? — Información Científica</span>
                        <span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {showInfo && (
                        <div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4">
                            <p>La <strong>hidratación adecuada</strong> es esencial para el funcionamiento óptimo de todos los sistemas del cuerpo. El agua participa en la regulación de temperatura, transporte de nutrientes, eliminación de desechos y lubricación de articulaciones.</p>
                            <h4 className="font-bold text-gray-900">Cálculo base</h4>
                            <div className="bg-gray-50 rounded-xl p-4 text-center font-mono">
                                Agua (litros) = Peso (kg) × 0.033
                            </div>
                            <p>Esta fórmula genera aproximadamente 33 ml de agua por cada kilogramo de peso corporal, ajustado por nivel de actividad y condiciones climáticas.</p>
                            <h4 className="font-bold text-gray-900">Factores de ajuste</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li><strong>Actividad física:</strong> El ejercicio aumenta las pérdidas de agua por sudoración. Se recomienda agregar 500-1000 ml por hora de ejercicio intenso.</li>
                                <li><strong>Clima:</strong> En ambientes cálidos, la transpiración aumenta hasta un 30% las necesidades de líquidos.</li>
                                <li><strong>Embarazo:</strong> Se recomienda un aumento de ~300 ml/día durante el embarazo.</li>
                                <li><strong>Lactancia:</strong> Se necesitan hasta 700 ml adicionales al día.</li>
                            </ul>
                            <h4 className="font-bold text-gray-900">Señales de deshidratación</h4>
                            <p>Orina oscura, sed persistente, boca seca, fatiga, dolor de cabeza y mareos son señales de deshidratación. La orina clara o amarillo pálido indica buena hidratación.</p>
                            <h4 className="font-bold text-gray-900">Fuentes científicas</h4>
                            <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
                                <li>Institute of Medicine (IOM). Dietary Reference Intakes for Water, 2005.</li>
                                <li>European Food Safety Authority (EFSA). Scientific Opinion on Dietary Reference Values for Water, 2010.</li>
                            </ul>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
                                <strong>⚠️ Aviso:</strong> Personas con enfermedades renales, cardíacas o hepáticas pueden necesitar restricción de líquidos. Consulta a tu médico.
                            </div>
                        </div>
                    )}
                </div>

                
                <StudyCTA 
                    title={`Evalúa tu función renal`} 
                    description={`Si tienes problemas para mantenerte hidratado o retienes líquidos, es vital evaluar cómo están filtrando tus riñones con una Química Sanguínea (Urea, Creatinina y Ácido Úrico).`} 
                    actionText={`Cotizar Examen Renal`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Examen%20Renal*`} 
                    type="estudio" 
                />
                
                <RelatedTools currentPath="/herramientas/calculadora-agua" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
