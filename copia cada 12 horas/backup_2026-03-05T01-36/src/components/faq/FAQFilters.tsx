'use client';

import { faqCategories } from '@/data/FAQData_PART1';

interface FAQFiltersProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    categoryCounts: Record<string, number>;
}

export const FAQFilters = ({ selectedCategory, onCategoryChange, categoryCounts }: FAQFiltersProps) => {
    return (
        <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Filtrar por categoría:</h3>
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={() => onCategoryChange('all')}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === 'all'
                            ? 'bg-green-900 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Todas ({Object.values(categoryCounts).reduce((a, b) => a + b, 0)})
                </button>
                {faqCategories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onCategoryChange(cat.id)}
                        className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${selectedCategory === cat.id
                                ? 'bg-green-900 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                        <span className="text-xs opacity-75">({categoryCounts[cat.id] || 0})</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
