// SEO Schema Markup Generator
// Implements 7 types of structured data for Google Rich Results

import { studies } from '@/db/schema';

type Study = typeof studies.$inferSelect;

interface SchemaMarkupProps {
    study?: any;
    panel?: any;
    breadcrumbs?: Array<{ name: string; url: string }>;
    faqs?: Array<{ question: string; answer: string }>;
    reviews?: Array<{ rating: number; author: string; text: string }>;
}

/**
 * Generate Medical Test Schema (MedicalTest)
 */
export function generateMedicalTestSchema(study: any) {
    return {
        '@context': 'https://schema.org',
        '@type': 'MedicalTest',
        name: study.name,
        description: study.description || study.whatIsIt || '',
        usedToDiagnose: {
            '@type': 'MedicalCondition',
            name: study.category
        },
        preparation: study.preparation || 'No requiere preparación especial',
        howPerformed: study.sampleType || 'Análisis de laboratorio',
        normalRange: study.normalRange || undefined,
        offers: {
            '@type': 'Offer',
            price: study.price,
            priceCurrency: 'MXN',
            availability: 'https://schema.org/InStock',
            url: `https://laboratoriobienestar.com/estudios/${study.category}/${study.slug}`,
            seller: {
                '@type': 'MedicalBusiness',
                name: 'Laboratorio Bienestar'
            }
        }
    };
}

/**
 * Generate Product Schema for e-commerce
 */
export function generateProductSchema(study: any, reviews?: any[]) {
    const avgRating = reviews?.length
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 5.0;

    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: study.name,
        description: study.description || '',
        image: study.imageUrl || 'https://laboratoriobienestar.com/images/default-study.jpg',
        sku: study.id,
        mpn: study.id,
        brand: {
            '@type': 'Brand',
            name: 'Laboratorio Bienestar'
        },
        offers: {
            '@type': 'Offer',
            url: `https://laboratoriobienestar.com/estudios/${study.category}/${study.slug}`,
            priceCurrency: 'MXN',
            price: study.price,
            priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition'
        },
        aggregateRating: reviews?.length ? {
            '@type': 'AggregateRating',
            ratingValue: avgRating.toFixed(1),
            reviewCount: reviews.length,
            bestRating: 5,
            worstRating: 1
        } : undefined
    };
}

/**
 * Generate FAQ Schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };
}

/**
 * Generate Breadcrumb Schema
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: crumb.url
        }))
    };
}

/**
 * Generate LocalBusiness Schema
 */
export function generateLocalBusinessSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'MedicalBusiness',
        name: 'Laboratorio Bienestar',
        description: 'Laboratorio clínico con más de 2,000 estudios disponibles. Análisis clínicos, radiología, cardiología y ultrasonido.',
        image: 'https://laboratoriobienestar.com/images/logo.png',
        '@id': 'https://laboratoriobienestar.com',
        url: 'https://laboratoriobienestar.com',
        telephone: '+52-55-1234-5678',
        email: 'contacto@laboratoriobienestar.com',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Av. Principal 123',
            addressLocality: 'Ciudad de México',
            addressRegion: 'CDMX',
            postalCode: '01000',
            addressCountry: 'MX'
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 19.4326,
            longitude: -99.1332
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '07:00',
                closes: '20:00'
            },
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '08:00',
                closes: '14:00'
            }
        ],
        priceRange: '$$',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '247'
        }
    };
}

/**
 * Generate ItemList Schema (for study categories)
 */
export function generateItemListSchema(studies: any[], listName: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: listName,
        numberOfItems: studies.length,
        itemListElement: studies.map((study, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'MedicalTest',
                name: study.name,
                url: `https://laboratoriobienestar.com/estudios/${study.category}/${study.slug}`,
                offers: {
                    '@type': 'Offer',
                    price: study.price,
                    priceCurrency: 'MXN'
                }
            }
        }))
    };
}

/**
 * Generate Organization Schema
 */
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'MedicalOrganization',
        name: 'Laboratorio Bienestar',
        alternateName: 'Lab Bienestar',
        url: 'https://laboratoriobienestar.com',
        logo: 'https://laboratoriobienestar.com/images/logo.png',
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+52-55-1234-5678',
            contactType: 'customer service',
            areaServed: 'MX',
            availableLanguage: ['es', 'en']
        },
        sameAs: [
            'https://www.facebook.com/laboratoriobienestar',
            'https://www.instagram.com/laboratoriobienestar',
            'https://twitter.com/labbienestar'
        ]
    };
}

/**
 * React Component for Schema Markup
 */
export function SchemaMarkup({ study, panel, breadcrumbs, faqs, reviews }: SchemaMarkupProps) {
    const schemas: any[] = [];

    // Always include Organization
    schemas.push(generateOrganizationSchema());

    // Add study-specific schemas
    if (study) {
        schemas.push(generateMedicalTestSchema(study));
        schemas.push(generateProductSchema(study, reviews));
    }

    // Add breadcrumbs if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
        schemas.push(generateBreadcrumbSchema(breadcrumbs));
    }

    // Add FAQs if provided
    if (faqs && faqs.length > 0) {
        schemas.push(generateFAQSchema(faqs));
    }

    // Add LocalBusiness on homepage
    if (!study && !panel) {
        schemas.push(generateLocalBusinessSchema());
    }

    return (
        <>
            {schemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schema)
                    }}
                />
            ))}
        </>
    );
}

/**
 * Helper to generate all schemas for a study page
 */
export function generateStudyPageSchemas(
    study: any,
    breadcrumbs: Array<{ name: string; url: string }>,
    faqs?: Array<{ question: string; answer: string }>,
    reviews?: any[]
) {
    return {
        medicalTest: generateMedicalTestSchema(study),
        product: generateProductSchema(study, reviews),
        breadcrumb: generateBreadcrumbSchema(breadcrumbs),
        faq: faqs ? generateFAQSchema(faqs) : null,
        organization: generateOrganizationSchema()
    };
}
