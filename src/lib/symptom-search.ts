import { symptomMappings, SymptomMapping } from './symptom-mappings';

export interface SearchResult {
    studyNames: string[];
    message: string;
    category: string;
    matchedKeywords: string[];
    confidence: number; // 0-100
}

/**
 * Search for studies based on user symptoms
 * Uses fuzzy keyword matching to find relevant studies
 */
export function searchStudiesBySymptom(userInput: string): SearchResult | null {
    // Normalize input
    const normalized = userInput
        .toLowerCase()
        .trim()
        .normalize('NFD') // Remove accents
        .replace(/[\u0300-\u036f]/g, '');

    // Find all matching categories
    const matches: Array<{
        mapping: SymptomMapping;
        matchedKeywords: string[];
        matchCount: number;
    }> = [];

    for (const mapping of symptomMappings) {
        const matchedKeywords: string[] = [];

        for (const keyword of mapping.keywords) {
            const normalizedKeyword = keyword
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');

            if (normalized.includes(normalizedKeyword)) {
                matchedKeywords.push(keyword);
            }
        }

        if (matchedKeywords.length >= 1) { // At least 1 keyword match
            matches.push({
                mapping,
                matchedKeywords,
                matchCount: matchedKeywords.length
            });
        }
    }

    // No matches found
    if (matches.length === 0) {
        return null;
    }

    // Sort by priority and match count
    matches.sort((a, b) => {
        // First by priority
        if (a.mapping.priority !== b.mapping.priority) {
            return b.mapping.priority - a.mapping.priority;
        }
        // Then by number of matched keywords
        return b.matchCount - a.matchCount;
    });

    // Return the best match
    const bestMatch = matches[0];

    // Calculate confidence (0-100)
    const maxPossibleMatches = bestMatch.mapping.keywords.length;
    const confidence = Math.min(
        100,
        Math.round((bestMatch.matchCount / maxPossibleMatches) * 100 * (bestMatch.mapping.priority / 5))
    );

    return {
        studyNames: bestMatch.mapping.studyNames,
        message: bestMatch.mapping.message,
        category: bestMatch.mapping.category,
        matchedKeywords: bestMatch.matchedKeywords,
        confidence
    };
}

/**
 * Get example searches for UI
 */
export function getExampleSearches(): string[] {
    return [
        'me duele la panza',
        'estoy muy cansado',
        'dolor de cabeza frecuente',
        'tos con flema',
        'orino mucho',
        'subí de peso',
        'tengo fiebre',
        'diarrea constante'
    ];
}

/**
 * Get all available symptom categories
 */
export function getAllSymptomCategories(): Array<{ category: string; description: string }> {
    const unique = new Map<string, string>();

    for (const mapping of symptomMappings) {
        if (!unique.has(mapping.category)) {
            unique.set(mapping.category, mapping.message);
        }
    }

    return Array.from(unique.entries()).map(([category, description]) => ({
        category,
        description
    }));
}
