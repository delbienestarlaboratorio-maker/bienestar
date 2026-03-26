'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function RiesgoCardiovascularPage() {
    const [sexo, setSexo] = useState<'hombre' | 'mujer'>('hombre');
    const [edad, setEdad] = useState('');
    const [colTotal, setColTotal] = useState('');
    const [hdl, setHdl] = useState('');
    const [sistolica, setSistolica] = useState('');
    const [tratamientoHTA, setTratamientoHTA] = useState(false);
    const [fumador, setFumador] = useState(false);
    const [diabetico, setDiabetico] = useState(false);
    const [resultado, setResultado] = useState<number | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => {
        const e = parseFloat(edad);
        const ct = parseFloat(colTotal);
        const h = parseFloat(hdl);
        const s = parseFloat(sistolica);
        if (e < 30 || e > 79 || ct <= 0 || h <= 0 || s <= 0) return;

        // Simplified Framingham Risk Score estimation
        let score = 0;
        // Age points
        if (sexo === 'hombre') {
            if (e >= 30 && e <= 34) score += 0;
            else if (e <= 39) score += 2;
            else if (e <= 44) score += 5;
            else if (e <= 49) score += 7;
            else if (e <= 54) score += 8;
            else if (e <= 59) score += 10;
            else if (e <= 64) score += 11;
            else if (e <= 69) score += 12;
            else score += 14;
        } else {
            if (e >= 30 && e <= 34) score += 0;
            else if (e <= 39) score += 2;
            else if (e <= 44) score += 4;
            else if (e <= 49) score += 5;
            else if (e <= 54) score += 7;
            else if (e <= 59) score += 8;
            else if (e <= 64) score += 9;
            else if (e <= 69) score += 10;
            else score += 11;
        }
        // Cholesterol
        if (ct >= 280) score += 3;
        else if (ct >= 240) score += 2;
        else if (ct >= 200) score += 1;
        // HDL
        if (h < 35) score += 2;
        else if (h < 45) score += 1;
        else if (h >= 60) score -= 1;
        // Blood Pressure
        if (s >= 160) score += (tratamientoHTA ? 3 : 2);
        else if (s >= 140) score += (tratamientoHTA ? 2 : 1);
        else if (s >= 130) score += (tratamientoHTA ? 1 : 0);
        // Smoking
        if (fumador) score += 3;
        // Diabetes
        if (diabetico) score += (sexo === 'hombre' ? 2 : 4);

        // Convert score to approximate percent risk
        let risk: number;
        if (score <= 0) risk = 1;
        else if (score <= 4) risk = 2;
        else if (score <= 6) risk = 3;
        else if (score <= 8) risk = 5;
        else if (score <= 10) risk = 8;
        else if (score <= 12) risk = 11;
        else if (score <= 14) risk = 15;
        else if (score <= 16) risk = 20;
        else if (score <= 18) risk = 25;
        else risk = 30;

        setResultado(risk);
    };

    const getRiesgo = (r: number) => {
        if (r < 5) return { label: 'Bajo', color: 'text-green-600', bg: 'bg-green-100' };
        if (r < 10) return { label: 'Moderado', color: 'text-yellow-600', bg: 'bg-yellow-100' };
        if (r < 20) return { label: 'Intermedio', color: 'text-orange-600', bg: 'bg-orange-100' };
        return { label: 'Alto', color: 'text-red-600', bg: 'bg-red-100' };
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-red-800 to-rose-900 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🫀 Riesgo Cardiovascular</h1>
                    <p className="text-red-100 mt-2">Score de Framingham — riesgo de evento cardiovascular a 10 años</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Sexo</label>
                        <div className="flex gap-3">
                            <button onClick={() => setSexo('hombre')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${sexo === 'hombre' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>👨 Hombre</button>
                            <button onClick={() => setSexo('mujer')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${sexo === 'mujer' ? 'bg-pink-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>👩 Mujer</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Edad (30-79 años)</label>
                            <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="Ej: 50"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Colesterol Total (mg/dL)</label>
                            <input type="number" value={colTotal} onChange={(e) => setColTotal(e.target.value)} placeholder="Ej: 220"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Colesterol HDL (mg/dL)</label>
                            <input type="number" value={hdl} onChange={(e) => setHdl(e.target.value)} placeholder="Ej: 50"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none text-lg text-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Presión Sistólica (mmHg)</label>
                            <input type="number" value={sistolica} onChange={(e) => setSistolica(e.target.value)} placeholder="Ej: 130"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none text-lg text-gray-800" />
                        </div>
                    </div>

                    <div className="space-y-3 mb-6">
                        {[
                            { label: '¿Toma medicamento para presión arterial?', checked: tratamientoHTA, set: setTratamientoHTA },
                            { label: '¿Fuma actualmente?', checked: fumador, set: setFumador },
                            { label: '¿Tiene diabetes?', checked: diabetico, set: setDiabetico },
                        ].map((item) => (
                            <label key={item.label} className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" checked={item.checked} onChange={(e) => item.set(e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                                <span className="text-gray-700 text-sm">{item.label}</span>
                            </label>
                        ))}
                    </div>

                    <button onClick={calcular}
                        className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]">
                        Calcular Riesgo Cardiovascular
                    </button>

                    {resultado !== null && (() => {
                        const r = getRiesgo(resultado);
                        return (
                            <div className="mt-8">
                                <div className={`${r.bg} rounded-2xl p-6 text-center mb-6`}>
                                    <p className="text-sm text-gray-600 mb-1">Riesgo cardiovascular a 10 años</p>
                                    <p className={`text-5xl font-black ${r.color}`}>{resultado}%</p>
                                    <p className={`text-xl font-bold ${r.color} mt-1`}>Riesgo {r.label}</p>
                                </div>

                                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                                    <h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Perfil de Lípidos completo', reason: 'Colesterol total, HDL, LDL, triglicéridos y VLDL' },
                                            { name: 'PCR Ultrasensible', reason: 'Marcador de inflamación y riesgo cardiovascular' },
                                            { name: 'Homocisteína', reason: 'Factor de riesgo independiente para enfermedad cardiovascular' },
                                            { name: 'Hemoglobina Glicosilada (HbA1c)', reason: 'Descarta diabetes como factor de riesgo adicional' },
                                            { name: 'Electrocardiograma', reason: 'Evaluación directa de la función cardíaca' },
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
                        );
                    })()}
                </div>

                
                <StudyCTA 
                    title={`Protege tu corazón a tiempo`} 
                    description={`El riesgo cardiovascular no avisa con dolor. Un Electrocardiograma y un Perfil de Lípidos Completo son los estudios estándar de oro para prevenir paros cardíacos silentes.`} 
                    actionText={`Cotizar Check-Up Cardiológico`}
                    link={`/paquetes`} 
                    type="checkup" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🫀 Guía Médica Profiláctica: Score SCORE de Riesgo Cardiovascular Europeo</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El test U o a U y Score O de u el al el inmenso u u y Europeo el O y O inmensurable u inmenso o u el O la U u y al U evalúa O la a U la de O U de u y del a u O riesgo a U mortal O a o a el a a de O por u y inmenso de O enfermedad en o a el la puramente u cardiovascular a inmenso a Inmenso O u de 10 o años al en U de e o Inmenso de Inmensurables u.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios Severos Críticos</h3>
       <ul>
           <li><a href="/estudios/perfiles/perfil-de-lipidos" className="text-blue-600 font-semibold hover:underline">Perfil de Lípidos Completo</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    <button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50">
                        <span className="font-bold text-gray-900">📚 Score de Framingham — Información Científica</span>
                        <span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {showInfo && (
                        <div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4">
                            <p>El <strong>Score de Riesgo de Framingham</strong> es uno de los algoritmos más utilizados mundialmente para estimar el riesgo de desarrollar una enfermedad cardiovascular (infarto, ACV) en los próximos 10 años. Fue desarrollado a partir del famoso Estudio del Corazón de Framingham iniciado en 1948.</p>
                            <h4 className="font-bold text-gray-900">Factores evaluados</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li><strong>Edad:</strong> El riesgo aumenta con la edad</li>
                                <li><strong>Colesterol total y HDL:</strong> Ratio importante para salud cardiovascular</li>
                                <li><strong>Presión arterial:</strong> La hipertensión es el factor de riesgo #1</li>
                                <li><strong>Tabaquismo:</strong> Duplica el riesgo cardiovascular</li>
                                <li><strong>Diabetes:</strong> Factor de riesgo independiente mayor</li>
                            </ul>
                            <h4 className="font-bold text-gray-900">Interpretación</h4>
                            <table className="w-full text-sm">
                                <thead><tr className="bg-gray-100"><th className="p-2">Riesgo a 10 años</th><th className="p-2">Categoría</th></tr></thead>
                                <tbody>
                                    <tr className="border-b"><td className="p-2 text-center">&lt; 5%</td><td className="p-2 text-center text-green-600 font-bold">Bajo</td></tr>
                                    <tr className="border-b"><td className="p-2 text-center">5-10%</td><td className="p-2 text-center text-yellow-600 font-bold">Moderado</td></tr>
                                    <tr className="border-b"><td className="p-2 text-center">10-20%</td><td className="p-2 text-center text-orange-600 font-bold">Intermedio</td></tr>
                                    <tr><td className="p-2 text-center">&gt; 20%</td><td className="p-2 text-center text-red-600 font-bold">Alto</td></tr>
                                </tbody>
                            </table>
                            <h4 className="font-bold text-gray-900">Fuentes científicas</h4>
                            <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
                                <li>D&apos;Agostino, R.B. et al. (2008). General cardiovascular risk profile for use in primary care. Circulation.</li>
                                <li>Wilson, P.W. et al. (1998). Prediction of coronary heart disease using risk factor categories. Circulation.</li>
                            </ul>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
                                <strong>⚠️ Aviso:</strong> Esta es una estimación simplificada. Para una evaluación precisa del riesgo cardiovascular, consulta a tu cardiólogo y realiza los estudios recomendados.
                            </div>
                        </div>
                    )}
                </div>

                
                <StudyCTA 
                    title={`Protege tu corazón a tiempo`} 
                    description={`El riesgo cardiovascular no avisa con dolor. Un Electrocardiograma y un Perfil de Lípidos Completo son los estudios estándar de oro para prevenir paros cardíacos silentes.`} 
                    actionText={`Cotizar Check-Up Cardiológico`}
                    link={`/paquetes`} 
                    type="checkup" 
                />
                
                <RelatedTools currentPath="/herramientas/riesgo-cardiovascular" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
