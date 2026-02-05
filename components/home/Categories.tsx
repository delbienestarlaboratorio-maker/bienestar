'use client';

import { Microscope, Activity, Heart, Dna, Baby, TestTube } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
    { id: 1, name: 'Check-ups', icon: Activity, color: 'bg-blue-100 text-blue-600' },
    { id: 2, name: 'Análisis Clínicos', icon: TestTube, color: 'bg-teal-100 text-teal-600' },
    { id: 3, name: 'Imagenología', icon: Microscope, color: 'bg-indigo-100 text-indigo-600' },
    { id: 4, name: 'Cardiología', icon: Heart, color: 'bg-rose-100 text-rose-600' },
    { id: 5, name: 'Genética', icon: Dna, color: 'bg-purple-100 text-purple-600' },
    { id: 6, name: 'Maternidad', icon: Baby, color: 'bg-pink-100 text-pink-600' },
];

export function Categories() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Servicios Especializados</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Cubrimos todas las especialidades médicas con tecnología de vanguardia y resultados precisos.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group cursor-pointer"
                        >
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all text-center flex flex-col items-center gap-4">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                                    <cat.icon size={28} />
                                </div>
                                <h3 className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                                    {cat.name}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
