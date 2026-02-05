'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableDescriptionProps {
    shortDescription: string;
    detailedDescription?: string;
    studyName: string;
}

export function ExpandableDescription({
    shortDescription,
    detailedDescription,
    studyName
}: ExpandableDescriptionProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Si no hay descripción detallada, solo mostrar la corta
    if (!detailedDescription || detailedDescription.trim() === '') {
        return (
            <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: formatMarkdown(shortDescription) }} />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Descripción corta - Siempre visible */}
            <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: formatMarkdown(shortDescription) }} />
            </div>

            {/* Botón para expandir */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                aria-expanded={isExpanded}
                aria-controls="detailed-description"
            >
                {isExpanded ? (
                    <>
                        <ChevronUp className="w-5 h-5" />
                        Ver menos información
                    </>
                ) : (
                    <>
                        <ChevronDown className="w-5 h-5" />
                        Ver información detallada sobre {studyName}
                    </>
                )}
            </button>

            {/* Descripción detallada - Desplegable */}
            {isExpanded && (
                <div
                    id="detailed-description"
                    className="prose prose-sm max-w-none bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 animate-fadeIn"
                >
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">
                        📚 Información Detallada
                    </h3>
                    <div dangerouslySetInnerHTML={{ __html: formatMarkdown(detailedDescription) }} />
                </div>
            )}
        </div>
    );
}

/**
 * Convierte markdown simple a HTML
 */
function formatMarkdown(text: string): string {
    return text
        // Headers
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // Listas con checkmarks
        .replace(/✓ (.+)/g, '<li class="flex items-start gap-2"><span class="text-green-600">✓</span><span>$1</span></li>')
        // Listas normales
        .replace(/^- (.+)/gm, '<li>$1</li>')
        // Emojis con info
        .replace(/- (🕐|💉|🍽️) (.+)/g, '<li class="flex items-start gap-2"><span>$1</span><span>$2</span></li>')
        // Párrafos
        .replace(/\n\n/g, '</p><p>')
        // Wrap en párrafos
        .replace(/^(.+)$/gm, '<p>$1</p>')
        // Limpiar
        .replace(/<p><li>/g, '<li>')
        .replace(/<\/li><\/p>/g, '</li>');
}
