'use client';

import { EstudioCard } from '@/components/ui/EstudioCard';

// Datos de prueba (en producción vendrían de la DB)
const featuredPromos = [
    {
        id: '1',
        nombre: 'Check-up Básico Mujer',
        precioBase: 1200,
        imagen: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
        tiempoEntrega: '24 horas',
        preparacion: 'Ayuno 8hrs'
    },
    {
        id: '2',
        nombre: 'Check-up Básico Hombre',
        precioBase: 1150,
        imagen: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
        tiempoEntrega: '24 horas',
        preparacion: 'Ayuno 8hrs'
    },
    {
        id: '3',
        nombre: 'Perfil Diabético Control',
        precioBase: 890,
        imagen: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80',
        tiempoEntrega: '12 horas',
        preparacion: 'Ayuno 8hrs'
    }
];

export function Promotions() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Ofertas del Mes</h2>
                        <p className="text-teal-600 font-medium">Precios dinámicos activados por IA 🤖</p>
                    </div>
                    <button className="hidden md:block text-blue-600 font-semibold hover:text-blue-700">
                        Ver todas las promociones →
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredPromos.map(estudio => (
                        <EstudioCard key={estudio.id} estudio={estudio} />
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <button className="text-blue-600 font-semibold hover:text-blue-700">
                        Ver todas las promociones →
                    </button>
                </div>
            </div>
        </section>
    );
}
