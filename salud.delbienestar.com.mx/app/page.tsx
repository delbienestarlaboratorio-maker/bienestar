import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salud y Bienestar | Blog, Síntomas y Enfermedades',
  description: 'Tu guía completa de salud: artículos médicos, síntomas A-Z, enfermedades CIE-10, valores clínicos y biomarcadores.',
};

export default function SaludHomePage() {
  const sections = [
    { href: '/blog/', title: '📝 Blog de Salud', desc: '220 artículos médicos', color: 'from-green-600 to-emerald-700' },
    { href: '/sintomas/', title: '🩺 Síntomas A-Z', desc: '22 síntomas con estudios recomendados', color: 'from-rose-600 to-pink-700' },
    { href: '/enfermedades/', title: '📖 Enfermedades CIE-10', desc: 'Clasificación internacional', color: 'from-blue-600 to-indigo-700' },
    { href: '/valores-clinicos/', title: '📊 Biomarcadores', desc: '313 valores clínicos de referencia', color: 'from-purple-600 to-violet-700' },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-teal-800 to-blue-900" />
        <div className="relative max-w-5xl mx-auto text-center py-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🏥 Tu Guía de <span className="text-green-400">Salud</span>
          </h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Información médica confiable sobre síntomas, enfermedades, valores clínicos y artículos de salud. Todo validado por profesionales.
          </p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((s) => (
          <Link key={s.href} href={s.href} className="group block">
            <div className={`bg-gradient-to-r ${s.color} rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]`}>
              <h2 className="text-2xl font-bold mb-2">{s.title}</h2>
              <p className="text-white/80">{s.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
