/**
 * Configuración centralizada de sucursales y contacto.
 * 
 * PARA AGREGAR UNA SUCURSAL: Simplemente agrega un nuevo objeto al array BRANCHES.
 * Todos los componentes que importan desde aquí se actualizarán automáticamente.
 */

export const CONTACT_INFO = {
    mainPhone: '7716854026',
    mainPhoneFormatted: '771 685 4026',
    mainWhatsApp: '527716854026',
    email: 'contacto@delbienestar.com.mx',
    companyName: 'Laboratorio Clínico Bienestar',
    companyNameShort: 'BienestarLab',
    // Dirección principal para el footer
    mainAddress: 'Ignacio Galvan 10 interior 11 Plaza Bonanza, Tizayuca Hidalgo (Junto a BBVA)',
};

export interface Branch {
    id: number;
    name: string;
    address: string;
    phone: string;
    phoneFormatted: string;
    whatsapp: string;
    mapUrl: string;
    hours: string;
    services: string[];
    isPrimary: boolean;
}

export const BRANCHES: Branch[] = [
    {
        id: 1,
        name: 'Ignacio Galván 27',
        address: 'Ignacio Galván 27, Centro, Tizayuca, Hidalgo',
        phone: '7757371811',
        phoneFormatted: '775 737 1811',
        whatsapp: '5217757371811',
        mapUrl: 'https://maps.app.goo.gl/H9HMdtGnSnZ6aq3x5',
        hours: 'Lun-Vie: 7am-7pm | Sáb: 8am-2pm',
        services: ['Toma de Muestras', 'Sueroterapia', 'Atención Personalizada'],
        isPrimary: true,
    },
    {
        id: 2,
        name: 'Farmacia Nacozari',
        address: 'Av. Adolfo Mateos 43, Col. Nacozari, Tizayuca, Hidalgo',
        phone: '7757371811',
        phoneFormatted: '775 737 1811',
        whatsapp: '5217757371811',
        mapUrl: 'https://maps.app.goo.gl/SugciWSwudWpQYgHA',
        hours: 'Lun-Vie: 7am-7pm | Sáb: 8am-2pm',
        services: ['Toma de Muestras', 'Sueroterapia', 'Atención Personalizada'],
        isPrimary: false,
    },
];

// Helper: obtener sucursal principal
export const PRIMARY_BRANCH = BRANCHES.find(b => b.isPrimary) || BRANCHES[0];

// Helper: generar link de WhatsApp con mensaje
export function getWhatsAppLink(message?: string, phone?: string) {
    const whatsapp = phone || CONTACT_INFO.mainWhatsApp;
    const encodedMsg = message ? `?text=${encodeURIComponent(message)}` : '';
    return `https://wa.me/${whatsapp}${encodedMsg}`;
}
