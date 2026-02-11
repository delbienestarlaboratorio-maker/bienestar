import { db } from '@/db';
import { studies } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{
        categoria: string;
        slug: string;
    }>;
}

export default async function DebugPage({ params }: PageProps) {
    const { categoria, slug } = await params;

    let searchResult: any = null;
    let searchError: any = null;
    let bySlugOnly: any = null;
    let allStudiesCount = 0;

    try {
        // Test 1: Try exact query
        const [result] = await db
            .select()
            .from(studies)
            .where(and(eq(studies.slug, slug), eq(studies.categoryId, categoria)))
            .limit(1);

        searchResult = result;

        // Test 2: Try by slug only
        const [result2] = await db
            .select()
            .from(studies)
            .where(eq(studies.slug, slug))
            .limit(1);

        bySlugOnly = result2;

        // Test 3: Count all studies
        const countResult = await db.select().from(studies).limit(1);
        allStudiesCount = countResult.length;

    } catch (error: any) {
        searchError = error?.message || String(error);
    }

    return (
        <div style={{ padding: '40px', fontFamily: 'monospace', background: '#000', color: '#0f0', minHeight: '100vh', fontSize: '14px' }}>
            <h1>🔍 Debug: {slug}</h1>

            <div style={{ background: '#111', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
                <h2>Search Parameters</h2>
                <pre>{JSON.stringify({ categoria, slug }, null, 2)}</pre>
            </div>

            <div style={{ background: '#111', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
                <h2>Search Result (categoria + slug)</h2>
                {searchResult ? (
                    <pre style={{ color: '#0f0' }}>{JSON.stringify({
                        found: true,
                        id: searchResult.id,
                        slug: searchResult.slug,
                        name: searchResult.name,
                        categoryId: searchResult.categoryId,
                        price: searchResult.priceRegular
                    }, null, 2)}</pre>
                ) : (
                    <p style={{ color: '#f00' }}>NOT FOUND</p>
                )}
            </div>

            <div style={{ background: '#111', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
                <h2>Search Result (slug only)</h2>
                {bySlugOnly ? (
                    <pre style={{ color: '#ff0' }}>{JSON.stringify({
                        found: true,
                        slug: bySlugOnly.slug,
                        categoryId: bySlugOnly.categoryId,
                        name: bySlugOnly.name,
                        matches: bySlugOnly.categoryId === categoria
                    }, null, 2)}</pre>
                ) : (
                    <p style={{ color: '#f00' }}>NOT FOUND</p>
                )}
            </div>

            <div style={{ background: '#111', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
                <h2>Database Status</h2>
                <p>Total studies in DB: {allStudiesCount}</p>
                {searchError && <p style={{ color: '#f00' }}>Error: {searchError}</p>}
            </div>
        </div>
    );
}
