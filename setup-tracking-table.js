const { Pool } = require('pg');

const NEON_URL = 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({ connectionString: NEON_URL, ssl: { rejectUnauthorized: false } });

async function setup() {
    console.log('🔌 Conectando a Neon...');

    // Create user_behavior table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS user_behavior (
      id SERIAL PRIMARY KEY,
      session_id VARCHAR(255) UNIQUE NOT NULL,
      visit_count INTEGER DEFAULT 1,
      first_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      last_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      cart_items JSONB DEFAULT '[]',
      referrer TEXT,
      utm_source VARCHAR(255),
      utm_medium VARCHAR(255),
      utm_campaign VARCHAR(255),
      from_competitor BOOLEAN DEFAULT FALSE,
      competitor_name VARCHAR(255),
      viewed_studies JSONB DEFAULT '[]',
      total_time_seconds INTEGER DEFAULT 0,
      max_scroll_depth INTEGER DEFAULT 0,
      device_type VARCHAR(50),
      traffic_source VARCHAR(100),
      ip_address VARCHAR(45),
      conversion BOOLEAN DEFAULT FALSE,
      conversion_value DECIMAL(10,2),
      raw_data JSONB DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
    console.log('✅ Tabla user_behavior creada (o ya existía)');

    // Add index for faster lookups
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_user_behavior_session ON user_behavior(session_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_user_behavior_last_visit ON user_behavior(last_visit DESC);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_user_behavior_competitor ON user_behavior(from_competitor) WHERE from_competitor = TRUE;`);
    console.log('✅ Índices creados');

    // Check count
    const { rows } = await pool.query('SELECT COUNT(*) as total FROM user_behavior');
    console.log('📊 Registros actuales en user_behavior:', rows[0].total);

    await pool.end();
    console.log('\n🎉 Base de datos lista para recibir visitantes');
    console.log('\n📋 SIGUIENTE PASO: Configurar en Vercel Dashboard:');
    console.log('   Variable: DATABASE_URL');
    console.log('   URL: https://vercel.com/delbienestarlaboratorio-maker/bienestar/settings/environment-variables');
}

setup().catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
});
