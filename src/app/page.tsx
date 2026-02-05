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

      <main className="min-h-screen bg-white">
        {/* Hero Section - Optimizado para Mobile */}
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 pb-16 pt-12 px-4">


          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Heart size={16} fill="currentColor" />
                Tu salud, nuestra prioridad
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
                Laboratorio Clínico del Bienestar
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Diagnósticos precisos con tecnología de vanguardia
              </p>
            </div>

            {/* Search Bar - Simplified for Mobile */}
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-700 font-semibold mb-3 flex items-center justify-center gap-2">
                <Search size={18} />
                Busca tu estudio médico
              </p>
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200">
                <SearchBar
                  placeholder="Ej: Biometría, Química Sanguínea..."
                  showCategoryFilter={true}
                  className="w-full"
                />
                <p className="text-gray-500 text-xs md:text-sm mt-3 text-center">
                  ⚡ Más de <span className="font-bold text-blue-600">2,000 estudios</span> · Resultados en 24h
                </p>
              </div>
            </div>

            {/* Trust Indicators - Mobile Optimized */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8 max-w-4xl mx-auto">
              {[
                { icon: Shield, text: 'Certificados', color: 'blue' },
                { icon: Clock, text: 'Rápido', color: 'green' },
                { icon: Award, text: '15+ Años', color: 'purple' },
                { icon: Heart, text: 'Personalizado', color: 'red' },
              ].map((item, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-2 bg-white rounded-lg p-3 md:p-4 shadow-sm border border-gray-100`}>
                  <item.icon size={20} className={`text-${item.color}-600`} />
                  <span className="text-xs md:text-sm font-medium text-gray-700 text-center md:text-left">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Grid - Mobile Optimized */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Explora por Categoría
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/estudios/${cat.id}`}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-center text-center group border border-gray-100"
              >
                <div className="mb-3 group-hover:scale-110 transition-transform text-4xl md:text-5xl">
                  {cat.icon}
                </div>
                <span className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Studies Section - Removed to improve performance */}
        {/* Studies are now loaded from database via API */}

        {/* CTA Section - Clean Design */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              ¿Necesitas ayuda para elegir?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Nuestro equipo médico está disponible para asesorarte
            </p>
            <a
              href="https://wa.me/5217757371811?text=Hola, necesito ayuda para elegir un estudio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
