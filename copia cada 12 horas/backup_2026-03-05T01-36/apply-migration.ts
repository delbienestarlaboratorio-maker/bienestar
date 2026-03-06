import { sql } from 'drizzle-orm';
import { db } from './src/db/index.js';

async function runMigration() {
    console.log('Applying reviews column migration...');

    try {
        // Add reviews column
        await db.execute(sql`
            ALTER TABLE studies 
            ADD COLUMN IF NOT EXISTS reviews jsonb
        `);
        console.log('✓ Reviews column added');

        // Create index
        await db.execute(sql`
            CREATE INDEX IF NOT EXISTS idx_studies_reviews 
            ON studies(id) WHERE reviews IS NOT NULL
        `);
        console.log('✓ Index created');

        // Add comment
        await db.execute(sql`
            COMMENT ON COLUMN studies.reviews IS 'Array of customer reviews/testimonials for the study'
        `);
        console.log('✓ Comment added');

        console.log('\n✅ Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

runMigration();
