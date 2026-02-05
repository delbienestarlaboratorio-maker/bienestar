'use client';

import { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface BookingFormProps {
    preselectedStudy?: {
        id: string;
        name: string;
    };
    onSuccess?: () => void;
}

export default function BookingForm({ preselectedStudy, onSuccess }: BookingFormProps) {
    const [formData, setFormData] = useState({
        patientName: '',
        patientEmail: '',
        patientPhone: '',
        studyId: preselectedStudy?.id || '',
        studyName: preselectedStudy?.name || '',
        preferredDate: '',
        preferredTime: '',
        notes: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');

    const timeSlots = [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
        '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
        '17:00', '17:30', '18:00'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al agendar la cita');
            }

            setShowSuccess(true);
            if (onSuccess) onSuccess();

            // Reset form
            setTimeout(() => {
                setFormData({
                    patientName: '',
                    patientEmail: '',
                    patientPhone: '',
                    studyId: preselectedStudy?.id || '',
                    studyName: preselectedStudy?.name || '',
                    preferredDate: '',
                    preferredTime: '',
                    notes: ''
                });
                setShowSuccess(false);
            }, 5000);

        } catch (err: any) {
            setError(err.message || 'Error al agendar la cita');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Success message
    if (showSuccess) {
        return (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                <CheckCircle2 className="mx-auto text-green-600 mb-4" size={64} />
                <h3 className="text-2xl font-bold text-green-900 mb-2">
                    ¡Cita Agendada Exitosamente!
                </h3>
                <p className="text-green-700 mb-4">
                    Hemos recibido tu solicitud de cita. Te contactaremos pronto para confirmar.
                </p>
                <div className="bg-white rounded-xl p-4 text-left">
                    <p className="text-sm text-gray-600 mb-1"><strong>Estudio:</strong> {formData.studyName}</p>
                    <p className="text-sm text-gray-600 mb-1"><strong>Fecha:</strong> {formData.preferredDate}</p>
                    <p className="text-sm text-gray-600"><strong>Hora:</strong> {formData.preferredTime}</p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-red-800 text-sm">{error}</p>
                </div>
            )}

            {/* Información del Paciente */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100">
                <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <User size={20} />
                    Información del Paciente
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nombre Completo *
                        </label>
                        <input
                            type="text"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                            placeholder="Juan Pérez García"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                                <Mail size={16} />
                                Email *
                            </label>
                            <input
                                type="email"
                                name="patientEmail"
                                value={formData.patientEmail}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                                placeholder="ejemplo@mail.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                                <Phone size={16} />
                                Teléfono *
                            </label>
                            <input
                                type="tel"
                                name="patientPhone"
                                value={formData.patientPhone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                                placeholder="5512345678"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Selección de Estudio */}
            {!preselectedStudy && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">
                    <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                        <FileText size={20} />
                        Estudio Médico
                    </h3>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nombre del Estudio *
                        </label>
                        <input
                            type="text"
                            name="studyName"
                            value={formData.studyName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                            placeholder="Ej: Biometría Hemática, Química Sanguínea..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Escribe el nombre del estudio que deseas realizar
                        </p>
                    </div>
                </div>
            )}

            {/* Fecha y Hora */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
                <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
                    <Calendar size={20} />
                    Fecha y Hora Preferida
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Fecha *
                        </label>
                        <input
                            type="date"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                            <Clock size={16} />
                            Hora *
                        </label>
                        <select
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                        >
                            <option value="">Selecciona una hora</option>
                            {timeSlots.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Notas Adicionales */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notas Adicionales (Opcional)
                </label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    placeholder="¿Alguna indicación especial? ¿Alergias? ¿Medicamentos?"
                />
            </div>

            {/* Botón de Envío */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Agendando...
                    </>
                ) : (
                    <>
                        <Calendar size={20} />
                        Agendar Cita
                    </>
                )}
            </button>

            <p className="text-xs text-gray-500 text-center">
                * Campos obligatorios. Nos pondremos en contacto para confirmar tu cita.
            </p>
        </form>
    );
}
