import Link from 'next/link';
import { Search, MapPin, TestTube, Calendar } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import { TestimonialsCarousel } from '@/components/social/TestimonialsCarousel';

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Hero Section - Ultra Simplificado */}
        <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">

            {/* Título Principal */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Laboratorio Clínico
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12">
              Más de 2,000 estudios médicos disponibles
            </p>

            {/* Buscador Principal - MUY DESTACADO */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-16 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <Search className="text-blue-600" size={28} />
                <p className="text-lg font-semibold text-gray-900">
                  Busca tu estudio aquí
                </p>
              </div>
              <SearchBar
                placeholder="Ej: Biometría hemática, Glucosa, Rayos X..."
                showCategoryFilter={false}
                className="w-full text-lg"
              />
            </div>

            {/* 3 Acciones Principales - SOLO 3 */}
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">

              {/* Acción 1: Explorar */}
              <Link
                href="/estudios/analisis-clinicos"
                className="relative h-48 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden group"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: 'url(/images/hero/ver-estudios.png)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all" />
                <div className="relative h-full flex flex-col items-center justify-end p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                    Ver Estudios
                  </h3>
                  <p className="text-sm text-white/90 drop-shadow-md">
                    Explora nuestro catálogo completo
                  </p>
                </div>
              </Link>

              {/* Acción 2: Agendar */}
              <Link
                href="/agendar"
                className="relative h-48 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden group"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: 'url(/images/hero/agendar-cita.png)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-blue-900/10 to-transparent group-hover:from-blue-900/60 transition-all" />
                <div className="relative h-full flex flex-col items-center justify-end p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                    Agendar Cita
                  </h3>
                  <p className="text-sm text-white/90 drop-shadow-md">
                    Reserva tu cita en línea
                  </p>
                </div>
              </Link>

              {/* Acción 3: Ubicaciones */}
              <Link
                href="/sucursales"
                className="relative h-48 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden group"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: 'url(/images/hero/sucursales.png)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all" />
                <div className="relative h-full flex flex-col items-center justify-end p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                    Sucursales
                  </h3>
                  <p className="text-sm text-white/90 drop-shadow-md">
                    2 ubicaciones en Tizayuca
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Symptom Search CTA - NUEVA SECCIÓN */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🆕 Nueva Herramienta
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              ¿No sabes qué estudio necesitas?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Describe tus síntomas y te ayudaremos a encontrar los estudios correctos
            </p>

            {/* Examples */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                💡 "me duele la panza"
              </span>
              <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                💡 "estoy muy cansado"
              </span>
              <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                💡 "tengo tos"
              </span>
            </div>

            <Link
              href="/asistente"
              className="inline-block bg-white text-purple-600 font-bold text-lg px-10 py-4 rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl"
            >
              🔍 Buscar por Síntomas
            </Link>
          </div>
        </div>

        {/* Sección de Paquetes - NUEVA */}
        <div className="bg-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Título de la Sección */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Paquetes de Estudios
              </h2>
              <p className="text-lg text-gray-600">
                Ahorra hasta 29% con nuestros paquetes diseñados para ti
              </p>
            </div>

            {/* Grid de 5 Paquetes */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

              {/* Para Ella */}
              <Link
                href="/paquetes?categoria=para-ella"
                className="relative aspect-square rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden group"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: 'url(/images/packages/para-ella.png)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-pink-900/20 to-transparent group-hover:from-pink-900/70 transition-all" />
                <div className="relative h-full flex items-end justify-center p-4">
                  <h3 className="text-white font-bold text-base md:text-lg drop-shadow-lg text-center">
                    Para Ella
                  </h3>
                </div>
              </Link>

              {/* Para Él */}
              <Link
                href="/paquetes?categoria=para-el"
                className="relative aspect-square rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden group"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: 'url(/images/packages/para-el.png)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-900/20 to-transparent group-hover:from-blue-900/70 transition-all" />
                <div className="relative h-full flex items-end justify-center p-4">
                  <h3 className="text-white font-bold text-base md:text-lg drop-shadow-lg text-center">
                    Para Él
                  </h3>
                </div>
              </Link>

              {/* Por Edad */}
              <Link
                href="/paquetes?categoria=por-edad"
                className="relative aspect-square rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden group"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: 'url(/images/packages/por-edad.png)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 via-orange-900/20 to-transparent group-hover:from-orange-900/70 transition-all" />
                <div className="relative h-full flex items-end justify-center p-4">
                  <h3 className="text-white font-bold text-base md:text-lg drop-shadow-lg text-center">
                    Por Edad
                  </h3>
                </div>
              </Link>

              {/* Por Condición */}
              <Link
                href="/paquetes?categoria=por-condicion"
                className="relative aspect-square rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden group"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: 'url(/images/packages/por-condicion.png)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-green-900/20 to-transparent group-hover:from-green-900/70 transition-all" />
                <div className="relative h-full flex items-end justify-center p-4">
                  <h3 className="text-white font-bold text-base md:text-lg drop-shadow-lg text-center">
                    Por Condición
                  </h3>
                </div>
              </Link>

              {/* Especiales */}
              <Link
                href="/paquetes?categoria=especiales"
                className="relative aspect-square rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden group"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: 'url(/images/packages/especiales.png)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-purple-900/20 to-transparent group-hover:from-purple-900/70 transition-all" />
                <div className="relative h-full flex items-end justify-center p-4">
                  <h3 className="text-white font-bold text-base md:text-lg drop-shadow-lg text-center">
                    Especiales
                  </h3>
                </div>
              </Link>
            </div>

            {/* Botón Ver Todos */}
            <div className="text-center">
              <Link
                href="/paquetes"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Ver Todos los Paquetes →
              </Link>
            </div>
          </div>
        </div>

        {/* Sección de Más Servicios - NUEVA */}
        <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Título de la Sección */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Más Servicios
              </h2>
              <p className="text-lg text-gray-600">
                Descubre todo lo que tenemos para ti
              </p>
            </div>

            {/* Grid de 3 Servicios */}
            <div className="grid md:grid-cols-3 gap-8">

              {/* Blog de Salud */}
              <Link
                href="/blog"
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden"
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <span className="text-3xl">📚</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Blog de Salud
                  </h3>
                  <p className="text-gray-600 mb-4">
                    200+ artículos sobre análisis clínicos, prevención y bienestar
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    Explorar artículos
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600" />
              </Link>

              {/* Check-Ups */}
              <Link
                href="/check-ups"
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden"
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <span className="text-3xl">✅</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Check-Ups
                  </h3>
                  <p className="text-gray-600 mb-4">
                    8 paquetes médicos diseñados para tu salud preventiva
                  </p>
                  <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700">
                    Ver paquetes
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="h-2 bg-gradient-to-r from-green-500 to-green-600" />
              </Link>

              {/* Sueroterapia */}
              <Link
                href="/sueroterapia"
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden"
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <span className="text-3xl">💉</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Sueroterapia
                  </h3>
                  <p className="text-gray-600 mb-4">
                    10 tratamientos IV vitamínicos para energía, belleza y bienestar
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                    Conocer tratamientos
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600" />
              </Link>

            </div>
          </div>
        </div>

        {/* Sección de Información Mínima */}
        <div className="bg-gray-50 py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              ¿Por qué elegirnos?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-gray-900 mb-2">Resultados Rápidos</h3>
                <p className="text-gray-600">En 24-48 horas</p>
              </div>
              <div>
                <div className="text-4xl mb-3">🏥</div>
                <h3 className="font-bold text-gray-900 mb-2">Tecnología Moderna</h3>
                <p className="text-gray-600">Equipos de última generación</p>
              </div>
              <div>
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-bold text-gray-900 mb-2">Precios Accesibles</h3>
                <p className="text-gray-600">Promociones disponibles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <TestimonialsCarousel itemsToShow={3} autoPlay={true} interval={5000} />
          </div>
        </div>

        {/* CTA WhatsApp - MUY SIMPLE */}
        <div className="bg-white py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Tienes dudas?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Contáctanos por WhatsApp
            </p>
            <a
              href="https://wa.me/5217757371811?text=Hola, necesito información"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-green-700 transition-all hover:scale-105 shadow-lg"
            >
              📱 Chatear Ahora
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
