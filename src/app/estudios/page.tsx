export const runtime = 'edge';
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { db } from '@/db';
import { studies } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ChevronRight, TestTube, Activity, Baby, Droplets, Microscope, Heart, Pill, Dna, Stethoscope, Scan } from 'lucide-react';

const categories = [
    { id: 'analisis-clinicos', name: 'Análisis Clínicos', icon: TestTube, color: 'from-blue-500 to-cyan-500', keywords: [] as string[] },
    { id: 'hematologia', name: 'Hematología', icon: Droplets, color: 'from-red-500 to-rose-500', keywords: ['biometria', 'hemoglobina', 'hematocrito', 'eritrocit', 'leucocit', 'plaqueta', 'reticulocit', 'sangre', 'hematies', 'coagulacion', 'protrombina', 'fibrinogeno', 'dímero', 'anticoagulante'] },
    { id: 'quimica-clinica', name: 'Química Clínica', icon: Activity, color: 'from-green-500 to-emerald-500', keywords: ['glucosa', 'colesterol', 'triglicerido', 'urea', 'creatinina', 'acido urico', 'bilirrubina', 'albumina', 'proteina', 'calcio', 'fosforo', 'magnesio', 'electrolito', 'sodio', 'potasio', 'cloro', 'quimica'] },
    { id: 'hormonas', name: 'Hormonas', icon: Dna, color: 'from-purple-500 to-violet-500', keywords: ['hormona', 'tiroides', 'tsh', 't3', 't4', 'testosterona', 'estradiol', 'progesterona', 'prolactina', 'cortisol', 'insulina', 'fsh', 'lh', 'gonadotrop', 'hcg', 'embarazo', 'tiroideo'] },
    { id: 'inmunologia', name: 'Inmunología', icon: Heart, color: 'from-pink-500 to-rose-500', keywords: ['inmuno', 'anticuerpo', 'antigeno', 'ige', 'igg', 'igm', 'alergia', 'autoinmune', 'lupus', 'artritis', 'factor reumatoide', 'complemento', 'inmunoglobulina'] },
    { id: 'microbiologia', name: 'Microbiología', icon: Microscope, color: 'from-amber-500 to-orange-500', keywords: ['cultivo', 'bacteria', 'urocultivo', 'coprocultivo', 'antibiograma', 'gram', 'micolog', 'parasit', 'coproparasit', 'amiba'] },
    { id: 'marcadores-tumorales', name: 'Marcadores Tumorales', icon: Scan, color: 'from-indigo-500 to-blue-500', keywords: ['tumor', 'cancer', 'psa', 'ca 125', 'ca 15', 'ca 19', 'cea', 'alfafetoproteina', 'marcador'] },
    { id: 'orina-y-heces', name: 'Orina y Heces', icon: Baby, color: 'from-teal-500 to-cyan-500', keywords: ['orina', 'uroanalisis', 'heces', 'copro', 'sangre oculta', 'general de orina'] },
    { id: 'vitaminas-minerales', name: 'Vitaminas y Minerales', icon: Pill, color: 'from-lime-500 to-green-500', keywords: ['vitamina', 'hierro', 'ferritina', 'transferrina', 'zinc', 'folato', 'fólico', 'b12', 'vitamina d', '25-hidroxi'] },
    { id: 'perfil-especial', name: 'Perfiles Especiales', icon: Stethoscope, color: 'from-slate-500 to-gray-600', keywords: ['perfil', 'panel', 'hepatico', 'hepatitis', 'vih', 'vdrl', 'sifilis', 'torch', 'prenatal', 'prenupcial'] },
];

function classifyStudy(study: any): string {
    const name = (study.name || '').toLowerCase();
    const desc = (study.description || '').toLowerCase();
    const combined = name + ' ' + desc;

    for (const cat of categories) {
        if (cat.id === 'analisis-clinicos') continue;
        for (const kw of cat.keywords) {
            if (combined.includes(kw)) return cat.id;
        }
    }
    return 'analisis-clinicos';
}

export default async function AllStudiesPage() {
    const activeStudies = await db.select().from(studies).where(eq(studies.isActive, true));

    // Classify studies into proper categories
    const classifiedStudies = activeStudies.map(s => ({
        ...s,
        displayCategory: classifyStudy(s),
    }));

    // Count by category
    const categoryCounts: Record<string, number> = {};
    classifiedStudies.forEach(s => {
        categoryCounts[s.displayCategory] = (categoryCounts[s.displayCategory] || 0) + 1;
    });

    return (
        <main className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Catálogo Completo de Estudios</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Encuentra el estudio que necesitas entre nuestra amplia variedad de servicios de laboratorio.
                    </p>
                    <p className="text-blue-600 font-semibold mt-2">{activeStudies.length} estudios disponibles</p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const count = categoryCounts[cat.id] || 0;
                        return (
                            <Link
                                key={cat.id}
                                href={`/estudios/${cat.id}`}
                                className="group relative bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                    <Icon size={22} className="text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-sm mb-1">{cat.name}</h3>
                                <p className="text-xs text-gray-400">{count} estudios</p>
                            </Link>
                        );
                    })}
                </div>

                {/* All Studies */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeStudies.map((study: any) => {
                        const catDisplay = classifyStudy(study);
                        const cat = categories.find(c => c.id === catDisplay);
                        return (
                            <Link
                                key={study.id || study.slug}
                                href={`/estudios/${study.categoryId}/${study.slug}`}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group flex flex-col"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className={`text-[10px] font-bold text-white bg-gradient-to-r ${cat?.color || 'from-blue-500 to-cyan-500'} px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2 inline-block`}>
                                            {cat?.name || 'Análisis Clínicos'}
                                        </span>
                                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                                            {study.name}
                                        </h2>
                                    </div>
                                    <ChevronRight className="text-gray-300 group-hover:text-blue-500 transition-colors shrink-0" />
                                </div>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                                    {study.description || ''}
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="text-blue-900 font-bold text-lg">
                                        ${(study.pricePromotional || study.priceRegular || 0).toLocaleString('es-MX')}
                                    </div>
                                    <span className="text-xs font-bold text-blue-600 border border-blue-100 px-3 py-1 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        Ver detalles
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
