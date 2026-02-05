import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

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
                        <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
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
                            <span>Av. Insurgentes Sur 1234, Ciudad de México</span>
                        </li>
                        <li className="flex gap-3">
                            <Phone size={18} className="text-blue-400 shrink-0" />
                            <span>55 1234 5678</span>
                        </li>
                        <li className="flex gap-3">
                            <Mail size={18} className="text-blue-400 shrink-0" />
                            <span>contacto@bienestarlab.com.mx</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 pt-8 border-t border-gray-800 text-center text-xs">
                <p>&copy; {new Date().getFullYear()} Laboratorio Clínico Bienestar. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};
