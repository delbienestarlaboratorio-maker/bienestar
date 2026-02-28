'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';

export default function DiasFertilesPage() {
    const [fur, setFur] = useState('');
    const [ciclo, setCiclo] = useState('28');
    const [resultado, setResultado] = useState<{ ovulacion: Date; inicioFertil: Date; finFertil: Date; proxPeriodo: Date } | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        if (!fur) return;
        const f = new Date(fur); const c = parseInt(ciclo);
        const ovulacion = new Date(f); ovulacion.setDate(f.getDate() + c - 14);
        const inicioFertil = new Date(ovulacion); inicioFertil.setDate(ovulacion.getDate() - 5);
        const finFertil = new Date(ovulacion); finFertil.setDate(ovulacion.getDate() + 1);
        const proxPeriodo = new Date(f); proxPeriodo.setDate(f.getDate() + c);
        setResultado({ ovulacion, inicioFertil, finFertil, proxPeriodo });
    };

    const fmt = (d: Date) => d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-pink-600 to-purple-700 py-8 px-4"><div className="max-w-3xl mx-auto"><Link href="/herramientas" className="text-pink-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link><h1 className="text-3xl md:text-4xl font-bold text-white">🌸 Calculadora de Días Fértiles</h1><p className="text-pink-100 mt-2">Calcula tu ventana fértil y día de ovulación</p></div></div>
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div><label className="block text-sm font-bold text-gray-700 mb-2">Primer día de última regla</label><input type="date" value={fur} onChange={e => setFur(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg text-gray-800" /></div>
                        <div><label className="block text-sm font-bold text-gray-700 mb-2">Duración del ciclo (días)</label><select value={ciclo} onChange={e => setCiclo(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-gray-800">{Array.from({ length: 16 }, (_, i) => <option key={i} value={i + 21}>{i + 21} días</option>)}</select></div>
                    </div>
                    <button onClick={calcular} className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">Calcular Días Fértiles</button>
                    {resultado && (<div className="mt-8">
                        <div className="bg-pink-50 rounded-2xl p-6 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-pink-200"><p className="text-xs text-gray-500">Ventana Fértil</p><p className="text-lg font-bold text-pink-600">{fmt(resultado.inicioFertil)} — {fmt(resultado.finFertil)}</p><p className="text-xs text-gray-400">6 días más fértiles</p></div>
                                <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-purple-300"><p className="text-xs text-gray-500">🥚 Día de Ovulación</p><p className="text-2xl font-bold text-purple-700">{fmt(resultado.ovulacion)}</p><p className="text-xs text-gray-400">Máxima fertilidad</p></div>
                                <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200"><p className="text-xs text-gray-500">Próximo periodo</p><p className="text-lg font-bold text-gray-700">{fmt(resultado.proxPeriodo)}</p></div>
                            </div>
                        </div>
                        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"><h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios de Fertilidad Recomendados</h3><div className="space-y-3">{[{ name: 'Perfil Hormonal Femenino (FSH, LH, Estradiol)', reason: 'Evalúa la función ovárica y predicción de ovulación' }, { name: 'Progesterona (día 21)', reason: 'Confirma que hubo ovulación en el ciclo' }, { name: 'Hormona Antimülleriana (AMH)', reason: 'Indica reserva ovárica' }, { name: 'Perfil Tiroideo', reason: 'Alteraciones tiroideas causan infertilidad' }, { name: 'Prolactina', reason: 'Niveles altos pueden inhibir la ovulación' }].map(s => (<div key={s.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm"><span className="text-green-600 mt-1">✓</span><div><p className="font-semibold text-gray-800 text-sm">{s.name}</p><p className="text-gray-500 text-xs">{s.reason}</p></div></div>))}</div><Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800">Ver Estudios →</Link></div>
                    </div>)}
                </div>
                <AdBanner variant="horizontal" className="mb-8" />
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"><button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"><span className="font-bold text-gray-900">📚 Ovulación y fertilidad — Información Científica</span><span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span></button>{showInfo && (<div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4"><p>La <strong>ovulación</strong> ocurre aproximadamente 14 días antes del siguiente periodo menstrual. El óvulo sobrevive 12-24 horas, pero los espermatozoides pueden sobrevivir hasta 5 días, creando una <strong>ventana fértil</strong> de ~6 días.</p><div className="bg-gray-50 rounded-xl p-4 text-center font-mono">Ovulación ≈ FUR + duración del ciclo - 14 días</div><p>Esta calculadora es más precisa con ciclos regulares (21-35 días). Las personas con ciclos irregulares deben considerar pruebas de ovulación (LH) o ecografía folicular.</p><h4 className="font-bold text-gray-900">Fuentes</h4><ul className="list-disc list-inside text-xs text-gray-500"><li>Wilcox, A.J. et al. (2000). The timing of the &quot;fertile window&quot;. BMJ.</li><li>ACOG Practice Bulletin. Fertility Awareness-Based Methods.</li></ul><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800"><strong>⚠️ Aviso:</strong> Esta calculadora proporciona estimaciones para ciclos regulares. No es un método anticonceptivo confiable. Consulta a tu ginecólogo.</div></div>)}</div>
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
