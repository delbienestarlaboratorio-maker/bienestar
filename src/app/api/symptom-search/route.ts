import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { sql } from 'drizzle-orm';
import { searchStudiesBySymptom } from '@/lib/symptom-search';

// Force rebuild: 2026-02-14T08:42 - Fix symptom search with DATABASE_URL

export async function POST(request: NextRequest) {
    try {
        const { symptom } = await request.json();

        if (!symptom || typeof symptom !== 'string') {
            return NextResponse.json(
                { error: 'Síntoma no proporcionado' },
                { status: 400 }
            );
        }

        // Check if DATABASE_URL is configured
        if (!process.env.DATABASE_URL) {
            console.error('[symptom-search] DATABASE_URL not configured');
            return NextResponse.json(
                { error: 'Base de datos no configurada. Por favor contacta al administrador.' },
                { status: 500 }
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

        // Build WHERE clause with sql template for safety
        let whereClause = sql`UPPER(name) LIKE ${`%${searchResult.studyNames[0].toUpperCase()}%`}`;

        for (let i = 1; i < searchResult.studyNames.length; i++) {
            const pattern = `%${searchResult.studyNames[i].toUpperCase()}%`;
            whereClause = sql`${whereClause} OR UPPER(name) LIKE ${pattern}`;
        }

        console.log('[symptom-search] Searching for study names:', searchResult.studyNames);

        // Execute query with proper template literal
        const result = await db.execute(sql`
            SELECT id, name, description, price_regular as "priceRegular", 
                   price_promotional as "pricePromotional", slug, category_id as "categoryId", 
                   turnaround_time as "turnaroundTime"
            FROM studies
            WHERE (${whereClause})
              AND is_active = true
            LIMIT 10
        `);

        const recommendedStudies = result.rows || [];

        console.log('[symptom-search] Found studies:', recommendedStudies.length);

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
        console.error('[symptom-search] ERROR:', error);
        console.error('[symptom-search] Stack:', error instanceof Error ? error.stack : 'No stack trace');
        console.error('[symptom-search] DATABASE_URL configured:', !!process.env.DATABASE_URL);

        return NextResponse.json(
            {
                error: 'Error procesando tu consulta. Por favor intenta de nuevo.',
                details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
            },
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
