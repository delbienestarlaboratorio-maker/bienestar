import fs from 'fs';
import path from 'path';

const files = [
    'src/app/api/admin/categories/route.ts',
    'src/app/api/admin/content-generator/route.ts',
    'src/app/api/admin/studies/[id]/enrich/route.ts',
    'src/app/api/admin/studies/[id]/route.ts',
    'src/app/api/admin/studies/bulk-enrich/route.ts',
    'src/app/api/admin/studies/route.ts',
    'src/app/api/admin/subcategories/route.ts',
    'src/app/api/admin/users/route.ts',
    'src/app/api/analytics/competitor-visit/route.ts',
    'src/app/api/appointments/[id]/route.ts',
    'src/app/api/appointments/route.ts',
    'src/app/api/auth/[...nextauth]/route.ts',
    'src/app/api/cart/abandon/route.ts',
    'src/app/api/checkout/route.ts',
    'src/app/api/diagnostics/route.ts',
    'src/app/api/facturacion/route.ts',
    'src/app/api/pagos/crear/route.ts',
    'src/app/api/search/route.ts',
    'src/app/api/studies/[id]/complementary/route.ts',
    'src/app/api/studies/[id]/panels/route.ts',
    'src/app/api/studies/[id]/related/route.ts',
    'src/app/api/symptom-search/route.ts',
    'src/app/api/tracking/session/route.ts',
    'src/app/api/webhooks/clip/route.ts',
    'src/app/busqueda/page.tsx',
    'src/app/estudios/[categoria]/[slug]/debug/page.tsx',
    'src/app/estudios/[categoria]/[slug]/page.tsx',
    'src/app/estudios/[categoria]/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        if (!content.includes("export const runtime = 'edge'") && !content.includes('export const runtime = "edge"')) {
            content = `export const runtime = 'edge';\n` + content;
            fs.writeFileSync(file, content, 'utf8');
            console.log('Fixed:', file);
        } else {
            console.log('Already edge:', file);
        }
    } else {
        console.log('Skipped (not found):', file);
    }
}
