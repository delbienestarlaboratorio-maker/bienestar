import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://laboratorio.delbienestar.com.mx';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/', '/login/', '/checkout/'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                crawlDelay: 0,
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
