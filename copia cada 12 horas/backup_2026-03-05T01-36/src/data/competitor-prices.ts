// ============================================================
// PRECIOS DE COMPETENCIA - DATOS REALES SCRAPEADOS + INVESTIGACION
// Fuentes: Chopo scrapeado Feb 2026 | Médica Polanco lmpolanco.com Feb 2026
// Actualización: Feb 2026
// REGLA: Del Bienestar SIEMPRE debe estar por debajo de todos
// ============================================================

export interface CompetitorPrice {
    lab: string;
    logo: string;
    colorClass: string;
    precioRegular: number;
    precioPromo?: number;
    fuente: 'scrape' | 'web' | 'estimado';
    fechaVerificacion: string;
    url?: string;
}

export interface PreciosComparacion {
    slug: string;
    nombreEstudio: string;
    competidores: CompetitorPrice[];
    nuestro: {
        precioRegular: number;
        precioPromo: number;
    };
}

// ============================================================
// BASE DE PRECIOS DE COMPETENCIA POR SLUG DEL ESTUDIO
// ============================================================
export const COMPETITOR_PRICES: Record<string, Omit<PreciosComparacion, 'nuestro'>> = {

    // ===================== BIOMETRÍA HEMÁTICA =====================
    'biometria-hematica': {
        slug: 'biometria-hematica',
        nombreEstudio: 'Biometría Hemática',
        competidores: [
            {
                lab: 'Lab. Médico del Chopo',
                logo: '🔴',
                colorClass: 'text-red-600',
                precioRegular: 375.00,
                precioPromo: 262.51,
                fuente: 'scrape',
                fechaVerificacion: '2026-02',
                url: 'https://www.chopo.com.mx/metro/biometria-hematica'
            },
            {
                lab: 'Médica Polanco',
                logo: '🔵',
                colorClass: 'text-blue-600',
                precioRegular: 526.00,
                precioPromo: 262.71,
                fuente: 'web',
                fechaVerificacion: '2026-02',
                url: 'https://lmpolanco.com'
            },
            {
                lab: 'Salud Digna',
                logo: '🟣',
                colorClass: 'text-purple-600',
                precioRegular: 290.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
        ]
    },

    // ===================== EXAMEN GENERAL DE ORINA =====================
    'examen-general-de-orina': {
        slug: 'examen-general-de-orina',
        nombreEstudio: 'Examen General de Orina (EGO)',
        competidores: [
            {
                lab: 'Lab. Médico del Chopo',
                logo: '🔴',
                colorClass: 'text-red-600',
                precioRegular: 200.00,
                precioPromo: 140.00,
                fuente: 'scrape',
                fechaVerificacion: '2026-02',
                url: 'https://www.chopo.com.mx/metro/examen-general-de-orina'
            },
            {
                lab: 'Médica Polanco',
                logo: '🔵',
                colorClass: 'text-blue-600',
                precioRegular: 280.00,
                precioPromo: 140.00,
                fuente: 'web',
                fechaVerificacion: '2026-02'
            },
            {
                lab: 'Salud Digna',
                logo: '🟣',
                colorClass: 'text-purple-600',
                precioRegular: 180.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
        ]
    },

    // ===================== QUÍMCA INTEGRAL 45 ELEMENTOS =====================
    'quimica-integral-de-45-elementos': {
        slug: 'quimica-integral-de-45-elementos',
        nombreEstudio: 'Química Integral de 45 Elementos',
        competidores: [
            {
                lab: 'Lab. Médico del Chopo',
                logo: '🔴',
                colorClass: 'text-red-600',
                precioRegular: 1069.00,
                precioPromo: 962.10,
                fuente: 'scrape',
                fechaVerificacion: '2026-02',
                url: 'https://www.chopo.com.mx/metro/estudios-de-laboratorio/quimica-integral-de-45-elementos'
            },
            {
                lab: 'Médica Polanco',
                logo: '🔵',
                colorClass: 'text-blue-600',
                precioRegular: 1150.00,
                precioPromo: 980.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
            {
                lab: 'Salud Digna',
                logo: '🟣',
                colorClass: 'text-purple-600',
                precioRegular: 1050.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
        ]
    },

    // ===================== PERFIL TIROIDEO =====================
    'perfil-tiroideo-en-suero': {
        slug: 'perfil-tiroideo-en-suero',
        nombreEstudio: 'Perfil Tiroideo',
        competidores: [
            {
                lab: 'Lab. Médico del Chopo',
                logo: '🔴',
                colorClass: 'text-red-600',
                precioRegular: 1175.00,
                precioPromo: 1057.50,
                fuente: 'scrape',
                fechaVerificacion: '2026-02',
                url: 'https://www.chopo.com.mx/metro/estudios-de-laboratorio/perfil-tiroideo'
            },
            {
                lab: 'Médica Polanco',
                logo: '🔵',
                colorClass: 'text-blue-600',
                precioRegular: 1280.00,
                precioPromo: 1100.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
            {
                lab: 'Salud Digna',
                logo: '🟣',
                colorClass: 'text-purple-600',
                precioRegular: 1100.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
        ]
    },

    // ===================== VITAMINA D =====================
    '25-hidroxi-vitamina-d-total-calciferol': {
        slug: '25-hidroxi-vitamina-d-total-calciferol',
        nombreEstudio: 'Vitamina D (25 Hidroxi)',
        competidores: [
            {
                lab: 'Lab. Médico del Chopo',
                logo: '🔴',
                colorClass: 'text-red-600',
                precioRegular: 1588.01,
                precioPromo: 1111.60,
                fuente: 'scrape',
                fechaVerificacion: '2026-02',
                url: 'https://www.chopo.com.mx/metro/25-hidroxi-vitamina-d-total-calciferol'
            },
            {
                lab: 'Médica Polanco',
                logo: '🔵',
                colorClass: 'text-blue-600',
                precioRegular: 1650.00,
                precioPromo: 1200.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
            {
                lab: 'Salud Digna',
                logo: '🟣',
                colorClass: 'text-purple-600',
                precioRegular: 1200.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
        ]
    },

    // ===================== ELECTROCARDIOGRAMA =====================
    'electrocardiograma-digital-en-reposo': {
        slug: 'electrocardiograma-digital-en-reposo',
        nombreEstudio: 'Electrocardiograma Digital en Reposo',
        competidores: [
            {
                lab: 'Lab. Médico del Chopo',
                logo: '🔴',
                colorClass: 'text-red-600',
                precioRegular: 550.00,
                precioPromo: 385.00,
                fuente: 'scrape',
                fechaVerificacion: '2026-02',
                url: 'https://www.chopo.com.mx/metro/electrocardiograma-digital-en-reposo'
            },
            {
                lab: 'Médica Polanco',
                logo: '🔵',
                colorClass: 'text-blue-600',
                precioRegular: 620.00,
                precioPromo: 400.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
            {
                lab: 'Salud Digna',
                logo: '🟣',
                colorClass: 'text-purple-600',
                precioRegular: 420.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
        ]
    },

    // ===================== GLUCOSA =====================
    'glucosa': {
        slug: 'glucosa',
        nombreEstudio: 'Glucosa en Sangre',
        competidores: [
            {
                lab: 'Lab. Médico del Chopo',
                logo: '🔴',
                colorClass: 'text-red-600',
                precioRegular: 195.00,
                precioPromo: 136.50,
                fuente: 'estimado',
                fechaVerificacion: '2026-02',
            },
            {
                lab: 'Médica Polanco',
                logo: '🔵',
                colorClass: 'text-blue-600',
                precioRegular: 218.00,
                precioPromo: 109.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
            {
                lab: 'Salud Digna',
                logo: '🟣',
                colorClass: 'text-purple-600',
                precioRegular: 160.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
        ]
    },

    // ===================== HEMOGLOBINA GLUCOSILADA =====================
    'hemoglobina-glucosilada': {
        slug: 'hemoglobina-glucosilada',
        nombreEstudio: 'Hemoglobina Glucosilada (HbA1c)',
        competidores: [
            {
                lab: 'Lab. Médico del Chopo',
                logo: '🔴',
                colorClass: 'text-red-600',
                precioRegular: 495.00,
                precioPromo: 346.50,
                fuente: 'estimado',
                fechaVerificacion: '2026-02',
            },
            {
                lab: 'Médica Polanco',
                logo: '🔵',
                colorClass: 'text-blue-600',
                precioRegular: 540.00,
                precioPromo: 360.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
            {
                lab: 'Salud Digna',
                logo: '🟣',
                colorClass: 'text-purple-600',
                precioRegular: 400.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
        ]
    },

    // ===================== COLESTEROL TOTAL =====================
    'colesterol-total': {
        slug: 'colesterol-total',
        nombreEstudio: 'Colesterol Total',
        competidores: [
            {
                lab: 'Lab. Médico del Chopo',
                logo: '🔴',
                colorClass: 'text-red-600',
                precioRegular: 175.00,
                precioPromo: 122.50,
                fuente: 'estimado',
                fechaVerificacion: '2026-02',
            },
            {
                lab: 'Médica Polanco',
                logo: '🔵',
                colorClass: 'text-blue-600',
                precioRegular: 196.00,
                precioPromo: 128.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
            {
                lab: 'Salud Digna',
                logo: '🟣',
                colorClass: 'text-purple-600',
                precioRegular: 149.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
        ]
    },

    // ===================== PRUEBA COVID/INFLUENZA =====================
    'prueba-rapida-ag-duo-deteccion-covid-19-influenza-a-b': {
        slug: 'prueba-rapida-ag-duo-deteccion-covid-19-influenza-a-b',
        nombreEstudio: 'Prueba Rápida COVID-19/Influenza A/B',
        competidores: [
            {
                lab: 'Lab. Médico del Chopo',
                logo: '🔴',
                colorClass: 'text-red-600',
                precioRegular: 660.01,
                precioPromo: 462.00,
                fuente: 'scrape',
                fechaVerificacion: '2026-02',
                url: 'https://www.chopo.com.mx/metro/prueba-rapida-ag-duo-deteccion-covid-19-influenza-a-b'
            },
            {
                lab: 'Médica Polanco',
                logo: '🔵',
                colorClass: 'text-blue-600',
                precioRegular: 720.00,
                precioPromo: 500.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
            {
                lab: 'Salud Digna',
                logo: '🟣',
                colorClass: 'text-purple-600',
                precioRegular: 520.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
        ]
    },

    // ===================== HELICOBACTER PYLORI (ALIENTO) =====================
    'prueba-de-aliento-para-helicobacter-pylori': {
        slug: 'prueba-de-aliento-para-helicobacter-pylori',
        nombreEstudio: 'Prueba de Aliento Helicobacter Pylori',
        competidores: [
            {
                lab: 'Lab. Médico del Chopo',
                logo: '🔴',
                colorClass: 'text-red-600',
                precioRegular: 2470.00,
                precioPromo: 1729.00,
                fuente: 'scrape',
                fechaVerificacion: '2026-02',
                url: 'https://www.chopo.com.mx/metro/prueba-de-aliento-para-helicobacter-pylori'
            },
            {
                lab: 'Médica Polanco',
                logo: '🔵',
                colorClass: 'text-blue-600',
                precioRegular: 2700.00,
                precioPromo: 1900.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
            {
                lab: 'Salud Digna',
                logo: '🟣',
                colorClass: 'text-purple-600',
                precioRegular: 1950.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
        ]
    },

    // ===================== PERFIL LIPIDOS =====================
    'perfil-de-lipidos': {
        slug: 'perfil-de-lipidos',
        nombreEstudio: 'Perfil de Lípidos',
        competidores: [
            {
                lab: 'Lab. Médico del Chopo',
                logo: '🔴',
                colorClass: 'text-red-600',
                precioRegular: 520.00,
                precioPromo: 364.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02',
            },
            {
                lab: 'Médica Polanco',
                logo: '🔵',
                colorClass: 'text-blue-600',
                precioRegular: 580.00,
                precioPromo: 390.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
            {
                lab: 'Salud Digna',
                logo: '🟣',
                colorClass: 'text-purple-600',
                precioRegular: 420.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
        ]
    },

    // ===================== RADIOGRAFÍA DE TÓRAX =====================
    'rx-de-torax-postero-anterior': {
        slug: 'rx-de-torax-postero-anterior',
        nombreEstudio: 'RX de Tórax Postero-Anterior',
        competidores: [
            {
                lab: 'Lab. Médico del Chopo',
                logo: '🔴',
                colorClass: 'text-red-600',
                precioRegular: 535.00,
                precioPromo: 374.51,
                fuente: 'scrape',
                fechaVerificacion: '2026-02',
                url: 'https://www.chopo.com.mx/metro/rx-de-torax-postero-anterior'
            },
            {
                lab: 'Médica Polanco',
                logo: '🔵',
                colorClass: 'text-blue-600',
                precioRegular: 620.00,
                precioPromo: 410.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
            {
                lab: 'Salud Digna',
                logo: '🟣',
                colorClass: 'text-purple-600',
                precioRegular: 410.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
        ]
    },

    // ===================== VIH =====================
    'vih': {
        slug: 'vih',
        nombreEstudio: 'Prueba VIH (Anticuerpos)',
        competidores: [
            {
                lab: 'Lab. Médico del Chopo',
                logo: '🔴',
                colorClass: 'text-red-600',
                precioRegular: 650.00,
                precioPromo: 455.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02',
            },
            {
                lab: 'Médica Polanco',
                logo: '🔵',
                colorClass: 'text-blue-600',
                precioRegular: 720.00,
                precioPromo: 490.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
            {
                lab: 'Salud Digna',
                logo: '🟣',
                colorClass: 'text-purple-600',
                precioRegular: 490.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
        ]
    },

    // ===================== UROCULTIVO =====================
    'urocultivo': {
        slug: 'urocultivo',
        nombreEstudio: 'Urocultivo',
        competidores: [
            {
                lab: 'Lab. Médico del Chopo',
                logo: '🔴',
                colorClass: 'text-red-600',
                precioRegular: 560.00,
                precioPromo: 392.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02',
            },
            {
                lab: 'Médica Polanco',
                logo: '🔵',
                colorClass: 'text-blue-600',
                precioRegular: 610.00,
                precioPromo: 420.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
            {
                lab: 'Salud Digna',
                logo: '🟣',
                colorClass: 'text-purple-600',
                precioRegular: 440.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
        ]
    },

    // ===================== CREATININA =====================
    'creatinina': {
        slug: 'creatinina',
        nombreEstudio: 'Creatinina Sérica',
        competidores: [
            {
                lab: 'Lab. Médico del Chopo',
                logo: '🔴',
                colorClass: 'text-red-600',
                precioRegular: 260.00,
                precioPromo: 182.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02',
            },
            {
                lab: 'Médica Polanco',
                logo: '🔵',
                colorClass: 'text-blue-600',
                precioRegular: 296.00,
                precioPromo: 198.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
            {
                lab: 'Salud Digna',
                logo: '🟣',
                colorClass: 'text-purple-600',
                precioRegular: 210.00,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
        ]
    },
};

/**
 * Obtiene los precios de competencia para un estudio dado.
 * Si no existe data real, genera estimados basados en el precio de Bienestar.
 */
export function getCompetitorPrices(slug: string, nuestroPrecio: number): PreciosComparacion | null {
    const data = COMPETITOR_PRICES[slug];

    if (data) {
        return {
            ...data,
            nuestro: {
                precioRegular: Math.round(nuestroPrecio * 1.1),
                precioPromo: nuestroPrecio,
            }
        };
    }

    // Generamos estimados si no hay datos reales
    // Bienestar siempre es el más barato ~15-25% menos que Chopo
    const chopoEstimado = Math.round(nuestroPrecio * 1.22);
    const polancoEstimado = Math.round(nuestroPrecio * 1.35);
    const saludDignaEstimado = Math.round(nuestroPrecio * 1.18);

    return {
        slug,
        nombreEstudio: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        competidores: [
            {
                lab: 'Lab. Médico del Chopo',
                logo: '🔴',
                colorClass: 'text-red-600',
                precioRegular: Math.round(chopoEstimado * 1.3),
                precioPromo: chopoEstimado,
                fuente: 'estimado',
                fechaVerificacion: '2026-02',
            },
            {
                lab: 'Médica Polanco',
                logo: '🔵',
                colorClass: 'text-blue-600',
                precioRegular: Math.round(polancoEstimado * 1.25),
                precioPromo: polancoEstimado,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
            {
                lab: 'Salud Digna',
                logo: '🟣',
                colorClass: 'text-purple-600',
                precioRegular: saludDignaEstimado,
                fuente: 'estimado',
                fechaVerificacion: '2026-02'
            },
        ],
        nuestro: {
            precioRegular: Math.round(nuestroPrecio * 1.1),
            precioPromo: nuestroPrecio,
        }
    };
}
