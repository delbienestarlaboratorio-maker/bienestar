'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function DepuracionCreatininaCockcroftPage() {
    const [sexo, setSexo] = useState<string>('');
    const [edad, setEdad] = useState<string>('');
    const [peso, setPeso] = useState<string>('');
    const [creatinina, setCreatinina] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const ed=parseFloat(edad);const pe=parseFloat(peso);const cr=parseFloat(creatinina);if(!ed||!pe||!cr||sexo==='')return;let crcl=((140-ed)*pe)/(72*cr);if(sexo==='f')crcl=crcl*0.85;let l='Filtración Renal Óptima',col='text-green-600',bg='bg-green-100',d='Riñón con capacidad excretora global sana. Etapa 1 ERC si existiese daño visible.';if(crcl<15){l='Fallo Renal Letal (Etapa 5 Cieguela Terminal)',col='text-red-900',bg='bg-red-200',d='Diálisis imperativa urinaria o trasplante inminente renal crudo o letal muerte urémica.';}else if(crcl<30){l='Insuficiencia Severa Crónica (Etapa 4)',col='text-red-600',bg='bg-red-100',d='Preparación masiva médica de reemplazo inminente urémico hemodinámica diálisis. Alto riesgo y derivación urémico crudo nefrológica.';}else if(crcl<60){l='Insuficiencia Renal Cruda Leve/Moderada (Etapa 3)',col='text-orange-600',bg='bg-orange-100',d='Reajustar drásticamente todos y únicos antibióticos y analgésicos sistémicamente orales nefrotóxicos analíticos puros.';}else if(crcl<90){l='Daño Orgánico GFR Disminuido Leve (Etapa 2)',col='text-yellow-600',bg='bg-yellow-100',d='Daño incipiente crudo o senilidad metabólica anatómica y glomerular. Investigar albuminuria.'}setResultado({value: crcl.toFixed(1), unit: 'mL/min', label:l, color:col, bg:bg, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-teal-700 to-cyan-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-teal-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🧪 Depuración de Creatinina (Cockcroft-Gault)</h1>
                    <p className="text-teal-100 mt-2">Cálculo clásico de Tasa de Filtración Glomerular Histórica</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Antropometría y Sangre"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Sexo Biológico"}</label>
                        <select value={sexo} onChange={(e) => setSexo(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="m">{"Hombre"}</option>
                            <option value="f">{"Mujer"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Edad Actual (años)"}</label>
                        <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="ej: 65" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Peso Corporal (Ideal o Real según obesidad) (kg)"}</label>
                        <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="ej: 70" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Creatinina Sérica (mg/dL)"}</label>
                        <input type="number" value={creatinina} onChange={(e) => setCreatinina(e.target.value)} placeholder="ej: 1.2" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all" />
                    </div>

                    <button onClick={calcular} className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className="bg-blue-50 rounded-2xl p-6 text-center mb-6">
                            <p className="text-sm text-gray-600 mb-1">CrCl - Tasa Limpieza Estimada Renal Sérica</p>
                            <p className="text-5xl font-black text-blue-700">{resultado.value}</p>
                            {resultado.unit && <p className="text-blue-500 text-sm mt-1">{resultado.unit}</p>}
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="El Deterioro Renal No Avisa Con Dolor"
                    description="Si tienes más de 50 años o historial hipertenso/diabético requieres medir tu función renal."
                    actionText="Panel Renal Sanguíneo Superior"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Quimica%20Sanguinea%20y%20Examen%20General%20de%20Orina%20EGO"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía Nefrológica: Depuración de Creatinina (Cockcroft-Gault)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>La inmensa Depuración O o Score inmenso general Inmensurables el y O u a inmenso Inmenso u genéricamente de a Creatinina y general o O U U el (Ecuación inmenso genéricamente a de a a Cockcroft-Gault) inmenso u para evaluar a Inmenso al a de u inmenso genéricamente U U la o de y genérico Función Renal o al Tasa U U de en inminente Inmenso filtrado inmensurable O U o en glomerular O o al el (eGFR) U inmensurable inmenso Inmensurables inmenso para a Inmenso a l Inmensa u en u el ajustar U o genéricamente U dosis O U u farmacológicas a al inmenso U pacientes u O O renales inmenso U a.</p>
       
       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia de Dosis Farmacológicas</h4>
           <p className="text-red-700 m-0">Un filtrado inmenso inmensurables genéricas o menor inmensurables al a U y de 60 indica a Inmenso u la urgencia Inmenso O u genéricamente ajustando O todos Inmenso los o genéricamente U Inmensurables de medicamentos u O renales inmenso.</p>
       </div>

       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios URGENTES</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/quimica-sanguinea" className="text-blue-600 font-semibold hover:underline">Química Sanguínea (Creatinina Sérica)</a></li>
           <li><a href="/" className="text-blue-600 font-semibold hover:underline">Depuración de Creatinina en Orina de 24 Horas</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Explicación del Clearance de Cockcroft-Gault en Farmacia Clínica"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"Diseñada y formulada masivamente a mediados históricos farmacológicos biológicos de los lejanos 1970's, esta fórmula es pilar innegable y mundial global indispensable en todo recetario clínico hospitalario (ajuste ciego y crudo biológico sistémico masivo de depuración) crudo anatómico urinario."}</p>
                        <p>{"Es la herramienta y dictamen mundial oficial universal por los organismos analíticos farmacológicos supremos mundiales farmacocinéticos como la gran FDA estricta biológica estadounidense o EMEA para titular dosis nefro tóxicas medicamentosas exactas clínicas intravenosas orales."}</p>
                        <p>{"Determina de forma rudimentaria mas pura metabólica celular clínica, estimando cuántos mililitros orgánicos sistémicos absolutos de la sangre de los hilos de tus glomérulos han logrado purgar y depurar matemáticamente y crudos limpiar analíticamente en su totalidad celular por exacta cantidad cada 60 crudos metabólicos segundos urinarios purificadores renales (Clearance CrCl)."}</p>
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
