'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function RiesgoPreeclampsiaPage() {
    const [mayores, setMayores] = useState<string[]>([]);
    const [menores, setMenores] = useState<string[]>([]);
    const [resultado, setResultado] = useState(false);

    const toggleMayor = (id: string) => {
        setMayores(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
        setResultado(true);
    };

    const toggleMenor = (id: string) => {
        setMenores(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
        setResultado(true);
    };

    const altoRiesgo = mayores.length >= 1 || menores.length >= 2;

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-pink-700 to-rose-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-pink-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🤰 Riesgo de Preeclampsia</h1>
                    <p className="text-pink-100 mt-2">Evaluación clínica en el primer trimestre (ACOG / USPSTF)</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">Esta herramienta evalúa los factores clínicos para determinar si la paciente embarazada tiene un alto riesgo de desarrollar preeclampsia y si es candidata a profilaxis con aspirina a dosis bajas.</p>

                    <h3 className="font-bold text-pink-900 border-b pb-2 mb-4">Factores de Alto Riesgo (1 factor = Alto Riesgo)</h3>
                    <div className="space-y-3 mb-8">
                        {[
                            { id: 'm1', label: 'Antecedente de Preeclampsia en embarazo previo' },
                            { id: 'm2', label: 'Embarazo Múltiple (gemelas, trillizas, etc.)' },
                            { id: 'm3', label: 'Hipertensión Crónica diagnosticada' },
                            { id: 'm4', label: 'Diabetes Tipo 1 o Tipo 2 pregestacional' },
                            { id: 'm5', label: 'Enfermedad Renal Crónica' },
                            { id: 'm6', label: 'Enfermedad Autoinmune (Lupus, Síndrome Antifosfolípido)' }
                        ].map(f => (
                            <label key={f.id} className="flex items-center gap-3 p-3 border border-pink-100 rounded-lg cursor-pointer hover:bg-pink-50 transition-colors">
                                <input type="checkbox" checked={mayores.includes(f.id)} onChange={() => toggleMayor(f.id)} className="w-5 h-5 text-pink-700 rounded" />
                                <span className="text-gray-800 font-medium">{f.label}</span>
                            </label>
                        ))}
                    </div>

                    <h3 className="font-bold text-gray-700 border-b pb-2 mb-4">Factores de Riesgo Moderado (2 factores = Alto Riesgo)</h3>
                    <div className="space-y-3 mb-8">
                        {[
                            { id: 'n1', label: 'Nuliparidad (Primer embarazo)' },
                            { id: 'n2', label: 'Obesidad (IMC > 30)' },
                            { id: 'n3', label: 'Historia familiar de Preeclampsia (Madre o Hermana)' },
                            { id: 'n4', label: 'Edad Materna Avanzada (≥ 35 años)' },
                            { id: 'n5', label: 'Características socio-demográficas (Raza negra, bajo nivel socioeconómico)' },
                            { id: 'n6', label: 'Factores personales (Intervalo > 10 años desde el último embarazo o Fertilización in vitro)' }
                        ].map(f => (
                            <label key={f.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <input type="checkbox" checked={menores.includes(f.id)} onChange={() => toggleMenor(f.id)} className="w-5 h-5 text-gray-700 rounded" />
                                <span className="text-gray-800 font-medium">{f.label}</span>
                            </label>
                        ))}
                    </div>

                    {resultado && (
                        <div className="mt-8 animate-in fade-in">
                            <div className={`rounded-2xl p-6 text-center mb-6 border ${altoRiesgo ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                                <p className="text-4xl mb-2">{altoRiesgo ? '⚠️' : '✅'}</p>
                                <p className={`text-xl font-bold ${altoRiesgo ? 'text-red-700' : 'text-green-700'}`}>
                                    {altoRiesgo ? 'Alto Riesgo de Preeclampsia' : 'Bajo Riesgo Clínico'}
                                </p>
                                {altoRiesgo && (
                                    <p className="text-red-600 font-medium mt-2 text-sm">Recomendación médica general (USPSTF): Aspirina profiláctica a dosis bajas (81mg-150mg) a partir de la semana 12 y monitorización estrecha.</p>
                                )}
                            </div>

                            <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-6">
                                <h3 className="font-bold text-pink-900 text-lg mb-3">🔬 Monitoreo de Laboratorio</h3>
                                <p className="text-gray-700 text-sm mb-4">Estudios esenciales para detectar daños orgánicos tempranos en la preeclampsia:</p>
                                <div className="space-y-3">
                                    {[
                                        { name: 'Ácido Úrico en Suero', reason: 'Un aumento constante precede a la hipertensión gestacional' },
                                        { name: 'Creatinina y Urea', reason: 'Evaluación rápida de la función renal materna' },
                                        { name: 'Depuración de Proteínas en Orina de 24h', reason: 'Estándar de oro para el diagnóstico de preeclampsia proteinuria' },
                                        { name: 'Biometría Hemática + Plaquetas', reason: 'Para descartar Síndrome de HELLP (Plaquetopenia)' }
                                    ].map((study) => (
                                        <div key={study.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
                                            <span className="text-pink-600 mt-1">✓</span>
                                            <div>
                                                <p className="font-semibold text-gray-800 text-sm">{study.name}</p>
                                                <p className="text-gray-500 text-xs">{study.reason}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <StudyCTA 
                    title={`Monitoreo Perinatal Seguro`} 
                    description={`La presión alta en el embarazo es riesgosa. Deben llevarse rutinariamente Examen General de Orina (EGO) y Química Sanguínea para detectar proteínas que indiquen preeclampsia.`} 
                    actionText={`Cotizar Control Prenatal`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Control%20Prenatal*`} 
                    type="checkup" 
                />
                <AdBanner variant="horizontal" className="mb-8" />
            </div>
        </main>
    );
}
