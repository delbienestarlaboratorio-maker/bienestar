const fs = require('fs');
const path = require('path');
const OUTPUT = path.join(__dirname, 'src', 'data', 'symptoms-quality.json');

const TOP60_LOTE2 = [
    {
        slug: "dolor-de-espalda-baja",
        name: "Dolor de Espalda Baja",
        medicalName: "Lumbalgia Mecánica / Dolor Lumbar Inespecífico",
        cie10: "M54.5",
        intro: "El dolor de espalda baja (lumbalgia) es la principal causa de discapacidad laboral en el mundo y afecta al 80% de los adultos al menos una vez en su vida. En el 85-90% de los casos se trata de lumbalgia 'mecánica' o inespecífica: el dolor proviene de una distensión microscópica de músculos, ligamentos o fascias lumbares, sin afectación demostrable de los discos intervertebrales ni de los nervios espinales. El sedentarismo prolongado ('enfermedad del estar sentado'), la obesidad abdominal (que desplaza el centro de gravedad hacia adelante exigiendo sobreesfuerzo lumbar) y la debilidad del core (músculos abdominales profundos) son los principales cofactores. La historia natural es favorable: el 90% mejora espontáneamente en 4 a 6 semanas, pero el 60% tendrá recurrencias al año si no modifica sus factores biomecánicos.",
        causes: [
            { name: "Distensión Musculo-Ligamentosa Lumbar (Strain/Sprain)", desc: "Es un microdesgarro de la musculatura paravertebral o de los ligamentos iliolumbares por un movimiento súbito (levantar peso con flexión y rotación torsión), mala técnica deportiva o sobreestiramiento forzado. Genera un espasmo muscular reflejo doloroso que bloquea el movimiento para 'entablillar' y proteger la columna temporalmente. Representa el 70% de las lumbalgias agudas." },
            { name: "Degeneración del Disco Intervertebral (Discartrosis)", desc: "A partir de los 30 años, el núcleo pulposo de los discos lumbares pierde proteoglicanos e hidratación, encogiendo el disco y reduciendo el espacio intervertebral. El anillo fibroso externo desarrolla microfisuras dolorosas y pierde su capacidad de amortiguación. El dolor es sordo, empeora al estar sentado o flexionado y mejora al caminar o tumbarse." },
            { name: "Disfunción de las Articulaciones Facetarias (Síndrome Facetario)", desc: "Las carillas articulares posteriores que unen cada vértebra desarrollan osteoartritis por sobrecarga secundaria al desgaste del disco ('cascada degenerativa de Kirkaldy-Willis'). Genera dolor lumbar localizado que empeora característicamente con la extensión de la columna (inclinarse hacia atrás) y rotación prolongada o al estar mucho tiempo de pie en extensión." },
            { name: "Debilidad de la Musculatura Profunda (Core) e Inestabilidad", desc: "El transverso del abdomen y los multífidos lumbares actúan como un 'corsé anatómico'. Su atrofia por sedentarismo crónico genera micromovimientos aberrantes entre las vértebras. Esta pérdida de estabilidad dinámica recarga crónicamente las estructuras pasivas (ligamentos, cápsulas), generando fatiga y dolor lumbar insidioso al final del día." },
            { name: "Sacroileítis Mecánica (Disfunción Sacroilíaca)", desc: "La inflamación o bloqueo de la articulación entre el sacro y el ílion genera el 15-30% de las lumbalgias crónicas no radiculares. Frecuente tras partos o traumatismos pélvicos. El dolor se ubica muy bajo en la zona lumbar lateral / glúteo alto, típicamente unilateral, y se agrava al cambiar de posición de sentado a de pie." }
        ],
        redFlags: [
            "Lumbalgia + retención urinaria o incontinencia reciente + anestesia en silla de montar: Síndrome de Cauda Equina — emergencia neuroquirúrgica inmediata (<6h).",
            "Lumbalgia constante, nocturna, que no alivia con reposo ni antiinflamatorios, con pérdida de peso o antecedente de cáncer: descartar metástasis osteolítica vertebral.",
            "Lumbalgia + fiebre + escalofríos o paciente inmunodeprimido: descartar espondilodiscitis infecciosa o absceso epidural.",
            "Deficit motor progresivo (ej. pie caído brusco) o debilidad severa en piernas asociada a lumbalgia aguda: posible hernia discal extruida comprimiendo raíz motora."
        ],
        tests: [
            { name: "Resonancia Magnética Lumbar SIN Contraste (solo si hay banderas rojas o falta de mejoría a las 6 semanas)", url: "/estudios/imagenologia/resonancia-magnetica" },
            { name: "Radiografía Dinámica Lumbar (Flexión/Extensión para inestabilidad)", url: "/estudios/rayos-x/columna-lumbar" }
        ],
        tools: [
            { name: "Cuestionario de Discapacidad por Dolor Lumbar de Oswestry", url: "/herramientas/cuestionario-oswestry-lumbalgia" }
        ]
    },
    {
        slug: "ansiedad-generalizada",
        name: "Ansiedad Generalizada",
        medicalName: "Trastorno de Ansiedad Generalizada (TAG)",
        cie10: "F41.1",
        intro: "El trastorno de ansiedad generalizada (TAG) se caracteriza por una preocupación crónica, incontrolable y excesiva (ansiedad anticipatoria) que persiste durante al menos 6 meses y afecta múltiples ámbitos (salud, finanzas, trabajo, familia) sin un peligro evidente. Fisiológicamente, implica una hiperactividad sostenida de la amígdala (centro del miedo) y del núcleo locus ceruleus y una disfunción del freno inhibitorio en la corteza prefrontal prefrontal y del sistema GABAérgico. Físicamente se manifiesta con tensión muscular crónica (frecuente dolor de cuello/hombros), fatiga inexplicable, irritabilidad y trastornos del sueño. Representa el síndrome psiquiátrico de mayor prevalencia en consultas de atención primaria en México.",
        causes: [
            { name: "Hiperactividad Amigdalina y Déficit GABA", desc: "La amígdala cerebral se dispara constantemente enviando señales de peligro al hipotálamo, sin importar la magnitud real del riesgo ('falsa alarma metabólica'). Simultáneamente, los receptores para GABA (el principal neurotransmisor relajante y sedante, blanco de las benzodiazepinas) están disminuidos en número o sensibilidad, impidiendo un retorno eficaz al estado de calma basal." },
            { name: "Desregulación Serotoninérgica y Noradrenérgica", desc: "La reducción de serotonina en vías límbico prefrontales favorece el pensamiento rumiante y obsesivo. A la par, el exceso de noradrenalina desde el locus coeruleus mantiene al sistema nervioso simpático en alerta crónica, causando palpitaciones, sudoración fría, náuseas e inquietud psicomotriz permanente ('sentirse siempre al límite')." },
            { name: "Estrés Crónico y Epigenética (Alostasia)", desc: "Las vivencias traumáticas en la infancia, el bullying sostenido o el estrés financiero o relacional sostenido en adultos modifican el genoma a través de la metilación del ADN (epigenética). Convierten el eje HH (hipotálamo hipofisario) en un sistema hiper-reactivo y lento en apagarse. La exposición crónica a cortisol alto genera toxicidad en el hipocampo, bloqueando el aprendizaje 'racional' de que no hay peligro." },
            { name: "Predisposición Genética Familiar", desc: "El TAG tiene una heredabilidad demostrada del 30-40%. Los hijos de padres con TAG tienen tasas altas de poseer variaciones en el gen transportador de serotonina (5-HTTLPR - alelo corto) que predice mayor reactividad de la amígdala frente a situaciones emocionalmente inciertas." },
            { name: "Estilo de Vida y Neurotoxicantes Funcionales", desc: "El exceso de cafeína (>400mg/día), el alcohol (cuyo rebote o abstinencia induce un profundo déficit GABA), la privación crónica de sueño (<6 horas/noche) y las redes sociales de estímulo corto (tiktokización) bombardean el sistema dopaminérgico y elevan el sistema noradrenérgico basal de forma iatrogénica en sujetos de base sensible." }
        ],
        redFlags: [
            "Aparición abrupta de síntomas de ansiedad severa con pérdida de peso rñapida, palpitaciones y exoftalmos — descartar Hipertiroidismo / Enfermedad de Graves en evolución.",
            "Ataques de pánico incapacitantes que inician tras consumo de sustancias aparentemente lícitas (suplementos tiroideos, anfetaminas de dieta, bebidas energéticas).",
            "Estado de ansiedad intensa en paciente mayor sin antecedentes psiquiátricos, acompañado de sudoración profunda — sospecha de isquemia silente o arritmia de nueva aparición (riesgo de origen orgánico cardíaco).",
            "Ideas de muerte pasiva recurrentes generadas por la intolerancia al sufrimiento somático y agotamiento psicológico de la ansiedad — urgencia psiquiátrica."
        ],
        tests: [
            { name: "Perfil Tiroideo Completo (TSH, T4L, T3) — descartar hipertiroidismo orgánico crónico", url: "/estudios/analisis-clinicos/perfil-tiroideo" },
            { name: "Metanefrinas Libres en Plasma — Sospecha rara de Feocromocitoma", url: "/estudios/analisis-clinicos/quimica-sanguinea" }
        ],
        tools: [
            { name: "Cuestionario de Ansiedad GAD-7 (Tamizaje General Internacional)", url: "/herramientas/cuestionario-gad7-ansiedad" }
        ]
    },
    {
        slug: "tos-seca-persistente",
        name: "Tos Seca Persistente",
        medicalName: "Tos Crónica Intratable / Tos No Productiva Crónica",
        cie10: "R05",
        intro: "La tos seca persistente —tos sin expectoración flema con más de >8 semanas ininterrumpidas de evolución— es un enigma diagnóstico frecuente, altamente frustrante e incisivo emocionalmente para el adulto en México, donde detona fatiga muscular torácica. En 90% de pacientes con radiografía torácica normal en fumadores, se debe a una tríada unificada: Reflujo Gastroesofágico Laringofaríngeo (silente), Síndrome de Goteo Posnasal (tos alostática) y Asma Variante Tos. Fisiológicamente reside en un reflejo mecánico irritativo crónico de hipersensibilidad en el sistema nervioso vago a nivel laringo glótico superior inducido por microaspiración, neuroinflamación mediada por ácido gástrico o histamina.",
        causes: [
            { name: "Síndrome de Goteo Posnasal / Tos de las Vías Aéreas Superiores (STVAS)", desc: "La rinitis alérgica crónica o sinusitis genera moco viscoso que fluye internamente (goteo hacia atrás por la nasofaringe) estimulando mecánicamente los receptores superficiales aferentes laríngeos y cuerdas vocales, produciendo hipersensibilidad de reflejo de la tos persistente paroxística, comúnmente en la albas (noche-día o de cúbito supino)." },
            { name: "Asma en Variante de Tos (Cough Variant Asthma - CVA)", desc: "A diferencia del asma convencional que genera sibilancias clásicas, la variante CVA manifiesta la hiperreactividad bronquial y broncoconstricción únicamente a través de la tos. Frecuentemente desencadenada por aire frío de la madrugada o ejercicio físico y risa. Representa hasta un 25% de la tos seca inexplicada." },
            { name: "Reflujo Gastroesofágico Silente / Extraesofágico (ERGE Laringofaríngeo)", desc: "El ácido del estómago y la pepsina suben hacia la faringe microaspirándose a nivel bronquial silente de noche, o irritando los reflejos vagales laringofaríngeos del esófago (broncoespasmo inducido por nervio vago). Representa hasta una tercera parte de casos crónicos; en el 75% el paciente NO siente agruras típicas ni pirosis (es un 'reflujo silente puramente respiratorio')." },
            { name: "Fármacos IECA (Enalapril, Captopril, Lisinopril)", desc: "Los medicamentos 'terminados en PRIL' bloqueadores del sistema enzima convertidora en la tensión arterial inhiben la descomposición natural de proteónas vasoactivas como la bradicinina pulmonar. Estas moléculas se acumulan en el pulmón estimulando fibras C vagales locales, generando tos rasposa molesta y recurrente. Ceden al mes de suspenderse." },
            { name: "Neuropatía Laríngea y Tos Sensoriomotora Crónica", desc: "El daño sutil post viral agudo (muy clásico en COVID largo y secuelas post influenza) produce inflamación neural de los nervios de las cuerdas vocales induciendo hiper-reflexia. La garganta responde de manera exagerada a estímulos pálidos no tóxicos (olores triviales químicos, viento tibio, cambios de temperatura mínima) como si fueran humo." }
        ],
        redFlags: [
            "Tos acompañada de hemoptisis recurrente activa constante en gotas o en un coágulo puro sin trauma de rasgado laringofaríngeo: alerta inminente descartar de Cáncer pulmonar, caverna por Tuberculosis ó Bronquiectasia destructiva. Urgentisímo.",
            "Tos seca con una alteración del tono en la voz (ronquera crónico / disfonía inexplicable) de reciente aparición mayor a tres semanas en un paciente fumador: descartar nódulo o displasia tumoral de cuerda vocal glotis.",
            "Tos seca intermitente constante + sudores de noche mojando sábanas inintencionada con desgano anémico persistente y fiebre de foco no explicado: descartar Tuberculosis Pulmonar ACTIVA — placa pulmonar y control urgente baciloscopias seriales."
        ],
        tests: [
            { name: "Telerradiografía de Tórax AP y Lateral", url: "/estudios/rayos-x/torax" },
            { name: "Biometría Hemática completa (escrutinio de marcadores eosínofilicos en asma / atopia)", url: "/estudios/analisis-clinicos/biometria-hematica" },
            { name: "Spirometría con Prueba de Broncodilatador (descarte Asma CVA)", url: "/estudios/checkups/check-up-respiratorio" }
        ],
        tools: [
            { name: "Score Clínico Probabilidad de Tos por ERGE vs Asma", url: "/herramientas/cuestionario-tos-cronica" }
        ]
    },
    {
        slug: "amigdalitis-aguda",
        name: "Amigdalitis",
        medicalName: "Faringoamigdalitis / Infección de Garganta Abscesada y Purulenta",
        cie10: "J03.9",
        intro: "La Amigdalitis se entiende como el estadio hiperinmuno-inflamatorio local grave que cursa con hipertrofia por invasión patógena del tejido linfoide de la Orofaringe. Aunque el 70-85% en las estadísticas del adulto tienen un curso primariamente viral orgánico o adenoviral sin exudación blanca folicular notable, el gran dilema biomédico clínico es lograr identificar el otro 15% restante de causas agudas causadas por bacteria del Streptococcus Pyogenes de Grupo A (EBHGA - Faringoamigdalitis Estreptocócica). Tratada con antibiótico inapropiadamente (para viral) creamos una súper bacteria; mal diagnosticada y no tratada (bacteriana), nos expone un altísimo riesgo destructivo cruzado autoinmunológico hacia nuestro propio tejido valvo-cardiaco (Fiebre Reumática en jóvenes). Clínicamente asusta mucho el aspecto rojo y las placas blancas de pus, generando severo dolor agudo para tragar (Odinofagia profunda).",
        causes: [
            { name: "Amigdalitis Viral de Invasión Común (Adenovirus, Rinovirus)", desc: "El Adenovirus es el gran simulador de bacterias en las consultas. Produce inflamación difusa rojo intenso con dolor al pasar y se asocia consistentemente fuertemente a rinitis aguda, enrojecimiento ocular conjuntival viral o tos bronquial activa. No forma comúnmente placas de pus evidentes y carece generalmente de adenopatía (ganglio en cuello) focal muy sensible palpable. Dura solo de 2-5 dias y responde puritamente bien al reposo. Antibiótico totalmente fútil." },
            { name: "Amigdalitis Infecciosa Aguda por Estreptococo (EBHGA)", desc: "El Pyogenes invade las mucosas liberando poderosísimas exotoxinas citotérmicas destructivas pirogénicas desencadenando una cascada de fiebre elevada (39ºC) agresiva agúda. Este tipo de anginas se acompañan patognomónicamente en el paladar blando con manchas equimóticas sangrantes petriformes, adenopatías cervicales del lado frontal (ganglios durísimos) y exudado lechoso amigdalino denso pero AUSENCIA total de Tos. Este germen sí amerita obligadamente antibiótico." },
            { name: "Amigdalitis por Virus Epstein-Barr (Mononucleosis Infecciosa)", desc: "Popular en las etapas adolescentes jovenes de contacto de besos, cursa como una hiper faringitis gigantesca de aspecto espeluznantemente infectado severo que parece no ceder a un solo antibiótico general y simula bacteriana por la pus lechosa o gris. Sus marcadores claves son la fatiga agotadora brutal paralizante global, ganglios hiper en cuello nucales dolorosos y frecuente hepatomegalia o bazo crecido, la temible fiebre constante refractaria a un analgésico." },
            { name: "Amigdalitis Crónica Caseosa Lítica e Hipertrofia Aguda (Tonsilolitos)", desc: "A nivel macroscópico patológico las amígdalas guardan criptas cavernosas endógenas crónicas. Las células muertas orales locales y partículas restos bacterianos del microbiota oral colonizan estos espacios, formando pequeñas piedras asquerosamente amarillentas de consistencia pastosa endurecida, desprendiendo compuestos mercaptanos de halitosis putrefactible (Mal aliento brutal). Producen constante disconfort leve dolor faríngeo o cuerpo extraño sin una fiebre franca per se." }
        ],
        redFlags: [
            "Trismus maxilar profundo (Imposibilidad absoluta y traba limitante grave para poder de abrir la boca en consulta) derivado asociado a amígdala con dolor inmenso — urgencia de descarte de un temible Absceso retro periamigdalino drenable urgente en maxilofacial o quirúrgico UCI.",
            "Asimetría notabilísima faríngea aguda, si una de las amígdalas cruza la línea de la úvula hacia adelante empujando el lado contralateral (estriduloso ahogo vocal y ahogo de voz 'en papa caliente') — posible gran absceso peritonsilar agudo de celulitis infecciosa de piso oro-dental. Mortal de cerrar si comprime vía respiratoria por edema."
        ],
        tests: [
            { name: "Exudado Faríngeo + Cultivo Antibiograma con Escrutinio Estreptococócico Orofaringeo", url: "/estudios/analisis-clinicos/exudado-faringeo" },
            { name: "Biometría Hemática Completa (ver desviación izquierda bacteriano o linfocitosis activa Mononucleosis M)", url: "/estudios/analisis-clinicos/biometria-hematica" },
            { name: "Antiestreptolisinas O Serológicas de Titulación en Sangre R", url: "/estudios/analisis-clinicos/antiestreptolisinas-o" }
        ],
        tools: [
            { name: "Algoritmo Diagnóstico Estandar Score CENTOR (Descarta Falso Bacteriano para Antibiótico)", url: "/herramientas/puntuacion-centor-faringitis" }
        ]
    },
    {
        slug: "depresion-mayor",
        name: "Depresión Mayor",
        medicalName: "Trastorno Depresivo Mayor (TDM) / Distimia Grave Biológica",
        cie10: "F32.9",
        intro: "La Depresión Mayor es el gigante psiquiátrico de esta década, y aunque el estigma sistémico le denomina 'debilidad' mental coloquialmente, la TDM de peso grave es neurobiológica. Se trata de un fallo neuroplástico demostrable y disfunción funcional estructural del Hipocampo (el modulador de las memorias emocionales) y las neuronas de la Corteza Prefrontal del Lóbulo Frontal, encogiéndose literalmente a un estado de hipertrofia de atrofia del tallo dendrítico debido a neuro exotoxicidad del Cortisol a lo largo de un prolongado estrés o trauma somático genético incesante endógeno. Clínicamente para el diagnóstico no se basa en sola la tristeza normal aversiva o lloros, el psiquiatra observará las perplejidades clásicas de triada cardinal central fundamental: Anhedonia (Incubada muerte interior que arrebata el previo disfrute crónico de los hobbys e instintos o placer somático absoluto global como lo sexual y alimentos palatables) así como Anergia motora, Agitación psicomotriz ansiosa persistente y en último escalón biológico severo, la fatal Ruminación suicida u obituaria y desolación irresoluble del Yo personal en ≥ 2 semanas constantes en vigilia.",
        causes: [
            { name: "Neurobiológica por Alteración Aminérgica Monoamina Compleja Serotonina-Dopamínica", desc: "Originalmente concebida como la hipótesis deficitaria única de baja cantidad de serotonina global sináptica pura del cerebro, hoy se trata de una anomalía combinada interneuronal crónica. La desmejora en receptores 5HT-1a serotoninérgicos prefrontales limita severamente la tolerancia personal ante factores aversivos al dolor físico moral emocional, mientras que la falta de disparo de VTA hipotalámicas en células dopaminérgicas se atribuye al factor disociatorio 'desgano' de anhedonia crónico sin iniciativa." },
            { name: "Hiper Actividad del Estrés Neuro Límbico y la Neurotoxicidad Hipocampal", desc: "El individuo sumido previamente a traumas, duelo, fallos sistémicos severos del sistema en adaptación humana social, secreta constantemente Cortisol por un sobreestimulo del Eje Córticotrófico HPA cerebral primitivo en sangre. Esta marea de cortisol baña de citoquinas inflamatorias el parénquima, generando neurotoxicidad por inhibición grave al promotor natural protector trófico (Factor Neuro-Derivado BDNF) neuronal ocasionando atrofia objetiva local y niebla." },
            { name: "Factores Tiroidales o Médicos Primarios Engañosos (Depresión Secundaria Clínica)", desc: "Condiciones físicas internas miméticas simulan con alta letalidad de engaño clínica el aspecto de una depresión biológica anérgica global. Un hipotiroidismo sistémico metabólico basal disminuido crónicamente, déficit de la hormona vital inmunomódulada D3, síndromes premenopáusicos u postmenopáusico estrogénico bruscos, como la inflamación en Síndromes Metabólicos no controlados crónicamente. El cerebro ralentizado cráneo corporal en reposo fisiopatológico es interpretado por autoengaño erróneo en Anhedónico inactivo." }
        ],
        redFlags: [
            "Psicomotricidad ralentizada tipo Catatonia basal o un estupor grave sin reacción expresiva somática u emocional afectiva ante factores externos sorpresivos (No levanta de la cama para absolutas micciones incluso): urgente hospitalización inmediata de reasignación somática interconsulta para evadir riesgo letal sistémico.",
            "Aparición abrupta inintencionadamente en una Depresión de agudeza grave psicótica mayor donde reporta voces acusatorias ordenativas punitivas ruines negativas o culpa delirante extrema: Requiere abordaje contencioso antipsicótico o derivación urgencias psiquiátricas para estabilización neuro modulación."
        ],
        tests: [
            { name: "Panel Perfil Hormonal Completo del Tiroides (Tamiz y TSH + T4L Exclusión Oculta Hipotiroideo Letargo)", url: "/estudios/analisis-clinicos/perfil-tiroideo" },
            { name: "Biometría Hemática R y Concentraciones de Ferritina/Transferrina (VHB) Descarte Crónico Anémico Base", url: "/estudios/analisis-clinicos/biometria-hematica" },
            { name: "Tamizaje Metabólico Vitamina 25-Oh Calcidiol (Vitamina D3 Total Suero Global)", url: "/estudios/analisis-clinicos/vitamina-d" }
        ],
        tools: [
            { name: "Inventario Beck-2 Validado Clínico Internacional Rápido Trastornos de Depresión Grado Severidad", url: "/herramientas/cuestionario-beck-depresion" }
        ]
    }
];

let db = JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));
const slugs = new Set(db.map(s => s.slug));
let saved = 0;

TOP60_LOTE2.forEach(s => {
    if (!slugs.has(s.slug)) {
        db.push(s);
        saved++;
    }
});

fs.writeFileSync(OUTPUT, JSON.stringify(db, null, 2));
console.log(`Lote 2 guardado: ${saved} nuevos añadidos. Total DB: ${db.length}`);

