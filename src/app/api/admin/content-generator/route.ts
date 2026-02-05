import { NextResponse } from 'next/server';
import { db } from '@/db';
import { studies } from '@/db/schema';
import { eq, isNull, or } from 'drizzle-orm';

// Estado global del generador
let isGenerating = false;
let shouldStop = false;
let currentProgress = {
    total: 0,
    completed: 0,
    current: '',
    status: 'idle' as 'idle' | 'running' | 'paused' | 'error',
    error: null as string | null,
    startedAt: null as string | null,
    lastUpdate: null as string | null,
};

const OLLAMA_URL = 'http://localhost:11434/api/generate';
const OLLAMA_MODEL = 'qwen2.5:7b';
const OLLAMA_TIMEOUT = 600000; // 10 minutos (aumentado de 3 min)

interface StudyContent {
    shortDescription: string;
    longDescription: string;
    preparation: string;
}

async function generateCompleteContent(studyName: string, category: string): Promise<StudyContent> {
    const prompt = `Eres un médico especialista creando contenido educativo para pacientes sobre estudios clínicos.

ESTUDIO: ${studyName}
CATEGORÍA: ${category}

IMPORTANTE: Responde SOLO con el contenido solicitado, SIN incluir títulos de secciones, SIN mencionar "SECCIÓN 1", "SECCIÓN 2", etc. Escribe directamente el contenido.

Genera 3 bloques de texto separados por "###SEPARADOR###":

BLOQUE 1 (Descripción corta, 120-150 palabras):
Escribe directamente el contenido con este formato:

**¿Qué es?**
[2-3 oraciones explicando qué mide este estudio y por qué es importante]

**¿Cuándo necesito este estudio?**
- [Situación específica 1 con síntomas reales]
- [Situación específica 2 con síntomas reales]
- [Situación específica 3 con síntomas reales]
- [Situación específica 4 con síntomas reales]

###SEPARADOR###

BLOQUE 2 (Descripción detallada, 250-350 palabras):
Escribe un texto profesional en 5 párrafos:

Párrafo 1: Qué mide este estudio, qué sustancia o parámetro analiza, y su función en el cuerpo.

Párrafo 2: Cómo se realiza el procedimiento (tipo de muestra, si es invasivo, duración).

Párrafo 3: Para qué enfermedades se usa. Menciona 3-4 condiciones médicas específicas.

Párrafo 4: Qué significan valores altos o bajos, qué condiciones pueden causar alteraciones.

Párrafo 5: Por qué es importante hacerse este estudio y cuándo repetirlo.

###SEPARADOR###

BLOQUE 3 (Preparación):
Escribe las instrucciones de preparación con este formato:

**Ayuno:** [Sí con X horas, o "No requiere"]

**Antes del estudio:**
- [Instrucción específica 1]
- [Instrucción específica 2]

**El día del estudio:**
- [Instrucción 1]
- [Instrucción 2]

**Recomendaciones adicionales:**
- [Consejo útil]

Si NO requiere preparación especial, escribe exactamente:
**No requiere preparación especial**
- Puede realizarse en cualquier momento
- No es necesario ayuno
- Continúe con su medicación habitual

REGLAS CRÍTICAS:
- NO escribas "SECCIÓN 1", "SECCIÓN 2", "BLOQUE 1", etc.
- NO incluyas instrucciones del prompt en tu respuesta
- USA markdown (**, -, etc.)
- Sé específico con nombres de enfermedades
- NO inventes datos clínicos

Responde SOLO con los 3 bloques separados por "###SEPARADOR###"`;

    const response = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: OLLAMA_MODEL,
            prompt: prompt,
            stream: false,
            options: {
                temperature: 0.7,
                top_p: 0.9,
                num_predict: 1500,
                repeat_penalty: 1.1,
            }
        }),
        signal: AbortSignal.timeout(OLLAMA_TIMEOUT),
    });

    if (!response.ok) {
        throw new Error(`Ollama error: ${response.statusText}`);
    }

    const result = await response.json();
    const fullContent = result.response?.trim();

    if (!fullContent) {
        throw new Error('Empty response from Ollama');
    }

    // Separar las 3 secciones usando el separador único
    const sections = fullContent.split('###SEPARADOR###').map((s: string) => s.trim());

    // Limpiar cualquier referencia a "SECCIÓN" o "BLOQUE" que pueda haber quedado
    const cleanSection = (text: string) => {
        return text
            .replace(/^SECCIÓN\s+\d+[^\n]*\n*/gim, '')
            .replace(/^BLOQUE\s+\d+[^\n]*\n*/gim, '')
            .replace(/^═+\n*/gm, '')
            .replace(/^\(.*?\):\s*\n*/gm, '')
            .trim();
    };

    if (sections.length < 3) {
        // Si no se separó correctamente, intentar con --- como fallback
        const fallbackSections = fullContent.split('---').map((s: string) => cleanSection(s));

        if (fallbackSections.length >= 3) {
            return {
                shortDescription: fallbackSections[0],
                longDescription: fallbackSections[1],
                preparation: fallbackSections[2]
            };
        }

        // Si aún no funciona, usar el contenido completo
        return {
            shortDescription: cleanSection(fullContent),
            longDescription: cleanSection(fullContent),
            preparation: 'No requiere preparación especial'
        };
    }

    return {
        shortDescription: cleanSection(sections[0]),
        longDescription: cleanSection(sections[1]),
        preparation: cleanSection(sections[2])
    };
}

