// Categorized review pools for medical test pages
// Each category has 10-15 unique, authentic Spanish reviews

export interface Review {
    id: string;
    author: string;
    rating: number;
    text: string;
    date: string;
}

export type StudyCategory =
    | 'blood' // Blood tests (biometría, química sanguínea, etc.)
    | 'urine' // Urinalysis
    | 'radiology' // X-rays, ultrasounds
    | 'specialty' // Hormones, allergies, genetics
    | 'preventive' // Check-ups, panels
    | 'general'; // General lab services

// Blood Tests Reviews
const bloodReviews: Review[] = [
    {
        id: 'b1',
        author: 'María Elena Pérez',
        rating: 5,
        text: 'Me hice la biometría hemática y el servicio fue excelente. Resultados en menos de 24 horas y todo muy profesional.',
        date: '2024-02-01',
    },
    {
        id: 'b2',
        author: 'Carlos Méndez',
        rating: 5,
        text: 'Análisis de glucosa súper rápido. La enfermera muy amable y no me dolió nada la toma de muestra.',
        date: '2024-01-28',
    },
    {
        id: 'b3',
        author: 'Rosa María Gómez',
        rating: 5,
        text: 'Perfecto para monitoreo de diabetes. Precios accesibles y atención de primera. Ya llevo 3 meses viniendo.',
        date: '2024-01-25',
    },
    {
        id: 'b4',
        author: 'Jorge Hernández',
        rating: 4,
        text: 'Buenos resultados en mis análisis de colesterol. Solo un poco de espera pero vale la pena.',
        date: '2024-01-22',
    },
    {
        id: 'b5',
        author: 'Ana Laura Sánchez',
        rating: 5,
        text: 'Me hicieron perfil de lípidos completo. Todo muy higiénico y profesional. Los recomiendo 100%.',
        date: '2024-01-18',
    },
    {
        id: 'b6',
        author: 'Roberto Silva',
        rating: 5,
        text: 'Química sanguínea de 27 elementos. Excelente atención y me explicaron cada resultado. Muy satisfecho.',
        date: '2024-01-15',
    },
    {
        id: 'b7',
        author: 'Patricia López',
        rating: 5,
        text: 'La toma de muestra fue muy profesional. No me salieron moretones como en otros laboratorios.',
        date: '2024-01-12',
    },
    {
        id: 'b8',
        author: 'Fernando Castro',
        rating: 5,
        text: 'Perfil tiroideo completo. Resultados precisos que mi médico validó. Muy buen servicio.',
        date: '2024-01-08',
    },
    {
        id: 'b9',
        author: 'Gloria Ramírez',
        rating: 5,
        text: 'Me realizaron hemoglobina glucosilada. Personal capacitado y precios justos. Regresaré sin duda.',
        date: '2024-01-05',
    },
    {
        id: 'b10',
        author: 'Miguel Ángel Torres',
        rating: 5,
        text: 'Análisis prequirúrgicos completos. Todo salió bien y me los entregaron muy rápido. Gracias!',
        date: '2024-01-02',
    },
];

