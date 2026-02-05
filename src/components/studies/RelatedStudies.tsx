'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    TrendingUp,
    Sparkles,
    ExternalLink,
    ArrowRight,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

interface RelatedStudy {
    id: string;
    name: string;
    slug: string;
    price: string;
    category: string;
    description?: string;
    relationshipType: string;
    relationshipStrength: number;
    relationshipReason?: string;
}

interface RelatedStudiesProps {
    studyId: string;
    type?: 'similar' | 'complementary' | 'all';
    title?: string;
    limit?: number;
}

export function RelatedStudies({
    studyId,
    type = 'all',
    title,
    limit = 6
}: RelatedStudiesProps) {
    const [studies, setStudies] = useState<RelatedStudy[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchRelatedStudies();
    }, [studyId, type]);

    const fetchRelatedStudies = async () => {
        try {
            setLoading(true);
            const typeParam = type !== 'all' ? `?type=${type}` : '';
            const response = await fetch(`/api/studies/${studyId}/related${typeParam}&limit=${limit}`);

            if (!response.ok) throw new Error('Failed to fetch related studies');

            const data = await response.json();
            setStudies(data.related || []);
        } catch (error) {
            console.error('[RelatedStudies] Error:', error);
            setStudies([]);
        } finally {
            setLoading(false);
        }
    };

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev + 3 >= studies.length ? 0 : prev + 3
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev - 3 < 0 ? Math.max(0, studies.length - 3) : prev - 3
        );
    };

    if (loading) {
        return (
            <div className="related-studies-skeleton">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (!studies || studies.length === 0) {
        return null;
    }

    const visibleStudies = studies.slice(currentIndex, currentIndex + 3);
    const showNavigation = studies.length > 3;

    const getRelationshipIcon = (type: string) => {
        switch (type) {
            case 'similar':
                return '🔄';
            case 'complementary':
                return '✨';
            case 'prerequisite':
                return '📋';
            case 'follow-up':
                return '➡️';
            default:
                return '🔗';
        }
    };

    const getRelationshipLabel = (type: string) => {
        switch (type) {
            case 'similar':
                return 'Estudio similar';
            case 'complementary':
                return 'Complementario';
            case 'prerequisite':
                return 'Recomendado antes';
            case 'follow-up':
                return 'Seguimiento';
            default:
                return 'Relacionado';
        }
    };

    return (
        <section className="related-studies py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {title || 'Estudios Relacionados'}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Otros estudios que podrían interesarte
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                {showNavigation && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={prevSlide}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Anterior"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {Math.floor(currentIndex / 3) + 1} / {Math.ceil(studies.length / 3)}
                        </span>
                        <button
                            onClick={nextSlide}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Siguiente"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>
                )}
            </div>

            {/* Studies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleStudies.map((study) => (
                    <Link
                        key={study.id}
                        href={`/estudios/${study.category}/${study.slug}`}
                        className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all"
                    >
                        {/* Relationship Badge */}
                        <div className="absolute top-3 right-3">
                            <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                                {getRelationshipIcon(study.relationshipType)} {getRelationshipLabel(study.relationshipType)}
                            </span>
                        </div>

                        {/* Study Info */}
                        <div className="mt-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 pr-20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {study.name}
                            </h4>

                            {study.relationshipReason && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                    {study.relationshipReason}
                                </p>
                            )}

                            {study.description && (
                                <p className="text-sm text-gray-500 dark:text-gray-500 mb-3 line-clamp-2">
                                    {study.description}
                                </p>
                            )}

                            {/* Price & CTA */}
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Precio</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        ${parseFloat(study.price).toFixed(2)}
                                    </p>
                                </div>

                                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                                    <span className="text-sm font-medium">Ver estudio</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-colors pointer-events-none" />
                    </Link>
                ))}
            </div>

            {/* View All Link */}
            {studies.length > 6 && (
                <div className="mt-6 text-center">
                    <button className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                        Ver todos los estudios relacionados
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
            )}
        </section>
    );
}

/**
 * Component for similar studies specifically
 */
export function SimilarStudies({ studyId }: { studyId: string }) {
    return (
        <RelatedStudies
            studyId={studyId}
            type="similar"
            title="Estudios Similares"
        />
    );
}

/**
 * Component for complementary studies
 */
export function ComplementaryStudies({ studyId }: { studyId: string }) {
    return (
        <RelatedStudies
            studyId={studyId}
            type="complementary"
            title="Estudios Complementarios"
        />
    );
}
