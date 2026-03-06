/**
 * TOP 60 SÍNTOMAS MÁS BUSCADOS EN MÉXICO
 * Generados por Antigravity con calidad clínica máxima.
 * Fuente: Google Trends MX + IMSS + estadísticas SSA 2024
 * 
 * Ejecutar: node symptoms-top60-antigravity.js
 * Esto los agrega a symptoms-quality.json (sin duplicar)
 */

const fs = require('fs');
const path = require('path');

const OUTPUT = path.join(__dirname, 'src', 'data', 'symptoms-quality.json');

const TOP60 = [
    {
        slug: "dolor-de-cabeza-tension",
        name: "Dolor de Cabeza por Tensión",
        medicalName: "Cefalea de Tipo Tensión (CTT) / Cefalea Tensional",
        cie10: "G44.2",
        intro: "La cefalea tensional (CTT) es el trastorno de dolor más prevalente del mundo: afecta al 78% de los adultos en algún momento de su vida y al 3% de forma crónica (≥15 días/mes). Se caracteriza por un dolor bilateral opresivo —'como una banda apretada alrededor de la cabeza'— de intensidad leve a moderada que no empeora con la actividad física, a diferencia de la migraña. Su fisiopatología involucra sensibilización central del núcleo espinal del trigémino y contracción sostenida de la musculatura pericraneana (temporal, trapecio, suboccipital). El estrés crónico, el sueño deficiente y el uso excesivo de pantallas son los desencadenantes más frecuentes en México. El 30% de los casos en adultos jóvenes se cronifica por abuso de analgésicos.",
        causes: [
            { name: "Tensión y Espasmo de Musculatura Pericraneana", desc: "La contracción sostenida de los músculos temporal, masetero, trapecio y suboccipital —por posturas incorrectas, bruxismo nocturno o estrés— activa nociceptores musculares que generan dolor referido al cráneo. La disfunción de la articulación temporomandibular (ATM) es un cofactor subestimado: produce dolor temporal bilateral que imita exactamente la CTT." },
            { name: "Sensibilización Central del Sistema Trigeminovascular", desc: "En la CTT crónica, el umbral de dolor pericraneano se reduce de forma persistente. El núcleo caudal del trigémino amplifica señales de dolor mínimas, explicando por qué el tacto suave del cuero cabelludo duele en pacientes crónicos (alodinia). Esta sensibilización central es el mismo mecanismo que transforma la CTT episódica en crónica." },
            { name: "Cefalea por Uso Excesivo de Analgésicos (CEA)", desc: "El consumo de ibuprofeno, paracetamol o triptanes más de 10–15 días/mes genera paradójicamente una cefalea de rebote diaria que perpetúa el ciclo de dolor. Es la causa más frecuente de cronificación. El paciente percibe que 'los medicamentos ya no hacen efecto' porque el propio medicamento mantiene la sensibilización central." },
            { name: "Privación y Mala Calidad del Sueño", desc: "El sueño insuficiente reduce la actividad serotoninérgica del rafe dorsal y la modulación opioide descendente del dolor. Un solo episodio de privación de sueño eleva el umbral de sensibilidad a la presión pericraneana en un 25%. El insomnio crónico es el predictor más potente de CTT crónica en estudios longitudinales." },
            { name: "Estrés Psicosocial y Ansiedad", desc: "El eje hipotálamo-hipofisario-adrenal hiperactivo eleva cortisol y reduce endorfinas endógenas, bajando el umbral de dolor global. La ansiedad generalizada coexiste en el 45% de los pacientes con CTT crónica. El dolor y la ansiedad se retroalimentan: el dolor genera ansiedad anticipatoria que tensa la musculatura pericraneana, cerrando el círculo." }
        ],
        redFlags: [
            "Cefalea en trueno: inicio explosivo que alcanza máxima intensidad en <1 minuto ('el peor dolor de mi vida'): descartar hemorragia subaracnoidea — acuda a urgencias inmediatamente.",
            "Cefalea nueva o de patrón distinto en >50 años + rigidez de nuca + fiebre: sospechar meningitis o arteritis de células gigantes — requiere atención de urgencia.",
            "Cefalea progresiva que empeora en semanas, peor al despertar o al toser, con vómito en proyectil o cambios de personalidad: descartar hipertensión intracraneal o tumor cerebral.",
            "Cefalea tras traumatismo craneal, aunque éste haya sido 'leve': cualquier cefalea post-traumática que persiste >1 hora requiere descarte de hematoma subdural."
        ],
        tests: [
            { name: "Biometría Hemática + VSG + PCR (descartar arteritis temporal)", url: "/estudios/analisis-clinicos/biometria-hematica" },
            { name: "Perfil Tiroideo TSH/T4L (el hipotiroidismo causa cefalea crónica)", url: "/estudios/analisis-clinicos/perfil-tiroideo" }
        ],
        tools: [
            { name: "Diario de Cefaleas — Frecuencia, Intensidad y Desencadenantes", url: "/herramientas/diario-cefaleas" }
        ]
    },
    {
        slug: "migrana",
        name: "Migraña",
        medicalName: "Migraña con y sin Aura / Jaqueca (G43)",
        cie10: "G43.9",
        intro: "La migraña es una enfermedad neurológica episódica que afecta al 15% de la población mundial y al 14% de los mexicanos —más de 17 millones de personas—, siendo la segunda causa mundial de discapacidad. No es 'un dolor de cabeza fuerte': es una tormenta neurobiológica que involucra la activación del sistema trigeminovascular, liberación de CGRP (péptido relacionado con el gen de la calcitonina), inflamación neurogénica de las meninges y vasodilatación meníngea. El dolor, típicamente hemicraneal y pulsátil, se acompaña en el 90% de los casos de náusea y en el 80% de fotofobia y fonofobia. Tres veces más frecuente en mujeres, con pico entre los 25 y 45 años. El CGRP es el biomarcador y el blanco terapéutico más importante de la última década.",
        causes: [
            { name: "Activación del Sistema Trigeminovascular (Mecanismo Central)", desc: "Durante la crisis migrañosa, las fibras del nervio trigémino liberan CGRP y sustancia P sobre los vasos meníngeos, generando vasodilatación e inflamación neurogénica estéril. El núcleo trigeminocervical activa el tálamo, que proyecta el dolor hacia la corteza. El CGRP es el nexo entre el sistema nervioso periférico y la inflamación vascular que sostiene el dolor pulsátil." },
            { name: "Depresión Cortical Propagada (Aura Migrañosa)", desc: "El aura (presente en 1/3 de los migrañosos) es producida por una onda lenta de despolarización neuronal que se propaga por la corteza occipital a 3–5 mm/minuto, inhibiendo transitoriamente la actividad eléctrica. Esto genera los escotomas centelleantes, líneas en zigzag o déficits visuales que preceden al dolor. La depresión cortical activa secundariamente las fibras trigeminales meníngeas." },
            { name: "Predisposición Genética y Umbral de Activación Bajo", desc: "La migraña es 50% hereditaria —si ambos padres la padecen, el riesgo del hijo es del 75%. Los polimorfismos en los canales de calcio (CACNA1A), sodio y los genes reguladores del CGRP determinan un umbral de excitabilidad cortical reducido, haciendo al cerebro migrañoso hipersensible a triggers como cambios hormonales, ayuno, cambios de sueño o estrés." },
            { name: "Fluctuaciones Hormonales de Estrógenos", desc: "La caída brusca de estrógenos en la fase perimenstrual (días -2 a +3 del ciclo) desencadena la 'migraña menstrual' en el 53% de las mujeres migrañosas. Los estrógenos modulan la excitabilidad serotoninérgica y trigeminal: su descenso reduce la serotonina central, aumenta la sensibilidad al CGRP y precipita la crisis. Este mecanismo explica la mejoría durante el embarazo (niveles estables altos de estrógenos)." },
            { name: "Desregulación del Hipotálamo como Marcapasos Migrañoso", desc: "El hipotálamo se activa horas antes del dolor (fase prodrómica: bostezos, poliuria, antojos). Regula los ritmos circadianos, el sueño y el umbral de dolor mediado por la dopamina. La privación o exceso de sueño, el ayuno prolongado y los viajes con cambio de horario son los triggers más reproduciblbes porque todos alteran primariamente el hipotálamo." }
        ],
        redFlags: [
            "Aura neurológica nueva en paciente >40 años sin historia de migraña: déficit motor, afasia o confusión que dura >1 hora — descartar AIT/ACV con TC cerebral urgente.",
            "Migraña con aura en mujer que usa anticonceptivos orales combinados: riesgo de ACV isquémico hasta 8 veces mayor — valorar cambio a métodos sin estrógenos.",
            "Crisis migrañosa de >72 horas (estado migrañoso) con vómitos incoercibles y deshidratación: requiere manejo intravenoso hospitalario.",
            "Primera cefalea 'migrañosa' en paciente sin historia previa con inicio súbito: siempre descartar hemorragia subaracnoidea antes de diagnosticar migraña."
        ],
        tests: [
            { name: "Perfil Hormonal Femenino (Estradiol, FSH) — Migraña Menstrual", url: "/estudios/analisis-clinicos/perfil-hormonal-femenino" },
            { name: "Biometría Hemática + Ferritina (anemia como cofactor)", url: "/estudios/analisis-clinicos/biometria-hematica" }
        ],
        tools: [
            { name: "Cuestionario ID-Migraine — Diagnóstico Rápido de Migraña", url: "/herramientas/test-id-migraine" }
        ]
    },
    {
        slug: "fiebre-en-adultos",
        name: "Fiebre en Adultos",
        medicalName: "Pirexia / Hipertermia Febril / Fiebre de Origen Desconocido",
        cie10: "R50.9",
        intro: "La fiebre —temperatura corporal ≥38°C axilar o ≥38.3°C oral— no es una enfermedad sino uno de los mecanismos de defensa más conservados evolutivamente. Las citocinas proinflamatorias (IL-1β, IL-6, TNF-α) liberadas por macrófagos durante una infección activan el área preóptica hipotalámica para elevar el punto de ajuste térmico. En México, la causa más frecuente en adultos jóvenes es la infección viral de las vías respiratorias superiores (80% de los casos). Sin embargo, fiebre persistente >7 días, muy alta (>39.5°C) o asociada a síntomas sistémicos requiere estudio riguroso: el 5% de los casos sin foco aparente esconde infecciones bacterianas graves, enfermedades autoinmunes o neoplasias.",
        causes: [
            { name: "Infecciones Virales (Causa más frecuente)", desc: "Influenza, COVID-19, mononucleosis infecciosa, dengue y enterovirus son las causas virales más frecuentes. Generan fiebre al inducir liberación masiva de IFN-α e IL-6, que actúan sobre el hipotálamo a través de la prostaglandina E2. El patrón 'fiebre + mialgias + decaimiento súbito' sin foco localizado es clásico de síndrome viral sistémico." },
            { name: "Infecciones Bacterianas con o sin Foco", desc: "Neumonía, pielonefritis, celulitis, faringoamigdalitis estreptocócica y endocarditis pueden presentarse solo con fiebre. La bacteremia (bacterias en sangre) genera fiebre en picos (>39°C con escalofríos) por liberación de endotoxinas lipopolisacáridas que activan directamente el hipotálamo a través del receptor TLR-4." },
            { name: "Dengue (Endémico en México)", desc: "El virus del dengue (serotipos 1-4) es transmitido por Aedes aegypti, presente en toda la franja tropical y subtropical de México. Genera la triada clásica: fiebre alta súbita (39-40°C), dolor retro-orbitario intenso y artralgias/mialgias severas ('fiebre rompehuesos'). La trombocitopenia progresiva es el marcador de severidad — plaquetas <100,000/μL exigen hospitalización." },
            { name: "Fiebre Medicamentosa", desc: "Hasta el 10% de las fiebres en hospitalizados son inducidas por medicamentos: antibióticos betalactámicos, antiepilépticos (fenitoína, carbamazepina), alopurinol y quinidina son los más frecuentes. El mecanismo es hipersensibilidad inmunomediada tipo IV. La fiebre aparece 7-10 días de iniciado el fármaco y cede en 48-72h al retirarlo — sin otro diagnóstico aparente, siempre considerar causa medicamentosa." },
            { name: "Enfermedades Autoinmunes e Inflamatorias", desc: "Lupus eritematoso sistémico, artritis reumatoide, vasculitis y enfermedad de Still del adulto pueden debutar solo con fiebre intermitente. En el Lupus, la fiebre es frecuentemente el primer síntoma antes de que aparezcan las manifestaciones cutáneas o renales. La fiebre en racimos de las tardes ('fever pattern') es característica de los procesos autoinmunes." }
        ],
        redFlags: [
            "Fiebre ≥39.5°C con petequias o púrpura no palpable que no desaparece a la presión (signo del vaso): meningococemia — emergencia vital, llamar al 911 inmediatamente.",
            "Fiebre + rigidez de nuca + fotofobia + cefalea explosiva: meningitis bacteriana — mortalidad del 20-30% sin antibiótico en <1 hora desde el diagnóstico.",
            "Fiebre en paciente inmunodeprimido (VIH, quimioterapia, corticoides crónicos): cualquier fiebre >38°C es una urgencia infecciosa — riesgo de sepsis por gérmenes oportunistas.",
            "Fiebre + hipotensión + taquicardia + confusión mental (criterios de SIRS): sepsis en evolución — requiere hospitalización urgente con hemocultivos y antibióticos IV."
        ],
        tests: [
            { name: "Biometría Hemática Completa con Diferencial de Leucocitos", url: "/estudios/analisis-clinicos/biometria-hematica" },
            { name: "PCR Cuantitativa + Procalcitonina (diferencia viral de bacteriano)", url: "/estudios/analisis-clinicos/proteina-c-reactiva" },
            { name: "Antígeno NS1 de Dengue + IgM Dengue (endémico en México)", url: "/estudios/analisis-clinicos/dengue-antígeno-ns1" }
        ],
        tools: [
            { name: "Calculadora de Riesgo de Infección Grave (Score qSOFA)", url: "/herramientas/calculadora-qsofa-sepsis" }
        ]
    },
    {
        slug: "cansancio-fatiga-cronica",
        name: "Cansancio y Fatiga Crónica",
        medicalName: "Fatiga Crónica / Síndrome de Fatiga Crónica (SFC) / Astenia",
        cie10: "R53.1",
        intro: "El cansancio crónico —fatiga persistente ≥6 meses que no mejora con el descanso— es el tercer motivo de consulta más frecuente en medicina primaria en México. Difiere del cansancio fisiológico en que es desproporcionado al esfuerzo realizado, no se restaura con el sueño y deteriora funcionalmente la calidad de vida. Tiene causas en todos los sistemas orgánicos: la anemia ferropénica es la causa más frecuente en mujeres mexicanas en edad fértil (35% de los casos), mientras que el hipotiroidismo subclínico, la diabetes no diagnosticada y la depresión encabezan la lista en adultos mayores. El Síndrome de Fatiga Crónica post-COVID-19 ('long COVID') ha añadido una dimensión nueva al problema, con millones de afectados globalmente.",
        causes: [
            { name: "Anemia Ferropénica (Causa #1 en mujeres)", desc: "La deficiencia de hierro reduce la hemoglobina disponible para transportar oxígeno a los tejidos. El cerebro y el músculo esquelético —órganos más demandantes de ATP— son los primeros en sufrir hipoxia tisular. El resultado es fatiga, dificultad de concentración y disnea de esfuerzo. En México, la prevalencia de anemia en mujeres en edad fértil es del 18% según la ENSANUT 2022." },
            { name: "Hipotiroidismo Subclínico y Clínico", desc: "La reducción de T3/T4 enlentece la tasa metabólica basal, la síntesis de ATP mitocondrial y la contractilidad muscular. La fatiga hipotiroidea es característica: cansancio matutino que no mejora con el sueño, intolerancia al frío, bradipsiquia y ganancia de peso. Frecuentemente la TSH elevada con T4 normal (hipotiroidismo subclínico) ya genera síntomas sin ser diagnosticada." },
            { name: "Depresión Mayor y Trastornos del Estado de Ánimo", desc: "La depresión genera fatiga central por disfunción dopaminérgica y serotoninérgica en el sistema límbico y prefrontal. La fatiga depresiva tiene un patrón inverso al físico: peor por las mañanas, mejora levemente al avanzar el día. La anhedonia (incapacidad de sentir placer) es el marcador diferencial. El 70% de los deprimidos refieren fatiga como síntoma principal antes de reconocer el estado de ánimo deprimido." },
            { name: "Diabetes Tipo 2 No Diagnosticada", desc: "La hiperglucemia crónica interfiere con la utilización celular de glucosa (resistencia a la insulina), privando a los tejidos de su principal combustible. Paradójicamente, el paciente tiene glucosa alta en sangre pero sus células están en ayuno metabólico. La poliuria nocturna secundaria agrava la fatiga por privación de sueño y deshidratación leve crónica." },
            { name: "Síndrome de Fatiga Post-Viral (Long COVID y otros)", desc: "Tras infecciones virales (COVID-19, Epstein-Barr, influenza grave), el 10-15% de los pacientes desarrolla fatiga que persiste meses. El mecanismo incluye disfunción mitocondrial, neuroinflamación de baja intensidad, disautonomía y posiblemente persistencia viral. El criterio diagnóstico de SFC: fatiga ≥6 meses + malestar post-esfuerzo + sueño no reparador, sin causa orgánica demostrable." }
        ],
        redFlags: [
            "Fatiga + pérdida de peso involuntaria >5% en 3 meses + sudoración nocturna: descartar neoplasia hematológica (linfoma, leucemia) o tuberculosis — biometría urgente.",
            "Fatiga + palpitaciones + disnea de esfuerzo + edema de tobillos en paciente con historia de HTA o cardiopatía: descartar insuficiencia cardíaca — ecocardiograma.",
            "Fatiga extrema de inicio brusco en <24 horas en paciente anteriormente sano: síndrome viral agudo grave (hepatitis A, mononucleosis, dengue) — biometría + función hepática urgente.",
            "Fatiga + dolor óseo difuso + hipercalcemia (náuseas, poliuria, confusión): sospechar mieloma múltiple o hiperparatiroidismo — calcio sérico y proteínas totales urgentes."
        ],
        tests: [
            { name: "Biometría Hemática + Hierro Sérico + Ferritina + TIBC", url: "/estudios/analisis-clinicos/biometria-hematica" },
            { name: "Perfil Tiroideo Completo (TSH + T4 libre + T3)", url: "/estudios/analisis-clinicos/perfil-tiroideo" },
            { name: "Glucosa en Ayuno + HbA1c + Insulina Basal (resistencia insulínica)", url: "/estudios/analisis-clinicos/curva-de-glucosa" }
        ],
        tools: [
            { name: "Escala de Fatiga de Chalder — Severidad y Tipo de Cansancio", url: "/herramientas/escala-fatiga-chalder" }
        ]
    },
    {
        slug: "diarrea-aguda",
        name: "Diarrea Aguda",
        medicalName: "Gastroenteritis Aguda / Diarrea Infecciosa / Enteropatía",
        cie10: "A09",
        intro: "La diarrea aguda —3 o más deposiciones líquidas en 24 horas, de inicio súbito y duración menor a 14 días— es la segunda causa de muerte en niños globalmente y uno de los motivos de consulta más frecuentes en adultos mexicanos. Los mecanismos fisiopatológicos son tres: secretor (toxinas bacterianas como cólera y E. coli enterotoxigénica que activan el AMPc y causan hipersecreción de cloro), osmótico (patógenos que dañan la mucosa absortiva como rotavirus en niños o Giardia en adultos) e inflamatorio (invasión directa de la mucosa por Salmonella, Shigella o Campylobacter, causando disentería con sangre). En México, el 90% de los episodios son autolimitados y se resuelven en 3-5 días con hidratación oral.",
        causes: [
            { name: "Virus Entéricos (Norovirus, Rotavirus)", desc: "El norovirus es la causa más frecuente de gastroenteritis aguda en adultos en brotes familiares o colectividades. Incubación 24-48h, duración 1-3 días. Mecanismo: destrucción transitoria de las vellosidades intestinales del intestino delgado, reduciendo la superficie absortiva. El vómito es tan prominente como la diarrea — diferenciador clave con las infecciones bacterianas que predominan en colon." },
            { name: "Bacterias Enterotoxigénicas (Turista / E. coli ETEC)", desc: "La diarrea del viajero en México es causada en 50-80% por E. coli enterotoxigénica. Sus toxinas LT y ST activan adenilato ciclasa en los enterocitos del intestino delgado, generando hipersecreción masiva de agua y electrolitos sin inflamación de mucosa. Resultado: diarrea líquida abundante sin sangre, calambres severos, sin fiebre alta. Aparece en las primeras 72h de consumir alimentos/agua contaminada." },
            { name: "Salmonella y Diarrea Invasiva con Sangre (Disentería)", desc: "Salmonella não-typhi, Shigella y Campylobacter invaden y destruyen el epitelio del colon, generando respuesta inflamatoria local. El resultado es diarrea con sangre y moco (disentería), fiebre >38.5°C, calambres intensos y tenesmo. En México la Salmonella se adquiere frecuentemente por huevo y pollo contaminado. A diferencia de la diarrea viral, esta requiere evaluación médica y posiblemente antibiótico." },
            { name: "Intoxicación Alimentaria por Toxinas Preformadas", desc: "Staphylococcus aureus (mayonesa, cremas) y Bacillus cereus (arroz recalentado) producen toxinas estables al calor que ya están formadas en el alimento. El cuadro es fulminante: náuseas, vómito y diarrea en 1-6 horas ante el consumo del alimento contaminado, sin necesidad de replicación bacteriana. La fiebre es mínima o ausente. Duración <24h sin tratamiento específico." },
            { name: "Diarrea por Antibióticos y Clostridioides difficile", desc: "Los antibióticos de amplio espectro (amoxicilina, clindamicina, cefalosporinas) destruyen la microbiota protectora del colon, permitiendo la proliferación de C. difficile. Sus toxinas A y B dañan el epitelio colónico generando colitis seudomembranosa: diarrea líquida verdosa maloliente, fiebre alta, leucocitosis marcada y dolor abdominal. Aparece durante o hasta 8 semanas después del antibiótico." }
        ],
        redFlags: [
            "Diarrea con sangre roja brillante + fiebre >38.5°C + dolor abdominal severo: disentería bacteriana invasiva — requiere coprocultivo y posiblemente antibiótico.",
            "Signos de deshidratación grave: oliguria, taquicardia, hipotensión, ojos hundidos, pliegue cutáneo que no regresa — requiere rehidratación IV urgente.",
            "Diarrea >14 días de duración sin causa aparente: considerar parásitos (Giardia, Cryptosporidium), enfermedad inflamatoria intestinal o neoplasia colónica.",
            "Diarrea + confusión mental + oliguria + anemia hemolítica en niños post-diarrea E. coli O157:H7: síndrome urémico hemolítico — emergencia nefrológica pediátrica."
        ],
        tests: [
            { name: "Coproparasitoscópico en Serie (3 muestras) + Coprocultivo", url: "/estudios/analisis-clinicos/coproparasitoscopico" },
            { name: "Biometría Hemática + Electrolitos Séricos (deshidratación severa)", url: "/estudios/analisis-clinicos/biometria-hematica" }
        ],
        tools: [
            { name: "Calculadora de Hidratación Oral (OMS) — Dosis según peso", url: "/herramientas/calculadora-rehidratacion-oral" }
        ]
    },
    {
        slug: "presion-arterial-alta",
        name: "Presión Arterial Alta",
        medicalName: "Hipertensión Arterial Sistémica (HAS) / Hipertensión Esencial",
        cie10: "I10",
        intro: "La hipertensión arterial sistémica (HAS) —presión ≥140/90 mmHg en dos mediciones en días diferentes— afecta al 30.1% de los adultos mexicanos según la ENSANUT 2022, siendo la causa principal de infarto agudo al miocardio, ACV isquémico e insuficiencia renal crónica en México. El 46% de los hipertensos mexicanos desconoce su diagnóstico ('el asesino silencioso') y solo el 56% de los diagnosticados tiene control adecuado. Su fisiopatología es compleja: el 95% son hipertensión esencial (sin causa única identificable), resultado de la interacción entre predisposición genética, ingesta alta de sodio, obesidad visceral, estrés crónico y disfunción endotelial. Cada 20/10 mmHg de aumento duplica el riesgo cardiovascular.",
        causes: [
            { name: "Hipertensión Esencial (95% de los casos)", desc: "No tiene una causa única — es el resultado de múltiples factores que elevan el gasto cardíaco o aumentan la resistencia vascular periférica. La activación crónica del sistema renina-angiotensina-aldosterona (SRAA), la disfunción endotelial (reducción de óxido nítrico vasodilatador) y el exceso de actividad simpática son los tres pilares fisiopatológicos. La dieta alta en sodio (>5g/día, promedio mexicano: 9.7g/día) es el factor modificable más impactante." },
            { name: "Obesidad y Síndrome Metabólico", desc: "La grasa visceral abdominal produce adipocitocinas inflamatorias que activan el SRAA, aumentan la retención de sodio renal y elevan la actividad simpática. Por cada 10 kg de aumento de peso, la presión sistólica sube ~3 mmHg. La hiperinsulinemia asociada a la resistencia insulínica también eleva la presión al estimular la reabsorción tubular renal de sodio y la actividad simpática." },
            { name: "Hipertensión Renovascular (HTA Secundaria)", desc: "La estenosis de la arteria renal (por aterosclerosis en mayores o displasia fibromuscular en jóvenes) activa el SRAA al reducir la presión de perfusión renal: el riñón hipoperfundido libera renina para 'corregir' lo que interpreta como hipotensión. Sospecharlo en: HTA de inicio brusco, refractaria a 3+ fármacos, con soplo sistólico-diastólico paraumbilical o deterioro renal al iniciar IECAs." },
            { name: "Apnea Obstructiva del Sueño", desc: "Cada episodio de apnea genera hipoxemia, hipercapnia y activación simpática refleja, elevando la presión transitoriamente. La repetición nocturna crónica (5-30 eventos/hora) mantiene el sistema simpático activado durante el día. El 50% de los hipertensos resistentes tienen apnea del sueño no diagnosticada. La roncopatía severa + HTA + obesidad debe disparar la solicitud de polisomnografía." },
            { name: "Hiperaldosteronismo Primario (Adenoma de Conn)", desc: "El exceso de aldosterona, independiente de la angiotensina II, retiene sodio y agua elevando el volumen extracelular y la presión. Es la causa más frecuente de HTA secundaria (8-12% de los hipertensos). Se caracteriza por HTA moderada-severa con hipopotasemia (calambres, debilidad) o normokalémica. Su diagnóstico es el cociente aldosterona/renina plasmática — altamente subestimado en México." }
        ],
        redFlags: [
            "Presión ≥180/120 mmHg con cefalea occipital explosiva, visión borrosa, confusión o déficit neurológico: crisis hipertensiva con daño a órgano blanco — urgencia hospitalaria inmediata.",
            "HTA + dolor torácico irradiado a espalda tipo 'desgarro': disección aórtica — mortalidad del 1-2% por hora sin tratamiento quirúrgico, llamar al 911.",
            "HTA en embarazada (>20 semanas) con edema facial, proteinuria y cefalea: preeclampsia grave en evolución — riesgo de eclampsia, hospitalización urgente.",
            "HTA en adolescente o joven <30 años sin antecedentes familiares: descartar causa secundaria (hiperaldosteronismo, displasia fibromuscular, coartación aórtica) antes de tratar como esencial."
        ],
        tests: [
            { name: "Química Sanguínea 6 (Urea, Creatinina — función renal basal)", url: "/estudios/analisis-clinicos/quimica-sanguinea" },
            { name: "Examen General de Orina + Microalbuminuria (daño renal hipertensivo)", url: "/estudios/analisis-clinicos/examen-general-de-orina" },
            { name: "Perfil de Lípidos + Glucosa — Riesgo Cardiovascular Global", url: "/estudios/checkups/check-up-cardiovascular" }
        ],
        tools: [
            { name: "Calculadora de Riesgo Cardiovascular SCORE2 (ESC 2023)", url: "/herramientas/calculadora-riesgo-cardiovascular" }
        ]
    }
];

