import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Users, Zap, Search, Activity, Clock, MapPin, Globe, CheckCircle2, XCircle } from 'lucide-react';
import { neon } from '@neondatabase/serverless';

export const runtime = 'edge';

export const metadata: Metadata = {
    title: 'Visitantes | Inteligencia | Tilde Admin',,
    alternates: {
        canonical: 'https://laboratorio.delbienestar.com.mx/admin/visitantes',
    },
};

// Interfaces
interface VisitorRow {
    id: number;
    session_id: string;
    visit_count: number;
    last_visit: Date;
    from_competitor: boolean;
    competitor_name: string | null;
    device_type: string;
    traffic_source: string;
    conversion: boolean;
    raw_data: any;
}

export default async function VisitorsDashboardPage() {
    let visitors: VisitorRow[] = [];
    let errorMsg = null;
    let metrics = {
        totalVisitors: 0,
        fromCompetitors: 0,
        conversions: 0,
        mobileUsers: 0,
    };

    try {
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) throw new Error('DATABASE_URL not set');
        const sql = neon(connectionString);
        const rows = await sql`
            SELECT * FROM user_behavior
            ORDER BY last_visit DESC
            LIMIT 100
        `;
        visitors = rows as VisitorRow[];
        metrics.totalVisitors = visitors.length;
        metrics.fromCompetitors = visitors.filter(v => v.from_competitor).length;
        metrics.conversions = visitors.filter(v => v.conversion).length;
        metrics.mobileUsers = visitors.filter(v => v.device_type === 'mobile').length;
    } catch (err: any) {
        console.error('Error reading visitor DB:', err);
        errorMsg = err.message?.includes('DATABASE_URL')
            ? 'No hay conexión a la base de datos (DATABASE_URL no encontrada).'
            : 'No se pudieron cargar los datos de la base de datos.';
    }

    // 2. Renderizar UI
    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <Users className="w-6 h-6 text-teal-600" />
                                Inteligencia de Visitantes
                            </h1>
                            <p className="text-sm text-gray-500">
                                Monitoreo en tiempo real de tráfico, espionaje de competencia y sesiones.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-center gap-3">
                        <XCircle className="w-5 h-5" />
                        <p>{errorMsg}</p>
                    </div>
                )}

                {/* Métricas (KPIs) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <MetricCard
                        title="Total Visitantes (Recientes)"
                        value={metrics.totalVisitors}
                        icon={Activity}
                        color="bg-blue-50 text-blue-600"
                    />
                    <MetricCard
                        title="Tráfico de Competencia"
                        value={metrics.fromCompetitors}
                        subtitle={`${Math.round((metrics.fromCompetitors / (metrics.totalVisitors || 1)) * 100)}% del total`}
                        icon={Search}
                        color="bg-purple-50 text-purple-600"
                    />
                    <MetricCard
                        title="Conversiones"
                        value={metrics.conversions}
                        subtitle={`${Math.round((metrics.conversions / (metrics.totalVisitors || 1)) * 100)}% tasa de conv.`}
                        icon={Zap}
                        color="bg-emerald-50 text-emerald-600"
                    />
                    <MetricCard
                        title="Trafico Móvil"
                        value={metrics.mobileUsers}
                        subtitle={`${Math.round((metrics.mobileUsers / (metrics.totalVisitors || 1)) * 100)}% del total`}
                        icon={Globe}
                        color="bg-orange-50 text-orange-600"
                    />
                </div>

                {/* Tabla de Tráfico */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800">Últimas sesiones capturadas</h2>
                        <span className="text-sm text-gray-500">Mostrando top 100</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
                                    <th className="p-4 font-semibold">Visitante / Origen</th>
                                    <th className="p-4 font-semibold">Competencia detectada</th>
                                    <th className="p-4 font-semibold">Actividad</th>
                                    <th className="p-4 font-semibold">Dispositivo</th>
                                    <th className="p-4 font-semibold text-right">Visita</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                                {visitors.length === 0 && !errorMsg ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">
                                            No hay visitantes registrados aún. Las sesiones empezarán a aparecer aquí pronto.
                                        </td>
                                    </tr>
                                ) : (
                                    visitors.map(visitor => {
                                        const raw = visitor.raw_data ?? {};
                                        return (
                                            <tr key={visitor.id} className="hover:bg-gray-50 transition-colors">
                                                {/* Origen */}
                                                <td className="p-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-mono text-xs text-gray-400 mb-1" title={visitor.session_id}>
                                                            ID: {visitor.session_id.substring(0, 8)}...
                                                        </span>
                                                        <span className="font-medium text-gray-900 flex items-center gap-2">
                                                            {visitor.traffic_source === 'direct' ? 'Directo' :
                                                                visitor.traffic_source === 'organic' ? 'Orgánico (Buscador)' :
                                                                    visitor.traffic_source === 'social' ? 'Red Social' : visitor.traffic_source}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Competencia */}
                                                <td className="p-4">
                                                    {visitor.from_competitor ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                                                            ⚠️ {visitor.competitor_name || 'Competidor Desconocido'}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400 text-xs">—</span>
                                                    )}
                                                </td>

                                                {/* Actividad / Estudios vistos */}
                                                <td className="p-4">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-gray-600">
                                                            Visitas: <b>{visitor.visit_count}</b>
                                                        </span>
                                                        {raw.behavior?.studiesViewed && raw.behavior.studiesViewed.length > 0 && (
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                {raw.behavior.studiesViewed.slice(0, 2).map((s: any, idx: number) => (
                                                                    <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded border border-gray-200 truncate max-w-[150px]" title={s.name}>
                                                                        {s.name}
                                                                    </span>
                                                                ))}
                                                                {raw.behavior.studiesViewed.length > 2 && (
                                                                    <span className="text-xs text-gray-400">+{raw.behavior.studiesViewed.length - 2} más</span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Dispositivo */}
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <span className={'px-2 py-1 rounded text-xs font-medium ' + (visitor.device_type === 'mobile' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700')}>
                                                            {visitor.device_type.toUpperCase()}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Tiempo */}
                                                <td className="p-4 text-right text-gray-500 text-sm whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {new Date(visitor.last_visit).toLocaleString('es-MX', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </div>
                                                    {visitor.conversion && (
                                                        <div className="flex items-center justify-end gap-1 mt-1 text-emerald-600 text-xs font-bold">
                                                            <CheckCircle2 className="w-3 h-3" /> Convertido
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

// ─── Componentes Auxiliares ──────────────────────────────────────────────────

function MetricCard({ title, value, subtitle, icon: Icon, color }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
            <div>
                <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
                <div className="flex items-end gap-2">
                    <h3 className="text-3xl font-black text-gray-900">{value}</h3>
                    {subtitle && <span className="text-sm text-gray-400 mb-1">{subtitle}</span>}
                </div>
            </div>
            <div className={`p-3 rounded-xl ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
    );
}
