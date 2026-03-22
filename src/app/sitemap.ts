import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/data/blog';
import { db } from '@/db';
import { studies } from '@/db/schema';
import { eq } from 'drizzle-orm';
import symptomsManifest from '@/data/symptoms-slugs.json';
import biomarkersManifest from '@/data/biomarkers-slugs.json';
import diseasesManifest from '@/data/diseases-slugs.json';

/**
 * Helper to prevent bundlers from statically analyzing and embedding large directories
 */
function safeRequire(moduleName: string) {
    try {
        return eval('require')(moduleName);
    } catch {
        return null;
    }
}

const BASE_URL = 'https://laboratorio.delbienestar.com.mx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. Static pages
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
        { url: `${BASE_URL}/precios`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/sintomas`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
        { url: `${BASE_URL}/valores-clinicos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
        { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${BASE_URL}/resultados`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${BASE_URL}/agendar`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
        { url: `${BASE_URL}/privacidad`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
        { url: `${BASE_URL}/terminos`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
        { url: `${BASE_URL}/enfermedades`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    ];

    // 2. Herramientas (calculadoras médicas)
    let dynamicTools: MetadataRoute.Sitemap = [];
    try {
        const fs = safeRequire('fs');
        const path = safeRequire('path');
        if (fs && path) {
            const herramientasDir = path.join(process.cwd(), 'src', 'app', 'herramientas');
            if (fs.existsSync(herramientasDir)) {
                const folders = fs.readdirSync(herramientasDir)
                    .filter((f: string) => fs.statSync(path.join(herramientasDir, f)).isDirectory() && !f.startsWith('['));
                dynamicTools = folders.map((slug: string) => ({
                    url: `${BASE_URL}/herramientas/${slug}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                }));
            }
        }
    } catch (e) {
        console.error("Sitemap Tools Error:", e);
    }

    // 3 & 4. Síntomas y Biomarcadores (Usamos manifests importados)
    let sintomasRoutes: MetadataRoute.Sitemap = [];
    let biomarkerRoutes: MetadataRoute.Sitemap = [];

    try {
        // Síntomas
        sintomasRoutes = (Array.isArray(symptomsManifest) ? symptomsManifest : [])
            .filter((s: any) => s.slug)
            .map((s: any) => ({
                url: `${BASE_URL}/sintomas/${s.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.75,
            }));

        // Biomarcadores
        biomarkerRoutes = (Array.isArray(biomarkersManifest) ? biomarkersManifest : [])
            .filter((b: any) => b.slug)
            .map((b: any) => ({
                url: `${BASE_URL}/valores-clinicos/${b.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.75,
            }));
    } catch (e) {
        console.error("Sitemap Data Error:", e);
    }

    // 4.5 Páginas de precios
    let precioRoutes: MetadataRoute.Sitemap = [];
    try {
        const fs = safeRequire('fs');
        const path = safeRequire('path');
        if (fs && path) {
            const preciosDir = path.join(process.cwd(), 'src', 'app', 'precios');
            if (fs.existsSync(preciosDir)) {
                const slugs = fs.readdirSync(preciosDir)
                    .filter((f: string) => {
                        const fullPath = path.join(preciosDir, f);
                        return fs.statSync(fullPath).isDirectory() && !f.startsWith('[');
                    });
                precioRoutes = slugs.map((slug: string) => ({
                    url: `${BASE_URL}/precios/${slug}`,
                    lastModified: new Date(),
                    changeFrequency: 'monthly' as const,
                    priority: 0.85,
                }));
            }
        }
    } catch (e) {
        console.error("Sitemap Precios Error:", e);
    }

    // 5. Estudios (desde base de datos)
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

    // 6. Blog Posts
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

    // 7. Enfermedades (Usamos manifest importado)
    let enfermedadesRoutes: MetadataRoute.Sitemap = [];
    try {
        enfermedadesRoutes = (Array.isArray(diseasesManifest) ? diseasesManifest : [])
            .filter((d: any) => d.slug)
            .map((d: any) => ({
                url: `${BASE_URL}/enfermedades/${d.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.75,
            }));
    } catch (e) {
        console.error("Sitemap Enfermedades Error:", e);
    }

    return [...staticRoutes, ...dynamicTools, ...sintomasRoutes, ...biomarkerRoutes, ...precioRoutes, ...studyRoutes, ...blogRoutes, ...enfermedadesRoutes];
}
