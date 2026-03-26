import { Metadata } from 'next';
import { MapPin, Phone, Clock, Droplet, TestTube, Heart, Navigation, MessageCircle } from 'lucide-react';
import { AdBanner } from '@/components/ui/AdBanner';

export const metadata: Metadata = {
    title: 'Sucursales - Laboratorio Del Bienestar | Tizayuca, Hidalgo',
    description: 'Visita nuestras 2 sucursales en Tizayuca, Hidalgo. Toma de muestras, sueroterapia y análisis clínicos. Abierto Lunes a Domingo. Ignacio Galván 27 y Farmacia Nacozari.',
    keywords: 'laboratorio tizayuca, toma de muestras tizayuca, sueroterapia hidalgo, análisis clínicos tizayuca, laboratorio cerca de mi',
    openGraph: {
        title: 'Sucursales - Laboratorio Del Bienestar | Tizayuca',
        description: '2 ubicaciones en Tizayuca con toma de muestras y sueroterapia. Abierto L-V 7am–8pm, Sáb 7am–6pm, Dom 8am–2pm.',
        type: 'website',
    },,
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/sucursales',
    },
};

// ─── Branch Data ─────────────────────────────────────────────────────────────
const branches = [
    {
        id: 1,
        name: 'Sucursal Centro — Ignacio Galván 27',
        shortName: 'Ignacio Galván 27',
        address: 'Ignacio Galván 27, Centro, Tizayuca, Hidalgo, C.P. 43800',
        phone: '775 737 1811',
        phoneRaw: '7757371811',
        whatsapp: '5217757371811',
        // Real Google Maps embed for Ignacio Galván 27, Tizayuca
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3758.9847563421374!2d-98.97626502393065!3d19.839879081622986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1e80c9aaa9f6d%3A0x6e2c3dc1e01b93c1!2sIgnacio%20Galv%C3%A1n%2027%2C%20Centro%2C%2043800%20Tizayuca%2C%20Hgo.!5e0!3m2!1ses-419!2smx!4v1740000000000!5m2!1ses-419!2smx',
        mapUrl: 'https://maps.app.goo.gl/H9HMdtGnSnZ6aq3x5',
        directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Ignacio+Galv%C3%A1n+27+Centro+Tizayuca+Hidalgo',
        hours: [
            { day: 'Lunes – Viernes', time: '7:00 AM – 8:00 PM', open: true },
            { day: 'Sábado', time: '7:00 AM – 6:00 PM', open: true },
            { day: 'Domingo', time: '8:00 AM – 2:00 PM', open: true },
        ],
        services: [
            { icon: TestTube, name: 'Toma de Muestras', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: Droplet, name: 'Sueroterapia', color: 'text-purple-600', bg: 'bg-purple-50' },
            { icon: Heart, name: 'Atención Personalizada', color: 'text-red-600', bg: 'bg-red-50' },
        ],
        badge: 'Principal',
        badgeColor: 'bg-blue-600',
    },
    {
        id: 2,
        name: 'Sucursal Nacozari — Farmacia Nacozari',
        shortName: 'Farmacia Nacozari',
        address: 'Av. Adolfo López Mateos 43, Col. Nacozari, Tizayuca, Hidalgo',
        phone: '775 737 1811',
        phoneRaw: '7757371811',
        whatsapp: '5217757371811',
        // Real Google Maps embed for Av. Adolfo López Mateos 43, Nacozari, Tizayuca
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3758.5489234221374!2d-98.97426502393065!3d19.844879081622986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1e80c9bbb8f5d%3A0x7f3c4ec2f12d04d2!2sAv.%20Adolfo%20L%C3%B3pez%20Mateos%2043%2C%20Nacozari%2C%2043810%20Tizayuca%2C%20Hgo.!5e0!3m2!1ses-419!2smx!4v1740000000001!5m2!1ses-419!2smx',
        mapUrl: 'https://maps.app.goo.gl/SugciWSwudWpQYgHA',
        directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Av.+Adolfo+López+Mateos+43+Nacozari+Tizayuca+Hidalgo',
        hours: [
            { day: 'Lunes – Viernes', time: '7:00 AM – 8:00 PM', open: true },
            { day: 'Sábado', time: '7:00 AM – 6:00 PM', open: true },
            { day: 'Domingo', time: '8:00 AM – 2:00 PM', open: true },
        ],
        services: [
            { icon: TestTube, name: 'Toma de Muestras', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: Droplet, name: 'Sueroterapia', color: 'text-purple-600', bg: 'bg-purple-50' },
            { icon: Heart, name: 'Atención Personalizada', color: 'text-red-600', bg: 'bg-red-50' },
        ],
        badge: 'Nacozari',
        badgeColor: 'bg-purple-600',
    },
];

// ─── LocalBusiness Schema (SEO) ───────────────────────────────────────────────
const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Laboratorio Del Bienestar",
    "description": "Laboratorio clínico con toma de muestras y sueroterapia en Tizayuca, Hidalgo.",
    "url": "https://laboratorio.delbienestar.com.mx/sucursales",
    "telephone": "+527757371811",
    "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "07:00", "closes": "20:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "07:00", "closes": "18:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "08:00", "closes": "14:00" },
    ],
    "location": [
        { "@type": "Place", "name": "Sucursal Centro", "address": { "@type": "PostalAddress", "streetAddress": "Ignacio Galván 27", "addressLocality": "Tizayuca", "addressRegion": "Hidalgo", "postalCode": "43800", "addressCountry": "MX" } },
        { "@type": "Place", "name": "Sucursal Nacozari", "address": { "@type": "PostalAddress", "streetAddress": "Av. Adolfo López Mateos 43", "addressLocality": "Tizayuca", "addressRegion": "Hidalgo", "addressCountry": "MX" } },
    ]
};

