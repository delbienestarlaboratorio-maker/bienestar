'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

const preguntas = [
    { id: 'edad', text: '¿Cuántos años tiene?', options: [{ v: 0, l: 'Menos de 45' }, { v: 2, l: '45-54 años' }, { v: 3, l: '55-64 años' }, { v: 4, l: 'Más de 64 años' }] },
    { id: 'imc', text: '¿Cuál es su IMC aproximado?', options: [{ v: 0, l: 'Menos de 25 (normal)' }, { v: 1, l: '25-30 (sobrepeso)' }, { v: 3, l: 'Más de 30 (obesidad)' }] },
    { id: 'cintura', text: '¿Perímetro de cintura?', options: [{ v: 0, l: 'Hombre <94cm / Mujer <80cm' }, { v: 3, l: 'Hombre 94-102cm / Mujer 80-88cm' }, { v: 4, l: 'Hombre >102cm / Mujer >88cm' }] },
    { id: 'actividad', text: '¿Realiza 30+ min de actividad física diaria?', options: [{ v: 0, l: 'Sí' }, { v: 2, l: 'No' }] },
    { id: 'frutas', text: '¿Come frutas/verduras diariamente?', options: [{ v: 0, l: 'Sí, todos los días' }, { v: 1, l: 'No todos los días' }] },
    { id: 'hta', text: '¿Le han recetado medicamentos para presión alta?', options: [{ v: 0, l: 'No' }, { v: 2, l: 'Sí' }] },
    { id: 'glucosa', text: '¿Le han encontrado glucosa alta alguna vez?', options: [{ v: 0, l: 'No' }, { v: 5, l: 'Sí' }] },
    { id: 'familia', text: '¿Algún familiar directo tiene diabetes?', options: [{ v: 0, l: 'No' }, { v: 3, l: 'Sí (abuelo, tío, primo)' }, { v: 5, l: 'Sí (padre, madre, hermano, hijo)' }] },
];

