'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function CompatibilidadSanguineaPage() {
    const [madre, setMadre] = useState('O-');
    const [padre, setPadre] = useState('O+');
    const [resultado, setResultado] = useState<{ hijosPosibles: string[]; riesgoRh: boolean; donacion: string; recepcion: string } | null>(null);

    const calcularCompatibilidad = () => {
        // Lógica simplificada de herencia Mendeliana para ABO y Rh
        const tipoM = madre.slice(0, -1);
        const rhM = madre.slice(-1);
        const tipoP = padre.slice(0, -1);
        const rhP = padre.slice(-1);

        let hijosABO: string[] = [];

        // Combinaciones ABO
        if (tipoM === 'O' && tipoP === 'O') hijosABO = ['O'];
        else if ((tipoM === 'A' && tipoP === 'O') || (tipoM === 'O' && tipoP === 'A')) hijosABO = ['A', 'O'];
        else if ((tipoM === 'B' && tipoP === 'O') || (tipoM === 'O' && tipoP === 'B')) hijosABO = ['B', 'O'];
        else if (tipoM === 'A' && tipoP === 'A') hijosABO = ['A', 'O'];
        else if (tipoM === 'B' && tipoP === 'B') hijosABO = ['B', 'O'];
        else if ((tipoM === 'A' && tipoP === 'B') || (tipoM === 'B' && tipoP === 'A')) hijosABO = ['A', 'B', 'AB', 'O'];
        else if ((tipoM === 'AB' && tipoP === 'O') || (tipoM === 'O' && tipoP === 'AB')) hijosABO = ['A', 'B'];
        else if ((tipoM === 'AB' && tipoP === 'A') || (tipoM === 'A' && tipoP === 'AB')) hijosABO = ['A', 'B', 'AB'];
        else if ((tipoM === 'AB' && tipoP === 'B') || (tipoM === 'B' && tipoP === 'AB')) hijosABO = ['A', 'B', 'AB'];
        else if (tipoM === 'AB' && tipoP === 'AB') hijosABO = ['A', 'B', 'AB'];

        let hijosRh: string[] = [];
        if (rhM === '-' && rhP === '-') hijosRh = ['-'];
        else if (rhM === '+' && rhP === '-') hijosRh = ['+', '-'];
        else if (rhM === '-' && rhP === '+') hijosRh = ['+', '-'];
        else if (rhM === '+' && rhP === '+') hijosRh = ['+', '-'];

        const hijosPosibles = hijosABO.flatMap(abo => hijosRh.map(rh => `${abo}${rh}`));

        // Riesgo de Incompatibilidad Rh (Eritroblastosis fetal)
        const riesgoRh = rhM === '-' && (rhP === '+' || hijosRh.includes('+'));

        // Transfusión para la Madre
        let donacion = '';
        let recepcion = '';

        if (madre === 'O-') { donacion = 'A todos (Donante Universal)'; recepcion = 'Solo de O-'; }
        if (madre === 'O+') { donacion = 'O+, A+, B+, AB+'; recepcion = 'O+, O-'; }
        if (madre === 'A-') { donacion = 'A+, A-, AB+, AB-'; recepcion = 'A-, O-'; }
        if (madre === 'A+') { donacion = 'A+, AB+'; recepcion = 'A+, A-, O+, O-'; }
        if (madre === 'B-') { donacion = 'B+, B-, AB+, AB-'; recepcion = 'B-, O-'; }
        if (madre === 'B+') { donacion = 'B+, AB+'; recepcion = 'B+, B-, O+, O-'; }
        if (madre === 'AB-') { donacion = 'AB+, AB-'; recepcion = 'AB-, A-, B-, O-'; }
        if (madre === 'AB+') { donacion = 'Solo a AB+'; recepcion = 'De TODOS (Receptor Universal)'; }

        // Quitar duplicados
        const uniqueHijos = Array.from(new Set(hijosPosibles));

        setResultado({
            hijosPosibles: uniqueHijos,
            riesgoRh,
            donacion,
            recepcion
        });
    };

    const tiposSangre = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-700 to-red-900 py-12 px-4 shadow-inner">
                <div className="max-w-4xl mx-auto">
                    <Link href="/herramientas" className="text-red-200 hover:text-white text-sm mb-4 inline-block font-medium transition-colors">
                        ← Regresar a Calculadoras Médicas
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
                        🩸 Simulador de Genética y Compatibilidad Sanguínea
                    </h1>
                    <p className="text-xl text-red-100 font-light max-w-2xl">
                        Averigua el posible tipo de sangre de tus hijos y el riesgo de Sensibilización Rh en el embarazo usando las leyes de Mendel.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 -mt-8">
                {/* Calculator Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 mb-10 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                TIPO DE SANGRE (PERSONA 1 / MADRE)
                            </label>
                            <select value={madre} onChange={(e) => setMadre(e.target.value)}
                                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none text-xl text-gray-800 transition-all font-bold bg-white cursor-pointer appearance-none">
                                {tiposSangre.map(t => <option key={`m-${t}`} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                TIPO DE SANGRE (PERSONA 2 / PADRE)
                            </label>
                            <select value={padre} onChange={(e) => setPadre(e.target.value)}
                                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none text-xl text-gray-800 transition-all font-bold bg-white cursor-pointer appearance-none">
                                {tiposSangre.map(t => <option key={`p-${t}`} value={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>

                    <button onClick={calcularCompatibilidad}
                        className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-1">
                        Analizar Genética Sanguínea
                    </button>

                    {/* Result */}
                    {resultado && (
                        <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 shadow-inner">
                                <h3 className="text-2xl font-black text-red-900 mb-6 text-center">Predicción de Herencia (Hijos Posibles)</h3>

                                <div className="flex flex-wrap justify-center gap-4 mb-8">
                                    {resultado.hijosPosibles.map(hijo => (
                                        <div key={hijo} className="bg-white border-2 border-red-500 rounded-full h-20 w-20 flex items-center justify-center text-2xl font-black text-red-700 shadow-md">
                                            {hijo}
                                        </div>
                                    ))}
                                </div>

                                {resultado.riesgoRh ? (
                                    <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded-r-lg mb-6">
                                        <p className="text-orange-900 font-bold flex items-center gap-2">
                                            <span>⚠️</span> ALERTA DE EMBARAZO: RIESGO DE INCOMPATIBILIDAD Rh
                                        </p>
                                        <p className="text-orange-800 text-sm mt-1">
                                            La madre es factor Rh Negativo y el padre Positivo. El sistema inmune de la madre podría atacar los glóbulos rojos del feto. Requerirá la inyección de inmunoglobulina anti-D (Rhogam) alrededor de la semana 28.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
                                        <p className="text-green-900 font-bold">✅ Sin Riesgo de Incompatibilidad Rh severa detectado.</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-red-200">
                                    <div>
                                        <p className="text-sm font-bold tracking-widest uppercase text-red-600 mb-2">La Persona 1 ({madre}) puede Donar a:</p>
                                        <p className="text-gray-800 font-medium bg-white px-4 py-2 rounded-lg">{resultado.donacion}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold tracking-widest uppercase text-red-600 mb-2">La Persona 1 ({madre}) Recibe de:</p>
                                        <p className="text-gray-800 font-medium bg-white px-4 py-2 rounded-lg">{resultado.recepcion}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Ad Banner */}
                <AdBanner variant="horizontal" className="mb-10" />

                {/* SEO Visible Information Block */}
                <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-10 p-8 md:p-12">
                    <h2 className="text-3xl font-extrabold text-red-900 mb-6 flex items-center gap-3">
                        <span className="text-4xl">🧬</span> Genética Sanguínea: ¿Cómo se heredan los Grupos ABO y Rh?
                    </h2>

                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                        <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-red-700 first-letter:float-left first-letter:mr-3">
                            La sangre humana se clasifica en miles de fenotipos, pero clínicamente los dos sistemas más importantes para la supervivencia en caso de transfusiones o embarazo son el <strong>Sistema ABO</strong> y el <strong>Factor Rh (Rhesus)</strong>. Entender tu tipo de sangre no es solo una curiosidad biológica, es una información vital de seguridad.
                        </p>

                        <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100 my-8">
                            <h3 className="text-xl font-bold text-red-800 mb-3 block">Bases del Sistema Inmunológico Sanguíneo</h3>
                            <p>
                                Los tipos de sangre A, B y O se diferencian por los **antígenos** (proteínas con azúcares adjuntos) que se encuentran en la superficie de los glóbulos rojos (eritrocitos).
                                - Sangre Tipo A tiene antígenos A.
                                - Sangre Tipo B tiene antígenos B.
                                - Sangre Tipo AB tiene ambos (Receptor Universal).
                                - Sangre Tipo O no tiene ninguno (Donante Universal).
                                Tu cuerpo produce naturalmente potentes **anticuerpos** contra cualquier antígeno que no poseas. Si te inyectan sangre de un tipo incompatible, tus anticuerpos atacarán la sangre extraña causando hemólisis aguda, insuficiencia renal e incluso la muerte.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                                <h3 className="text-xl font-bold text-blue-900 mb-2">Herencia Mendeliana</h3>
                                <p className="text-sm">Heredas un gen para el tipo de sangre de tu padre y otro de tu madre. Los genes A y B son <strong>codominantes</strong> (ambos se expresan), mientras que el gen O es <strong>recesivo</strong>. Esto significa que dos padres tipo A pueden tener un hijo tipo O genéticamente (si ambos eran portadores Ao).</p>
                            </div>
                            <div className="bg-orange-50 p-6 rounded-2xl border-2 border-orange-500 shadow-md">
                                <h3 className="text-xl font-bold text-orange-900 mb-2">Enfermedad Hemolítica del Recién Nacido</h3>
                                <p className="text-sm text-gray-800">Conocida como Eritroblastosis fetal. Ocurre cuando el Factor Rh de la madre es Negativo (-) y el bebé es Positivo (+). El cuerpo de la madre crea defensas que cruzan la placenta y destruyen la sangre del bebé. Esto se previene inyectando Inmunoglobulina Anti-D en la semana 28 del embarazo.</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-2xl my-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Tipos de Sangre Especiales (Grupos Raros)</h3>
                            <ul className="list-none space-y-2">
                                <li className="flex gap-2"><span className="text-gray-500 font-bold">»</span> <strong>Sangre Dorada (Rh Null):</strong> Sus glóbulos rojos no tienen absolutamente ningún antígeno Rh. Hay menos de 50 personas documentadas en el mundo. Son donantes universales hiper-valiosos, pero casi no pueden recibir sangre de nadie.</li>
                                <li className="flex gap-2"><span className="text-gray-500 font-bold">»</span> <strong>Fenotipo Bombay (Oh):</strong> Genéticamente aparentan ser tipo O, pero carecen del "Antígeno H" precursor. Si reciben sangre Tipo O normal, sufrirán un choque hemolítico letal.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <StudyCTA
                    title="¿Conoces científicamente tu tipo de sangre?"
                    description="Si planeas embarazarte, solicitar tu Grupo Sanguíneo y Factor Rh oficial es el primer paso obligatorio. Acudir al laboratorio certificado te evitará sorpresas."
                    actionText="Cotizar Grupo Sanguíneo y Factor Rh"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20saber%20qué%20precio%20tiene%20la%20prueba%20de%20Grupo%20Sanguineo%20y%20Factor%20Rh."
                    type="estudio"
                />
            </div>
        </main>
    );
}
