'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function CalculadoraExposicionRayosxAvanzadaPage() {
    const [marcaEquipo, setMarcaEquipo] = useState<string>('');
    const [region, setRegion] = useState<string>('');
    const [tamanoChasis, setTamanoChasis] = useState<string>('');
    const [grosorPaciente, setGrosorPaciente] = useState<string>('');
    const [parrilla, setParrilla] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const eq=parseFloat(marcaEquipo);const grosor=parseFloat(grosorPaciente);const chasis=parseFloat(tamanoChasis);const factorParrilla=parseFloat(parrilla);if(!eq||!region||!chasis||!grosor||isNaN(factorParrilla))return;const regiones={torax_pa:{baseKvp:110,basemAs:3,constante:2},torax_lat:{baseKvp:120,basemAs:6,constante:2},abdomen_ap:{baseKvp:80,basemAs:20,constante:4},columna_ap:{baseKvp:80,basemAs:30,constante:4},columna_lat:{baseKvp:90,basemAs:50,constante:4},pelvis_ap:{baseKvp:80,basemAs:25,constante:4},craneo_ap:{baseKvp:75,basemAs:15,constante:3},mano_pa:{baseKvp:55,basemAs:2,constante:0},pie_ap:{baseKvp:60,basemAs:3,constante:0},rodilla_ap:{baseKvp:65,basemAs:8,constante:2}};const ref=regiones[region];let kVP=(grosor*ref.constante)+ref.baseKvp;if(factorParrilla===0){kVP-=10;} let mAs=ref.basemAs;const deltaGrosor=grosor-20;if(deltaGrosor>0){mAs=mAs*Math.pow(1.25,deltaGrosor);}else if(deltaGrosor<0){mAs=mAs*Math.pow(0.8,Math.abs(deltaGrosor));} mAs=mAs*(factorParrilla>0?(factorParrilla/3):1);mAs=mAs*eq*chasis;kVP=Math.round(kVP);mAs=Math.max(0.5,Math.round(mAs*10)/10);let label='Técnica Sugerida';let color='text-zinc-700';let bg='bg-zinc-100';let desc=`Valores estimados. Ajuste según el índice de exposición (EI) del receptor. Foco Fino para <10 mAs, Foco Grueso para >10 mAs.`;setResultado({value:`${kVP} kVp / ${mAs} mAs`,label,color,bg,desc});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-zinc-700 to-neutral-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-zinc-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🩻 Calculadora de Exposición de Rayos X</h1>
                    <p className="text-zinc-100 mt-2">Ajuste de kVp y mAs por Anatomía, Chasis y Marca del Equipo</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Parámetros del Paciente y Equipo"}</h2>

                    <div className="mb-4">

                        <details className="group mb-2">
                            <summary className="flex items-center gap-2 cursor-pointer list-none select-none">
                                <span className="block text-sm font-bold text-gray-700">Marca del Equipo de Rayos X (Factor Generador)</span>
                                <span className="text-gray-400 hover:text-zinc-500 transition-colors" title="Más información">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                </span>
                            </summary>
                            <div className="mt-2 mb-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-gray-600 shadow-inner leading-relaxed">
                                {"El factor generador (Generator Output) varía radicalmente entre marcas y épocas de fabricación. Por ejemplo, un equipo portátil básico requiere hasta un 30% más de mAs que un equipo de sala DR de última generación (GE/Siemens) para obtener el mismo Índice de Exposición (EI) a la placa."}
                            </div>
                        </details>
                        <select value={marcaEquipo} onChange={(e) => setMarcaEquipo(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-zinc-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="1.0">{"GE Healthcare (Definium / Discovery)"}</option>
                            <option value="0.95">{"Siemens Healthineers (Multix / Ysio)"}</option>
                            <option value="1.05">{"Philips (DigitalDiagnost)"}</option>
                            <option value="1.1">{"Carestream (DRX)"}</option>
                            <option value="1.15">{"Shimadzu (RADspeed)"}</option>
                            <option value="1.12">{"Fujifilm (FDR)"}</option>
                            <option value="1.2">{"Agfa (DX-D)"}</option>
                            <option value="1.25">{"Toshiba / Canon (Radrex)"}</option>
                            <option value="1.3">{"Equipo Portátil (Convencional Genérico)"}</option>
                        </select>
                    </div>

                    <div className="mb-4">

                        <details className="group mb-2">
                            <summary className="flex items-center gap-2 cursor-pointer list-none select-none">
                                <span className="block text-sm font-bold text-gray-700">Región Anatómica a Radiografiar</span>
                                <span className="text-gray-400 hover:text-zinc-500 transition-colors" title="Más información">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                </span>
                            </summary>
                            <div className="mt-2 mb-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-gray-600 shadow-inner leading-relaxed">
                                {"Define la constante del equipo y los kVp/mAs base. Los tejidos blandos (tórax) requieren un alto kilovoltaje para penetración y escala de grises larga, mientras que las extremidades requieren foco fino y mayor contraste para trabécula ósea."}
                            </div>
                        </details>
                        <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-zinc-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="torax_pa">{"Tórax PA (Parrilla)"}</option>
                            <option value="torax_lat">{"Tórax Lateral (Parrilla)"}</option>
                            <option value="abdomen_ap">{"Abdomen AP (Parrilla)"}</option>
                            <option value="columna_ap">{"Columna Lumbar AP (Parrilla)"}</option>
                            <option value="columna_lat">{"Columna Lumbar Lateral (Parrilla)"}</option>
                            <option value="pelvis_ap">{"Pelvis AP (Parrilla)"}</option>
                            <option value="craneo_ap">{"Cráneo AP / PA (Parrilla)"}</option>
                            <option value="mano_pa">{"Mano/Muñeca PA (Directo)"}</option>
                            <option value="pie_ap">{"Pie/Tobillo AP (Directo)"}</option>
                            <option value="rodilla_ap">{"Rodilla AP (Parrilla ligera)"}</option>
                        </select>
                    </div>

                    <div className="mb-4">

                        <details className="group mb-2">
                            <summary className="flex items-center gap-2 cursor-pointer list-none select-none">
                                <span className="block text-sm font-bold text-gray-700">Tamaño del Receptor / Chasis (pulgadas)</span>
                                <span className="text-gray-400 hover:text-zinc-500 transition-colors" title="Más información">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                </span>
                            </summary>
                            <div className="mt-2 mb-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-gray-600 shadow-inner leading-relaxed">
                                {"El tamaño físico del campo iluminado (colimación) altera la eficiencia de salida. Colimar estrictamente un área muy pequeña corta radiación dispersa que ayudaría a 'ennegrecer' la placa periférica, requiriendo ligeros ajustes al alza de los valores respecto a chasis más grandes."}
                            </div>
                        </details>
                        <select value={tamanoChasis} onChange={(e) => setTamanoChasis(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-zinc-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="1">{"14 x 17 (35x43 cm) - Tórax/Abdomen Grande"}</option>
                            <option value="0.95">{"14 x 14 (35x35 cm) - Tórax/Cráneo"}</option>
                            <option value="0.9">{"10 x 12 (24x30 cm) - Extremidades/Pediátrico"}</option>
                            <option value="0.85">{"8 x 10 (20x25 cm) - Dedos/Muñeca/Tobillo"}</option>
                        </select>
                    </div>

                    <div className="mb-4">

                        <details className="group mb-2">
                            <summary className="flex items-center gap-2 cursor-pointer list-none select-none">
                                <span className="block text-sm font-bold text-gray-700">Grosor Anatómico Medido con Calibrador (cm)</span>
                                <span className="text-gray-400 hover:text-zinc-500 transition-colors" title="Más información">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                </span>
                            </summary>
                            <div className="mt-2 mb-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-gray-600 shadow-inner leading-relaxed">
                                {"Es indispensable medir físicamente mediante calibrador (pelvímetro) la zona de incidencia en los puntos de contacto. La Regla del 2 de Radiología dicta que por cada centímetro de tejido del paciente, deben sumarse 2 kVp para garantizar constancia de penetración del haz primario de fotones."}
                            </div>
                        </details>
                        <input type="number" value={grosorPaciente} onChange={(e) => setGrosorPaciente(e.target.value)} placeholder="Ej: 22" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-100 transition-all" />
                    </div>

                    <div className="mb-4">

                        <details className="group mb-2">
                            <summary className="flex items-center gap-2 cursor-pointer list-none select-none">
                                <span className="block text-sm font-bold text-gray-700">Uso de Bucky / Parrilla Antidifusora</span>
                                <span className="text-gray-400 hover:text-zinc-500 transition-colors" title="Más información">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                </span>
                            </summary>
                            <div className="mt-2 mb-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-gray-600 shadow-inner leading-relaxed">
                                {"Las láminas de plomo de la parrilla (grid) absorben la dañina radiación dispersa mejorando drásticamente el contraste diagnóstico, a expensas de requerir de 2 a 5 veces mayor cantidad de mAs original en el tubo (Ley Bucky) para compensar la dosis y mantener el EI."}
                            </div>
                        </details>
                        <select value={parrilla} onChange={(e) => setParrilla(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-zinc-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="0">{"Sin Parrilla (Extremidades)"}</option>
                            <option value="2">{"Ratio 5:1 (Baja absorción)"}</option>
                            <option value="3">{"Ratio 8:1 (Estándar)"}</option>
                            <option value="4">{"Ratio 10:1 (Alta absorción)"}</option>
                            <option value="5">{"Ratio 12:1 (Tórax/Abdomen Denso)"}</option>
                        </select>
                    </div>

                    <button onClick={calcular} className="w-full bg-zinc-700 hover:bg-zinc-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Factores de Exposición</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="¿Dudas sobre la densidad radiográfica?"
                    description="Si encuentras densidades anómalas en hueso, confirma con un perfil reumatológico o metabólico óseo completo en nuestro laboratorio."
                    actionText="Ver Perfil Óseo"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Perfil%20Metab%C3%B3lico%20%C3%93seo"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Calculadora Automática de Técnica Radiográfica (Regla de los 2 kVp)"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p dangerouslySetInnerHTML={{ __html: "Esta herramienta está diseñada para Tecnólogos Médicos y Técnicos Radiólogos. Permite calcular el Kilovoltaje pico (kVp) y el Miliamperaje-segundo (mAs) basándose en el grosor real del paciente medido con calibrador (pelvímetro)." }} />
                        <p dangerouslySetInnerHTML={{ __html: "La fórmula base (kVp = [Grosor en cm × 2] + Constante del equipo) es el estándar de oro empírico para establecer una técnica base en radiodiagnóstico convencional. La calculadora compensa exponencialmente el mAs (regla de +/- 20% a 30% por cada 2 cm de tejido blando) y aplica un factor correctivo según la <strong>marca del generador</strong> y el uso correcto del Bucky (relación de la parrilla antidifusora)." }} />
                        <p dangerouslySetInnerHTML={{ __html: "⚠️ <strong>Nota ALARA:</strong> Estos valores son orientativos. Siempre debes priorizar el criterio ALARA (As Low As Reasonably Achievable) y verificar el Índice de Exposición (EI, S-Value o REX) post-disparo de tu sistema CR o DR para evitar la sobre-radiación (creep dose)." }} />
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
