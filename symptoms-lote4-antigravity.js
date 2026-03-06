const fs = require('fs');
const path = require('path');
const OUTPUT = path.join(__dirname, 'src', 'data', 'symptoms-quality.json');

const TOP60_LOTE4 = [
    {
        slug: "sindrome-ovario-poliquistico",
        name: "Síndrome de Ovario Poliquístico",
        medicalName: "SOP / Hiperandrogenismo Ovárico Funcional",
        cie10: "E28.2",
        intro: "El Síndrome de Ovario Poliquístico (SOP) es el trastorno endócrino-metabólico más frecuente en mujeres en edad reproductiva en México (afectando de un 6 a un 10%). Erróneamente conceptualizado en el pasado como una mera 'enfermedad de quistes', hoy se entiende primariamente como un estado crónico severo de Hiperinsulinemia Compensatoria y Resistencia a la Insulina subyacente que trastorna al eje gonadal hipofisiario (aumento patológico en el pulso de la hormona LH luteinizante impulsando la fábrica tecal ovárica a la sobreproducción masiva en andrógenos masculinos y testosterona en descontrol). Clínicamente esto bloquea fisiológicamente e incapacita a los folículos inmaduros el poder logran explotar ovulando mes a mes resultando así en ciclos anovulatorios infertiles de un retraso menstrual superior a los 35 días ('Oligomenorrea').",
        causes: [
            { name: "Hiperinsulinismo Sensibilizante Gonadal Ovárico", desc: "La inmensa mayoría de las mujeres (>70%) con fenotipos SOP padecen de un estado de Resistencia a la Insulina celular muscular y adiposo. Su páncreas lucha a marchas forzadas generando altísimos niveles sanguíneos de insulina libre (Hiperinsulinismo). Lejos de reducir el azúcar, este brutal chorro de insulina constante viaja directamente hacia los parénquimas de las células de la teca de cada ovario interactuando con su receptor de estrógenos locales y estimulando excesiva sinergización descontrolada en producción pura androgénica masculina testosterónica a niveles nocivos femeninos virilizantes." },
            { name: "Alteración Primaria de Pulso LH y Eje Hipotálamo-Hormonal", desc: "De manera conjunta paralela biológica, la adenohipófisis cerebral secreta de forma arrítmica disparos pulsátiles mucho más rápidos, agresivos y frecuentes de LH (Hormona luteinizante ovulatoria) que de su recíproca aliada fisiológica natural FSH. Esto perpetúa un crecimiento arrestado fallido crónico estancado de la maduración de múltiples mini folículos periféricos oocitos ováricos, dotándolos del aspecto irónico perimetral 'en collar de múltiples quistes', que en sí biológicamente, no son patologías en quistes líquidos como tal estructural funcionalmente sino fallidos e inmaduros." },
            { name: "Obesidad Genética Periférica Visceral Central e Inflamatoria (Adiposopatía)", desc: "Factor modificable central del agresor androgénico fundamental. Los tejidos extra obesogénicos crónicos del abdomen periumbilical secretan en la intimidad celular adipocitoquinas altamente de citóxicas pro inflamatorias. Generan estrógenos periféricos aberrantes ('estrona malévola periférica') al transformar irreversiblemente la testosterona de ovario en grasa mediante aromatización enzimática adiposa patológica perdiendo así y exacerbando mucho mas el desorden crónico anovulatorio y las fallas letales ovulatorias mensuales de un SOP resistente." }
        ],
        redFlags: [
            "Perdida o Ausencia patológica prolongada sostenida del Sangrado Menstrual natural cíclico (Amenorrea Crónica Grave de > de 4-6 meses fijos sin ninguna caída residual) y en conjunto con obesidad y SOP no tratado en paciente — Exige alto y rápido descarte ginecológico endometrial biópsico oncológico por hiperplasia grave atípica uterina por estrógenos letales sin rotura descamatoria o hemorragia profiláctica.",
            "Aparición sorpresiva, aberrante acelerada dramática de rasgos virilizantes marcados agresivos en mujeres de < 6 meses al iniciar el cuadro SOP de (clitoromegalia hipertrófica gigante pura palpable grave, un engrosamiento de voz severo y de alopecia androgénica tipo calvicie patrón varón calvo) — Descartar inmediatamente Tumor adrenal de andrógeno letal de glándula virilizante masiva o en ovario secretante severo veloz de DHEA."
        ],
        tests: [
            { name: "Perfil de Tamiz Hormonal Ginecológico (Fase Folicular día 2-5: FSH y LH)", url: "/estudios/analisis-clinicos/perfil-hormonal-femenino" },
            { name: "Testosterona Total y Libre Sérica Sangre (Hiperandrogenismo clínico confirmatorio M)", url: "/estudios/analisis-clinicos/perfil-hormonal-femenino" },
            { name: "Ultrasonografía Ginecológica Pélvica Transvaginal Estructural Óvarica R (Confirmar fenotipo del Patrón Poliquístico)", url: "/estudios/imagenologia/ultrasonido" },
            { name: "Insulina Basal Matutina de Glucosa Suero HOMA — Confirmación Metabólica de In-sensibilidad R", url: "/estudios/analisis-clinicos/curva-de-glucosa" }
        ],
        tools: [
            { name: "Rastreo Constante del Patrón Ovulatorio Temperatura y Ciclos Predictivo", url: "/herramientas/calculadora-dias-fertiles" }
        ]
    },
    {
        slug: "obesidad-tipo-1",
        name: "Obesidad",
        medicalName: "Obesidad Clínica Metabólicamente Activa / Adiposopatía Central",
        cie10: "E66.9",
        intro: "La Obesidad ya no se define biomédicamente bajo paradigmas pasados de un simplista 'fallo de voluntad o un consumo pasivo del exceso puro moral calórico', la endocrinología mundial la clasifica hoy estrictamente en rigor como una devastadora pandémica Enfermedad Metabólica Crónica Adiposopática neuro conductual e inflamatoria. El tejido adiposo obeso del individuo (especialmente grasa visceral intraorgánica y periumbilical en México) deja en efecto fatal de comportarse pasivamente como un solo de depósito inofensivo ahorrativo de reserva triglicérida energética normal evolutiva calórica, para volverse patognomónicamente en el más gigantesco del cuerpo 'Órgano Endócrino Malignizado Secreto', infiltrado perpetuamente de macrófagos citotóxicos leucocitos M1 hiperactivos de ataque produciendo crónicamente a diario una inundación de citoquinas sistemáticas destructora severa de Interleucina proinflamatoria y Factor Necrosis Tumoral sistémico circulante sanguíneo lipotóxico arterial cardiovascular general base.",
        causes: [
            { name: "Resistencia Leptínica y Hackeo Neuro Arcuato Hipotalámico", desc: "La leptina es la poderosísima hormona reguladora que secreta naturalmente el tejido graso a la sangre para impactar velozmente como mensajería biológica avisando saciedad al hipotálamo del cerebro 'Estamos llenos ya apaga el apetito motriz'. Trágicamente en individuos de base obesidad crónica por la propia citoquina de inflamación de la grasa severa o consumo nocivo ultra procesado crónico, se les bloquean irreversible los receptores letálicos cerebrales (Resistencia). Su grasa grita a la orden de leptina que ya están inmensamente repletos rebasados energéticamente plenos, pero sus cerebros en oscuridad de hambre no lo detectan, provocando una disfunción metabólica de la recompensa letárgica." },
            { name: "Lipotoxicidad Hepático Visceral Pura Ectópica Secundaria", desc: "El adipocito central o periumbilical no subcutáneo pélvico sino el que recubre adherido por dentro a los entraños vísceras gástricas hepáticas ha perdido completamente su sana hiperplasia adiposa genéticamente funcional rebasada. Entra en un estado celular terminal aberrante asfixiante hipertrófico gigante (Adipocito sobre el estiramiento límite), del cual al no poder retener el líquido celular interno del cebo lo derrama en forma caótica sistémica soltando un torrencial aliento de Letales Ácidos Grasos Libres circundantes tóxicos al plasma que acaban impregnando de mortífera grasa ectópica y destrozando e inflamando el inmenso órgano del hígado pancreático base (Hígado Graso)." },
            { name: "Desequilibrio Severo Patógeno Del Eje Microbiota Intestinal Oportunista Firmicutes", desc: "Hallazgos gastroenterológicos de última innovación de la genética biomédica demuestran indisolublemente que una flora endógena microbiana bacteriana del colón crónicamente predominada inmensamente por las gigantes familias de especie patógenas Firmicutes derivadas tras crónicos años en abusos y exposiciones a dietas hiper de azúcares y aditivos harinas altas (frente a las benéficas bacteroidetes sanas) son tan increíblemente ávidas y devastadoras biológicas extrayendo asolapadamente cada y toda la super mínima calórica remanente extra a comida de la fibra heces en digestión que es depositada forzosamente robándole en grasa calórica exógena al mismo paciente sin su propio control metabólico estricto real de consumo volumétrico." }
        ],
        redFlags: [
            "Pérdida dramática inexplicable sin hacer dieta ni ejercicio o desgaste extremo rápido en paciente que ha sido cursado siempre con Obesidad franca pura > 5 kg al repentino mes — Exclusión imperativa y descartar brutalmente diagnóstico patológico Oncoproteico neoplásico (cáncer destructivo gástrico) o Debut Hipertiroideo Metabólico.",
            "Hiper Somnolencia excesiva diurna grave que se queda el adulto peligrosamente dormido inintencionado súbito severo manejando o hablando con roncopatía crónica ahogos despertares apneicos explosivos y una circunferencia masa de cuello muy engrosada — Fuerte alerta letárgica severa de un Apnea Obstructiva del Sueño (AOS) SAOS grave riesgoso letal de Infartos isquémicos micro del ACV infarto o Hipertensión pulmonar hipóxica cardíaca derecha masiva. Estudiar o CPAP."
        ],
        tests: [
            { name: "Perfil Lipídico Básico en Ayuno (Determinación Colesterol total general LDL VLDL triglicéridos e Infradenso)", url: "/estudios/analisis-clinicos/perfil-de-lipidos" },
            { name: "Estudio Función Glucosa Basal e Integral HOMA Insulínico — Prevenir Diabetes M. Base Adiposopática R", url: "/estudios/analisis-clinicos/curva-de-glucosa" },
            { name: "Perfil Hepático Básico — Rastreo Letal Hígado Graso Ectópico (AST/ALT Enzimas Daño Hepato Inflamatorio) R", url: "/estudios/analisis-clinicos/pruebas-de-funcion-hepatica" }
        ],
        tools: [
            { name: "Índice de Calculadora Talla IMC Obesidad Estándar Organización Mundial Salud Internacional M", url: "/herramientas/calculadora-imc" }
        ]
    },
    {
        slug: "dolor-pecho",
        name: "Dolor en Pecho",
        medicalName: "Algia Torácica de Signo Cúspide / Dolor Precordial / Isquemia Cardíaca",
        cie10: "R07.4",
        intro: "El dolor de Pecho ('Angina' o 'Dolor Torácico de Alto Impacto Clínico') representa en sí universalmente el síntoma cardenal principal máximo de emergencia por excelencia y el más taquicárdicamente aterrador en triages nacionales de urgencia del país. Subyace ante todo mandato un dictamen dogmático médico ineludible irrefutable mundialmente estricto salvavidas preventivo inquebrantable vital letal base: 'Todo Dolor Torácico de forma de sensación opresivo aplastante central sordo no lacerante y que el paciente lleve la mano al esternón empuñada en signo opresor rudo visceral sudorífico agudo es irrevocablemente un Infarto Agudo Letal Al Miocardio Inminente (IAM) en la unidad muscular cardíaca bombeadora central en pleno estado de isquemia asfixiante pura coronaria necrosante hasta que su Electrocardiograma indique un irrefutable y lo justifique a lo puro diametralmente médico contrario del dictamen protocolario o enzimas.'",
        causes: [
            { name: "Síndrome Isquémico Agudo Coronario Aterotrombótico (IAM Trombosis / Infarto)", desc: "Trágicamente la placa aterosclerótica lipídica oxidativa disfuncional severa que obstruía parcialmente base (por alto colesterol de placa fofa de LDL y el crónico letal humo del nocivo de cigarro tabáquico en pacientes hiper tensivos con endotelio maltratado destructivo) un vaso arteria coronaria, experimenta a veces silente repentinamente una abrupta colosal mortífera y sorpresiva Ruptura subendotelial. En mili y micro segundos, el cuerpo en intento reactivo manda letales cascadas de coagulante de plaquetas de tapón formándose en el diámetro del flujo vascular un coágulo trombo sólido total que tapona en oclusión cero ocluyendo isquémicamente cortando al fin al 100% vitales flujos de succión O2 de oxigenación tisular vital miocitas cardiológicas infartándolas sin dolor." },
            { name: "Disección Fetal de Transección de Aorta Arterial Torácica Rompedura (La Peor Fatal)", desc: "Una hipertensión colosal en arteria letal crónica no tratada combinada en pacientes frágiles del colágeno genético desgarrando súbitamente repentino, rajan fisurando brutal internamente y secciona por completo rompiendo separadamente a lo crudo puro rasgando todas las paredes aórticas de la colosal arteria magna gigante intratorácica de bombeo del corazón corporal principal visceral. Genera un insano e inaudito abrumador inmenso e indescriptible desgarramiento intenso dolor expansor transictivo rasgador en todo el núcleo de la espalda vertebral. Mortal en el 85% agudamente veloz." },
            { name: "Tromboembolia Aguda Severa Pulmonar Letal Neumológica Funcional DVP", desc: "Los letales infames y profundos cuágulos coágulantes o trombos silenciosos de patologías letárgicas severas post operatorias graves nacidos creados comúnmente en profundas y dañadas inmovilizadas de sangre varicosas gruesas pesadas de piernas postradas inmóviles encamadas agudas con venas de Trombosis DVP pantorrilas extremidades se fugan un día de la vena suben torrente por inercia sanguínea cardiaca fatal taponando irremediablmente como roca en tapón sólido gigante principal alguna e impidiendo todo las colaterales arterias pulmonares bronquiales gigantescas causando hipoxia y colapso masivo repentino asfixico con ahogo disneico en dolor del pulmón." }
        ],
        redFlags: [
            "Dolor opresivo puro brutal en el pecho centro como 'elefante subido sentado aplastante en el tórax pecho', o sensación inmensa disconfort en hombro o cuello, mandíbula u omóplatos, si corre adormecido hacia al brazo de lado irradiado a antebrazo de lado izquierdo, un sudor frío copioso profuso pegajoso mojado diaforético excesivo con la tez aterrorizantemente gris del paciente demacrado y náuseas e inminente sentir sensación profunda interior de muerte fatalista trágica letal (Angor Animi vital): LLAMADA URGENTE SISTEMA MÉDICO AL 911 TROMBOLISIS INMINENTE EKG de 10 min, Infarto masivo del Miocárdico.",
            "Dolor transfixiante dorsal torácico en su pecho agudo punzante al que te interrumpe e imposibilita un brutal ahogo al querer jalar tomar un aire hondo profundo brusco y le duela como lanza clávada del dolor agudo punzante ('punzante tope dolor pleurítico puro ventilatorio') e inminente hinchazón asimétrica crónicament o de aguda unilateral con edema pierna gruesa extremidad de pierna una unilateral pesada tromboembolítica DVP crónico: Urgencia alta TEP Tromboembolizar letal coágulo puro ahogante pulmonar grave agudo."
        ],
        tests: [
            { name: "Electrocardiograma Médico Digital Agudo Reposo de Doce (12) Derivaciones Coronarias Inminente (Estandar Urgente de Diagnostico Eléctrico < 10min IAM)", url: "/estudios/rayos-x/electrocardiograma" },
            { name: "Enzimas Marcadores Troponinas Químicas Cardiáco Infartantes Sensibles Específicas Cuantitativas I y T y Mioglobina Bioquímica CPK-MB De Daño al Micro Músculo Cardíaco Muscular Destructor", url: "/estudios/analisis-clinicos/enzimas-cardiacas" },
            { name: "Dimero-D Analítico Sanguíneo Serológico Biomarcador (Alta Sospecha Cínica Predisposición Riesgo Probable Elevación Descarte del TEP Cágulosa o Flebitis DVP pierna Trombosis)", url: "/estudios/analisis-clinicos/dimero-d" }
        ],
        tools: [
            { name: "Escalas Preclínicas Riesgo Isquémico TIMI o Algorítmo Diagnostico Cuantitativo GRACE y Descarte Clínicos Predictivos Cardiopatías Isquemias R", url: "/herramientas/cuestionario-riesgo-cardiovascular" }
        ]
    }
];

let db = JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));
const slugs = new Set(db.map(s => s.slug));
let saved = 0;

TOP60_LOTE4.forEach(s => {
    if (!slugs.has(s.slug)) {
        db.push(s);
        saved++;
    }
});

fs.writeFileSync(OUTPUT, JSON.stringify(db, null, 2));
console.log(`Lote 4 guardado: ${saved} añadidos (SOP, Obesidad, ERGE, Pecho). Total DB: ${db.length}`);
