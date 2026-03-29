import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://herramientas.delbienestar.com.mx';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        }
    ];

    try {
        const herramientasDir = path.join(process.cwd(), 'app', 'herramientas');
        if (fs.existsSync(herramientasDir)) {
            const folders = fs.readdirSync(herramientasDir)
                .filter((f) => fs.statSync(path.join(herramientasDir, f)).isDirectory() && !f.startsWith('[') && !f.startsWith('('));
            
            folders.forEach((slug) => {
                routes.push({
                    url: `${BASE_URL}/herramientas/${slug}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly',
                    priority: 0.8,
                });
            });
        }
    } catch (e) {
        console.error("Error generating sitemap:", e);
    }

    return routes;
}
