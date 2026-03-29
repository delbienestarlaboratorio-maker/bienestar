import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://salud.delbienestar.com.mx';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
        { url: `${BASE_URL}/enfermedades`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/sintomas`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/valores-clinicos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/valores-clinicos/analizador`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 }
    ];

    try {
        const sintomasDir = path.join(process.cwd(), 'app', 'sintomas');
        if (fs.existsSync(sintomasDir)) {
            const folders = fs.readdirSync(sintomasDir).filter((f) => {
                const isDir = fs.statSync(path.join(sintomasDir, f)).isDirectory();
                return isDir && !f.startsWith('[') && !f.startsWith('(') && f !== 'components';
            });
            
            folders.forEach((slug) => {
                routes.push({
                    url: `${BASE_URL}/sintomas/${slug}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly',
                    priority: 0.8,
                });
            });
        }
    } catch (e) {
        console.error("Error generating salud sitemap:", e);
    }

    return routes;
}
