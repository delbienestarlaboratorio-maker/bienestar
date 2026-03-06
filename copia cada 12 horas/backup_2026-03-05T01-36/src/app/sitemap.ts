import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/data/blog';
import { db } from '@/db';
import { studies } from '@/db/schema';
import { eq } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://laboratorio-bienestar.chispito.mx'; // Updated canonical domain

interface StudyEntry {
    slug: string;
    category?: string;
    name: string;
    isActive?: boolean;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. Static pages (todas las rutas del sitio)
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
        { url: `${BASE_URL}/estudios`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },
        { url: `${BASE_URL}/paquetes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/sucursales`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
        { url: `${BASE_URL}/nosotros`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${BASE_URL}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${BASE_URL}/promociones`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/check-ups`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/sueroterapia`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/calculadora`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/comparador`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/herramientas`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${BASE_URL}/resultados`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${BASE_URL}/agendar`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
        { url: `${BASE_URL}/privacidad`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
        { url: `${BASE_URL}/terminos`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ];

    // 1.5 Dynamic Herramientas Routes (SEO Scale)
    let dynamicTools: MetadataRoute.Sitemap = [];
    try {
        const herramientasDir = path.join(process.cwd(), 'src', 'app', 'herramientas');
        if (fs.existsSync(herramientasDir)) {
            const folders = fs.readdirSync(herramientasDir).filter(f => fs.statSync(path.join(herramientasDir, f)).isDirectory() && !f.startsWith('['));
            dynamicTools = folders.map(slug => ({
                url: `${BASE_URL}/herramientas/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8, // High priority for SEO tools
            }));
        }
    } catch (e) {
        console.error("Sitemap Tools Error:", e);
    }

    // 2. Study Routes — Consultados de la base de datos
    let studyRoutes: MetadataRoute.Sitemap = [];
    try {
        const activeStudies = await db.select({
            slug: studies.slug,
            categoryId: studies.categoryId
        }).from(studies).where(eq(studies.isActive, true));

        studyRoutes = activeStudies.filter(s => s.slug).map((study) => ({
            url: `${BASE_URL}/estudios/${study.categoryId || 'analisis-clinicos'}/${study.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));
    } catch {
        // En caso de fallo de DB en el build
    }

    // 3. Blog Posts
    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const blogPosts = getAllBlogPosts();
        blogRoutes = blogPosts.map((post: any) => ({
            url: `${BASE_URL}/blog/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }));
    } catch {
        // Blog data may not be available
    }

    return [...staticRoutes, ...dynamicTools, ...studyRoutes, ...blogRoutes];
}
