"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export function SymptomClientList({ initialSymptoms }: { initialSymptoms: any[] }) {
    const [search, setSearch] = useState('');
    const filtered = initialSymptoms.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.medicalName?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="relative mb-12 max-w-2xl mx-auto">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                    type="text"
                    placeholder="Buscar un síntoma (ej. Dolor de cabeza, Náuseas...)"
                    className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-transparent bg-white shadow-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder-gray-400 text-lg transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    No encontramos ningún síntoma con esa palabra. Intenta con un sinónimo.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((s, i) => (
                        <Link key={i} href={`/sintomas/${s.slug}`} className="bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 p-8 flex flex-col h-full group hover:border-blue-200 transition-all">
                            <h3 className="text-xl font-extrabold text-blue-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {s.name}
                            </h3>
                            <div className="text-xs font-semibold text-gray-400 mb-4 px-3 py-1 bg-gray-100 rounded-full w-fit">
                                CIE-10: {s.cie10}
                            </div>
                            <p className="text-sm text-gray-600 mb-6 flex-1 line-clamp-3 leading-relaxed">
                                {s.intro}
                            </p>
                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-sm font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Explorar Diagnóstico &rarr;
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