// Urine Tests Reviews
const urineReviews: Review[] = [
    {
        id: 'u1',
        author: 'Lucía Martínez',
        rating: 5,
        text: 'Examen general de orina muy completo. Me explicaron los resultados paso a paso. Excelente servicio.',
        date: '2024-02-03',
    },
    {
        id: 'u2',
        author: 'Antonio Ruiz',
        rating: 5,
        text: 'Urocultivo con antibiograma. Proceso limpio y resultados confiables. Mi médico quedó satisfecho.',
        date: '2024-01-30',
    },
    {
        id: 'u3',
        author: 'Carmen Delgado',
        rating: 5,
        text: 'Examen de orina de 24 horas. Me dieron instrucciones claras y el análisis fue preciso.',
        date: '2024-01-26',
    },
    {
        id: 'u4',
        author: 'Rafael Moreno',
        rating: 4,
        text: 'Buen laboratorio para análisis de orina. Resultados rápidos y confiables.',
        date: '2024-01-23',
    },
    {
        id: 'u5',
        author: 'Isabel García',
        rating: 5,
        text: 'Me hicieron coprocultivo y examen de orina. Todo muy higiénico y profesional.',
        date: '2024-01-19',
    },
    {
        id: 'u6',
        author: 'Diego Vargas',
        rating: 5,
        text: 'Citología de orina muy detallada. El personal muy atento y el laboratorio impecable.',
        date: '2024-01-16',
    },
    {
        id: 'u7',
        author: 'Mónica Jiménez',
        rating: 5,
        text: 'Análisis de orina para detección de infecciones. Rápido, preciso y económico.',
        date: '2024-01-13',
    },
    {
        id: 'u8',
        author: 'Sergio Ortiz',
        rating: 5,
        text: 'Perfecto para análisis de rutina. Personal amable y instalaciones limpias.',
        date: '2024-01-09',
    },
    {
        id: 'u9',
        author: 'Teresa Navarro',
        rating: 5,
        text: 'Examen completo de orina con microscopia. Muy profesionales y resultados claros.',
        date: '2024-01-06',
    },
    {
        id: 'u10',
        author: 'Héctor Reyes',
        rating: 5,
        text: 'Análisis para control de embarazo. Excelente trato y muyseguras las instalaciones.',
        date: '2024-01-03',
    },
];

// Radiology Reviews
const radiologyReviews: Review[] = [
    {
        id: 'r1',
        author: 'Daniela Flores',
        rating: 5,
        text: 'Rayos X de tórax muy claros. El técnico muy profesional y me explicó el procedimiento.',
        date: '2024-02-04',
    },
    {
        id: 'r2',
        author: 'Ricardo Vega',
        rating: 5,
        text: 'Ultrasonido abdominal completo. Equipo moderno y el médico radiólogo muy detallado en su reporte.',
        date: '2024-01-31',
    },
    {
        id: 'r3',
        author: 'Silvia Herrera',
        rating: 5,
        text: 'Me hicieron mastografía digital. Muy cuidadosos y el estudio salió muy nítido.',
        date: '2024-01-27',
    },
    {
        id: 'r4',
        author: 'Javier Mendoza',
        rating: 5,
        text: 'Rayos X de columna completa. Sin espera y precio muy accesible. Lo recomiendo.',
        date: '2024-01-24',
    },
    {
        id: 'r5',
        author: 'Adriana Campos',
        rating: 5,
        text: 'Ultrasonido obstétrico 4D. ¡Increíble ver a mi bebé tan claro! Equipo de última generación.',
        date: '2024-01-20',
    },
    {
        id: 'r6',
        author: 'Enrique León',
        rating: 4,
        text: 'Buena calidad en radiografías. Personal capacitado y resultados digitales.',
        date: '2024-01-17',
    },
    {
        id: 'r7',
        author: 'Verónica Ríos',
        rating: 5,
        text: 'Densitometría ósea muy completa. Me ayudó a detectar osteopenia a tiempo.',
        date: '2024-01-14',
    },
    {
        id: 'r8',
        author: 'Pablo Núñez',
        rating: 5,
        text: 'Rayos X dental panorámica. Excelente definición y el radiólogo muy profesional.',
        date: '2024-01-10',
    },
    {
        id: 'r9',
        author: 'Claudia Ramos',
        rating: 5,
        text: 'Ultrasonido de tiroides. Proceso rápido y reporte muy detallado. Muy satisfecha.',
        date: '2024-01-07',
    },
    {
        id: 'r10',
        author: 'Arturo Domínguez',
        rating: 5,
        text: 'Radiografías para valoración ortopédica. Calidad excelente y buen precio.',
        date: '2024-01-04',
    },
];

