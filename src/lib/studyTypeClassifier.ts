/**
 * Clasificador de tipos de estudios médicos
 * Detecta el tipo visual basado en palabras clave en el nombre del estudio
 */

export type StudyVisualType =
    | 'orina'
    | 'sangre'
    | 'hormonal'
    | 'radiologia'
    | 'tomografia'
    | 'resonancia'
    | 'microbiologia'
    | 'inmunologia'
    | 'genetica'
    | 'cardiologia'
    | 'default';

/**
 * Clasifica un estudio según su nombre para asignar icono y colores
 */
export function getStudyVisualType(studyName: string): StudyVisualType {
    const nameUpper = studyName.toUpperCase();

    // Orina
    if (
        nameUpper.includes('ORINA') ||
        nameUpper.includes('EGO') ||
        nameUpper.includes('URINÁLISIS') ||
        nameUpper.includes('URINALISIS') ||
        nameUpper.includes('UROCULTIVO')
    ) {
        return 'orina';
    }

    // Hormonal
    if (
        nameUpper.includes('HORMONA') ||
        nameUpper.includes('PROGESTERONA') ||
        nameUpper.includes('TESTOSTERONA') ||
        nameUpper.includes('ESTRADIOL') ||
        nameUpper.includes('TIROIDES') ||
        nameUpper.includes('TSH') ||
        nameUpper.includes('T3') ||
        nameUpper.includes('T4') ||
        nameUpper.includes('PROLACTINA') ||
        nameUpper.includes('CORTISOL')
    ) {
        return 'hormonal';
    }

    // Radiología
    if (
        nameUpper.includes('RAYOS X') ||
        nameUpper.includes('RADIOGRAFÍA') ||
        nameUpper.includes('RADIOGRAFIA') ||
        nameUpper.includes('RX')
    ) {
        return 'radiologia';
    }

    // Tomografía
    if (
        nameUpper.includes('TOMOGRAFÍA') ||
        nameUpper.includes('TOMOGRAFIA') ||
        nameUpper.includes('TAC') ||
        nameUpper.includes('CT')
    ) {
        return 'tomografia';
    }

    // Resonancia
    if (
        nameUpper.includes('RESONANCIA') ||
        nameUpper.includes('RM') ||
        nameUpper.includes('MRI')
    ) {
        return 'resonancia';
    }

    // Microbiología
    if (
        nameUpper.includes('CULTIVO') ||
        nameUpper.includes('BACTERIA') ||
        nameUpper.includes('ANTIBIOGRAMA') ||
        nameUpper.includes('MICROBIOLÓG')
    ) {
        return 'microbiologia';
    }

    // Inmunología
    if (
        nameUpper.includes('ANTICUERPO') ||
        nameUpper.includes('IGG') ||
        nameUpper.includes('IGM') ||
        nameUpper.includes('INMUNO') ||
        nameUpper.includes('ANTÍGENO')
    ) {
        return 'inmunologia';
    }

    // Genética
    if (
        nameUpper.includes('ADN') ||
        nameUpper.includes('GENÉTICO') ||
        nameUpper.includes('GENETICO') ||
        nameUpper.includes('CROMOSOMA') ||
        nameUpper.includes('CARIOTIPO')
    ) {
        return 'genetica';
    }

    // Cardiología
    if (
        nameUpper.includes('ECG') ||
        nameUpper.includes('ELECTROCARDIOGRAMA') ||
        nameUpper.includes('CARDIACO') ||
        nameUpper.includes('CARDÍACO') ||
        nameUpper.includes('CORAZÓN')
    ) {
        return 'cardiologia';
    }

    // Sangre (default para la mayoría de análisis clínicos)
    return 'sangre';
}

/**
 * Obtiene una descripción amigable del tipo de estudio
 */
export function getStudyTypeLabel(type: StudyVisualType): string {
    const labels: Record<StudyVisualType, string> = {
        orina: 'Análisis de Orina',
        sangre: 'Análisis de Sangre',
        hormonal: 'Estudio Hormonal',
        radiologia: 'Radiología',
        tomografia: 'Tomografía',
        resonancia: 'Resonancia Magnética',
        microbiologia: 'Microbiología',
        inmunologia: 'Inmunología',
        genetica: 'Genética',
        cardiologia: 'Cardiología',
        default: 'Estudio Médico'
    };

    return labels[type];
}
