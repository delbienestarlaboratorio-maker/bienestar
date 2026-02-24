const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_3RjB2uOMAGsZ@ep-shiny-lake-aiwrcswr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require');
console.log('Connecting...');
sql`SELECT COUNT(*)::int as c FROM studies`.then(r => {
    console.log('OK - Total studies:', r[0].c);
}).catch(e => {
    console.log('FAIL:', e.message.substring(0, 200));
});
