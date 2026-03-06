const fs = require('fs');
const path = require('path');
const OUTPUT = path.join(__dirname, 'src', 'data', 'symptoms-quality.json');

const TOP60_LOTE3 = [
    {
        slug: "reflujo-gastroesofagico",
        name: "Reflujo Gastroesofágico",
        medicalName: "Enfermedad por Reflujo Gastroesofágico (ERGE) / Pirosis Crónica",
        cie10: "K21.9",
        intro: "La Enfermedad por Reflujo Gastroesofágico (ERGE) es la patología digestiva más prevalente en México, afectando al 30-40% de la población adulta al menos una vez por mes. Se produce por un fracaso en la barrera antirreflujo —específicamente una incompetencia mecánica o relajaciones transitorias inapropiadas del esfínter esofágico inferior (EEI)— que permite el ascenso retrógrado patológico del contenido ácido y biliar del estómago hacia el esófago. Dado que la mucosa esofágica (epitelio escamoso estratificado) no está diseñada para resistir un pH <4, la exposición crónica genera inflamación profunda, microerosiones y síntomas clásicos: pirosis (ardor retroesternal ascendente, 'agruras') y regurgitación ácida. En el 20% de los casos crónicos, el epitelio muta a un tipo intestinal (Esófago de Barrett), una lesión precancerosa que incrementa 30 veces el riesgo de adenocarcinoma esofágico.",
        causes: [
            { name: "Relajaciones Transitorias del EEI (RTEEI) Inapropiadas", desc: "Es el mecanismo fisiopatológico principal en el ERGE leve a moderado. El esfínter esofágico inferior (anillo muscular en la unión gastroesofágica) se abre espontáneamente por 10-30 segundos sin que haya deglución, arrastrado por reflejos vagales mediados por la distensión gástrica (típicamente tras comidas copiosas). Al relajarse, el EEI permite el escape de la bolsa de ácido gástrica (acid pocket) hacia el esófago." },
            { name: "Hernia Hiatal por Deslizamiento", desc: "En un 50-80% de los ERGE crónicos existe daño anatómico: la porción superior del estómago asciende a través del hiato diafragmático hacia la cavidad torácica. Esto desmantela la pinza diafragmática (el músculo diafragma que abraza y refuerza exteriormente el EEI), perdiendo el soporte crucial antirreflujo. El contenido ácido se estanca en el saco herniario, desde donde fluye libremente al esófago incluso en reposo." },
            { name: "Obesidad Central y Presión Intraabdominal Aumentada", desc: "La adiposidad visceral eleva mecánicamente la presión intra-gástrica por encima de la fuerza tónica de resistencia del EEI. Este gradiente de presión invertido (estómago > esfínter) vence la barrera, forzando el reflujo continuo. Además, la grasa visceral produce citoquinas proinflamatorias y estrógenos periféricos que relajan químicamente el músculo liso del EEI." },
            { name: "Retraso en el Vaciamiento Gástrico (Gastroparesia Leve)", desc: "Cuando el estómago tarda en evacuar su contenido hacia el duodeno (común en diabéticos o tras ingerir dietas ultra ricas en grasas), el volumen gástrico acumulado mantiene estirado al estómago (distensión antral sostenida). Esto genera RTEEI constantes y aumenta el volumen disponible de líquido ácido dispuesto a refluir." },
            { name: "Fármacos y Toxinas Relajantes del EEI", desc: "Múltiples compuestos de uso masivo reducen artificialmente el tono del esfínter esofágico: la nicotina del tabaco, la cafeína, el alcohol, bloqueadores de canales de calcio (antidipertensivos), nitratos y el chocolate (teobromina). El tabaco además reduce críticamente el flujo salival rico en bicarbonato, que es el buffer natural que limpia el esófago trago a trago." }
        ],
        redFlags: [
            "Disfagia rápidamente progresiva (primero a sólidos, luego a líquidos) + pérdida de peso involuntaria + ERGE de larga data: ALERTA ROJA por Adenocarcinoma de Esófago inferior — endoscopia urgente obligatoria.",
            "Hematemesis (vómito con sangre fresca o 'en posos de café') o melenas (heces negras alquitranadas) en paciente con pirosis crónica: descartar úlcera esofágica sangrante o desgarro de Mallory-Weiss.",
            "Odinofagia aguda intensa (dolor punzante profundo al momento exacto de tragar) que no existía previamente: descartar esofagitis infecciosa (cándida, CMV) o esofagitis péptica ulcerada severa."
        ],
        tests: [
            { name: "Panendoscopia de Tracto Digestivo Superior (Estándar de Oro estructural)", url: "/estudios/imagenes/endoscopia" },
            { name: "pH-metría Esofágica de 24 horas con Impedancia (Diagnóstico del Reflujo Funcional No Ácido/Ácido)", url: "/estudios/checkups/checkup-gastroenterologico" },
            { name: "Prueba de Aliento o Antígeno Fecal para Helicobacter Pylori", url: "/estudios/analisis-clinicos/helicobacter-pylori" }
        ],
        tools: [
            { name: "Cuestionario GERDQ (Evaluación Mundial Sintomática del ERGE)", url: "/herramientas/cuestionario-gerd-reflujo" }
        ]
    },
    {
        slug: "infeccion-vias-urinarias",
        name: "Infección de Vías Urinarias",
        medicalName: "Cistitis Aguda / IVU Baja / Infección del Tracto Urinario (ITU)",
        cie10: "N30.0",
        intro: "La Cistitis Aguda (infección bacteriana de la vejiga y uréteres bajos) es la infección bacteriana extraintestinal más común en México, predominando asimétricamente en mujeres (hasta un 60% padecerán una en su vida) debido a la cortedad anatómica de la uretra femenina (~4 cm) comparada con la masculina (~20 cm). En el 80-85% de los casos extrahospitalarios, es causada por cepas uropatógenas de Escherichia coli (UPEC) provenientes de la propia microbiota perineal o perianal de la paciente, las cuales logran un ascenso uretral gracias a potentes fimbrias (pili tipo 1 y P) que se adhieren indisolublemente al epitelio urotelial, evitando ser arrastradas por el chorro de orina. Genera un clásico síndrome miccional agudo: disuria (ardor quemante intenso al orinar), polaquiuria (necesidad constante de orinar en pequeñas gotitas) y urgencia imprevista, frecuentemente con heces de sangre microscópica, pero invariablemente sin fiebre alta ni dolor lumbar profundo (lo cual distinguiría a una pielonefritis).",
        causes: [
            { name: "Ascenso Bacteriano de la Microbiota Perineal (E. coli uropatógena)", desc: "Es el mecanismo primario irrefutable. Las bacterias colonizan el introito vaginal y tejido periuretral desde el ano. Una vez que ingresan a la uretra, la E. coli utiliza sus 'P-fimbrias' o filamentos para anclarse a los receptores de manosa en las células paraguas de la mucosa de la vejiga. Dentro de las células uroteliales se replican formando 'comunidades bacterianas intracelulares' que evaden tanto a los antibióticos como al sistema inmune." },
            { name: "Actividad Sexual ('Cistitis de la Luna de Miel')", desc: "Las relaciones sexuales con penetración vaginal generan fricción mecánica uretral que empuja literalmente y 'ordeña' a las bacterias perineales colonizantes hacia el interior de la vejiga urinaria. Es el factor de riesgo independiente más alto en mujeres jóvenes sanas. Ocurre dentro de las 24-48 horas posteriores al coito si no hay una fricción post coital natural de limpieza (micción inmediata)." },
            { name: "Hipoestrogenismo (Atrofia Urogenital Menopáusica)", desc: "En mujeres tras la menopausia, la caída total del estrógeno sistémico adelgaza la mucosa urotelial y de la vagina, reduciendo críticamente la colonización de Lactobacillus sp. protectores, y elevando el pH vaginal por encima de 5.5. Sin lactobacilos que acidifiquen usando ácido láctico, la E. coli intestinal coloniza permanentemente la vagina sin resistencia compitiendo ventajosamente e induciendo infecciones recurrentes crónicas." },
            { name: "Retención Urinaria y Residuo Post-Miccional", desc: "En hombres >50 años (por crecimiento prostático HBP), en diabéticos (por vejiga neuropática o pérdida de la contracción motora vesical) o en el embarazo (compresión por útero grávido), la vejiga no se vacía al 100%. Esa orina retenida ('estasis urinaria') actúa como un medio de cultivo inagotable a temperatura corporal excelente, multiplicando cualquier traza bacteriana que ascienda." },
            { name: "Uso de Espermicidas, Duchas Vaginales o Diafragmas", desc: "Los agentes químicos como el nonoxinol-9, ingredientes en lubricantes espermicidas y condones, así como las duchas intravaginales comerciales alteran o aniquilan totalmente el nicho biológico de la microbiota vaginal normal (vaginosis irritativa), precipitando colonización oportunista de bacterias coliformes, Cándida o Pseudomonas uropatógenas exógenas." }
        ],
        redFlags: [
            "Infección urinaria baja que súbitamente desarrolla FIEBRE >38.5°C, escalofríos severos, y gran dolor localizado en fosas lumbares (espalda media a los lados): indicio de ascenso infeccioso a los riñones — Pielonefritis Aguda — Urgente antibiótico sistémico o IV para no decantar en sepsis urológica.",
            "IVU + retención urinaria aguda total (dolor inmenso suprapúbico 'balón gástrico' de vejiga tapada y ni una gota de orina) en hombres añosos: requiere sondeo uretral urológico inmediato para vaciar y salvar los riñones de un reflujo ureteral agudo.",
            "Hematuria rutilante MACROSCÓPICA pura asintomática sin ardor ni fiebre, o con coágulos de sangre completos en paciente fumador >50 años: descartar cáncer urotelial de vejiga tempranamente mediante Cistoscopia."
        ],
        tests: [
            { name: "Examen General de Orina (EGO) con sedimento (Búsqueda de Nitritos positivos y Leucocitoesterasa)", url: "/estudios/analisis-clinicos/examen-general-de-orina" },
            { name: "Urocultivo con Antibiograma (Diagnóstico Definitivo de Resistencia Bacteriana)", url: "/estudios/analisis-clinicos/urocultivo" },
            { name: "Ultrasonido Renal y Vesical (Para descartar retención o litiasis en casos crónicos recurrentes)", url: "/estudios/imagenologia/ultrasonido" }
        ],
        tools: [
            { name: "Diario del Patrón Miccional Diario — Volumen Quirúrgico Vesical", url: "/herramientas/vaciamiento-vejiga" }
        ]
    },
    {
        slug: "mareo-vertigo",
        name: "Mareo y Vértigo",
        medicalName: "Vértigo Periférico / Vértigo Posicional Paroxístico Benigno (VPPB) / Neuritis",
        cie10: "H81.1",
        intro: "El mareo inespecífico representa el 5% de las visitas a urgencias en la población adulta, pero la forma incapacitante y más predominante en México es el Vértigo Periférico verdadero, manifestado biomédicamente como una poderosa, irreal e incontrolable sensación rotatoria —'todo da vueltas o yo giro en la habitación'. Originado típicamente en un fallo de los canales semicirculares del oído interno (el giroscopio o sensor espacial vestibular principal del cerebro humano), su causa número 1 a nivel mundial es el VPPB (Vértigo Posicional Paroxístico Benigno). Acontece cuando cristales perdidos de calcio (otoconias) se deslizan libremente a zonas equivocadas del laberinto del oído; al girar la cabeza en la cama se desata el terror vestibular, un nistagmo (bamboleo del ojo espasmódico visible) y severas náuseas o vómitos por hiper-estimulación del nervio craneal VIII.",
        causes: [
            { name: "Desprendimiento Otoconial (VPPB)", desc: "Cristales microscópicos vitales de un compuesto bioquímico llamado Carbonato de Calcio, localizados estacionariamente en el utrículo del oído interno para detectar la gravedad lineal vertical, sufren rotura (por la edad, estrés o golpe) y se deslizan e instalan erróneamente adentro de los Canales Semicirculares (frecuencia Canal Posterior). Cuando la persona gira el cuello (ponerse zapato, rodar en la cama) las piedras viajan creando succión líquida falsa del canal disparando una sobre señal al cerebro asumiendo que el cuerpo rota a velocidades espeluznantes." },
            { name: "Neuritis Vestibular Aguda (Frecuentemente Post-Viral)", desc: "Inflamación asimétrica viral del Nervio Vestibular del octavo Par Craneal de origen agudo. Un virus como el del herpes o infecciones altas virales alcanzan a la vaina neural e incapacitan temporal y bruscamente a UN SOLO oído. Como el otro oído sano no tiene inflamación, sigue disparando señales perfectas que llegan a chocar al cerebelo. Este conflicto vestibular rotundo de señales cruzadas dispara un enorme ataque de vértigo persistente por días o semanas constante (Incluso sentado duro y fijo sin rotar)." },
            { name: "Enfermedad de Ménière", desc: "El Sistema Endolinfático profundo interno del oído humano produce crónicamente un exceso anormal de líquido linfático ('Hydrops endolinfático'). El resultado al distenderse las membranas genera crisis aleatorias temporales de una triada cardinal inviolable patognomónica: Vértigo paralizante intenso que dura en horas, Acúfeno fuerte agudo (sonido zumbido en el oído inaudible asolamente unilateral) e Hipoacusia de baja frecuencia y taponamiento fluctuante." },
            { name: "Hipotensión Ortostática Postural ('Mareo No Rotacional Vacio')", desc: "A diferencia del vértigo (girar), al levantarse rápido de la silla y la presión sistólica no lograr subir inmediatamente en <3 segundos para enviar sangre encefálica temporal —debido a baja ingesta líquida, o por drogas diuréticas—, el paciente percibe un 'mareo vacío visual, como nubes o inestabilidad con pre sincope'. Los canales auditivos están sanos pero el cerebro sufre mini-hipoxia momentánea barorreceptora vascular." },
            { name: "Mareo Psicógeno o Vestibulopatía Funcional Reactiva", desc: "Pacientes que arrastran históricamente Ansiedad TAG u ataques pánico referencian 'estar en un barco perpetuo' sin poder mantener pie y sin giro real del entorno visible en pared. Esto corresponde a desequilibrio sensorial generalizado provocado por fallas interpretatorias psícosomáticas a nivel del córtex prefrontal a veces desencadenadas irónicamente, posterior a que padecieron algún evento inicial agudo leve de VPPB sano real." }
        ],
        redFlags: [
            "Vértigo rotatorio en conjunto con alguno de las siguientes: debilidad aguda en brazo o pierna unilateral, dificultad para decir palabras o arrastrar silabas, diplopía (visión doble objetiva o estrábica central) y disfagia a líquidos: EMERGENCIA NEUROVASCULAR: Sospechar firmemente Ictus cerebral AVC isquémico puro u hemorragia focal de isquemia de la Arteria Cerebelosa Infecciosa y PICA en fosa posterior cerebral.",
            "Vértigo de inicio súbito, persistente acompañado notablemente de Sordera completa súbita ipsilateral o hipoacusia neural repentina grave con parálisis o debilidad del rostro en el mismo sentido: Neuroma acústico (Tumor) ó ACV masivo. Acudir urgente."
        ],
        tests: [
            { name: "Maniobra Rápida de Dix-Hallpike (Test clínico principal de oro de la consulta para confirmación Canal Posterior VPPB)", url: "/estudios/imagenes/resonancia-magnetica-cerebral" },
            { name: "Estudios Vestibulares de Videonistagmografía VNG Completa Clínica", url: "/estudios/analisis-clinicos/quimica-sanguinea" },
            { name: "Resonancia Magnética Funcional Cerebral Simple de Fosa Posterior y Conducto auditivo interno T2", url: "/estudios/imagenologia/resonancia-magnetica" }
        ],
        tools: [
            { name: "Instrucciones Diarias de Maniobra Curativa de Epley para VPPB (Terapia Vestibular)", url: "/herramientas/cuestionario-maniobra-epley" }
        ]
    },
    {
        slug: "diabetes-tipo-2-sintomas",
        name: "Diabetes (Síntomas Iniciales)",
        medicalName: "Episodios Pródromo o Debut Diabetes Mellitus Tipo 2 Clásica",
        cie10: "E11.9",
        intro: "La Diabetes Mellitus Tipo 2 (DMT2) es una emergencia pandémica médica en la salud pública silente mexicana — en la actualidad cobrando y afectando por arriba del 18.2% general adulto encuestado —, impulsada en su mayoría absoluta por el ambiente obesogénico letal de las metrópolis (Resistencia a la Insulina primaria base). Años, inclusos dos décadas antes del diagnóstico fatal crónico con los clásicos exámenes, el paciente cruza por una ventana larga in-sintomática y destructiva. Los síntomas del clásico 'Debut' patológico clínico derivan primariamente ya, de los colosales picos y ascensos del azúcar de la sangre (>180 a >250 mg/dL constantes) post a la hiper claudicación fatiga funcional y agotamiento de las células ß pancreáticas secretoras endócrinas. El cuadro prototípico tardío se manifiesta por la triada de las 4 Ps que obliga al médico inexperto a actuar tarde: Poliuria extrema, Polidipsia de sed colosal, Polifagia hambrienta crónica y la temible y devastadora Pérdida de Peso Inexplicable letática.",
        causes: [
            { name: "Poliuria Nocturna y Diurna a Causas de Diuresis Osmótica", desc: "La causa de por qué el paciente va al baño orinando inmensos volúmenes en la fase del debut no es infección renal pura, sino el límite de umbral fisiológico humano de reabsorción tubular gástrico del riñón (TmG= ~180 mg/dL en sangre). Cuando hay glucosa descontrolada circulante excediendo este estricto valor en torrente por hiperglucemia real metabólica por falla ß-pancreática insulínica, los riñones ya no son capaces de reabsorber el exceso total pasador de regreso y lo liberan saturado por inercia ósmica, arrastrando masivamente con la glucosa y la dilución al agua sérica intravascular provocando volúmenes líquidos urinarios abismales." },
            { name: "Deshidratación Intra Células Desencadenando Extrema Sed (Polidipsia)", desc: "Debido a la pérdida profunda y crítica diurética renal provocada por la hiperflujo de excreción osmótico continuo con todo por la hiperglucemia persistente general sistémica basal antes expuesta, en contraparte natural física para sobrevivir nuestro cuerpo activa poderosos osmorreceptores neurales potentes incisivos del encéfalo, localizados del hipotálamo del cerebro estimulando insaciables las ganas fisiológicas agudas de querer consumir líquidos e intentar empatar para salvaguardarse, generando en contraproducente sed y boca del paciente empapada seca letalmente sin ceder." },
            { name: "Anemia Funcional Metabólica Hambre Paradojal y Pérdida de Masa Involuntaria", desc: "Pese a que el diabético come o consume muchísimas cantidades exorbitantes hipercalóricas brutales en exceso para buscar 'llenarse', por la nula ó pobre ausencia en su metabolismo circulante interior para internalizar dentro el alimento celular efectivo, las células orgánicas siguen 'gritando' y señalando inactividad de inanición extrema o starvation al Córtex. El organismo descompone sus músculos funcionales grasos para fabricar de la nada gluconeogénesis hepática con aminoácidos buscando sacar ATP desesperado perdiendo peso muscular velozmente, ocasionando al paciente adelgazar consumiendo todo pero estando en niveles letárgicos perfiles de glucosa elevadísimos tóxicamente fuera de células, muriendo interiormente disfuncional." },
            { name: "Visión Intermitentemente Borrosa o Doble Transitoria", desc: "Contrario a la retinopatía final crónica ceguera estructural que es grave y permanente capilar en diabéticos no cuidados > 10 años que requiere láser ocular. Ésta del debut no la da un problema estructural de la ceguera ocular; el repentino pico brutal desbalance hiperglucémico temporal modifica por la entrada drástica de moléculas sorbitol a nivel de cristalino lenticular osmótico del ojo alterando sus líquidos hinchando momentáneamente su arquitectura visual transitoriamente impidiendo poder enfocar la visión, pero reversible con normoglucemia general basal estricto." },
            { name: "Aparición de Acantosis Nigricans Primaria en Cuello Piel e Ingles", desc: "Considerada por dermatólogos no de daño renal o cutáneas por resequedad pura, sino una poderosa marca de alta Resistencia a la Insulina. El elevado hiper insulinismo patológico que un paciente cursó por mas de 5 años base intentando abatir que de las células no abrían su mecanismo funcional a la glucosa periférica y pre-diabetógena eleva el factor insulínico libre sérico (factor de crecimiento de fibroblastos IGF1) hiper-estimulando que queratinocitos melánicos maduren engrosando brúscamente las zonas de fricción a un color cutáneo en piel de textura de manchas de 'Aterciopelado mugroso negra y sebo', en inglés cuello nuca nudillos piel de axila." }
        ],
        redFlags: [
            "Falta de aire respiratoria extrema muy agitante jadeante grave dolor de panza muy punzante estomacal persistente difuso, en conjunto con asqueado o vomitos y un aliento en su labio olor de olor a la fruta verde madura manzana 'Cetósico embotado' : Síndrome de una amenazante brutal Cetoacidosis Diabética Fatal. Ingreso UTI urgente grave vital.",
            "Cuadro mental de paciente en sopor inactivo agudo extremo perplejo confundido e incoherente abúlico severo en diabético añoso sin aparente fiebre, pero con glucosas insanas arriba de los temibles 600 > mg/dL: Síndrome temible en descarte de Estado Hiperosmolar Hiperglucémico EHH coma diabético deshidratador puro neurológico desestabilizado."
        ],
        tests: [
            { name: "Glucosa Inicial General Hemoglobina Glicosilada Fraccionada (HbA1C) Estandar Fuerte de Oro Predictivo Retrospectivo Tres meses Atras % Porcentual Mayor 6.5%", url: "/estudios/analisis-clinicos/hemoglobina-glicosilada" },
            { name: "Examen Químico Completo QS General Cuantificación Integral con Glucosa Suero Ayuno Ó Inulina Basal y Creatininas Renales Funcionales Pródromo", url: "/estudios/analisis-clinicos/quimica-sanguinea" },
            { name: "Curva de Tolerancia Médica Extendida 2hrs Glucosa o Indice HOMA Inmunológico Metabólico Diagnóstico Grado Resistencia Hormonal Fuerte", url: "/estudios/analisis-clinicos/curva-de-glucosa" }
        ],
        tools: [
            { name: "Score Escala de Riesgo de FINDRIKS General Oficial Mexicana Encuesta Abierta Detección Primaria Diabetes Clínico Riesgo Puntos", url: "/herramientas/cuestionario-riesgo-diabetes" }
        ]
    }
];

let db = JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));
const slugs = new Set(db.map(s => s.slug));
let saved = 0;

TOP60_LOTE3.forEach(s => {
    if (!slugs.has(s.slug)) {
        db.push(s);
        saved++;
    }
});

fs.writeFileSync(OUTPUT, JSON.stringify(db, null, 2));
console.log(`Lote 3 guardado: ${saved} nuevos añadidos. Total DB: ${db.length}`);

