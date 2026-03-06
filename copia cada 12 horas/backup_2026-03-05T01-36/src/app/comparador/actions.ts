'use server';

import { db } from '@/db';
import { studies } from '@/db/schema';
import { ilike, eq, and, or } from 'drizzle-orm';

export async function searchStudiesForComparador(query: string) {
    if (!query || query.length < 2) return [];

    const searchTerm = `%${query}%`;

    const results = await db
        .select({
            id: studies.id,
            slug: studies.slug,
            name: studies.name,
            priceRegular: studies.priceRegular,
            pricePromotional: studies.pricePromotional,
            turnaroundTime: studies.turnaroundTime,
            description: studies.description,
            preparation: studies.preparation,
            detailedPreparation: studies.detailedPreparation,
        })
        .from(studies)
        .where(
            and(
                eq(studies.isActive, true),
                or(
                    ilike(studies.name, searchTerm),
                    ilike(studies.slug, searchTerm)
                )
            )
        )
        .limit(8);

    return results;
}
