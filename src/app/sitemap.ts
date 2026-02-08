import { MetadataRoute } from 'next';
import { db } from '@/db';
import { studies } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { studyPackages } from '@/data/studyPackages';
import { getAllBlogPosts } from '@/data/blog';
import { BlogPost } from '@/data/blog-posts-base';

const BASE_URL = 'https://laboratorio.delbienestar.com.mx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. Static Routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/paquetes`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/sucursales`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/resultados`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/contacto`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    // 2. Dynamic Study Routes (Database)
    // TEMPORARY: Disabled DB query during build to allow Vercel deployment
    // TODO: Re-enable after setting up Vercel environment variables for DATABASE_URL
    /*
    const activeStudies = await db
        .select({
            slug: studies.slug,
            updatedAt: studies.updatedAt,
        })
        .from(studies)
        .where(eq(studies.isActive, true));

    const studyRoutes: MetadataRoute.Sitemap = activeStudies.map((study) => ({
        url: `${BASE_URL}/estudios/${study.slug}`,
        lastModified: study.updatedAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));
    */

    // Temporary: Empty array until DB is accessible in Vercel
    const studyRoutes: MetadataRoute.Sitemap = [];

    // 3. Dynamic Package Routes (Data file)
    // Note: If you have individual pages for packages (e.g. /paquetes/check-up-basico), add them here.
    // Assuming currently they are all on /paquetes or handled via query params, but if we had slugs:
    /*
    const packageRoutes: MetadataRoute.Sitemap = studyPackages.map((pkg) => ({
        url: `${BASE_URL}/paquetes/${pkg.id}`, // Only if these pages exist
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));
    */

    // 4. Blog Posts
    const blogPosts = getAllBlogPosts();
    const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post: any) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly', // Blog posts change less often than studies
        priority: 0.6,
    }));

    return [...staticRoutes, ...studyRoutes, ...blogRoutes];
}
