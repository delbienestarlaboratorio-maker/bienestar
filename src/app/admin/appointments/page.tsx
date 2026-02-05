'use client';

import { useEffect, useState } from 'react';
import { Calendar, CheckCircle2, XCircle, Clock, Filter, Search, Eye } from 'lucide-react';
import Link from 'next/link';

interface Appointment {
    id: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    studyName: string;
    preferredDate: string;
    preferredTime: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    createdAt: string;
    notes?: string;
}

export default function AppointmentsAdminPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, [filter]);

    const fetchAppointments = async () => {
        setIsLoading(true);
        try {
            const url = filter === 'all'
                ? '/api/appointments'
                : `/api/appointments?status=${filter}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                setAppointments(data.appointments);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const response = await fetch(`/api/appointments/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                fetchAppointments();
            }
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            confirmed: 'bg-green-100 text-green-800 border-green-300',
            completed: 'bg-blue-100 text-blue-800 border-blue-300',
            cancelled: 'bg-red-100 text-red-800 border-red-300'
        };

        const labels = {
            pending: 'Pendiente',
            confirmed: 'Confirmada',
            completed: 'Completada',
            cancelled: 'Cancelada'
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${styles[status as keyof typeof styles]}`}>
                {labels[status as keyof typeof labels]}
            </span>
        );
    };

    const filteredAppointments = appointments.filter(apt =>
        apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.studyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        total: appointments.length,
        pending: appointments.filter(a => a.status === 'pending').length,
        confirmed: appointments.filter(a => a.status === 'confirmed').length,
        today: appointments.filter(a => {
            const aptDate = new Date(a.preferredDate).toDateString();
            const today = new Date().toDateString();
            return aptDate === today;
        }).length
    };

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                        <Calendar size={32} />
                        Gestión de Citas
                    </h1>
                    <p className="text-gray-600">
                        Administra todas las citas médicas agendadas
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
                        <div className="text-3xl font-bold text-blue-900">{stats.total}</div>
                        <div className="text-blue-700 text-sm mt-1">Total de Citas</div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border-2 border-yellow-200">
                        <div className="text-3xl font-bold text-yellow-900">{stats.pending}</div>
                        <div className="text-yellow-700 text-sm mt-1">Pendientes</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
                        <div className="text-3xl font-bold text-green-900">{stats.confirmed}</div>
                        <div className="text-green-700 text-sm mt-1">Confirmadas</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
                        <div className="text-3xl font-bold text-purple-900">{stats.today}</div>
                        <div className="text-purple-700 text-sm mt-1">Hoy</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Buscar por paciente o estudio..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <Filter size={20} className="text-gray-600" />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white min-w-[150px]"
                            >
                                <option value="all">Todas</option>
                                <option value="pending">Pendientes</option>
                                <option value="confirmed">Confirmadas</option>
                                <option value="completed">Completadas</option>
                                <option value="cancelled">Canceladas</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
                    {isLoading ? (
                        <div className="p-12 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Cargando citas...</p>
                        </div>
                    ) : filteredAppointments.length === 0 ? (
                        <div className="p-12 text-center">
                            <Calendar className="mx-auto text-gray-300 mb-4" size={64} />
                            <p className="text-gray-600 text-lg font-semibold">No hay citas</p>
                            <p className="text-gray-400">No se encontraron citas con los filtros seleccionados</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Paciente
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Estudio
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Fecha
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Hora
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Estado
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredAppointments.map((appointment) => (
                                        <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-900">{appointment.patientName}</div>
                                                <div className="text-xs text-gray-500">{appointment.patientPhone}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{appointment.studyName}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    {new Date(appointment.preferredDate).toLocaleDateString('es-MX')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{appointment.preferredTime}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(appointment.status)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {appointment.status === 'pending' && (
                                                        <button
                                                            onClick={() => updateStatus(appointment.id, 'confirmed')}
                                                            className="p-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-colors"
                                                            title="Confirmar"
                                                        >
                                                            <CheckCircle2 size={18} />
                                                        </button>
                                                    )}
                                                    {appointment.status !== 'cancelled' && (
                                                        <button
                                                            onClick={() => updateStatus(appointment.id, 'cancelled')}
                                                            className="p-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors"
                                                            title="Cancelar"
                                                        >
                                                            <XCircle size={18} />
                                                        </button>
                                                    )}
                                                    <Link
                                                        href={`/admin/appointments/${appointment.id}`}
                                                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors"
                                                        title="Ver detalle"
                                                    >
                                                        <Eye size={18} />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
