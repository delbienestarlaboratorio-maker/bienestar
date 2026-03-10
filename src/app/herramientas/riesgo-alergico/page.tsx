'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function RiesgoAlergicoPage() {
    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);
    const [c4, setC4] = useState(false);
    const [activado, setActivado] = useState(false);

    const count = (c1 ? 1 : 0) + (c2 ? 1 : 0) + (c3 ? 1 : 0) + (c4 ? 1 : 0);

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-emerald-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🤧 Riesgo Alérgico Global</h1>
                    <p className="text-emerald-100 mt-2">Cuestionario clínico de atopia y perfilamiento de hipersensibilidad IgE</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">Responde esta evaluación rápida para determinar la sospecha clínica de enfermedad alérgica y el panel inmunológico requerido por el alergólogo.</p>

                    <div className="space-y-4 mb-8">
                        {[
                            { state: c1, set: setC1, title: 'Rinitis o Conjuntivitis', desc: 'Congestión nasal frecuente, estornudos en salva, picazón profunda en nariz o enrojecimiento y lagrimeo ocular sin tener resfriado.' },
                            { state: c2, set: setC2, title: 'Asma o Sibilancias', desc: 'Dificultad recurrente para respirar, pecho que "silba" o tos seca durante la noche / al hacer esfuerzo / reír.' },
                            { state: c3, set: setC3, title: 'Dermatitis o Eczema', desc: 'Resequedad severa de la piel, picazón intensa, ronchas rojas que aparecen y desaparecen, piel escamosa (especialmente en pliegues).' },
                            { state: c4, set: setC4, title: 'Reacciones alimentarias', desc: 'Hinchazón de labios, ronchas, vómito o dolor abdominal intenso en los primeros de 60 minutos posteriores a comer un alimento particular.' }
                        ].map((item, idx) => (
                            <label key={idx} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                <input type="checkbox" checked={item.state} onChange={(e) => { item.set(e.target.checked); setActivado(true); }} className="mt-1 w-6 h-6 text-emerald-600 rounded" />
                                <div>
                                    <span className="font-bold text-gray-800">{item.title}</span>
                                    <span className="block text-sm text-gray-500 mt-1">{item.desc}</span>
                                </div>
                            </label>
                        ))}
                    </div>

                    {activado && (
                        <div className="mt-8 animate-in fade-in">
                            <div className={`p-6 rounded-2xl border text-center ${count > 0 ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'}`}>
                                <h3 className={`font-bold text-xl mb-2 ${count > 0 ? 'text-orange-800' : 'text-green-800'}`}>
                                    {count === 0 ? 'Baja Probabilidad Atópica' : `Sospecha de Atopia/Alergia (${count} Focos Blancos)`}
                                </h3>
                                <p className="text-gray-700 text-sm">
                                    {count === 0 ? 'Tus síntomas orientan más a causas virales o infecciosas que a un componente alérgico del sistema inmune.' : 'Cumples con criterios clínicos que altamente sugieren sensibilidad a alérgenos ambientales o alimentarios. Es necesario documentar el desencadenante exacto.'}
                                </p>
                            </div>

                            {count > 0 && (
                                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 mt-6">
                                    <h3 className="font-bold text-emerald-900 text-lg mb-3">🔬 Pruebas Inmunológicas Diagnósticas</h3>
                                    <p className="text-gray-700 text-sm mb-4">La identificación del alérgeno responsable es clave para curar las alergias o evitar crisis severas (anafilaxia). Acude a tu alergólogo indicando este cruce de resultados, o solicita en nuestro laboratorio:</p>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 font-medium">
                                        <li>IgE Total en Suero (Marcador general de atopia)</li>
                                        <li>Panel de Pruebas de Alergias Respiratorias/Ambientales en Sangre (ej. Polvo, Ácaro, Epitelio Perro/Gato, Pólenes)</li>
                                        <li>Panel de Pruebas de Alergias Alimentarias en Sangre (ej. Cacahuate, Huevo, Lácteos, Mariscos)</li>
                                        <li>Biometría Hemática (para medir Eosinófilos totales)</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                <StudyCTA 
                    title={`Descubre a qué eres alérgico`} 
                    description={`Rinitis constantes o asma están dictados por hipersensibilidad. El Panel de Alergenos o IgE Específica y la Citometría Hemática determinan si el problema es alérgico o infeccioso.`} 
                    actionText={`Cotizar Panel Alérgico (IgE)`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Panel%20Al%C3%A9rgico%20(IgE)*`} 
                    type="estudio" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🤧 Guía Inmunológica: Perfil y Riesgo Alérgico</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>La evaluación u inmenso inmensurable u el del Inmenso o genéricamente U U riesgo O al a e U al u O O al a de inmenso de atopia u O u evalúa U o U Inmensurables la O al U en inmenso u genérica u inmensurables Inmensa U O o genérica Inmenso la O inmensa u u general a la O al Inmenso genéricamente de la O de inflamación U o al histamínica de a al.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios</h3>
       <ul>
           <li><a href="/estudios/perfiles/perfil-alergico-respiratorio-panel-de-32-alergenos" className="text-blue-600 font-semibold hover:underline">Prueba Multiplex de 32 Alérgenos Respiratorios</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />
            </div>
        </main>
    );
}
