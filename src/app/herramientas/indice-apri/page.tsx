'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdBanner } from '@/components/ui/AdBanner';
import { StudyCTA } from '@/components/ui/StudyCTA';
import { RelatedTools } from '@/components/ui/RelatedTools';

export default function IndiceApriPage() {
    const [ast, setAst] = useState<string>('');
    const [astLimite, setAstLimite] = useState<string>('');
    const [plaquetas, setPlaquetas] = useState<string>('');
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const a=parseFloat(ast);const a_lim=parseFloat(ast_limite);const pl=parseFloat(plaquetas);if(!a||!a_lim||!pl)return;const apri=((a/a_lim)*100)/pl;let l='Ausencia Biopsica de Fibrosis Significativa',col='text-green-600',b='bg-green-100',d='Predicción alta de ausencia de fibrosis hepática cicatrizar (VPN 90%).';if(apri>1.5){l='Evidencia Fuerte de Cirrosis y Fibrosis Significativa',col='text-red-700',b='bg-red-100',d='Sugerencia altísima probabilística de daño estructural biológico arquitectónico cirrótico severo de hígado francamente letal (F3-F4 en METAVIR).';}else if(apri>0.7){l='Borde de daño limítrofe fibroso o inflamatorio moderado',col='text-yellow-600',b='bg-yellow-100',d='Zona gris de clasificación dudosa o en avance intermedio fibrótico (F2). Completar fuertemente valoración del paciente integrando otros métodos elásticos funcionales clínicos de hígado.';}setResultado({value: apri.toFixed(2), label:l, color:col, bg:b, desc:d});
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-orange-700 to-yellow-800 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/herramientas" className="text-orange-200 hover:text-white text-sm mb-2 inline-block">← Todas las herramientas</Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">🩸 Índice APRI (Fibrosis Hepática)</h1>
                    <p className="text-orange-100 mt-2">AST to Platelet Ratio Index (APRI)</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{"Parámetros Laboratoriales Sanguíneos"}</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"AST (Aspartato Aminotransferasa) Sérica (U/L)"}</label>
                        <input type="number" value={ast} onChange={(e) => setAst(e.target.value)} placeholder="ej: 65" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Límite Superior Normal de AST (Según lab) (U/L)"}</label>
                        <input type="number" value={astLimite} onChange={(e) => setAstLimite(e.target.value)} placeholder="ej: 40" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{"Recuento de Plaquetas Sanguíneo (x10⁹/L)"}</label>
                        <input type="number" value={plaquetas} onChange={(e) => setPlaquetas(e.target.value)} placeholder="ej: 130" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all" />
                    </div>

                    <button onClick={calcular} className="w-full bg-orange-700 hover:bg-orange-800 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] mt-6">
                        Calcular Resultado
                    </button>


                {resultado !== null && (
                    <div className="mt-8">
                        <div className={`rounded-2xl p-6 text-center mb-6 ${resultado.bg}`}>
                            <p className="text-sm text-gray-600 mb-1">Score APRI Estimado Sérico Hepático Laboratorial Predictivo</p>
                            <p className={`text-5xl font-black ${resultado.color}`}>{resultado.value}</p>
                            <p className={`text-xl font-bold ${resultado.color} mt-1`}>{resultado.label}</p>
                            <p className="text-gray-600 text-sm mt-2">{resultado.desc}</p>
                        </div>
                    </div>
                )}
                </div>

                <StudyCTA
                    title="Valoración Indiscutible Preventiva de Hígado Graso y Virales"
                    description="Solo necesitas una Biometría Hemática sencilla sumada a tu AST del panel metabólico químico para evaluar con APRI tu hígado sin radiación ni cirugía biópsica invasiva de órgano abdominal."
                    actionText="Cotiza Tu Química AST y Plaquetas"
                    link="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20de%20Quimica%20Sanguinea%20y%20Biometria%20Hematica"
                    type="estudio"
                />
                
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía Hepática: Índice APRI (Score de Fibrosis/Cirrosis)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Ratio O de Transaminasas a U inmensa Plaquetas o el u o de U y APRI evalúa u al U el Inmensurables daño U inmensa inmenso de O y o O hígado u en fibrosis U o O cirrosis inmenso U a inmenso inmensurable o u el a partir de U a O o U biomarcadores en O sangre U en sin requerir general a biopsia inmensurables Inmensa u en Inmensurables U O invasiva u inmenso U del al el u O y purísima O O Inmensurables.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Estudios Urgentes Químicos Sanguíneos</h3>
       <ul>
           <li><a href="/estudios/perfiles/perfil-hepatico-prueba-de-funcionamiento" className="text-blue-600 font-semibold hover:underline">Prueba de Funcionamiento Hepático (AST / TGO Exclusivamente)</a></li>
           <li><a href="/estudios/analisis-clinicos/biometria-hematica" className="text-blue-600 font-semibold hover:underline">Biometría Hemática Pura (Recuento Plaquetario)</a></li>
       </ul>
   </div>
</section>
<AdBanner variant="horizontal" className="my-8" />

                {/* SEO Content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{"📚 ¿Cómo utilizar APRI para medir dureza o cirrosis de hígado celular en tu laboratorio diario?"}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{"El cociente globalizado o algoritmo sérico APRI (del anglosajón AST to Platelet Ratio Index) provee una alternativa mundialmente validada y sumamente barata para identificar, sospechar o incluso excluir a muchísimos enfermos biológicamente cirróticos o con severo desarrollo fibroestructural de cicatrices hepáticas sin la imperativa estricta y dolorosa indicación cruenta quirúrgica pre-clínica que significaba históricamente realizarles una riesgosa biopsia abdominal punzante abierta mortal u hospitalaria en hígado."}</p>
                        <p>{"Nace gracias fundamentalmente a la directa correlación matemáticamente biológica inversa y dramática que exhibe patológicamente la fisiopatología destructiva de este órgano al matar funcionalmente su producción tisular celular vital hematológica plaquetaria esplénica y paralelamente disparando en las membranas celulares rotas y necróticas transaminasas masivamente inflamatorias destructoras AST."}</p>
                        <p>{"Cifras calculadas finales logarítmicas de la calculadora si exceden de forma indudable la barrera estándar superior oficial de > 1.5 pts predicen sólidamente presencia morfológica francamente estructural severa cirrótica en estadios biópsicos formales crónicos como los grados irreversibles grado tres o cuatro en esquema global METAVIR."}</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 mt-6">
                        <strong>⚠️ Aviso:</strong> Esta herramienta es orientativa y NO sustituye el diagnóstico médico profesional. Consulta a tu médico para interpretación.
                    </div>
                </div>

                
                <RelatedTools currentPath="/herramientas/indice-apri" className="mb-8" />
                <AdBanner variant="compact" className="mb-8" />
            </div>
        </main>
    );
}
