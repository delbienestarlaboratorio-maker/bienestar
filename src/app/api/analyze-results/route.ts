export const runtime = 'edge';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { biomarkers } = body;

        if (!biomarkers || !Array.isArray(biomarkers) || biomarkers.length === 0) {
            return NextResponse.json({ error: 'No biomarkers provided.' }, { status: 400 });
        }

        // Construct a highly structured prompt for Ollama
        let prompt = `Eres un asistente médico experto de "Laboratorio del Bienestar". Tu objetivo es analizar los siguientes resultados de laboratorio de un paciente y darle una interpretación fácil de entender, empática y profesional.\n\n`;
        prompt += `RESULTADOS DEL PACIENTE:\n`;

        biomarkers.forEach(bm => {
            prompt += `- ${bm.name}: ${bm.value} ${bm.unit} (Rango normal Hombres: ${bm.referenceMale}, Mujeres: ${bm.referenceFemale})\n`;
        });

        prompt += `\nINSTRUCCIONES DE FORMATO:\n`;
        prompt += `1. Inicia saludando de forma empática.\n`;
        prompt += `2. Usa viñetas para mencionar cada biomarcador, indicando si está NORMAL, ALTO o BAJO, y usando emojis sutiles.\n`;
        prompt += `3. Explica brevemente, sin usar jerga médica muy compleja, qué significa el resultado en conjunto.\n`;
        prompt += `4. Incluye un descargo de responsabilidad breve de que esto no sustituye una consulta.\n`;
        prompt += `5. IMPORTANTE: Actúa como el experto del "Laboratorio del Bienestar".\n`;

        // Direct fetch to Ollama
        const ollamaRes = await fetch('http://127.0.0.1:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama3.2', // using their standard local model
                prompt: prompt,
                stream: false,
                options: {
                    temperature: 0.3, // keep it factual
                }
            })
        });

        if (!ollamaRes.ok) {
            console.error("Ollama HTTP Error", ollamaRes.status);
            throw new Error(`Ollama API error: ${ollamaRes.status}`);
        }

        const ollamaData = await ollamaRes.json();

        return NextResponse.json({ analysis: ollamaData.response });

    } catch (error: any) {
        console.error("Analyze API Route Error:", error);
        return NextResponse.json(
            { error: 'Error processing AI analysis. Is Ollama running?' },
            { status: 500 }
        );
    }
}
