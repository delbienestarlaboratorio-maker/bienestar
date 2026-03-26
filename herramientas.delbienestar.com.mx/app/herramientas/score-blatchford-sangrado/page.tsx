'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function ScoreBlatchfordSangradoPage() {
    const [bun, setBun] = useState<string>('');
    const [hb, setHb] = useState<string>('');
    const [sexo, setSexo] = useState<string>('');
    const [sistolica, setSistolica] = useState<string>('');
    const [pulsos, setPulsos] = useState<string>('');
    const [melena, setMelena] = useState<boolean>(false);
    const [sincope, setSincope] = useState<boolean>(false);
    const [hepatica, setHepatica] = useState<boolean>(false);
    const [fallo, setFallo] = useState<boolean>(false);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        let pts=0;const ure=parseFloat(bun);const hemo=parseFloat(hb);const pa=parseFloat(sistolica);const pul=parseFloat(pulsos);if(isNaN(ure)||isNaN(hemo)||isNaN(pa)||isNaN(pul))return;if(ure>=18.2&&ure<22.4)pts+=2;else if(ure>=22.4&&ure<28)pts+=3;else if(ure>=28&&ure<70)pts+=4;else if(ure>=70)pts+=6;if(sexo==='h'){if(hemo>=12.0&&hemo<13.0)pts+=1;else if(hemo>=10.0&&hemo<12.0)pts+=3;else if(hemo<10.0)pts+=6;}else{if(hemo>=10.0&&hemo<12.0)pts+=1;else if(hemo<10.0)pts+=6;}if(pa>=100&&pa<=109)pts+=1;else if(pa>=90&&pa<=99)pts+=2;else if(pa<90)pts+=3;if(pul>=100)pts+=1;if(melena)pts+=1;if(sincope)pts+=2;if(hepatica)pts+=2;if(fallo)pts+=2;let l='Alto Riesgo Urgente de Endoscopia',col='text-red-600',bg='bg-red-100',d='Requiere intervención endoscópica digestiva urgente, admisión inminente hospitalaria urgente UCI cruzamiento y tipo de hemo sangre masivas urgente letal y monitoreo médico.';if(pts===0){l='Puntaje 0: Riesgo Ínfimo Segurísimo',col='text-green-600',bg='bg-green-100',d='Riesgo extremadamente virtual limítrofe innegablemente nulo de requerir intervención endoscopica masiva sangre o fallecer (<1%). Alta ambulatoria con IBPS muy segura según dictamen global de urgencia universal gástrica.';}else if(pts>0){l='Score '+pts+' > 0: Necesidad Hospitalaria y Endoscopia Aguda',col='text-red-700',bg='bg-red-100',d='Intervenir. GBS alto, mortalidad se encarece. Requerido panel transfuncional cruzado de inmediato.'}setResultado({value: pts+' pts', label:l, color:col, bg:bg, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-orange-700 to-yellow-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-orange-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🩸 Score de Riesgo Glasgow-Blatchford (GBS)</h1>
                    <p className="text-orange-100 mt-2">Riesgo endoscópico para Hemorragia Gastrointestinal Alta Urgente</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Parámetros Urgentes Sangrado"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Niveles de Urea (BUN) (mg/dL)"}</label>
                        <input type="number" value={bun} onChange={(e) => setBun(e.target.value)} placeholder="ej: 25" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Hemoglobina de Presentación (g/dL)"}</label>
                        <input type="number" value={hb} onChange={(e) => setHb(e.target.value)} placeholder="ej: 11" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Genotipo / Sexo"}</label>
                        <select value={sexo} onChange={(e) => setSexo(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 transition-all">
                            <option value="">Seleccionar...</option>
                            <option value="h">{"Masculino"}</option>
                            <option value="m">{"Femenino"}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Presión Arterial Sistólica Ingreso (PAS) (mmHg)"}</label>
                        <input type="number" value={sistolica} onChange={(e) => setSistolica(e.target.value)} placeholder="ej: 105" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Taquicardia Cardíaca Sistémica (Pulso por Minuto HR) (lpm)"}</label>
                        <input type="number" value={pulsos} onChange={(e) => setPulsos(e.target.value)} placeholder="ej: 95" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all" />
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="melena" checked={melena} onChange={(e) => setMelena(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="melena" className="text-sm font-bold text-gray-700">{"Fuerte Sospecha Innegable u objetiva médica comprobada e inequívoca de Melena digestiva anal heces negras fétidas alquitranadas o franca comprobable en Tácto rectal y dolor de deposición oscura melénica sangre vieja en evacuaciones clínicas comprobada franca cruda objetiva médica rectorragia vieja innegable fecal melénica y fétida oscura y con franca evidencia clínica y letal en urgencia heces digestiva franca"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="sincope" checked={sincope} onChange={(e) => setSincope(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="sincope" className="text-sm font-bold text-gray-700">{"Episodio de caída hemodinámica en Síncope agudo desmayo innegable u síncope isquémico vaso letal vago cerebral pérdida de letal franca de crudo y choque conciencia neurológico de inestabilidad basal hemodinámica ortostática neuro cardiogénico y de pérdida súbita colapso neurológica sincopal letal"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="hepatica" checked={hepatica} onChange={(e) => setHepatica(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="hepatica" className="text-sm font-bold text-gray-700">{"Sospecha comprobada de Daño Enfermedad patológica comprobada franca y crónica pre existente en hígado o Cirrosis innegable y pre evaluada clínica en historia hepatología grave basal subyacente médica comprobable en expediente general de daño médico diagnosticado crónico"}</label>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="fallo" checked={fallo} onChange={(e) => setFallo(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="fallo" className="text-sm font-bold text-gray-700">{"Insuficiencia pre existente médica comprobada o sospecha fuerte de franco daño global de Corazón Falla letal de Cardiaca Insuficiencia (Falla Crónica cardiogénico IC franco basal historial diagnóstico de cardiología) y falla falla descompensación cardiaca congestiva masiva edema crudo insuficiencia"}</label>
                    </div>

                    <button onClick={calcular} className="w-full bg-orange-700 hover:bg-orange-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">GBS Hemorrágico Urgencias Sangrado Activo Letal</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Una biometría de urgencia y control de Urea podrían dictar si te vas de alta o a cirugía y endoscopia"
                    description="Los componentes metabólicos letales como la toxicidad uremica por sangre vieja dirigina franca elevan rápidamente al enfermo y lo agravan masivamente."
                    actionText="Panel Endoscópico Pre Laboratorio (Hemo y Urea)"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Urea%20Biometria"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Riesgo Fatal Sistémico Múltiple Glasgow-Blatchford Score"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"A diferencia flagrante universal de otros perfiles de sangrados digestivos gástricos como el de Rockall que exige endoscopio pre insertado gástricamente para contar con evaluación tisular, el score universal escocés letal Glasgow-Blatchford Score asiste masivamente e inicialmente en urgencias del triaje sin meter tubos gástricos endoscópicos invasivos de manera inclemente incruenta."}</p>
                        <p>{"Utilizando tan solo los clásicos y accesibles laboratorios de tu presentación basal universal en urgencias (Urea y Niveles Venosos puros Hemoglobina anémica) cruzada matemáticamente logarítmico con la hemo dinámica hipotensiva clínica y síncopes (desmayos letales neuro cardiogénicos); logra de manera impecable predecir o segregar al paciente inestable de altísimo crudo mortal riesgo del paciente súper y limítrofe seguro (0 puntos)."}</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 mt-6">
                        <strong>⚠️ Aviso:</strong> Esta herramienta es orientativa y NO sustituye el diagnóstico médico profesional. Consulta a tu médico para interpretación.
                    </div>
                </div>

                
                <RelatedTools currentPath="/herramientas/score-blatchford-sangrado" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
