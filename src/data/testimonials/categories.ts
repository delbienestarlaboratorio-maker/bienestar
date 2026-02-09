// Study category mapper
// Maps database study categories to testimonial review categories

import { StudyCategory } from './reviews-pool';

// Map study categories from database to review categories
export function mapStudyCategoryToReviewCategory(
    studyCategory: string
): StudyCategory {
    const categoryMap: Record<string, StudyCategory> = {
        // Blood tests
        'analisis-clinicos': 'blood',
        'sangre': 'blood',
        'hematologia': 'blood',
        'quimica-sanguinea': 'blood',
        'biometria': 'blood',
        'glucosa': 'blood',
        'diabetes': 'blood',
        'colesterol': 'blood',
        'lipidos': 'blood',
        'trigliceridos': 'blood',
        'hemograma': 'blood',
        'coagulacion': 'blood',

        // Urine tests
        'examen-general-orina': 'urine',
        'orina': 'urine',
        'urocultivo': 'urine',
        'urinalisis': 'urine',

        // Radiology
        'radiologia': 'radiology',
        'rayos-x': 'radiology',
        'ultrasonido': 'radiology',
        'ecografia': 'radiology',
        'mastografia': 'radiology',
        'tomografia': 'radiology',
        'densitometria': 'radiology',
        'radiografia': 'radiology',

        // Specialty
        'hormonas': 'specialty',
        'endocrinologia': 'specialty',
        'tiroides': 'specialty',
        'fertilidad': 'specialty',
        'alergias': 'specialty',
        'inmunologia': 'specialty',
        'marcadores-tumorales': 'specialty',
        'genetica': 'specialty',
        'cardiologia': 'specialty',
        'hepatologia': 'specialty',
        'autoinmunidad': 'specialty',

        // Preventive
        'check-up': 'preventive',
        'chequeo': 'preventive',
        'paquetes': 'preventive',
        'preventivo': 'preventive',
        'ejecutivo': 'preventive',
        'prenupcial': 'preventive',
        'empleado': 'preventive',
    };

    // Normalize category (lowercase, remove accents)
    const normalized = studyCategory
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    return categoryMap[normalized] || 'general';
}

// Map study name to category (if category not available)
export function inferCategoryFromStudyName(studyName: string): StudyCategory {
    const nameLower = studyName.toLowerCase();

    // Blood-related keywords
    if (
        nameLower.includes('sangre') ||
        nameLower.includes('hemograma') ||
        nameLower.includes('biometria') ||
        nameLower.includes('glucosa') ||
        nameLower.includes('colesterol') ||
        nameLower.includes('quimica') ||
        nameLower.includes('lipidos')
    ) {
        return 'blood';
    }

    // Urine-related keywords
    if (
        nameLower.includes('orina') ||
        nameLower.includes('urocultivo') ||
        nameLower.includes('examen general')
    ) {
        return 'urine';
    }

    // Radiology keywords
    if (
        nameLower.includes('rayos x') ||
        nameLower.includes('ultrasonido') ||
        nameLower.includes('radiografia') ||
        nameLower.includes('mastografia') ||
        nameLower.includes('ecografia') ||
        nameLower.includes('tomografia')
    ) {
        return 'radiology';
    }

    // Specialty keywords
    if (
        nameLower.includes('hormona') ||
        nameLower.includes('tiroides') ||
        nameLower.includes('fertilidad') ||
        nameLower.includes('alergia') ||
        nameLower.includes('marcador') ||
        nameLower.includes('genetica')
    ) {
        return 'specialty';
    }

    // Package/preventive keywords
    if (
        nameLower.includes('paquete') ||
        nameLower.includes('check') ||
        nameLower.includes('chequeo') ||
        nameLower.includes('perfil')
    ) {
        return 'preventive';
    }

    return 'general';
}
