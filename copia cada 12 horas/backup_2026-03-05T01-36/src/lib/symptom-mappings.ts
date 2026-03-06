// Comprehensive Symptom to Study Mapping Database
// This maps common symptoms to laboratory studies using keyword matching

export interface SymptomMapping {
    category: string;
    keywords: string[];
    studyNames: string[];
    message: string;
    priority: number; // 1-5, higher = more relevant
}

export const symptomMappings: SymptomMapping[] = [
    // ============================================
    // DIGESTIVE SYMPTOMS
    // ============================================
    {
        category: 'dolor_abdominal',
        keywords: [
            'dolor', 'panza', 'estomago', 'estómago', 'abdomen', 'vientre', 'barriga',
            'duele', 'molestia', 'malestar', 'gastrico', 'gástrico', 'digestivo',
            'colico', 'cólico', 'retorcijones', 'punzadas', 'ardor', 'acidez'
        ],
        studyNames: [
            'COPROCULTIVO',
            'COPROPARASITOSCOPICO',
            'HELICOBACTER',
            'SANGRE OCULTA'
        ],
        message: 'El dolor abdominal puede indicar infecciones bacterianas, parásitos intestinales o problemas digestivos como gastritis. Estos estudios ayudarán a identificar la causa.',
        priority: 5
    },
    {
        category: 'diarrea',
        keywords: [
            'diarrea', 'diarrhea', 'evacuaciones', 'liquidas', 'líquidas', 'sueltas',
            'frecuentes', 'aguadas', 'suelto', 'descompostura', 'chorro', 'chorros'
        ],
        studyNames: [
            'COPROCULTIVO',
            'COPROPARASITOSCOPICO',
            'EXAMEN GENERAL DE HECES'
        ],
        message: 'La diarrea persistente puede ser causada por bacterias, virus o parásitos. Es importante identificar el agente causante para un tratamiento adecuado.',
        priority: 5
    },
    {
        category: 'estrenimiento',
        keywords: [
            'estreñimiento', 'estrenimiento', 'estreñido', 'constipacion', 'constipación',
            'no evacuo', 'no hago', 'tapado', 'duro', 'difícil', 'evacuar'
        ],
        studyNames: [
            'EXAMEN GENERAL DE HECES',
            'QUIMICA SANGUINEA',
            'PERFIL TIROIDEO'
        ],
        message: 'El estreñimiento crónico puede relacionarse con problemas digestivos, tiroides o metabólicos.',
        priority: 4
    },
    {
        category: 'nauseas_vomito',
        keywords: [
            'nausea', 'náusea', 'nauseas', 'náuseas', 'vómito', 'vomito', 'ganas',
            'devolver', 'mareo', 'asco', 'arcada', 'arcadas', 'revuelto'
        ],
        studyNames: [
            'QUIMICA SANGUINEA',
            'BIOMETRIA HEMATICA',
            'EXAMEN GENERAL DE ORINA'
        ],
        message: 'Las náuseas y vómitos pueden indicar problemas digestivos, metabólicos o infecciones.',
        priority: 4
    },

    // ============================================
    // FATIGUE & ENERGY
    // ============================================
    {
        category: 'fatiga_cansancio',
        keywords: [
            'cansancio', 'cansado', 'cansada', 'fatiga', 'fatigado', 'agotado',
            'debilidad', 'débil', 'falta', 'energia', 'energía', 'sueño', 'somnolencia',
            'letargo', 'agotamiento', 'desgano', 'desgana', 'sin fuerzas', 'todo el dia',
            'todo el tiempo', 'siempre cansado'
        ],
        studyNames: [
            'BIOMETRIA HEMATICA',
            'GLUCOSA',
            'PERFIL TIROIDEO',
            'HIERRO',
            'FERRITINA',
            'VITAMINA B12'
        ],
        message: 'El cansancio crónico puede ser señal de anemia, diabetes, problemas de tiroides o deficiencias nutricionales. Estos estudios ayudarán a identificar la causa.',
        priority: 5
    },
    {
        category: 'debilidad_muscular',
        keywords: [
            'debilidad', 'débil', 'músculos', 'musculos', 'fuerza', 'flojo', 'floja',
            'sin fuerza', 'brazos débiles', 'piernas débiles'
        ],
        studyNames: [
            'BIOMETRIA HEMATICA',
            'CPK',
            'ELECTROLITOS',
            'QUIMICA SANGUINEA'
        ],
        message: 'La debilidad muscular puede relacionarse con problemas metabólicos, electrolitos o musculares.',
        priority: 4
    },

    // ============================================
    // PAIN SYMPTOMS
    // ============================================
    {
        category: 'dolor_cabeza',
        keywords: [
            'cabeza', 'dolor', 'duele', 'migraña', 'migrana', 'cefalea', 'jaqueca',
            'punzadas', 'palpita', 'presión', 'presion', 'mareo', 'mareado'
        ],
        studyNames: [
            'BIOMETRIA HEMATICA',
            'QUIMICA SANGUINEA',
            'PERFIL TIROIDEO',
            'GLUCOSA'
        ],
        message: 'Los dolores de cabeza frecuentes pueden relacionarse con anemia, presión arterial, problemas de tiroides o glucosa.',
        priority: 4
    },
    {
        category: 'dolor_muscular',
        keywords: [
            'dolor', 'músculos', 'musculos', 'muscular', 'articulaciones', 'coyunturas',
            'adolorido', 'adolorida', 'cuerpo cortado', 'todo me duele'
        ],
        studyNames: [
            'CPK',
            'Proteína C Reactiva',
            'Ácido Úrico',
            'Biometría Hemática'
        ],
        message: 'El dolor muscular generalizado puede indicar inflamación, problemas musculares o infecciones.',
        priority: 4
    },
    {
        category: 'dolor_articular',
        keywords: [
            'articulaciones', 'coyunturas', 'rodillas', 'codos', 'muñecas', 'tobillos',
            'hinchadas', 'inflamadas', 'rigidez', 'rígidas'
        ],
        studyNames: [
            'Ácido Úrico',
            'Proteína C Reactiva',
            'Factor Reumatoide',
            'Biometría Hemática'
        ],
        message: 'El dolor articular puede ser causado por gota, artritis u otras condiciones inflamatorias.',
        priority: 4
    },

    // ============================================
    // RESPIRATORY SYMPTOMS
    // ============================================
    {
        category: 'tos_gripe',
        keywords: [
            'tos', 'toser', 'toce', 'gripe', 'gripa', 'resfriado', 'catarro',
            'flema', 'flemas', 'congestion', 'congestión', 'moco', 'mocos',
            'escurrimiento', 'nasal', 'nariz', 'tapada'
        ],
        studyNames: [
            'Biometría Hemática',
            'Proteína C Reactiva',
            'Exudado Faríngeo'
        ],
        message: 'Los síntomas respiratorios persistentes pueden indicar infecciones bacterianas o virales que requieren evaluación.',
        priority: 4
    },
    {
        category: 'fiebre',
        keywords: [
            'fiebre', 'calentura', 'temperatura', 'caliente', 'escalofríos', 'escalofrios',
            'sudoracion', 'sudoración', 'temblores'
        ],
        studyNames: [
            'Biometría Hemática',
            'Examen General de Orina',
            'Proteína C Reactiva',
            'Procalcitonina'
        ],
        message: 'La fiebre es señal de infección. Estos estudios ayudan a identificar si es bacteriana, viral o de origen urinario.',
        priority: 5
    },

    // ============================================
    // URINARY SYMPTOMS
    // ============================================
    {
        category: 'problemas_orina',
        keywords: [
            'orino', 'orina', 'orinar', 'pis', 'pipi', 'micciones', 'baño',
            'frecuente', 'mucho', 'poco', 'dolor', 'arde', 'ardor', 'quema',
            'infeccion', 'infección', 'urinaria', 'cistitis'
        ],
        studyNames: [
            'EXAMEN GENERAL DE ORINA',
            'UROCULTIVO',
            'GLUCOSA',
            'CREATININA'
        ],
        message: 'Los problemas urinarios pueden indicar infección, diabetes o problemas renales.',
        priority: 5
    },
    {
        category: 'sed_excesiva',
        keywords: [
            'sed', 'seco', 'seca', 'resequedad', 'boca seca', 'mucha agua',
            'tomo mucha', 'deshidratado', 'deshidratada'
        ],
        studyNames: [
            'GLUCOSA',
            'HEMOGLOBINA GLUCOSILADA',
            'QUIMICA SANGUINEA',
            'ELECTROLITOS'
        ],
        message: 'La sed excesiva puede ser señal de diabetes o problemas metabólicos.',
        priority: 5
    },

    // ============================================
    // WEIGHT CHANGES
    // ============================================
    {
        category: 'perdida_peso',
        keywords: [
            'bajé', 'baje', 'perdí', 'perdi', 'peso', 'adelgace', 'adelgacé',
            'flaco', 'flaca', 'delgado', 'delgada', 'sin querer', 'sin hacer dieta'
        ],
        studyNames: [
            'Perfil Tiroideo',
            'Glucosa',
            'Biometría Hemática',
            'Química Sanguínea'
        ],
        message: 'La pérdida de peso inexplicable puede indicar problemas de tiroides, diabetes u otras condiciones metabólicas.',
        priority: 5
    },
    {
        category: 'aumento_peso',
        keywords: [
            'subí', 'subi', 'peso', 'engorde', 'engordé', 'gordo', 'gorda',
            'kilos', 'libras', 'rápido', 'rapido', 'sin comer mucho'
        ],
        studyNames: [
            'Perfil Tiroideo',
            'Glucosa',
            'Química Sanguínea',
            'Insulina'
        ],
        message: 'El aumento de peso repentino puede relacionarse con problemas de tiroides, resistencia a la insulina o metabólicos.',
        priority: 4
    },

    // ============================================
    // SKIN SYMPTOMS
    // ============================================
    {
        category: 'problemas_piel',
        keywords: [
            'piel', 'sarpullido', 'ronchas', 'manchas', 'picazón', 'picazon',
            'comezón', 'comezon', 'resequedad', 'escamosa', 'alergia', 'alergica',
            'rojo', 'roja', 'irritacion', 'irritación'
        ],
        studyNames: [
            'Biometría Hemática',
            'IgE Total',
            'Química Sanguínea',
            'Glucosa'
        ],
        message: 'Los problemas de piel pueden tener causas alérgicas, metabólicas o infecciosas.',
        priority: 3
    },

    // ============================================
    // HEART / CIRCULATION
    // ============================================
    {
        category: 'palpitaciones',
        keywords: [
            'palpitaciones', 'corazón', 'corazon', 'late', 'rápido', 'rapido',
            'fuerte', 'acelerado', 'taquicardia'
        ],
        studyNames: [
            'Perfil Tiroideo',
            'Electrolitos Séricos',
            'Biometría Hemática',
            'Química Sanguínea'
        ],
        message: 'Las palpitaciones pueden relacionarse con problemas de tiroides, electrolitos o cardiovasculares.',
        priority: 4
    },

    // ============================================
    // DIABETES SYMPTOMS
    // ============================================
    {
        category: 'sintomas_diabetes',
        keywords: [
            'diabetes', 'diabetico', 'diabético', 'azúcar', 'azucar', 'alta',
            'glucosa', 'mucha hambre', 'hambre', 'sed', 'orino mucho',
            'visión borrosa', 'vision borrosa', 'hormigueo', 'adormecimiento'
        ],
        studyNames: [
            'Glucosa',
            'Hemoglobina Glucosilada',
            'Insulina',
            'Perfil de Lípidos',
            'Creatinina'
        ],
        message: 'Estos síntomas pueden indicar diabetes o pre-diabetes. Es importante evaluarlos para prevenir complicaciones.',
        priority: 5
    },

    // ============================================
    // THYROID SYMPTOMS
    // ============================================
    {
        category: 'sintomas_tiroides',
        keywords: [
            'tiroides', 'cuello', 'hinchado', 'inflamado', 'cansancio extremo',
            'frio', 'frío', 'calor', 'sudoracion', 'sudoración', 'nervioso',
            'nerviosa', 'ansiedad', 'palpitaciones', 'pelo', 'cabello', 'cae'
        ],
        studyNames: [
            'Perfil Tiroideo',
            'TSH',
            'T3 Libre',
            'T4 Libre',
            'Anticuerpos Antitiroideos'
        ],
        message: 'Estos síntomas pueden indicar problemas de tiroides (hipo o hipertiroidismo) que afectan todo el metabolismo.',
        priority: 5
    },

    // ============================================
    // ANEMIA SYMPTOMS
    // ============================================
    {
        category: 'sintomas_anemia',
        keywords: [
            'anemia', 'anemico', 'anémico', 'pálido', 'palido', 'pálida', 'palida',
            'blanco', 'blanca', 'ojeras', 'mareo', 'mareado', 'cansancio',
            'fatiga', 'debilidad', 'uñas quebradizas', 'unas'
        ],
        studyNames: [
            'Biometría Hemática Completa',
            'Hierro Sérico',
            'Ferritina',
            'Transferrina',
            'Vitamina B12',
            'Ácido Fólico'
        ],
        message: 'Estos síntomas son característicos de anemia. Es importante identificar si es por falta de hierro, vitaminas u otra causa.',
        priority: 5
    },

    // ============================================
    // LIVER SYMPTOMS
    // ============================================
    {
        category: 'sintomas_higado',
        keywords: [
            'higado', 'hígado', 'amarillo', 'amarilla', 'ictericia', 'ojos',
            'piel', 'orina oscura', 'pipi oscuro', 'heces claras', 'popó blanca'
        ],
        studyNames: [
            'Perfil Hepático',
            'Bilirrubinas',
            'Transaminasas',
            'Fosfatasa Alcalina'
        ],
        message: 'Estos síntomas pueden indicar problemas hepáticos (del hígado) que requieren evaluación médica.',
        priority: 5
    },

    // ============================================
    // KIDNEY SYMPTOMS
    // ============================================
    {
        category: 'sintomas_rinon',
        keywords: [
            'riñon', 'riñón', 'rinones', 'riñones', 'espalda baja', 'lumbar',
            'dolor', 'orina', 'sangre', 'espuma', 'espumosa', 'hinchazón',
            'hinchazon', 'piernas', 'pies', 'cara'
        ],
        studyNames: [
            'Química Sanguínea',
            'Creatinina',
            'Urea',
            'Examen General de Orina',
            'Electrolitos Séricos'
        ],
        message: 'Estos síntomas pueden indicar problemas renales que requieren evaluación inmediata.',
        priority: 5
    },

    // ============================================
    // SEXUAL HEALTH
    // ============================================
    {
        category: 'problemas_sexuales',
        keywords: [
            'sexual', 'relaciones', 'flujo', 'descarga', 'secrecion', 'secreción',
            'picazon', 'picazón', 'ardor', 'mal olor', 'olor', 'dolor'
        ],
        studyNames: [
            'Examen General de Orina',
            'Cultivo Vaginal',
            'Perfil TORCH',
            'VDRL'
        ],
        message: 'Es importante descartar infecciones para proteger tu salud sexual.',
        priority: 4
    },

    // ============================================
    // WOMEN'S HEALTH - PCOS
    // ============================================
    {
        category: 'ovario_poliquistico',
        keywords: [
            'ovario', 'ovarios', 'poliquistico', 'poliquístico', 'poliquistica', 'poliquística',
            'sop', 'pcos', 'quistes', 'regla', 'menstruacion', 'menstruación', 'irregular',
            'ciclo', 'acne', 'acné', 'vello', 'hirsutismo', 'barba', 'bigote',
            'periodo', 'irregulares', 'ausente', 'amenorrea', 'infertilidad'
        ],
        studyNames: [
            'PERFIL HORMONAL',
            'TESTOSTERONA',
            '17 ALFA',
            'HIDROXIPROGESTERONA',
            'GLUCOSA',
            'INSULINA',
            'HEMOGLOBINA GLUCOSILADA',
            'PERFIL DE LIPIDOS',
            'QUIMICA SANGUINEA'
        ],
        message: 'El síndrome de ovario poliquístico requiere evaluación hormonal y metabólica completa. Estos estudios ayudarán a confirmar el diagnóstico y prevenir complicaciones.',
        priority: 5
    },

    // ============================================
    // GENERAL CHECKUP
    // ============================================
    {
        category: 'checkup_general',
        keywords: [
            'checkup', 'check-up', 'chequeo', 'revision', 'revisión', 'general',
            'completo', 'todo', 'rutina', 'anual', 'preventivo'
        ],
        studyNames: [
            'Biometría Hemática Completa',
            'Química Sanguínea',
            'Examen General de Orina',
            'Perfil de Lípidos'
        ],
        message: 'Un chequeo general te ayudará a conocer tu estado de salud actual y prevenir enfermedades.',
        priority: 3
    }
];
