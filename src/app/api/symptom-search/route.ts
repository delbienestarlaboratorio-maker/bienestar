import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { studies } from '@/db/schema';
import { sql, inArray } from 'drizzle-orm';
import { searchStudiesBySymptom } from '@/lib/symptom-search';

export async function POST(request: NextRequest) {
    try {
        const { symptom } = await request.json();

        if (!symptom || typeof symptom !== 'string') {
            return NextResponse.json(
                { error: 'Síntoma no proporcionado' },
                { status: 400 }
            );
        }

        // Search using keyword matching
        const searchResult = searchStudiesBySymptom(symptom);

        if (!searchResult) {
            return NextResponse.json({
                message: 'No encontré estudios específicos para tu síntoma. Te recomiendo consultar con tu médico para una evaluación personalizada.',
                recommendedStudies: [],
                suggestions: [
                    'Intenta describir tu síntoma de otra forma (ej: "me duele el estómago" en vez de "malestar")',
                    'Sé más específico sobre tu síntoma principal',
                    'Revisa nuestro catálogo completo de estudios'
                ]
            });
        }

        // Get studies from database by name
        const recommendedStudies = await db
            .select()
            .from(studies)
            .where(
                sql`${studies.name} = ANY(${sql`ARRAY[${sql.join(searchResult.studyNames.map(name => sql`${name}`), sql`, `)}]::text[]`})`
            )
            .limit(10);

        // Build response message
        const message = `
${searchResult.message}

Basado en tu síntoma, te recomendamos los siguientes estudios:
`.trim();

        return NextResponse.json({
            message,
            recommendedStudies: recommendedStudies.map(study => ({
                id: study.id,
                name: study.name,
                description: study.description,
                price: study.pricePromotional || study.priceRegular,
                slug: study.slug,
                categoryId: study.categoryId,
                turnaroundTime: study.turnaroundTime
            })),
            category: searchResult.category,
            confidence: searchResult.confidence,
            matchedKeywords: searchResult.matchedKeywords
        });

    } catch (error) {
        console.error('Symptom search error:', error);
        return NextResponse.json(
            { error: 'Error procesando tu consulta. Por favor intenta de nuevo.' },
            { status: 500 }
        );
    }
}

// GET method for getting example searches
export async function GET() {
    const examples = [
        'me duele la panza',
        'estoy muy cansado todo el día',
        'dolor de cabeza frecuente',
        'tengo tos con flema',
        'orino mucho y tengo sed',
        'subí de peso sin razón',
        'tengo fiebre y escalofríos',
        'diarrea constante'
    ];

    return NextResponse.json({
        examples,
        categories: [
            'Síntomas digestivos',
            'Cansancio y fatiga',
            'Dolores persistentes',
            'Síntomas respiratorios',
            'Problemas urinarios',
            'Cambios de peso',
            'Síntomas de infección'
        ]
    });
}