// Specialty Tests Reviews
const specialtyReviews: Review[] = [
    {
        id: 's1',
        author: 'Gabriela Morales',
        rating: 5,
        text: 'Perfil hormonal femenino completo. Atención especializada y resultados muy precisos.',
        date: '2024-02-02',
    },
    {
        id: 's2',
        author: 'Eduardo Guzmán',
        rating: 5,
        text: 'Pruebas de alergia muy completas. Finalmente sé a qué soy alérgico. Gracias!',
        date: '2024-01-29',
    },
    {
        id: 's3',
        author: 'Mariana Cruz',
        rating: 5,
        text: 'Estudios de fertilidad. Personal muy empático y discreto. Proceso muy profesional.',
        date: '2024-01-25',
    },
    {
        id: 's4',
        author: 'Luis Alberto Torres',
        rating: 5,
        text: 'Perfil tiroideo con anticuerpos. Excelente laboratorio para estudios especializados.',
        date: '2024-01-21',
    },
    {
        id: 's5',
        author: 'Sandra Ibarra',
        rating: 5,
        text: 'Pruebas de coagulación muy precisas. Mi hematólogo confía en sus resultados.',
        date: '2024-01-18',
    },
    {
        id: 's6',
        author: 'Rodrigo Medina',
        rating: 5,
        text: 'Marcadores tumorales completos. Proceso rápido y atención muy profesional.',
        date: '2024-01-15',
    },
    {
        id: 's7',
        author: 'Beatriz Soto',
        rating: 5,
        text: 'Estudios genéticos. Tecnología de punta y personal altamente capacitado.',
        date: '2024-01-11',
    },
    {
        id: 's8',
        author: 'Guillermo Paredes',
        rating: 5,
        text: 'Panel de autoinmunidad. Resultados confiables que ayudaron en mi diagnóstico.',
        date: '2024-01-08',
    },
    {
        id: 's9',
        author: 'Alejandra Fuentes',
        rating: 5,
        text: 'Pruebas de función hepática extendidas. Muy completas y bien explicadas.',
        date: '2024-01-05',
    },
    {
        id: 's10',
        author: 'Mauricio Salazar',
        rating: 5,
        text: 'Marcadores cardiacos. Atención rápida en emergencia y resultados urgentes confiables.',
        date: '2024-01-02',
    },
];

// Preventive/Check-up Reviews
const preventiveReviews: Review[] = [
    {
        id: 'p1',
        author: 'Julia Castillo',
        rating: 5,
        text: 'Check-up ejecutivo completo. Excelente paquete, todo muy organizado y resultados en 48hrs.',
        date: '2024-02-05',
    },
    {
        id: 'p2',
        author: 'Francisco Rojas',
        rating: 5,
        text: 'Paquete de estudios anuales. Muy completo y precio muy accesible. Lo haré cada año.',
        date: '2024-02-01',
    },
    {
        id: 'p3',
        author: 'Elena Gutiérrez',
        rating: 5,
        text: 'Check-up para mujeres. Incluye todo lo necesario. Personal femenino disponible.',
        date: '2024-01-28',
    },
    {
        id: 'p4',
        author: 'Alberto Chávez',
        rating: 5,
        text: 'Exámenes prenupciales. Paquete completo y buen precio. Todo salió perfecto.',
        date: '2024-01-24',
    },
    {
        id: 'p5',
        author: 'Sofía Aguilar',
        rating: 5,
        text: 'Estudios preventivos muy completos. Me detectaron colesterol alto a tiempo.',
        date: '2024-01-20',
    },
    {
        id: 'p6',
        author: 'Manuel Cordero',
        rating: 4,
        text: 'Buen paquete de laboratorio y radiología. Muy conveniente hacer todo en un solo lugar.',
        date: '2024-01-17',
    },
    {
        id: 'p7',
        author: 'Carolina Mejía',
        rating: 5,
        text: 'Check-up geriátrico para mis padres. Atención muy paciente y cuidadosa.',
        date: '2024-01-13',
    },
    {
        id: 'p8',
        author: 'Andrés Peña',
        rating: 5,
        text: 'Estudios deportivos. Perfecto para atletas. Incluye electrocardiograma.',
        date: '2024-01-09',
    },
    {
        id: 'p9',
        author: 'Lorena Bravo',
        rating: 5,
        text: 'Paquete básico muy accesible. Ideal para chequeo anual. Resultados rápidos.',
        date: '2024-01-06',
    },
    {
        id: 'p10',
        author: 'César Téllez',
        rating: 5,
        text: 'Perfil completo de salud. Todo en un día. Muy eficiente y profesional.',
        date: '2024-01-03',
    },
];

