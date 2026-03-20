'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, Phone, User, Heart, LogOut, Settings, X, TestTube, MapPin, Tag, FileText, Gift, HelpCircle, BookOpen, Info, Calculator, Stethoscope, Activity } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { CartBadge } from '@/components/cart/CartBadge';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/contexts/CartContext';

const mobileNavLinks = [
    { href: '/estudios/analisis-clinicos', label: 'Estudios', icon: TestTube, accent: 'text-green-600' },
    { href: '/paquetes', label: 'Paquetes', icon: Gift, accent: 'text-blue-600' },
    { href: '/check-ups', label: 'Check-Ups', icon: Heart, accent: 'text-pink-600' },
    { href: '/sintomas', label: 'Síntomas A-Z', icon: Stethoscope, accent: 'text-rose-600' },
    { href: '/enfermedades', label: 'Enfermedades CIE-10', icon: BookOpen, accent: 'text-blue-700' },
    { href: '/valores-clinicos', label: 'Biomarcadores', icon: Activity, accent: 'text-indigo-600' },
    { href: '/sucursales', label: 'Sucursales', icon: MapPin, accent: 'text-purple-600' },
    { href: '/promociones', label: 'Promociones', icon: Tag, accent: 'text-orange-600' },
    { href: '/nosotros', label: 'Nosotros', icon: Info, accent: 'text-cyan-600' },
    { href: '/herramientas', label: 'Herramientas de Salud', icon: Calculator, accent: 'text-teal-600' },
    { href: '/precios', label: 'Precios de Estudios', icon: Tag, accent: 'text-green-600' },
    { href: '/blog', label: 'Blog de Salud', icon: BookOpen, accent: 'text-indigo-600' },
    { href: '/faq', label: 'Preguntas Frecuentes', icon: HelpCircle, accent: 'text-amber-600' },
    { href: '/resultados', label: 'Resultados', icon: FileText, accent: 'text-emerald-700' },
];

