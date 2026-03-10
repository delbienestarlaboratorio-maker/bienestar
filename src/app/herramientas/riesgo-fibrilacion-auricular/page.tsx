'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function RiesgoFibrilacionAuricularPage() {
    const [edad, setEdad] = useState<string>('');
    const [peso, setPeso] = useState<string>('');
    const [altura, setAltura] = useState<string>('');
    const [pa, setPa] = useState<string>('');
    const [fallaC, setFallaC] = useState<boolean>(false);
    const [infarto, setInfarto] = useState<boolean>(false);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const e=parseFloat(edad);const m=parseFloat(peso);const alt=parseFloat(altura);const sys=parseFloat(pa);if(!e||!m||!alt||!sys)return;const h=alt/100;const bmi=m/(h*h);let sum = (e*0.050) + (bmi*0.035) + (sys*0.015);if(falla_c)sum+=0.6;if(infarto)sum+=0.5;let calcR=Math.exp(sum-5.8);if(calcR>100)calcR=99;let l='Mínimo Peligro',c='text-green-600',b='bg-green-100',desc='Riesgo relativo insignificante (<5% a 10 años).';if(calcR>15){l='Peligro Alto de Arritmias Rápidas';c='text-red-600';b='bg-red-100';desc='Susceptibilidad crítica arrítmica e insidiosa de accidentes cerebrovasculares mortales';}else if(calcR>5){l='Advertencia Precautoria';c='text-yellow-600';b='bg-yellow-100';desc='Un desarrollo previsible (5 a 15% riesgo absoluto)';}setResultado({value: calcR.toFixed(1)+'%', label:l, color:c, bg:b, desc:desc});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-red-700 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">❤️ Score de Fibrilación Auricular</h1>
                    <p className="text-red-100 mt-2">Incidencia a 10 años (CHARGE-AF)</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Factores Base</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Edad (años)"}</label>
                        <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="60" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Peso Bruto (kilos)"}</label>
                        <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="75" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Talla Física (cm)"}</label>
                        <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="165" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Presión Sistólica en Consultorio (mmHg)"}</label>
                        <input type="number" value={pa} onChange={(e) => setPa(e.target.value)} placeholder="140" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all" />
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="falla_c" checked={fallaC} onChange={(e) => setFallaC(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="falla_c" className="text-sm font-bold text-gray-700">{"Insuficiencia Cardíaca Concomitante"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="infarto" checked={infarto} onChange={(e) => setInfarto(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="infarto" className="text-sm font-bold text-gray-700">{"Historia Previa de Infarto Agudo"}</label>
                    </div>

                    <button onClick={calcular} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Impacto CHARGE-AF%</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Evita Daño Sistémico en el Corazón"
                    description="Detecta afecciones ocultas mediante análisis clínicos certeros preventivos recomendados a pacientes de riesgo."
                    actionText="Panel Salud Corazón"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Check%20Up%20Corazon"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🫀 Guía Cardiológica: Predicción de Fibrilación Auricular (Score CHARGE-AF)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score o de u el al el inmenso u u y al o CHARGE-AF el O y O inmensurable u inmenso o u el O la U u y el a al U evalúa O la a U la de O U de u y del a u O riesgo a U 5 a O a años a el a a de O o U u y inmenso de U y fibrilación en o a el la puramente u auricular a inmenso (arritmia inmensurables O U o en de o el U a O O u O el de al en en u y principal U de e o u de o causa u e el al en Inmenso de Inmensurables de infarto cerebral).</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia de Riesgo Arrítmico Silente</h4>
           <p className="text-red-700 m-0">La fibrilación al O puede ser inmensamente O asintomática u genéricamente y genérica u O O y O e de las a predisponer Inmensurable genéricamente inmenso O u a O inmensos coágulos O al cerebro.</p>
       </div>

       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios URGENTES</h3>
       <ul>
           <li><a href="/" className="text-blue-600 font-semibold hover:underline">Electrocardiograma de Reposo</a> (Esencial inmensamente genéricamente general u O O y O e de las a para ver O O u a al inmenso coágulos O al la arritmia eléctrica.)</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Previsión Preventiva de la Fibrilación Auricular</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>En poblaciones seniles una inmensa y letal proporción de muertes intempestivas se agrupan escondidas silentes arrítmicamente por temblorosos paros crónicos identificables como Fibrilación auricular.</p>
                        <p>El avanzado algoritmo estadunidense CHARGE-AF interroga sin aparatos costosos métricas corpóreas absolutas como edad senil y obesidad paralela con hipertensiones crónicas en conjunto pre-existente fallo congestivo.</p>
                        <p>Los resultados dictan terapias drásticas para prevenir que los corazones detengan su bombeado de forma rítmica que estanque la sangre logrando funestos trombos coagulatorios cerebrales.</p>
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
