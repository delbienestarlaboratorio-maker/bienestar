// API endpoint for tracking competitor visits
// POST /api/analytics/competitor-visit

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { competitorVisits } from '@/db/schema/relationships';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            competitor,
            domain,
            referrer,
            userAgent,
            sessionId,
            timestamp
        } = body;

        // Validate required fields
        if (!competitor || !sessionId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Detect device type from user agent
        const deviceType = detectDeviceType(userAgent || '');

        // Insert competitor visit
        await db.insert(competitorVisits).values({
            sessionId,
            competitorName: competitor,
            competitorDomain: domain || '',
            referrer: referrer || '',
            userAgent: userAgent || '',
            deviceType,
            didConvert: false, // Will be updated later if they purchase
            timestamp: timestamp ? new Date(timestamp) : new Date()
        });

        return NextResponse.json({
            success: true,
            message: 'Competitor visit tracked'
        });

    } catch (error) {
        console.error('[API] Error tracking competitor visit:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

function detectDeviceType(userAgent: string): 'mobile' | 'desktop' | 'tablet' {
    const ua = userAgent.toLowerCase();

    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }

    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile';
    }

    return 'desktop';
}