export default function RiesgoDiabetesPage() {
    const [respuestas, setRespuestas] = useState<Record<string, number>>({});
    const [resultado, setResultado] = useState<number | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const calcular = () => { if (Object.keys(respuestas).length < preguntas.length) return; setResultado(Object.values(respuestas).reduce((a, b) => a + b, 0)); };
    const setR = (id: string, v: number) => setRespuestas(prev => ({ ...prev, [id]: v }));

    const getRiesgo = (s: number) => {
        if (s < 7) return { label: 'Riesgo Bajo', color: 'text-green-600', bg: 'bg-green-100', desc: '1 de cada 100 personas con este puntaje desarrollará diabetes en 10 años.' };
        if (s < 12) return { label: 'Riesgo Ligeramente Elevado', color: 'text-yellow-600', bg: 'bg-yellow-100', desc: '1 de cada 25 personas con este puntaje desarrollará diabetes en 10 años.' };
        if (s < 15) return { label: 'Riesgo Moderado', color: 'text-orange-500', bg: 'bg-orange-100', desc: '1 de cada 6 personas con este puntaje desarrollará diabetes en 10 años.' };
        if (s < 21) return { label: 'Riesgo Alto', color: 'text-orange-600', bg: 'bg-orange-100', desc: '1 de cada 3 personas con este puntaje desarrollará diabetes en 10 años.' };
        return { label: 'Riesgo Muy Alto', color: 'text-red-600', bg: 'bg-red-100', desc: '1 de cada 2 personas con este puntaje desarrollará diabetes en 10 años.' };
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-orange-700 to-amber-800 py-8 px-4"><div className="max-w-3xl mx-auto"><Link href="/herramientas" className="text-orange-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link><h1 className="text-3xl md:text-4xl font-bold text-white">🩺 Test de Riesgo de Diabetes</h1><p className="text-orange-100 mt-2">FINDRISC — riesgo de desarrollar diabetes tipo 2 en 10 años</p></div></div>
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    {preguntas.map((p, i) => (
                        <div key={p.id} className="mb-6">
                            <p className="font-bold text-gray-800 mb-3">{i + 1}. {p.text}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {p.options.map(opt => (
                                    <button key={opt.l} onClick={() => setR(p.id, opt.v)}
                                        className={`p-3 rounded-xl text-sm text-left transition-all ${respuestas[p.id] === opt.v ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                        {opt.l}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button onClick={calcular} className="w-full bg-orange-700 hover:bg-orange-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98]" disabled={Object.keys(respuestas).length < preguntas.length}>Calcular Riesgo</button>
                    {resultado !== null && (() => {
                        const r = getRiesgo(resultado); return (
                            <div className="mt-8"><div className={`${r.bg} rounded-2xl p-6 text-center mb-6`}><p className="text-sm text-gray-600 mb-1">Puntaje FINDRISC</p><p className={`text-5xl font-black ${r.color}`}>{resultado}</p><p className={`text-xl font-bold ${r.color} mt-1`}>{r.label}</p><p className="text-gray-600 text-sm mt-2">{r.desc}</p></div>
                                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"><h3 className="font-bold text-green-900 text-lg mb-3">🔬 Estudios Recomendados</h3><div className="space-y-3">{[{ name: 'Glucosa en Ayunas', reason: 'Primer paso para diagnóstico de diabetes' }, { name: 'Hemoglobina Glicosilada (HbA1c)', reason: 'Promedio de glucosa en los últimos 3 meses' }, { name: 'Insulina en Ayunas', reason: 'Detecta resistencia a la insulina temprana' }, { name: 'Curva de Tolerancia a la Glucosa', reason: 'Diagnóstico definitivo de pre-diabetes y diabetes' }, { name: 'Perfil de Lípidos', reason: 'Diabetes aumenta el riesgo cardiovascular' }].map(s => (<div key={s.name} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm"><span className="text-green-600 mt-1">✓</span><div><p className="font-semibold text-gray-800 text-sm">{s.name}</p><p className="text-gray-500 text-xs">{s.reason}</p></div></div>))}</div><Link href="/estudios/analisis-clinicos" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-800">Ver Estudios →</Link></div></div>);
                    })()}
                </div>
                
                <StudyCTA 
                    title={`Detén la diabetes antes que empiece`} 
                    description={`Sentir mucha sed o ir al baño frecuentemente son alertas. La Prueba de Hemoglobina Glicosilada (HbA1c) marca un promedio del nivel de glucosa en tu sangre durante los últimos 3 meses.`} 
                    actionText={`Cotizar Hemoglobina Glicosilada`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Hemoglobina%20Glicosilada*`} 
                    type="estudio" 
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩸 Guía Endocrinológica: Test de Riesgo de Diabetes Tipo 2</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El test basal de O de y U u riesgo O de de U Inmensa o diabetes U o genérico Inmenso es o U a u Inmenso una purísima herramienta U de base inmenso genérica a de U y U o O de la Inmensurables U genérica genéricamente a la purísima O cribado al para o O al en genérico a a general evaluar al U a puros puramente la al o inmensa a u inmenso de o O genérica a U inminente U a la O inmenso de o de a a a a O padecer síndrome inmensurable al O metabólico al.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Laboratorios Complementarios URGENTES</h3>
       <ul>
           <li><a href="/estudios/analisis-clinicos/resistencia-a-la-insulina-homa-ir" className="text-blue-600 font-semibold hover:underline">Índice HOMA-IR (Resistencia a la Insulina)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="mb-8" />
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"><button onClick={() => setShowInfo(!showInfo)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"><span className="font-bold text-gray-900">📚 Test FINDRISC — Información Científica</span><span className={`text-2xl transition-transform ${showInfo ? 'rotate-180' : ''}`}>▼</span></button>
                    {showInfo && (<div className="px-6 pb-6 border-t border-gray-100 pt-4 text-gray-700 text-sm space-y-4"><p>El <strong>FINDRISC (Finnish Diabetes Risk Score)</strong> es un cuestionario validado internacionalmente por la OMS para estimar el riesgo de desarrollar Diabetes Mellitus tipo 2 en los próximos 10 años. No requiere análisis de sangre.</p><h4 className="font-bold text-gray-900">Puntaje e interpretación</h4><table className="w-full text-sm"><thead><tr className="bg-gray-100"><th className="p-2">Puntaje</th><th className="p-2">Riesgo</th><th className="p-2">Probabilidad a 10 años</th></tr></thead><tbody><tr className="border-b"><td className="p-2 text-center">&lt;7</td><td className="p-2 text-green-600 font-bold">Bajo</td><td className="p-2 text-center">1%</td></tr><tr className="border-b"><td className="p-2 text-center">7-11</td><td className="p-2 text-yellow-600 font-bold">Ligeramente elevado</td><td className="p-2 text-center">4%</td></tr><tr className="border-b"><td className="p-2 text-center">12-14</td><td className="p-2 text-orange-600 font-bold">Moderado</td><td className="p-2 text-center">17%</td></tr><tr className="border-b"><td className="p-2 text-center">15-20</td><td className="p-2 text-orange-700 font-bold">Alto</td><td className="p-2 text-center">33%</td></tr><tr><td className="p-2 text-center">&gt;20</td><td className="p-2 text-red-600 font-bold">Muy alto</td><td className="p-2 text-center">50%</td></tr></tbody></table><h4 className="font-bold text-gray-900">Fuentes</h4><ul className="list-disc list-inside text-xs text-gray-500"><li>Lindström, J. & Tuomilehto, J. (2003). The Diabetes Risk Score. Diabetes Care.</li><li>International Diabetes Federation (IDF). FINDRISC Assessment Tool.</li></ul><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800"><strong>⚠️ Aviso:</strong> Este test no reemplaza los exámenes de laboratorio ni la consulta médica. Si tu puntaje es ≥12, consulta a tu médico y hazte estudios de glucosa.</div></div>)}</div>
                
                <StudyCTA 
                    title={`Detén la diabetes antes que empiece`} 
                    description={`Sentir mucha sed o ir al baño frecuentemente son alertas. La Prueba de Hemoglobina Glicosilada (HbA1c) marca un promedio del nivel de glucosa en tu sangre durante los últimos 3 meses.`} 
                    actionText={`Cotizar Hemoglobina Glicosilada`}
                    link={`https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20el%20precio%20de%20unos%20estudios%20de%20laboratorio%20que%20me%20recomendó%20su%20calculadora%20médica:%20*Cotizar%20Hemoglobina%20Glicosilada*`} 
                    type="estudio" 
                />
                
                <RelatedTools currentPath="/herramientas/riesgo-diabetes" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
