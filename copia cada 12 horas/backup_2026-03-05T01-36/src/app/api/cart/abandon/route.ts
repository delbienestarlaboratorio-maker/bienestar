export const runtime = 'edge';
// Cart Abandonment Tracking and Remarketing API
// POST /api/cart/abandon

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cartAbandonments } from '@/db/schema/relationships';
import { eq } from 'drizzle-orm';
import { generateCartAbandonmentEmail, generateCartAbandonmentTextEmail } from '@/lib/email/templates';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { sessionId, userEmail, items, totalValue } = body;

        if (!sessionId || !items || !totalValue) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Save cart abandonment
        const abandonment = await db.insert(cartAbandonments).values({
            sessionId,
            userEmail: userEmail || null,
            items: JSON.stringify(items),
            totalValue: totalValue.toString()
        }).returning();

        console.log('[Cart Abandonment] Recorded:', abandonment[0].id);

        // If we have email, schedule remarketing
        if (userEmail && process.env.ENABLE_REMARKETING === 'true') {
            // Schedule email for 1 hour later
            setTimeout(() => {
                sendAbandonmentEmail(abandonment[0].id, userEmail, items, parseFloat(totalValue));
            }, 60 * 60 * 1000); // 1 hour

            console.log('[Cart Abandonment] Remarketing scheduled for:', userEmail);
        }

        return NextResponse.json({
            success: true,
            abandonmentId: abandonment[0].id
        });

    } catch (error) {
        console.error('[Cart Abandonment] Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * Send abandonment recovery email
 */
async function sendAbandonmentEmail(
    abandonmentId: string,
    email: string,
    items: any[],
    totalValue: number
) {
    try {
        // Generate recovery URL with token
        const recoveryToken = Buffer.from(`${abandonmentId}:${Date.now()}`).toString('base64');
        const recoveryUrl = `${process.env.NEXT_PUBLIC_APP_URL}/cart/recover?token=${recoveryToken}`;

        // Generate email content
        const htmlContent = generateCartAbandonmentEmail({
            cartItems: items,
            totalValue,
            discount: 10, // 10% recovery discount
            recoveryUrl,
            expiresIn: '24 horas'
        });

        const textContent = generateCartAbandonmentTextEmail({
            cartItems: items,
            totalValue,
            discount: 10,
            recoveryUrl,
            expiresIn: '24 horas'
        });

        // TODO: Integrate with email service (SendGrid, Resend, etc.)
        // For now, just log
        console.log('[Email] Would send to:', email);
        console.log('[Email] Subject: ¡No te vayas sin tus estudios! + 10% descuento');
        console.log('[Email] Recovery URL:', recoveryUrl);

        // Update abandonment record
        await db.update(cartAbandonments)
            .set({
                emailSent: true,
                emailSentAt: new Date()
            })
            .where(eq(cartAbandonments.id, abandonmentId));

        return true;

    } catch (error) {
        console.error('[Email] Send error:', error);
        return false;
    }
}

/**
 * Cart Recovery Endpoint
 * GET /api/cart/recover?token=xxx
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    try {
        // Decode token
        const decoded = Buffer.from(token, 'base64').toString('utf-8');
        const [abandonmentId, timestamp] = decoded.split(':');

        // Check if token is expired (24 hours)
        const tokenAge = Date.now() - parseInt(timestamp);
        if (tokenAge > 24 * 60 * 60 * 1000) {
            return NextResponse.json({ error: 'Token expired' }, { status: 410 });
        }

        // Get abandonment details
        const abandonment = await db
            .select()
            .from(cartAbandonments)
            .where(eq(cartAbandonments.id, abandonmentId))
            .limit(1);

        if (!abandonment || abandonment.length === 0) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // Return cart data
        return NextResponse.json({
            items: JSON.parse(abandonment[0].items),
            totalValue: parseFloat(abandonment[0].totalValue),
            discount: 10 // Apply 10% recovery discount
        });

    } catch (error) {
        console.error('[Cart Recovery] Error:', error);
        return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }
}
