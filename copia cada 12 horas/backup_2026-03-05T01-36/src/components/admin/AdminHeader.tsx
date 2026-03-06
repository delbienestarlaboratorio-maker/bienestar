'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { LogOut, Settings, User, Users, Home } from 'lucide-react';
import { useState } from 'react';

export function AdminHeader() {
    const { data: session } = useSession();
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo y título */}
                    <div className="flex items-center space-x-4">
                        <Link href="/admin" className="flex items-center space-x-2 hover:opacity-80 transition">
                            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold">
                                LB
                            </div>
                            <span className="text-xl font-bold text-gray-900">Admin Panel</span>
                        </Link>
                    </div>

                    {/* Navegación central */}
                    <nav className="hidden md:flex space-x-1">
                        <Link
                            href="/admin"
                            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-green-700 transition flex items-center space-x-2"
                        >
                            <Home size={18} />
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            href="/admin/users"
                            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-green-700 transition flex items-center space-x-2"
                        >
                            <Users size={18} />
                            <span>Usuarios</span>
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-green-700 transition flex items-center space-x-2"
                        >
                            <Settings size={18} />
                            <span>Configuración</span>
                        </Link>
                    </nav>

                    {/* Usuario y menú */}
                    <div className="flex items-center space-x-4">
                        {session?.user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                                >
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white font-semibold">
                                            {session.user.name?.charAt(0).toUpperCase() || 'A'}
                                        </div>
                                        <div className="text-left hidden sm:block">
                                            <div className="text-sm font-semibold text-gray-900">{session.user.name}</div>
                                            <div className="text-xs text-gray-500">{session.user.email}</div>
                                        </div>
                                    </div>
                                </button>

                                {/* Dropdown menu */}
                                {showUserMenu && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setShowUserMenu(false)}
                                        />
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <div className="text-sm font-semibold text-gray-900">{session.user.name}</div>
                                                <div className="text-xs text-gray-500">{session.user.email}</div>
                                                <div className="text-xs text-green-600 font-medium mt-1">
                                                    {(session.user as any).role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
                                                </div>
                                            </div>

                                            <Link
                                                href="/admin/settings"
                                                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <Settings size={16} />
                                                <span>Configuración</span>
                                            </Link>

                                            <Link
                                                href="/admin/users"
                                                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <Users size={16} />
                                                <span>Gestionar Usuarios</span>
                                            </Link>

                                            <div className="border-t border-gray-100 mt-2 pt-2">
                                                <button
                                                    onClick={() => {
                                                        setShowUserMenu(false);
                                                        signOut({ callbackUrl: '/login' });
                                                    }}
                                                    className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition w-full"
                                                >
                                                    <LogOut size={16} />
                                                    <span>Cerrar Sesión</span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                            >
                                Iniciar Sesión
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
