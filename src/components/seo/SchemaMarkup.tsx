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

// LocalBusiness Schema for Sucursales
export function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        "name": "Laboratorio Clínico Del Bienestar",
        "image": "https://laboratorio.delbienestar.com.mx/images/logo.png",
        "url": "https://laboratorio.delbienestar.com.mx",
        "telephone": "+52-771-685-4026",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ignacio Galvan 10 interior 11 Plaza Bonanza",
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
        "sameAs": [
            "https://www.facebook.com/labbienestar",
            "https://wa.me/5217757371811"
        ]
    };

    return <JsonLd data={schema} />;
}

// Organization Schema for Homepage
export function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        "name": "Laboratorio Clínico Del Bienestar",
        "alternateName": "Laboratorio Del Bienestar",
        "url": "https://laboratorio.delbienestar.com.mx",
        "logo": "https://laboratorio.delbienestar.com.mx/images/logo.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+52-771-685-4026",
            "contactType": "customer service",
            "areaServed": "MX",
            "availableLanguage": "Spanish"
        },
        "sameAs": [
            "https://www.facebook.com/labbienestar",
            "https://wa.me/5217757371811"
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
        "image": image || "https://laboratorio.delbienestar.com.mx/images/blog/default-medical.jpg",
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
                "url": "https://laboratorio.delbienestar.com.mx/images/logo.png"
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

// Medical Test Schema for Study Pages
export function MedicalTestSchema({
    name,
    description,
    price,
    category,
    url
}: {
    name: string;
    description: string;
    price: number;
    category: string;
    url: string;
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "MedicalTest",
        "name": name,
        "description": description,
        "category": category,
        "url": url,
        "potentialAction": {
            "@type": "ScheduleAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://wa.me/5217757371811?text=Hola, quiero agendar el estudio: " + encodeURIComponent(name)
            }
        },
        "offers": {
            "@type": "Offer",
            "price": price,
            "priceCurrency": "MXN",
            "availability": "https://schema.org/InStock",
            "url": url
        }
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
