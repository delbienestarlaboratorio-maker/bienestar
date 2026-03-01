export const runtime = 'edge';
// API endpoint for getting related studies
// GET /api/studies/[id]/related

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { studies } from '@/db/schema';
import { studyRelationships } from '@/db/schema/relationships';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: studyId } = await params;

        // Get relationship type from query params (optional)
        const { searchParams } = new URL(request.url);
        const relationshipType = searchParams.get('type'); // 'similar', 'complementary', etc.
        const limit = parseInt(searchParams.get('limit') || '6');

        // Build query conditions
        const conditions = relationshipType
            ? and(
                eq(studyRelationships.studyId, studyId),
                eq(studyRelationships.relationshipType, relationshipType)
            )
            : eq(studyRelationships.studyId, studyId);

        // Get relationships
        const relationships = await db
            .select({
                relatedStudyId: studyRelationships.relatedStudyId,
                relationshipType: studyRelationships.relationshipType,
                strength: studyRelationships.strength,
                reason: studyRelationships.reason,
                displayOrder: studyRelationships.displayOrder
            })
            .from(studyRelationships)
            .where(conditions)
            .orderBy(
                desc(studyRelationships.strength),
                studyRelationships.displayOrder
            )
            .limit(limit);

        if (relationships.length === 0) {
            return NextResponse.json({
                related: [],
                count: 0
            });
        }

        // Get full study details for related studies
        const relatedStudyIds = relationships.map(r => r.relatedStudyId);
        const relatedStudies = await db
            .select()
            .from(studies)
            .where(eq(studies.id, relatedStudyIds[0])); // Need to use IN operator properly

        // For now, get all and filter (Drizzle IN syntax)
        const allRelatedStudies = await db
            .select()
            .from(studies);

        const filteredStudies = allRelatedStudies.filter(s =>
            relatedStudyIds.includes(s.id)
        );

        // Combine relationship data with study data
        const relatedWithDetails = relationships.map(rel => {
            const study = filteredStudies.find(s => s.id === rel.relatedStudyId);
            return {
                ...study,
                relationshipType: rel.relationshipType,
                relationshipStrength: rel.strength,
                relationshipReason: rel.reason
            };
        }).filter(Boolean); // Remove any nulls

        return NextResponse.json({
            related: relatedWithDetails,
            count: relatedWithDetails.length
        });

    } catch (error) {
        console.error('[API] Error fetching related studies:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
