'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function PesoFetalEstimadoHadlockPage() {
    const [dbp, setDbp] = useState<string>('');
    const [cc, setCc] = useState<string>('');
    const [ca, setCa] = useState<string>('');
    const [lf, setLf] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const d=parseFloat(dbp);const h=parseFloat(cc);const a=parseFloat(ca);const f=parseFloat(lf);if(!h||!a||!f)return;let log10EFWhadlock4=1.3596-(0.00386*a*f)+(0.0064*h)+(0.0424*a)+(0.174*f)+(0.00061*d*a)-0.00324*(h*f);if(!d)log10EFWhadlock4=1.326-(0.00326*a*f)+(0.0107*h)+(0.0438*a)+(0.158*f);const efw=Math.pow(10,log10EFWhadlock4);let label='Peso Fetal Calculado';let color='text-sky-600';let bg='bg-sky-100';let desc='La fórmula de Hadlock (multiparamétrica) tiene un rango de error estándar intrínseco de +/- 10% a 15% del peso real al momento de nacer.';setResultado({value:Math.round(efw).toLocaleString('es-MX')+' g',label,color,bg,desc});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-sky-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🌊 Peso Fetal Estimado (Fórmula de Hadlock)</h1>
                    <p className="text-sky-100 mt-2">Ecuación Predictiva en Ecografía Obstétrica</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Parámetros de Biometría Ecográfica"}</h2>

                    <div className="mb-4">

                        <label className="block text-sm font-bold text-gray-700 mb-1">Diámetro Biparietal (DBP) (cm)</label>
                        <input type="number" value={dbp} onChange={(e) => setDbp(e.target.value)} placeholder="Ej: 8.5" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all" />
                    </div>

                    <div className="mb-4">

                        <label className="block text-sm font-bold text-gray-700 mb-1">Circunferencia Cefálica (CC) (cm)</label>
                        <input type="number" value={cc} onChange={(e) => setCc(e.target.value)} placeholder="Ej: 30.5" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all" />
                    </div>

                    <div className="mb-4">

                        <label className="block text-sm font-bold text-gray-700 mb-1">Circunferencia Abdominal (CA) (cm)</label>
                        <input type="number" value={ca} onChange={(e) => setCa(e.target.value)} placeholder="Ej: 28.0" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all" />
                    </div>

                    <div className="mb-4">

                        <label className="block text-sm font-bold text-gray-700 mb-1">Longitud Fémur (LF) (cm)</label>
                        <input type="number" value={lf} onChange={(e) => setLf(e.target.value)} placeholder="Ej: 6.5" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all" />
                    </div>

                    <button onClick={calcular} className="w-full bg-sky-700 hover:bg-sky-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Biometría Analizada</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Monitoreo Prenatal Indispensable"
                    description="No olvides realizar analíticas del tercer trimestre: Hemoglobina general y descarte microbiológico para evitar complicaciones perinatales."
                    actionText="Paquetes de Embarazo"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Estudios%20Prenatales%20Completos"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 Biometría Fetal Explicada: La Fórmula Ecográfica de Hadlock"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p dangerouslySetInnerHTML={{ __html: "En el consultorio de Ultrasonido y Medicina Materno-Fetal, el peso del feto no se mide: se INFIERE midiendo huesos, cortezas y contornos estomacales." }} />
                        <p dangerouslySetInnerHTML={{ __html: "El Dr. Frank Hadlock, en la década de los 80, lideró estudios fundamentales al publicar un modelo de regresión ecográfica polinómica tridimensional que revolucionaría el seguimiento obstétrico. Al combinar perimetría de cabeza (BPD, HC), panículo abdominal del infante (AC) y largo de su cartílago femoral osificándose (FL), el algoritmo correlaciona la densidad matemática equivalente a su tejido cárnico global." }} />
                        <p dangerouslySetInnerHTML={{ __html: "La Circunferencia Abdominal (CA) es la métrica de peso más elocuente. Cuando la madre padece de hiperglucemias obstétricas, la insulina anabólica eleva groseramente la macrosomía manifestada esencialmente como abdómenes fetales distendidos sobre las líneas centinas 90 de crecimiento predeterminado." }} />
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
