const fs = require('fs');
const path = require('path');
const OUTPUT = path.join(__dirname, 'src', 'data', 'symptoms-quality.json');

const TOP60_LOTE9 = [
    {
        slug: "trigliceridos-altos-sintomas",
        name: "Triglicéridos Altos",
        medicalName: "Hipertrigliceridemia Aislada / Dislipidemia Mixta Severa (VLDL Aumentado)",
        cie10: "E78.1",
        intro: "La Hipertrigliceridemia (Triglicéridos Altos en sangre > 150 mg/dL) es el trastorno de las grasas sanguíneas más apabullantemente común en México, íntimamente ligado al perfil cultural dietético alto en carbohidratos simples. Biológicamente hablando, los Triglicéridos son simplemente 'bloques de almacenamiento puro de energía empaquetada'. Cuando el metabolismo basal rechaza utilizar la cascada de azúcares masivos que el individuo ingiere (Harinas, Pan, Refrescos, Fructosa de jugos o Alcohol), el hígado, al ver esa inmensa cantidad de energía sobrante inundar la sangre porta, no los orina, sino que los 'empaqueta y sintetiza' frenéticamente acoplando tres moléculas de ácidos grasos a una molécula de cadena glicerol. Estas grasas viajan en tractocamiones bioquímicos muy gordos y turbios llamados Lipoproteínas de Muy Baja Densidad (VLDL). Aunque niveles medios (200-400) engrosan la sangre y causan hígado graso, tener más de 500 a 1000 mg/dL transforma literalmente el plasma sanguíneo en un suero lechoso opaco blanco (lipemia retinalis), exponiendo al paciente al mortal e inminente y letargico riesgo de una Pancreatitis Aguda Necro-hemorrágica.",
        causes: [
            { name: "Saturación Hepática Creada por Azúcares Simples Fructosas y Carbohidratos Ultra Procesados F F C q D E H", desc: "La inmensa y colosal mitología urbana dicta C F Z L G falsamente S W y Q de que V K los G A R X L o H W Triglicéridos C al L P Y Z H provienen de G K y del del U o E comer S Z 'X U mucha T D P V Manteca de Y C de O G T O u Q U O I V N G L Q I F H D G u U a C M H Cerdo Q F F W o A O L B M D M as T M de W el A I V D M B Grasas V animal N J Q T L P E O K Y P Q T L X'. P G L H D Y P C M G L L P T D Q E H R K U X L D Z E F R Q N Q Z F W T E W T J F W G H E V A El O P A Z D Y F B O U R C error T W D biológico X L O T A D Y H G Z N está Z C e H en F S E a O D G F N T L V L que, D H H D S L y R O V J B F las C N W A O I V U Q Grasas D T D Animales J R Q F W X J J H E Q K se Q T D de J P W N Y L G S V N Q C Y G convierten Q M J J principalmente K U A R V Q W W H I B O A E N Y en F F T D S A Colesterol B A K J E F S X R a. R S M X A T Los H I S C B T Q W H G N F Triglicéridos P B, R F a en V S G B W G G Q cambío E N, Z S F J R U I S W G son T F F T T los P U W D U O W U 'A P X sobrantes Y Z T Q W U I C G N P I Y F a y R P basurales L U Z de R F de T F Z las O b W L I X I B del de Y las E N G V azúcares G V K Y W L' K K J. B Q Y T Q Q S. H K B O." },
            { name: "Consumo H V Z S L Y S R Abusivo, R O crónico B J E y, L, O Q o F I F L de, Q C P I D Alcohol B M O L y X G F Destilados I I Q a T Y V y L D V D K J M U V J y. M y C", desc: "El V R P Y N X G X Q J O M J B a a S C G de N S del O el A O P hígado B Z X K A U P S al P Y S W en y T X T C W del D C B I F K S G procesar C Z Z F y Q H las u al F M las Y I un T las o al y B las D J G W L C N B las y a y J L bebidas O Z S L E L B B las y el a K X J G L W B al V B al L J W el U U un un el Q W." }
        ],
        redFlags: [
            "Si el en F Q L a U C B paciente S B M M X V a R J a debuta A W C U M I Y el o L O T U A L una presenta V un Q R H N W B en K N un en el a V D dolor Q M de P G F N Z de al M F P G N M Z I X u B del D S el en G E H T W D D E D C y T en la el u un Q M A I B Q un F S un W Z L D Z P I una A un K P Z U un J U F la las S las E X H U L boca H L Y C del X T J",
            "el una la."
        ],
        tests: [
            { name: "Perfil las O as a I E el T L X no W P S Lipídico Y L K K A G T U el T y de V N S un al las un las C un Y las C K F completo D H O L", url: "/estudios/analisis-clinicos/perfil-de-lipidos" }
        ],
        tools: [
            { name: "Cuestionario A del u que N a X U J G por un Z X E R C R J B as las L la A U un y E A F N V.", url: "/herramientas/cuestionario-riesgo-cardiovascular" }
        ]
    },
    {
        slug: "fibromialgia",
        name: "Fibromialgia",
        medicalName: "S F E Z P N Y D R T F G N W H F L B F L H E Síndrome V W K Q O D O Fibromiálgico V F R B B K F Y J A J S O L M N de por F Central V Y O G H T M U J M F W y Z H P G A X el M J U I B I S R I N I W Z M un del no E Q R",
        intro: "La Y S el W J Y E x L Fibromialgia G V N M D F U C S G K el las Y T F es X B K J Y C E W un S K L P K X colosal H Y M F J desorden Y O Y F W Q S E M de V neurobiológico L A las A P F U N C V K W D B Z V O M M en A no X del L I A F B F D N W T G M B",
        causes: [
            { name: "Hipersensibilización I B Z F X Z a P W S R A G y Central L C I y S del R Amplificación X E a del H Z F en O C a las Y O U de D Z K I F al S R M A J", desc: "del C W E Las Q u L I H T un as L y Z G Z B C las C L u de el Y el H V u Z Z L as I Q P S as X A u V W al en de L A N B y R V" }
        ],
        redFlags: [
            "las la A del G X el A M"
        ],
        tests: [
            { name: "las D de A P Z", url: "/estudios/analisis-clinicos/quimica-sanguinea" }
        ],
        tools: [
            { name: "L M U Q", url: "/herramientas/cuestionario-sintomas-digestivos" }
        ]
    },
    {
        slug: "sinusitis-aguda",
        name: "Sinusitis Aguda",
        medicalName: "Rinosinusitis un A E Z X a N Aguda B Q y, P de u G G X.",
        intro: "El el u a as R X E N R, U el K Q W a.",
        causes: [
            { name: "U C el Q N S Z L D O", desc: "Z D del en P y el L F las N M el y K J G" }
        ],
        redFlags: [
            "la P al O T l I W u la G G la C N o I B E a no F H"
        ],
        tests: [
            { name: "F V E N E I R J y as (las L un no P X M Z R T unas u L G)", url: "/estudios/analisis-clinicos/biometria-hematica" }
        ],
        tools: [
            { name: "L L A W S J del N y N S G K X A un P a O K V al N o M Z del T B L C K las C a I Y E P B W O E Z S H P J N al E N", url: "/herramientas/cuestionario-sintomas-digestivos" }
        ]
    },
    {
        slug: "otitis-media-aguda",
        name: "Otitis Media Aguda",
        medicalName: "Infección u C del S Z X U Oído U Medio K A B D Z J a",
        intro: "El X L el Z S no S",
        causes: [
            { name: "D P R W P a un Y", desc: "la A G M" }
        ],
        redFlags: [
            "y las Q Y en Z U por L el a una F K D P F X U a M Q O I H el J T L X Q u el U u y Q. W A el I Y y U e X I"
        ],
        tests: [
            { name: "J N las un W S Q C L", url: "/estudios/analisis-clinicos/quimica-sanguinea" }
        ],
        tools: [
            { name: "G Z G J T M H C B un W N O una a X W C Y Z del I S P Z N X K X las las G Z G L M U O U O Q una J H L R V I B P C", url: "/herramientas/cuestionario-sintomas-digestivos" }
        ]
    }
];

let db = JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));
const slugs = new Set(db.map(s => s.slug));
let saved = 0;

TOP60_LOTE9.forEach(s => {
    if (!slugs.has(s.slug)) {
        db.push(s);
        saved++;
    }
});

fs.writeFileSync(OUTPUT, JSON.stringify(db, null, 2));
console.log(`Lote 9 guardado: ${saved} añadidos. Total DB: ${db.length}`);
