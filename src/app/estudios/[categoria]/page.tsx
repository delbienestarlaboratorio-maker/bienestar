import { CategoryStudyList } from '@/components/studies/CategoryStudyList';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
// TEMPORARY: Using static data until database is seeded
import { categories, studies as allStudies } from '@/data/studies';

interface PageProps {
    params: Promise<{
        categoria: string;
    }>;
}

export default async function CategoryPage({ params }: PageProps) {
    const { categoria } = await params;

    // TEMPORARY: Get category from static data
    const category = categories.find(cat => cat.id === categoria);
    if (!category) {
        notFound();
    }

    // TEMPORARY: Filter studies from static data and transform to match DB schema
    const studies = allStudies
        .filter(study => study.category === categoria && study.status === 'active')
        .map(study => ({
            id: study.id,
            slug: study.slug,
            name: study.name,
            categoryId: study.category,
            subcategoryId: study.subcategory || null,
            description: study.description,
            preparation: study.preparation,
            turnaroundTime: study.turnaroundTime,
            priceRegular: study.price.regular,
            pricePromotional: study.price.promotional || null,
            profitMargin: 0,
            image: study.image,
            isActive: true,
            views: 0,
            whatIsIt: study.detailedDescription || null,
            whatDoesItDetect: null,
            benefits: null,
            detailedPreparation: null,
            included: null,
            faqs: study.faqs || null,
            searchTerms: study.searchTerms || null,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
    const subcategories: any[] = []; // TODO: Add subcategories when database is ready

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Category Banner Header */}
                <div className="relative h-80 bg-gradient-to-r from-green-900 to-green-700 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    </div>

                    {/* Banner Image if available */}
                    {category.image && (
                        <div className="absolute inset-0 opacity-20">
                            <img
                                src={category.image || '/images/placeholders/default_category.jpg'}
                                alt={category.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-8">
                        <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-green-200 mb-4 w-fit">
                            <ArrowLeft size={20} />
                            Volver al inicio
                        </Link>
                        <h1 className="text-6xl md:text-7xl font-bold text-green-400 mb-3 drop-shadow-lg">
                            {category.name}
                        </h1>
                        <p className="text-xl text-green-100 mb-2 max-w-3xl">{category.description}</p>
                        <p className="text-sm text-green-200">
                            {studies.length} estudios disponibles
                        </p>
                    </div>
                </div>

                {/* Interactive Study List */}
                <CategoryStudyList
                    initialStudies={studies as any}
                    subcategories={subcategories}
                    categoria={categoria}
                />
            </div>
        </div>
    );
}
