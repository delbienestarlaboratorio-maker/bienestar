import { db } from './src/db';
import { studies } from './src/db/schema';
import * as fs from 'fs';

async function exportStudies() {
    console.log('📊 Exporting all studies from local database...');

    const allStudies = await db.select().from(studies);

    console.log(`✅ Found ${allStudies.length} studies`);

    // Export as JSON
    const jsonData = JSON.stringify(allStudies, null, 2);
    fs.writeFileSync('./public/data/studies.json', jsonData, 'utf-8');

    console.log('✅ Exported to public/data/studies.json');
    console.log(`📦 File size: ${(jsonData.length / 1024 / 1024).toFixed(2)} MB`);
}

exportStudies().then(() => {
    console.log('🎉 Export complete!');
    process.exit(0);
}).catch((error) => {
    console.error('❌ Export failed:', error);
    process.exit(1);
});
