// Patch all [slug]/page.tsx files to use static params from data/static-params.ts
// instead of eval('require')
const fs = require('fs');
const path = require('path');

const patches = [
    {
        file: 'app/blog/[slug]/page.tsx',
        oldFunc: /export async function generateStaticParams\(\)[\s\S]*?\n\}/,
        newFunc: `export async function generateStaticParams() {
    const { blogSlugs } = await import('@/data/static-params');
    return blogSlugs.map((slug: string) => ({ slug }));
}`
    },
    {
        file: 'app/sintomas/[slug]/page.tsx',
        oldFunc: /export async function generateStaticParams\(\)[\s\S]*?\n\}/,
        newFunc: `export async function generateStaticParams() {
    const { symptomSlugs } = await import('@/data/static-params');
    return symptomSlugs.map((slug: string) => ({ slug }));
}`
    },
    {
        file: 'app/enfermedades/[slug]/page.tsx',
        oldFunc: /export async function generateStaticParams\(\)[\s\S]*?\n\}/,
        newFunc: `export async function generateStaticParams() {
    const { diseaseSlugs } = await import('@/data/static-params');
    return diseaseSlugs.map((slug: string) => ({ slug }));
}`
    },
    {
        file: 'app/valores-clinicos/[slug]/page.tsx',
        oldFunc: /export async function generateStaticParams\(\)[\s\S]*?\n\}/,
        newFunc: `export async function generateStaticParams() {
    const { biomarkerSlugs } = await import('@/data/static-params');
    return biomarkerSlugs.map((slug: string) => ({ slug }));
}`
    },
];

patches.forEach(p => {
    if (!fs.existsSync(p.file)) {
        console.log('SKIP:', p.file);
        return;
    }
    let c = fs.readFileSync(p.file, 'utf8');
    if (c.match(p.oldFunc)) {
        c = c.replace(p.oldFunc, p.newFunc);
        fs.writeFileSync(p.file, c, 'utf8');
        console.log('Patched:', p.file);
    } else {
        console.log('No match:', p.file);
    }
});

console.log('Done!');
