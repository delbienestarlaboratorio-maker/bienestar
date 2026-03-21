'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, Phone, Heart, BookOpen, Stethoscope, Activity, MapPin, Tag, FileText, Gift, HelpCircle, Info, Calculator, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';

const MAIN_SITE_URL = 'https://laboratorio.delbienestar.com.mx';

const mobileNavLinks = [
    { href: `${MAIN_SITE_URL}/estudios/analisis-clinicos`, label: 'Estudios', icon: Activity, accent: 'text-green-600' },
    { href: `${MAIN_SITE_URL}/paquetes`, label: 'Paquetes', icon: Gift, accent: 'text-blue-600' },
    { href: `${MAIN_SITE_URL}/check-ups`, label: 'Check-Ups', icon: Heart, accent: 'text-pink-600' },
    { href: `${MAIN_SITE_URL}/sintomas`, label: 'Síntomas A-Z', icon: Stethoscope, accent: 'text-rose-600' },
    { href: `${MAIN_SITE_URL}/enfermedades`, label: 'Enfermedades CIE-10', icon: BookOpen, accent: 'text-blue-700' },
    { href: `${MAIN_SITE_URL}/valores-clinicos`, label: 'Biomarcadores', icon: Activity, accent: 'text-indigo-600' },
    { href: `${MAIN_SITE_URL}/sucursales`, label: 'Sucursales', icon: MapPin, accent: 'text-purple-600' },
    { href: `${MAIN_SITE_URL}/promociones`, label: 'Promociones', icon: Tag, accent: 'text-orange-600' },
    { href: `${MAIN_SITE_URL}/nosotros`, label: 'Nosotros', icon: Info, accent: 'text-cyan-600' },
    { href: `${MAIN_SITE_URL}/herramientas`, label: 'Herramientas de Salud', icon: Calculator, accent: 'text-teal-600' },
    { href: `${MAIN_SITE_URL}/precios`, label: 'Precios de Estudios', icon: Tag, accent: 'text-green-600' },
    { href: `${MAIN_SITE_URL}/blog`, label: 'Blog de Salud', icon: BookOpen, accent: 'text-indigo-600' },
    { href: `${MAIN_SITE_URL}/faq`, label: 'Preguntas Frecuentes', icon: HelpCircle, accent: 'text-amber-600' },
    { href: `${MAIN_SITE_URL}/resultados`, label: 'Resultados', icon: FileText, accent: 'text-emerald-700' },
];

export const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        if (showMobileMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [showMobileMenu]);

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
                <div className="h-20 flex items-center justify-between">
                    {/* Logo pointing back to main site */}
                    <a href={MAIN_SITE_URL} className="flex items-center gap-2">
                        <div className="relative w-40 h-12">
                            {/* Replicating the classic text logo for now to avoid cross-domain image loading issues */}
                            <span className="text-2xl font-bold text-[#002855] tracking-tight">
                                Bienestar<span className="text-blue-500">Lab</span>
                            </span>
                        </div>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-6">
                        <a href={`${MAIN_SITE_URL}/estudios/analisis-clinicos`} className="text-gray-600 hover:text-green-600 font-medium transition-colors flex items-center gap-2">
                            Estudios
                            <Heart className="text-green-500 animate-pulse" size={20} fill="currentColor" />
                        </a>
                        <a href={`${MAIN_SITE_URL}/paquetes`} className="text-gray-600 hover:text-green-600 font-medium transition-colors">Paquetes</a>
                        <a href={`${MAIN_SITE_URL}/sucursales`} className="text-gray-600 hover:text-green-600 font-medium transition-colors">Sucursales</a>
                        <a href={`${MAIN_SITE_URL}/sintomas`} className="text-gray-600 hover:text-rose-600 font-medium transition-colors flex items-center gap-1.5">
                            <Stethoscope size={16} className="text-rose-500" />Síntomas
                        </a>
                        <a href={`${MAIN_SITE_URL}/enfermedades`} className="text-gray-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1.5">
                            <BookOpen size={16} className="text-blue-600" />Enfermedades
                        </a>
                        <Link href="/" className="text-green-700 font-bold transition-colors flex items-center gap-1.5">
                            Medicamentos
                        </Link>
                        <a href={`${MAIN_SITE_URL}/resultados`} className="bg-green-50 text-green-700 px-4 py-2 rounded-lg font-bold hover:bg-green-100 transition-colors">
                            Resultados
                        </a>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Phone */}
                        <a href="tel:7716854026" className="hidden xl:flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                            <Phone size={18} />
                            <span className="font-medium">771 685 4026</span>
                        </a>

                        <a href={`${MAIN_SITE_URL}/login`} className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors font-medium">
                            <User size={20} />
                            <span className="hidden sm:inline">Iniciar sesión</span>
                        </a>

                        {/* Mobile Menu Toggle */}
                        <button onClick={() => setShowMobileMenu(true)} className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" aria-label="Abrir menú">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ═══════════ MOBILE MENU DRAWER ═══════════ */}
            {showMobileMenu && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm animate-fade-in-fast" onClick={() => setShowMobileMenu(false)} />
                    <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-[70] shadow-2xl animate-slide-in-right overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <span className="text-lg font-bold text-gray-900">Menú</span>
                            <button onClick={() => setShowMobileMenu(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <a href="tel:7716854026" className="flex items-center gap-3 mx-4 mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                <Phone size={18} className="text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-green-900">771 685 4026</p>
                                <p className="text-xs text-green-700">Llámanos ahora</p>
                            </div>
                        </a>

                        <nav className="mt-4 px-4 space-y-1">
                            {mobileNavLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <a key={link.href} href={link.href} onClick={() => setShowMobileMenu(false)} className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors group">
                                        <Icon size={20} className={`${link.accent} group-hover:scale-110 transition-transform`} />
                                        <span className="font-medium">{link.label}</span>
                                    </a>
                                );
                            })}
                        </nav>

                        <div className="mt-6 mx-4 pt-6 border-t border-gray-100">
                            <a href={`${MAIN_SITE_URL}/login`} onClick={() => setShowMobileMenu(false)} className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3.5 rounded-xl font-bold hover:bg-green-700 transition-colors">
                                <User size={20} />
                                Iniciar sesión
                            </a>
                        </div>
                    </div>
                </>
            )}

            <style jsx>{`
                @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.1); } }
                @keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slide-in-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
                .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out; }
                .animate-slide-in-right { animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
            `}</style>
        </header>
    );
};
