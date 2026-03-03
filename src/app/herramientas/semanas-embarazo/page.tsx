'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function SemanasEmbarazoPage() {
    const [fur, setFur] = useState('');
    const [resultado, setResultado] = useState<{ semanas: number; dias: number; trimestre: string; estudios: string[] } | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        if (!fur) return;
        const fecha = new Date(fur);
        const hoy = new Date();
        const diff = hoy.getTime() - fecha.getTime();
        const totalDias = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (totalDias < 0) return;
        const semanas = Math.floor(totalDias / 7);
        const dias = totalDias % 7;
        let trimestre: string; let estudios: string[];
        if (semanas < 13) { trimestre = '1er Trimestre'; estudios = ['Perfil Prenatal completo', 'BHCg cuantitativa', 'Perfil TORCH', 'Tipo de Sangre y Rh', 'EGO']; }
        else if (semanas < 27) { trimestre = '2do Trimestre'; estudios = ['Curva de Tolerancia a la Glucosa', 'Biometría Hemática', 'EGO de control', 'Perfil Tiroideo']; }
        else { trimestre = '3er Trimestre'; estudios = ['Biometría Hemática', 'Pruebas de Coagulación', 'Cultivo Estreptococo B', 'Hepatitis B', 'VIH']; }
        setResultado({ semanas, dias, trimestre, estudios });
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-pink-600 to-fuchsia-700 py-8 px-4"><div className="max-w-3xl mx-auto"><Link href="/herramientas" className="text-pink-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link><h1 className="text-3xl md:text-4xl font-bold text-white">📅 Semanas de Embarazo</h1><p className="text-pink-100 mt-2">Calcula en qué semana y trimestre de embarazo te encuentras</p></div></div>
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="mb-6"><label className="block text-sm font-bold text-gray-700 mb-2">Fecha de Última Regla (FUR)</label><input type="date" value={fur} onChange={e => setFur(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none text-lg text-gray-800" /></div>
                    <button onClick={calcular} className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">Calcular Semanas</button>
                    {resultado && (<div className="mt-8">
                        <div className="bg-pink-50 rounded-2xl p-6 text-center mb-6">
                            <p className="text-sm text-gray-600 mb-1">Estás en la</p>
                            <p className="text-5xl font-black text-pink-700">{resultado.semanas}<span className="text-lg text-pink-500"> semanas</span> {resultado.dias > 0 && <span className="text-2xl text-pink-400">+ {resultado.dias} días</span>}</p>
                            <div className="mt-3 inline-block bg-pink-200 text-pink-800 font-bold px-4 py-1 rounded-full text-sm">{resultado.trimestre}</div>
                            <div className="mt-4"><div className="h-3 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full" style={{ width: `${Math.min((resultado.semanas / 40) * 100, 100)}%` }} /></div></div>
                        </div>
                        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"><h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios para {resultado.trimestre}</h3><p className="text-sm text-gray-600 mb-3">En tu etapa actual se recomiendan estos estudios:</p><div className="space-y-3">{resultado.estudios.map(s => (<div key={s} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm"><span className="text-green-600 mt-1">✓</span><p className="font-semibold text-gray-800 text-sm">{s}</p></div>))}</div><Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800">Ver Estudios →</Link></div>
                    </div>)}
                </div>
                
                <StudyCTA 
                    title={`Verifica la integridad fetal`} 
                    description={`Dependiendo del trimestre, sugerimos análisis de orina rutinarios para evitar infecciones, o un tamiz neonatal ampliado cuando el bebé nazca.`} 
                    actionText={`Estudios por Trimestre`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Estudios%20por%20Trimestre*`} 
                    type="estudio" 
                />
                <AdBanner variant="horizontal" className="mb-8" />
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"><button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"><span className="font-bold text-gray-900">📚 Control prenatal por trimestre — Información Científica</span><span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span></button>{showInfo && (<div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4"><p>El embarazo se divide en <strong>3 trimestres</strong>, cada uno con estudios de laboratorio específicos recomendados por las guías del ACOG y la NOM-007-SSA2-2016.</p><h4 className="font-bold text-gray-900">1er Trimestre (0-12 semanas)</h4><p>Confirmación del embarazo, detección de factores de riesgo, perfil TORCH y grupo sanguíneo.</p><h4 className="font-bold text-gray-900">2do Trimestre (13-26 semanas)</h4><p>Screening de diabetes gestacional (semana 24-28), control de hemoglobina y función tiroidea.</p><h4 className="font-bold text-gray-900">3er Trimestre (27-40 semanas)</h4><p>Preparación para el parto, coagulación, cultivo de Estreptococo B (semana 36), y repetición de serología.</p><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800"><strong>⚠️ Aviso:</strong> Sigue las indicaciones de tu ginecólogo. Cada embarazo es único y puede requerir estudios adicionales.</div></div>)}</div>
                
                <StudyCTA 
                    title={`Verifica la integridad fetal`} 
                    description={`Dependiendo del trimestre, sugerimos análisis de orina rutinarios para evitar infecciones, o un tamiz neonatal ampliado cuando el bebé nazca.`} 
                    actionText={`Estudios por Trimestre`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Estudios%20por%20Trimestre*`} 
                    type="estudio" 
                />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
