import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search as SearchIcon, Loader2 } from 'lucide-react';
import { db } from '@/db';
import { studies } from '@/db/schema';
import { ilike, or, and, eq } from 'drizzle-orm';
import { StudyImageCard } from '@/components/studies/StudyImageCard';
import { getStudyVisualType } from '@/lib/studyTypeClassifier';

export const dynamic = 'force-dynamic';


interface PageProps {
    searchParams: Promise<{
        q?: string;
    }>;
}

async function SearchResults({ query }: { query: string }) {
    if (!query?.trim()) {
        return (
            <div className="text-center py-16">
                <SearchIcon className="mx-auto mb-4 text-gray-300" size={64} />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Ingresa un término de búsqueda</h2>
                <p className="text-gray-600">Prueba con: glucosa, biometría, ego, rayos X, ultrasonido</p>
            </div>
        );
    }

    const searchTerm = `%${query.trim()}%`;

    const results = await db
        .select({
            id: studies.id,
            name: studies.name,
            slug: studies.slug,
            categoryId: studies.categoryId,
            description: studies.description,
            priceRegular: studies.priceRegular,
            pricePromotional: studies.pricePromotional,
        })
        .from(studies)
        .where(
            and(
                eq(studies.isActive, true),
                or(
                    ilike(studies.name, searchTerm),
                    ilike(studies.description, searchTerm)
                )
            )
        )
        .limit(50);

    if (results.length === 0) {
        return (
            <div className="text-center py-16">
                <SearchIcon className="mx-auto mb-4 text-gray-300" size={64} />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    No encontramos resultados para "{query}"
                </h2>
                <p className="text-gray-600 mb-6">Intenta con otros términos o revisa la ortografía</p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-green-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Volver al inicio
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600">
                    Encontramos <span className="font-bold text-green-900">{results.length}</span> {results.length === 1 ? 'estudio' : 'estudios'}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((study) => (
                    <Link
                        key={study.id}
                        href={`/estudios/${study.categoryId}/${study.slug}`}
                        className="bg-white rounded-xl shadow-sm border-2 border-gray-100 hover:border-green-500 hover:shadow-lg transition-all overflow-hidden group"
                    >
                        <StudyImageCard
                            studyName={study.name}
                            studyType={getStudyVisualType(study.name)}
                            className="w-full aspect-video"
                        />
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-900 transition-colors mb-2 line-clamp-2">
                                {study.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                {study.description || 'Solicita más información sobre este estudio'}
                            </p>
                            <div className="flex items-center justify-between">
                                <div>
                                    {study.pricePromotional ? (
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400 line-through">
                                                ${study.priceRegular.toLocaleString('es-MX')}
                                            </span>
                                            <span className="text-2xl font-bold text-green-900">
                                                ${study.pricePromotional.toLocaleString('es-MX')}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-2xl font-bold text-green-900">
                                            ${study.priceRegular.toLocaleString('es-MX')}
                                        </span>
                                    )}
                                </div>
                                <button className="bg-green-900 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-green-800 transition-colors">
                                    Ver
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default async function BusquedaPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const query = params.q || '';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-900 to-green-700 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white hover:text-green-200 mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Volver al inicio
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                        Resultados de búsqueda
                    </h1>
                    {query && (
                        <p className="text-green-100 text-xl">
                            Buscaste: <span className="font-semibold text-white">"{query}"</span>
                        </p>
                    )}
                </div>
            </div>

            {/* Results */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <Suspense fallback={
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="animate-spin text-green-900" size={48} />
                    </div>
                }>
                    <SearchResults query={query} />
                </Suspense>
            </div>
        </div>
    );
}
