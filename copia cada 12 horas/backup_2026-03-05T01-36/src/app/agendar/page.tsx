import BookingForm from '@/components/appointments/BookingForm';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Agendar Cita - Laboratorio Bienestar',
    description: 'Agenda tu cita para estudios médicos de forma rápida y sencilla. Más de 2,000 estudios disponibles.',
};

export default function AgendarPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-blue-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <Calendar className="mx-auto text-green-600 mb-4" size={56} />
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Agenda tu Cita
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Completa el formulario y nos pondremos en contacto para confirmar tu cita
                    </p>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-md border-2 border-green-100 flex items-center gap-3">
                        <CheckCircle2 className="text-green-600 flex-shrink-0" size={24} />
                        <div>
                            <h3 className="font-bold text-gray-900">Rápida confirmación</h3>
                            <p className="text-sm text-gray-600">En menos de 24 horas</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border-2 border-blue-100 flex items-center gap-3">
                        <Clock className="text-blue-600 flex-shrink-0" size={24} />
                        <div>
                            <h3 className="font-bold text-gray-900">Horarios flexibles</h3>
                            <p className="text-sm text-gray-600">De 8:00 AM a 6:00 PM</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border-2 border-purple-100 flex items-center gap-3">
                        <Calendar className="text-purple-600 flex-shrink-0" size={24} />
                        <div>
                            <h3 className="font-bold text-gray-900">Sin compromiso</h3>
                            <p className="text-sm text-gray-600">Puedes cancelar fácilmente</p>
                        </div>
                    </div>
                </div>

                {/* Booking Form */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100">
                    <BookingForm />
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600 mb-2">
                        ¿Prefieres agendar por teléfono?
                    </p>
                    <a
                        href="tel:+527716854026"
                        className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
                    >
                        📞 Llámanos: 771 685 4026
                    </a>
                    <div className="mt-6">
                        <Link
                            href="/estudios"
                            className="text-green-600 hover:text-green-700 font-semibold"
                        >
                            ← Ver catálogo de estudios
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
