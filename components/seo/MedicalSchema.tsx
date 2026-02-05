import { Organization, MedicalBusiness, WithContext, MedicalTest, DiagnosticProcedure } from 'schema-dts';

export function OrganizationSchema() {
    const schema: WithContext<Organization> = {
        '@context': 'https://schema.org',
        '@type': 'MedicalOrganization',
        name: 'Diagnósticos Clínicos Bienestar',
        url: 'https://laboratorio.delbienestar.com.mx',
        logo: 'https://laboratorio.delbienestar.com.mx/logo.png',
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+52-55-1234-5678',
            contactType: 'customer service'
        },
        sameAs: [
            'https://www.facebook.com/laboratoriobienestar',
            'https://www.instagram.com/laboratoriobienestar'
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface StudySchemaProps {
    name: string;
    description: string;
    price: number;
    preparation: string;
    image: string;
}

export function DiagnosticSchema({ name, description, price, preparation, image }: StudySchemaProps) {
    const schema: any = {
        '@context': 'https://schema.org',
        '@type': 'DiagnosticProcedure',
        name: name,
        description: description,
        image: image,
        bodyLocation: 'Whole body', // Ajustable dinámicamente
        preparation: preparation,
        offers: {
            '@type': 'Offer',
            price: price,
            priceCurrency: 'MXN',
            availability: 'https://schema.org/InStock'
        },
        provider: {
            '@type': 'MedicalOrganization',
            name: 'Diagnósticos Clínicos Bienestar'
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
