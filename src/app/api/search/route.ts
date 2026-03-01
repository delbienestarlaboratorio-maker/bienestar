export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { studies, categories } from '@/db/schema';
import { ilike, or, and, desc, eq, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query && !category) {
        return NextResponse.json({ results: [] });
    }

    try {
        const conditions = [];

        if (query) {
            const searchTerm = `%${query}%`;
            conditions.push(
                or(
                    ilike(studies.name, searchTerm),
                    ilike(studies.slug, searchTerm),
                    ilike(studies.description, searchTerm)
                )
            );
        }

        if (category && category !== 'todos') {
            conditions.push(eq(studies.categoryId, category));
        }

        // Ensure only active studies are returned
        conditions.push(eq(studies.isActive, true));

        const results = await db
            .select({
                id: studies.id,
                name: studies.name,
                slug: studies.slug,
                category: studies.categoryId,
                price: {
                    regular: studies.priceRegular,
                    promotional: studies.pricePromotional,
                },
                image: studies.image,
                description: studies.description,
            })
            .from(studies)
            .where(and(...conditions))
            .limit(limit);

        return NextResponse.json({ results });
    } catch (error) {
        console.error('Search API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