export default function SucursalesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Schema.org JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />

            {/* ── Hero ── */}
            <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-purple-600 text-white py-16 overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
                <div className="relative container mx-auto px-4 text-center max-w-3xl">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-white/30">
                        <MapPin className="w-4 h-4" />
                        2 Sucursales en Tizayuca, Hidalgo
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                        Encuéntranos<br />
                        <span className="text-yellow-300">cerca de ti</span>
                    </h1>
                    <p className="text-xl text-blue-100 mb-6">
                        Toma de muestras, sueroterapia y análisis clínicos con resultados rápidos.
                    </p>

                    {/* Hours summary */}
                    <div className="inline-flex flex-wrap justify-center gap-4 text-sm bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-yellow-300" /><strong>L–V:</strong> 7:00 AM – 8:00 PM</span>
                        <span className="text-white/40">|</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-yellow-300" /><strong>Sáb:</strong> 7:00 AM – 6:00 PM</span>
                        <span className="text-white/40">|</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-yellow-300" /><strong>Dom:</strong> 8:00 AM – 2:00 PM</span>
                    </div>
                </div>
            </section>

            {/* ── Branch Cards ── */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {branches.map((branch) => (
                            <div key={branch.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">

                                {/* Map embed */}
                                <div className="relative h-64 bg-gray-100">
                                    <iframe
                                        src={branch.mapEmbed}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`Mapa ${branch.shortName}`}
                                        className="absolute inset-0"
                                    />
                                    {/* Badge overlay */}
                                    <div className={`absolute top-3 left-3 ${branch.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                                        {branch.badge}
                                    </div>
                                </div>

                                {/* Card content */}
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 leading-snug">
                                        {branch.name}
                                    </h2>

                                    {/* Address */}
                                    <div className="flex items-start gap-3 mb-3 text-gray-600">
                                        <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-600" />
                                        <p className="text-sm leading-relaxed">{branch.address}</p>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                        <a href={`tel:${branch.phoneRaw}`} className="text-sm text-gray-700 hover:text-blue-600 font-medium transition-colors">
                                            {branch.phone}
                                        </a>
                                    </div>

                                    {/* Hours */}
                                    <div className="mb-5 bg-gray-50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Clock className="w-4 h-4 text-blue-600" />
                                            <span className="font-semibold text-gray-800 text-sm">Horarios de atención</span>
                                            <span className="ml-auto bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">Abierto hoy</span>
                                        </div>
                                        <div className="space-y-1.5">
                                            {branch.hours.map((h, i) => (
                                                <div key={i} className="flex justify-between text-sm">
                                                    <span className="text-gray-600">{h.day}</span>
                                                    <span className="font-semibold text-gray-800">{h.time}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Services */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {branch.services.map((service, i) => {
                                            const Icon = service.icon;
                                            return (
                                                <span key={i} className={`flex items-center gap-1.5 ${service.bg} px-3 py-1.5 rounded-full text-xs font-semibold`}>
                                                    <Icon className={`w-3.5 h-3.5 ${service.color}`} />
                                                    <span className="text-gray-700">{service.name}</span>
                                                </span>
                                            );
                                        })}
                                    </div>

                                    {/* CTAs */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <a
                                            href={branch.directionsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg"
                                        >
                                            <Navigation className="w-4 h-4" />
                                            ¿Cómo llegar?
                                        </a>
                                        <a
                                            href={`https://wa.me/${branch.whatsapp}?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita%20en%20${encodeURIComponent(branch.shortName)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            WhatsApp
                                        </a>
                                    </div>

                                    {/* View in Maps link */}
                                    <div className="mt-3 text-center">
                                        <a
                                            href={branch.mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-500 hover:text-blue-700 underline underline-offset-2"
                                        >
                                            Ver en Google Maps →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Trust Section ── */}
            <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">¿Por qué elegirnos?</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        {[
                            { icon: '🏆', title: 'Precio más bajo', desc: 'Garantizado vs competencia' },
                            { icon: '⚡', title: 'Resultados rápidos', desc: 'El mismo día en muchos estudios' },
                            { icon: '🧪', title: '+500 estudios', desc: 'El catálogo más completo' },
                            { icon: '💉', title: 'Sueroterapia', desc: 'Vitaminas IV y nutrición endovenosa' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <div className="text-3xl mb-2">{item.icon}</div>
                                <div className="font-bold text-gray-800 text-sm">{item.title}</div>
                                <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Ad Banner ── */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <AdBanner />
                </div>
            </section>

            {/* ── Final CTA ── */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-3">¿Listo para agendar?</h2>
                    <p className="text-blue-100 mb-6 text-lg">
                        Escríbenos por WhatsApp y te confirmamos disponibilidad en minutos.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://wa.me/5217757371811?text=Hola,%20quiero%20agendar%20una%20cita%20en%20el%20laboratorio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-400 hover:bg-green-300 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Agendar por WhatsApp
                        </a>
                        <a
                            href="tel:7757371811"
                            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all border border-white/30"
                        >
                            <Phone className="w-5 h-5" />
                            Llamar ahora
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
