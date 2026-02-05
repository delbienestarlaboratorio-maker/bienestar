export interface Subcategory {
    id: string;
    name: string;
    description?: string;
}

export const subcategories: Subcategory[] = [
    { id: 'hematologia', name: 'Hematología', description: 'Estudios de la sangre y sus componentes' },
    { id: 'quimica-clinica', name: 'Química Clínica', description: 'Análisis de sustancias químicas en la sangre' },
    { id: 'inmunologia', name: 'Inmunología', description: 'Estudios del sistema inmunológico y alergias' },
    { id: 'microbiologia', name: 'Microbiología', description: 'Detección de bacterias, virus y parásitos' },
    { id: 'hormonas', name: 'Hormonas', description: 'Perfiles hormonales y endocrinología' },
    { id: 'marcadores-tumorales', name: 'Marcadores Tumorales', description: 'Detección temprana y seguimiento de cáncer' },
    { id: 'orina-y-heces', name: 'Orina y Heces', description: 'Análisis generales y específicos' },
    { id: 'vitaminas-y-minerales', name: 'Vitaminas y Minerales', description: 'Niveles nutricionales' },
    { id: 'coagulacion', name: 'Coagulación', description: 'Tiempos de coagulación y factores' },
    { id: 'toxicologia', name: 'Toxicología', description: 'Detección de drogas y fármacos' },
];
