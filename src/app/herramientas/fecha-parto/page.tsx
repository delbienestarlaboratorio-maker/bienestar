'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';

export default function FechaPartoPage() {
    const [fur, setFur] = useState('');
    const [resultado, setResultado] = useState<{ fpp: Date; semanas: number; trimestre: string } | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        if (!fur) return;
        const fecha = new Date(fur);
        const fpp = new Date(fecha);
        fpp.setDate(fpp.getDate() + 280); // Regla de Naegele
        const hoy = new Date();
        const diff = hoy.getTime() - fecha.getTime();
        const semanas = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
        const trimestre = semanas < 13 ? 'Primer trimestre' : semanas < 27 ? 'Segundo trimestre' : 'Tercer trimestre';
        setResultado({ fpp, semanas: Math.max(0, semanas), trimestre });
    };

    const formatDate = (d: Date) => d.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-pink-700 to-rose-800 py-8 px-4"><div className="max-w-3xl mx-auto"><Link href="/herramientas" className="text-pink-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link><h1 className="text-3xl md:text-4xl font-bold text-white">🤰 Fecha Probable de Parto</h1><p className="text-pink-100 mt-2">Regla de Naegele — calcula cuándo nacerá tu bebé</p></div></div>
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="mb-6"><label className="block text-sm font-bold text-gray-700 mb-2">Fecha de Última Regla (FUR)</label><input type="date" value={fur} onChange={e => setFur(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg text-gray-800" /><p className="text-xs text-gray-400 mt-1">Primer día de tu último periodo menstrual</p></div>
                    <button onClick={calcular} className="w-full bg-pink-700 hover:bg-pink-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">Calcular Fecha de Parto</button>
                    {resultado && (<div className="mt-8">
                        <div className="bg-pink-50 rounded-2xl p-6 text-center mb-6">
                            <p className="text-sm text-gray-600 mb-1">Tu fecha probable de parto</p>
                            <p className="text-3xl font-black text-pink-700 capitalize">{formatDate(resultado.fpp)}</p>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="bg-white rounded-xl p-3"><p className="text-xs text-gray-500">Semanas de embarazo</p><p className="text-2xl font-bold text-pink-600">{resultado.semanas}</p></div>
                                <div className="bg-white rounded-xl p-3"><p className="text-xs text-gray-500">Etapa</p><p className="text-lg font-bold text-pink-600">{resultado.trimestre}</p></div>
                            </div>
                            {resultado.semanas >= 0 && resultado.semanas <= 42 && (
                                <div className="mt-4"><div className="h-3 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all" style={{ width: `${Math.min((resultado.semanas / 40) * 100, 100)}%` }} /></div><p className="text-xs text-gray-500 mt-1">{Math.min(Math.round((resultado.semanas / 40) * 100), 100)}% completado</p></div>
                            )}
                        </div>
                        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"><h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Prenatales Recomendados</h3><div className="space-y-3">{[{ name: 'Perfil Prenatal (BHCg, Tipo de Sangre, Rh)', reason: 'Primer paso del control prenatal' }, { name: 'Perfil TORCH (Toxo, Rubéola, CMV, Herpes)', reason: 'Descarta infecciones que afectan al bebé' }, { name: 'Biometría Hemática Completa', reason: 'Detecta anemia del embarazo' }, { name: 'Glucosa en Ayunas', reason: 'Screening de diabetes gestacional' }, { name: 'Examen General de Orina', reason: 'Detecta infecciones urinarias e preeclampsia' }].map(s => (<div key={s.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm"><span className="text-green-600 mt-1">✓</span><div><p className="font-semibold text-gray-800 text-sm">{s.name}</p><p className="text-gray-500 text-xs">{s.reason}</p></div></div>))}</div><Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800">Ver Estudios →</Link></div>
                    </div>)}
                </div>
                <AdBanner variant="horizontal" className="mb-8" />
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"><button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"><span className="font-bold text-gray-900">📚 Fecha de parto — Información Científica</span><span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span></button>{showInfo && (<div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4"><p>La <strong>Regla de Naegele</strong> estima la fecha probable de parto (FPP) sumando 280 días (40 semanas) a la fecha del primer día de la última menstruación (FUR). Fue descrita por el obstetra alemán Franz Karl Naegele en 1830.</p><div className="bg-gray-50 rounded-xl p-4 text-center font-mono">FPP = FUR + 280 días</div><p>Solo el 4-5% de los bebés nacen exactamente en la fecha calculada. El rango normal de parto es entre la semana 37 y 42. La fecha se confirma con ultrasonido del primer trimestre.</p><h4 className="font-bold text-gray-900">Fuentes</h4><ul className="list-disc list-inside text-xs text-gray-500"><li>Naegele, F.K. (1830). Erfahrungen und Abhandlungen aus dem Gebiete der Geburtshülfe.</li><li>ACOG Committee Opinion No. 700. Methods for Estimating the Due Date.</li></ul><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800"><strong>⚠️ Aviso:</strong> Esta es una estimación. Confirma tu fecha de parto con tu ginecólogo mediante ultrasonido.</div></div>)}</div>
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
