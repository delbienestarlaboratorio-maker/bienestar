import Link from 'next/link';
import { Search, ChevronRight, HelpCircle } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import { TestimonialsCarousel } from '@/components/social/TestimonialsCarousel';
import { SymptomSearchWidget } from '@/components/search/SymptomSearchWidget';
import { TrustBadges } from '@/components/home/TrustBadges';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const topFAQs = [
  { q: '¿Necesito cita para hacerme estudios?', a: 'No es necesaria cita previa para la mayoría de los estudios. Puedes presentarte directamente en cualquiera de nuestras sucursales en horario de servicio.' },
  { q: '¿Cuánto tardan los resultados?', a: 'La mayoría de los resultados están listos en 24 a 48 horas. Estudios especializados pueden tomar de 3 a 5 días hábiles.' },
  { q: '¿Necesito ir en ayunas?', a: 'Depende del estudio. Para químicas sanguíneas y perfiles de lípidos se requiere ayuno de 8-12 horas. Para otros estudios no es necesario.' },
  { q: '¿Aceptan seguros médicos?', a: 'Sí, contamos con convenios con diversas aseguradoras y empresas. Contáctanos por WhatsApp para confirmar tu cobertura.' },
];

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-white">
        {/* ═══════ HERO ═══════ */}
        <div className="relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-blue-900" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-blue-400 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center py-20 md:py-28 px-4">
            <AnimatedSection delay={0}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Tu Salud, Nuestra{' '}
                <span className="text-green-400">Prioridad</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-xl md:text-2xl text-green-100 mb-10">
                Más de 2,000 estudios clínicos • Resultados en 24-48 hrs
              </p>
            </AnimatedSection>

            {/* Search Box */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Search className="text-green-400" size={24} />
                  <p className="text-lg font-semibold text-white">
                    Busca tu estudio aquí
                  </p>
                </div>
                <SearchBar
                  placeholder="Ej: Biometría hemática, Glucosa, Rayos X..."
                  showCategoryFilter={false}
                  className="w-full text-lg"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* ═══════ 3 ACTION CARDS ═══════ */}
        <div className="bg-white py-16 px-4 -mt-8 relative z-10">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            <AnimatedSection delay={0}>
              <Link
                href="/estudios/analisis-clinicos"
                className="relative h-52 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden group block"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-700 to-green-900" />
                <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(/images/hero/ver-estudios.png)' }} />
                <div className="relative h-full flex flex-col items-center justify-end p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Ver Estudios</h3>
                  <p className="text-sm text-white/90 drop-shadow-md">Explora nuestro catálogo completo</p>
                </div>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <Link
                href="/agendar"
                className="relative h-52 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden group block"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900" />
                <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(/images/hero/agendar-cita.png)' }} />
                <div className="relative h-full flex flex-col items-center justify-end p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Agendar Cita</h3>
                  <p className="text-sm text-white/90 drop-shadow-md">Reserva tu cita en línea</p>
                </div>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <Link
                href="/sucursales"
                className="relative h-52 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden group block"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-purple-900" />
                <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(/images/hero/sucursales.png)' }} />
                <div className="relative h-full flex flex-col items-center justify-end p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Sucursales</h3>
                  <p className="text-sm text-white/90 drop-shadow-md">2 ubicaciones en Tizayuca</p>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </div>

        {/* ═══════ SYMPTOM SEARCH ═══════ */}
        <AnimatedSection>
          <SymptomSearchWidget />
        </AnimatedSection>

        {/* ═══════ PACKAGES ═══════ */}
        <AnimatedSection>
          <div className="bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Paquetes de Estudios
                </h2>
                <p className="text-lg text-gray-600">
                  Ahorra hasta 29% con nuestros paquetes diseñados para ti
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {[
                  { name: 'Para Ella', href: '/paquetes?categoria=para-ella', img: '/images/packages/para-ella.png', color: 'from-pink-900/60' },
                  { name: 'Para Él', href: '/paquetes?categoria=para-el', img: '/images/packages/para-el.png', color: 'from-blue-900/60' },
                  { name: 'Por Edad', href: '/paquetes?categoria=por-edad', img: '/images/packages/por-edad.png', color: 'from-orange-900/60' },
                  { name: 'Por Condición', href: '/paquetes?categoria=por-condicion', img: '/images/packages/por-condicion.png', color: 'from-green-900/60' },
                  { name: 'Especiales', href: '/paquetes?categoria=especiales', img: '/images/packages/especiales.png', color: 'from-purple-900/60' },
                ].map((pkg) => (
                  <Link key={pkg.name} href={pkg.href} className="relative aspect-square rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden group">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pkg.img})` }} />
                    <div className={`absolute inset-0 bg-gradient-to-t ${pkg.color} via-transparent to-transparent group-hover:opacity-80 transition-all`} />
                    <div className="relative h-full flex items-end justify-center p-4">
                      <h3 className="text-white font-bold text-base md:text-lg drop-shadow-lg text-center">{pkg.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <Link href="/paquetes" className="inline-block bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl">
                  Ver Todos los Paquetes →
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ═══════ TRUST BADGES ═══════ */}
        <TrustBadges />

        {/* ═══════ MORE SERVICES ═══════ */}
        <AnimatedSection>
          <div className="bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Más Servicios</h2>
                <p className="text-lg text-gray-600">Descubre todo lo que tenemos para ti</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { href: '/blog', title: 'Blog de Salud', desc: '200+ artículos sobre análisis clínicos, prevención y bienestar', icon: '📚', color: 'blue', bar: 'from-blue-500 to-blue-600' },
                  { href: '/check-ups', title: 'Check-Ups', desc: '8 paquetes médicos diseñados para tu salud preventiva', icon: '✅', color: 'green', bar: 'from-green-500 to-green-600' },
                  { href: '/sueroterapia', title: 'Sueroterapia', desc: '10 tratamientos IV vitamínicos para energía, belleza y bienestar', icon: '💉', color: 'purple', bar: 'from-purple-500 to-purple-600' },
                ].map((s) => (
                  <Link key={s.title} href={s.href} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden border border-gray-100">
                    <div className="p-8">
                      <div className={`w-16 h-16 bg-${s.color}-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-${s.color}-200 transition-colors`}>
                        <span className="text-3xl">{s.icon}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{s.title}</h3>
                      <p className="text-gray-600 mb-4">{s.desc}</p>
                      <div className={`flex items-center text-${s.color}-600 font-semibold group-hover:text-${s.color}-700`}>
                        Explorar <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <div className={`h-2 bg-gradient-to-r ${s.bar}`} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ═══════ FAQ PREVIEW ═══════ */}
        <AnimatedSection>
          <div className="bg-gray-50 py-16 px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Preguntas Frecuentes</h2>
                <p className="text-gray-600">Lo que más nos preguntan nuestros pacientes</p>
              </div>
              <div className="space-y-4">
                {topFAQs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start gap-3">
                      <HelpCircle size={20} className="text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                        <p className="text-gray-600 text-sm">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/faq" className="text-green-700 font-bold hover:text-green-900 transition-colors">
                  Ver todas las preguntas →
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ═══════ TESTIMONIALS ═══════ */}
        <AnimatedSection>
          <div className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <TestimonialsCarousel itemsToShow={3} autoPlay={true} interval={5000} />
            </div>
          </div>
        </AnimatedSection>

        {/* ═══════ CTA ═══════ */}
        <AnimatedSection>
          <div className="bg-gradient-to-r from-green-800 to-blue-800 py-16 px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">¿Tienes dudas?</h2>
              <p className="text-lg text-green-100 mb-8">Contáctanos por WhatsApp y te asesoramos</p>
              <a
                href="https://wa.me/527716854026?text=Hola, necesito información"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-green-800 px-10 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all hover:scale-105 shadow-lg"
              >
                📱 Chatear Ahora
              </a>
            </div>
          </div>
        </AnimatedSection>
      </main>
    </>
  );
}
