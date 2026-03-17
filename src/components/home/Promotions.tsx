'use client';

export function Promotions() {
    const featuredPromos = [
        {
            id: '1',
            nombre: 'Check-up Básico Mujer',
            precio: 1200,
            imagen: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
            tiempoEntrega: '24 horas',
        },
        {
            id: '2',
            nombre: 'Check-up Básico Hombre',
            precio: 1150,
            imagen: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
            tiempoEntrega: '24 horas',
        },
        {
            id: '3',
            nombre: 'Perfil Diabético Control',
            precio: 890,
            imagen: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80',
            tiempoEntrega: '12 horas',
        }
    ];

    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Ofertas del Mes 🎉</h2>
                        <p className="text-teal-600 font-medium">Precios dinámicos activados por IA 🤖</p>
                    </div>
                    <button className="hidden md:block text-blue-600 font-semibold hover:text-blue-700">
                        Ver todas las promociones →
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredPromos.map(estudio => (
                        <div key={estudio.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 overflow-hidden">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={estudio.imagen}
                                    alt={estudio.nombre}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-slate-800 mb-4">{estudio.nombre}</h3>
                                <div className="flex items-end justify-between">
                                    <div>
                                        <span className="text-2xl font-black text-teal-600">${estudio.precio}</span>
                                        <span className="text-xs text-slate-500 font-medium ml-1">MXN</span>
                                    </div>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl">
                                        🛒
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
