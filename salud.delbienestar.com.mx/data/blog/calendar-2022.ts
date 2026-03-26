import { BlogCategory } from '../blog-posts-base';

export interface BlogTopic {
    date: string;
    title: string;
    category: BlogCategory;
    slug: string;
    keywords: string[];
}

export const BLOG_CALENDAR_2022: BlogTopic[] = [
    // ENERO 2022 - BÁSICOS
    { date: '2022-01-03', title: '¿Por qué la Biometría Hemática es el rey de los estudios?', category: 'Análisis Clínicos', slug: 'biometria-hematica-importancia', keywords: ['anemia', 'leucemia', 'infecciones'] },
    { date: '2022-01-10', title: 'Entendiendo tu Química Sanguínea de 6 elementos', category: 'Análisis Clínicos', slug: 'quimica-sanguinea-6-elementos', keywords: ['glucosa', 'urea', 'creatinina'] },
    { date: '2022-01-17', title: 'Examen General de Orina: Mucho más que una infección', category: 'Análisis Clínicos', slug: 'examen-general-orina-interpretacion', keywords: ['riñones', 'infección urinaria', 'cristales'] },
    { date: '2022-01-24', title: 'Tipos de sangre y su importancia en emergencias', category: 'Análisis Clínicos', slug: 'tipos-de-sangre-importancia', keywords: ['grupo sanguineo', 'rh', 'transfusión'] },

    // FEBRERO 2022 - CORAZÓN (Mes del amor/corazón)
    { date: '2022-01-31', title: 'Perfil de Lípidos: Colesterol Bueno vs Malo', category: 'Salud Cardiovascular', slug: 'perfil-lipidos-colesterol-hdl-ldl', keywords: ['colesterol', 'trigliceridos', 'riesgo cardiaco'] },
    { date: '2022-02-07', title: 'Hipertensión: El asesino silencioso', category: 'Salud Cardiovascular', slug: 'hipertension-asesino-silencioso', keywords: ['presión arterial', 'corazón', 'prevención'] },
    { date: '2022-02-14', title: '5 Alimentos que aman tu corazón', category: 'Nutrición y Vitaminas', slug: 'alimentos-salud-cardiovascular', keywords: ['dieta', 'omega 3', 'corazon'] },
    { date: '2022-02-21', title: 'Electrocardiograma: ¿Qué nos dice de tu ritmo?', category: 'Salud Cardiovascular', slug: 'electrocardiograma-basico', keywords: ['arritmia', 'infarto', 'ritmo cardiaco'] },

    // MARZO 2022 - MUJER (Mes de la mujer)
    { date: '2022-02-28', title: 'Papanicolaou: La prueba que salva vidas', category: 'Salud de la Mujer', slug: 'papanicolaou-importancia', keywords: ['vph', 'cancer cervicouterino', 'prevencion'] },
    { date: '2022-03-07', title: 'Perfil Hormonal Femenino: ¿Cuándo realizarlo?', category: 'Salud de la Mujer', slug: 'perfil-hormonal-femenino-guia', keywords: ['hormonas', 'ciclo menstrual', 'fertilidad'] },
    { date: '2022-03-14', title: 'Menopausia: Mitos y realidades', category: 'Salud de la Mujer', slug: 'menopausia-mitos-realidades', keywords: ['menopausia', 'estrogenos', 'calores'] },
    { date: '2022-03-21', title: 'Embarazo: Los estudios trimestre por trimestre', category: 'Salud de la Mujer', slug: 'estudios-embarazo-trimestres', keywords: ['embarazo', 'prenatal', 'ultrasonido'] },

    // ABRIL 2022 - NIÑOS
    { date: '2022-03-28', title: 'Check-up Infantil: ¿Qué estudios necesitan los niños?', category: 'Prevención y Check-ups', slug: 'check-up-infantil-guia', keywords: ['pediatria', 'crecimiento', 'analisis niños'] },
    { date: '2022-04-04', title: 'Parásitos intestinales: Detección y prevención', category: 'Salud General', slug: 'parasitos-intestinales-copro', keywords: ['coproparasitoscopico', 'niños', 'higiene'] },
    { date: '2022-04-11', title: 'Alergias vs Resfriado: ¿Cómo diferenciarlos?', category: 'Salud General', slug: 'alergias-vs-resfriado', keywords: ['ige', 'alergias', 'inmunologia'] },
    { date: '2022-04-18', title: 'La importancia del Tamiz Neonatal', category: 'Prevención y Check-ups', slug: 'tamiz-neonatal-importancia', keywords: ['bebe', 'enfermedades metabolicas', 'recien nacido'] },

    // MAYO 2022 - MATERNIDAD / TIROIDES
    { date: '2022-04-25', title: 'Tiroides y Embarazo: Una relación delicada', category: 'Salud de la Mujer', slug: 'tiroides-embarazo', keywords: ['hipotiroidismo', 'tsh', 'gestacion'] },
    { date: '2022-05-02', title: 'Perfil Tiroideo: TSH, T3 y T4 explicados', category: 'Hormonas y Metabolismo', slug: 'perfil-tiroideo-explicado', keywords: ['tiroides', 'hormonas', 'metabolismo'] },
    { date: '2022-05-09', title: 'Hipotiroidismo vs Hipertiroidismo', category: 'Hormonas y Metabolismo', slug: 'hipotiroidismo-vs-hipertiroidismo', keywords: ['peso', 'fatiga', 'sintomas'] },
    { date: '2022-05-16', title: 'Nódulos tiroideos: ¿Debo preocuparme?', category: 'Hormonas y Metabolismo', slug: 'nodulos-tiroideos', keywords: ['biopsia', 'cuello', 'endocrinologia'] },
    { date: '2022-05-23', title: 'Resistencia a la Insulina: El paso previo a la diabetes', category: 'Hormonas y Metabolismo', slug: 'resistencia-insulina-homa', keywords: ['indice homa', 'diabetes', 'peso'] },

    // JUNIO 2022 - HOMBRE (Día del padre)
    { date: '2022-05-30', title: 'Antígeno Prostático: ¿Por qué a partir de los 40?', category: 'Salud del Hombre', slug: 'antigeno-prostatico-40-anos', keywords: ['prostata', 'cancer', 'psa'] },
    { date: '2022-06-06', title: 'Testosterona baja: Síntomas y diagnóstico', category: 'Salud del Hombre', slug: 'testosterona-baja-sintomas', keywords: ['andropausia', 'libido', 'energia'] },
    { date: '2022-06-13', title: 'Check-up Masculino: La guía completa', category: 'Salud del Hombre', slug: 'check-up-masculino-guia', keywords: ['salud hombre', 'prevencion', 'analisis'] },
    { date: '2022-06-20', title: 'Enfermedades de Transmisión Sexual en hombres', category: 'Salud del Hombre', slug: 'ets-hombres-deteccion', keywords: ['ets', 'pcr', 'sexualidad'] },

    // JULIO 2022 - DIABETES / CRÓNICAS
    { date: '2022-06-27', title: 'Hemoglobina Glucosilada: Tu promedio de 3 meses', category: 'Enfermedades Crónicas', slug: 'hemoglobina-glucosilada-3-meses', keywords: ['diabetes', 'control', 'hba1c'] },
    { date: '2022-07-04', title: 'Pie Diabético: Prevención desde el laboratorio', category: 'Enfermedades Crónicas', slug: 'pie-diabetico-prevencion', keywords: ['diabetes', 'cuidado', 'infeccion'] },
    { date: '2022-07-11', title: 'Daño Renal por Diabetes: Microalbuminuria', category: 'Enfermedades Crónicas', slug: 'dano-renal-diabetes-microalbuminuria', keywords: ['riñon', 'albumina', 'orina'] },
    { date: '2022-07-18', title: 'Mitos sobre la insulina', category: 'Enfermedades Crónicas', slug: 'mitos-insulina', keywords: ['diabetes', 'tratamiento', 'miedo'] },

    // AGOSTO 2022 - NUTRICIÓN / VITAMINAS
    { date: '2022-07-25', title: 'Vitamina D: Más allá de los huesos', category: 'Nutrición y Vitaminas', slug: 'vitamina-d-inmunidad', keywords: ['sol', 'huesos', 'sistema inmune'] },
    { date: '2022-08-01', title: 'Vitamina B12 y el cansancio crónico', category: 'Nutrición y Vitaminas', slug: 'vitamina-b12-cansancio', keywords: ['anemia', 'energia', 'vegetarianos'] },
    { date: '2022-08-08', title: 'Hierro y Ferritina: Entendiendo la anemia', category: 'Nutrición y Vitaminas', slug: 'hierro-ferritina-anemia', keywords: ['sangre', 'mujer', 'fatiga'] },
    { date: '2022-08-15', title: 'Electrolitos: Hidratación correcta', category: 'Nutrición y Vitaminas', slug: 'electrolitos-hidratacion', keywords: ['sodio', 'potasio', 'deporte'] },
    { date: '2022-08-22', title: 'Magnesio: El mineral olvidado', category: 'Nutrición y Vitaminas', slug: 'magnesio-beneficios', keywords: ['musculos', 'sueño', 'estres'] },

    // SEPTIEMBRE 2022 - ESTILO DE VIDA
    { date: '2022-08-29', title: 'Cortisol: La hormona del estrés', category: 'Hormonas y Metabolismo', slug: 'cortisol-estres-impacto', keywords: ['estres', 'ansiedad', 'peso'] },
    { date: '2022-09-05', title: 'Hígado Graso: Diagnóstico y reversión', category: 'Enfermedades Crónicas', slug: 'higado-graso-diagnostico', keywords: ['higado', 'alcohol', 'dieta'] },
    { date: '2022-09-12', title: 'Ácido Úrico y la Gota', category: 'Análisis Clínicos', slug: 'acido-urico-gota', keywords: ['articulaciones', 'dolor', 'carne'] },
    { date: '2022-09-19', title: 'La importancia del ayuno antes de estudios', category: 'Salud General', slug: 'importancia-ayuno-estudios', keywords: ['preparacion', 'laboratorio', 'guia'] },

    // OCTUBRE 2022 - CÁNCER (Mes rosa)
    { date: '2022-09-26', title: 'Marcadores Tumorales: ¿Qué son?', category: 'Prevención y Check-ups', slug: 'marcadores-tumorales-explicados', keywords: ['cancer', 'deteccion', 'antigenos'] },
    { date: '2022-10-03', title: 'Autoexploración mamaria: Guía paso a paso', category: 'Salud de la Mujer', slug: 'autoexploracion-mamaria-guia', keywords: ['cancer de mama', 'prevencion', 'mujer'] },
    { date: '2022-10-10', title: 'Prevención del Cáncer Cervicouterino', category: 'Salud de la Mujer', slug: 'prevencion-cancer-cervicouterino', keywords: ['vph', 'papanicolaou', 'vacuna'] },
    { date: '2022-10-17', title: 'Marcador CA-125 y cáncer de ovario', category: 'Salud de la Mujer', slug: 'marcador-ca125-ovario', keywords: ['ovarios', 'deteccion', 'quistes'] },
    { date: '2022-10-24', title: 'PSA y Cáncer de Próstata: Lo que debes saber', category: 'Salud del Hombre', slug: 'psa-cancer-prostata-info', keywords: ['prostata', 'hombres', 'prevencion'] },

    // NOVIEMBRE 2022 - DIABETES (Día mundial)
    { date: '2022-10-31', title: 'Vivir plenamente con Diabetes', category: 'Enfermedades Crónicas', slug: 'vivir-con-diabetes', keywords: ['estilo de vida', 'dieta', 'ejercicio'] },
    { date: '2022-11-07', title: 'Curva de Tolerancia a la Glucosa: ¿Para qué sirve?', category: 'Análisis Clínicos', slug: 'curva-tolerancia-glucosa', keywords: ['diabetes', 'diagnostico', 'resistencia'] },
    { date: '2022-11-14', title: 'Diabetes Gestacional: Riesgos y control', category: 'Salud de la Mujer', slug: 'diabetes-gestacional-riesgos', keywords: ['embarazo', 'bebe', 'azucar'] },
    { date: '2022-11-21', title: 'Índice HOMA: Midiendo la resistencia a la insulina', category: 'Hormonas y Metabolismo', slug: 'indice-homa-explicado', keywords: ['insulina', 'peso', 'metabolismo'] },

    // DICIEMBRE 2022 - INVIERNO / CIERRE
    { date: '2022-11-28', title: 'Enfermedades Respiratorias en invierno', category: 'Salud General', slug: 'enfermedades-respiratorias-invierno', keywords: ['gripe', 'covid', 'influenza'] },
    { date: '2022-12-05', title: 'Influenza vs COVID-19: Diferencias en laboratorio', category: 'Análisis Clínicos', slug: 'influenza-vs-covid-diferencias', keywords: ['pruebas', 'sintomas', 'virus'] },
    { date: '2022-12-12', title: 'Cuidando tu peso en fiestas decembrinas', category: 'Nutrición y Vitaminas', slug: 'cuidar-peso-fiestas', keywords: ['dieta', 'navidad', 'salud'] },
    { date: '2022-12-19', title: 'El mejor regalo: Un Check-up de salud', category: 'Prevención y Check-ups', slug: 'regalo-salud-check-up', keywords: ['navidad', 'familia', 'bienestar'] },
    { date: '2022-12-26', title: 'Propósitos de salud para 2023', category: 'Salud General', slug: 'propositos-salud-2023', keywords: ['año nuevo', 'metas', 'habitos'] }
];
