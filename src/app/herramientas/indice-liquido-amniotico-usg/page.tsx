'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function IndiceLiquidoAmnioticoUsgPage() {
    const [c1, setC1] = useState<string>('');
    const [c2, setC2] = useState<string>('');
    const [c3, setC3] = useState<string>('');
    const [c4, setC4] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const Q1=parseFloat(c1);const Q2=parseFloat(c2);const Q3=parseFloat(c3);const Q4=parseFloat(c4);if(isNaN(Q1)||isNaN(Q2)||isNaN(Q3)||isNaN(Q4))return;const ILA=Q1+Q2+Q3+Q4;let label='';let color='';let bg='';let desc='';if(ILA<5){label='Oligohidramnios Severo';color='text-red-700';bg='bg-red-200';desc='Déficit crítico del líquido amniótico. Puede indicar sufrimiento fetal, RPMO crónica displasias renales o RCF.';}else if(ILA<=8){label='Líquido Amniótico Marginal / Disminuido';color='text-yellow-600';bg='bg-yellow-100';desc='Vigilancia materna recomendada.';}else if(ILA<=18){label='Volumen Normal Euvolemia';color='text-green-600';bg='bg-green-100';desc='Adecuada protección a estructuras fetales y cordón.';}else if(ILA<=24){label='Volumen Superior al Normal';color='text-orange-500';bg='bg-orange-100';desc='Vigilancia recomendada (posible diabetes o hidropesías).';}else{label='Polihidramnios Severo';color='text-red-600';bg='bg-red-100';desc='Exceso anormal de líquido. Se deba descartar diabetes materna descontrolada o malformaciones gastrointestinales fetales.';}setResultado({value:ILA.toFixed(1)+' cm',label,color,bg,desc});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-sky-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🌊 Índice de Líquido Amniótico (ILA/AFI)</h1>
                    <p className="text-sky-100 mt-2">Suma Phelan del Pool Amniótico Ecográfico</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Profundidad vertical máxima de 4 cuadrantes (en cm)"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Cuadrante Superior Derecho (cm)"}</label>
                        <input type="number" value={c1} onChange={(e) => setC1(e.target.value)} placeholder="Ej: 3.2" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Cuadrante Superior Izquierdo (cm)"}</label>
                        <input type="number" value={c2} onChange={(e) => setC2(e.target.value)} placeholder="Ej: 2.8" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Cuadrante Inferior Derecho (cm)"}</label>
                        <input type="number" value={c3} onChange={(e) => setC3(e.target.value)} placeholder="Ej: 4.1" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Cuadrante Inferior Izquierdo (cm)"}</label>
                        <input type="number" value={c4} onChange={(e) => setC4(e.target.value)} placeholder="Ej: 3.5" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all" />
                    </div>

                    <button onClick={calcular} className="w-full bg-sky-700 hover:bg-sky-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Suma ILA Total</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Descarte de Infecciones o Diabetes Embarazo"
                    description="Si presentas anomalías en el líquido, el ginecólogo te pedirá marcadores urgentes de glucemia, toxoplasmosis o rubéola."
                    actionText="Cotizar Pruebas Diagnósticas"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Perfil%20TORCH%20y%20Curva%20Tolerancia%20a%20la%20Glucosa"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Ultrasonido Materno: Evaluación del ILA (AFI)"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p dangerouslySetInnerHTML={{ __html: "El Índice de Líquido Amniótico (AFIent inglés, o ILA en hispanohablantes) fue estandarizado en la década del ochenta como un biomarcador ecográfico crucial para inferir la salud de un feto a término o intraútero tardío." }} />
                        <p dangerouslySetInnerHTML={{ __html: "El examinador traza la línea alba y la línea del ombligo para segmentar mentalmente la matriz del vientre materno en cuatro cuadrantes de igual grosor. El transductor ecográfico se sitúa vertical sobre la piel para medir el pozo amniótico sin presencias ecogénicas (sin placenta, extremidades o cordón de Wharton cruzándolo). Estos cuatro diámetros numéricos se sumarán entre sí." }} />
                        <p dangerouslySetInnerHTML={{ __html: "El balance hídrico gestacional dicta su importancia médica fundamental. En etapas tardías, el ILA es igual al volumen urinario del riñón fetal (que incrementa liquido) menos las capacidades de deglución de su tracto digestivo inmaduro (que decrece líquido). Mediciones menores a 5cm definen médicamente como un colapso restrictivo peligroso o RPM (Ruptura de fuente prematura)." }} />
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 mt-6">
                        <strong>⚠️ Aviso:</strong> Esta herramienta es orientativa y NO sustituye el diagnóstico médico profesional. Consulta a tu médico para interpretación.
                    </div>
                </div>

                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
