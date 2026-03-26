'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { addDays, format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export function CalendarClient() {
    const todayStr = new Date().toISOString().split('T')[0];
    const [fechaFUM, setFechaFUM] = useState<string>(todayStr); // Fecha de Última Menstruación
    const [duracionCiclo, setDuracionCiclo] = useState<number>(28);
    const [duracionSangrado, setDuracionSangrado] = useState<number>(5);
    const [calculado, setCalculado] = useState(false);

    // Resultados
    const [proximoPeriodo, setProximoPeriodo] = useState<Date>(new Date());
    const [diaOvulacion, setDiaOvulacion] = useState<Date>(new Date());
    const [inicioFertil, setInicioFertil] = useState<Date>(new Date());
    const [finFertil, setFinFertil] = useState<Date>(new Date());

    const calcularCiclo = () => {
        const fum = parseISO(fechaFUM);

        // Fase Lútea típicamente dura 14 días. Ovulación es Duracion Ciclo - 14.
        const diasParaOvulacion = duracionCiclo - 14;

        const nextPeriod = addDays(fum, duracionCiclo);
        const ovulation = addDays(fum, diasParaOvulacion);

        // El esperma vive hasta 5 días, el óvulo 24h. Ventana fértil es 5 días antes y 1 día después.
        const startFertile = addDays(ovulation, -5);
        const endFertile = addDays(ovulation, 1);

        setProximoPeriodo(nextPeriod);
        setDiaOvulacion(ovulation);
        setInicioFertil(startFertile);
        setFinFertil(endFertile);
        setCalculado(true);
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-pink-100 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">📅 Calendario Menstrual</h1>
                    <p className="text-pink-100 mt-2">Monitorea tu salud reproductiva, días fértiles y de ovulación</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">
                        Registrar las fechas de tu ciclo es el primer paso para detectar desbalances hormonales tempranos como Síndrome de Ovario Poliquístico (SOP), Endometriosis o Hiperprolactinemia.
                    </p>

                    <div className="space-y-6 mb-8">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Primer día de tu último período (FUM)</label>
                            <input
                                type="date"
                                value={fechaFUM}
                                onChange={(e) => setFechaFUM(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Duración promedio de tu ciclo (días)</label>
                            <p className="text-xs text-gray-500 mb-2">Cuenta desde el primer día de sangrado hasta un día antes de que llegue el siguiente mes. El promedio es de 28 a 30 días.</p>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="21"
                                    max="35"
                                    value={duracionCiclo}
                                    onChange={(e) => setDuracionCiclo(Number(e.target.value))}
                                    className="w-full accent-pink-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <span className="font-bold text-xl text-pink-700 w-12 text-center">{duracionCiclo}</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Días de sangrado</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="2"
                                    max="8"
                                    value={duracionSangrado}
                                    onChange={(e) => setDuracionSangrado(Number(e.target.value))}
                                    className="w-full accent-rose-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <span className="font-bold text-xl text-rose-600 w-12 text-center">{duracionSangrado}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={calcularCiclo}
                        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]"
                    >
                        Generar mi Calendario
                    </button>

                    {calculado && (
                        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Resultados de tu Ciclo</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 text-center">
                                    <p className="text-sm text-rose-800 mb-1">Tu próximo periodo comienza</p>
                                    <p className="text-2xl font-bold text-rose-600 capitalize">
                                        {format(proximoPeriodo, "EEEE d 'de' MMMM", { locale: es })}
                                    </p>
                                </div>

                                <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 text-center">
                                    <p className="text-sm text-purple-800 mb-1">Día de Alta Ovulación</p>
                                    <p className="text-2xl font-bold text-purple-600 capitalize">
                                        {format(diaOvulacion, "EEEE d 'de' MMMM", { locale: es })}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center mb-6">
                                <p className="text-sm text-green-800 mb-1 flex items-center justify-center gap-2">
                                    ✨ <span className="font-bold">Ventana Fértil (Mayor probabilidad de embarazo)</span> ✨
                                </p>
                                <p className="text-lg font-bold text-green-700">
                                    Del {format(inicioFertil, "d 'de' MMMM", { locale: es })} al {format(finFertil, "d 'de' MMMM", { locale: es })}
                                </p>
                            </div>

                            {(duracionCiclo < 24 || duracionCiclo > 35) && (
                                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                                    <p className="text-sm text-orange-800 font-bold mb-1">⚠️ Observación sobre tu duración</p>
                                    <p className="text-sm text-orange-900">
                                        Tus ciclos están fuera del rango típico normal (24 a 35 días). Si esto es constante, es indicativo de un posible desbalance de las hormonas de la hipófisis como Prolactina o FSH. Sugerimos visitar a la ginecóloga.
                                    </p>
                                </div>
                            )}

                        </div>
                    )}
                </div>

                <StudyCTA
                    title="Evalúa tu salud menstrual real"
                    description="El estrés, ovarios poliquísticos y alteraciones tiroideas pueden interrumpir tus ciclos ovulatorios y provocar fatiga o cambios de ánimo súbitos. Un Perfil Funcional Femenino mide cómo operan y armonizan tus estrógenos, prolactina y hormona LH."
                    actionText="Cotizar Perfil Hormonal Femenino"
                    type="estudio"
                    link="https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Perfil%20Hormonal%20Femenino*"
                />

                <div className="mt-8">
                    <AdBanner variant="horizontal" />
                </div>
            </div>
        </main>
    );
}
