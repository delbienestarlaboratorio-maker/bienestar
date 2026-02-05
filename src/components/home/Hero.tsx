'use client';

import { useState } from 'react';

export function Hero() {
    const [results, setResults] = useState([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const q = e.target.value;
        if (q.length > 1) {
            fetch(`/api/search?q=${q}`)
                .then(res => res.json())
                .then(data => setResults(data))
                .catch(err => console.error(err));
        } else {
            setResults([]);
        }
    };

    return (
        <div className="relative bg-white overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal-50 to-transparent opacity-60" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-50 rounded-tr-[100px] opacity-40" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <div>
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                            <span>⚡</span>
                            <span>Tecnología Japonesa y Alemana</span>
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
                            Diagnósticos que <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                                Salvan Vidas
                            </span>
                        </h1>

                        <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                            Resultados precisos en tiempo récord. Con nuestra IA analizamos precios para garantizarte siempre la mejor opción del mercado.
                        </p>

                        {/* Smart Search Bar */}
                        <div className="relative max-w-xl z-50">
                            <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 flex flex-col sm:flex-row gap-2">
                                <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-xl">
                                    <span className="text-slate-400">🔍</span>
                                    <input
                                        type="text"
                                        placeholder="¿Qué estudio necesitas hoy?"
                                        className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-slate-700 placeholder:text-slate-400 h-12 ml-2"
                                        onChange={handleSearch}
                                    />
                                </div>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 rounded-xl font-bold transition-colors shadow-lg shadow-blue-200">
                                    Buscar
                                </button>
                            </div>

                            {/* Autocomplete Dropdown */}
                            {results.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden">
                                    {results.map((result: any) => (
                                        <div
                                            key={result.id}
                                            className="p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 flex justify-between items-center group transition-colors"
                                            onClick={() => window.location.href = `/test-pricing`}
                                        >
                                            <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                                                {result.nombre}
                                            </span>
                                            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full font-bold">
                                                {result.categoria}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex items-center gap-6 text-sm font-medium text-slate-500">
                            <span className="flex items-center gap-2">
                                📍 +50 Sucursales
                            </span>
                            <span className="flex items-center gap-2">
                                📅 Citas Express
                            </span>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative hidden lg:block">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Doctora analizando resultados"
                                className="w-full h-auto object-cover"
                            />

                            {/* Floating Card */}
                            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 max-w-xs">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                                        ⚡
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-bold uppercase">Resultados en Línea</p>
                                        <p className="font-bold text-slate-900">Consulta en 2 hrs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
