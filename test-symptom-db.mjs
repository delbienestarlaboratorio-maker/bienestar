import { Pool } from 'pg';

const NEON_DB = 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require';

async function testSymptomSearch() {
    console.log('🧪 Testing symfony search flow...\n');

    const pool = new Pool({ connectionString: NEON_DB });

    try {
        // Test 1: Database connection
        console.log('1️⃣ Testing database connection...');
        const countResult = await pool.query('SELECT COUNT(*) FROM studies');
        console.log('   ✅ Connected! Total studies:', countResult.rows[0].count);

        // Test 2: Search for specific study names
        console.log('\n2️⃣ Testing study name search...');
        const searchNames = ['COPROCULTIVO', 'HELICOBACTER', 'GLUCOSA'];

        for (const name of searchNames) {
            const result = await pool.query(
                `SELECT id, name FROM studies WHERE UPPER(name) LIKE $1 LIMIT 3`,
                [`%${name}%`]
            );
            console.log(`   📋 "${name}": ${result.rows.length} matches`);
            result.rows.forEach(r => console.log(`      - ${r.name}`));
        }

        // Test 3: Simulate API query structure
        console.log('\n3️⃣ Testing OR query like API...');
        const orResult = await pool.query(`
            SELECT id, name FROM studies 
            WHERE UPPER(name) LIKE '%COPROCULTIVO%' 
               OR UPPER(name) LIKE '%HELICOBACTER%'
               OR UPPER(name) LIKE '%GLUCOSA%'
            LIMIT 10
        `);
        console.log(`   ✅ Found ${orResult.rows.length} studies`);
        orResult.rows.forEach(r => console.log(`      - ${r.name}`));

    } catch (error) {
        console.error('\n❌ ERROR:', error.message);
        console.error('   Stack:', error.stack);
    } finally {
        await pool.end();
    }
}

testSymptomSearch();
