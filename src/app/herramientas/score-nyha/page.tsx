'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ScoreNyhaPage() {
    const [fatiga, setFatiga] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        if(!fatiga)return;const pts=parseInt(fatiga);let l='',c='',b='',d='';if(pts===1){l='Asintomático';c='text-green-600';b='bg-green-100';d='Grado I. Padecimiento cardíaco latente, sin secuelas limitantes en rutina de vida.';}else if(pts===2){l='Afectación Leve';c='text-yellow-600';b='bg-yellow-100';d='Grado II. Paciente desarrolla molestias ante ejercicio físico sostenido.';}else if(pts===3){l='Limitación Fuerte';c='text-orange-600';b='bg-orange-100';d='Grado III. Solo encuentra la comodidad al estar estático. Malestar ante caminatas breves.';}else{l='Severidad Total';c='text-red-600';b='bg-red-100';d='Grado IV. Malestar respiratorio ocurre sin importar ausencia absoluta de esfuerzo físico.';}setResultado({value: 'Clase '+pts, label:l, color:c, bg:b, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-red-700 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">❤️ Clasificación Cardíaca NYHA</h1>
                    <p className="text-red-100 mt-2">Grados de insuficiencia cardíaca congestiva</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Nivel de Fatiga Disneica</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Síntomas percibidos ante esfuerzo"}</label>
                        <select value={fatiga} onChange={(e) => setFatiga(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="1">{"I: Ningún límite con actividad física normal."}</option>
                            <option value="2">{"II: Ligera fatiga. Comodidad en simple reposo pero actividad produce disnea media."}</option>
                            <option value="3">{"III: Limitación marcada. Incluso lavar platos o vestirse exige frenar."}</option>
                            <option value="4">{"IV: Síntomas de insuficiencia en total reposo. Imposible el mínimo esfuerzo."}</option>
                        </select>
                    </div>

                    <button onClick={calcular} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Grado Oficial</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Valoración Sanguínea Cardíaca"
                    description="Un perfil de Química Sanguínea completo revela la salud sistémica tras años de deficiencia cardiovascular."
                    actionText="Cotizar CheckUp Vistazo"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Quimica%20Sanguinea%20Integral"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Escala de la New York Heart Association (NYHA)</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>Introducida mundialmente en 1928, esta estandarización forjada por The New York Heart Association agrupa el declive clínico subjetivo documentando qué tan comprometido está el pulso e intercambios gaseosos pulmonares de cada individuo enfermo.</p>
                        <p>Es radicalmente simple de medir al evadir sofisticaciones: documenta si un cuerpo se ahoga en sus fluidos incluso durante el silencio de acostarse frente a únicamente sufrir fatigas al trepar empinadas escaleras metropolitanas.</p>
                        <p>Su validez estadística la cementa al lado de algoritmos matemáticos duros para pronosticar estadísticamente años venideros del padecimiento, requerimientos preoperatorios quirúrgicos o el éxito en rehabilitaciones.</p>
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
