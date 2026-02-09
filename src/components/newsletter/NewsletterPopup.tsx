'use client';

import { X, Mail, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if user has already seen/subscribed
        const hasSeenPopup = localStorage.getItem('newsletter_popup_seen');
        const hasSubscribed = localStorage.getItem('newsletter_subscribed');

        if (hasSubscribed) return;

        // Show popup after 30 seconds if not seen yet
        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                localStorage.setItem('newsletter_popup_seen', 'true');
            }, 30000); // 30 seconds

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // TODO: Integrate with your newsletter service (Mailchimp, SendGrid, etc.)
            // For now, just simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Track subscription in analytics
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'newsletter_subscribe', {
                    method: 'popup',
                    email: email
                });
            }

            setIsSubmitted(true);
            localStorage.setItem('newsletter_subscribed', 'true');

            // Close popup after 3 seconds
            setTimeout(() => {
                setIsOpen(false);
            }, 3000);
        } catch (error) {
            console.error('Newsletter subscription error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative animate-slide-up">
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Cerrar"
                >
                    <X size={24} />
                </button>

                {!isSubmitted ? (
                    <div className="p-8">
                        {/* Icon */}
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="text-green-900" size={32} />
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                            ¡Recibe Ofertas Exclusivas!
                        </h2>
                        <p className="text-gray-600 text-center mb-6">
                            Suscríbete a nuestro boletín y recibe descuentos especiales en estudios médicos, consejos de salud y promociones únicas.
                        </p>

                        {/* Benefits */}
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                                <span>20% de descuento en tu próxima visita</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                                <span>Tips de salud semanales</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                                <span>Acceso anticipado a promociones</span>
                            </li>
                        </ul>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Tu nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                            />
                            <input
                                type="email"
                                placeholder="Tu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Suscribiendo...' : 'Suscribirme Gratis'}
                            </button>
                        </form>

                        {/* Privacy note */}
                        <p className="text-xs text-gray-500 text-center mt-4">
                            No compartimos tu información. Puedes darte de baja en cualquier momento.
                        </p>
                    </div>
                ) : (
                    <div className="p-8 text-center">
                        {/* Success Icon */}
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="text-green-600" size={40} />
                        </div>

                        {/* Success Message */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            ¡Bienvenido!
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Te has suscrito exitosamente. Revisa tu email para confirmar tu suscripción y recibir tu descuento del 20%.
                        </p>
                        <p className="text-sm text-gray-500">
                            Este mensaje se cerrará automáticamente...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Inline newsletter form for footer or sidebar
export function NewsletterInline() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // TODO: Integrate with newsletter service
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'newsletter_subscribe', {
                    method: 'inline',
                    email: email
                });
            }

            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 5000);
            setEmail('');
        } catch (error) {
            console.error('Newsletter subscription error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Suscríbete a Nuestro Boletín
            </h3>
            <p className="text-sm text-gray-600 mb-4">
                Recibe ofertas exclusivas y consejos de salud
            </p>

            {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="email"
                        placeholder="Tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors text-sm disabled:opacity-50"
                    >
                        {isLoading ? 'Enviando...' : 'Suscribirme'}
                    </button>
                </form>
            ) : (
                <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle size={20} />
                    <span className="text-sm font-medium">¡Suscripción exitosa!</span>
                </div>
            )}

            <p className="text-xs text-gray-500 mt-3">
                Sin spam. Date de baja cuando quieras.
            </p>
        </div>
    );
}
