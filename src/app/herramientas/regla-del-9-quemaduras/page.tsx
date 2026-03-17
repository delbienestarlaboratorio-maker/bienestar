'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { RelatedTools } from '@/components/ui/RelatedTools';

const ZONAS_ADULTO = [
    { name: 'Cabeza y cuello', pct: 9, emoji: '🧑' },
    { name: 'Brazo derecho completo', pct: 9, emoji: '💪' },
    { name: 'Brazo izquierdo completo', pct: 9, emoji: '💪' },
    { name: 'Tronco anterior (pecho + abdomen)', pct: 18, emoji: '👕' },
    { name: 'Tronco posterior (espalda + glúteos)', pct: 18, emoji: '🔙' },
    { name: 'Pierna derecha completa', pct: 18, emoji: '🦵' },
    { name: 'Pierna izquierda completa', pct: 18, emoji: '🦵' },
    { name: 'Periné / genitales', pct: 1, emoji: '🩲' },
];

export default function ReglaDel9Page() {
    const [zonas, setZonas] = useState<Record<number, 'none' | 'partial' | 'full'>>({});
    const [resultado, setResultado] = useState<any>(null);

    const cycle = (idx: number) => {
        const current = zonas[idx] || 'none';
        const next = current === 'none' ? 'full' : current === 'full' ? 'partial' : 'none';
        setZonas({ ...zonas, [idx]: next });
    };

    const calcular = () => {
        let total = 0;
        ZONAS_ADULTO.forEach((z, i) => {
            const st = zonas[i] || 'none';
            if (st === 'full') total += z.pct;
            else if (st === 'partial') total += z.pct / 2;
        });
        total = Math.round(total * 10) / 10;
        let label = '', color = '', bg = '', desc = '', parkland = '';
        if (total <= 10) {
            label = 'Quemadura menor'; color = 'text-green-700'; bg = 'bg-green-50';
            desc = 'Puede manejarse ambulatoriamente si es quemadura de 2° grado superficial sin afectar cara, manos, pies, genitales o articulaciones.';
        } else if (total <= 20) {
            label = 'Quemadura moderada'; color = 'text-orange-700'; bg = 'bg-orange-50';
            desc = 'Requiere hospitalización. Iniciar reposición de líquidos intravenosos. Valorar transferencia a centro de quemados.';
        } else {
            label = 'Quemadura mayor — GRAVE'; color = 'text-red-700'; bg = 'bg-red-50';
            desc = 'Emergencia. Requiere reanimación agresiva con líquidos (fórmula de Parkland), manejo en unidad especializada de quemados y posible intubación.';
        }
        // Parkland formula: 4 mL × kg × %SCQ (first 24h, half in first 8h)
        parkland = `Fórmula de Parkland: 4 mL × peso(kg) × ${total}% = mL en 24h (mitad en primeras 8h)`;
        setResultado({ total, label, color, bg, desc, parkland });
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-orange-700 to-red-800 py-10 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-orange-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🔥 Regla del 9 — Superficie Corporal Quemada</h1>
                    <p className="text-orange-100 mt-2 text-lg">Calcula el porcentaje de superficie corporal quemada (SCQ) para determinar la gravedad y guiar la reposición de líquidos</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="bg-orange-50 rounded-xl p-4 mb-6 border border-orange-200">
                        <p className="text-orange-800 text-sm"><strong>Instrucciones:</strong> Haga clic en cada zona para marcar si está quemada completamente (100%) o parcialmente (50%). Haga clic de nuevo para desmarcar. Solo aplica para adultos (&gt;14 años).</p>
                    </div>

                    <div className="space-y-3">
                        {ZONAS_ADULTO.map((zona, i) => {
                            const st = zonas[i] || 'none';
                            return (
                                <button key={i} onClick={() => cycle(i)} className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${st === 'full' ? 'border-red-500 bg-red-50' : st === 'partial' ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{zona.emoji}</span>
                                        <div>
                                            <span className="font-bold text-gray-800">{zona.name}</span>
                                            <span className="text-gray-500 text-sm ml-2">({zona.pct}%)</span>
                                        </div>
                                    </div>
                                    <span className={`text-sm font-bold px-3 py-1 rounded-lg ${st === 'full' ? 'bg-red-200 text-red-800' : st === 'partial' ? 'bg-orange-200 text-orange-800' : 'bg-gray-100 text-gray-400'}`}>
                                        {st === 'full' ? '100%' : st === 'partial' ? '50%' : '—'}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <button onClick={calcular} className="w-full bg-orange-700 hover:bg-orange-800 text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg mt-6">
                        Calcular % Superficie Quemada
                    </button>

                    {resultado && (
                        <div className="mt-8">
                            <div className={`rounded-2xl p-6 text-center ${resultado.bg} border`}>
                                <p className="text-sm text-gray-600">Superficie Corporal Quemada</p>
                                <p className={`text-6xl font-black ${resultado.color}`}>{resultado.total}%</p>
                                <p className={`text-xl font-bold ${resultado.color} mt-2`}>{resultado.label}</p>
                                <p className="text-gray-700 text-sm mt-3 max-w-lg mx-auto">{resultado.desc}</p>
                                {resultado.total > 10 && (
                                    <div className="mt-4 bg-white rounded-xl p-3 text-sm text-gray-700 border">
                                        <strong>💧 Reposición de líquidos:</strong> {resultado.parkland}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <AdBanner variant="horizontal" className="mb-8" />

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Guía Médica: Regla del 9 de Wallace</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>La <strong>Regla del 9 de Wallace</strong> es un método rápido para estimar el porcentaje de superficie corporal quemada (SCQ) en adultos. Divide el cuerpo en regiones que representan el 9% (o múltiplos) de la superficie total.</p>

                        <h3 className="text-xl font-bold text-gray-800 mt-6">¿Cuándo transferir a un centro de quemados?</h3>
                        <ul>
                            <li>Quemaduras de <strong>&gt;10% SCQ en 2° grado</strong> o cualquier porcentaje de 3° grado</li>
                            <li>Quemaduras en <strong>cara, manos, pies, genitales o articulaciones</strong></li>
                            <li>Quemaduras <strong>eléctricas o químicas</strong></li>
                            <li>Quemaduras en <strong>niños menores de 5 años o adultos mayores de 60</strong></li>
                            <li>Pacientes con <strong>inhalación de humo</strong></li>
                        </ul>

                        <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6 rounded-r-xl">
                            <h4 className="text-red-800 font-bold mb-2">⚠️ Fórmula de Parkland (Baxter)</h4>
                            <p className="text-red-700 m-0"><strong>4 mL × peso (kg) × % SCQ</strong> = volumen total de Ringer Lactato en 24 horas. Se administra la <strong>mitad en las primeras 8 horas</strong> desde la quemadura (no desde el ingreso) y la otra mitad en las siguientes 16 horas.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 mb-8">
                    <strong>⚠️ Aviso:</strong> Esta calculadora es una referencia. En caso de quemadura, acuda a urgencias inmediatamente. No aplique remedios caseros (mantequilla, pasta dental) sobre la quemadura.
                </div>
            
                <RelatedTools currentPath="/herramientas/regla-del-9-quemaduras" className="mb-8" />
            </div>
        </main>
    );
}
