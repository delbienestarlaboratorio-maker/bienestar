import { db } from './src/db';
import { studies } from './src/db/schema';
import { eq, and } from 'drizzle-orm';

async function testQuery() {
    const categoria = 'analisis-clinicos';
    const slug = 'glucosa';

    console.log(`\nSearching for: categoria="${categoria}", slug="${slug}"\n`);

    const [study] = await db
        .select()
        .from(studies)
        .where(and(eq(studies.slug, slug), eq(studies.categoryId, categoria)))
        .limit(1);

    if (study) {
        console.log('✅ FOUND:');
        console.log(JSON.stringify({
            id: study.id,
            slug: study.slug,
            name: study.name,
            categoryId: study.categoryId,
            price: study.priceRegular
        }, null, 2));
    } else {
        console.log('❌ NOT FOUND');

        // Try finding by slug only
        const [bySlug] = await db.select().from(studies).where(eq(studies.slug, slug)).limit(1);
        if (bySlug) {
            console.log('\nBUT found by slug only:');
            console.log(`categoryId: "${bySlug.categoryId}"`);
            console.log(`Expected: "${categoria}"`);
            console.log(`Match: ${bySlug.categoryId === categoria}`);
        }
    }
}

testQuery();
