import Link from 'next/link';
import { Search, MapPin, TestTube, Calendar } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';

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
