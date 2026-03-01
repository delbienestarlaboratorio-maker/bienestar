export const runtime = 'edge';
import { CategoryStudyList } from '@/components/studies/CategoryStudyList';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { studies as dbStudies } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

const categories = [
    {
        id: 'analisis-clinicos',
        name: 'Análisis Clínicos',
        description: 'Estudios de sangre, orina y otros fluidos corporales para diagnóstico preciso.',
        image: '/images/estudios/analisis_clinicos.png'
    },
];

interface PageProps {
    params: Promise<{
        categoria: string;
    }>;
}

export default async function CategoryPage({ params }: PageProps) {
    const { categoria } = await params;

    const category = categories.find(cat => cat.id === categoria);
    if (!category) {
        notFound();
    }

    // Query directly from Neon Serverless Database
    const dbResults = await db.select().from(dbStudies).where(and(eq(dbStudies.categoryId, categoria), eq(dbStudies.isActive, true)));

    // Default the subcategories to empty array
    const subcategories: any[] = [];

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
                            {dbResults.length} estudios disponibles
                        </p>
                    </div>
                </div>

                {/* Interactive Study List */}
                <CategoryStudyList
                    initialStudies={dbResults as any}
                    subcategories={subcategories}
                    categoria={categoria}
                />
            </div>
        </div>
    );
}
