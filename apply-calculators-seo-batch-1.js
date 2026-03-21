const fs = require('fs');
const path = require('path');
const glob = require('glob');

const TOOLS_DIR = path.join(__dirname, 'src', 'app', 'herramientas');
const batch1 = [
    {
        slug: 'toxicidad-religiosa',
        content: `
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía Cínica: Trauma y Toxicidad Religiosa</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Síndrome de Trauma Religioso (RTS, por sus siglas en inglés) es una condición clínica reconocida dentro de la psicología moderna que surge cuando un individuo abandona una religión o sistema de creencias autoritario, dogmático o restrictivo. Funcionalmente, la toxicidad religiosa opera neurológicamente de manera idéntica al Trastorno de Estrés Postraumático (TEPT) complejo, activando crónicamente la amígdala cerebral y generando un estado de hipervigilancia constante.</p>
       
       <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Mecanismo Neurobiológico del Control Dogmático</h3>
       <p>La exposición prolongada a narrativas de condenación (ej. el miedo literal al infierno) altera el eje Hipotálamo-Hipófisis-Suprarrenal (HPA). Esta alteración provoca niveles basales de cortisol y adrenalina crónicamente elevados. Cuando un individuo intenta desligarse de este entorno, el cerebro interpreta el "abandono de la fe" como una amenaza inminente a la supervivencia, desencadenando ataques de pánico y disonancia cognitiva profunda (la ruptura dolorosa entre el condicionamiento pasado y el razonamiento lógico actual).</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Manifestaciones Clínicas y Psicológicas</h3>
       <ul>
           <li><strong>Reacciones Disociativas:</strong> Sentirse desconectado del propio cuerpo (despersonalización) al enfrentarse a estímulos seculares normales.</li>
           <li><strong>Retraso en el Desarrollo Psicosocial:</strong> Dificultad severa para tomar decisiones independientes, establecer límites personales o entender la sexualidad humana sana debido a represión sistemática.</li>
           <li><strong>Somatización del Estrés:</strong> Trastornos gastrointestinales crónicos (Colon Irritable), migrañas tensionales y fatiga adrenal secundaria al miedo persistente.</li>
       </ul>

       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Banderas Rojas (Red Flags) Psiquiátricas</h4>
           <p className="text-red-700 m-0">Si el individuo presenta episodios de ideación suicida vinculados a la "culpa de existir", ataques de pánico paralizantes al tomar decisiones cotidianas, o aislamiento social extremo paranoico ("el mundo secular es malo"), requiere intervención psicológica inmediata especializada en reestructuración cognitiva y trauma. <strong>El trauma religioso no se cura con más religión, se aborda con evidencia científica y terapia clínica.</strong></p>
       </div>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Evaluación Neuro-Hormonal Sugerida</h3>
       <p>Para pacientes que han vivido años bajo este estrés opresivo, los psiquiatras y médicos funcionales suelen evaluar el desgaste orgánico provocado por el cortisol mediante analíticas clínicas tangibles:</p>
       <ul>
           <li><a href="/estudios/analisis-clinicos/quimica-sanguinea" className="text-blue-600 font-semibold hover:underline">Química Sanguínea Completa</a> (Para evaluar el desgaste general metabólico).</li>
           <li><a href="/estudios/perfiles/perfil-tiroideo" className="text-blue-600 font-semibold hover:underline">Perfil Tiroideo</a> (El estrés crónico sostenido suele disparar hipotiroidismo reactivo transitorio).</li>
           <li>Prueba de Cortisol Sérico Matutino (Para medir objetivamente el daño en las glándulas suprarrenales).</li>
       </ul>
   </div>
</section>`
    },
    {
        slug: 'test-tdah-adultos',
        content: `
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🧠 Guía Científica: TDAH en el Adulto (Déficit de Atención e Hiperactividad)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Trastorno por Déficit de Atención e Hiperactividad (TDAH) en adultos no es un "mito infantil que no se superó", sino una alteración neurobiológica crónica estructural (CIE-10 F90.0). Se caracteriza por una deficiencia en las cascadas metabólicas de catecolaminas (principalmente Dopamina y Noradrenalina) en la corteza prefrontal, el área del cerebro encargada de las <em>funciones ejecutivas</em>: planificación, inhibición de impulsos y la regulación del esfuerzo mental a largo plazo.</p>
       
       <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">El Cerebro Hambriento de Dopamina</h3>
       <p>El paciente adulto con TDAH sufre de una hipoactivación crónica en su sistema de recompensa. Fisiopatológicamente, los transportadores de dopamina limpian el neurotransmisor del espacio sináptico con demasiada rapidez. Esto significa que el cerebro raras veces alcanza el umbral de "motivación y satisfacción" necesario para iniciar, sostener o terminar tareas monótonas (procrastinación clínica crónica). Paradójicamente, el paciente puede enfocarse hiperactivamente (Hiperfoco) en estímulos altamente estimulantes que disparan picos súbitos de dopamina (como videojuegos, emergencias de último minuto o discusiones).</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Expresión Somática y Clínica Típica</h3>
       <ul>
           <li><strong>Inatención Involuntaria Discapacitante:</strong> Imposibilidad física para sostener la lectura, perder objetos constantemente (llaves, teléfono) y el fenómeno de "mente en blanco" durante conversaciones importantes.</li>
           <li><strong>Inquietud Interna Agotadora:</strong> En el adulto, la hiperactividad física (correr) muta hacia una sensación crónica de nerviosismo motor interno, ansiedad subyacente y la necesidad de mover siempre las piernas o morderse las uñas (estimulación basal).</li>
           <li><strong>Desregulación Emocional Rápida:</strong> Explosiones breves de ira o frustración severa ante un obstáculo mínimo debido a un fallo en el freno inhibidor del cerebro (corteza cingulada anterior).</li>
       </ul>

       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Banderas Rojas y Riesgos Ocultos</h4>
           <p className="text-red-700 m-0">El principal peligro del TDAH no diagnosticado en adultos es el <strong>intento de auto-medicación</strong>. Estadísticamente, tienen un altísimo riesgo clínico de caer en el abuso de sustancias estimulantes (cafeína extrema, nicotina, cocaína) o sustancias depresoras (alcohol para apagar la mente hiperactiva nocturna). Adicionalmente, enfrentan un grave riesgo económico y de despidos por impulsividad aguda o fallas directas de memoria.</p>
       </div>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Manejo Clínico y Diagnóstico Diferencial</h3>
       <p>Antes de iniciar con medicación psiquiátrica de primera línea (Metilfenidato o Lisdexanfetamina), el médico neurólogo o psiquiatra DEBE descartar deficiencias metabólicas severas que pueden mimetizar o empeorar el déficit de memoria y la "Nube Cerebral" (Brain Fog):</p>
       <ul>
           <li><a href="/estudios/perfiles/perfil-tiroideo" className="text-blue-600 font-semibold hover:underline">Perfil Tiroideo Fficial</a> (El hipotiroidismo imita casi a la perfección la falta de inatención y enlentecimiento mental profundo).</li>
           <li><a href="/estudios/analisis-clinicos/biometria-hematica" className="text-blue-600 font-semibold hover:underline">Biometría Hemática Completa</a> (Descartar Anemia por deficiencia de oxígeno y fatiga neuronal severa crónica).</li>
           <li>Estudios Poligráficos del Sueño Severo (Como Apnea, fragmentando el descanso cerebral de forma inadvertida).</li>
       </ul>
   </div>
</section>`
    },
    {
        slug: 'test-sindrome-burnout',
        content: `
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía Médica: Síndrome de Burnout (Desgaste Profesional)</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Síndrome de Burnout (CIE-11 QD85) es una condición clínica oficialmente reconocida por la Organización Mundial de la Salud (OMS) en 2019, definida estrictamente como un fenómeno ocupacional provocado por un estrés laboral crónico brutal que no se ha gestionado con éxito. Lejos de ser "un simple cansancio temporal", hablamos literalmente del colapso del sistema endocrino tras agotar sus reservas tras exigencias operativas y psicológicas prolongadas.</p>
       
       <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Fisiopatología de la Fatiga Adrenal Crónica</h3>
       <p>Biológicamente, el cerebro humano reacciona a una mala noticia en el trabajo o una montaña eterna de responsabilidades exactamente igual que si fuera perseguido por un depredador. El hipotálamo dispara alertas constantes a las glándulas suprarrenales obligándolas a bombear cortisol (la droga natural de estrés) a la sangre de modo perpetuo. Con los meses o años, las células desarrollan una "resistencia al cortisol" y el sistema colapsa en un estado de hipocortisolismo. El cuerpo humano se declara oficialmente "sin batería biológica", causando que hasta las tareas más diminutas se sientan imposibles estructuralmente de abordar.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Triada Sintomatológica Oficial y Clínica</h3>
       <ul>
           <li><strong>Agotamiento Profundo:</strong> No es simple sueño; es un agotamiento energético paralizante desde que inicia hasta que acaba el día, que no se soluciona ni durmiendo doce horas o tomando vacaciones cortas (debido al desgaste adrenal general).</li>
           <li><strong>Despersonalización / Cinismo:</strong> Distanciamiento cognitivo agudo del trabajo. El paciente empieza a despreciar a sus clientes, pacientes o al propio ambiente, perdiendo de golpe la empatía y reaccionando de forma ruda, apática o sin escrúpulos de forma irreconocible.</li>
           <li><strong>Ineficacia Práctica Completa:</strong> Reducción dramática en la eficacia profesional técnica, aumento exponencial de errores groseros y olvidos cognitivos graves.</li>
       </ul>

       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Banderas Rojas Cardiovasculares y Metabólicas</h4>
           <p className="text-red-700 m-0">El peligro de ignorar el Burnout laboral llega directamente a la Morgue. El estado crónico inflamatorio por agotamiento se traduce de manera brutal e inmediata en un riesgo fulminante altísimo de <strong>Infarto Agudo al Miocardio</strong> por micro-espasmos arteriales (vasoconstricción sostenida inducida por el estrés sostenido prolongado), y colapso de las defensas biológicas que da paso a enfermedades severas oportunistas. Exige la baja médica rigurosa urgente y atención profesional.</p>
       </div>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Monitoraje de Biomarcadores Recomendados</h3>
       <p>A un paciente que diagnostica su Burnout en la clínica se le suele investigar todo el espectro fisiológico destruido por el estrés y descartar fatigas similares:</p>
       <ul>
           <li><a href="/estudios/analisis-clinicos/quimica-sanguinea" className="text-blue-600 font-semibold hover:underline">Química Sanguínea General Integral</a> (Para visualizar picos en la Glucosa e Insulina inducidos directamente por los largos meses de cortisol en la sangre).</li>
           <li><a href="/estudios/perfiles/perfil-de-lipidos" className="text-blue-600 font-semibold hover:underline">Perfil de Lípidos (Colesterol y Triglicéridos)</a> (El estrés laboral eleva groseramente el colesterol LDL reactivo e induce infartos a muy edad temprana).</li>
           <li>Prueba en Sangre del Cortisol Matutino (Gold Standard endocrino para verificar qué tan colapsadas están o qué tan activas están las glándulas suprarrenales sobre y en la zona de los riñones).</li>
       </ul>
   </div>
</section>`
    },
    {
        slug: 'test-narcisismo',
        content: `
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🧠 Guía Psiquiátrica: Trastorno Adquirido de la Personalidad Narcisista</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El Trastorno de la Personalidad Narcisista (NPD en inglés, CIE-10 F60.8) es una grave disfunción psiquiátrica estructural caracterizada por un patrón dominante y enfermizo de grandiosidad y auto-delirio, una inmensa pero frágil necesidad de admiración directa para sostener la estructura interna, y el escalofriante déficit de cualquier traza de empatía neurológica por los demás seres humanos. Se forja durante la madurez y la juventud como una armadura masiva y delirante que ahoga una inmensa inseguridad inconsciente profunda.</p>
       
       <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Disociación y Auto-regulación mediante un "Yo Falso"</h3>
       <p>En el aspecto neuropsicológico más riguroso clínico, el narcisista patológico no "se ama de más", por el contrario; destila un odio brutal y aterrador hacia su propio "yo vulnerable intrínseco" tras recibir daño o condicionamiento traumático durante su infancia. En su lugar construye un "Falso Ego" titánico y perfecto, un Avatar mental al que dedica toda su energía a proteger. Como este ego colosal del paciente es puramente imaginario y vacío en el fondo biológico cortical, necesitan de un suplemento (Suplemento Narcisista) desesperado desde el exterior, lo que lo lleva al vampirismo relacional.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Marcadores Patológicos Clínicos del Daño</h3>
       <ul>
           <li><strong>Incapacidad Emocional Empática Brutal:</strong> Biológicamente a nivel neuronal no tienen desarrolladas suficientemente en sus conexiones corticales las "neuronas espejo" ni presentan activación de la ínsula cuando deberían sentir pena de manera lógica hacia el sufrimiento de otros que destruyen.</li>
           <li><strong>Hipersensibilidad al Fallo (Herida Narcisista):</strong> Cuando son expuestos a una corrección menor o una crítica válida biológica y técnica, su escudo defensivo amenaza con hacer crack mental, entrando en modos patológicos letales e intrínsecos como ataques de rabia extrema repentinos y escalofriantes para recuperar el poder y callar toda oposición del mundo externo.</li>
           <li><strong>Síndrome de Gaslighting:</strong> Necesitan distorsionar a base de fuerza brutal y repetitiva la propia realidad física percibida por la sociedad y la gente que los rodea y su pareja; manipular para someter.</li>
       </ul>

       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Advertencia Crítica y Psiquiátrica para las Víctimas</h4>
           <p className="text-red-700 m-0">El daño letal mental que estos pacientes causan repercute devastadoramente en las personas u organizaciones a su alrededor, desembocando en el fenómeno "Abuso Narcisista de la Pareja" (Síndrome de Estrés Postraumático Complejo). El Narcisista extremo clínico ignora un cambio o arrepentimiento; carecen de toda la capacidad neuro-física intrínseca para interiorizar el daño porque su mente jamás validaría el propio fallo central. La intervención psiquiátrica clínica es para preservar el cerebro y el cuerpo de las víctimas por desgaste en el sistema circulatorio que conllevan por ataques de terror sistemáticos ocultos.</p>
       </div>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Repercusiones Sistémicas de su Víctimas</h3>
       <p>Los sistemas físicos del ser humano y sus cuerpos se agotan. Si sospecha estar atado a condiciones de violencia emocional narcisista con su actual figura (por meses o muchísimos horribles años), debe revisar inminentemente las métricas basales del desgaste del estrés, los marcadores químicos somáticos debido a toda la ansiedad inducida repetitivamente:</p>
       <ul>
           <li><a href="/estudios/analisis-clinicos/biometria-hematica" className="text-blue-600 font-semibold hover:underline">Biometría Hemática Avanzada</a> (Para descartar anemia inmunológica por inflamación silente tras años de opresión del terror).</li>
           <li><a href="/estudios/perfiles/perfil-tiroideo" className="text-blue-600 font-semibold hover:underline">Perfil Hormonal y Tiroideo Funcional</a> (La tiroides colapsa con la opresión perpetua del entorno, desencadenando aumentos severos corporales).</li>
       </ul>
   </div>
</section>`
    },
    {
        slug: 'test-pasivos-agresivos',
        content: `
<section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 p-8 lg:p-12">
   <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">🩺 Guía Psicológica Oficial: Comportamiento Pasivo-Agresivo Crónico</h2>
   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
       <p>El comportamiento Psicológico Pasivo-Agresivo es un patrón o fenómeno defensivo clínico indirecto de manifestar furia contenida masiva, dolor en exceso o frustración inmensamente acumulada mediante evasivas profundas ocultas en las personas bajo una rígida fachada de sumisión "neutral o benévola". Históricamente etiquetado dentro del antiguo "Trastorno Negativista Oficial", en la actualidad no es un trastorno neuroquímico directo aislado, sino un gigantesco y perjudicial estilo destructivo subyacente de comunicación interpersonal de resistencia social velada, disfuncional en casi cualquier tipo estructural de relación.</p>
       
       <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">El Origen Psiquiátrico en Entornos Clínicos</h3>
       <p>El ser humano evoluciona desde tiempos pasados forjando esta extraña herramienta patológica frecuentemente en sus épocas pasadas durante su niñez por familias controladoras o severamente limitantes, regímenes y escuelas altamente limitativas o dinámicas psiquiátricas en las que expresar honestamente odio abierto o negarse de lleno a imposiciones conllevaba castigos crueles inmediatos e irracionales físicos y mentales. El cerebro de las víctimas aprende a desviar y redirigir toda hostilidad a un canal subrepticio indetectable de forma frontal hacia represalias biológicas corporales directas del ambiente.</p>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Mecanismos Sistémicos Empleados Inconscientes </h3>
       <ul>
           <li><strong>Sarcasmo Afilado y Doble Sentido Perjudicial:</strong> Disparar ataques mentales e indirectas hostiles masivas disimuladas frecuentemente bajo el formato y apariencia biológica de supuestos "chistes graciosos y directos al corazón del afectado".</li>
           <li><strong>Ineficiencia Intencional Somatizada y Boicot:</strong> Prometer sin remedio hacer y cumplir una tarea clave específica mental pero olvidarla misteriosamente a propósito cada vez más a último segundo repetido o entregarla repleta enorme de fallos con exactitud fatal calculada.</li>
           <li><strong>Tratamiento Prolongado del Muro de Hielo ("Ley del Hielo Silente"):</strong> Castigar a la pareja, madre o compañero del colegio privándolo del afecto vital psíquico retirando sin decir ninguna palabra oficial la interacción comunicacional por amplios y largos fríos días, pero el pasivo-agresivo fingirá "clínicamente no pasa nada internamente biológico grave" ignorando masivamente confrontación natural.</li>
       </ul>

       <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
           <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">⚠️ Bandera Roja Relacional (Toxicidad Silente Severa)</h4>
           <p className="text-red-700 m-0">Cuando estas actitudes se transforman de tácticas aisladas, a un ciclo biológico perruno y persistente crónico a gran nivel de escala para forzar manipulación o control biológico subrepticio a grandes magnitudes a la gente del organismo circundante de tu oficina diaria y de forma general la casa, la víctima colindante desarrolla un cansancio gigantesco neurofisiológico muy severo a este daño invisible. Este paciente sufre grandes y altísimos grados colosales repentinos irracionales para la comunidad mental que implosionan, al no haber ninguna "confrontación verbal clásica oficial de la furia que lo justifica".</p>
       </div>
       
       <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Revisión Recomendada Médicamente Tras Exposición Extrema</h3>
       <p>Convivir largas épocas colindantes en la sangre biológica por el sistema con comportamientos pasivos agrios, en la gente empática da como resultado la pérdida profunda del cortisol físico mental del control físico del propio organismo inducida por la alta constante neuroquímica mental de estrés psiquiátrico inminente basal constante indetectable real general:</p>
       <ul>
           <li><a href="/estudios/analisis-clinicos/quimica-sanguinea" className="text-blue-600 font-semibold hover:underline">Química de Rutina Anual Básica y Superior</a> (Revisa alteraciones fisiológicas sistémicas del hígado tras el colapso emocional de los sistemas).</li>
           <li><a href="/estudios/analisis-clinicos/examen-general-de-orina" className="text-blue-600 font-semibold hover:underline">Examen Orina</a> (La caída grave y colosal en sangre de inmunidad permite en las vías urinarias de la vejiga severas caídas inminentes bacterianas silenciosamente recurrentes con síntomas como mal enorme estado biológico profundo de sangre).</li>
       </ul>
   </div>
</section>`
    }
];

