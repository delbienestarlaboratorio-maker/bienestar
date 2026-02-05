// API endpoint para obtener estudios complementarios
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { studies } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Obtener el estudio actual
        const currentStudy = await db
            .select()
            .from(studies)
            .where(eq(studies.id, id))
            .limit(1);

        if (!currentStudy.length) {
            return NextResponse.json({ error: 'Estudio no encontrado' }, { status: 404 });
        }

        // Obtener correlaciones con sus estudios complementarios
        const result = await pool.query(`
      SELECT 
        s.*,
        sc.relation_type,
        sc.medical_reason,
        sc.clinical_value,
        sc.priority,
        sc.bundle_discount
      FROM study_correlations sc
      JOIN studies s ON sc.complementary_study_id = s.id
      WHERE sc.study_id = $1
        AND sc.is_active = true
        AND s.is_active = true
      ORDER BY sc.priority DESC, s.name ASC
      LIMIT 4
    `, [id]);

        const complementaryStudies = result.rows.map(row => ({
            study: {
                id: row.id,
                name: row.name,
                slug: row.slug,
                categoryId: row.category_id,
                priceRegular: row.price_regular,
                pricePromotional: row.price_promotional,
                description: row.description,
                image: row.image
            },
            correlation: {
                relationType: row.relation_type,
                medicalReason: row.medical_reason,
                clinicalValue: row.clinical_value,
                priority: row.priority,
                bundleDiscount: parseFloat(row.bundle_discount)
            },
            pricing: {
                individualPrice: row.price_regular,
                bundlePrice: row.price_regular * (1 - parseFloat(row.bundle_discount) / 100),
                savings: row.price_regular * (parseFloat(row.bundle_discount) / 100)
            }
        }));

        return NextResponse.json({
            currentStudy: currentStudy[0],
            complementaryStudies
        });

    } catch (error: any) {
        console.error('Error fetching complementary studies:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
