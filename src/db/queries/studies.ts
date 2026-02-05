import { db } from '../index';
import { studies, categories, subcategories } from '../schema';
import { eq, and, or, ilike, sql } from 'drizzle-orm';

export async function getStudyBySlug(slug: string, categoryId: string) {
    const result = await db
        .select()
        .from(studies)
        .where(
            and(
                eq(studies.slug, slug),
                eq(studies.categoryId, categoryId),
                eq(studies.isActive, true)
            )
        )
        .limit(1);

    return result[0] || null;
}

export async function getCategoryById(id: string) {
    const result = await db
        .select()
        .from(categories)
        .where(eq(categories.id, id))
        .limit(1);

    return result[0] || null;
}

export async function getStudiesByCategory(categoryId: string) {
    return await db
        .select()
        .from(studies)
        .where(
            and(
                eq(studies.categoryId, categoryId),
                eq(studies.isActive, true)
            )
        );
}

export async function getRelatedStudies(studyId: string, categoryId: string, limit = 4) {
    return await db
        .select()
        .from(studies)
        .where(
            and(
                eq(studies.categoryId, categoryId),
                sql`${studies.id} != ${studyId}`,
                eq(studies.isActive, true)
            )
        )
        .limit(limit);
}

export async function getAllCategories() {
    return await db
        .select()
        .from(categories)
        .where(eq(categories.isActive, true))
        .orderBy(categories.order);
}

export async function getSubcategoriesByCategory(categoryId: string) {
    return await db
        .select()
        .from(subcategories)
        .where(eq(subcategories.categoryId, categoryId));
}