async function applyBatch() {
    let done = 0;
    for (const item of batch1) {
        const filePath = path.join(TOOLS_DIR, item.slug, 'page.tsx');
        if (!fs.existsSync(filePath)) {
            console.error('No se encontro el archivo:', filePath);
            continue;
        }

        let content = fs.readFileSync(filePath, 'utf8');

        const startTag = "<AdBanner";
        const startIndex = content.indexOf(startTag);

        if (startIndex !== -1) {
            // Encontraremos el div anterior que envuelve al AdBanner para evitar romper la UI
            const wrapStart = content.lastIndexOf("<div", startIndex);

            let targetIndex = startIndex;
            if (wrapStart !== -1 && wrapStart > content.lastIndexOf("</section>", startIndex)) {
                // Asegurarnos de que estamos razonablemente cerca del Ad (en el contenedor)
                if (startIndex - wrapStart < 150) {
                    targetIndex = wrapStart;
                }
            }

            const newContent = content.substring(0, targetIndex) +
                "{/* SEO Content GPT Injected */}\\n" + item.content + "\\n\\n                " +
                content.substring(targetIndex);
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log('✅ Aplicado SEO a:', item.slug);
            done++;
        } else {
            console.log('⚠️ Warning: No se encontró el bloque AdBanner en:', item.slug);
        }
    }
    console.log('🎉 Finalizada inyección del batch manual. Total aplicados: ' + done);
}

applyBatch().catch(console.error);
