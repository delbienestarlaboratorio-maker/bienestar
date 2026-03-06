'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ScoreMasccOncologiaPage() {
    const [carga, setCarga] = useState<string>('');
    const [presion, setPresion] = useState<boolean>(false);
    const [epoc, setEpoc] = useState<boolean>(false);
    const [tumor, setTumor] = useState<boolean>(false);
    const [deshi, setDeshi] = useState<boolean>(false);
    const [estado, setEstado] = useState<boolean>(false);
    const [edad, setEdad] = useState<boolean>(false);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        let pts=0;const c=parseInt(carga);if(!isNaN(c))pts+=c;if(presion)pts+=5;if(epoc)pts+=4;if(tumor)pts+=4;if(deshi)pts+=3;if(estado)pts+=3;if(edad)pts+=2;let l='Alto Clínico Flagrante Peligro y Hospital y Biología Mortal UCI 40% (Score < 21)',col='text-red-700',bg='bg-red-100',d='Este oncológico cruento y febril morirá cruda en sepsis médica de shock. Requerimiento intravenoso puro de urgencia empírico puramente sistémico antibiótico UCI neutropénico inmediato masivo pre intubación cruda letal masiva de líquidos uremicos mortales infecciosos puros urgentes hematológicos sin defensas UCI hospital inmediato cruzada antibiótica inminente.';if(pts>=21){l='Excelente Buen Soporte Mortal Bajo Pobre e Insignificante 5% En Casa Ambulatorios (> 21 Pts)',col='text-green-600',bg='bg-green-100';d='Altísimo de probabilidad innegable para mandar de regreso oncológicos urgentes a casas en quimios con pastillas antibióticos ciprofloxacinos amoxicilinas seguros. (PPV >90%).';}setResultado({value: pts+'/26', label:l, color:col, bg:bg, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-purple-700 to-fuchsia-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-purple-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">☢️ Score MASCC de Oncológico Riesgo Neutropénico Febril y Muerte Severo</h1>
                    <p className="text-purple-100 mt-2">Clasificador multinacional Asociación en Cuidados y Terapia Soporte Infección Cáncer (Multinational Assesment Support in Cancer Care MASCC Neutropenia FEBRIL)</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Evaluación Clínica Neutropénica Oncológica Oncológica Quimioterapia Sepsis Cáncer Sérica Febril"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Presencia Fuerte Clara Oncológica y Evidente de Carga Puramente Clínica Pura y Tumor Biológico Activo Tumoral de Enfermedad u otra afección médica (Ej. Disnea o Choque Severo)"}</label>
                        <select value={carga} onChange={(e) => setCarga(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="5">{"Ausente/Leve Poca Infección de Carga Oncológica Clínica Tumor Activo (5 Pts)"}</option>
                            <option value="3">{"Tratamientos Leves o Tumor de Carga Moderadamente Controlado Oncológica Comórbida (3 Pts)"}</option>
                            <option value="0">{"Severamente Agotado Encamado Oncológico Inmunodeprimido Activo Pobre Pésima Carga Estado Oncológica Terminal Generalizada Encamado Disgregativo (0 Pts)"}</option>
                        </select>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="presion" checked={presion} onChange={(e) => setPresion(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="presion" className="text-sm font-bold text-gray-700">{"Ausencia Presión Arterial Hipotensiva Severa Baja Letal (> 90 mmHg sistólica pura médica compensada clínica (5)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="epoc" checked={epoc} onChange={(e) => setEpoc(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="epoc" className="text-sm font-bold text-gray-700">{"Paciente Carece Sanamente Fumar Respirar Sin Falla de Cuadros Severos EPOC Pulmonar Infecciosos (4 pts)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="tumor" checked={tumor} onChange={(e) => setTumor(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="tumor" className="text-sm font-bold text-gray-700">{"Cáncer que se trata de puros Tumores Clínicos Orgánicos Sólidos Oncológicos y No Cáncer Sanguíneo Leucémico Letal, Ó un diagnóstico Sanguíneo Pre-Hematológico Letal Cáncer pero libre completamente sin afectaciones hongos pura y letal o infecciosa invasiva letal por moho (Micosis) oncológicos (4)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="deshi" checked={deshi} onChange={(e) => setDeshi(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="deshi" className="text-sm font-bold text-gray-700">{"Paciente Clínicamente hidratado Sanamente Estricto sin Sangrados Sangrantes u Puros Francos Estrictos Comprobables y Evidenciados Caseros de Inestable Severa o Severa Pura letal médica comprobada de Deshidratación Oncológica o Clínica Séptico Diarreica Mortal Aguda Médica Extrema Deshidratativa Cruda Aguda Intravenosa (3 pts)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="estado" checked={estado} onChange={(e) => setEstado(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="estado" className="text-sm font-bold text-gray-700">{"El paciente atiende en estado puro Ambulatorio Estable Oncológico Inmunodeprimido y No está internado ingresado clínico pre o inter nosocomial u postquirúrgicos en urgencia UVI Infecciosa Letal y Activa Clínica UCI Cama Clínica Infeccioso UCI (3 pts)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="edad" checked={edad} onChange={(e) => setEdad(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="edad" className="text-sm font-bold text-gray-700">{"El paciente Oncológico de Cáncer Ostenta Juveniles Puros Sanos o Menos Ancianos puros puramente Adultos y Adultas de Menos < Menos Sesenta Adultos Sanos Longevos Jóvenes Edades Edad Años o 60 (2 Pts)"}</label>
                    </div>

                    <button onClick={calcular} className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Criterios Clínicos De Seguridad De Alta Segura Paciente Febril Cáncer</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Una Simple BH (Biometría Hemática) Confirmaría y Aclara Quimio Letal Sepsis de Hemograma Blanco Linfático Blancos Neutropenia Cero Sepsis Febril Cáncer"
                    description="Solo las exactas biometrías medicas leucocitos confirman neutropenias pre sepsis febriles de cancer"
                    actionText="Checa Inmunodeficiencia Neutropenia Blanca Sangre Defensas Letal"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Biometria%20Hematica%20Leucocitos%20Blancas%20Sepsis"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 ¿Cómo Clasificar Muerte Infecciosa Cáncer y Neutropenia Sepsis Febril con Escala MASCC Score Oncológica Sanguínea Leucocitos Cáncer Febril?"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"Dentro innegable de la química biológica estricta médica del oncológico quimioterápico crudo descompensado, la Neutropenia febril puramente clínica o Cáncer en Sepsis leucopenia franca hematológica inmune supresora post veneno quimio tóxico es devastadora innegable pura."}</p>
                        <p>{"Asigna matemáticamente pesos MASCC si es menor a los potentes e indudables 21 puntos vitales significa alta letal médica aguda pura morbilidad y la necesidad de encerrarlo hospital urgente para medicar intravenoso y proteger de mortales sepsis mortales crudos hongos neutrófilos e innegable e inevitable puramente bacterias anaeróbicas oncológicas hospital cruzadas mortales letales."}</p>
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
