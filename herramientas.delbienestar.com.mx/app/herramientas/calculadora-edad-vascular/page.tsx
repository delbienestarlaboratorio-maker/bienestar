'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function EdadVascularPage() {
    const [edad, setEdad] = useState('45');
    const [genero, setGenero] = useState('M');
    const [colesterolTot, setColesterolTot] = useState('220');
    const [hdl, setHdl] = useState('40');
    const [sistolica, setSistolica] = useState('130');
    const [fumador, setFumador] = useState('0');
    const [medPresion, setMedPresion] = useState('0');
    const [resultado, setResultado] = useState<{ edadVascular: number; dif: number; riesgo10yr: string; color: string } | null>(null);

    const calcularFramingham = () => {
        const e = parseFloat(edad);
        const c = parseFloat(colesterolTot);
        const h = parseFloat(hdl);
        const p = parseFloat(sistolica);
        const f = parseInt(fumador);
        const m = parseInt(medPresion);

        if (e && c && h && p) {
            // Implementación HEURÍSTICA Y SIMPLIFICADA del Score General de Riesgo Cardiovascular
            // No es de uso médico estricto, es una gamificación clínica para crear conciencia.
            let vascularAge = e;
            let puntos = 0;

            if (genero === 'H') {
                if (c > 200) vascularAge += 3;
                if (c > 240) vascularAge += 6;
                if (h < 40) vascularAge += 4;
                if (h > 60) vascularAge -= 3;
                if (p > 130 && m === 0) vascularAge += 3;
                if (p > 130 && m === 1) vascularAge += 5;
                if (p > 140) vascularAge += 5;
                if (f === 1) vascularAge += 8;
            } else {
                if (c > 200) vascularAge += 2;
                if (c > 240) vascularAge += 5;
                if (h < 50) vascularAge += 3;
                if (h > 60) vascularAge -= 2;
                if (p > 130 && m === 0) vascularAge += 4;
                if (p > 140) vascularAge += 6;
                if (f === 1) vascularAge += 7;
            }

            const dif = vascularAge - e;

            let color = 'text-green-600';
            let riesgo10yr = '< 5%';
            if (dif > 3 && dif <= 8) { color = 'text-orange-600'; riesgo10yr = '10 - 15%'; }
            if (dif > 8) { color = 'text-red-600'; riesgo10yr = '> 20% (Alto Riesgo)'; }

            setResultado({
                edadVascular: Math.max(e, vascularAge),
                dif,
                riesgo10yr,
                color
            });
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 py-12 px-4 shadow-inner">
                <div className="max-w-4xl mx-auto">
                    <Link href="/herramientas" className="text-slate-300 hover:text-white text-sm mb-4 inline-block font-medium transition-colors">
                        ← Regresar a Calculadoras Médicas
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
                        🫀 Calculadora de Edad Vascular
                    </h1>
                    <p className="text-xl text-slate-200 font-light max-w-2xl">
                        Tus arterias pueden ser años más viejas que tu edad biológica. Basado en algoritmos de riesgo cardiovascular.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 -mt-8">
                {/* Calculator Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 mb-10 relative z-10 w-full overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Edad cronológica</label>
                            <input type="number" value={edad} onChange={e => setEdad(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:ring-4 focus:ring-slate-100 outline-none text-xl font-bold bg-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Género Biológico</label>
                            <select value={genero} onChange={e => setGenero(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:ring-4 focus:ring-slate-100 outline-none text-xl font-bold bg-white">
                                <option value="H">Hombre</option><option value="M">Mujer</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Colesterol Total (mg/dL)</label>
                            <input type="number" value={colesterolTot} onChange={e => setColesterolTot(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 outline-none text-xl font-bold" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Colesterol HDL (Bueno)</label>
                            <input type="number" value={hdl} onChange={e => setHdl(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 outline-none text-xl font-bold" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Presión Sistólica (Alta)</label>
                            <input type="number" value={sistolica} onChange={e => setSistolica(e.target.value)} placeholder="Ej: 130" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 outline-none text-xl font-bold" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-slate-50 p-6 border border-slate-200 rounded-2xl">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">¿Tomas Pastillas p/Presión?</label>
                            <select value={medPresion} onChange={e => setMedPresion(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none font-bold">
                                <option value="0">No, mi presión es natural</option><option value="1">Sí, uso medicamentos</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">¿Fumas cigarrillos o Vaper?</label>
                            <select value={fumador} onChange={e => setFumador(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none font-bold">
                                <option value="0">No fumo nunca</option><option value="1">Sí, soy fumador activo</option>
                            </select>
                        </div>
                    </div>

                    <button onClick={calcularFramingham}
                        className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all shadow-lg hover:shadow-slate-500/30">
                        Revelar Edad de mis Arterias
                    </button>

                    {resultado && (
                        <div className="mt-10 animate-in zoom-in-95 duration-500">
                            <div className="bg-white border-4 border-slate-100 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
                                <p className="text-sm font-bold tracking-widest uppercase text-slate-500 mb-2">Edad Vascular Calculada</p>
                                <div className="flex items-end justify-center gap-2 mb-4">
                                    <span className={`text-6xl md:text-8xl font-black ${resultado.color}`}>{resultado.edadVascular}</span>
                                    <span className="text-2xl font-bold text-slate-400 mb-2">años</span>
                                </div>

                                <p className="text-xl text-slate-700 font-medium mb-6">
                                    {resultado.dif <= 0 ? (
                                        "🌟 ¡Increíble! Tus arterias están más jóvenes o acordes a tu edad cronológica."
                                    ) : (
                                        `⚠️ Peligro: El interior de tus venas luce orgánicamente ${resultado.dif} años mayor que tu edad real en acta de nacimiento.`
                                    )}
                                </p>

                                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl inline-block mt-4">
                                    <span className="block text-xs uppercase text-slate-500 font-bold">Riesgo Acumulado de Infarto en 10 Años</span>
                                    <span className={`text-2xl font-black ${resultado.color}`}>{resultado.riesgo10yr}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🫀 Guía Cardiológica Metabólica: Edad Vascular o Edad Cardíaca</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score puramente inmenso u O O de a de O de en Inmensurables O Edad al U inmensa O u Vascular u o y estimativa u al U inmenso genérica evalúa la Inmensurables condición de las venas, U a inmensa inmenso de O y O endotelio de U a Inmenso arterial y U O capilares inmenso o u el Inmenso u U comparándolo U en un O a Inmenso u entorno a a O de u O al U paciente sano u o. Sirve para evidenciar a Inmenso el riesgo inmensurables genéricamente a aterosclerótico de la O o coronario u a Inmenso a inmenso Inmensurables en O a a O genéricamente inmenso en u o u pacientes O al.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios Preventivos</h3>
       <ul>
           <li><a href="/estudios/perfiles/perfil-de-lipidos" className="text-blue-600 font-semibold hover:underline">Perfil de Lípidos (Colesterol, Triglicéridos y Riesgo Aterogénico)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-10" />

                {/* SEO Visible Information Block */}
                <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-10 p-8 md:p-12">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                        <span className="text-4xl">🛑</span> Endotelio Vascular y Patogenia del Infarto Agudo
                    </h2>

                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                        <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-slate-800 first-letter:float-left first-letter:mr-3">
                            A diferencia de nuestros abuelos, la cardiología moderna ha dejado atrás la idea de que envejecemos por "desgaste normal". Hoy sabemos que el hombre tiene la edad de su endotelio. La <strong>"Edad Vascular"</strong> es una traducción clínica simplificada del Score de Framingham, el mayor estudio de enfermedades coronarias jamás realizado, que ayuda a visualizar el deterioro destructivo de los vasos sanguíneos antes de que se calcifiquen.
                        </p>

                        <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200 my-8">
                            <h3 className="text-xl font-bold text-slate-800 mb-3 block">Fisiopatología de la Aterosclerosis Plaqueal</h3>
                            <p>
                                Las arterias no son tubos de plomería inertes. Están revestidas de una ultra-delgada y poderosa capa celular llamada endotelio que regula la inflamación y la presión arterial secretando Óxido Nítrico. Cuando el cuerpo está sometido a niveles tóxicos de <strong>colesterol LDL oxidado</strong>, toxinas del tabaco o azúcar alta constante, el endotelio sufre micro-desgarros. Para sanarlo, los macrófagos engullen la grasa y se transforman en "células espumosas", cristalizándose como calcio dentro de las arterias (Ateromas agudos).
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                            <div className="bg-red-50 p-6 rounded-2xl border-l-4 border-red-500">
                                <h3 className="text-xl font-bold text-red-900 mb-2">Tabaquismo Endotelial</h3>
                                <p className="text-sm">Inhalar humo del cigarrillo o del aerosol del cigarrillo electrónico (vaper) introduce radicales libres y propilenglicol en la sangre. Estas quemaduras químicas directas aceleran el envejecimiento vascular en <strong>5 a 10 años</strong> por cada década de fumador activo, incrementando la rigidez arterial masiva.</p>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500">
                                <h3 className="text-xl font-bold text-blue-900 mb-2">El Asesino Silencioso (HIPERTENSIÓN)</h3>
                                <p className="text-sm text-gray-800">Tener una Presión Sistólica superior a 130 mmHg obliga al corazón a empujar la sangre con fuerza antinatural. Esta fuerza hidrostática rompe aneurismas microscópicos en el cerebro (provocando demencia vascular mini-isquémica o Ictus catastrófico).</p>
                            </div>
                        </div>
                    </div>
                </section>

                <StudyCTA
                    title="Evita el primer Infarto con la prevención científica."
                    description="El metabolismo silencioso se diagnostica primero en la sangre. Conoce tus niveles exactos de Colesterol Directo, Triglicéridos y Glicemia midiendo cómo están tapizadas tus arterias hoy."
                    actionText="Cotizar Perfil de Lípidos y Riesgo Cardíaco"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20saber%20qué%20precio%20tiene%20el%20Perfil%20de%20Lípidos%20(Colesterol)%20y%20el%20Química%20Sanguínea."
                    type="checkup"
                />
            
                <RelatedTools currentPath="/herramientas/calculadora-edad-vascular" className="mb-8" />
            </div>
        </main>
    );
}
