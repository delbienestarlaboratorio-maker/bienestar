const fs = require('fs');
const path = require('path');
const OUTPUT = path.join(__dirname, 'src', 'data', 'symptoms-quality.json');

const TOP60_LOTE5 = [
    {
        slug: "dolor-cervical-cronico",
        name: "Dolor Cervical Crónico",
        medicalName: "Cervicalgia Mecánica / Síndrome de Tensión Cervical / Text-Neck",
        cie10: "M53.1",
        intro: "La Cervicalgia Crónica (dolor de cuello superior a 12 semanas) se ha convertido en una pandemia ocupacional silenciosa, afectando a más del 50% de los oficinistas y usuarios intensivos de smartphones en México (el llamado síndrome de 'Cuello de Texto' o Text-Neck). Biomecánicamente, la cabeza humana adulta pesa entre 4.5 y 5.5 kg en posición neutral (0°); sin embargo, por cada 15° de flexión anterior del cuello al mirar una pantalla, el estrés sobre la musculatura cervicodorsal y discos cervicales se multiplica exponencialmente (hasta 27 kg de peso efectivo a los 60° de inclinación). Esta palanca sostenida agota isquémicamente y contractura a los músculos trapecios, esplenios y elevadores de la escápula. El 80% de los casos son puramente mecánicos-posturales sin compresión de nervios (sin radiculopatía), caracterizados por dolor sordo, rigidez matutina para girar el cuello y frecuente irradiación tensional hacia la base del cráneo (cefalea cervicogénica) o los hombros.",
        causes: [
            { name: "Sobrecarga Postural Prolongada (Falla Biomecánica)", desc: "Mantener el cuello en flexión isométrica ininterrumpida restringe el flujo de sangre (isquemia focal) hacia los músculos extensores del cuello trasero. Al quedarse sin ATP (energía) y oxígeno para relajar sus fibras de contracción intercruzadas actina-miosina, las bandas musculares se traban formando 'puntos gatillo' miofasciales dolorosísimos en trapecios superiores que irradian un dolor referencial hondo hacia los hombros romboides y cabeza cráneo superior." },
            { name: "Degeneración Discal Cervical (Espondilosis Cervical Artrosis)", desc: "A partir de los 40 años, la deshidratación y micro desgaste repetitivo de los discos intervertebrales de cartílago (especialmente entre las vértebras más móviles C5-C6 y C6-C7) reducen dramáticamente el espacio amortiguador. Los bordes de hueso chocan micro rozando, formando picos calcificados reactivos puntiagudos compensatorios perimetrales (osteofitos o picos de loro). Es una causa de dolor crónico cervical de fricción basal matutina y rechinidos crepitantes (crujido de cuello arenoso)." },
            { name: "Disfunción Facetaria Cervical (Síndrome de la Articulación Facetaria)", desc: "Las minúsculas articulaciones diartrodiales posteriores que conectan y embonan cada vértebra del cuello hacia la siguiente están altamente inervadas sensitivamente por un pequeño nervio diminuto medial doloroso. Cuando la postura adelantada del cuello fuerza una hiperextensión cervical alta compensatoria para mantener la mirada al frente en pantalla superior, estas articulaciones se aplastan cronicamente rozándose generándose un dolor agudo como 'picahielo o punzada pura clavada' muy severa focalizada al querer extender rotar profundo la cabeza hacia el sitio afectado lateral." }
        ],
        redFlags: [
            "Cervicalgia dolor + debilidad aguda de brazos mano o pérdida repentina incontrolable inexplicable al querer sostener una taza o de motricidad fina abotonar camisas + hormigueo descargas crónicas que bajan como línea eléctrica por todo el largo del brazo: Radiculopatía compresiva cervical grave pura (Pinzamiento medular radicular neurológico que exige RM resonancia para descartar hernia aguda operativa).",
            "Dolor severo de cuello brusco en reposo + FIEBRE elevada sudorosa inexplicable repentina aguda profunda + Rigidez colosal espástica trabando que hace completamente casi imposible tocar flexionando lograr la barbilla propia hacia pecho (Signo meníngeo) : ALERTA URGENTE NEUROLÓGICA (Descartar aguda y fulminante pero salvable Meningitis infecciosa del SNC en clínica de choque urgencias INMEDIATA)."
        ],
        tests: [
            { name: "Resonancia Magnética Estructural Pura Cervical de Fosa Medular Pura T1 T2 y Descarte Radiculopatía Estenosis (Diagnóstico Oro C5-C6)", url: "/estudios/imagenologia/resonancia-magnetica" },
            { name: "Gabinete Radiológico Especializado Rayos X Placa Cervical Neutra Dinámica (AP, Lateral y Vistas Oblicuas Dinámicas para Pinzamiento Funcional de salida)", url: "/estudios/rayos-x/columna-cervical" }
        ],
        tools: [
            { name: "Indice Cuestionario NDI Mundial de Evaluación Discapacidad Dolor Limitancia Cervical Crónico Escala R", url: "/herramientas/cuestionario-oswestry-lumbalgia" }
        ]
    },
    {
        slug: "hipotiroidismo-sintomas-mujer",
        name: "Hipotiroidismo",
        medicalName: "Disfunción de Falla Tiroidea Sistémica / Enfermedad de Hashimoto Auto Inmune Glandular",
        cie10: "E03.9",
        intro: "El Hipotiroidismo representa una catástrofe metabólica endócrina sistémica brutalmente subdiagnosticada, una pandemia invisible predominante (9 a 1) en mujeres a partir de su tercera década de vida. La inmensa mayor causa en todo el occidente mexicano contemporáneo es exacerbadamente la Tiroiditis autoinmune (Enfermedad de Hashimoto): una condición donde por desequilibrios del microbioma intestinal, permeabilidad alta y estrés oxidativo genético, el propio escuadrón inmunológico erróneamente crea un batallón de letales linfocitos y anticuerpos ciegos (Anti-TPO / Anti-Tiroglobulina) que acuden en tropa a asfixiar, morder, quemar y destruir silente y progresivamente la glándula basal de la tiroides en el cuello por la infinidad de años hasta atrofiarla e incapacitar la producción endógena de las vitales hormonas T3 y T4 libre plasmática. Esto enlentece la totalidad de millones de mitocondrias y fábricas energéticas ATP del cuerpo: el pelo cae, la piel se engrosa letárgica fría y reseca, una neblina mental fatíga al cerebro cognitivo y el metabolismo frenado ahorra y absorbe todo gramo crónico mutado transformado inevitable a masa grasa pura (Ganancia de peso).",
        causes: [
            { name: "Tiroiditis Autoinmunitaria Letal Degenerativa Infiltrativa Agresora T (De Hashimoto)", desc: "Los linfocitos T-cd8 citotóxicos infiltrativos asesinos y el suero anticuerpo Anti-Peroxidasa TPO atacan implacable y continuamente los folículos de tirocitos encargados directos de producir las moléculas tiroideas. La glándula entra en apoptosis muerte celular, fibrótica asintomática sin doler reduciendo paulatinamente irreversible sus remanentes fábricas intactas sin que el paciente note a veces nada en años, mas que una sutil fatiga general progresiva por la baja lenta natural diaria." },
            { name: "Hipotiroidismo Funcional Cortisol Subclínico Disautonómico Adaptatorio Secundario del Eje Hipofisario (Por Estrés Allostático Severo Alto)", desc: "El individuo sumido sometido a traumas colosales estrés inmenso tóxico adrenal o privaciones crónicas de duelo prolongadas o ayunos hipocalóricos estrictos letales elevan cortisol que crónicamente descompone la conversión natural del hígado hepática periférica de la molecular prohormona inactiva 'T4' a su forma libre celular biológicamente encendedora Activa 'T3 libre directa al hígado'. Al no haber T3 disponible intracelular tisular pese a que sus análisis clínicos del TSH y T4 general genérico del Doctor general puedan salir ilusoriamente engañosamente 'en laboratorios Rango Normales de Referencia Laboratorios', la célula está funcionalmente basal lenta moribunda y padece todos los síndromes clínicos hipotiroideos francos claros físicos." },
            { name: "Ablación Yatrogénica Radiación Q Exéresis Quirúrgica o Tratamiento por Graves Ablativo", desc: "Decena de millares de pacientes que en periodos cursaron un estado opuesto clínico inicial de una brutal peligrosa tormenta hiperactiva tiroidea alta letal cardiaca grave aguda (Hipertiroidismo Enfermedad De Graves), a menudo son en control clínico estabilizador obligatoriamente quemados sus tiros irreversibles irradiándoselos controladamente con dosis ablativas puras precisas terapéuticas de Yodo I-131 Nuclear o tiroidectomías. Su meta biológica curativa intencionada total clínica a propósito erradicante intencionada y controlada, es dejarlos de por vida basal en deficiencia controlada de (Hipotróidicos) forzando el ser sustituidos ya exógenamente y para la eternidad de los años mediante Levotiroxina T4." }
        ],
        redFlags: [
            "Letargo abrumador somnolencia extrema desregulada estupor de un paciente comúnmente añoso hipotiroideo muy descompensado inmenso no medicado y suspendido y sin adherencia medicamentaria + piel masivamente hinchada con líquido mucoide edema blando frío que no deprime, hipotermia brusca franca severa peligrosa al tacto <35°C, lentitud respiratoria e hipotensión caída sistólica brusca grave: Coma Mixtedematoso Temible (Mortalidad altísima del 40-60% sin terapia intensiva endovenosa de T4 UCI inmediata).",
            "Crecimiento brutal en el contorno del cuello anterior sorpresivo irregular asimétrico palpable gigante (Bocio) duro y multinodular de características consistenciales petrosas como piedra inmóvil endurecida fijos que crecen rápidamente < 6 semanas enclavados con ronquera en voz sin dolor asfixiándoles de tragar: Exclusión Oncólogica descarte primario de sospechoso Carcinoma Anaplásico o Papilar de tejido Tiroideo R."
        ],
        tests: [
            { name: "Panel Perfil Hormonal General Tiroideo Completo TSH, T4 Libre Sérica y fundamental T3 Libre C", url: "/estudios/analisis-clinicos/perfil-tiroideo" },
            { name: "Cuantificación y Determinación Clínica Serológica Auto de Anticuerpos Antitiroperoxidasa (Anti TPO) R y Anticuerpos Antitiroglobulina R", url: "/estudios/analisis-clinicos/anticuerpos-antitiroideos" },
            { name: "Ultrasonografía Doppler Ecografía Diagnóstica Tiroidea Plena Cuello Estandar TI-RADS Estructural (Detectar y tamizar presencia inflamada bociógena nodular pura estructural volumétrica R)", url: "/estudios/imagenologia/ultrasonido" }
        ],
        tools: [
            { name: "Escala Sintomática Validada de Colorado de Signos Sintomáticos Puntaje Función Diagnóstica", url: "/herramientas/cuestionario-hipotiroidismo" }
        ]
    },
    {
        slug: "asma-bronquial-sintomas",
        name: "Asma Bronquial",
        medicalName: "Enfermedad Respiratoria Reactiva Atópica / Componente Broncoespasmo Asmático Agudo",
        cie10: "J45.9",
        intro: "El Asma Bronquial es la enfermedad inflamatoria in-crónica neumolóhica más prevalente de las vías respiratorias en épocas infantiles y sumamente común remanente al paso del crónico del adulto. Patológicamente se forja por una base estructural de una exacerbada 'Hiper Reactividad Bronquial Exagerada Inespecífica (HRB)': los hermosos delicados conductos musculares ventilatorios intra pulmonares bronquiales que comúnmente trasladan el aire alveolar tranquilamente, están basal e inmunológicamente silentes saturados de millones de linfocitos mastocitos de cebadas en vigilancia constante eofsinofílica letal (inflamación Th2). Al tan siquiera percibir inocentes y no letales irritantes aero inhalados minúsculos triviales para un humano sano normal (ej. una espora microscópica inofensiva de humedumbre, polen invisible floral, simple caspa de pelos tiernos felina, vientos de friales neblinosos polares de una madrugada cruda helada, e incluido el esfuerzo de agitación de maratón risa), se desata instantánea e infaliblemente en segundos una desgranulación en cascada mortal de histaminas puras alergénicas leucotrienos. Esta lluvia letal acribilla estrangula en espasmo ahogante contrayendo cerrando el poderoso músculo anular en bronquio respiratorio asfixiando por estrechez sus lúmenes ventilatorios que por inercia aguda, sumados con un exudado de moco interno colosal pegajoso letárgico, ocasionarán las tres crisis patognomónicas del agobio: Tos seca perruna constante, Dificultad extrema opresiva restrictiva de jalar suplicar aire sediento e Insufrible quejido clásico al sacar aire de espiración un siseante silbido asmático (Sibilancias torácicas clásicas ruidosas o de grillo chillón).",
        causes: [
            { name: "Inflamación Crónica Eosinofílica Alérgica Intrinseca Genética T2 (La Base)", desc: "El origen no es el broncoespasmo per se instantáneo del músculo y su broncodilatación, el asma subyace porque la pared endoluminal bronquial es un tejido epitelial rojo hinchado inflamado dañado exudativo con infiltración perimetral por engrosada pared destructora microscópica eosinofílica e Inmunoglobulinas de rastreo altísimas en alergia base (IgE sérica elevada). Este terreno 'tóxico de remodelación quemada bronquial previa' predispone y la vuelve un blanco híper caprichoso fácil en irritabilidad crónica extrema de broncoconstricción violenta. Es controlable." },
            { name: "Asma Reactiva de Variante Ejercicio Físico Severo Esfuerzo HRB", desc: "Tras 5 o 10 minutos de una alta demanda respiratoria atlética pulmonar trotando ventilatoriamente forzado en agitación e incursionando en alta frecuencia, el constante alto rápido flujo friccionante incesante de aire frío y ambiente extra seco atmosférico por boca, reseca rápidamente el sensible moco epitelio celular barrera de células pulmonar deshidratando brutal el lecho vascular pulmonar. La hiper osmolaridad reactiva por deshidratación dispara instintivamente una agresiva masiva inmediata secreción alocada mediada histaminérgica bronco contrayéndose asfixiando estérilmente la vida. Responde gloriosamente en 5 min inmediato con su inhalador pre Beta-2 agitador selectivo antes Salbutamol pre ejercicio." }
        ],
        redFlags: [
            "Crisis Asmática ahogante cianótica grave aguda Severa que el PICO y el PICO letal broncoespasmo está tan monstruosamente paralizante mortal cerrado o tapado con mocos densos duros, que en la examinación urgencias clínica literal el estetoscopio médico puro en exploración pulmonar auscultación está asoladoramente total MUERTO y apagado sin ningún aire pasar ni mover escuchando SIBILANCIAS O CHILLIDOS (SILENCIO MORTAL TORÁCICO) : RIESGO DE VIDA EMERGENCIA DE CHOQUE MORTAL VENTILATORIA OBTENCIÓN INMEDIATA UCI NEUMOLÓGICA INTUBACIÓN INMINENTE CORTICOESTEROIDES METIVOS VENOSOS MASIVOS PARA NO FALLECER ASFÍCTICOS.",
            "Paciente asfixiándose visiblemente usando en tracción hundiendo dolorosamente severo todos sus músculos intercostales del cuello de tracciones (Tiraje Intercostal inspiratorio visible franco costillar clavicular), sudando aleteando nariz, con nivel letargo letárgico o confusión borrosa severa (Bajo O2 oxígeno hipercapnia cerebral ahogado en CO2 letales altos) y que literal fisiológicamente ya no es siquiera en potencia capaz siquiera de completarte una simple frase plática verbal por asfixia de jadeos puros hablados en fragmentos monosílabos — Rescate inminente emergencias intrahospital."
        ],
        tests: [
            { name: "Espirometría Flujo Estandar Simple Pulmonar Dinámica Inhalatoria Total y post de Prueba Con Inhalador de Reto Reversibilidad Aguda Broncodilatador (Descarte Clave Diagnostico)", url: "/estudios/checkups/check-up-respiratorio" },
            { name: "Biometría Hemática Pura Serológica Escaneo Global Absoluta (Detección Rastreo Nivel Invasión Basal Excesiva Elevada de la Serie Eosinófilos en plasma o rastreo Infecciosas agregadas Exacerbativas G)", url: "/estudios/analisis-clinicos/biometria-hematica" },
            { name: "Pruebas Generales Inmunitarias Serológicas Rastreadoras IgE Inmunoglobulina Sérica Plena y Paneles Alérgenos (Detectar y cuantificar factores gatillos precipitantes antígenos inhalables específicos del hábitat ácaro felino epitelio M etc)", url: "/estudios/analisis-clinicos/estudio-de-alergias" }
        ],
        tools: [
            { name: "Cuestionario Validado Autoevaluación Score ACT (Asma Control Test Estandar) Global Evaluación de Gravedad Control Sintomático Grados Internacional G", url: "/herramientas/cuestionario-asma-control-act" }
        ]
    }
];

let db = JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));
const slugs = new Set(db.map(s => s.slug));
let saved = 0;

TOP60_LOTE5.forEach(s => {
    if (!slugs.has(s.slug)) {
        db.push(s);
        saved++;
    }
});

fs.writeFileSync(OUTPUT, JSON.stringify(db, null, 2));
console.log(`Lote 5 guardado: ${saved} añadidos (Cervicalgia, Hipotiroidismo, Asma). Total DB: ${db.length}`);
