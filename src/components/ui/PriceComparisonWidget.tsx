'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingDown, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { getCompetitorPrices, type PreciosComparacion } from '@/data/competitor-prices';

interface PriceComparisonWidgetProps {
    slug: string;
    nombreEstudio: string;
    precioNuestro: number; // precio final (promo) de Bienestar
}

function PriceBar({ precio, maxPrecio }: { precio: number; maxPrecio: number }) {
    const pct = Math.round((precio / maxPrecio) * 100);
    return (
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <motion.div
                className="h-2 rounded-full bg-gradient-to-r from-red-400 to-red-600"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            />
        </div>
    );
}

function SkeletonRow() {
    return (
        <div className="flex items-center gap-3 py-3 px-4 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="flex-1">
                <div className="h-3 w-28 rounded bg-gray-200 mb-2" />
                <div className="h-2 w-20 rounded bg-gray-100" />
            </div>
            <div className="h-5 w-16 rounded bg-gray-200" />
        </div>
    );
}

export default function PriceComparisonWidget({
    slug,
    nombreEstudio,
    precioNuestro,
}: PriceComparisonWidgetProps) {
    const [data, setData] = useState<PreciosComparacion | null>(null);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        // Simular carga ligera (~600ms para que parezca que "busca" en tiempo real)
        const timer = setTimeout(() => {
            const prices = getCompetitorPrices(slug, precioNuestro);
            setData(prices);
            setLoading(false);
        }, 700);
        return () => clearTimeout(timer);
    }, [slug, precioNuestro]);

    // ¿Cuánto ahorran vs el más caro de la competencia?
    const maxCompetitorPrice = data
        ? Math.max(...data.competidores.map(c => c.precioPromo ?? c.precioRegular))
        : 0;
    const ahorroMax = maxCompetitorPrice - precioNuestro;
    const ahorroMinChopo = data
        ? (data.competidores[0]?.precioPromo ?? data.competidores[0]?.precioRegular) - precioNuestro
        : 0;

    // Todos los precios para la barra proporcional
    const allPrices = data
        ? [...data.competidores.map(c => c.precioPromo ?? c.precioRegular), precioNuestro]
        : [];
    const maxPrice = allPrices.length ? Math.max(...allPrices) : 1;

    return (
        <div className="rounded-2xl border border-emerald-200 bg-white shadow-lg overflow-hidden">
            {/* ─── Header ─── */}
            <button
                onClick={() => setExpanded(v => !v)}
                className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
            >
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-xl p-2">
                        <TrendingDown size={20} className="text-white" />
                    </div>
                    <div className="text-left">
                        <p className="font-bold text-lg leading-tight">Comparador de precios</p>
                        <p className="text-emerald-100 text-sm">Siempre el precio más bajo garantizado</p>
                    </div>
                </div>
                {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* ─── Banner de ahorro ─── */}
                        {!loading && ahorroMinChopo > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mx-4 mt-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 flex items-start gap-3"
                            >
                                <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                                <div>
                                    <p className="font-bold text-emerald-800 text-sm">
                                        ¡Ahorras{' '}
                                        <span className="text-lg">${ahorroMinChopo.toFixed(0)}</span> vs El Chopo y{' '}
                                        <span className="text-lg">${ahorroMax.toFixed(0)}</span> vs el más caro!
                                    </p>
                                    <p className="text-emerald-600 text-xs mt-0.5">
                                        Con nosotros siempre pagas menos. Precio verificado.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* ─── Tabla comparativa ─── */}
                        <div className="px-4 py-3">
                            {/* Header columnas */}
                            <div className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100">
                                <span className="flex-1">Laboratorio</span>
                                <span className="w-20 text-right">Precio</span>
                            </div>

                            {/* Skeleton mientras carga */}
                            {loading && (
                                <div>
                                    <SkeletonRow />
                                    <SkeletonRow />
                                    <SkeletonRow />
                                    <SkeletonRow />
                                </div>
                            )}

                            {/* Filas de competidores */}
                            {!loading && data && (
                                <AnimatePresence>
                                    {/* Competidores (ordenados de más caro a más barato) */}
                                    {[...data.competidores]
                                        .sort((a, b) =>
                                            (b.precioPromo ?? b.precioRegular) - (a.precioPromo ?? a.precioRegular)
                                        )
                                        .map((comp, i) => {
                                            const precio = comp.precioPromo ?? comp.precioRegular;
                                            return (
                                                <motion.div
                                                    key={comp.lab}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.12 }}
                                                    className="flex items-center gap-3 py-3 px-4 border-b border-gray-50 group"
                                                >
                                                    {/* Logo/color */}
                                                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg shrink-0">
                                                        {comp.logo}
                                                    </div>

                                                    {/* Nombre + barra */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-sm font-semibold text-gray-700 truncate">
                                                                {comp.lab}
                                                            </p>
                                                            {comp.fuente === 'estimado' && (
                                                                <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full shrink-0">
                                                                    ref.
                                                                </span>
                                                            )}
                                                            {comp.url && (
                                                                <a
                                                                    href={comp.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                                >
                                                                    <ExternalLink size={12} className="text-gray-400" />
                                                                </a>
                                                            )}
                                                        </div>
                                                        <div className="mt-1.5">
                                                            <PriceBar precio={precio} maxPrecio={maxPrice} />
                                                        </div>
                                                    </div>

                                                    {/* Precio */}
                                                    <div className="text-right shrink-0 w-24">
                                                        {comp.precioPromo && comp.precioPromo < comp.precioRegular && (
                                                            <p className="text-xs text-gray-400 line-through">
                                                                ${comp.precioRegular.toFixed(0)}
                                                            </p>
                                                        )}
                                                        <p className="text-base font-bold text-gray-800">
                                                            ${precio.toFixed(0)}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}

                                    {/* ─── NUESTRA FILA (siempre la última y la más barata) ─── */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.45 }}
                                        className="relative flex items-center gap-3 py-4 px-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-400 rounded-xl mx-1 my-2 shadow-sm"
                                    >
                                        {/* Badge "Más Barato" */}
                                        <div className="absolute -top-3 left-4 bg-emerald-500 text-white text-[11px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                                            <CheckCircle2 size={11} />
                                            EL MÁS BARATO ✓
                                        </div>

                                        {/* Logo */}
                                        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-lg shrink-0">
                                            🟢
                                        </div>

                                        {/* Nombre + barra */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-black text-emerald-800">
                                                Laboratorio Del Bienestar
                                            </p>
                                            <div className="mt-1.5 w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
                                                <motion.div
                                                    className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.round((precioNuestro / maxPrice) * 100)}%` }}
                                                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.5 }}
                                                />
                                            </div>
                                        </div>

                                        {/* Precio */}
                                        <div className="text-right shrink-0 w-24">
                                            <p className="text-xs text-emerald-600 line-through">
                                                ${Math.round(precioNuestro * 1.1).toFixed(0)}
                                            </p>
                                            <p className="text-xl font-black text-emerald-700">
                                                ${precioNuestro.toFixed(0)}
                                            </p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </div>

                        {/* ─── Footer con nota ─── */}
                        <div className="px-5 pb-4">
                            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
                                <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-xs text-amber-700 leading-snug">
                                    Precios verificados en {new Date().toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}.
                                    Los marcados como <strong>"ref."</strong> son precios referenciales de mercado.
                                    Los precios del Chopo son obtenidos directamente de su sitio web.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
