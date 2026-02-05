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
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-gray-100 hover:border-blue-300 group"
              >
                <TestTube className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Ver Estudios
                </h3>
                <p className="text-sm text-gray-600">
                  Explora nuestro catálogo completo
                </p>
              </Link>

              {/* Acción 2: Agendar */}
              <Link
                href="/agendar"
                className="bg-blue-600 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <Calendar className="w-12 h-12 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Agendar Cita
                </h3>
                <p className="text-sm text-blue-100">
                  Reserva tu cita en línea
                </p>
              </Link>

              {/* Acción 3: Ubicaciones */}
              <Link
                href="/sucursales"
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-gray-100 hover:border-blue-300 group"
              >
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Sucursales
                </h3>
                <p className="text-sm text-gray-600">
                  2 ubicaciones en Tizayuca
                </p>
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
