'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface FAQ {
    id: string;
    category: string;
    question: string;
    shortAnswer: string;
    longAnswer: string;
    relatedStudies: Array<{
        slug: string;
        categoryId: string;
        name: string;
        price: number;
    }>;
    cta?: {
        text: string;
        link: string;
        type: 'study' | 'package' | 'branch';
    };
    helpfulVotes: number;
    notHelpfulVotes: number;
    tags: string[];
}

interface FAQAccordionProps {
    faq: FAQ;
    isOpen: boolean;
    onToggle: () => void;
}

export const FAQAccordion = ({ faq, isOpen, onToggle }: FAQAccordionProps) => {
    const [hasVoted, setHasVoted] = useState(false);
    const [voteType, setVoteType] = useState<'helpful' | 'not-helpful' | null>(null);

    const handleVote = (type: 'helpful' | 'not-helpful') => {
        if (hasVoted) return;

        setHasVoted(true);
        setVoteType(type);

        // Guardar en localStorage
        const votes = JSON.parse(localStorage.getItem('faq-votes') || '{}');
        votes[f.id] = type;
        localStorage.setItem('faq-votes', JSON.stringify(votes));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4 transition-all hover:shadow-md">
            {/* Header - Question */}
            <button
                onClick={onToggle}
                className="w-full p-6 flex items-start justify-between gap-4 text-left hover:bg-green-50 transition-colors"
            >
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {faq.question}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {faq.shortAnswer}
                    </p>
                </div>
                <ChevronDown
                    className={`flex-shrink-0 text-green-900 transition-transform ${isOpen ? 'rotate-180' : ''
                        }`}
                    size={24}
                />
            </button>

            {/* Expandable Content */}
            {isOpen && (
                <div className="px-6 pb-6 border-t border-gray-100">
                    {/* Long Answer with Markdown */}
                    <div className="prose prose-green max-w-none mb-6">
                        <ReactMarkdown
                            components={{
                                a: ({ node, ...props }) => (
                                    <Link
                                        href={props.href || '#'}
                                        className="text-green-900 font-semibold hover:underline"
                                    >
                                        {props.children}
                                    </Link>
                                ),
                                strong: ({ node, ...props }) => (
                                    <strong className="text-gray-900 font-bold">{props.children}</strong>
                                ),
                            }}
                        >
                            {faq.longAnswer}
                        </ReactMarkdown>
                    </div>

                    {/* Related Studies */}
                    {faq.relatedStudies.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                📚 Estudios Relacionados:
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {faq.relatedStudies.map((study) => (
                                    <Link
                                        key={study.slug}
                                        href={`/estudios/${study.categoryId}/${study.slug}`}
                                        className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                                    >
                                        <span className="text-sm font-medium text-gray-900">
                                            {study.name}
                                        </span>
                                        <span className="text-sm font-bold text-green-900">
                                            ${study.price.toLocaleString('es-MX')}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Button */}
                    {faq.cta && (
                        <div className="mb-6">
                            <Link
                                href={faq.cta.link}
                                className="inline-flex items-center px-6 py-3 bg-green-900 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
                            >
                                {faq.cta.text}
                            </Link>
                        </div>
                    )}

                    {/* Voting System */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-600">¿Te fue útil esta respuesta?</span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleVote('helpful')}
                                disabled={hasVoted}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${voteType === 'helpful'
                                        ? 'bg-green-100 text-green-900 font-semibold'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    } disabled:cursor-not-allowed`}
                            >
                                <span>👍</span>
                                <span className="text-sm">Útil ({faq.helpfulVotes})</span>
                            </button>
                            <button
                                onClick={() => handleVote('not-helpful')}
                                disabled={hasVoted}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${voteType === 'not-helpful'
                                        ? 'bg-red-100 text-red-900 font-semibold'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    } disabled:cursor-not-allowed`}
                            >
                                <span>👎</span>
                                <span className="text-sm">No útil ({faq.notHelpfulVotes})</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
