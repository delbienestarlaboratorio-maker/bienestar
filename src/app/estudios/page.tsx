import Link from 'next/link';
import studiesData from '@/data/studies.json';
import { ChevronRight } from 'lucide-react';

const categories = [
    { id: 'analisis-clinicos', name: 'Análisis Clínicos' },
];

export default function AllStudiesPage() {
    // Only show active studies from the JSON
    const activeStudies = (studiesData as any[]).filter((s: any) => s.slug && s.categoryId);

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

                {/* Categories Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/estudios/${cat.id}`}
                            className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeStudies.map((study: any) => (
                        <Link
                            key={study.id || study.slug}
                            href={`/estudios/${study.categoryId}/${study.slug}`}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">
                                        {categories.find(c => c.id === study.categoryId)?.name || study.categoryId}
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
                    ))}
                </div>
            </div>
        </main>
    );
}

