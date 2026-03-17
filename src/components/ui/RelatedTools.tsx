'use client';
import Link from 'next/link';

/* ======================================================================
   RELATIONSHIP MAP
   Each tool/page has a slug and belongs to one or more groups.
   The component shows items from the same group(s) as the current page.
   ====================================================================== */

export interface RelatedItem {
    title: string;
    href: string;
    emoji: string;
    desc: string;
    tags: string[];     // group tags for matching
}

const CATALOG: RelatedItem[] = [
    // ── URGENCIAS / TRAUMA ───────────
    { title: 'Escala de Glasgow (GCS)', href: '/herramientas/escala-glasgow', emoji: '🧠', desc: 'Nivel de conciencia en trauma', tags: ['urgencias', 'neuro', 'trauma'] },
    { title: 'qSOFA — Sepsis', href: '/herramientas/qsofa-sepsis', emoji: '🦠', desc: 'Detección rápida de sepsis', tags: ['urgencias', 'infecto'] },
    { title: 'NEWS2 — Alerta Temprana', href: '/herramientas/news2-alerta-temprana', emoji: '📊', desc: 'Deterioro clínico hospitalario', tags: ['urgencias', 'enfermeria'] },
    { title: 'NIHSS — Evento Vascular Cerebral', href: '/herramientas/nihss-escala-ictus', emoji: '⚡', desc: 'Severidad del EVC / Ictus', tags: ['urgencias', 'neuro'] },
    { title: 'Regla del 9 (Quemaduras)', href: '/herramientas/regla-del-9-quemaduras', emoji: '🔥', desc: '% superficie corporal quemada', tags: ['urgencias', 'trauma'] },
    { title: 'Reglas de Ottawa', href: '/herramientas/reglas-ottawa-tobillo-rodilla', emoji: '🦶', desc: '¿Necesito Rayos X?', tags: ['urgencias', 'trauma', 'deportes'] },

    // ── PEDIATRÍA / NEONATAL ─────────
    { title: 'Test de Apgar', href: '/herramientas/test-apgar-neonatal', emoji: '👶', desc: 'Estado del recién nacido', tags: ['pediatria', 'neonatal'] },
    { title: 'Silverman-Andersen', href: '/herramientas/silverman-andersen-neonatal', emoji: '🫁', desc: 'Dificultad respiratoria neonatal', tags: ['pediatria', 'neonatal'] },
    { title: 'Dosis Pediátrica por Peso', href: '/herramientas/dosis-pediatrica-peso', emoji: '💊', desc: '7 medicamentos comunes', tags: ['pediatria', 'farmaco'] },

    // ── GERIATRÍA ────────────────────
    { title: 'Mini-Mental (MMSE)', href: '/herramientas/mini-mental-mmse', emoji: '🧩', desc: 'Deterioro cognitivo / demencia', tags: ['geriatria', 'neuro'] },
    { title: 'Índice de Barthel', href: '/herramientas/barthel-independencia-funcional', emoji: '👴', desc: 'Independencia funcional', tags: ['geriatria'] },

    // ── INFECTOLOGÍA ─────────────────
    { title: 'Score de Centor (Faringitis)', href: '/herramientas/score-centor-faringitis', emoji: '🤒', desc: '¿Antibiótico sí o no?', tags: ['infecto', 'pediatria'] },
    { title: 'CURB-65 (Neumonía)', href: '/herramientas/score-curb65-neumonia', emoji: '🌬️', desc: 'Severidad de neumonía', tags: ['infecto', 'urgencias'] },

    // ── CARDIOLOGÍA ──────────────────
    { title: 'Riesgo Cardiovascular', href: '/herramientas/score-framingham', emoji: '❤️', desc: 'Score de Framingham', tags: ['cardio'] },
    { title: 'Score HEART', href: '/herramientas/score-heart', emoji: '💓', desc: 'Dolor torácico agudo', tags: ['cardio', 'urgencias'] },
    { title: 'Score HAS-BLED', href: '/herramientas/score-has-bled', emoji: '🩸', desc: 'Riesgo de sangrado', tags: ['cardio'] },
    { title: 'Score TIMI STEMI', href: '/herramientas/score-timi-stemi', emoji: '🫀', desc: 'Infarto con elevación ST', tags: ['cardio', 'urgencias'] },
    { title: 'Riesgo Fibrilación Auricular', href: '/herramientas/riesgo-fibrilacion-auricular', emoji: '💗', desc: 'CHA₂DS₂-VASc', tags: ['cardio'] },
    { title: 'Gasto Cardíaco', href: '/herramientas/score-nyha', emoji: '🏃', desc: 'Clasificación funcional NYHA', tags: ['cardio'] },

    // ── METABOLISMO / ENDOCRINO ──────
    { title: 'Riesgo de Diabetes', href: '/herramientas/riesgo-diabetes', emoji: '🍬', desc: 'Score FINDRISC', tags: ['metabolismo', 'endocrino'] },
    { title: 'Riesgo de Hipotiroidismo', href: '/herramientas/riesgo-hipotiroidismo', emoji: '🦋', desc: 'Evalúa función tiroidea', tags: ['endocrino'] },
    { title: 'Calculadora de HbA1c', href: '/herramientas/score-meld-na', emoji: '🔬', desc: 'Hemoglobina glicosilada', tags: ['metabolismo'] },

    // ── EMBARAZO ─────────────────────
    { title: 'Semanas de Embarazo', href: '/herramientas/semanas-embarazo', emoji: '🤰', desc: 'Fecha probable de parto', tags: ['embarazo', 'gineco'] },
    { title: 'Riesgo de Preeclampsia', href: '/herramientas/riesgo-preeclampsia', emoji: '⚠️', desc: 'Factores de riesgo', tags: ['embarazo', 'gineco'] },

    // ── SALUD MENTAL ─────────────────
    { title: 'Test Ansiedad (GAD-7)', href: '/herramientas/test-ansiedad-gad7', emoji: '😰', desc: 'Trastorno de ansiedad', tags: ['mental'] },
    { title: 'Test Depresión (PHQ-9)', href: '/herramientas/test-depresion-phq9', emoji: '😔', desc: 'Detección de depresión', tags: ['mental'] },
    { title: 'Test TDAH Adultos', href: '/herramientas/test-tdah-adultos', emoji: '🧠', desc: 'Déficit de atención', tags: ['mental'] },
    { title: 'Síndrome de Burnout', href: '/herramientas/sindrome-burnout', emoji: '🔥', desc: 'Agotamiento profesional', tags: ['mental'] },

    // ── NUTRICIÓN ────────────────────
    { title: 'Calculadora IMC', href: '/herramientas/calculadora-imc', emoji: '⚖️', desc: 'Índice de masa corporal', tags: ['nutricion'] },

    // ── SECCIONES GENERALES ──────────
    { title: 'Catálogo de Estudios', href: '/estudios', emoji: '🔬', desc: '+2,000 análisis disponibles', tags: ['general', 'lab'] },
    { title: 'Check-ups y Paquetes', href: '/check-ups', emoji: '📋', desc: 'Paquetes desde $499', tags: ['general', 'lab'] },
    { title: 'Todas las Herramientas', href: '/herramientas', emoji: '🧰', desc: '130+ calculadoras médicas', tags: ['general'] },
    { title: 'Síntomas A-Z', href: '/sintomas', emoji: '🩺', desc: 'Buscador de síntomas', tags: ['general', 'sintomas'] },
    { title: 'Enfermedades A-Z', href: '/enfermedades', emoji: '📖', desc: 'Guía de enfermedades', tags: ['general', 'enfermedades'] },
    { title: 'Valores de Referencia', href: '/valores-clinicos', emoji: '📊', desc: 'Biomarcadores clínicos', tags: ['general', 'lab'] },
    { title: 'Sueroterapia', href: '/sueroterapia', emoji: '💉', desc: 'Tratamientos IV', tags: ['general'] },
];

