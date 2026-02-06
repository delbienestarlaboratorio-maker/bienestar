'use client';

import { useState } from 'react';
import { regimenFiscal, usoCFDI, type InvoiceRequest } from '@/data/sat-catalogs';
import { validateRFC, validateCodigoPostal, validateEmail, formatRFC } from '@/lib/validation/rfc';
import { FileText, Check, AlertCircle } from 'lucide-react';

export const InvoiceForm = () => {
    const [formData, setFormData] = useState<Partial<InvoiceRequest>>({
        rfc: '',
        razonSocial: '',
        codigoPostal: '',
        regimenFiscal: '',
        usoCFDI: 'D01',
        email: '',
        folio: '',
        monto: undefined,
        fechaServicio: '',
        telefono: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (field: keyof InvoiceRequest, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Limpiar error del campo
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        // RFC
        const rfcValidation = validateRFC(formData.rfc || '');
        if (!rfcValidation.valid) {
            newErrors.rfc = rfcValidation.message || 'RFC inválido';
        }

        // Razón Social
        if (!formData.razonSocial?.trim()) {
            newErrors.razonSocial = 'La razón social es requerida';
        }

        // Código Postal
        const cpValidation = validateCodigoPostal(formData.codigoPostal || '');
        if (!cpValidation.valid) {
            newErrors.codigoPostal = cpValidation.message || 'Código postal inválido';
        }

        // Régimen Fiscal
        if (!formData.regimenFiscal) {
            newErrors.regimenFiscal = 'Selecciona un régimen fiscal';
        }

        // Uso CFDI
        if (!formData.usoCFDI) {
            newErrors.usoCFDI = 'Selecciona el uso de CFDI';
        }

        // Email
        const emailValidation = validateEmail(formData.email || '');
        if (!emailValidation.valid) {
            newErrors.email = emailValidation.message || 'Email inválido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/facturacion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    createdAt: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar solicitud');
            }

            setSubmitStatus('success');

            // Limpiar formulario
            setFormData({
                rfc: '',
                razonSocial: '',
                codigoPostal: '',
                regimenFiscal: '',
                usoCFDI: 'D01',
                email: '',
                folio: '',
                monto: undefined,
                fechaServicio: '',
                telefono: '',
            });

        } catch (error) {
            console.error('Error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
            {/* Mensaje de éxito */}
            {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                        <h4 className="font-semibold text-green-900">¡Solicitud enviada!</h4>
                        <p className="text-sm text-green-700 mt-1">
                            Recibirás tu factura electrónica en tu correo en las próximas 24-48 horas hábiles.
                        </p>
                    </div>
                </div>
            )}

            {/* Mensaje de error */}
            {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                        <h4 className="font-semibold text-red-900">Error al enviar solicitud</h4>
                        <p className="text-sm text-red-700 mt-1">
                            Por favor, intenta nuevamente o contáctanos por WhatsApp.
                        </p>
                    </div>
                </div>
            )}

            {/* Paso 1: Datos Fiscales */}
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-green-900 text-white flex items-center justify-center font-bold">
                        1
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Datos Fiscales</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {/* RFC */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            RFC <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.rfc || ''}
                            onChange={(e) => handleChange('rfc', e.target.value.toUpperCase())}
                            onBlur={() => formData.rfc && setFormData(prev => ({ ...prev, rfc: formatRFC(prev.rfc || '') }))}
                            placeholder="AAAA010101XXX"
                            maxLength={16}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.rfc ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                                }`}
                        />
                        {errors.rfc && (
                            <p className="mt-1 text-sm text-red-600">{errors.rfc}</p>
                        )}
                    </div>

                    {/* Razón Social */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Razón Social o Nombre Completo <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.razonSocial || ''}
                            onChange={(e) => handleChange('razonSocial', e.target.value)}
                            placeholder="Juan Pérez García o Empresa S.A. de C.V."
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.razonSocial ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                                }`}
                        />
                        {errors.razonSocial && (
                            <p className="mt-1 text-sm text-red-600">{errors.razonSocial}</p>
                        )}
                    </div>

                    {/* Código Postal */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Código Postal <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.codigoPostal || ''}
                            onChange={(e) => handleChange('codigoPostal', e.target.value.replace(/\D/g, '').slice(0, 5))}
                            placeholder="42000"
                            maxLength={5}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.codigoPostal ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                                }`}
                        />
                        {errors.codigoPostal && (
                            <p className="mt-1 text-sm text-red-600">{errors.codigoPostal}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={formData.email || ''}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="correo@ejemplo.com"
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                                }`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    {/* Régimen Fiscal */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Régimen Fiscal <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.regimenFiscal || ''}
                            onChange={(e) => handleChange('regimenFiscal', e.target.value)}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.regimenFiscal ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                                }`}
                        >
                            <option value="">Selecciona tu régimen fiscal</option>
                            {regimenFiscal.map(regimen => (
                                <option key={regimen.value} value={regimen.value}>
                                    {regimen.label}
                                </option>
                            ))}
                        </select>
                        {errors.regimenFiscal && (
                            <p className="mt-1 text-sm text-red-600">{errors.regimenFiscal}</p>
                        )}
                    </div>

                    {/* Uso CFDI */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Uso de CFDI <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.usoCFDI || ''}
                            onChange={(e) => handleChange('usoCFDI', e.target.value)}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.usoCFDI ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                                }`}
                        >
                            <option value="">Selecciona el uso de CFDI</option>
                            {usoCFDI.map(uso => (
                                <option key={uso.value} value={uso.value}>
                                    {uso.label}
                                </option>
                            ))}
                        </select>
                        {errors.usoCFDI && (
                            <p className="mt-1 text-sm text-red-600">{errors.usoCFDI}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Paso 2: Datos del Servicio */}
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-green-900 text-white flex items-center justify-center font-bold">
                        2
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Datos del Servicio</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {/* Folio */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Número de Folio
                        </label>
                        <input
                            type="text"
                            value={formData.folio || ''}
                            onChange={(e) => handleChange('folio', e.target.value)}
                            placeholder="LAB-2026-001"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                        />
                        <p className="text-xs text-gray-500 mt-1">Opcional: Si tienes tu número de folio</p>
                    </div>

                    {/* Monto */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Monto (MXN)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={formData.monto || ''}
                            onChange={(e) => handleChange('monto', parseFloat(e.target.value) || 0)}
                            placeholder="450.00"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                        />
                        <p className="text-xs text-gray-500 mt-1">Opcional: Monto del servicio</p>
                    </div>

                    {/* Fecha del Servicio */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Fecha del Servicio
                        </label>
                        <input
                            type="date"
                            value={formData.fechaServicio || ''}
                            onChange={(e) => handleChange('fechaServicio', e.target.value)}
                            max={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Teléfono */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Teléfono de Contacto
                        </label>
                        <input
                            type="tel"
                            value={formData.telefono || ''}
                            onChange={(e) => handleChange('telefono', e.target.value.replace(/\D/g, '').slice(0, 10))}
                            placeholder="7751234567"
                            maxLength={10}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Botón Submit */}
            <div className="flex justify-center">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-green-900 text-white font-bold text-lg rounded-xl hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg"
                >
                    <FileText size={24} />
                    {isSubmitting ? 'Enviando...' : 'Solicitar Factura'}
                </button>
            </div>

            {/* Aviso */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
                <p className="font-semibold mb-2">📌 Importante:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                    <li>Las facturas se emiten de acuerdo al artículo 29-A del Código Fiscal de la Federación</li>
                    <li>Recibirás tu factura electrónica (CFDI 4.0) por correo en 24-48 horas hábiles</li>
                    <li>Conserva tu correo de confirmación</li>
                    <li>Solo se pueden facturar servicios del mes en curso</li>
                </ul>
            </div>
        </form>
    );
};
