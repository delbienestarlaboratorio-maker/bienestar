import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/data/blog';
import studiesData from '@/data/studies.json';

const BASE_URL = 'https://laboratorio.delbienestar.com.mx';

interface StudyEntry {
    slug: string;
    categoryId: string;
    name: string;
}

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
        {
            url: `${BASE_URL}/faq`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];

    // 2. Study Routes from static studies.json (452 active studies)
    const studyRoutes: MetadataRoute.Sitemap = (studiesData as StudyEntry[]).map((study) => ({
        url: `${BASE_URL}/estudios/${study.categoryId}/${study.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // 3. Blog Posts
    const blogPosts = getAllBlogPosts();
    const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post: any) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...studyRoutes, ...blogRoutes];
}
