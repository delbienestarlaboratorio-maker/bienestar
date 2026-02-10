import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { db } from '@/db';
import { studies, categories as categoriesTable } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { MedicalSchema } from '@/components/seo/MedicalSchema';
import { StudyActions } from '@/components/studies/StudyActions';
import { Clock, FileText, AlertCircle, CheckCircle, Info, ShieldCheck, Microscope, Activity } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { StudyTracker } from '@/components/analytics/StudyTracker';
import { StudyImageCard } from '@/components/studies/StudyImageCard';
import { getStudyVisualType } from '@/lib/studyTypeClassifier';

// NEW PHASE 1 & 2 COMPONENTS
import { DynamicPrice } from '@/components/pricing/DynamicPrice';
import { PriceComparison } from '@/components/pricing/PriceComparison';
import { UrgencyIndicators } from '@/components/pricing/UrgencyIndicators';
import { RecommendedPanels } from '@/components/studies/RecommendedPanels';
import { StudyTabs } from '@/components/studies/StudyTabs';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SchemaMarkup } from '@/lib/seo/schema-markup';
import { RelatedStudies } from '@/components/studies/RelatedStudies';
import { ComplementaryStudies } from '@/components/studies/ComplementaryStudies';

// TESTIMONIALS
import { StudyTestimonials } from '@/components/testimonials/StudyTestimonials';
import { mapStudyCategoryToReviewCategory } from '@/data/testimonials/categories';

interface PageProps {
    params: Promise<{
        categoria: string;
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { categoria, slug } = await params;

    // Get study from database
    const [study] = await db
        .select()
        .from(studies)
        .where(and(eq(studies.slug, slug), eq(studies.categoryId, categoria)))
        .limit(1);

    if (!study) {
        return {
            title: 'Estudio no encontrado',
        };
    }

    // Get category info
    const [category] = await db
        .select()
        .from(categoriesTable)
        .where(eq(categoriesTable.id, categoria))
        .limit(1);

    const price = study.pricePromotional || study.priceRegular;

    return {
        title: `${study.name} - Desde $${price.toLocaleString('es-MX')} | BienestarLab`,
        description: study.description || '',
        keywords: [study.name, category?.name || '', 'laboratorio clínico', 'análisis médicos', 'BienestarLab'],
        openGraph: {
            title: `${study.name} - BienestarLab`,
            description: study.description || '',
            images: [
                {
                    url: study.image || '/images/logo.png',
                    width: 1200,
                    height: 630,
                    alt: study.name,
                }
            ],
            type: 'website',
            locale: 'es_MX',
        },
    };
}

export default async function StudyDetailPage({ params }: PageProps) {
    const { categoria, slug } = await params;

    // Get study from database
    const [study] = await db
        .select()
        .from(studies)
        .where(and(eq(studies.slug, slug), eq(studies.categoryId, categoria)))
        .limit(1);

    if (!study) {
        notFound();
    }

    // Get category info
    const [category] = await db
        .select()
        .from(categoriesTable)
        .where(eq(categoriesTable.id, categoria))
        .limit(1);

    const categoryName = category?.name || '';

    // Find related studies from database (same category, different ID, limit 4)
    const relatedStudiesData = await db
        .select()
        .from(studies)
        .where(and(
            eq(studies.categoryId, categoria),
            eq(studies.isActive, true)
        ))
        .limit(5); // Get 5 to filter out current study

    // Filter out current study and limit to 4
    const filteredRelated = relatedStudiesData
        .filter(s => s.id !== study.id)
        .slice(0, 4);

    // Map DB study to component structure if needed
    const mappedStudy = {
        ...study,
        price: {
            regular: study.priceRegular,
            promotional: study.pricePromotional || undefined
        },
        // Parse JSON fields if they are strings (depending on driver/config)
        whatDoesItDetect: typeof study.whatDoesItDetect === 'string' ? JSON.parse(study.whatDoesItDetect) : study.whatDoesItDetect,
        benefits: typeof study.benefits === 'string' ? JSON.parse(study.benefits) : study.benefits,
        detailedPreparation: typeof study.detailedPreparation === 'string' ? JSON.parse(study.detailedPreparation) : study.detailedPreparation,
        included: typeof study.included === 'string' ? JSON.parse(study.included) : study.included,
        faqs: typeof study.faqs === 'string' ? JSON.parse(study.faqs) : study.faqs,
    };

    // SEO Data Construction
    const seoData = {
        name: study.name,
        description: study.description || '',
        bodyLocation: "Cuerpo Humano",
        preparation: study.preparation || '',
        procedureType: "Noninvasive",
        status: "Active",
        offers: {
            "@type": "Offer",
            price: study.pricePromotional || study.priceRegular,
            priceCurrency: "MXN",
            availability: "https://schema.org/InStock"
        }
    };

    // Prepare breadcrumbs for SEO
    const breadcrumbs = [
        { name: 'Inicio', url: '/' },
        { name: categoryName, url: `/estudios/${categoria}` },
        { name: study.name, url: `/estudios/${categoria}/${slug}` }
    ];

    // Prepare FAQs if available
    const faqs = mappedStudy.faqs && Array.isArray(mappedStudy.faqs)
        ? mappedStudy.faqs
        : [];

    return (
        <main className="min-h-screen bg-gray-50 py-10">
            {/* NEW: Advanced Schema Markup with 7 types */}
            <SchemaMarkup
                study={{
                    ...study,
                    category: categoryName,
                    price: (study.pricePromotional || study.priceRegular).toString()
                }}
                breadcrumbs={breadcrumbs}
                faqs={faqs}
            />

            {/* Keep existing MedicalSchema for compatibility */}
            <MedicalSchema type="DiagnosticProcedure" data={seoData} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* NEW: SEO Breadcrumbs */}
                <Breadcrumbs items={breadcrumbs.slice(0, -1)} showHome={true} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Header Card with Professional Image */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Professional Image Header */}
                            <div className="w-full h-64 md:h-80">
                                <StudyImageCard
                                    studyName={study.name}
                                    studyType={getStudyVisualType(study.name)}
                                    className="w-full h-full"
                                />
                            </div>

