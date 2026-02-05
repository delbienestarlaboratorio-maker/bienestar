import { Metadata } from 'next';
import { MapPin, Phone, Clock, Droplet, TestTube, Heart } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Sucursales - Laboratorio Del Bienestar | Tizayuca, Hidalgo',
    description: 'Visita nuestras sucursales en Tizayuca con servicio de toma de muestras y sueroterapia. Ubicaciones en Ignacio Galván y Farmacia Nacozari con horarios extendidos.',
    keywords: 'laboratorio tizayuca, toma de muestras tizayuca, sueroterapia hidalgo, análisis clínicos tizayuca',
    openGraph: {
        title: 'Sucursales - Laboratorio Del Bienestar',
        description: '2 ubicaciones en Tizayuca con toma de muestras y sueroterapia',
        type: 'website',
    },
};

const branches = [
    {
        id: 1,
        name: 'Ignacio Galván 27',
        address: 'Ignacio Galván 27, Centro, Tizayuca, Hidalgo',
        phone: '7757371811',
        whatsapp: '5217757371811',
        mapUrl: 'https://maps.app.goo.gl/H9HMdtGnSnZ6aq3x5',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3758.8!2d-98.98!3d19.84!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDUwJzI2LjQiTiA5OMKwNTgnNDguMCJX!5e0!3m2!1ses!2smx!4v1234567890',
        hours: [
            { day: 'Lunes - Viernes', time: '7:00 AM - 8:00 PM' },
            { day: 'Sábado', time: '7:00 AM - 6:00 PM' },
            { day: 'Domingo', time: '8:00 AM - 2:00 PM' },
        ],
        services: [
            { icon: TestTube, name: 'Toma de Muestras', color: 'text-blue-600' },
            { icon: Droplet, name: 'Sueroterapia', color: 'text-purple-600' },
            { icon: Heart, name: 'Atención Personalizada', color: 'text-red-600' },
        ],
    },
    {
        id: 2,
        name: 'Farmacia Nacozari',
        address: 'Av. Adolfo Mateos 43, Col. Nacozari, Tizayuca, Hidalgo',
        phone: '7757371811',
        whatsapp: '5217757371811',
        mapUrl: 'https://maps.app.goo.gl/SugciWSwudWpQYgHA',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3758.6!2d-98.97!3d19.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDUxJzAwLjAiTiA5OMKwNTgnMTIuMCJX!5e0!3m2!1ses!2smx!4v1234567891',
        hours: [
            { day: 'Lunes - Viernes', time: '7:00 AM - 8:00 PM' },
            { day: 'Sábado', time: '7:00 AM - 6:00 PM' },
            { day: 'Domingo', time: '8:00 AM - 2:00 PM' },
        ],
        services: [
            { icon: TestTube, name: 'Toma de Muestras', color: 'text-blue-600' },
            { icon: Droplet, name: 'Sueroterapia', color: 'text-purple-600' },
            { icon: Heart, name: 'Atención Personalizada', color: 'text-red-600' },
        ],
    },
];

export default function SucursalesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Nuestras Sucursales
                        </h1>
                        <p className="text-xl text-blue-100">
                            2 ubicaciones estratégicas en Tizayuca para tu comodidad
                        </p>
                        <p className="mt-4 text-blue-50">
                            Servicios de toma de muestras y sueroterapia disponibles en ambas sucursales
                        </p>
                    </div>
                </div>
            </section>

            {/* Branches Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {branches.map((branch) => (
                            <div
                                key={branch.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                {/* Map */}
                                <div className="relative h-64 bg-gray-200">
                                    <iframe
                                        src={branch.mapEmbed}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="absolute inset-0"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        {branch.name}
                                    </h2>

                                    {/* Address */}
                                    <div className="flex items-start gap-3 mb-4 text-gray-600">
                                        <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-blue-600" />
                                        <p>{branch.address}</p>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <Phone className="w-5 h-5 text-blue-600" />
                                        <a
                                            href={`tel:${branch.phone}`}
                                            className="text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            {branch.phone}
                                        </a>
                                    </div>

                                    {/* Hours */}
                                    <div className="mb-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Clock className="w-5 h-5 text-blue-600" />
                                            <span className="font-semibold text-gray-900">Horarios:</span>
                                        </div>
                                        <div className="ml-7 space-y-1">
                                            {branch.hours.map((schedule, idx) => (
                                                <div key={idx} className="text-sm text-gray-600">
                                                    <span className="font-medium">{schedule.day}:</span>{' '}
                                                    {schedule.time}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Services */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-gray-900 mb-3">Servicios disponibles:</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {branch.services.map((service, idx) => {
                                                const Icon = service.icon;
                                                return (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg"
                                                    >
                                                        <Icon className={`w-4 h-4 ${service.color}`} />
                                                        <span className="text-sm text-gray-700">{service.name}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* CTAs */}
                                    <div className="flex gap-3">
                                        <a
                                            href={branch.mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                                        >
                                            Ver en Google Maps
                                        </a>
                                        <a
                                            href={`https://wa.me/${branch.whatsapp}?text=Hola, me gustaría agendar una cita en ${branch.name}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
                                        >
                                            WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">¿Necesitas más información?</h2>
                    <p className="text-xl text-blue-100 mb-6">
                        Contáctanos por WhatsApp y te ayudaremos a elegir la sucursal más cercana
                    </p>
                    <a
                        href="https://wa.me/5217757371811?text=Hola, necesito información sobre sus sucursales"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
                    >
                        Contactar por WhatsApp
                    </a>
                </div>
            </section>
        </div>
    );
}
