// Dynamic Sitemap Generator
// GET /api/sitemap.xml

import { NextResponse } from 'next/server';
import { db } from '@/db';
import { studies } from '@/db/schema';
import { studyPanels } from '@/db/schema/relationships';
import { eq } from 'drizzle-orm';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://laboratoriobienestar.com';

export async function GET() {
  try {
    const sitemap = await generateSitemap();

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('[Sitemap] Generation error:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

async function generateSitemap(): Promise<string> {
  // Get all studies
  const allStudies = await db.select().from(studies);

  // Get all panels
  const allPanels = await db.select().from(studyPanels).where(eq(studyPanels.isActive, true));

  // Get unique categories
  const categories = [...new Set(allStudies.map(s => s.categoryId))];

  const currentDate = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Main Pages -->
  <url>
    <loc>${BASE_URL}/estudios</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${BASE_URL}/paneles</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${BASE_URL}/nosotros</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>${BASE_URL}/contacto</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Category Pages -->
${categories.map(category => `  <url>
    <loc>${BASE_URL}/estudios/${encodeURIComponent(category)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}

  <!-- Study Pages -->
${allStudies.map(study => `  <url>
    <loc>${BASE_URL}/estudios/${encodeURIComponent(study.categoryId)}/${encodeURIComponent(study.slug)}</loc>
    <lastmod>${study.updatedAt?.toISOString() || currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}

  <!-- Panel Pages -->
${allPanels.map(panel => `  <url>
    <loc>${BASE_URL}/paneles/${encodeURIComponent(panel.slug)}</loc>
    <lastmod>${panel.updatedAt?.toISOString() || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}

</urlset>`;

  return xml;
}
