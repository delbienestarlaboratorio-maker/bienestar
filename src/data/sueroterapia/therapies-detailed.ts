// Detailed therapy information database for sueroterapia modals and search

export interface TherapyDetails {
    id: number;
    slug: string;
    name: string;
    shortDesc: string; // Elevator pitch (2-3 lines)
    longDesc: string; // Full detailed description
    benefits: string[];
    ingredients: { name: string; amount?: string }[];
    duration: string;
    price: number;
    icon: string;
    color: string;
    image?: string; // Will add generated images later
    searchTerms: string[]; // For search functionality
    recommended: string;
}

export const therapiesDatabase: TherapyDetails[] = [
    {
        id: 1,
        slug: 'suero-energizante',
        name: 'Suero Energizante',
        shortDesc: 'Recupera tu energía natural y combate la fatiga crónica con un potente complejo de vitaminas B que actúa directamente en tu sistema nervioso.',
        longDesc: `El Suero Energizante es un tratamiento intravenoso especializado diseñado para personas que experimentan fatiga constante, falta de energía o agotamiento mental.

**¿Cómo funciona?**
Las vitaminas del complejo B son esenciales para la producción de energía celular. Al administrarse directamente en el torrente sanguíneo, bypaseamos el sistema digestivo y garantizamos que cada célula de tu cuerpo reciba los nutrientes necesarios para funcionar óptimamente.

**Ciencia detrás del tratamiento:**
La vitamina B12 (cianocobalamina) es crucial para la formación de glóbulos rojos y el funcionamiento del sistema nervioso. El ácido fólico trabaja sinérgicamente con la B12 para mejorar la división celular y la producción de ADN. El magnesio regula más de 300 reacciones enzimáticas en el cuerpo, incluyendo aquellas relacionadas con la producción de ATP (energía celular).

**Duración del efecto:**
Los efectos se sienten en las primeras 6-12 horas y pueden durar de 1 a 3 semanas, dependiendo del estilo de vida y nivel de actividad. Se recomienda una sesión mensual para mantenimiento óptimo de energía.`,
        benefits: [
            'Aumento notable de energía en 24 horas',
            'Mejora concentración y claridad mental',
            'Combate fatiga crónica y agotamiento',
            'Fortalece sistema nervioso',
            'Mejora calidad del sueño',
            'Reduce estrés y ansiedad',
            'No produce nerviosismo ni dependencia',
        ],
        ingredients: [
            { name: 'Vitamina B12 (Cianocobalamina)', amount: '1000 mcg' },
            { name: 'Vitamina B1 (Tiamina)', amount: '100 mg' },
            { name: 'Vitamina B2 (Riboflavina)', amount: '5 mg' },
            { name: 'Vitamina B3 (Niacinamida)', amount: '100 mg' },
            { name: 'Vitamina B5 (Ácido Pantoténico)', amount: '250 mg' },
            { name: 'Vitamina B6 (Piridoxina)', amount: '100 mg' },
            { name: 'Ácido Fólico', amount: '1 mg' },
            { name: 'Magnesio', amount: '400 mg' },
        ],
        duration: '30-45 min',
        price: 650,
        icon: 'Zap',
        color: 'from-yellow-500 to-orange-500',
        searchTerms: ['energía', 'energia', 'cansancio', 'fatiga', 'agotamiento', 'vitamina b', 'b12', 'concentración', 'mental'],
        recommended: 'Ideal para personas con cansancio crónico, estrés laboral, deportistas o estudiantes en época de exámenes.',
    },
    {
        id: 2,
        slug: 'suero-antioxidante',
        name: 'Suero Antioxidante',
        shortDesc: 'El tratamiento anti-envejecimiento más potente con glutatión y vitamina C para proteger tus células, aclarar tu piel y desintoxicar tu organismo.',
        longDesc: `El Suero Antioxidante es nuestro tratamiento premium anti-aging que combina los antioxidantes más poderosos para combatir el envejecimiento celular desde adentro.

**¿Por qué es tan efectivo?**
El glutatión es conocido como el "maestro antioxidante" porque es el único que puede reciclar otros antioxidantes como la vitamina C y E. Al administrarse en dosis altas por vía IV, los niveles sanguíneos de glutatión aumentan dramáticamente, ofreciendo protección celular superior.

**Beneficios para la piel:**
El glutatión inhibe la producción de melanina (el pigmento que oscurece la piel) al interferir con la enzima tirosinasa. Esto resulta en una piel más clara, uniforme y luminosa. La vitamina C estimula la producción de colágeno, mejorando la firmeza y elasticidad de la piel.

**Desintoxicación hepática:**
El hígado utiliza glutatión para conjugar y eliminar toxinas, metales pesados y medicamentos. Este tratamiento es esencial para personas expuestas a contaminación ambiental o que consumen medicamentos regularmente.

**Resultados visibles:**
Los pacientes reportan piel más luminosa en 3-5 sesiones, reducción de manchas en 5-8 sesiones, y efectos anti-aging notables después de 8-12 sesiones.`,
        benefits: [
            'Potente acción anti-envejecimiento celular',
            'Aclara y unifica el tono de piel',
            'Reduce manchas y melasma',
            'Desintoxica el hígado naturalmente',
            'Fortalece sistema inmunológico',
            'Mejora apariencia de piel y cabello',
            'Protege contra radicales libres',
            'Mejora textura y luminosidad de la piel',
        ],
        ingredients: [
            { name: 'Glutatión (Reducido)', amount: '1200 mg' },
            { name: 'Vitamina C (Ácido Ascórbico)', amount: '2000 mg' },
            { name: 'Vitamina E (Tocoferol)', amount: '400 UI' },
            { name: 'Selenio', amount: '200 mcg' },
            { name: 'Ácido Alfa Lipoico', amount: '100 mg' },
        ],
        duration: '45-60 min',
        price: 850,
        icon: 'Shield',
        color: 'from-purple-500 to-pink-500',
        searchTerms: ['antioxidante', 'antienvejecimiento', 'anti-aging', 'glutatión', 'glutathione', 'piel', 'manchas', 'aclarar', 'blanqueamiento', 'luminosa'],
        recommended: 'Perfecto para quienes buscan efectos anti-aging, aclarar manchas o fortalecer defensas.',
    },
    {
        id: 3,
        slug: 'suero-hidratante',
        name: 'Suero Hidratante',
        shortDesc: 'Rehidratación profunda e inmediata con electrolitos esenciales. El tratamiento perfecto para resaca, deshidratación o recuperación post-ejercicio.',
        longDesc: `El Suero Hidratante es la forma más rápida y efectiva de restaurar el equilibrio hídrico y electrolítico de tu cuerpo.

**La importancia de la hidratación IV:**
Cuando estás deshidratado, beber agua puede tardar horas en rehidratarte completamente porque el líquido debe pasar por el sistema digestivo. Con hidratación IV, los líquidos y electrolitos llegan directamente a tus células en minutos.

**Electrolitos esenciales:**
Los electrolitos (sodio, potasio, cloruro, calcio, magnesio) son minerales que conducen impulsos eléctricos en tu cuerpo. Son cruciales para la función muscular, nerviosa, cardíaca y cerebral. La deshidratación y el ejercicio intenso agotan estos minerales.

**¿Cuándo necesitas este tratamiento?**
- Después de alcohol (resaca)
- Ejercicio intenso o deportes
- Exposición al sol o calor
- Enfermedad con vómito o diarrea
- Viajes largos o jet lag
- Antes/después de eventos important es

**Resultados inmediatos:**
La mayoría de pacientes sienten alivio en los primeros 30 minutos del tratamiento. Los efectos completos (energía, claridad mental, eliminación de dolor de cabeza) se sienten dentro de 1-4 horas.`,
        benefits: [
            'Hidratación profunda e inmediata (100% absorción)',
            'Restaura electrolitos perdidos',
            'Alivia síntomas de resaca rápidamente',
            'Mejora función renal',
            'Acelera recuperación post-ejercicio',
            'Elimina toxinas vía orina',
            'Mejora presión arterial',
            'Reduce dolor de cabeza deshidratación',
        ],
        ingredients: [
            { name: 'Suero Fisiológico (Solución Salina 0.9%)', amount: '500 ml' },
            { name: 'Sodio (Na+)', amount: '154 mEq/L' },
            { name: 'Potasio (K+)', amount: '20 mEq' },
            { name: 'Cloruro (Cl-)', amount: '154 mEq/L' },
            { name: 'Calcio (Ca2+)', amount: '5 mEq' },
            { name: 'Magnesio (Mg2+)', amount: '3 mEq' },
        ],
        duration: '30 min',
        price: 450,
        icon: 'Droplets',
        color: 'from-blue-400 to-cyan-500',
        searchTerms: ['hidratación', 'hidratacion', 'resaca', 'cruda', 'deshidratación', 'electrolitos', 'recuperación', 'ejercicio'],
        recommended: 'Ideal después de ejercicio intenso, deshidratación, resaca o exposición prolongada al sol.',
    },
    {
        id: 4,
        slug: 'suero-deportivo',
        name: 'Suero Deportivo',
        shortDesc: 'Maximiza tu rendimiento atlético y acelera la recuperación muscular con aminoácidos esenciales, L-carnitina y electrolitos.',
        longDesc: `El Suero Deportivo es la herramienta secreta de atletas profesionales y entusiastas del fitness para optimizar rendimiento y recuperación.

**Aminoácidos de Cadena Ramificada (BCAAs):**
Los BCAAs (leucina, isoleucina, valina) son los únicos aminoácidos que el músculo puede metabolizar directamente para energía. Reducen el catabolismo muscular durante el ejercicio y aceleran la síntesis proteica después del entrenamiento.

**L-Carnitina para quemar grasa:**
La L-carnitina transporta ácidos grasos a las mitocondrias (las "centrales eléctricas" de las células) donde se queman para producir energía. Esto mejora la resistencia y facilita la pérdida de grasa corporal mientras preservas masa muscular.

**Taurina para rendimiento:**
La taurina mejora la contracción muscular, reduce el estrés oxidativo inducido por el ejercicio, y mejora el flujo sanguíneo a los músculos trabajando.

**¿Cuándo aplicarlo?**
- **Pre-competencia:** 24-48 horas antes de evento deportivo
- **Post-entrenamiento:** Dentro de 2-6 horas después de ejercicio intenso
- **Recuperación:** Durante periodos de entrenamiento intenso

**Resultados comprobados:**
Estudios muestran que la administración IV de BCAAs reduce el dolor muscular de aparición tardía (DOMS) en 30-50% y acelera la recuperación en 24-48 horas.`,
        benefits: [
            'Acelera recuperación muscular significativamente',
            'Reduce dolor post-entrenamiento (DOMS)',
            'Aumenta resistencia y rendimiento físico',
            'Mejora síntesis proteica muscular',
            'Previene catabolismo muscular',
            'Aumenta energía durante entrenamientos',
            'Mejora oxidación de grasas',
            'Hidratación profunda con electrolitos',
        ],
        ingredients: [
            { name: 'Leucina (BCAA)', amount: '2000 mg' },
            { name: 'Isoleucina (BCAA)', amount: '1000 mg' },
            { name: 'Valina (BCAA)', amount: '1000 mg' },
            { name: 'L-Carnitina', amount: '1000 mg' },
            { name: 'Taurina', amount: '1000 mg' },
            { name: 'Vitamina B6', amount: '100 mg' },
            { name: 'Vitamina B12', amount: '1000 mcg' },
            { name: 'Magnesio', amount: '400 mg' },
            { name: 'Electrolitos', amount: 'Completo' },
        ],
        duration: '45 min',
        price: 750,
        icon: 'Activity',
        color: 'from-green-500 to-emerald-600',
        searchTerms: ['deportivo', 'atleta', 'gym', 'ejercicio', 'rendimiento', 'recuperación', 'muscular', 'bcaa', 'aminoácidos'],
        recommended: 'Para atletas, gym-goers o cualquier persona con actividad física intensa.',
    },
    {
        id: 5,
        slug: 'suero-detox',
        name: 'Suero Detox',
        shortDesc: 'Limpieza profunda de toxinas acumuladas, metales pesados y radicales libres con el protocolo de desintoxicación más completo.',
        longDesc: `El Suero Detox es nuestro tratamiento de desintoxicación más completo, diseñado para limpiar tu cuerpo a nivel celular.

**¿Por qué necesitas desintoxicarte?**
Vivimos en un mundo lleno de toxinas: contaminación del aire, pesticidas en alimentos, plásticos, medicamentos, alcohol. Estas toxinas se acumulan en tejidos grasos, hígado, riñones e incluso cerebro. Con el tiempo, pueden causar fatiga, inflamación, aumento de peso y enfermedades crónicas.

**Glutatión: El desintoxicante maestro:**
En dosis altas (1500mg), el glutatión se convierte en el agente desintoxicante más poderoso. Actúa en dos fases de desintoxicación hepática, convirtiendo toxinas liposolubles en hidrosolubles para eliminarlas vía orina.

**N-Acetilcisteína (NAC):**
NAC es precursor de glutatión, lo que significa que tu cuerpo lo convierte en más glutatión. También adelgaza la mucosidad, mejora función pulmonar, y protege contra daño hepático.

**Ácido Alfa Lipoico:**
Este "antioxidante universal" es soluble tanto en agua como en grasa, lo que le permite actuar en todas las partes de la célula. Es especialmente efectivo para eliminar metales pesados como mercurio y plomo.

**Protocolo recomendado:**
Para desintoxicación completa, recomendamos 1 sesión semanal durante 4 semanas, seguido de 1 sesión mensual para mantenimiento.`,
        benefits: [
            'Limpia hígado y riñones profundamente',
            'Elimina metales pesados (plomo, mercurio)',
            'Reduce carga tóxica corporal',
            'Mejora digestión y metabolismo',
            'Aumenta claridad mental y energía',
            'Promueve pérdida de peso saludable',
            'Reduce inflamación sistémica',
            'Mejora función hepática (enzimas)',
        ],
        ingredients: [
            { name: 'Glutatión (Reducido)', amount: '1500 mg' },
            { name: 'N-Acetilcisteína (NAC)', amount: '600 mg' },
            { name: 'Ácido Alfa Lipoico', amount: '200 mg' },
            { name: 'Vitamina C', amount: '2000 mg' },
            { name: 'Complejo B (B1, B2, B3, B5, B6, B12)', amount: 'Completo' },
            { name: 'Magnesio', amount: '400 mg' },
        ],
        duration: '60 min',
        price: 900,
        icon: 'Leaf',
        color: 'from-lime-500 to-green-600',
        searchTerms: ['detox', 'desintoxicación', 'desintoxicacion', 'limpieza', 'toxinas', 'hígado', 'higado', 'glutatión', 'nac'],
        recommended: 'Ideal después de excesos alimenticios, consumo de alcohol o para iniciar un estilo de vida saludable.',
    },
    {
        id: 6,
        slug: 'suero-inmune',
        name: 'Suero Inmune',
        shortDesc: 'Refuerza tus defensas naturales con altas dosis de vitamina C, zinc y selenio para prevenir enfermedades y recuperarte más rápido.',
        longDesc: `El Suero Inmune es tu escudo protector contra virus, bacterias y enfermedades. Perfecto para temporada de gripes o cuando sientes que estás a punto de enfermarte.

**Vitamina C en megadosis (5000mg):**
A estas dosis terapéuticas, la vitamina C actúa como agente antiviral y antibacterial potente. Aumenta la producción de interferón (proteína antiviral natural), estimula la producción de glóbulos blancos, y mejora la función de los linfocitos T.

**La ciencia detrás del zinc:**
El zinc es crucial para el desarrollo y función de células inmunes. Reduce la duración de resfriados en 33% cuando se administra en las primeras 24 horas de síntomas. También tiene propiedades antivirales directas contra rinovirus (virus del resfriado común).

**Selenio: El mineral olvidado:**
El selenio es esencial para la función de células NK (natural killer) que destruyen células infectadas por virus. Deficiencia de selenio se asocia con mayor susceptibilidad a infecciones virales.

**Vitamina D3: La vitamina inmune:**
Más del 40% de la población tiene deficiencia de vitamina D. Esta "vitamina-hormona" modula la respuesta inmune y reduce inflamación crónica.

**¿Cuándo usarlo?**
- Inicio de temporada de gripes (septiembre-octubre)
- Primeros síntomas de resfriado
- Después de exposición a personas enfermas
- Antes de viajes (aeropuertos, aviones)
- Durante estrés alto (baja inmunidad)`,
        benefits: [
            'Refuerza sistema inmunológico dramáticamente',
            'Previene resfriados y gripes efectivamente',
            'Reduce duración de infecciones en 30-50%',
            'Combate radicales libres',
            'Acelera recuperación de enfermedades',
            'Aumenta producción de anticuerpos',
            'Mejora función de glóbulos blancos',
            'Efecto antiviral y antibacterial',
        ],
        ingredients: [
            { name: 'Vitamina C (Ácido Ascórbico)', amount: '5000 mg' },
            { name: 'Zinc (Gluconato)', amount: '50 mg' },
            { name: 'Selenio', amount: '200 mcg' },
            { name: 'Vitamina D3 (Colecalciferol)', amount: '10000 UI' },
            { name: 'Complejo B', amount: 'Completo' },
        ],
        duration: '40 min',
        price: 700,
        icon: 'Heart',
        color: 'from-red-500 to-rose-600',
        searchTerms: ['inmune', 'defensas', 'gripe', 'resfriado', 'vitamina c', 'zinc', 'prevención', 'prevencion'],
        recommended: 'Para prevención en temporada de gripes o cuando sientes que vas a enfermarte.',
    },
    // Additional therapies 7-10 with same detailed format...
];

// Helper function for search
export function searchTherapies(query: string): TherapyDetails[] {
    const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return therapiesDatabase.filter(therapy => {
        const matchesName = therapy.name.toLowerCase().includes(normalizedQuery);
        const matchesDesc = therapy.shortDesc.toLowerCase().includes(normalizedQuery);
        const matchesTerms = therapy.searchTerms.some(term =>
            term.toLowerCase().includes(normalizedQuery)
        );

        return matchesName || matchesDesc || matchesTerms;
    });
}

// Get therapy by slug
export function getTherapyBySlug(slug: string): TherapyDetails | undefined {
    return therapiesDatabase.find(t => t.slug === slug);
}
