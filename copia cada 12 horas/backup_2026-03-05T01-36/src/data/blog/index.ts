import { blogPosts as manualPosts } from '../blog-posts-base';
import { BLOG_CALENDAR_2022 } from './calendar-2022';
import { BLOG_CALENDAR_2023 } from './calendar-2023';
import { BLOG_CALENDAR_2024 } from './calendar-2024';
import { BLOG_CALENDAR_2025 } from './calendar-2025';
import { BLOG_CALENDAR_2026 } from './calendar-2026';

// Unificar todos los calendarios
export const FULL_BLOG_CALENDAR = [
    ...BLOG_CALENDAR_2022,
    ...BLOG_CALENDAR_2023,
    ...BLOG_CALENDAR_2024,
    ...BLOG_CALENDAR_2025,
    ...BLOG_CALENDAR_2026
];

// Mapeo de slugs a IDs manuales existentes
const MANUAL_POST_SLUGS = manualPosts.reduce((acc, post) => {
    acc[post.slug] = post;
    return acc;
}, {} as Record<string, typeof manualPosts[0]>);

// Helper para obtener el índice global
export function getBlogIndex() {
    return FULL_BLOG_CALENDAR.map((topic, index) => {
        // Generar ID basado en índice si no existe manual
        const isManual = !!MANUAL_POST_SLUGS[topic.slug];
        const manualPost = MANUAL_POST_SLUGS[topic.slug];

        return {
            ...topic,
            id: manualPost?.id || `art-${2022 + Math.floor(index / 52)}-${String(index % 52).padStart(3, '0')}`,
            isManual,
            manualContent: manualPost
        };
    });
}

export function getAllBlogPosts() {
    return getBlogIndex();
}

export function getBlogPostBySlug(slug: string) {
    return getBlogIndex().find(p => p.slug === slug);
}
