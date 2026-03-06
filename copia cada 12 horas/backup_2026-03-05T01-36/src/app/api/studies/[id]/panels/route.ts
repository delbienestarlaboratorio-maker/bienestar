export const runtime = 'edge';
// API endpoint for getting recommended panels for a study
// GET /api/studies/[id]/panels

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { studies } from '@/db/schema';
import { studyPanels, panelItems } from '@/db/schema/relationships';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: studyId } = await params;

        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '3');

        // Find panels that contain this study
        const panelsWithStudy = await db
            .select({
                panelId: panelItems.panelId,
                displayOrder: panelItems.displayOrder
            })
            .from(panelItems)
            .where(eq(panelItems.studyId, studyId));

        if (panelsWithStudy.length === 0) {
            return NextResponse.json({
                panels: [],
                count: 0
            });
        }

        const panelIds = panelsWithStudy.map(p => p.panelId);

        // Get full panel details
        const allPanels = await db
            .select()
            .from(studyPanels)
            .where(eq(studyPanels.isActive, true));

        const filteredPanels = allPanels
            .filter(p => panelIds.includes(p.id))
            .sort((a, b) => (b.purchaseCount || 0) - (a.purchaseCount || 0))
            .slice(0, limit);

        // For each panel, get all studies included
        const panelsWithStudies = await Promise.all(
            filteredPanels.map(async (panel) => {
                // Get all items in this panel
                const items = await db
                    .select({
                        studyId: panelItems.studyId,
                        displayOrder: panelItems.displayOrder,
                        isRequired: panelItems.isRequired,
                        customPrice: panelItems.customPrice
                    })
                    .from(panelItems)
                    .where(eq(panelItems.panelId, panel.id))
                    .orderBy(panelItems.displayOrder);

                // Get study details
                const studyIds = items.map(i => i.studyId);
                const allStudies = await db.select().from(studies);
                const panelStudies = allStudies.filter(s => studyIds.includes(s.id));

                // Calculate total individual price
                const totalIndividualPrice = panelStudies.reduce((sum, study) => {
                    return sum + parseFloat(study.priceRegular?.toString() || '0');
                }, 0);

                // Calculate panel price with discount
                const panelPrice = parseFloat(panel.basePrice);
                const savings = totalIndividualPrice - panelPrice;
                const savingsPercentage = totalIndividualPrice > 0
                    ? Math.round((savings / totalIndividualPrice) * 100)
                    : 0;

                // Combine items with study details
                const studiesWithDetails = items.map(item => {
                    const study = panelStudies.find(s => s.id === item.studyId);
                    return {
                        ...study,
                        displayOrder: item.displayOrder,
                        isRequired: item.isRequired,
                        customPrice: item.customPrice
                    };
                }).filter(Boolean);

                return {
                    id: panel.id,
                    name: panel.name,
                    slug: panel.slug,
                    description: panel.description,
                    category: panel.category,
                    subcategory: panel.subcategory,
                    medicalSpecialty: panel.medicalSpecialty,
                    recommendedFor: panel.recommendedFor,

                    // Pricing
                    panelPrice: panelPrice,
                    individualPrice: totalIndividualPrice,
                    savings: savings,
                    savingsPercentage: savingsPercentage,
                    discountPercentage: panel.discountPercentage,

                    // Studies
                    studies: studiesWithDetails,
                    studyCount: studiesWithDetails.length,

                    // Stats
                    viewCount: panel.viewCount,
                    purchaseCount: panel.purchaseCount,
                    isFeatured: panel.isFeatured
                };
            })
        );

        return NextResponse.json({
            panels: panelsWithStudies,
            count: panelsWithStudies.length
        });

    } catch (error) {
        console.error('[API] Error fetching panels:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
