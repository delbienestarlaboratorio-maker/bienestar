// Schema.org Structured Data Components
// Enables Google rich snippets for better SEO

interface SchemaProps {
    data: Record<string, any>;
}

export function JsonLd({ data }: SchemaProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

// LocalBusiness Schema for Sucursales — enhanced with AggregateRating
export function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": ["MedicalClinic", "MedicalLaboratory"],
        "name": "Diagnósticos Clínicos Bienestar",
        "alternateName": "Laboratorio Del Bienestar",
        "image": "https://laboratorio.delbienestar.com.mx/images/og-image.png",
        "url": "https://laboratorio.delbienestar.com.mx",
        "telephone": "+52-771-685-4026",
        "priceRange": "$-$$",
        "description": "Laboratorio clínico en Tizayuca, Hidalgo con más de 500 estudios disponibles. Análisis clínicos, ultrasonidos, sueroterapia. Resultados el mismo día. Precios accesibles.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ignacio Rodríguez Galván 10, Local 11, Plaza Bonanza",
            "addressLocality": "Tizayuca",
            "addressRegion": "Hidalgo",
            "postalCode": "43800",
            "addressCountry": "MX"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 19.84167,
            "longitude": -98.98028
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "07:00",
                "closes": "19:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "07:00",
                "closes": "14:00"
            }
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "95",
            "bestRating": "5",
            "worstRating": "1"
        },
        "areaServed": [
            { "@type": "City", "name": "Tizayuca" },
            { "@type": "City", "name": "Pachuca" },
            { "@type": "City", "name": "Tolcayuca" },
            { "@type": "City", "name": "Zapotlán" },
            { "@type": "City", "name": "Zempoala" },
            { "@type": "City", "name": "Tecámac" }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Estudios de Laboratorio",
            "itemListElement": [
                { "@type": "OfferCatalog", "name": "Análisis Clínicos" },
                { "@type": "OfferCatalog", "name": "Ultrasonidos" },
                { "@type": "OfferCatalog", "name": "Sueroterapia" },
                { "@type": "OfferCatalog", "name": "Perfiles y Paquetes" }
            ]
        },
        "sameAs": [
            "https://www.facebook.com/labbienestar",
            "https://wa.me/527716854026"
        ],
        "paymentAccepted": ["Efectivo", "Tarjeta de débito", "Tarjeta de crédito", "Transferencia bancaria"],
        "currenciesAccepted": "MXN"
    };

    return <JsonLd data={schema} />;
}

// Organization Schema for Homepage
export function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        "name": "Diagnósticos Clínicos Bienestar",
        "alternateName": "Laboratorio Del Bienestar",
        "url": "https://laboratorio.delbienestar.com.mx",
        "logo": "https://laboratorio.delbienestar.com.mx/images/og-image.png",
        "description": "Laboratorio clínico en Tizayuca, Hidalgo. Más de 500 estudios clínicos con resultados el mismo día y precios accesibles.",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+52-771-685-4026",
            "contactType": "customer service",
            "areaServed": "MX",
            "availableLanguage": "Spanish"
        },
        "sameAs": [
            "https://www.facebook.com/labbienestar",
            "https://wa.me/527716854026"
        ]
    };

    return <JsonLd data={schema} />;
}

// Article Schema for Blog Posts
export function ArticleSchema({
    title,
    description,
    datePublished,
    dateModified,
    image,
    url,
    keywords
}: {
    title: string;
    description: string;
    datePublished: string;
    dateModified?: string;
    image?: string;
    url: string;
    keywords?: string[];
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": image || "https://laboratorio.delbienestar.com.mx/images/og-image.png",
        "datePublished": datePublished,
        "dateModified": dateModified || datePublished,
        "author": {
            "@type": "Organization",
            "name": "Laboratorio Del Bienestar",
            "url": "https://laboratorio.delbienestar.com.mx"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Laboratorio Del Bienestar",
            "logo": {
                "@type": "ImageObject",
                "url": "https://laboratorio.delbienestar.com.mx/images/og-image.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        },
        ...(keywords && keywords.length > 0 && { "keywords": keywords.join(", ") })
    };

    return <JsonLd data={schema} />;
}

// Medical Test Schema for Study Pages — enhanced with provider info
export function MedicalTestSchema({
    name,
    description,
    price,
    category,
    url,
    preparation,
    turnaroundTime
}: {
    name: string;
    description: string;
    price: number;
    category: string;
    url: string;
    preparation?: string;
    turnaroundTime?: string;
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "MedicalTest",
        "name": name,
        "description": description,
        "medicineSystem": "https://schema.org/WesternConventional",
        "relevantSpecialty": category,
        "url": url,
        ...(preparation && { "preparation": preparation }),
        ...(turnaroundTime && { "normalRange": turnaroundTime }),
        "usedToDiagnose": {
            "@type": "MedicalCondition",
            "name": `Condiciones detectadas por ${name}`
        },
        "potentialAction": {
            "@type": "OrderAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `https://wa.me/527716854026?text=${encodeURIComponent(`Hola, me interesa el estudio ${name} ($${Math.round(price)} MXN). ¿Qué necesito para realizarlo?`)}`,
                "actionPlatform": "https://schema.org/DesktopWebPlatform"
            }
        },
        "offers": {
            "@type": "Offer",
            "price": price,
            "priceCurrency": "MXN",
            "availability": "https://schema.org/InStock",
            "url": url,
            "seller": {
                "@type": "MedicalClinic",
                "name": "Diagnósticos Clínicos Bienestar",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Tizayuca",
                    "addressRegion": "Hidalgo",
                    "addressCountry": "MX"
                }
            }
        }
    };

    return <JsonLd data={schema} />;
}

// FAQPage Schema — enables Google FAQ rich snippets
export function FAQPageSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
    if (!faqs || faqs.length === 0) return null;

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return <JsonLd data={schema} />;
}

// Breadcrumb Schema
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };

    return <JsonLd data={schema} />;
}

// WebSite Schema with SearchAction — enables Google search box
export function WebSiteSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Laboratorio Del Bienestar",
        "url": "https://laboratorio.delbienestar.com.mx",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://laboratorio.delbienestar.com.mx/estudios?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    return <JsonLd data={schema} />;
}
