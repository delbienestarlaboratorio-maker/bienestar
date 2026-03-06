import React from 'react';

interface MedicalSchemaProps {
    type: 'DiagnosticProcedure' | 'MedicalWebPage' | 'DiagnosticLab';
    data: any;
}

export const MedicalSchema: React.FC<MedicalSchemaProps> = ({ type, data }) => {
    const schema = {
        '@context': 'https://schema.org',
        '@type': type,
        ...data
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
