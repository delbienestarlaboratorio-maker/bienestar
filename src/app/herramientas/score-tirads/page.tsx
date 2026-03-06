'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ScoreTiradsPage() {
    const [composicion, setComposicion] = useState<string>('');
    const [ecogenicidad, setEcogenicidad] = useState<string>('');
    const [forma, setForma] = useState<string>('');
    const [margenes, setMargenes] = useState<string>('');
    const [focos, setFocos] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const c=parseInt(composicion);const e=parseInt(ecogenicidad);const f=parseInt(forma);const m=parseInt(margenes);const fx=parseInt(focos);if(isNaN(c)||isNaN(e)||isNaN(f)||isNaN(m)||isNaN(fx))return;const pts=c+e+f+m+fx;let l='',col='',b='',d='';if(pts<=0){l='TR1: Benigno';col='text-green-600';b='bg-green-100';d='0 Puntos. Riesgo de cáncer virtualmente 0%. PAAF no pre-recomendada jamás sin excepción alguna sistémica estandarizada protocolar.';}else if(pts<=2){l='TR2: No Sospechoso';col='text-green-600';b='bg-green-100';d='1-2 Puntos. Escasísimo o Nulo riesgo celular atípico basal <2%. PAAF categóricamente no recomendada en algoritmos y esquemática de la ACR global.';}else if(pts===3){l='TR3: Levemente Sospechoso';col='text-yellow-600';b='bg-yellow-100';d='3 Puntos. Riesgo de apenas el 5%. La Biopsia PAAF fina punzante se consideraría sólo si el nódulo o masa basal rebasa brutal y físicamente por eco el 2.5 cms.';}else if(pts<=6){l='TR4: Sospecha Intermedia y Moderada de Carcinoma Células';col='text-orange-600';b='bg-orange-100';d='4 a 6 Ptos. Entre 5 y 20% riesgo neoplásico. Biopsia imperativa aguda si la perimetría volumétrica total diametral cruza 1.5 cm sin contemplaciones médicas extra clínicas retardables.';}else{l='TR5: Letal y Altísimamente Sospechoso de Cáncer Neoplásico';col='text-red-600';b='bg-red-100';d='>7 Puntos. Riesgo inminente maligno gigantesco superior al abismal tope superior de 20 porciento métrico. BAF (Biopsia) obligatoria y quirúrgica escisión prospectada si cruzan > 1.0 cm.';}setResultado({value: pts+' pts', label:l, color:col, bg:b, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-amber-700 to-orange-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-amber-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🦋 ACR TI-RADS</h1>
                    <p className="text-amber-100 mt-2">Estratificación de Riesgo en Nódulos Tiroideos</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Hallazgos Ecográficos del Nódulo (Suma puntos)"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Composición Histológica"}</label>
                        <select value={composicion} onChange={(e) => setComposicion(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Quístico o Mayormente Quístico"}</option>
                            <option value="1">{"Esponjiforme"}</option>
                            <option value="1">{"Mixta sólida y quística (1 pto)"}</option>
                            <option value="2">{"Sólida o casi sólida (>80%) (2 pts)"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Ecogenicidad Global"}</label>
                        <select value={ecogenicidad} onChange={(e) => setEcogenicidad(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Anecoico"}</option>
                            <option value="1">{"Hiper o Isoecoico (1 pto)"}</option>
                            <option value="2">{"Hipoecoico (2 pts)"}</option>
                            <option value="3">{"Muy hipoecoico profundo (3 pts)"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Forma Geométrica Radial"}</label>
                        <select value={forma} onChange={(e) => setForma(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Más ancho del contorno que alto radial"}</option>
                            <option value="3">{"Anormalmente Más Alto radialmente que ancho de forma (3 pts)"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Bordes Externos"}</label>
                        <select value={margenes} onChange={(e) => setMargenes(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Lisos o mal definidos no concluyentes"}</option>
                            <option value="2">{"Lobulados múltiples o Irregulares (2 pts)"}</option>
                            <option value="3">{"Extensión Extratiroidea maligna franca (3 pts)"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Focos Ecogénicos Internos (suman)"}</label>
                        <select value={focos} onChange={(e) => setFocos(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-amber-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Ninguno o clásicos coloides cometa"}</option>
                            <option value="1">{"Macrocalcificaciones focos engrosados grandes (1 pto)"}</option>
                            <option value="2">{"Calcificaciones periféricas de reborde en cascarón de huevo asimetría(2 pts)"}</option>
                            <option value="3">{"Microcalcificaciones puntiformes esféricas punteadas letales y difusas sugestivas (3 pts)"}</option>
                        </select>
                    </div>

                    <button onClick={calcular} className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Categoría ACR Oficial TI-RADS</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Valoración Pre Específica de Biopsia BAAF Tiroidea"
                    description="Previo quirúrgico biopsico a nivel cervical debes certificar ineludiblemente qué función molecular de yodo tienen tus complejas hormonas basales tiroideas."
                    actionText="Conocer y Mapear Hormonas TSH/T4 Tiroideas"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Perfil%20Tiroideo%20Completo%206%20Elementos"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Interpretando ecos en masas con el Sistema ACR TI-RADS"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"El estandarizado y complejo comité de radio y eco clasificaciones metodológicas del ACR estableció magistralmente el potente modelo ultrasonográfico de medición e interrogación cualitativa clínica para lesiones bultosas y los masivos infames nódulos o quistes tiroideos orgánicos subdérmicos conocidos y estudiados global y famosamente como el acrónimo TI-RADS."}</p>
                        <p>{"Cada elemento sumatorio morfológico que resulta disidente (como crecer geométricamente más empinado y en vertical perpendicularidad contra en plano ancho natural o como poseer interior micro-calcificaciones como en puntilleos focales oscuros) arrojan estigmatizaciones predictoras y estadísticas inequívocas para dictaminar o negar contundentemente y con peso un pase directo hacia los cuartos estériles de intervención histológica biópsica PAAF aguda."}</p>
                        <p>{"Tumoraciones inmesurables quísticas no merecen atención o intervenciones clínicas puncionadas, mas que tumores sólidos menores en tamaño pero brutal y morfológicamente neoclásicamente aberrantes (clasificados y punteados como TI RADS estandarizados cinco estadíos fatales)."}</p>
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
