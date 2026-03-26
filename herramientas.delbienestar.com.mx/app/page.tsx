import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Herramientas de Salud Gratuitas | Calculadoras Médicas',
  description: 'Más de 130 calculadoras médicas gratuitas: IMC, Glasgow, riesgo cardiovascular, diabetes, embarazo y más.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-teal-800 to-blue-900" />
        <div className="relative max-w-5xl mx-auto text-center py-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🧮 Herramientas de Salud <span className="text-green-400">Gratuitas</span>
          </h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
            Más de 130 calculadoras médicas validadas científicamente. Evalúa tu salud, conoce tus valores y descubre qué estudios necesitas.
          </p>
          <Link href="/herramientas/" className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg inline-block">
            Ver Todas las Herramientas →
          </Link>
        </div>
      </div>
    </main>
  );
}
