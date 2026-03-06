'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ScoreTimiNstemiPage() {
    const [edad, setEdad] = useState<boolean>(false);
    const [riesgos, setRiesgos] = useState<boolean>(false);
    const [coronaria, setCoronaria] = useState<boolean>(false);
    const [aspirina, setAspirina] = useState<boolean>(false);
    const [anginas, setAnginas] = useState<boolean>(false);
    const [ecg, setEcg] = useState<boolean>(false);
    const [marcadores, setMarcadores] = useState<boolean>(false);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        let pts=0;if(edad)pts++;if(riesgos)pts++;if(coronaria)pts++;if(aspirina)pts++;if(anginas)pts++;if(ecg)pts++;if(marcadores)pts++;let l='Bajo Riesgo',c='text-green-600',b='bg-green-100',r=0;switch(pts){case 0:case 1:case 2:r=8.3;break;case 3:r=13.2;l='Riesgo Intermedio';c='text-yellow-600';b='bg-yellow-100';break;case 4:r=19.9;l='Riesgo Intermedio';c='text-yellow-600';b='bg-yellow-100';break;case 5:r=26.2;l='Alta Severidad';c='text-orange-600';b='bg-orange-100';break;case 6:case 7:r=40.9;l='Riesgo Extremo Agudo';c='text-red-600';b='bg-red-100';break;}let desc='Probabilidad fatal de muerte inminente isquémica a 14 días: '+r+'%.';setResultado({value: pts+'/7', label:l, color:c, bg:b, desc:desc});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-red-700 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">❤️ Score TIMI (NSTE-ACS)</h1>
                    <p className="text-red-100 mt-2">Riesgo Síndromes Coronarios Agudos Sin Supradesnivel</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Predictores Isquémicos a evaluar (1 punto c/u)</h2>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="edad" checked={edad} onChange={(e) => setEdad(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="edad" className="text-sm font-bold text-gray-700">{"Paciente tiene 65 años o más"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="riesgos" checked={riesgos} onChange={(e) => setRiesgos(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="riesgos" className="text-sm font-bold text-gray-700">{"3 factores: Diabetes, Tabaco, HTA, Obesos o Colesterol"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="coronaria" checked={coronaria} onChange={(e) => setCoronaria(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="coronaria" className="text-sm font-bold text-gray-700">{"Estenosis coronaria antigua comprobada > 50%"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="aspirina" checked={aspirina} onChange={(e) => setAspirina(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="aspirina" className="text-sm font-bold text-gray-700">{"Uso diario profiláctico de Aspirina los pasados 7 días"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="anginas" checked={anginas} onChange={(e) => setAnginas(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="anginas" className="text-sm font-bold text-gray-700">{"≥ 2 ataques repentinos severos de angina dolorosa en últimas 24 hrs"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="ecg" checked={ecg} onChange={(e) => setEcg(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="ecg" className="text-sm font-bold text-gray-700">{"Desnivel nuevo y objetivo del trazo ST eléctrico > 0.5 mm"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="marcadores" checked={marcadores} onChange={(e) => setMarcadores(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="marcadores" className="text-sm font-bold text-gray-700">{"CPK, Mioglobina, TnI Sanguínea Positivamente Elevada"}</label>
                    </div>

                    <button onClick={calcular} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Severidad TIMI Clínico</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Valoraciones Isquémicas Urgentes"
                    description="Para el manejo certero ante dolores agudos son recomendatorias las enzimas de necrosis y CPK en laboratorio."
                    actionText="Análisis y Marcadores"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Enzimas%20Cardiacas"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Niveles TIMI para Anginas e Infarto Menores</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>El sistema TIMI del ACS para síndromes coronarios agudos que carecen de marcados y letales supradesniveles agudos del segmento eléctrico cardíaco (NSTEMI / Antiguamente Angina Inestable), cataloga el curso natural sin cirugía percutánea intervencionista.</p>
                        <p>Cada elemento clínico desde un abuelo sobre 65 y la documentada resistencia farmacéutica (usar diariamente pastillas con ASA aspirínica previas sin lograr impedir que el infarto se desvele) es matemáticamente letal si se añade a un biomarcador (CPK-MB) destructivo sangrante positivo.</p>
                        <p>La gradación estricta clasifica si el paciente tiene la viabilidad idónea cardióloga para simplemente permanecer observado rutinariamente, comparado al escalofriante pronóstico del 41% requerimiento quirúrgico agudo forzado vital en caso de juntar siete variables sombrías concurrentes.</p>
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