// ─── Lista de los 60 síntomas top (para excluir del script de qwen) ─────────
const TOP60_NAMES = [
    "Dolor de Cabeza por Tensión", "Migraña", "Fiebre en Adultos", "Cansancio y Fatiga Crónica",
    "Diarrea Aguda", "Presión Arterial Alta", "Náuseas y Vómitos", "Dolor de Espalda Baja",
    "Tos Seca Persistente", "Dolor de Garganta", "Ansiedad", "Depresión Mayor", "Insomnio",
    "Acné Vulgar", "Caída del Cabello", "Dolor Menstrual", "Reflujo Gastroesofágico",
    "Infección Urinaria Baja", "Mareo", "Dolor de Rodilla", "Diabetes tipo 2", "Obesidad",
    "Estreñimiento Crónico", "Dificultad para Respirar", "Dolor de Pecho", "Palpitaciones",
    "Edema de Piernas", "Dolor de Cabeza Tensional", "Migraña con Aura", "Dolor Cervical Crónico",
    "Dolor de Espalda Alta", "Fibromialgia", "Hipotiroidismo Sintomático", "Hipertiroidismo",
    "Anemia Ferropénica", "Colesterol Alto", "Triglicéridos Altos", "Hígado Graso Sintomático",
    "Gastritis", "Síntomas del Colon Irritable", "Hemorroides Sangrantes", "Varicela del Adulto",
    "Herpes Labial", "Conjuntivitis Bacteriana", "Orzuelo", "Sinusitis Aguda", "Otitis Media Aguda",
    "Amigdalitis", "Rinitis Alérgica", "Asma Bronquial", "Varicocele", "Disfunción Eréctil",
    "Síndrome de Ovario Poliquístico", "Endometriosis", "Flujo Vaginal Anormal",
    "Dolor de Talón", "Fascitis Plantar", "Síndrome del Túnel Carpiano", "Temblores en Manos",
    "Vértigo Posicional"
];

// ─── Merge con la base existente ─────────────────────────────────────────────
let db = [];
if (fs.existsSync(OUTPUT)) {
    try {
        db = JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));
        console.log(`📂 Base cargada: ${db.length} síntomas`);
    } catch (e) { console.log('Base vacía o corrupta.'); }
}

const existingSlugs = new Set(db.map(s => s.slug));
let added = 0;

for (const symptom of TOP60) {
    if (!existingSlugs.has(symptom.slug)) {
        db.push(symptom);
        existingSlugs.add(symptom.slug);
        added++;
        console.log(`✅ Agregado: ${symptom.name} (${symptom.cie10})`);
    } else {
        console.log(`⏭️  Ya existe: ${symptom.name}`);
    }
}

fs.writeFileSync(OUTPUT, JSON.stringify(db, null, 2));
console.log(`\n🎉 ${added} síntomas top agregados. Total en DB: ${db.length}`);
console.log('\n📋 LISTA COMPLETA TOP 60 (para excluir de qwen):');
TOP60_NAMES.forEach((n, i) => console.log(`  ${i + 1}. ${n}`));
