import { NextResponse } from 'next/server';
import { db } from '@/db';
import { subcategories } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET all subcategories
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get('categoryId');

        let query = db.select().from(subcategories);

        if (categoryId) {
            query = query.where(eq(subcategories.categoryId, categoryId)) as any;
        }

        const allSubcategories = await query;
        return NextResponse.json(allSubcategories);
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        return NextResponse.json({ error: 'Failed to fetch subcategories' }, { status: 500 });
    }
}

// POST create subcategory
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, categoryId, name, description, isActive, order } = body;

        const newSubcategory = await db.insert(subcategories).values({
            id,
            categoryId,
            name,
            description,
            isActive: isActive ?? true,
            order: order ?? 0,
        }).returning();

        return NextResponse.json(newSubcategory[0], { status: 201 });
    } catch (error) {
        console.error('Error creating subcategory:', error);
        return NextResponse.json({ error: 'Failed to create subcategory' }, { status: 500 });
    }
}

// PATCH update subcategory
export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) {
            return NextResponse.json({ error: 'Subcategory ID is required' }, { status: 400 });
        }

        const updatedSubcategory = await db
            .update(subcategories)
            .set({ ...updates, updatedAt: new Date() })
            .where(eq(subcategories.id, id))
            .returning();

        if (updatedSubcategory.length === 0) {
            return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
        }

        return NextResponse.json(updatedSubcategory[0]);
    } catch (error) {
        console.error('Error updating subcategory:', error);
        return NextResponse.json({ error: 'Failed to update subcategory' }, { status: 500 });
    }
}

// DELETE subcategory
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Subcategory ID is required' }, { status: 400 });
        }

        await db.delete(subcategories).where(eq(subcategories.id, id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting subcategory:', error);
        return NextResponse.json({ error: 'Failed to delete subcategory' }, { status: 500 });
    }
}
