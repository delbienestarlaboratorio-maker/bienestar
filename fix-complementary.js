const fs = require('fs');

const file = 'src/app/api/studies/[id]/complementary/route.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("import { Pool } from 'pg';", "import { neon } from '@neondatabase/serverless';");
content = content.replace("const pool = new Pool({ connectionString: process.env.DATABASE_URL });", "const sql = neon(process.env.DATABASE_URL || 'postgresql://dummyuser:dummypass@localhost/placeholder_build_only');");
content = content.replace("await pool.query(", "await sql(");
content = content.replace("        const complementaryStudies = result.rows.map(row => ({", "        const rows = Array.isArray(result) ? result : [];\n        const complementaryStudies = rows.map(row => ({");

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed complementary route');