/**
 * Finds related items based on the current page's href.
 * Uses tag intersection to find the most relevant items.
 */
function getRelated(currentHref: string, maxItems: number = 6): RelatedItem[] {
    const current = CATALOG.find(c => c.href === currentHref);
    if (!current) {
        // Fallback: show general items
        return CATALOG.filter(c => c.tags.includes('general')).slice(0, maxItems);
    }

    // Score each item by how many tags they share with current
    const scored = CATALOG
        .filter(c => c.href !== currentHref)
        .map(item => {
            const shared = item.tags.filter(t => current.tags.includes(t) && t !== 'general').length;
            return { item, shared };
        })
        .sort((a, b) => b.shared - a.shared);

    // Take top related, then pad with general items if needed
    const related = scored.filter(s => s.shared > 0).slice(0, maxItems).map(s => s.item);
    if (related.length < maxItems) {
        const generals = CATALOG.filter(c => c.href !== currentHref && c.tags.includes('general') && !related.includes(c));
        related.push(...generals.slice(0, maxItems - related.length));
    }
    return related.slice(0, maxItems);
}

/* ======================================================================
   COMPONENT
   ====================================================================== */

interface RelatedToolsProps {
    currentPath: string;
    title?: string;
    maxItems?: number;
    className?: string;
}

export function RelatedTools({
    currentPath,
    title = 'Herramientas Relacionadas',
    maxItems = 6,
    className = '',
}: RelatedToolsProps) {
    const items = getRelated(currentPath, maxItems);
    if (items.length === 0) return null;

    return (
        <section className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 ${className}`}>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                🔗 {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all"
                    >
                        <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{item.emoji}</span>
                        <div className="min-w-0">
                            <p className="font-semibold text-gray-800 text-sm group-hover:text-blue-700 transition-colors leading-tight">{item.title}</p>
                            <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default RelatedTools;