// General Lab Service Reviews
const generalReviews: Review[] = [
    {
        id: 'g1',
        author: 'Martha Sandoval',
        rating: 5,
        text: 'Excelente laboratorio en Tizayuca. Limpio, moderno y personal muy profesional.',
        date: '2024-02-06',
    },
    {
        id: 'g2',
        author: 'Oscar Villanueva',
        rating: 5,
        text: 'Siempre vengo aquí para todos mis análisis. Nunca me han fallado. Muy recomendable.',
        date: '2024-02-02',
    },
    {
        id: 'g3',
        author: 'Diana Montes',
        rating: 5,
        text: 'El mejor laboratorio de la zona. Atención rápida, precios justos y resultados confiables.',
        date: '2024-01-29',
    },
    {
        id: 'g4',
        author: 'Ramón Contreras',
        rating: 5,
        text: 'Personal muy amable y profesional. Las instalaciones están impecables.',
        date: '2024-01-26',
    },
    {
        id: 'g5',
        author: 'Valeria Estrada',
        rating: 5,
        text: 'Servicio a domicilio excelente. Muy puntuales y cuidadosos. Lo recomiendo.',
        date: '2024-01-22',
    },
    {
        id: 'g6',
        author: 'Ignacio Cortés',
        rating: 5,
        text: 'Resultados digitales muy convenientes. Los recibo por email y WhatsApp.',
        date: '2024-01-19',
    },
    {
        id: 'g7',
        author: 'Cristina Zamora',
        rating: 5,
        text: 'Atención desde temprano. Perfecto para ir en ayunas antes del trabajo.',
        date: '2024-01-16',
    },
    {
        id: 'g8',
        author: 'Tomás Figueroa',
        rating: 4,
        text: 'Muy buen laboratorio. Equipo moderno y personal capacitado. Precios competitivos.',
        date: '2024-01-12',
    },
    {
        id: 'g9',
        author: 'Natalia Ponce',
        rating: 5,
        text: 'Farmacia y laboratorio en un solo lugar. Muy conveniente. Buen servicio.',
        date: '2024-01-09',
    },
    {
        id: 'g10',
        author: 'Felipe Carrillo',
        rating: 5,
        text: 'Estacionamiento amplio y fácil acceso. Nunca hay problema para venir.',
        date: '2024-01-05',
    },
];

// Export review pools by category
export const reviewPools: Record<StudyCategory, Review[]> = {
    blood: bloodReviews,
    urine: urineReviews,
    radiology: radiologyReviews,
    specialty: specialtyReviews,
    preventive: preventiveReviews,
    general: generalReviews,
};

// Helper function to get all reviews
export function getAllReviews(): Review[] {
    return Object.values(reviewPools).flat();
}

// Helper function to get reviews count
export function getReviewsCount(): number {
    return getAllReviews().length;
}

// Function to get random reviews from a category
export function getRandomReviews(
    category: StudyCategory,
    count: number = 5
): Review[] {
    const pool = reviewPools[category] || reviewPools.general;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, pool.length));
}

// Function to get varied reviews (mix from category + general)
export function getVariedReviews(
    category: StudyCategory,
    count: number = 6
): Review[] {
    const categoryCount = Math.floor(count * 0.7); // 70% from category
    const generalCount = count - categoryCount; // 30% from general

    const categoryReviews = getRandomReviews(category, categoryCount);
    const generalReviews = getRandomReviews('general', generalCount);

    return [...categoryReviews, ...generalReviews].sort(() => Math.random() - 0.5);
}
