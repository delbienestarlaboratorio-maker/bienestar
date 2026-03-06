import { db } from './src/db';
import { studies } from './src/db/schema';

async function count() {
    const all = await db.select().from(studies);
    const withDesc = all.filter(s => s.description && s.description.trim() !== '');
    const withoutDesc = all.filter(s => !s.description || s.description.trim() === '');

    console.log('TOTAL:', all.length);
    console.log('CON_DESC:', withDesc.length);
    console.log('SIN_DESC:', withoutDesc.length);

    process.exit(0);
}

count();
