import Link from 'next/link';
import { Facebook, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                {/* Brand */}
                <div className="col-span-1 md:col-span-1">
                    <Link href="/" className="flex items-center gap-2 mb-6">
                        <span className="text-2xl font-bold text-white tracking-tight">
                            Bienestar<span className="text-blue-400">Lab</span>
                        </span>
                    </Link>
                    <p className="text-sm leading-relaxed mb-6">
                        Líderes en diagnósticos clínicos con tecnología de vanguardia y atención personalizada. Tu salud es nuestra prioridad.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://facebook.com/diagnosticosclinicosbienestar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook"><Facebook size={20} /></a>
                        <a href="https://wa.me/527716854026" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="WhatsApp"><MessageCircle size={20} /></a>
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-white font-bold mb-6">Enlaces Rápidos</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="/estudios" className="hover:text-white transition-colors">Todos los Estudios</Link></li>
                        <li><Link href="/check-ups" className="hover:text-white transition-colors">Check-ups</Link></li>
                        <li><Link href="/sucursales" className="hover:text-white transition-colors">Nuestras Sucursales</Link></li>
                        <li><Link href="/blog" className="hover:text-white transition-colors">Blog de Salud</Link></li>
                        <li><Link href="/nosotros" className="hover:text-white transition-colors">Nosotros</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="text-white font-bold mb-6">Atención al Cliente</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="/faq" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
                        <li><Link href="/facturacion" className="hover:text-white transition-colors">Facturación</Link></li>
                        <li><Link href="/privacidad" className="hover:text-white transition-colors">Aviso de Privacidad</Link></li>
                        <li><Link href="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-white font-bold mb-6">Contacto</h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex gap-3">
                            <MapPin size={18} className="text-blue-400 shrink-0" />
                            <span>Ignacio Galvan 10 interior 11 Plaza Bonanza, Tizayuca Hidalgo (Junto a BBVA)</span>
                        </li>
                        <li className="flex gap-3">
                            <Phone size={18} className="text-blue-400 shrink-0" />
                            <a href="https://wa.me/527716854026" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                771 685 4026 (WhatsApp)
                            </a>
                        </li>
                        <li className="flex gap-3">
                            <Mail size={18} className="text-blue-400 shrink-0" />
                            <a href="mailto:contacto@delbienestar.com.mx" className="hover:text-white transition-colors">
                                contacto@delbienestar.com.mx
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 pt-8 border-t border-gray-800 text-center text-xs">
                <p suppressHydrationWarning>&copy; {new Date().getFullYear()} Laboratorio Clínico Bienestar. Todos los derechos reservados.</p>
                {/* Honeypot link para defensa contra scrapers/bots */}
                <a href="/api/trap" style={{ display: 'none' }} aria-hidden="true" rel="nofollow">Legal Policy</a>
            </div>
        </footer>
    );
};
