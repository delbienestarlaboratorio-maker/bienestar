'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BannerItem {
    title: string;
    subtitle: string;
    cta: string;
    href: string;
    gradient: string;
    icon: string;
}

const BANNERS: BannerItem[] = [
    {
        title: 'ðŸ”¬ Check-Up BÃ¡sico desde $499',
        subtitle: 'Incluye BiometrÃ­a HemÃ¡tica, Glucosa, Perfil de LÃ­pidos y mÃ¡s',
        cta: 'Ver Check-Ups',
        href: 'https://laboratorio.delbienestar.com.mx/check-ups',
        gradient: 'from-green-700 via-green-800 to-emerald-900',
        icon: 'ðŸ¥',
    },
    {
        title: 'ðŸ’‰ Sueroterapia VitamÃ­nica',
        subtitle: 'Recupera energÃ­a, fortalece tu sistema inmune. 10 tratamientos IV disponibles',
        cta: 'Conocer MÃ¡s',
        href: 'https://laboratorio.delbienestar.com.mx/sueroterapia',
        gradient: 'from-purple-700 via-purple-800 to-indigo-900',
        icon: 'ðŸ’Š',
    },
    {
        title: 'ðŸ“± Agenda tu Cita por WhatsApp',
        subtitle: 'AtenciÃ³n personalizada â€¢ Resultados en 24-48 hrs â€¢ Sin filas',
        cta: 'Chatear Ahora',
        href: 'https://wa.me/527716854026?text=Hola,%20necesito%20informaciÃ³n%20sobre%20estudios',
        gradient: 'from-emerald-600 via-teal-700 to-cyan-800',
        icon: 'ðŸ“²',
    },
    {
        title: 'ðŸŽ¯ Hasta 30% de Descuento',
        subtitle: 'Promociones exclusivas en paquetes de estudios clÃ­nicos este mes',
        cta: 'Ver Promociones',
        href: 'https://laboratorio.delbienestar.com.mx/promociones',
        gradient: 'from-rose-600 via-pink-700 to-fuchsia-800',
        icon: 'ðŸ·ï¸',
    },
    {
        title: 'ðŸ§¬ +2,000 Estudios Disponibles',
        subtitle: 'AnÃ¡lisis clÃ­nicos, radiologÃ­a, cardiologÃ­a, ultrasonido y mÃ¡s',
        cta: 'Explorar CatÃ¡logo',
        href: 'https://laboratorio.delbienestar.com.mx/estudios/analisis-clinicos',
        gradient: 'from-blue-700 via-blue-800 to-indigo-900',
        icon: 'ðŸ”',
    },
];

interface AdBannerProps {
    variant?: 'horizontal' | 'compact' | 'sidebar';
    className?: string;
}

export function AdBanner({ variant = 'horizontal', className = '' }: AdBannerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Start at random position
        setCurrentIndex(Math.floor(Math.random() * BANNERS.length));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
                setIsVisible(true);
            }, 300);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const banner = BANNERS[currentIndex];
    const isExternal = banner.href.startsWith('http');

    if (variant === 'sidebar') {
        return (
            <div className={`rounded-2xl overflow-hidden shadow-lg ${className}`}>
                <div className={`bg-gradient-to-br ${banner.gradient} p-6 text-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-4xl block mb-3">{banner.icon}</span>
                    <h3 className="text-white font-bold text-lg mb-2">{banner.title}</h3>
                    <p className="text-white/80 text-sm mb-4">{banner.subtitle}</p>
                    {isExternal ? (
                        <a href={banner.href} target="_blank" rel="noopener noreferrer"
                            className="inline-block bg-white text-gray-900 font-bold px-6 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors shadow-md">
                            {banner.cta}
                        </a>
                    ) : (
                        <Link href={banner.href}
                            className="inline-block bg-white text-gray-900 font-bold px-6 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors shadow-md">
                            {banner.cta}
                        </Link>
                    )}
                </div>
                {/* Ad indicator */}
                <div className="bg-gray-100 text-center py-1">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Publicidad</span>
                </div>
            </div>
        );
    }

    if (variant === 'compact') {
        return (
            <div className={`${className}`}>
                <div className={`bg-gradient-to-r ${banner.gradient} rounded-xl px-4 py-3 flex items-center justify-between gap-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} shadow-md`}>
                    <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl shrink-0">{banner.icon}</span>
                        <div className="min-w-0">
                            <p className="text-white font-bold text-sm truncate">{banner.title}</p>
                            <p className="text-white/70 text-xs truncate hidden sm:block">{banner.subtitle}</p>
                        </div>
                    </div>
                    {isExternal ? (
                        <a href={banner.href} target="_blank" rel="noopener noreferrer"
                            className="shrink-0 bg-white/20 hover:bg-white/30 text-white font-bold px-4 py-1.5 rounded-lg text-xs transition-colors backdrop-blur-sm border border-white/20">
                            {banner.cta}
                        </a>
                    ) : (
                        <Link href={banner.href}
                            className="shrink-0 bg-white/20 hover:bg-white/30 text-white font-bold px-4 py-1.5 rounded-lg text-xs transition-colors backdrop-blur-sm border border-white/20">
                            {banner.cta}
                        </Link>
                    )}
                </div>
                <div className="text-right mt-0.5">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Publicidad</span>
                </div>
            </div>
        );
    }

    // Horizontal (default)
    return (
        <div className={`${className}`}>
            <div className={`bg-gradient-to-r ${banner.gradient} rounded-2xl px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} shadow-lg`}>
                <div className="flex items-center gap-4 text-center md:text-left">
                    <span className="text-4xl shrink-0 hidden md:block">{banner.icon}</span>
                    <div>
                        <h3 className="text-white font-bold text-lg md:text-xl">{banner.title}</h3>
                        <p className="text-white/80 text-sm mt-1">{banner.subtitle}</p>
                    </div>
                </div>
                {isExternal ? (
                    <a href={banner.href} target="_blank" rel="noopener noreferrer"
                        className="shrink-0 bg-white text-gray-900 font-bold px-8 py-3 rounded-xl text-sm hover:bg-gray-100 transition-all hover:scale-105 shadow-lg">
                        {banner.cta} â†’
                    </a>
                ) : (
                    <Link href={banner.href}
                        className="shrink-0 bg-white text-gray-900 font-bold px-8 py-3 rounded-xl text-sm hover:bg-gray-100 transition-all hover:scale-105 shadow-lg">
                        {banner.cta} â†’
                    </Link>
                )}
            </div>
            <div className="text-right mt-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Publicidad</span>
            </div>
        </div>
    );
}

