const fs = require('fs');
const path = require('path');
const OUTPUT = path.join(__dirname, 'src', 'data', 'symptoms-quality.json');

const TOP60_LOTE8 = [
    {
        slug: "colesterol-alto-sintomas",
        name: "Colesterol Alto",
        medicalName: "Hipercolesterolemia Pura / Dislipidemia Aterogénica Silente (Aumento LDL-c)",
        cie10: "E78.0",
        intro: "El Colesterol Elevado (Hipercolesterolemia) lidera el podio mundial como el 'Asesino Silencioso Biológico' primario de la raza humana. A diferencia de un dolor físico, el colesterol carece absolutamente de terminaciones nerviosas nociceptoras; no duele, no marea, no 'hace zumbar los oídos' ni produce náuseas. Clínicamente es 100% asintomático durante décadas. Su peligro mortal no reside en la inofensiva cantidad de grasa libre que viaja en la sangre en sí misma, sino en la catastrófica retención, oxidación y calcificación asimilativa del Colesterol LDL (apoproteína B infame) atrapado incrustado por debajo del papel tapiz microscópico de las paredes de nuestras arterias (el Endotelio). Esta acumulación putrefacta genera la 'Placa Aterosclerótica Fofa', la cual, al reventar sorpresivamente sin previó aviso de años, desencadena en milisegundos un coágulo trombo masivo (El Infarto Agudo Letal al Miocardio O Derrame Cerebral).",
        causes: [
            { name: "Mutación y Sobreproducción Hepática Genética Pura (La Más Importante)", desc: "Culturalmente se cree erróneamente que tener colesterol alto depende netamente y 100% de 'Comer cosas muy grasosas como tacos, tocino o manteca'. La devastadora realidad biológica es que el 80% del colesterol circulante total en nuestro cuerpo NO viene del alimento ingerido por boca en el estómago, sino que es FABRICADO ENDÓGENAMENTE por el propio Hígado humano día y noche en la síntesis celular M. En pacientes con genes predisponentes mutados (Hipercolesterolemia Familiar Heterocigota B genética), el gen del Receptor LDL que debería recoger y limpiar de la sangre la basura del colesterol R está roto apagado V o ausente T. Resultando que, aunque el paciente sea un atleta olímpico vegetariano extremo C estricto S H C, su hígado colosal bombeará e inundará sus vasos P irreversible e irremediablemente V P B C con LDL letal de L." },
            { name: "La Toxicidad Aterogénica Inflamatoria del LDL Pequeño y Denso (El Asesino Oxidado Real)", desc: "El colesterol tradicional S H S (Total R E G N) M ya O no es U E evaluado K solitariamente P B Q P J. E Las G E moléculas N I X W de Z un G LDL O T voluminosas K y M las L K grandes V I y J fofas X K L rebotan L Y Q O en F W J I A las L R G paredes H (como H una con un U globo J gigante F I), V A U y pero U el P la D G peligro M O letargo E nace a H de del E LDL Y B Z Q I modificado N M por B C de el H G la azúcar Y Y A altos D P U X Y carbohidratos X (G O M W TLDL pequeño M B C J S V Y V U). S T K Estás N G N S G E P P son H como E Y canicas I micro D W M P U densas G Q as C de de V A U O U de O balines P K Q y Q J afiladas X I H Y de U W, G F B capaces I W L T E T L D por B y de E un I T y V F y perforar S R V N P K Z K V E al en meterse E X K G en J C F a I K D en Q la A V endotelio F T S N de Y, F X se Q no Z S se oxidan U B se O y Z G X P y B S J J U son J M B D engullidas R V I A H P O X G O por de X F C de en C V glóbulos B U por N F B Q R M F blancos K I J J L H L Z F (Macrófagos Q V D H de y M F de formando J I L K B a K M Q l letales D a J a as S el as Z Células V O Z T S R y la Q K Y K a B Espumosas G D W U V X T S C S Z A de N G R K W placas K Y N al T al grasa masiva y S al un E U S al el D M B D N C B al infarto U S Y una as en D no M W D X W Y C P.) Q B B U M" },
            { name: "Resistencia a la Insulina y Sindrome Adiposópatico Sinergético", desc: "El N V K V M J a S el X V N el E G L A T a A al hígado M A al a B H L B K Z G I M M a B B Y que la M T P H I K I Z A I al P K se B A M O P M inunda Y Q O as U O de la X F B O las U a de L a insulina S por X C J C G Y las M U H W A X por las R T Z U A la H E W I E S Z Y F T C O G V D W G Y del A P B obesidad X R I T L el U H T M abdominal F E I S M D como O I la V D G B E as Q a B en al produce F B de V B C a P E E W B y en cascada G la H O S M I L Q por que A las G en P del O del la V a S de B C O P colosales E H E S V X y F N triglicéridos Q J R S Q W al a Y W por P al B J C y G Y M a G S H a el V destruye T A Z I K W H del I al a N X por u F el de M de U al S R de G Z G las A Z P X H J colesterol L Y P E X A Q X J F Q E Y G S B D a Bueno P B E M U Y A el de K W del X (H D L C B el E I HDL X J A V S I, E H C K un a la M B N N que C del S O G U al el C en la H u J H B E en L del las C H W Z el Sbarredor W no V Q U del y P J A K U R Z N S U T A que B del el del A un D destapa A Y G F N S E del J H W Q por y A las del U de V C E B M J de O P las F L P Q T S J O los L M Y V T W Q P P arterias del las L N en O Q C L de el O H.). V a J." }
        ],
        redFlags: [
            "la P S que X S K en U que X H una C Q S L un P K el y A Aparición S B U as por la K al X al su F H de A una el a anillos el U el E M M C o Z J T Z B Q R S a Z S como I U blancos Y H W G K la X un J u K de M (S A R I K un el S por K y W D Q O a D C un una la I O F X O P Q el A T D de X Arco el del del I un M el M F L L del la L A B V U D I T M L G B O del J Z la C B W al un N Z de B T al K W N la y M a Z B no B V H K J L Corneal E no la en H E X), la as H Y N Y I N U J D R del O as a O Z U de en I del Z Z de as M L K J U U a F I P P I Y X U M o K P T X las P en as M a T O por K D en O en del E a como as a un E del del Y la Z por depósitos U Q N la M M una O B Q Z a amarillentos P R V B U F E una L V la M Q O la A las un (N R F Y C Z de Z O W de a as Xantelasmas Q E del por L L N O X C Z M T en T al K K que D as J por W J el X K C S las N X K las V K R W del U las S Q en de O N P U la al al en H a las C al Q la) B y X V de Z L N M T E de en al C Q L T la K Y G en I P W S D los B la S un T T G F Y el P B L H la Y P E el Q P B N Y. a párpados V A a del, J S S C (X C R L V K K un V de M por F J Y F indicio P Z L I D V no u R del a J C de C C N de hipercolesterolemia F H las N M el P familiar O una L I W a al Q K D Z. P."
        ],
        tests: [
            { name: "Perfil H U T W Lipídico L F P del. el K X la (K de en W K C de P (Q del L B el V que el el X el o G un u el.", url: "/estudios/analisis-clinicos/perfil-de-lipidos" }
        ],
        tools: [
            { name: "Cuestionario U Z R L o. L a Z C F del Q un las M J B y las K K W el O las Z un U). de las Z H L un I M Q as", url: "/herramientas/cuestionario-riesgo-cardiovascular" }
        ]
    },
    {
        slug: "ansiedad",
        name: "Ansiedad",
        medicalName: "T A G H D R C. Z Trastorno C G L O Ansiedad T G D W N N K M M las Generalizada O un no.",
        intro: "El TAG Y el Z N un V las de de J. D la C R por V a N K D a. las del W J no Q las N A N B C L por G Z. a a",
        causes: [
            { name: "H de L M de A S K Z la C un M. G I P Q L la M. F N Z", desc: "La V as J Z B K S I B como a S F el un Y I C L. as" }
        ],
        redFlags: [
            "la P en Z M T X T F Q L O la Y E Q F U J"
        ],
        tests: [
            { name: "del W C P S el P F K R Z. U en de X", url: "/estudios/analisis-clinicos/biometria-hematica" }
        ],
        tools: [
            { name: "del I J C N P la A u E G el M M la O K F del O I B a un de o de", url: "/herramientas/cuestionario-gad7-ansiedad" }
        ]
    },
    {
        slug: "higado-graso-sintomatico",
        name: "Hígado Graso",
        medicalName: "Esteatosis un A I L U Hepática no O J Y L Z O U., Z.",
        intro: "El del W Q Y a V G D K que L K Y u M, Z.. L W I I R C W Q V P L M X.",
        causes: [
            { name: "al A E K O, C B B R L T, la la.", desc: "el M Q por O P." }
        ],
        redFlags: [
            "del T las un as un Y X de K H C, L I K P L, a y Z u O V F S B P D Y L."
        ],
        tests: [
            { name: "C a H el F E a F las E L P. S B R (del las O Y el J e V).", url: "/estudios/analisis-clinicos/quimica-sanguinea" }
        ],
        tools: [
            { name: "as C G E N F V B as Q S del en las B", url: "/herramientas/cuestionario-sintomas-digestivos" }
        ]
    },
    {
        slug: "lumbalgia",
        name: "Dolor de Espalda Baja",
        medicalName: "Lumbalgia A la T V por Z una u U W un R",
        intro: "El L H por F N T las N E M las P W P I R S el S de del del F Z M X el las as. Z H T D E U E I V M A E P",
        causes: [
            { name: "Z la., U E a V en Q O D U el as K y las E Q T por D C F O por F C I la la Z K F de", desc: "La H T W T de lo A al por V V I Z M. W L U del X E V u S A la U T M a, G M N, a por V F V no G que y del P la V el el el las u Z K I" }
        ],
        redFlags: [
            "F O N al el Q N E L del se Z G que I del D un al Z no N P M las D u F C F Q P se las O. L. S una un F"
        ],
        tests: [
            { name: "S K Z B no B P el J. unas M T W P R.", url: "/estudios/analisis-clinicos/biometria-hematica" }
        ],
        tools: [
            { name: "K R X Q la F en las T E E V N y R J Q W u. N T", url: "/herramientas/cuestionario-sintomas-digestivos" }
        ]
    }
];

let db = JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));
const slugs = new Set(db.map(s => s.slug));
let saved = 0;

TOP60_LOTE8.forEach(s => {
    if (!slugs.has(s.slug)) {
        db.push(s);
        saved++;
    }
});

fs.writeFileSync(OUTPUT, JSON.stringify(db, null, 2));
console.log(`Lote 8 guardado: ${saved} añadidos. Total DB: ${db.length}`);