async function generateDescription(studyName: string, category: string): Promise<string> {
    const prompt = `Como experto médico, genera una descripción BREVE en español para este estudio clínico.

Estudio: ${studyName}
Categoría: ${category}

Formato EXACTO (máximo 150 palabras, usa markdown):

**¿Qué es?**
[Explicación simple en 1-2 oraciones]

**¿Cuándo necesito este estudio?**
- [Síntoma o situación 1]
- [Síntoma o situación 2]
- [Síntoma o situación 3]

Responde SOLO con el texto formateado, sin introducción.`;

    const response = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: OLLAMA_MODEL,
            prompt: prompt,
            stream: false,
            options: {
                temperature: 0.7,
                top_p: 0.9,
            }
        }),
        signal: AbortSignal.timeout(OLLAMA_TIMEOUT),
    });

    if (!response.ok) {
        throw new Error(`Ollama error: ${response.statusText}`);
    }

    const result = await response.json();
    const description = result.response?.trim();

    if (!description) {
        throw new Error('Empty response from Ollama');
    }

    return description;
}

async function generatePreparation(studyName: string, category: string): Promise<string> {
    const prompt = `Como experto médico, genera SOLO las indicaciones de preparación para este estudio clínico.

Estudio: ${studyName}
Categoría: ${category}

Instrucciones:
- Sé BREVE y ESPECÍFICO (máximo 3-4 puntos)
- Si el estudio requiere ayuno, especifica cuántas horas
- Si es de orina, menciona cómo recolectar la muestra
- Si es de sangre, indica si requiere ayuno
- Si es de imagen, menciona preparación especial
- Si NO requiere preparación especial, responde EXACTAMENTE: "No requiere preparación especial"

Formato de respuesta (SOLO el texto, sin título):
- [Indicación 1]
- [Indicación 2]
- [Indicación 3]

O simplemente: "No requiere preparación especial"

Responde SOLO con las indicaciones, sin introducción ni explicaciones adicionales.`;

    const response = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: OLLAMA_MODEL,
            prompt: prompt,
            stream: false,
            options: {
                temperature: 0.6,
                top_p: 0.85,
            }
        }),
        signal: AbortSignal.timeout(OLLAMA_TIMEOUT),
    });

    if (!response.ok) {
        throw new Error(`Ollama error: ${response.statusText}`);
    }

    const result = await response.json();
    const preparation = result.response?.trim();

    if (!preparation) {
        throw new Error('Empty response from Ollama');
    }

    return preparation;
}

