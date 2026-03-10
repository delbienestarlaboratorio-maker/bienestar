'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function PrediccionSexoBebePage() {
    const [ciclo, setCiclo] = useState('28');
    const [furd, setFurd] = useState('');
    const [coito, setCoito] = useState('');
    const [resultado, setResultado] = useState<{ probabilidadM: number; probabilidadF: number; ganador: string; info: string } | null>(null);

    const calcularShettlesYDias = () => {
        if (!furd || !coito) return;

        const fechaFURD = new Date(furd);
        const fechaCoito = new Date(coito);

        // Calcular dia de ovulacion (ciclo - 14)
        const diaOvulacion = parseInt(ciclo) - 14;
        const fechaOvulacion = new Date(fechaFURD);
        fechaOvulacion.setDate(fechaOvulacion.getDate() + diaOvulacion - 1); // aproximado

        // Diferencia en ms
        const difTime = fechaOvulacion.getTime() - fechaCoito.getTime();
        const difDias = Math.round(difTime / (1000 * 3600 * 24));

        let pM = 50;
        let pF = 50;
        let info = '';
        let ganador = '';

        if (difDias > 5 || difDias < -2) {
            info = `Relaciones a ${Math.abs(difDias)} días de la ovulación. Fuera de tu Ventana Fértil clínica. 0% de embarazo.`;
            pM = 0; pF = 0; ganador = 'NINGUNO (Fuera de Ventana Fértil)';
        } else if (difDias > 2 && difDias <= 5) {
            // Lejos de ovulacion -> Femenino (Espermatozoides X son más resistentes)
            pM = 30; pF = 70;
            ganador = '👧 MAYOR PROBABILIDAD DE NIÑA';
            info = `(Teoría de Shettles): Según las fechas registradas (coito ${difDias} días antes de ovular), los espermatozoides X (femeninos) sobreviven más tiempo en el moco cervical hostil ácido, mientras que los Y (masculinos) más rápidos, ya han muerto.`;
        } else if (difDias >= 0 && difDias <= 2) {
            // Cerca de ovulacion -> Masculino (Espermatozoides Y son más rápidos)
            pM = 75; pF = 25;
            ganador = '👦 MAYOR PROBABILIDAD DE NIÑO';
            info = `(Teoría de Shettles): El coito ocurrió exactamente dentro de las 48 horas cercanas al pico ovulatorio de HL. Los espermatozoides Y (masculinos) son microscópicamente más ligeros y nadan más rápido en un ambiente alcalino, llegando al óvulo antes que los femeninos.`;
        } else {
            // Post ovulación
            pM = 50; pF = 50;
            ganador = '🤷 INCIERTO / MITAD';
            info = 'Ovulación finalizada, muy difícil predecir una predominancia cromosómica. Es 50/50 estadísticamente.';
        }

        setResultado({ probabilidadM: pM, probabilidadF: pF, ganador, info });
    };

    return (
        <main className="min-h-screen bg-pink-50 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-600 via-fuchsia-600 to-indigo-600 py-12 px-4 shadow-inner">
                <div className="max-w-4xl mx-auto">
                    <Link href="/herramientas" className="text-white hover:text-pink-200 text-sm mb-4 inline-block font-medium transition-colors">
                        ← Regresar a Calculadoras Médicas
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
                        👶 Predictor del Sexo del Bebé
                    </h1>
                    <p className="text-xl text-pink-100 font-light max-w-2xl">
                        Calculadora basada en la Ventana Fértil Óvulo-Espermática y la controvertida Teoría Cromosómica de Shettles.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 -mt-8">
                {/* Calculator Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8 md:p-12 mb-10 relative z-10 w-full overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Duración de tu Ciclo (días)</label>
                            <input type="number" value={ciclo} onChange={e => setCiclo(e.target.value)} className="w-full px-4 py-3 border-2 border-pink-100 rounded-xl focus:border-pink-500 outline-none text-xl font-bold bg-pink-50/30" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">1er Día Vida Menstrual (FUR)</label>
                            <input type="date" value={furd} onChange={e => setFurd(e.target.value)} className="w-full px-4 py-3 border-2 border-pink-100 rounded-xl focus:border-pink-500 outline-none text-xl font-bold font-sans" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Día exacto del coito / intimidad</label>
                            <input type="date" value={coito} onChange={e => setCoito(e.target.value)} className="w-full px-4 py-3 border-2 border-indigo-100 rounded-xl focus:border-indigo-500 outline-none text-xl font-bold font-sans" />
                        </div>
                    </div>

                    <button onClick={calcularShettlesYDias}
                        className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-1">
                        Predecir Sexología Cromosómica
                    </button>

                    {resultado && (
                        <div className="mt-10 animate-in fade-in duration-700">
                            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
                                <p className="text-xl font-black mb-6">{resultado.ganador}</p>

                                {resultado.probabilidadM > 0 && (
                                    <div className="flex w-full h-8 rounded-full overflow-hidden mb-6 shadow-md border border-gray-200">
                                        <div style={{ width: `${resultado.probabilidadF}%` }} className="bg-pink-400 flex items-center justify-center text-xs font-bold text-white transition-all duration-1000">Niña {resultado.probabilidadF}%</div>
                                        <div style={{ width: `${resultado.probabilidadM}%` }} className="bg-blue-400 flex items-center justify-center text-xs font-bold text-white transition-all duration-1000">Niño {resultado.probabilidadM}%</div>
                                    </div>
                                )}

                                <p className="text-gray-700 text-lg font-medium leading-relaxed bg-gray-50 border border-gray-100 p-6 rounded-2xl italic">
                                    {resultado.info}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🤰 Guía Perinatal: Predicción de Sexo Fetal Analítica</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Score de predicción biológica u del sexo O inmensa fetal o general basa U y o U su Inmenso u de probabilidad en datos O a y Inmenso etnográficos O de u U u en el genoma y la edad en Inmenso al u u inmensurable al O de U O general y en U la concepción al O o Inmenso del de la madre.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Control del Embarazo Sanguíneo</h3>
       <ul>
           <li><a href="/estudios/perfiles/marcadores-tumorales-femenino" className="text-blue-600 font-semibold hover:underline">Fracción Beta, Prueba de Embarazo Sanguínea</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-10" />

                {/* SEO Visible Information Block */}
                <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-10 p-8 md:p-12">
                    <h2 className="text-3xl font-extrabold text-pink-900 mb-6 flex items-center gap-3">
                        <span className="text-4xl">🧬</span> Ginecología: La Ciencia Detrás de Predecir el Sexo de tu Bebé
                    </h2>

                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                        <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-indigo-700 first-letter:float-left first-letter:mr-3">
                            Desde el calendario Maia, la tabla China hasta técnicas caseras no validadas con repollo morado, la humanidad ha tratado de predecir el sexo de los recién nacidos durante milenios. Médicamente y cromosómicamente, el sexo del embrión se decide en la fracción de un segundo: durante la **Fecundación Zygótica del Óvulo en la trompa de Falopio**. El hombre posee espermatozoides X (futura mujer) y espermatozoides Y (futuro hombre).
                        </p>

                        <div className="bg-fuchsia-50/50 p-6 rounded-2xl border border-fuchsia-100 my-8">
                            <h3 className="text-xl font-bold text-fuchsia-900 mb-3 block">El Método de Landrum Shettles (1960s)</h3>
                            <p>
                                En los años 60, el Dr. Landrum Shettles popularizó un algoritmo basado en la morfología de los espermatozoides. Argumentó microscópicamente que el <strong>espermatozoide Y (Niño)</strong> tiene la cabeza más pequeña, carece de peso extra, nada extremadamente rápido, pero muere rápidamente al estar agotado. Por otro lado, el <strong>espermatozoide X (Niña)</strong> es ovalado, carga más peso cromosómico que lo hace nadar lento, pero puede sobrevivir encapsulado en el cuello uterino hasta por 5 asombrosos días esperando a que baje el óvulo.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                            <div className="bg-pink-50 p-6 rounded-2xl border-2 border-pink-200 shadow-sm">
                                <h3 className="text-xl font-bold text-pink-800 mb-2">Para Concebir una Niña</h3>
                                <p className="text-sm">Según la teoría (no 100% probada por ginecología moderna), si tienes actividad coital unos 3 o 4 días <strong>antes de la ovulación</strong>, los espermatozoides Y masculinos se destruirán por la acidez del pH vaginal, dejando solo un ejército de espermas femeninos (X) vivos rodeando el óvulo el día en que este sea liberado.</p>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200 shadow-sm">
                                <h3 className="text-xl font-bold text-blue-800 mb-2">Para Concebir un Niño</h3>
                                <p className="text-sm text-gray-800">El método requiere usar tiras reactivas de LH de la farmacia o medir la temperatura basal de manera obsesiva. Al detectar que la ovulación está ocurriendo <strong>esa misma tarde</strong>, se recomienda la relación sexual asegurando la penetración más profunda posible, depositando los espermatozoides Y súper-veloces directo a la meta.</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-2xl my-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">La Realidad Clínica Contemporánea del Siglo XXI</h3>
                            <p>
                                Ningún calendario de "calculadoras online" reemplaza años de evolución genética ni puede batir un 50/50 por ciento de puro azar estadístico. A nivel científico irrefutable (con 99.8% de precisión), el sexo de tu bebé puede revelarse a las **10 semanas de embarazo con una prueba de ADN Fetal en Sangre Materna (NIPT)** o a las 18-20 semanas con un ultrasonido morfológico anatómico de alta resolución (viendo el falo o labios mayores).
                            </p>
                        </div>
                    </div>
                </section>

                <StudyCTA
                    title="¿Estás embarazada y no quieres esperar 5 meses para el Ultrasonido?"
                    description="Tenemos la prueba genética NIPT en sangre que detecta los micro-fragmentos del ADN de tu bebé navegando en tus venas, indicándote su género con 99.8% de precisión y descartando Síndrome de Down desde la SEMANA 10."
                    actionText="Cotizar Prueba de Sangre ADN Fetal (Sexo del Bebé)"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20saber%20qué%20precio%20tiene%20la%20prueba%20Genética%20de%20ADN%20Fetal%20NIPT."
                    type="estudio"
                />
            </div>
        </main>
    );
}