export const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { data: session } = useSession();

    // Lock body scroll when mobile menu is open
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
            <div className="max-w-7xl mx-auto px-4 overflow-hidden">
                {/* Main Header Row */}
                <div className="h-20 flex items-center justify-between gap-2">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="relative w-32 lg:w-36 h-12">
                            <Image
                                src="/images/logo.png"
                                alt="Laboratorio Bienestar"
                                fill
                                sizes="144px"
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-shrink min-w-0">
                        <Link
                            href="/estudios/analisis-clinicos"
                            className="text-gray-600 hover:text-green-600 text-sm font-medium transition-colors flex items-center gap-1 whitespace-nowrap"
                        >
                            Estudios
                            <Heart className="text-green-500 animate-pulse" size={14} fill="currentColor" />
                        </Link>
                        <Link href="/paquetes" className="text-gray-600 hover:text-green-600 text-sm font-medium transition-colors whitespace-nowrap">Paquetes</Link>
                        <Link href="/sucursales" className="text-gray-600 hover:text-green-600 text-sm font-medium transition-colors whitespace-nowrap">Sucursales</Link>
                        <Link href="/sintomas" className="text-gray-600 hover:text-rose-600 text-sm font-medium transition-colors whitespace-nowrap">
                            Síntomas
                        </Link>
                        <Link href="/enfermedades" className="text-gray-600 hover:text-blue-700 text-sm font-medium transition-colors whitespace-nowrap">
                            Enfermedades
                        </Link>
                        <Link href="/valores-clinicos" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors whitespace-nowrap">
                            Biomarcadores
                        </Link>
                        <Link href="/herramientas" className="hidden xl:block text-gray-600 hover:text-green-600 text-sm font-medium transition-colors whitespace-nowrap">Herramientas</Link>
                        <Link href="/precios" className="text-gray-600 hover:text-green-600 text-sm font-medium transition-colors whitespace-nowrap">
                            Precios
                        </Link>
                        <Link href="/nosotros" className="hidden xl:block text-gray-600 hover:text-green-600 text-sm font-medium transition-colors whitespace-nowrap">Nosotros</Link>
                        <Link href="/promociones" className="hidden xl:block text-gray-600 hover:text-green-600 text-sm font-medium transition-colors whitespace-nowrap">Promociones</Link>
                        <Link href="/resultados" className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-green-100 transition-colors whitespace-nowrap">
                            Resultados
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search Toggle (Mobile) */}
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            aria-label="Buscar"
                        >
                            <Search size={24} />
                        </button>

                        {/* Phone */}
                        <a
                            href="tel:7716854026"
                            className="hidden xl:flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors whitespace-nowrap flex-shrink-0"
                        >
                            <Phone size={16} />
                            <span className="font-medium text-sm">771 685 4026</span>
                        </a>

                        {/* Cart Badge */}
                        <CartBadge />

                        {/* User Menu - Dynamic */}
                        {session?.user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-50 rounded-lg transition-colors font-medium"
                                >
                                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
                                        {session.user.name?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <span className="hidden sm:inline">{session.user.name}</span>
                                </button>

                                {showUserMenu && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fade-in">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-900">{session.user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                                            </div>
                                            <Link href="/admin" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setShowUserMenu(false)}>
                                                <Settings size={18} /><span>Panel de Admin</span>
                                            </Link>
                                            <button onClick={() => { setShowUserMenu(false); signOut({ callbackUrl: '/' }); }} className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">
                                                <LogOut size={18} /><span>Cerrar sesión</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <Link href="/login" className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors font-medium">
                                <User size={20} />
                                <span className="hidden sm:inline">Iniciar sesión</span>
                            </Link>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setShowMobileMenu(true)}
                            className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            aria-label="Abrir menú"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>

                {/* Desktop Search Bar Row */}
                <div className="hidden lg:block pb-4">
                    <SearchBar showCategoryFilter={true} />
                </div>

                {/* Mobile Search Bar (Collapsible) */}
                {showSearch && (
                    <div className="lg:hidden pb-4 animate-fade-in">
                        <SearchBar />
                    </div>
                )}
            </div>

            {/* ═══════════ MOBILE MENU DRAWER ═══════════ */}
            {showMobileMenu && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm animate-fade-in-fast"
                        onClick={() => setShowMobileMenu(false)}
                    />

                    {/* Drawer */}
                    <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-[70] shadow-2xl animate-slide-in-right overflow-y-auto">
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <span className="text-lg font-bold text-gray-900">Menú</span>
                            <button
                                onClick={() => setShowMobileMenu(false)}
                                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Cerrar menú"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Phone CTA */}
                        <a
                            href="tel:7716854026"
                            className="flex items-center gap-3 mx-4 mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100"
                        >
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                <Phone size={18} className="text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-green-900">771 685 4026</p>
                                <p className="text-xs text-green-700">Llámanos ahora</p>
                            </div>
                        </a>

                        {/* Nav Links */}
                        <nav className="mt-4 px-4 space-y-1">
                            {mobileNavLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setShowMobileMenu(false)}
                                        className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors group"
                                    >
                                        <Icon size={20} className={`${link.accent} group-hover:scale-110 transition-transform`} />
                                        <span className="font-medium">{link.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* User Section */}
                        <div className="mt-6 mx-4 pt-6 border-t border-gray-100">
                            {session?.user ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 px-4 py-2">
                                        <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
                                            {session.user.name?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{session.user.name}</p>
                                            <p className="text-xs text-gray-500">{session.user.email}</p>
                                        </div>
                                    </div>
                                    <Link href="/admin" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                                        <Settings size={18} /><span>Panel de Admin</span>
                                    </Link>
                                    <button onClick={() => { setShowMobileMenu(false); signOut({ callbackUrl: '/' }); }} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                                        <LogOut size={18} /><span>Cerrar sesión</span>
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setShowMobileMenu(false)}
                                    className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3.5 rounded-xl font-bold hover:bg-green-700 transition-colors"
                                >
                                    <User size={20} />
                                    Iniciar sesión
                                </Link>
                            )}
                        </div>

                        {/* WhatsApp CTA */}
                        <div className="mx-4 mt-4 mb-8">
                            <a
                                href="https://wa.me/527716854026?text=Hola,%20necesito%20información"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3.5 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
                            >
                                💬 WhatsApp
                            </a>
                        </div>
                    </div>
                </>
            )}

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.1); }
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-fast {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slide-in-right {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                .animate-fade-in { animation: fade-in 0.3s ease-out; }
                .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out; }
                .animate-slide-in-right { animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
            `}</style>
        </header>
    );
};
