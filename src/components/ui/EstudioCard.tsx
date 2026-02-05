'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface EstudioProps {
    id: string;
    nombre: string;
    precioBase: number;
    imagen: string;
    tiempoEntrega: string;
    preparacion: string;
}

export function EstudioCard({ estudio }: { estudio: EstudioProps }) {
    const [precio, setPrecio] = useState(estudio.precioBase);
    const [loading, setLoading] = useState(true);
    const [descuento, setDescuento] = useState(0);
    const [mensajeIA, setMensajeIA] = useState<string | null>(null);

    useEffect(() => {
        // Simular footprint del usuario (en prod vendría de fingerprint.js)
        const context = {
            studyName: estudio.nombre,
            basePrice: estudio.precioBase,
            // Estos datos vendrían del contexto global o localStorage
            competitorPrice: estudio.precioBase * 1.1,
            userVisitCount: 2,
            referrer: document.referrer
        };

        // Llamar a la IA Stratregist
        fetch('/api/precio-dinamico', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(context)
        })
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    setPrecio(response.data.finalPrice);
                    setDescuento(response.data.discountApplied);
                    if (response.data.discountApplied > 0) {
                        setMensajeIA("Oferta personalizada por IA 🤖");
                    }
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [estudio.id]);

    return (
        <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden">
            {/* Badge de IA */}
            <AnimatePresence>
                {descuento > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-3 right-3 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center gap-1 shadow-lg"
                    >
                        <Clock size={12} />
                        AHORRAS ${descuento.toFixed(0)}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative h-48 overflow-hidden">
                <img
                    src={estudio.imagen}
                    alt={estudio.nombre}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60" />
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-slate-800 line-clamp-2 min-h-[3.5rem]">
                    {estudio.nombre}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-500 mt-2 mb-4">
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                        <Clock size={12} /> {estudio.tiempoEntrega}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                        <ShieldCheck size={12} /> Garantía
                    </span>
                </div>

                <div className="flex items-end justify-between mt-4">
                    <div className="flex flex-col">
                        {descuento > 0 && (
                            <span className="text-sm text-slate-400 line-through font-medium">
                                ${estudio.precioBase.toFixed(2)}
                            </span>
                        )}
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-teal-600">
                                ${precio.toFixed(2)}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">MXN</span>
                        </div>
                        {mensajeIA && (
                            <span className="text-xs text-teal-600 font-medium animate-pulse">
                                {mensajeIA}
                            </span>
                        )}
                    </div>

                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
                        aria-label="Agregar al carrito"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
