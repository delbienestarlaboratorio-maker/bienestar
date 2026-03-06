'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ScoreTimiStemiPage() {
    const [edad, setEdad] = useState<string>('');
    const [diabetesHta, setDiabetesHta] = useState<boolean>(false);
    const [sistolica, setSistolica] = useState<boolean>(false);
    const [frecuencia, setFrecuencia] = useState<boolean>(false);
    const [killip, setKillip] = useState<boolean>(false);
    const [peso, setPeso] = useState<boolean>(false);
    const [stemiAnterior, setStemiAnterior] = useState<boolean>(false);
    const [tiempoAtencion, setTiempoAtencion] = useState<boolean>(false);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        if(!edad)return;let p=parseInt(edad);if(diabetes_hta)p++;if(sistolica)p+=3;if(frecuencia)p+=2;if(killip)p+=2;if(peso)p++;if(stemi_anterior)p++;if(tiempo_atencion)p++;let mort=0;switch(p){case 0:mort=0.8;break;case 1:mort=1.6;break;case 2:mort=2.2;break;case 3:mort=4.4;break;case 4:mort=7.3;break;case 5:mort=12.4;break;case 6:mort=16.1;break;case 7:mort=23.4;break;case 8:mort=26.8;break;case 9:case 10:case 11:case 12:case 13:case 14:mort=35.9;break;}let l='Riesgo Leve',c='text-green-600',b='bg-green-100';if(mort>=15){l='Riesgo Extremadamente Alto';c='text-red-600';b='bg-red-100';}else if(mort>=7){l='Alto Riesgo';c='text-orange-600';b='bg-orange-100';}setResultado({value: p+' pts',label:l,color:c,bg:b,desc:'Mortalidad estimada al día 30 post-infarto: '+mort+'%.'});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-red-700 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">❤️ Score TIMI (STE-MI)</h1>
                    <p className="text-red-100 mt-2">Mortalidad al día 30 en Infarto con Supradesnivel</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Estratificación Clínica</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Edad"}</label>
                        <select value={edad} onChange={(e) => setEdad(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Menor de 65 años"}</option>
                            <option value="2">{"65 - 74 años"}</option>
                            <option value="3">{"≥ 75 años"}</option>
                        </select>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="diabetes_hta" checked={diabetesHta} onChange={(e) => setDiabetesHta(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="diabetes_hta" className="text-sm font-bold text-gray-700">{"Diabetes, HTA o Angina documentada"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="sistolica" checked={sistolica} onChange={(e) => setSistolica(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="sistolica" className="text-sm font-bold text-gray-700">{"Presión Sistólica < 100 mmHg"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="frecuencia" checked={frecuencia} onChange={(e) => setFrecuencia(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="frecuencia" className="text-sm font-bold text-gray-700">{"Frecuencia Cardíaca > 100 lpm"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="killip" checked={killip} onChange={(e) => setKillip(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="killip" className="text-sm font-bold text-gray-700">{"Clase Killip II - IV"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="peso" checked={peso} onChange={(e) => setPeso(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="peso" className="text-sm font-bold text-gray-700">{"Peso corporal < 67 kg (< 150 lbs)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="stemi_anterior" checked={stemiAnterior} onChange={(e) => setStemiAnterior(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="stemi_anterior" className="text-sm font-bold text-gray-700">{"Infarto Anterior o BCR Izquierdo en ECG"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="tiempo_atencion" checked={tiempoAtencion} onChange={(e) => setTiempoAtencion(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="tiempo_atencion" className="text-sm font-bold text-gray-700">{"Tiempo a la intervención trombolítica > 4 horas"}</label>
                    </div>

                    <button onClick={calcular} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Puntaje TIMI STEMI</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Valoración Médica Urgente"
                    description="Los infartos implican manejo especializado y laboratorios seriados (CPK, Químicas, BH) inmediatos."
                    actionText="Cotizar Paneles de Laboratorio"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Estudios%20Cardiologia"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Interpretando el TIMI Score en IAMCEST</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>El sistema TIMI (Thrombolysis In Myocardial Infarction) fue desarrollado específicamente para pacientes diagnosticados con un Infarto Agudo del Miocardio con Elevación del Segmento ST (IAMCEST o STEMI).</p>
                        <p>Calculado desde el ingreso, su objetividad provee una predicción porcentual directa de la mortalidad que existe dentro de los primeros 30 días posteriores al comienzo del evento isquémico de manera que guíe intervenciones críticas como el cateterismo.</p>
                        <p>Considera indicadores hemodinámicos ineludibles: una frecuencia taquicárdica o presiones arteriales hipotensas, reflejo in situ de un deficiente volumen de inyección y severo compromiso celular miocárdico.</p>
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
