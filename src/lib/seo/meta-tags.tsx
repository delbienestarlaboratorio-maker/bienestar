// Dynamic Meta Tags Generator for SEO
// Generates optimized meta tags for all page types


import { Metadata } from 'next';
import { studies } from '@/db/schema';

type Study = typeof studies.$inferSelect;

interface MetaTagsOptions {
    title: string;
    description: string;
    keywords?: string[];
    canonical?: string;
    ogImage?: string;
    noindex?: boolean;
}

/**
 * Generate base metadata for the site
 */
export function generateBaseMetadata(): Metadata {
    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://laboratoriobienestar.com'),
        title: {
            default: 'Laboratorio Bienestar | Análisis Clínicos y Estudios de Laboratorio',
            template: '%s | Laboratorio Bienestar'
        },
        description: 'Laboratorio clínico con más de 2,000 estudios disponibles. Análisis clínicos, radiología, cardiología y ultrasonido. Resultados en 24-48 horas. Los mejores precios garantizados.',
        keywords: ['laboratorio clínico', 'análisis clínicos', 'estudios de laboratorio', 'análisis de sangre', 'México', 'CDMX'],
        authors: [{ name: 'Laboratorio Bienestar' }],
        creator: 'Laboratorio Bienestar',
        publisher: 'Laboratorio Bienestar',
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        openGraph: {
            type: 'website',
            locale: 'es_MX',
            url: process.env.NEXT_PUBLIC_APP_URL,
            siteName: 'Laboratorio Bienestar',
            title: 'Laboratorio Bienestar | Análisis Clínicos',
            description: 'Laboratorio clínico con más de 2,000 estudios disponibles. Los mejores precios garantizados.',
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Laboratorio Bienestar'
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Laboratorio Bienestar | Análisis Clínicos',
            description: 'Laboratorio clínico con más de 2,000 estudios disponibles.',
            images: ['/og-image.jpg'],
            creator: '@labbienestar'
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical: process.env.NEXT_PUBLIC_APP_URL,
        },
    };
}

/**
 * Generate metadata for a study page
 */
export function generateStudyMetadata(study: Study): Metadata {
    const title = `${study.name} | Análisis Clínico`;
    const description = study.description
        || `${study.name} - Estudio de laboratorio clínico. Precio: $${study.priceRegular} MXN. Resultados en 24-48 horas. Agenda tu cita ahora.`;

    const keywords = [
        study.name.toLowerCase(),
        study.categoryId.toLowerCase(),
        'análisis clínico',
        'laboratorio',
        'precio',
        'CDMX',
        'México'
    ];

    return {
        title,
        description,
        keywords,
        openGraph: {
            type: 'website',
            title,
            description,
            url: `${process.env.NEXT_PUBLIC_APP_URL}/estudios/${study.categoryId}/${study.slug}`,
            images: [
                {
                    url: study.image || '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: study.name
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [study.image || '/og-image.jpg'],
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL}/estudios/${study.categoryId}/${study.slug}`,
        },
    };
}

/**
 * Generate metadata for category pages
 */
export function generateCategoryMetadata(
    category: string,
    subcategory?: string,
    studyCount?: number
): Metadata {
    const title = subcategory
        ? `${subcategory} | ${category}`
        : category;

    const description = subcategory
        ? `Estudios de ${subcategory.toLowerCase()} en ${category.toLowerCase()}. ${studyCount || 'Múltiples'} estudios disponibles. Mejores precios garantizados.`
        : `Estudios de ${category.toLowerCase()}. ${studyCount || 'Múltiples'} estudios disponibles. Agenda tu cita hoy.`;

    return {
        title,
        description,
        keywords: [
            category.toLowerCase(),
            subcategory?.toLowerCase() || '',
            'laboratorio',
            'análisis'
        ].filter(Boolean),
        openGraph: {
            title,
            description,
            type: 'website',
        },
    };
}

/**
 * Generate metadata for panel (package) pages
 */
export function generatePanelMetadata(panel: {
    name: string;
    description: string;
    metaTitle?: string;
    metaDescription?: string;
    slug: string;
    basePrice: string;
    discountPercentage: number;
}): Metadata {
    const title = panel.metaTitle || `${panel.name} | Paquete de Estudios`;
    const description = panel.metaDescription
        || `${panel.description}. Ahorra ${panel.discountPercentage}% con este paquete. Precio: $${panel.basePrice} MXN.`;

    return {
        title,
        description,
        keywords: [
            'paquete de estudios',
            'panel',
            panel.name.toLowerCase(),
            'descuento',
            'laboratorio'
        ],
        openGraph: {
            title,
            description,
            type: 'website',
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL}/paneles/${panel.slug}`,
        },
    };
}

/**
 * Generate metadata for search results page
 */
export function generateSearchMetadata(query: string, resultCount: number): Metadata {
    return {
        title: `Resultados para "${query}"`,
        description: `Encontramos ${resultCount} estudios relacionados con "${query}". Compara precios y agenda tu cita.`,
        robots: {
            index: false, // Don't index search results
            follow: true,
        },
    };
}

/**
 * Generate JSON-LD structured data for rich snippets
 */
export function generateStudyPageJsonLd(study: Study, breadcrumbs: Array<{ name: string; url: string }>) {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            // MedicalTest
            {
                '@type': 'MedicalTest',
                name: study.name,
                description: study.description || study.whatIsIt,
                preparation: study.preparation,
                offers: {
                    '@type': 'Offer',
                    price: study.priceRegular,
                    priceCurrency: 'MXN',
                    availability: 'https://schema.org/InStock'
                }
            },
            // BreadcrumbList
            {
                '@type': 'BreadcrumbList',
                itemListElement: breadcrumbs.map((crumb, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: crumb.name,
                    item: crumb.url
                }))
            }
        ]
    };
}

/**
 * Helper to inject JSON-LD into page
 */
export function JsonLd({ data }: { data: Record<string, any> }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data)
            }}
        />
    );
}
