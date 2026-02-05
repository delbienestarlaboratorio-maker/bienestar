/**
 * Cliente de Auto-Documentación para Laboratorio Bienestar
 * 
 * Este módulo permite registrar automáticamente toda la actividad
 * de la aplicación para documentación y backup.
 */

const AUTO_DOC_URL = process.env.NEXT_PUBLIC_AUTO_DOC_URL || 'http://localhost:30210';

class AutoDocClient {
    private enabled: boolean;
    private sessionId: string | null = null;

    constructor() {
        this.enabled = process.env.NODE_ENV !== 'test';
    }

    /**
     * Iniciar una nueva sesión de usuario
     */
    async startSession(userId?: string, metadata?: Record<string, any>): Promise<void> {
        if (!this.enabled || typeof window === 'undefined') return;

        try {
            this.sessionId = `${userId || 'anonymous'}-${Date.now()}`;

            await fetch(`${AUTO_DOC_URL}/api/session/start`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    userId: userId || 'anonymous',
                    page: window.location.pathname,
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString(),
                    ...metadata
                })
            });
        } catch (error) {
            // Silenciosamente fallar para no interrumpir la app
            console.debug('AutoDoc error (session):', error);
        }
    }

    /**
     * Registrar una llamada a API
     */
    async logApiCall(
        endpoint: string,
        method: string,
        status: number,
        duration?: number,
        metadata?: Record<string, any>
    ): Promise<void> {
        if (!this.enabled) return;

        try {
            await fetch(`${AUTO_DOC_URL}/api/log/api-call`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    endpoint,
                    method,
                    status,
                    duration,
                    timestamp: new Date().toISOString(),
                    ...metadata
                })
            });
        } catch (error) {
            console.debug('AutoDoc error (api-call):', error);
        }
    }

    /**
     * Registrar un error
     */
    async logError(
        error: Error | string,
        severity: 'error' | 'warning' | 'critical' = 'error',
        metadata?: Record<string, any>
    ): Promise<void> {
        if (!this.enabled || typeof window === 'undefined') return;

        try {
            const errorData = typeof error === 'string'
                ? { message: error, stack: undefined }
                : { message: error.message, stack: error.stack };

            await fetch(`${AUTO_DOC_URL}/api/log/error`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    ...errorData,
                    severity,
                    page: window.location.pathname,
                    timestamp: new Date().toISOString(),
                    ...metadata
                })
            });
        } catch (err) {
            console.debug('AutoDoc error (error):', err);
        }
    }

    /**
     * Registrar un evento de analytics
     */
    async logAnalytics(
        event: string,
        metadata?: Record<string, any>
    ): Promise<void> {
        if (!this.enabled || typeof window === 'undefined') return;

        try {
            await fetch(`${AUTO_DOC_URL}/api/log/analytics`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    event,
                    page: window.location.pathname,
                    timestamp: new Date().toISOString(),
                    ...metadata
                })
            });
        } catch (error) {
            console.debug('AutoDoc error (analytics):', error);
        }
    }

    /**
     * Registrar una interacción de usuario
     */
    async logInteraction(
        action: string,
        element: string,
        metadata?: Record<string, any>
    ): Promise<void> {
        if (!this.enabled || typeof window === 'undefined') return;

        try {
            await fetch(`${AUTO_DOC_URL}/api/log/interaction`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    action,
                    element,
                    page: window.location.pathname,
                    timestamp: new Date().toISOString(),
                    ...metadata
                })
            });
        } catch (error) {
            console.debug('AutoDoc error (interaction):', error);
        }
    }

    /**
     * Forzar un backup inmediato
     */
    async forceBackup(): Promise<{ success: boolean; filename?: string; error?: string }> {
        if (!this.enabled) return { success: false, error: 'AutoDoc disabled' };

        try {
            const response = await fetch(`${AUTO_DOC_URL}/api/backup/now`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            return await response.json();
        } catch (error) {
            console.debug('AutoDoc error (backup):', error);
            return { success: false, error: (error as Error).message };
        }
    }

    /**
     * Obtener estadísticas del servicio
     */
    async getStats(): Promise<any> {
        if (!this.enabled) return null;

        try {
            const response = await fetch(`${AUTO_DOC_URL}/api/stats`);
            return await response.json();
        } catch (error) {
            console.debug('AutoDoc error (stats):', error);
            return null;
        }
    }
}

// Exportar instancia singleton
export const autoDoc = new AutoDocClient();

// Exportar también la clase para testing
export { AutoDocClient };
