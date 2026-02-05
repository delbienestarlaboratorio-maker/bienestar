'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, Phone, User, ShoppingCart, Heart, LogOut, Settings } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/contexts/CartContext';

export const Header = () => {
    const { itemCount } = useCart();
    const [showSearch, setShowSearch] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { data: session } = useSession();

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
                {/* Main Header Row */}
                <div className="h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative w-40 h-12">
                            <Image
                                src="/images/logo.png"
                                alt="Laboratorio Bienestar"
                                fill
                                sizes="160px"
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-6">
                        <div className="relative">
                            <Link
                                href="/estudios/analisis-clinicos"
                                className="text-gray-600 hover:text-green-600 font-medium transition-colors flex items-center gap-2"
                            >
                                Estudios
                                {/* Pulsing Heart */}
                                <Heart
                                    className="text-green-500 animate-pulse"
                                    size={20}
                                    fill="currentColor"
                                />
                            </Link>
                        </div>
                        <Link href="/paquetes" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Paquetes</Link>
                        <Link href="/sucursales" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Sucursales</Link>
                        <Link href="/promociones" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Promociones</Link>
                        <Link href="/resultados" className="bg-green-50 text-green-700 px-4 py-2 rounded-lg font-bold hover:bg-green-100 transition-colors">
                            Resultados
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search Toggle (Mobile) */}
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <Search size={24} />
                        </button>

                        {/* Phone */}
                        <a
                            href="tel:7716854026"
                            className="hidden xl:flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
                        >
                            <Phone size={18} />
                            <span className="font-medium">771 685 4026</span>
                        </a>

                        {/* Cart Button */}
                        <Link
                            href="/checkout"
                            className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <ShoppingCart size={24} />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

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

                                {/* Dropdown Menu */}
                                {showUserMenu && (
                                    <>
                                        {/* Overlay to close menu when clicking outside */}
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setShowUserMenu(false)}
                                        />

                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fade-in">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-900">{session.user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                                            </div>

                                            <Link
                                                href="/admin"
                                                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <Settings size={18} />
                                                <span>Panel de Admin</span>
                                            </Link>

                                            <button
                                                onClick={() => {
                                                    setShowUserMenu(false);
                                                    signOut({ callbackUrl: '/' });
                                                }}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut size={18} />
                                                <span>Cerrar sesión</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors font-medium"
                            >
                                <User size={20} />
                                <span className="hidden sm:inline">Iniciar sesión</span>
                            </Link>
                        )}

                        {/* Mobile Menu */}
                        <button className="lg:hidden p-2 text-gray-600">
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

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.7;
                        transform: scale(1.1);
                    }
                }
                
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </header>
    );
};
