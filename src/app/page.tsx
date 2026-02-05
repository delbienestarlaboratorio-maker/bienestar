import Link from 'next/link';
import { Search, ArrowRight, Heart, Shield, Clock, Award } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';

// Categories defined inline to avoid loading 1MB studies.ts file
const categories = [
  { id: 'analisis-clinicos', name: 'Análisis Clínicos', icon: '🔬' },
  { id: 'radiologia', name: 'Radiología', icon: '📡' },
  { id: 'cardiologia', name: 'Cardiología', icon: '❤️' },
  { id: 'ultrasonido', name: 'Ultrasonido', icon: '🔊' },
  { id: 'otros', name: 'Otros Estudios', icon: '📋' },
];

export default function Home() {
  return (
    <>
      {/* JSON-LD Schema for SEO - Helps Google understand our medical business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "Laboratorio Bienestar",
            "description": "Laboratorio clínico con más de 2,000 estudios médicos. Análisis clínicos, radiología, cardiología y ultrasonido con resultados rápidos.",
            "url": "https://laboratoriobienestar.com",
            "telephone": "+52-55-1234-5678",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "MX",
              "addressLocality": "Ciudad de México"
            },
            "medicalSpecialty": ["Laboratory", "Radiology", "Cardiology"],
            "priceRange": "$$"
          })
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-white to-green-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-900 via-green-800 to-blue-900 text-white pb-24 pt-16 px-4 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="text-white" size={40} fill="currentColor" />
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-2">
                  Tu salud es nuestra prioridad
                </h1>
                <p className="text-xl text-green-100 max-w-2xl">
                  Diagnósticos precisos con tecnología de vanguardia y el mejor equipo médico
                </p>
              </div>
            </div>

            {/* Search Bar - Enhanced */}
            <div className="mt-10">
              <p className="text-white text-lg mb-4 font-semibold flex items-center gap-2">
                <Search size={20} />
                Busca tu estudio médico
              </p>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border-2 border-white/30 shadow-2xl">
                <SearchBar
                  placeholder="Escribe: Biometría, Química Sanguínea, Rayos X, Ultrasonido..."
                  showCategoryFilter={true}
                  className="w-full"
                />
                <p className="text-white/90 text-sm mt-3 text-center font-medium">
                  ⚡ Más de <span className="font-bold text-yellow-300">2,000 estudios</span> disponibles · Resultados en 24h
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[
                { icon: Shield, text: 'Resultados Certificados' },
                { icon: Clock, text: 'Entrega Rápida' },
                { icon: Award, text: '15+ Años de Experiencia' },
                { icon: Heart, text: 'Atención Personalizada' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <item.icon size={24} className="text-green-100" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-6xl mx-auto px-4 -mt-16 mb-20 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/estudios/${cat.id}`}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 flex flex-col items-center text-center group border-2 border-transparent hover:border-green-200"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform text-6xl">
                  {cat.icon}
                </div>
                <span className="font-bold text-gray-800 group-hover:text-green-900 transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Studies Section - Removed to improve performance */}
        {/* Studies are now loaded from database via API */}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">¿Necesitas ayuda para elegir?</h2>
            <p className="text-xl text-green-100 mb-8">
              Nuestro equipo médico está disponible para asesorarte
            </p>
            <button className="bg-white text-green-900 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
              Contactar a un Especialista
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
