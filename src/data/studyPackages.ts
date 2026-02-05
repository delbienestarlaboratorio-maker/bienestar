export interface StudyPackage {
    id: string;
    name: string;
    category: 'para-ella' | 'para-el' | 'por-edad' | 'por-condicion' | 'especiales';
    categoryLabel: string;
    icon: string;
    priceRegular: number;
    pricePackage: number;
    savings: number;
    savingsPercent: number;
    studies: string[];
    idealFor: string;
    description: string;
    featured?: boolean;
}

export const studyPackages: StudyPackage[] = [
    // PARA ELLA
    {
        id: 'checkup-mujer-basico',
        name: 'Check-Up Mujer Básico',
        category: 'para-ella',
        categoryLabel: 'Para Ella',
        icon: '👩',
        priceRegular: 1750,
        pricePackage: 1249,
        savings: 501,
        savingsPercent: 29,
        studies: [
            'Biometría Hemática Completa',
            'Química Sanguínea 6 elementos',
            'Examen General de Orina',
            'Perfil Tiroideo (TSH, T3, T4)',
            'Papanicolaou'
        ],
        idealFor: 'Mujeres 20-50 años, chequeo anual preventivo',
        description: 'Paquete básico de prevención para salud femenina integral',
        featured: true
    },
    {
        id: 'prevencion-mujer-integral',
        name: 'Prevención Mujer Integral',
        category: 'para-ella',
        categoryLabel: 'Para Ella',
        icon: '👩',
        priceRegular: 2700,
        pricePackage: 1899,
        savings: 801,
        savingsPercent: 30,
        studies: [
            'Biometría Hemática Completa',
            'Química Sanguínea 6 elementos',
            'Examen General de Orina',
            'Perfil Tiroideo (TSH, T3, T4)',
            'Papanicolaou',
            'Perfil Hormonal Femenino (Estradiol, Progesterona, FSH, LH)',
            'VPH (Virus Papiloma Humano)',
            'Densitometría Ósea',
            'Ultrasonido Pélvico'
        ],
        idealFor: 'Mujeres 35+ años, detección cáncer cervicouterino',
        description: 'Paquete completo de detección temprana y prevención'
    },
    {
        id: 'fertilidad-mujer',
        name: 'Fertilidad Mujer',
        category: 'para-ella',
        categoryLabel: 'Para Ella',
        icon: '👩',
        priceRegular: 2500,
        pricePackage: 1799,
        savings: 701,
        savingsPercent: 28,
        studies: [
            'Perfil Hormonal Completo',
            'Prolactina',
            'Hormona Antimülleriana (AMH)',
            'Ultrasonido Pélvico Transvaginal',
            'Cultivo Vaginal'
        ],
        idealFor: 'Mujeres planeando embarazo',
        description: 'Evaluación completa de salud reproductiva femenina'
    },

    // PARA ÉL
    {
        id: 'checkup-hombre-basico',
        name: 'Check-Up Hombre Básico',
        category: 'para-el',
        categoryLabel: 'Para Él',
        icon: '👨',
        priceRegular: 1700,
        pricePackage: 1199,
        savings: 501,
        savingsPercent: 29,
        studies: [
            'Biometría Hemática Completa',
            'Química Sanguínea 12 elementos',
            'Examen General de Orina',
            'Perfil de Lípidos (Colesterol, Triglicéridos)',
            'Antígeno Prostático Específico (PSA)'
        ],
        idealFor: 'Hombres 40+ años, chequeo preventivo',
        description: 'Paquete esencial para salud masculina',
        featured: true
    },
    {
        id: 'salud-cardiovascular-hombre',
        name: 'Salud Cardiovascular Hombre',
        category: 'para-el',
        categoryLabel: 'Para Él',
        icon: '👨',
        priceRegular: 2200,
        pricePackage: 1549,
        savings: 651,
        savingsPercent: 30,
        studies: [
            'Biometría Hemática Completa',
            'Química Sanguínea 12 elementos',
            'Examen General de Orina',
            'Perfil de Lípidos',
            'PSA',
            'Electrocardiograma',
            'Proteína C Reactiva',
            'Homocisteína',
            'Ácido Úrico'
        ],
        idealFor: 'Hombres con antecedentes cardiovasculares',
        description: 'Monitoreo completo de salud del corazón'
    },
    {
        id: 'prevencion-prostata',
        name: 'Prevención Próstata',
        category: 'para-el',
        categoryLabel: 'Para Él',
        icon: '👨',
        priceRegular: 1800,
        pricePackage: 1299,
        savings: 501,
        savingsPercent: 28,
        studies: [
            'PSA Total',
            'PSA Libre',
            'Relación PSA Libre/Total',
            'Examen General de Orina',
            'Ultrasonido Prostático'
        ],
        idealFor: 'Hombres 50+ años',
        description: 'Detección temprana de problemas prostáticos'
    },

    // POR EDAD
    {
        id: 'checkup-infantil',
        name: 'Check-Up Infantil',
        category: 'por-edad',
        categoryLabel: 'Por Edad',
        icon: '👶',
        priceRegular: 1200,
        pricePackage: 849,
        savings: 351,
        savingsPercent: 29,
        studies: [
            'Biometría Hemática',
            'Coproparasitoscópico',
            'Examen General de Orina',
            'Glucosa'
        ],
        idealFor: 'Niños 0-12 años, control anual pediátrico',
        description: 'Chequeo completo para salud infantil'
    },
    {
        id: 'checkup-adolescente',
        name: 'Check-Up Adolescente',
        category: 'por-edad',
        categoryLabel: 'Por Edad',
        icon: '👦',
        priceRegular: 1500,
        pricePackage: 1099,
        savings: 401,
        savingsPercent: 27,
        studies: [
            'Biometría Hemática Completa',
            'Química Sanguínea 6',
            'Perfil Tiroideo',
            'Examen General de Orina'
        ],
        idealFor: 'Adolescentes 13-18 años, vida escolar/deportiva',
        description: 'Monitoreo de desarrollo y crecimiento'
    },
    {
        id: 'checkup-adulto-mayor',
        name: 'Check-Up Adulto Mayor',
        category: 'por-edad',
        categoryLabel: 'Por Edad',
        icon: '🧓',
        priceRegular: 2500,
        pricePackage: 1749,
        savings: 751,
        savingsPercent: 30,
        studies: [
            'Biometría Hemática Completa',
            'Química Sanguínea 27 elementos',
            'Perfil de Lípidos',
            'Hemoglobina Glucosilada (HbA1c)',
            'Función Renal (Urea, Creatinina)',
            'Electrocardiograma'
        ],
        idealFor: 'Adultos 60+ años, monitoreo integral',
        description: 'Vigilancia completa de salud en la tercera edad',
        featured: true
    },

    // POR CONDICIÓN
    {
        id: 'control-diabetes',
        name: 'Control Diabetes',
        category: 'por-condicion',
        categoryLabel: 'Por Condición',
        icon: '🏥',
        priceRegular: 1800,
        pricePackage: 1299,
        savings: 501,
        savingsPercent: 28,
        studies: [
            'Glucosa en Ayunas',
            'Hemoglobina Glucosilada (HbA1c)',
            'Perfil de Lípidos',
            'Microalbuminuria',
            'Examen General de Orina'
        ],
        idealFor: 'Pacientes diabéticos, control trimestral',
        description: 'Monitoreo completo de diabetes y complicaciones'
    },
    {
        id: 'control-hipertension',
        name: 'Control Hipertensión',
        category: 'por-condicion',
        categoryLabel: 'Por Condición',
        icon: '🏥',
        priceRegular: 1600,
        pricePackage: 1149,
        savings: 451,
        savingsPercent: 28,
        studies: [
            'Química Sanguínea 12',
            'Perfil de Lípidos',
            'Función Renal',
            'Electrolitos Séricos',
            'Examen General de Orina'
        ],
        idealFor: 'Pacientes hipertensos, control regular',
        description: 'Seguimiento de presión arterial y órganos afectados'
    },
    {
        id: 'embarazo-saludable',
        name: 'Embarazo Saludable',
        category: 'por-condicion',
        categoryLabel: 'Por Condición',
        icon: '🏥',
        priceRegular: 2800,
        pricePackage: 1999,
        savings: 801,
        savingsPercent: 29,
        studies: [
            'Biometría Hemática',
            'Química Sanguínea 6',
            'Examen General de Orina',
            'VDRL (Sífilis)',
            'VIH',
            'Grupo Sanguíneo y RH',
            'Toxoplasma IgG e IgM',
            'Rubéola IgG e IgM'
        ],
        idealFor: 'Primer trimestre embarazo',
        description: 'Panel completo para embarazo seguro'
    },

    // ESPECIALES
    {
        id: 'deportivo-performance',
        name: 'Deportivo Performance',
        category: 'especiales',
        categoryLabel: 'Especiales',
        icon: '💪',
        priceRegular: 2200,
        pricePackage: 1549,
        savings: 651,
        savingsPercent: 30,
        studies: [
            'Biometría Hemática',
            'Química Sanguínea 27',
            'Perfil Tiroideo',
            'Testosterona Total',
            'Cortisol',
            'Vitamina D'
        ],
        idealFor: 'Atletas y deportistas',
        description: 'Optimización de rendimiento deportivo'
    },
    {
        id: 'detox-hepatico',
        name: 'Detox Hepático',
        category: 'especiales',
        categoryLabel: 'Especiales',
        icon: '💪',
        priceRegular: 1900,
        pricePackage: 1349,
        savings: 551,
        savingsPercent: 29,
        studies: [
            'Pruebas de Función Hepática completas',
            'Bilirrubinas',
            'Proteínas Totales',
            'Tiempo de Protrombina'
        ],
        idealFor: 'Después de tratamientos prolongados',
        description: 'Limpieza y evaluación hepática completa'
    }
];

export const packageCategories = [
    { id: 'todos', name: 'Todos los Paquetes', icon: '📦' },
    { id: 'para-ella', name: 'Para Ella', icon: '👩' },
    { id: 'para-el', name: 'Para Él', icon: '👨' },
    { id: 'por-edad', name: 'Por Edad', icon: '👶' },
    { id: 'por-condicion', name: 'Por Condición', icon: '🏥' },
    { id: 'especiales', name: 'Especiales', icon: '💪' }
];
