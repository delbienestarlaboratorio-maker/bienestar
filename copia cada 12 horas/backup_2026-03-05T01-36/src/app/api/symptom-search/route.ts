export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { sql } from 'drizzle-orm';
import { searchStudiesBySymptom } from '@/lib/symptom-search';

// Simplified version - 2026-02-14T20:40 - Test basic DB connection first

export async function POST(request: NextRequest) {
    try {
        const { symptom } = await request.json();

        console.log('[symptom-search] Received symptom:', symptom);
        console.log('[symptom-search] DATABASE_URL exists:', !!process.env.DATABASE_URL);

        if (!symptom || typeof symptom !== 'string') {
            return NextResponse.json(
                { error: 'Síntoma no proporcionado' },
                { status: 400 }
            );
        }

        // Check DATABASE_URL
        if (!process.env.DATABASE_URL) {
            console.error('[symptom-search] DATABASE_URL NOT CONFIGURED!');
            return NextResponse.json(
                { error: 'DATABASE_URL not configured' },
                { status: 500 }
            );
        }

        // Test basic DB connection first
        console.log('[symptom-search] Testing DB connection...');
        let totalStudies = 0;
        try {
            const countResult = await db.execute(sql`SELECT COUNT(*) as count FROM studies`);
            totalStudies = Number(countResult.rows[0]?.count || 0);
            console.log('[symptom-search] DB connected! Total studies:', totalStudies);
        } catch (dbError) {
            console.error('[symptom-search] DB CONNECTION FAILED:', dbError);
            return NextResponse.json(
                {
                    error: 'Database connection failed',
                    details: dbError instanceof Error ? dbError.message : String(dbError)
                },
                { status: 500 }
            );
        }

        // Search using keyword matching
        const searchResult = searchStudiesBySymptom(symptom);

        if (!searchResult) {
            return NextResponse.json({
                message: 'No encontré estudios específicos para tu síntoma.',
                recommendedStudies: []
            });
        }

        console.log('[symptom-search] Search result found:', searchResult.studyNames.length, 'study names');

        // Simple query - just search by first study name to test
        const firstStudyName = searchResult.studyNames[0];
        const pattern = `%${firstStudyName.toUpperCase()}%`;

        console.log('[symptom-search] Querying for:', firstStudyName);

        const result = await db.execute(sql`
            SELECT id, name, description, 
                   price_regular as "priceRegular", 
                   price_promotional as "pricePromotional", 
                   slug, 
                   category_id as "categoryId", 
                   turnaround_time as "turnaroundTime"
            FROM studies
            WHERE UPPER(name) LIKE ${pattern}
              AND is_active = true
            LIMIT 5
        `);

        const recommendedStudies = result.rows || [];
        console.log('[symptom-search] Found', recommendedStudies.length, 'studies');

        return NextResponse.json({
            message: searchResult.message,
            recommendedStudies: recommendedStudies.map((study: any) => ({
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
            _debug: {
                totalStudiesInDB: totalStudies,
                searchedStudyNames: searchResult.studyNames,
                foundCount: recommendedStudies.length
            }
        });

    } catch (error) {
        console.error('[symptom-search] FATAL ERROR:', error);
        console.error('[symptom-search] Error stack:', error instanceof Error ? error.stack : 'No stack');
        console.error('[symptom-search] Error type:', typeof error);
        console.error('[symptom-search] Error keys:', error ? Object.keys(error) : 'null');

        return NextResponse.json(
            {
                error: 'Error procesando tu consulta',
                message: error instanceof Error ? error.message : String(error),
                type: typeof error,
                stack: error instanceof Error ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        status: 'ok',
        endpoint: 'symptom-search',
        version: '2.0-simplified',
        timestamp: new Date().toISOString(),
        databaseConfigured: !!process.env.DATABASE_URL
    });
}
