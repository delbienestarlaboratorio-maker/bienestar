// Comprehensive search synonyms database for medical studies
// This allows users to search using common abbreviations and alternative names

export const studySynonyms: Record<string, string[]> = {
    // Análisis de sangre comunes
    'examen-general-de-orina': ['ego', 'orina', 'urinálisis', 'examen de orina', 'uro', 'urocultivo', 'ex orina'],
    'biometria-hematica': ['bh', 'biometria', 'sangre', 'hemograma', 'conteo sanguineo', 'biometría', 'csc', 'complete blood count'],
    'quimica-integral-de-45-elementos': ['qs', 'q45', 'quimica', 'quimica sanguinea', 'perfil metabolico', 'química sanguínea', 'química 45'],
    'quimica-sanguinea': ['qs', 'química', 'glucosa', 'perfil bioquímico'],

    // Perfiles comunes
    'perfil-tiroideo-en-suero': ['tiroides', 'tsh', 't3', 't4', 'perfil tiroideo', 'hormonas tiroideas'],
    'perfil-lipidico': ['colesterol', 'triglicéridos', 'hdl', 'ldl', 'lípidos', 'grasas'],
    'perfil-hepatico': ['hígado', 'transaminasas', 'tgo', 'tgp', 'hepático', 'función hepática'],
    'perfil-renal': ['riñón', 'creatinina', 'urea', 'bun', 'función renal'],

    // Vitaminas y minerales
    '25-hidroxi-vitamina-d-total-calciferol': ['vitamina d', 'vit d', 'calciferol', 'hidroxivitamina d'],
    'vitamina-b12': ['b12', 'cobalamina', 'vit b12'],
    'acido-folico': ['ácido fólico', 'folato', 'vitamina b9'],
    'hierro-serico': ['hierro', 'fe', 'hierro en sangre'],

    // Hormonas
    'test-prenatal-no-invasivo-nipt-aneuploidias-y-microdeleciones': ['nipt', 'prenatal', 'adn fetal', 'test prenatal'],
    'psa': ['antígeno prostático', 'próstata', 'prostata'],
    'testosterona': ['testosterona total', 'andrógenos'],
    'estradiol': ['estrógenos', 'e2', 'hormona femenina'],
    'progesterona': ['hormona lutea'],

    // Imagen
    'rx-de-torax-postero-anterior': ['rayos x', 'radiografía', 'rx torax', 'radiografia de torax', 'placa de torax'],
    'electrocardiograma-digital-en-reposo': ['ecg', 'ekg', 'electrocardiograma', 'corazón', 'cardiograma'],
    'ultrasonido': ['ecografia', 'eco', 'us', 'sonograma'],

    // Infecciones
    'prueba-rapida-ag-duo-deteccion-covid-19influenza-ab': ['covid', 'coronavirus', 'influenza', 'gripe', 'antígeno'],
    'vih': ['sida', 'virus inmunodeficiencia', 'hiv', 'elisa'],
    'vdrl': ['sífilis', 'treponema', 'lúes'],
    'hepatitis': ['hep', 'hepatitis b', 'hepatitis c'],

    // Pruebas especializadas
    'prueba-de-aliento-para-helicobacter-pylori': ['h pylori', 'helicobacter', 'bacteria estómago', 'úlcera'],
    'panel-cancer-hereditario-ngs': ['cáncer', 'cancer hereditario', 'genético', 'brca'],
    'hemoglobina-glucosilada': ['hba1c', 'a1c', 'diabetes', 'glucosa promedio'],

    // Embarazo
    'prueba-de-embarazo': ['beta hcg', 'gonadotropina', 'embarazo'],
    'ultrasonido-obstetrico': ['eco embarazo', 'ultrasonido prenatal', 'bebé'],

    // Alergias
    'panel-alergias': ['alergias', 'ige', 'inmunoglobulina e'],

    // Marcadores tumorales
    'ca-125': ['cancer ovario', 'marcador tumoral'],
    'ca-19-9': ['cancer páncreas', 'marcador tumoral'],
    'cea': ['antígeno carcinoembrionario', 'cancer colon'],
    'afp': ['alfa fetoproteína', 'cancer hígado'],
};

// Helper function to get all search terms for a study
export function getStudySearchTerms(studySlug: string): string[] {
    return studySynonyms[studySlug] || [];
}

// Helper function to search studies by synonym
export function searchStudiesBySynonym(query: string): string[] {
    const lowerQuery = query.toLowerCase().trim();
    const matchingSlugs: string[] = [];

    for (const [slug, synonyms] of Object.entries(studySynonyms)) {
        if (synonyms.some(syn => syn.toLowerCase().includes(lowerQuery))) {
            matchingSlugs.push(slug);
        }
    }

    return matchingSlugs;
}
