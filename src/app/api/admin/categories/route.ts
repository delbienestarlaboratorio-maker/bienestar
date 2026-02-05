import { NextResponse } from 'next/server';
import { db } from '@/db';
import { categories } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET all categories
export async function GET() {
    try {
        const allCategories = await db.select().from(categories);
        return NextResponse.json(allCategories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

// POST create category
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, name, description, icon, image, isActive, order } = body;

        const newCategory = await db.insert(categories).values({
            id,
            name,
            description,
            icon,
            image,
            isActive: isActive ?? true,
            order: order ?? 0,
        }).returning();

        return NextResponse.json(newCategory[0], { status: 201 });
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}

// PATCH update category
export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) {
            return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
        }

        const updatedCategory = await db
            .update(categories)
            .set({ ...updates, updatedAt: new Date() })
            .where(eq(categories.id, id))
            .returning();

        if (updatedCategory.length === 0) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        return NextResponse.json(updatedCategory[0]);
    } catch (error) {
        console.error('Error updating category:', error);
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}

// DELETE category
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
        }

        await db.delete(categories).where(eq(categories.id, id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
