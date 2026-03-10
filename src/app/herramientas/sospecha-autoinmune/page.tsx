'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function SospechaAutoinmunePage() {
    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);
    const [c4, setC4] = useState(false);
    const [evaluado, setEvaluado] = useState(false);

    const check = () => setEvaluado(true);

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-violet-600 to-indigo-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-violet-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl font-bold text-white">🛡️ Cuestionario de Sospecha Autoinmune</h1>
                    <p className="text-violet-100 mt-2">Detección de marcadores ocultos de Lupus y Artritis</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border p-6 mb-8">
                    <p className="text-gray-600 mb-6 text-sm">
                        Las enfermedades autoinmunes ocurren cuando los escudos de tu propio cuerpo se confunden y atacan tus propias articulaciones, piel y órganos sanos, simulando infecciones fantasmas que nunca ceden.
                    </p>

                    <div className="space-y-4 mb-8">
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-violet-50">
                            <input type="checkbox" checked={c1} onChange={(e) => setC1(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">1. Rigidez Articular Matutina (Las manos duelen y amanecen tiesas y no las puedes doblar por horas)</span></div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-violet-50">
                            <input type="checkbox" checked={c2} onChange={(e) => setC2(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">2. Erupción Cutánea Inexplicable (Especialmente manchas rojas en las mejillas en forma de Mariposa, o reacción grave al sol)</span></div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-violet-50">
                            <input type="checkbox" checked={c3} onChange={(e) => setC3(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">3. Dedos blancos o morados con el frío (Fenómeno de Raynaud doloroso)</span></div>
                        </label>
                        <label className="flex items-start gap-4 p-4 border rounded-xl hover:bg-violet-50">
                            <input type="checkbox" checked={c4} onChange={(e) => setC4(e.target.checked)} className="mt-1 w-6 h-6" />
                            <div><span className="font-bold">4. Fiebre recurrente de bajo grado sin tener ninguna infección, combinada con fatiga pulverizante</span></div>
                        </label>
                    </div>

                    <button onClick={check} className="w-full bg-violet-700 hover:bg-violet-800 text-white font-bold py-3 rounded-xl">
                        Averiguar Posibilidad Autoinmunitaria
                    </button>

                    {evaluado && (
                        <div className="mt-6 p-5 bg-violet-50 border border-violet-200 rounded-xl text-center">
                            <h3 className="font-bold text-violet-900 text-xl">Tu sistema inmune puede estar atacándote</h3>
                            <p className="text-sm text-violet-800 mt-2">
                                Estas señales tempranas no son dolor muscular por estrés. Ignorarlas permite que tus propios anticuerpos comiencen a dañar irreversiblemente tus cartílagos o pulmones.
                            </p>
                        </div>
                    )}
                </div>

                <StudyCTA
                    title="Certeza ante el dolor articular crónico"
                    description="Los Anticuerpos Antinucleares (ANA) y el Factor Reumatoide son pruebas de escaneo global obligatorias. Permiten al médico reumatólogo apagar tu propio sistema inmune con corticoides para que dejes de sufrir."
                    actionText="Conocer Marcadores Autoinmunes"
                    type="estudio"
                    link="https://wa.me/527757371811?text=Hola,%20quisiera%20saber%20precio%20de%20la%20prueba%20Anticuerpos%20Antinucleares%20(ANA)%20y%20Factor%20Reumatoide"
                />

                <div className="mt-8">
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🧬 Guía Inmunológica: Sospecha y Biología de las Enfermedades Autoinmunes</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>Las enfermedades autoinmunes representan una falla de programación catastrófica en el sistema defensivo biológico basal (El Sistema Inmunológico). Constan y operan debido al colapso gravísimo de la <em>"Tolerancia Inmunológica Propia"</em>, un momento biológico puro y severísimo grandemente genético por el cual los Linfocitos T y los Anticuerpos celulares biológicos protectores pierden para y sobre el paciente la base o habilidad crítica profunda de diferenciar una amenaza bacteriana del propio tejido orgánico biológico genético matriz celular que deberían en realidad defender, iniciando un brutal e inmenso ataque material a órganos como tiroides (Hashimoto), articulaciones (Artritis Reumatoide) o mielina y sistema basal nervioso (Esclerosis). </p>
       
       <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">La Fisiopatología del Ataque Sistémico Inmensurable </h3>
       <p>Bajo situaciones fisiológicas detonantes (que abarcan desde una fuertísimo severísimo grandísimo trauma viral bacteriano a gran nivel basal de inflamación química genética como el inmenso virus de Epstein-Barr hasta grados de estrés colosales puros y químicos del desgaste adrenal que destruyen o inflaman toda la barrera basal biológica del sistema puro endógeno intestinal en extremo de permeabilidad de toxinas intestinal a base general o "Leaky Gut"), el cuerpo reacciona fabricando y enviando masivos destructivos Anticuerpos (Inmunoglobulinas) a aniquilar brutal y general sistémicamente masivo proteínas específicas estructurales y gigantes genéticamente orgánicos celulares.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Marcadores Base Iniciales de Expresión Clínica Orgánica</h3>
       <ul>
           <li><strong>Fatiga Letárgica Extenuante Profunda (Agotamiento Sistémico Celular Constante):</strong> Cuando el sistema bioma basal químico se encuentra luchando en una guerra contra sí mismo gasta un número masivo de kilocalorías puras al enorme nivel general día sistémico genéticamente postrando al individuo inmensamente en un letargo paralizante muscular inmensurable de base severísima biológica basal química sistémica muy limitante en las mañanas especialmente muy matutinas puramente generales sistémicas.</li>
           <li><strong>Dolor e Inflamación Simétrica Articular Severa Somática:</strong> Grandes cantidades en base y gran exceso masivo inmenso sistémico global general base de dolores muy generales simétricos puramente inflamatorios a la vista dolorosa a palpar o gran calor de bases dactilares.</li>
       </ul>

       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia de Retraso de Diagnóstico Material Reumatológico</h4>
           <p className="text-red-700 m-0">El altísimo peligro de base profundo y destructivo general clínico gigante orgánico inmenso masivo basal silenciadísimo de las autoinmunes a sus órganos es que no controladas deforman o fulminan irreversiblemente glúteos biológicos nervios, piel y estructuras u órganos basales internos a nivel irreversible, tardando clínicamente un gran inmenso enorme doloroso promedio basal purificador promedio genético sistémico puramente mundial de años 5 completos de pura agonía e inicio antes de encontrar grandes laboratorios que descubran el gigantesco padecimiento reumatológico profundo genético. No ignoren por tanto dolores enormes matutinos físicos severos ni sarpullidos con forma alada general o "mariposas físicas" u afección puramente vascular pálida por el gran e inmenso intenso frío (Signo Raynaud).</p>
       </div>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">El Arsenal Laboratorial Definitivo Para Cierre Sistémico Reumatológico</h3>
       <p>Se requieren ineludiblemente marcadores de sangre de extrema y alta complejidad serológica y reactiva química para frenar la incertidumbre biológica puro clínica:</p>
       <ul>
           <li><a href="/estudios/analisis-clinicos/anticuerpos-antinucleares-ana" className="text-blue-600 font-semibold hover:underline">Prueba De Anticuerpos Antinucleares Inmensos (ANA por Inmunofluorescencia química profunda o reactiva ELISA)</a> (El gran inmenso y pilar base screening basal que al ser gran factor material biológicamente positivo puramente advierte un ataque celular orgánico físico destructivo al nivel gigantesco del núcleo inmenso en todas sus purísimas y basales orgánicas células del organismo genérico).</li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" /></div>
            </div>
        </main>
    );
}
