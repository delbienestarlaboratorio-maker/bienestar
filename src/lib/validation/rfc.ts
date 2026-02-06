// Validación de RFC (Registro Federal de Contribuyentes)

/**
 * Valida el formato de un RFC mexicano
 * Persona Física: 13 caracteres (AABB010101XXX)
 * Persona Moral: 12 caracteres (AAA010101XXX)
 */
export function validateRFC(rfc: string): { valid: boolean; message?: string } {
    if (!rfc) {
        return { valid: false, message: 'El RFC es requerido' };
    }

    // Eliminar espacios y convertir a mayúsculas
    const cleanRFC = rfc.trim().toUpperCase().replace(/\s/g, '');

    // Validar longitud (12 o 13 caracteres)
    if (cleanRFC.length !== 12 && cleanRFC.length !== 13) {
        return {
            valid: false,
            message: 'El RFC debe tener 12 caracteres (persona moral) o 13 (persona física)'
        };
    }

    // Regex para RFC
    // Persona Moral: AAA010101XXX (3 letras + 6 dígitos + 3 alfanuméricos)
    // Persona Física: AAAA010101XXX (4 letras + 6 dígitos + 3 alfanuméricos)
    const regexPersonaMoral = /^[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}$/;
    const regexPersonaFisica = /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/;

    const isValid = cleanRFC.length === 12
        ? regexPersonaMoral.test(cleanRFC)
        : regexPersonaFisica.test(cleanRFC);

    if (!isValid) {
        return {
            valid: false,
            message: 'El formato del RFC no es válido'
        };
    }

    // Validar homoclave (últimos 3 caracteres)
    const homoclave = cleanRFC.slice(-3);
    if (!/^[A-Z0-9]{3}$/.test(homoclave)) {
        return {
            valid: false,
            message: 'La homoclave del RFC no es válida'
        };
    }

    return { valid: true };
}

/**
 * Formatea un RFC para mostrar (con espacios)
 */
export function formatRFC(rfc: string): string {
    const clean = rfc.trim().toUpperCase().replace(/\s/g, '');

    if (clean.length === 12) {
        // Persona Moral: AAA 010101 XXX
        return `${clean.slice(0, 3)} ${clean.slice(3, 9)} ${clean.slice(9)}`;
    } else if (clean.length === 13) {
        // Persona Física: AAAA 010101 XXX
        return `${clean.slice(0, 4)} ${clean.slice(4, 10)} ${clean.slice(10)}`;
    }

    return clean;
}

/**
 * Valida código postal mexicano (5 dígitos)
 */
export function validateCodigoPostal(cp: string): { valid: boolean; message?: string } {
    if (!cp) {
        return { valid: false, message: 'El código postal es requerido' };
    }

    const cleanCP = cp.trim();

    if (!/^\d{5}$/.test(cleanCP)) {
        return {
            valid: false,
            message: 'El código postal debe tener 5 dígitos'
        };
    }

    return { valid: true };
}

/**
 * Valida email
 */
export function validateEmail(email: string): { valid: boolean; message?: string } {
    if (!email) {
        return { valid: false, message: 'El email es requerido' };
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
        return {
            valid: false,
            message: 'El formato del email no es válido'
        };
    }

    return { valid: true };
}
