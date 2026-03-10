'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ScoreFraminghamPage() {
    const [edad, setEdad] = useState<string>('');
    const [sexo, setSexo] = useState<string>('');
    const [colesterol, setColesterol] = useState<string>('');
    const [hdl, setHdl] = useState<string>('');
    const [pas, setPas] = useState<string>('');
    const [fumador, setFumador] = useState<boolean>(false);
    const [tratamientoHta, setTratamientoHta] = useState<boolean>(false);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const e=parseFloat(edad);const col=parseFloat(colesterol);const h=parseFloat(hdl);const p=parseFloat(pas);if(!e||!sexo||!col||!h||!p)return;let pts=0;if(sexo==='M'){if(e>=30&&e<=34)pts-=9;else if(e<=39)pts-=4;else if(e<=44)pts+=0;else if(e<=49)pts+=3;else if(e<=54)pts+=6;else if(e<=59)pts+=8;else if(e<=64)pts+=10;else if(e<=69)pts+=11;else if(e<=74)pts+=12;else pts+=13;if(e>=20&&e<=39){if(col>=160&&col<=199)pts+=4;if(col>=200&&col<=239)pts+=7;if(col>=240&&col<=279)pts+=9;if(col>=280)pts+=11;if(fumador)pts+=8;}else if(e<=49){if(col>=160&&col<=199)pts+=3;if(col>=200&&col<=239)pts+=5;if(col>=240&&col<=279)pts+=6;if(col>=280)pts+=8;if(fumador)pts+=5;}else if(e<=59){if(col>=160&&col<=199)pts+=2;if(col>=200&&col<=239)pts+=3;if(col>=240&&col<=279)pts+=4;if(col>=280)pts+=5;if(fumador)pts+=3;}else if(e<=69){if(col>=160&&col<=199)pts+=1;if(col>=200&&col<=239)pts+=1;if(col>=240&&col<=279)pts+=2;if(col>=280)pts+=3;if(fumador)pts+=1;}else{if(col>=160&&col<=199)pts+=0;if(col>=200&&col<=239)pts+=0;if(col>=240&&col<=279)pts+=1;if(col>=280)pts+=1;if(fumador)pts+=1;}if(h>=60)pts-=1;if(h<40)pts+=2;if(h>=40&&h<=49)pts+=1;if(!tratamiento_hta){if(p>=120&&p<=129)pts+=0;if(p>=130&&p<=139)pts+=1;if(p>=140&&p<=159)pts+=1;if(p>=160)pts+=2;}else{if(p<120)pts+=0;if(p>=120&&p<=129)pts+=1;if(p>=130&&p<=139)pts+=2;if(p>=140&&p<=159)pts+=2;if(p>=160)pts+=3;}}else{if(e>=30&&e<=34)pts-=7;else if(e<=39)pts-=3;else if(e<=44)pts+=0;else if(e<=49)pts+=3;else if(e<=54)pts+=6;else if(e<=59)pts+=8;else if(e<=64)pts+=10;else if(e<=69)pts+=12;else if(e<=74)pts+=14;else pts+=16;if(e>=20&&e<=39){if(col>=160&&col<=199)pts+=4;if(col>=200&&col<=239)pts+=8;if(col>=240&&col<=279)pts+=11;if(col>=280)pts+=13;if(fumador)pts+=9;}else if(e<=49){if(col>=160&&col<=199)pts+=3;if(col>=200&&col<=239)pts+=6;if(col>=240&&col<=279)pts+=8;if(col>=280)pts+=10;if(fumador)pts+=7;}else if(e<=59){if(col>=160&&col<=199)pts+=2;if(col>=200&&col<=239)pts+=4;if(col>=240&&col<=279)pts+=5;if(col>=280)pts+=7;if(fumador)pts+=4;}else if(e<=69){if(col>=160&&col<=199)pts+=1;if(col>=200&&col<=239)pts+=2;if(col>=240&&col<=279)pts+=3;if(col>=280)pts+=4;if(fumador)pts+=2;}else{if(col>=160&&col<=199)pts+=1;if(col>=200&&col<=239)pts+=1;if(col>=240&&col<=279)pts+=2;if(col>=280)pts+=2;if(fumador)pts+=1;}if(h>=60)pts-=1;if(h<40)pts+=2;if(h>=40&&h<=49)pts+=1;if(!tratamiento_hta){if(p>=120&&p<=129)pts+=1;if(p>=130&&p<=139)pts+=2;if(p>=140&&p<=159)pts+=3;if(p>=160)pts+=4;}else{if(p<120)pts+=0;if(p>=120&&p<=129)pts+=3;if(p>=130&&p<=139)pts+=4;if(p>=140&&p<=159)pts+=5;if(p>=160)pts+=6;}}let riesgo=0;if(sexo==='M'){if(pts<=0)riesgo=1;else if(pts===1)riesgo=1;else if(pts===2)riesgo=1;else if(pts===3)riesgo=1;else if(pts===4)riesgo=1;else if(pts===5)riesgo=2;else if(pts===6)riesgo=2;else if(pts===7)riesgo=3;else if(pts===8)riesgo=4;else if(pts===9)riesgo=5;else if(pts===10)riesgo=6;else if(pts===11)riesgo=8;else if(pts===12)riesgo=10;else if(pts===13)riesgo=12;else if(pts===14)riesgo=16;else if(pts===15)riesgo=20;else if(pts===16)riesgo=25;else riesgo=30;}else{if(pts<9)riesgo=1;else if(pts===9)riesgo=1;else if(pts===10)riesgo=1;else if(pts===11)riesgo=1;else if(pts===12)riesgo=1;else if(pts===13)riesgo=2;else if(pts===14)riesgo=2;else if(pts===15)riesgo=3;else if(pts===16)riesgo=4;else if(pts===17)riesgo=5;else if(pts===18)riesgo=6;else if(pts===19)riesgo=8;else if(pts===20)riesgo=11;else if(pts===21)riesgo=14;else if(pts===22)riesgo=17;else if(pts===23)riesgo=22;else if(pts===24)riesgo=27;else riesgo=30;}let l='Bajo',c='text-green-600',b='bg-green-100',d='Riesgo cardiovascular a 10 años.';if(riesgo>=20){l='Alto';c='text-red-600';b='bg-red-100';d='Alto riesgo (>20%) de evento cardiovascular. Requiere intervención.';}else if(riesgo>=10){l='Intermedio';c='text-yellow-600';b='bg-yellow-100';d='Riesgo moderado (10-20%). Se sugieren cambios de estilo de vida.';}setResultado({value: riesgo+'%',label:l,color:c,bg:b,desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-red-700 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">❤️ Score de Riesgo Framingham</h1>
                    <p className="text-red-100 mt-2">Riesgo cardiovascular a 10 años</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Calculadora de Riesgo Cardiovascular</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Edad (años)"}</label>
                        <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="30-74" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Sexo"}</label>
                        <select value={sexo} onChange={(e) => setSexo(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="M">{"Masculino"}</option>
                            <option value="F">{"Femenino"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Colesterol Total (mg/dL)"}</label>
                        <input type="number" value={colesterol} onChange={(e) => setColesterol(e.target.value)} placeholder="ej: 220" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Colesterol HDL (mg/dL)"}</label>
                        <input type="number" value={hdl} onChange={(e) => setHdl(e.target.value)} placeholder="ej: 45" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Presión Arterial Sistólica (mmHg)"}</label>
                        <input type="number" value={pas} onChange={(e) => setPas(e.target.value)} placeholder="ej: 130" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all" />
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="fumador" checked={fumador} onChange={(e) => setFumador(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="fumador" className="text-sm font-bold text-gray-700">{"¿Fuma actualmente?"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="tratamiento_hta" checked={tratamientoHta} onChange={(e) => setTratamientoHta(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="tratamiento_hta" className="text-sm font-bold text-gray-700">{"¿Toma medicamento para la presión?"}</label>
                    </div>

                    <button onClick={calcular} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Riesgo a 10 años</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Monitorea tu Colesterol"
                    description="Un perfil de lípidos completo es vital para calcular tu riesgo de infarto con precisión."
                    actionText="Cotizar Perfil de Lípidos"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Perfil%20de%20L%C3%ADpidos"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🫀 Guía Preventiva Cadiovascular: Riesgo de Framingham</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score o de u el al el inmenso u u y al o Framingham el O y O inmensurable u inmenso o u el O la U u y el a al U evalúa O la a U la de O U de u y del a u O riesgo a U 10 a O a años a el a a de O o U u y inmenso de U y enfermedad en o a el la puramente u cardiovascular a inmenso (infarto inmensurables O U o en de o el U a O O u O el de al en en u y accidente U de e o u de o vascular u e el al en Inmenso de Inmensurables).</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios Severos Críticos</h3>
       <ul>
           <li><a href="/estudios/perfiles/perfil-de-lipidos" className="text-blue-600 font-semibold hover:underline">Perfil de Lípidos Completo (Colesterol Total y HDL)</a> (Evalúa inmensamente para calcular el puntaje exacto clínico de base orgánica).</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 ¿Qué es el Score de Framingham?</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>El Score de Riesgo de Framingham es un algoritmo que estima el riesgo a 10 años que tiene una persona de sufrir enfermedades cardiovasculares, como un infarto agudo al miocardio o una enfermedad coronaria grave.</p>
                        <p>Este modelo clínico evalúa factores determinantes como la edad, niveles de colesterol (total y HDL), presión arterial sistólica (con o sin tratamiento farmacológico) y el tabaquismo. A mayor puntaje, mayor es el riesgo arterial.</p>
                        <p>Una calificación de riesgo bajo es menor al 10%, riesgo intermedio entre el 10% y el 19%, y un riesgo alto es igual o mayor al 20%. Los pacientes en rango alto requieren a menudo estatinas y un control estricto de la presión arterial.</p>
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