async function runGenerator() {
    try {
        isGenerating = true;
        shouldStop = false;
        currentProgress.status = 'running';
        currentProgress.startedAt = new Date().toISOString();
        currentProgress.error = null;

        // Obtener estudios sin contenido completo
        const emptyStudies = await db
            .select()
            .from(studies)
            .where(or(
                eq(studies.preparation, ''),
                isNull(studies.preparation),
                eq(studies.preparation, 'Consulte indicaciones.'),
                isNull(studies.whatIsIt)
            ));

        currentProgress.total = emptyStudies.length;
        currentProgress.completed = 0;

        console.log(`🚀 Iniciando generación de contenido completo para ${emptyStudies.length} estudios`);

        for (const study of emptyStudies) {
            if (shouldStop) {
                console.log('⏸️  Generación pausada por el usuario');
                currentProgress.status = 'paused';
                break;
            }

            try {
                currentProgress.current = study.name;
                currentProgress.lastUpdate = new Date().toISOString();

                console.log(`📝 [${currentProgress.completed + 1}/${currentProgress.total}] ${study.name}`);

                // Generar contenido completo (descripción corta, larga y preparación)
                const content = await generateCompleteContent(study.name, study.categoryId);

                // Actualizar en la base de datos con los 3 campos
                await db
                    .update(studies)
                    .set({
                        description: content.shortDescription,
                        whatIsIt: content.longDescription,
                        preparation: content.preparation,
                        updatedAt: new Date()
                    })
                    .where(eq(studies.id, study.id));

                currentProgress.completed++;
                console.log(`✅ Completado: ${study.name}`);

            } catch (error) {
                console.error(`❌ Error en ${study.name}:`, error);
                // Continuar con el siguiente estudio
                continue;
            }
        }

        if (currentProgress.status !== 'paused') {
            currentProgress.status = 'idle';
            console.log(`✅ Generación completada: ${currentProgress.completed}/${currentProgress.total}`);
        }

    } catch (error) {
        console.error('❌ Error fatal en generación:', error);
        currentProgress.status = 'error';
        currentProgress.error = error instanceof Error ? error.message : 'Error desconocido';
    } finally {
        isGenerating = false;
    }
}

// GET - Obtener estado
export async function GET() {
    try {
        // Contar estudios pendientes actuales (sin contenido completo)
        const emptyCount = await db
            .select()
            .from(studies)
            .where(or(
                eq(studies.preparation, ''),
                isNull(studies.preparation),
                eq(studies.preparation, 'Consulte indicaciones.'),
                isNull(studies.whatIsIt)
            ));

        return NextResponse.json({
            ...currentProgress,
            pendingTotal: emptyCount.length,
            isGenerating,
        });
    } catch (error) {
        console.error('Error getting status:', error);
        return NextResponse.json(
            { error: 'Failed to get status' },
            { status: 500 }
        );
    }
}

// POST - Iniciar/detener generación
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action } = body;

        if (action === 'start') {
            if (isGenerating) {
                return NextResponse.json(
                    { error: 'Ya hay una generación en progreso' },
                    { status: 400 }
                );
            }

            // Verificar que Ollama esté disponible
            try {
                const testResponse = await fetch('http://localhost:11434/api/tags', {
                    signal: AbortSignal.timeout(2000),
                });
                if (!testResponse.ok) {
                    throw new Error('Ollama no responde');
                }
            } catch (error) {
                return NextResponse.json(
                    { error: 'Ollama no está disponible. Ejecuta: ollama serve' },
                    { status: 503 }
                );
            }

            // Iniciar generación en segundo plano
            runGenerator();

            return NextResponse.json({
                message: 'Generación iniciada',
                status: currentProgress,
            });

        } else if (action === 'stop') {
            if (!isGenerating) {
                return NextResponse.json(
                    { error: 'No hay generación en progreso' },
                    { status: 400 }
                );
            }

            shouldStop = true;
            return NextResponse.json({
                message: 'Deteniendo generación...',
            });

        } else {
            return NextResponse.json(
                { error: 'Acción no válida. Use "start" o "stop"' },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('Error in POST:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
