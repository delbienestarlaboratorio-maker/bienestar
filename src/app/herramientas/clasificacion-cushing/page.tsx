'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function ClasificacionCushingPage() {
    const [obesidadCentral, setObesidadCentral] = useState<boolean>(false);
    const [estriasViolaceas, setEstriasViolaceas] = useState<boolean>(false);
    const [faciesLuna, setFaciesLuna] = useState<boolean>(false);
    const [hirsutismo, setHirsutismo] = useState<boolean>(false);
    const [debilidadMusc, setDebilidadMusc] = useState<boolean>(false);
    const [hematomas, setHematomas] = useState<boolean>(false);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        let pts=0;if(obesidad_central)pts+=2;if(estrias_violaceas)pts+=4;if(facies_luna)pts+=2;if(hirsutismo)pts+=1;if(debilidad_musc)pts+=3;if(hematomas)pts+=3;let l='Improbable',c='text-green-600',b='bg-green-100',d='Clínica débil paramétrica para sustentar diagnóstico endógeno suprarrenal primario excesivo.';if(pts>=8){l='Altísima Probabilidad',c='text-red-600',b='bg-red-100',d='Sintomatología muy específica indicando severo estado corticoide crónico tóxico en el sistema orgánico celular.'}else if(pts>=4){l='Moderada Probabilidad',c='text-orange-600',b='bg-orange-100',d='Sugiere hipercortisolismo probable. Exige tamizaje urgente cortisol métrico laboratorial u hormona hipofisiaria.'}setResultado({value: pts+'/15', label:l, color:c, bg:b, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-amber-700 to-orange-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-amber-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">⚖️ Probabilidad Síndrome de Cushing</h1>
                    <p className="text-amber-100 mt-2">Test probabilístico de hipercortisolismo</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Inspección de Cuadro Clínico de Cushing"}</h2>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="obesidad_central" checked={obesidadCentral} onChange={(e) => setObesidadCentral(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="obesidad_central" className="text-sm font-bold text-gray-700">{"Obesidad centrípeta abrupta severa"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="estrias_violaceas" checked={estriasViolaceas} onChange={(e) => setEstriasViolaceas(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="estrias_violaceas" className="text-sm font-bold text-gray-700">{"Presencia de Estrías Rojizas/Violáceas anchas en abdomen/axilas"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="facies_luna" checked={faciesLuna} onChange={(e) => setFaciesLuna(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="facies_luna" className="text-sm font-bold text-gray-700">{"Facies de Luna Llena palpable roja / Pletórica"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="hirsutismo" checked={hirsutismo} onChange={(e) => setHirsutismo(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="hirsutismo" className="text-sm font-bold text-gray-700">{"Hirsutismo (Vello facial grueso abundante en mujer sin SOP)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="debilidad_musc" checked={debilidadMusc} onChange={(e) => setDebilidadMusc(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="debilidad_musc" className="text-sm font-bold text-gray-700">{"Debilidad muscular severa de extremidades prox malamente (brazos/muslos)"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="hematomas" checked={hematomas} onChange={(e) => setHematomas(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="hematomas" className="text-sm font-bold text-gray-700">{"Aparición hematomas (bruising) inexplicables y piel extremadamente frágil/delgada"}</label>
                    </div>

                    <button onClick={calcular} className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Índice Sugestivo</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Cortisol: Hormona de Estrés y Tumores"
                    description="Midiendo Cortisol en Sangre descartas tumoreaciones en suprarrenales o en la hipófisis craneal rápida y fiablemente."
                    actionText="Análisis de Cortisol Básico"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Cortisol%20Serico%20AM"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Sintomatología Clínica en Síndrome Cushing"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"El temido padecimiento denominado y clasificado como Síndrome Complejo y sistémico crónico grave de la glándula suprarrenal (Cushing), resulta letal y desfigurador de las anatomías si el torrente sanguíneo crónicamente posee inmensas elevadísimas cargas celulares corticoideas metabólicas y sistémicas."}</p>
                        <p>{"Es fundamental tamizar inicialmente e interrogar a nuestros afectados discriminando hallazgos clásicamente no definitorios como subidas masivas crasas o estrías corporales tenues blanquecinas de distensión cutánea en etapas puerperales ordinarias que cualquier gorda embarazada portaría naturalmente."}</p>
                        <p>{"Signos patognomónicos determinantes, rarísimos inobjetablemente de detectar espontáneos como moretones o equimosis subcutánea fragilidad capilar extrema y las famosas y grotescas estrías violáceas sangrantes o fascies de luna llena de plétora hiperémica, gritan sin duda el hipercortisolismo."}</p>
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
