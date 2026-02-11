import { notFound } from 'next/navigation';
import { db } from '@/db';
import { studies } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

// Force dynamic rendering - NO static generation, NO cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
    params: Promise<{
        categoria: string;
        slug: string;
    }>;
}

export default async function StudyDetailPage({ params }: PageProps) {
    const { categoria, slug } = await params;

    const [study] = await db
        .select()
        .from(studies)
        .where(and(eq(studies.slug, slug), eq(studies.categoryId, categoria)))
        .limit(1);

    if (!study) {
        notFound();
    }

    const price = study.pricePromotional || study.priceRegular;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="bg-white rounded-lg shadow p-8 mb-6">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {study.name}
                    </h1>

                    {/* Price */}
                    <div className="text-3xl font-bold text-blue-600 mb-6">
                        ${price.toFixed(2)} MXN
                    </div>

                    {/* Description */}
                    {study.description && (
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Descripción</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {study.description}
                            </p>
                        </div>
                    )}

                    {/* Preparation */}
                    {study.preparation && (
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Preparación</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {study.preparation}
                            </p>
                        </div>
                    )}

                    {/* Turnaround Time */}
                    {study.turnaroundTime && (
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Tiempo de Entrega</h2>
                            <p className="text-gray-700">
                                {study.turnaroundTime}
                            </p>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="flex gap-4 mt-8">
                        <a
                            href="https://wa.me/527716854026"
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            💬 WhatsApp
                        </a>
                        <a
                            href="tel:+527716854026"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            📞 Llamar
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