                            {/* Study Info */}
                            <div className="p-6 sm:p-8 relative">
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 border border-green-100">
                                        <Activity size={14} />
                                        {categoryName}
                                    </div>
                                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                        {study.name}
                                    </h1>
                                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                        {study.description}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                                <Clock size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-sm">Entrega de Resultados</h3>
                                                <p className="text-sm text-gray-500">{study.turnaroundTime}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-sm">Requisitos</h3>
                                                <p className="text-sm text-gray-500">Receta médica no obligatoria</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TEMPORARILY DISABLED - React #310 and #418 errors
                        <StudyTabs />
                        <PriceComparison />
                        <RecommendedPanels />
                        <RelatedStudies />
                        <ComplementaryStudies />
                        */}

                        {/* Simple Content Display */}
                        <div className="space-y-6">
                            {study.whatIsIt && (
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Qué es?</h2>
                                    <p className="text-gray-600 leading-relaxed">{study.whatIsIt}</p>
                                </div>
                            )}

                            {study.preparation && (
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Preparación</h2>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{study.preparation}</p>
                                </div>
                            )}

                            {mappedStudy.benefits && Array.isArray(mappedStudy.benefits) && mappedStudy.benefits.length > 0 && (
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Beneficios</h2>
                                    <ul className="space-y-2">
                                        {mappedStudy.benefits.map((benefit: string, index: number) => (
                                            <li key={index} className="flex gap-2 text-gray-600">
                                                <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* RE-ENABLED SAFE COMPONENTS - Only use primitive dependencies */}
                        {/* DISABLED - PriceComparison causes #418 due to new Date()
                        <PriceComparison
                            ourPrice={study.pricePromotional || study.priceRegular}
                            studyName={study.name}
                        />
                        */}

                        <RecommendedPanels studyId={study.id} />

                        <RelatedStudies studyId={study.id} />

                        <ComplementaryStudies
                            studyId={study.id}
                            studyName={study.name}
                        />
                    </div>

                    {/* Sidebar / Pricing */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* TEMPORARILY DISABLED - Causing React #418 (hydration) and #310 (infinite loop) errors
                            <DynamicPrice
                                studyId={study.id}
                                studyName={study.name}
                                basePrice={study.priceRegular}
                            />

                            <UrgencyIndicators
                                showTimer={true}
                                showScarcity={true}
                                showSocialProof={true}
                            />
                            */}

                            {/* Simple Price Display (temporary replacement) */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="text-center">
                                    <p className="text-sm text-gray-500 mb-2">Precio</p>
                                    <div className="text-4xl font-bold text-gray-900">
                                        ${(study.pricePromotional || study.priceRegular).toLocaleString('es-MX')}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">MXN</p>
                                </div>
                            </div>

                            <StudyActions study={mappedStudy as any} />

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4">¿Por qué elegirnos?</h3>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex gap-2">
                                        <CheckCircle size={16} className="text-green-500 shrink-0" />
                                        Tecnología de última generación
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle size={16} className="text-green-500 shrink-0" />
                                        Resultados en línea y WhatsApp
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle size={16} className="text-green-500 shrink-0" />
                                        Médicos especialistas certificados
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle size={16} className="text-green-500 shrink-0" />
                                        Sucursales cerca de ti
                                    </li>
                                </ul>
                            </div>

                            {/* TEMPORARILY DISABLED - React errors
                            <StudyTestimonials />
                            */}

                            <StudyTracker study={mappedStudy as any} categoryName={categoryName} />

                            <div className="text-center space-y-2">
                                <p className="text-xs text-gray-400">
                                    Pagos seguros con Clip. Aceptamos todas las tarjetas.
                                </p>
                                <div className="flex justify-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                                    {/* Placeholder for payment icons if needed */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

