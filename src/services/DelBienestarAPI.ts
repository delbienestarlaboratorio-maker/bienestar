/**
 * Servicio para comunicarse con el backend Del Bienestar
 * Backend: http://localhost:3000
 */

export interface Estudio {
    id: number;
    nombre: string;
    descripcion: string;
    categoria_id: number;
    categoria: string;
    precio_base: number;
    tiempo_entrega: string;
    preparacion: string;
    imagen_url: string;
    activo: boolean;
}

export interface Sucursal {
    id: number;
    nombre: string;
    direccion: string;
    ciudad: string;
    telefono: string;
    horario_apertura: string;
    horario_cierre: string;
    latitud: number;
    longitud: number;
}

export interface PacienteData {
    nombre: string;
    email: string;
    telefono: string;
    fecha_nacimiento?: string;
}

export interface CitaData {
    paciente: PacienteData;
    sucursal_id: number;
    fecha_hora: string;
    estudios_ids: number[];
    total: number;
}

export interface DisponibilidadResponse {
    fecha: string;
    horarios_disponibles: string[];
}

export class DelBienestarAPI {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_DEL_BIENESTAR_API_URL || 'http://localhost:3000';
    }

    // ==================== ESTUDIOS ====================

    /**
     * Obtiene lista de estudios con filtros opcionales
     */
    async getEstudios(filters?: { categoria?: string; search?: string }): Promise<{ success: boolean; data: Estudio[] }> {
        try {
            const params = new URLSearchParams();
            if (filters?.categoria) params.append('categoria', filters.categoria);
            if (filters?.search) params.append('search', filters.search);

            const url = `${this.baseUrl}/api/laboratorio/estudios${params.toString() ? '?' + params.toString() : ''}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error obteniendo estudios:', error);
            throw error;
        }
    }

    /**
     * Obtiene detalle de un estudio específico
     */
    async getEstudioById(id: string | number): Promise<{ success: boolean; data: Estudio }> {
        try {
            const response = await fetch(`${this.baseUrl}/api/laboratorio/estudios/${id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error obteniendo estudio ${id}:`, error);
            throw error;
        }
    }

    // ==================== CITAS ====================

    /**
     * Crea una nueva cita
     */
    async crearCita(data: CitaData): Promise<{ success: boolean; data: { cita_id: number; confirmacion: string; paciente_id: number } }> {
        try {
            const response = await fetch(`${this.baseUrl}/api/laboratorio/citas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error creando cita:', error);
            throw error;
        }
    }

    /**
     * Consulta horarios disponibles para una sucursal en una fecha
     */
    async getDisponibilidad(sucursal_id: number, fecha: string): Promise<{ success: boolean; data: DisponibilidadResponse }> {
        try {
            const params = new URLSearchParams({
                sucursal_id: sucursal_id.toString(),
                fecha
            });

            const response = await fetch(`${this.baseUrl}/api/laboratorio/citas/disponibilidad?${params.toString()}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error obteniendo disponibilidad:', error);
            throw error;
        }
    }

    // ==================== SUCURSALES ====================

    /**
     * Obtiene lista de todas las sucursales activas
     */
    async getSucursales(): Promise<{ success: boolean; data: Sucursal[] }> {
        try {
            const response = await fetch(`${this.baseUrl}/api/laboratorio/sucursales`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error obteniendo sucursales:', error);
            throw error;
        }
    }

    // ==================== PACIENTES ====================

    /**
     * Registra un nuevo paciente
     */
    async registrarPaciente(data: PacienteData): Promise<{ success: boolean; data: { paciente_id: number } }> {
        try {
            const response = await fetch(`${this.baseUrl}/api/laboratorio/pacientes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error registrando paciente:', error);
            throw error;
        }
    }

    // ==================== UTILIDADES ====================

    /**
     * Verifica si el backend está disponible
     */
    async checkHealth(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/api/health`, {
                method: 'GET',
                signal: AbortSignal.timeout(5000) // 5 segundos timeout
            });
            return response.ok;
        } catch {
            return false;
        }
    }
}

// Exportar instancia singleton
export const delBienestarAPI = new DelBienestarAPI();
