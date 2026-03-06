'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';

export default function FenaFraccionExcrecionSodioPage() {
    const [naSerico, setNaSerico] = useState<string>('');
    const [crSerica, setCrSerica] = useState<string>('');
    const [naOrina, setNaOrina] = useState<string>('');
    const [crOrina, setCrOrina] = useState<string>('');
    const [diuretico, setDiuretico] = useState<boolean>(false);
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const ns=parseFloat(na_serico);const cs=parseFloat(cr_serica);const no=parseFloat(na_orina);const co=parseFloat(cr_orina);if(!ns||!cs||!no||!co)return;const fena=((no*cs)/(ns*co))*100;let l='LRA Pre-Renal (Hipovolemia/Deshidratación Estricta)',col='text-orange-600',bg='bg-orange-100',d='Riñón sediento sano retiene crudo e innegable de urgencia sodio urinario salvando fluidos masivamente orgánicos puros sistémicos (< 1%).';if(fena>=2&&!diuretico){l='Falló Renal Intrínseco Letal - NTA Tubular',col='text-red-600',bg='bg-red-100';d='Confirmación diagnóstica pura francamente clínica celular letal grave o isquémica intrínseca masiva Necrosis Tubular analítica cruda grave irreversible destructiva renal (>2%) de riñones anatómicos fallidos puros muertos.';}else if(fena>=1&&fena<2&&!diuretico){l='Fallo Origen Incierto',col='text-gray-600',bg='bg-gray-100';d='Zona dudosa pre o post obstructiva celular o patología biológica isquémica general incipiente tubular médica inflamatoria intersticial sistémica pre celular letárgico.';}if(diuretico){l='FENa Alterado Médicamente (Falso Indudable)',col='text-blue-600',bg='bg-blue-100';d='La FENa no debe leerse objetivamente ni usarse bajo puro tratamiento forzado puro oral innegable inyectable diurético de pastillas. Calcula preferencialmente la FE-Urea médica alterna metabólica urinaria pura sistémica de nitrógeno celular analítica urinaria pre excretada.';}setResultado({value: fena.toFixed(2), unit: '% FENa Excretada', label:l, color:col, bg:bg, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-teal-700 to-cyan-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-teal-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🧂 Fracción Excreción de Sodio (FENa)</h1>
                    <p className="text-teal-100 mt-2">Diferencia LRA Pre-Renal vs Necrosis Tubular Aguda</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Bioquímica Plasmática y Examen de Orina Único"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Sodio Sérico (Sangre) (mEq/L)"}</label>
                        <input type="number" value={naSerico} onChange={(e) => setNaSerico(e.target.value)} placeholder="ej: 140" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Creatinina Sérica (Sangre) (mg/dL)"}</label>
                        <input type="number" value={crSerica} onChange={(e) => setCrSerica(e.target.value)} placeholder="ej: 2.1" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Sodio Urinario (Muestra Orina) (mEq/L)"}</label>
                        <input type="number" value={naOrina} onChange={(e) => setNaOrina(e.target.value)} placeholder="ej: 15" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Creatinina Urinaria (Muestra Orina) (mg/dL)"}</label>
                        <input type="number" value={crOrina} onChange={(e) => setCrOrina(e.target.value)} placeholder="ej: 150" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all" />
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <input type="checkbox" id="diuretico" checked={diuretico} onChange={(e) => setDiuretico(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                        <label htmlFor="diuretico" className="text-sm font-bold text-gray-700">{"¿Paciente bajo influjo puro clínico biológico diurético innegable (Furosemida o Asa cruda medicamentosa excretora urinaria forzada iatrogénica)?"}</label>
                    </div>

                    <button onClick={calcular} className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className="bg-blue-50 rounded-2xl p-6 text-center mb-6">
                            <p className="text-sm text-gray-600 mb-1">Porcentaje Matemático Biológico Sodio Urinario Excretado Fraccional Eyectado Renal Reabsorbido</p>
                            <p className="text-5xl font-black text-blue-700">{resultado.value}</p>
                            {resultado.unit && <p className="text-blue-500 text-sm mt-1">{resultado.unit}</p>}
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Valoración del Test de Función Ureica Nefróloga Sistémica Orgánica de Filtro Biológico"
                    description="Las EGO o los análisis simples bioquímicos de orina de urgencia con panel iónico te alertarán y asistirán innegablemente biológico prequirúrgicos o dialítico agudo sistémico."
                    actionText="EGO Examen Urinario Completo"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Examen%20General%20de%20Orina%20y%20Quimica"
                    type="estudio"
                />
                <AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 ¿Cómo interpretar los valores agudos renales en orina de sangre de la Fracción FENa Pura Clínica Letal Excretora Aguda Nefrótica O Nulo Tubular Célula Orina?"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"Dentro del misterioso mundo orgánico del letal shock renal global u hospitalario y el cierre anatómico nefrótico y anuria brutal total metabólica del flujo sistémico analítico crudo puro orinoso filtrante (falla urinaria renal oliguria aguda médica conocida)."}</p>
                        <p>{"La estricta Fracción letal métrica Pura de la Excreción Biológica Fisiológica estricta Clínica Orgánica Analítica del bio factor y electrólito sistémico celular vital puro Sodio Urinario Matemático Sistémico (FENa) es la potentísima métrica infalible estándar dorada mundial médica urinaria."}</p>
                        <p>{"Distinguir de manera mágica si tu paciente biológicamente oriniforme dejó simplemente orgánicamente y pálidamente de orinar líquido biológico sistémico analítico urinario porque esta desangrado deshidratado o pálidamente sin agua volumen hídrico venoso y con hipotensión masiva arterial hipovolémica (Fase sana de retención Pre Renal 1%) en vez biológica celular de que su nefrona tubular glomerular tenga isquemia y tenga severamente la anatomía celular necrosis tubular muerta tubular y que requiera letal uremica maquina diálisis cruda inminente renal letal irreversible hospitalización masiva (>2%)."}</p>
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
