'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ClasificacionChildPughPage() {
    const [encefalopatia, setEncefalopatia] = useState<string>('');
    const [ascitis, setAscitis] = useState<string>('');
    const [bilirrubina, setBilirrubina] = useState<string>('');
    const [albumina, setAlbumina] = useState<string>('');
    const [inr, setInr] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const ence=parseInt(encefalopatia);const asc=parseInt(ascitis);const bil=parseInt(bilirrubina);const alb=parseInt(albumina);const i=parseInt(inr);if(isNaN(ence)||isNaN(asc)||isNaN(bil)||isNaN(alb)||isNaN(i))return;const pts=ence+asc+bil+alb+i;let l='',col='',b='',d='';if(pts<=6){l='Clase A (Mortalidad Baja)',col='text-green-600';b='bg-green-100';d='Enfermedad bien compensada. Supervivencia a 1 año >95% y 2 años de 90%. Buen candidato quirúrgico electivo.';}else if(pts<=9){l='Clase B (Compromiso Moderado)',col='text-amber-600';b='bg-amber-100';d='Compromiso funcional significativo. Supervivencia a 1 año ~80%. Riesgo quirúrgico elevado. Inicia evaluación para trasplante hepático futuro.';}else{l='Clase C (Enfermedad Descompensada Severa)',col='text-red-700';b='bg-red-100';d='Supervivencia fatal a 1 año <45%. Supervivencia a 2 años de apenas el 35%. Requiere referirse urgentemente para Trasplante Hepático Cadavérico.';}setResultado({value: pts+' pts', label:l, color:col, bg:b, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-orange-700 to-yellow-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-orange-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🧬 Clasificación Child-Pugh</h1>
                    <p className="text-orange-100 mt-2">Estratificación pronóstica de Cirrosis Hepática</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Evaluación Clínica y Laboratorial"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Encefalopatía Hepática"}</label>
                        <select value={encefalopatia} onChange={(e) => setEncefalopatia(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="1">{"Ninguna (1 pto)"}</option>
                            <option value="2">{"Grados I-II: Confusión leve/Alteración del sueño (2 pts)"}</option>
                            <option value="3">{"Grados III-IV: Estupor o Coma profundo (3 pts)"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Ascitis Abdominal"}</label>
                        <select value={ascitis} onChange={(e) => setAscitis(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="1">{"Ausente (1 pto)"}</option>
                            <option value="2">{"Leve o controlable con diuréticos (2 pts)"}</option>
                            <option value="3">{"Moderada a Severa (Refractaria) (3 pts)"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Bilirrubina Total"}</label>
                        <select value={bilirrubina} onChange={(e) => setBilirrubina(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="1">{"< 2.0 mg/dL (1 pto)"}</option>
                            <option value="2">{"2.0 a 3.0 mg/dL (2 pts)"}</option>
                            <option value="3">{"> 3.0 mg/dL (3 pts)"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Albúmina Sérica"}</label>
                        <select value={albumina} onChange={(e) => setAlbumina(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="1">{"> 3.5 g/dL (1 pto)"}</option>
                            <option value="2">{"2.8 a 3.5 g/dL (2 pts)"}</option>
                            <option value="3">{"< 2.8 g/dL (3 pts)"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Tiempo de Protrombina (INR)"}</label>
                        <select value={inr} onChange={(e) => setInr(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="1">{"INR < 1.7 (1 pto)"}</option>
                            <option value="2">{"INR 1.7 a 2.3 (2 pts)"}</option>
                            <option value="3">{"INR > 2.3 (3 pts)"}</option>
                        </select>
                    </div>

                    <button onClick={calcular} className="w-full bg-orange-700 hover:bg-orange-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Puntaje Pronóstico Child-Turcotte-Pugh</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Estadifica tu Funcionalidad Hepática"
                    description="Para el Score de Child Pugh necesitas tener frescas tus pruebas de coagulación TP o INR y tus Bilirrubinas totales con Albúmina."
                    actionText="Pruebas de Función Hepática y Tiempos Coagulación"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Pruebas%20de%20Funcion%20Hepatica"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía Hepática Crítica: Clasificación de Child-Pugh (Cirrosis Hepática)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score puramente inmenso u Clínica O O en de a de O de en Inmensurables O Child-Pugh al U inmensa O u el u o y evalúa u al U inmenso genérica la severidad Inmensurables U inmensa inmenso de la falla O y O del hígado de U a Inmenso en inmenso u genérica inmenso pacientes con U U inmenso cirrosis inmenso u O crónica u. Evalúa Inmenso o u el Inmenso u U pronóstico u de U en sobrevida o a Inmenso u u a a O la O necesidad de de O U U de Trasplante U genéricamente hepático inmenso o inmensurable inmensurable o u el a corto U plazo inmenso u.</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia de Falla Hepática Terminal (Clase C)</h4>
           <p className="text-red-700 m-0">Puntuaciones inmenso inmensurables genéricas o de 10-15 inmensurables al a U y puntos (Clase C) Inmenso O u genéricamente U indican genéricamente alta mortalidad u al a la inmensa el Inmenso a los U inminente inmenso al Inmenso U a dos años inmensurables u O al inmenso y requerimiento urgente O U u de trasplante.</p>
       </div>

       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios Severos Críticos</h3>
       <ul>
           <li><a href="/estudios/perfiles/perfil-hepatico-prueba-de-funcionamiento" className="text-blue-600 font-semibold hover:underline">Perfil Hepático (Bilirrubina Total y Albúmina Sérica)</a></li>
           <li><a href="/estudios/analisis-clinicos/tiempos-de-coagulacion" className="text-blue-600 font-semibold hover:underline">Tiempos de Coagulación (Tiempo de Protrombina - PT)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 ¿Qué es la Clasificación de Child-Pugh para el Hígado?"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"El Score o sistema de estratificación clínica Child-Turcotte-Pugh (frecuentemente llamado simplemente Child-Pugh) fue pioneramente desarrollado para poder estandarizar estadísticamente la tremenda mortalidad a la que se enfrentaban los pacientes con hígados cirróticos cuando eran sometidos a cirugías portocavas."}</p>
                        <p>{"Actualmente a nivel clínico global es utilizado como predictor certero pre operatorio y como determinante indiscutible pronóstico y letal en individuos que padecen de cirrosis y daño celular hepatocelular sostenido o crónico (CH)."}</p>
                        <p>{"Esta categorización exige conjuntamente una evaluación de la clínica visible física del paciente (retención acuosa abdominal masiva conocida como Ascitis o alteraciones neuronales por toxicidad conocida orgánicamente como Encefalopatía Hepática) en combinación directa con tres laboratorios bioquímicos críticos irremplazables: Bilirrubina, Nivel de Albúmina y Prolongaciones del Tiempo de Protrombina."}</p>
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
