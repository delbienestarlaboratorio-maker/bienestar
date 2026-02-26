import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Award, Users, Clock, MapPin, TestTube, Heart, Phone, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Nosotros — Laboratorio Clínico Del Bienestar | Tizayuca, Hidalgo',
    description: 'Conoce al equipo detrás del Laboratorio Clínico Del Bienestar. Más de 10 años brindando diagnósticos precisos con tecnología de vanguardia en Tizayuca, Hidalgo.',
    openGraph: {
        title: 'Nosotros — Laboratorio Del Bienestar',
        description: 'Más de 10 años brindando diagnósticos precisos con tecnología de vanguardia.',
        type: 'website',
    },
};

const values = [
    { icon: Shield, title: 'Confianza', description: 'Licencia sanitaria COFEPRIS vigente y procesos certificados que garantizan la precisión de cada resultado.', color: 'from-green-500 to-emerald-600' },
    { icon: TestTube, title: 'Tecnología', description: 'Equipos automatizados de última generación para asegurar resultados rápidos y exactos.', color: 'from-blue-500 to-cyan-600' },
    { icon: Heart, title: 'Calidez Humana', description: 'Cada paciente recibe atención personalizada y un trato digno en todo momento.', color: 'from-pink-500 to-rose-600' },
    { icon: Users, title: 'Profesionalismo', description: 'Equipo de Químicos Farmacobiólogos con experiencia clínica real y capacitación constante.', color: 'from-purple-500 to-violet-600' },
];

const milestones = [
    { year: '2014', event: 'Inauguración de la primera sucursal en Tizayuca' },
    { year: '2017', event: 'Expansión a más de 500 estudios disponibles' },
    { year: '2020', event: 'Apertura de segunda sucursal (Farmacia Nacozari)' },
    { year: '2023', event: 'Incorporación de Sueroterapia IV' },
    { year: '2024', event: 'Catálogo ampliado a más de 2,000 estudios' },
    { year: '2025', event: 'Lanzamiento de plataforma digital con resultados en línea' },
];

const differentiators = [
    'Más de 2,000 estudios clínicos disponibles',
    'Resultados en 24-48 horas',
    'Precios accesibles y transparentes',
    'Toma de muestras a domicilio disponible',
    'Atención los 7 días de la semana',
    'Servicio de sueroterapia IV vitamínica',
    'Descuentos y promociones regulares',
    'Convenios con empresas y aseguradoras',
];

export default function NosotrosPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-blue-900" />
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-20 w-80 h-80 bg-blue-400 rounded-full blur-3xl" />
                </div>
                <div className="relative max-w-5xl mx-auto px-4 py-24 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Quiénes <span className="text-green-400">Somos</span>
                    </h1>
                    <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
                        Somos un <Link href="/blog/laboratorio-clinico-tizayuca-precios" className="underline hover:text-white transition-colors">laboratorio clínico en Tizayuca</Link> comprometido con la salud de la región.
                        Desde nuestra fundación, hemos trabajado para ofrecer diagnósticos precisos,
                        rápidos y a <Link href="/blog/cuanto-cuesta-analisis-sangre-tizayuca" className="underline hover:text-white transition-colors">precios muy accesibles</Link> a cada paciente que confía en nosotros.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 border border-green-100">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                            <Shield size={28} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Proporcionar servicios de diagnóstico clínico de alta calidad y precisión,
                            utilizando tecnología de vanguardia y un equipo profesional capacitado,
                            contribuyendo al bienestar y la prevención de enfermedades en nuestra comunidad.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 border border-blue-100">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                            <Award size={28} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Ser el laboratorio clínico de referencia en la región de Tizayuca y el estado de Hidalgo,
                            reconocido por la calidad de nuestros resultados, la innovación en nuestros servicios como los <Link href="/blog/check-up-basico-barato-que-incluye" className="text-green-700 hover:underline font-medium">check-ups médicos económicos</Link>
                            y el compromiso genuino con la salud de cada paciente.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestros Valores</h2>
                        <p className="text-gray-600 text-lg">Los principios que nos guían cada día</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {values.map((val) => {
                            const Icon = val.icon;
                            return (
                                <div key={val.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                                    <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${val.color} flex items-center justify-center mb-4`}>
                                        <Icon size={26} className="text-white" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">{val.title}</h3>
                                    <p className="text-sm text-gray-600">{val.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestra Historia</h2>
                        <p className="text-gray-600 text-lg">Una trayectoria de crecimiento y compromiso</p>
                    </div>
                    <div className="space-y-0">
                        {milestones.map((m, i) => (
                            <div key={m.year} className="flex gap-6 group">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                        {m.year.slice(2)}
                                    </div>
                                    {i < milestones.length - 1 && (
                                        <div className="w-0.5 h-16 bg-gradient-to-b from-green-300 to-blue-300" />
                                    )}
                                </div>
                                <div className="pt-2 pb-8">
                                    <p className="text-sm font-bold text-green-700 mb-1">{m.year}</p>
                                    <p className="text-gray-700">{m.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué elegirnos?</h2>
                        <p className="text-gray-400 text-lg">Las razones por las que miles de pacientes confían en nosotros</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {differentiators.map((d) => (
                            <div key={d} className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                                <CheckCircle size={22} className="text-green-400 shrink-0" />
                                <span className="text-gray-200">{d}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location CTA */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Visítanos</h2>
                    <p className="text-gray-600 text-lg mb-8">2 sucursales en Tizayuca para tu comodidad</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/sucursales"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
                        >
                            <MapPin size={22} />
                            Ver Sucursales
                        </Link>
                        <a
                            href="https://wa.me/527716854026?text=Hola, me gustaría conocer más sobre el laboratorio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-white border-2 border-green-600 text-green-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all"
                        >
                            <Phone size={22} />
                            Contactar
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
