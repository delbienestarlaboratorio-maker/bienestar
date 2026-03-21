// Analyze what's in the chunk
const c = require('fs').readFileSync('.next/static/chunks/69e6fc0910450081.js', 'utf8');
console.log('SIZE:', c.length);
console.log('');
console.log('First 800 chars:');
console.log(c.substring(0, 800));
console.log('');
console.log('Searching for source file references...');
// Look for module paths
const matches = c.match(/\[project\][^\]]*?\.[tj]sx?/g);
if (matches) {
    console.log('Source modules found:', [...new Set(matches)]);
} else {
    console.log('No [project] paths found');
}
// Look for common identifiers
if (c.includes('Check-Up')) console.log('Contains: Check-Up text');
if (c.includes('Ofertas del Mes')) console.log('Contains: Ofertas del Mes');
if (c.includes('Ofertas del Mes 🎉')) console.log('Contains: Updated Ofertas text');
if (c.includes('Promociones')) console.log('Contains: Promociones');
if (c.includes('WhatsApp')) console.log('Contains: WhatsApp');
if (c.includes('Footer')) console.log('Contains: Footer component');
if (c.includes('Header')) console.log('Contains: Header component');
if (c.includes('CartProvider')) console.log('Contains: CartProvider');
if (c.includes('hero')) console.log('Contains: hero');
if (c.includes('Hero')) console.log('Contains: Hero');
if (c.includes('AnalyticsProvider')) console.log('Contains: AnalyticsProvider');
