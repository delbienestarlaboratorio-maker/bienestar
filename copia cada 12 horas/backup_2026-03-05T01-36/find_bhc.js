const { Pool, neonConfig } = require('@neondatabase/serverless'); const ws = require('ws'); neonConfig.webSocketConstructor = ws;
const p = new Pool({ connectionString: 'postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require' });
p.query("SELECT id, name FROM studies WHERE LOWER(name) LIKE '%biometria%' AND is_active=true").then(r => { r.rows.forEach(x => console.log(x.id, x.name)); p.end() });
